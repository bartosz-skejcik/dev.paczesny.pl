import { loadEnvConfig } from "@next/env"
import { promises as fs } from "fs"
import { generateText } from "ai"
import { createOpenAI } from "@ai-sdk/openai"
import { getPostFilePath, parseFrontmatter } from "@/lib/blog"
import { SUPPORTED_LANGS, type SupportedLang } from "@/lib/i18n"

loadEnvConfig(process.cwd())

const DESCRIPTION_MODEL = "llama-3.3-70b-versatile"
const MIN_CHAR_LENGTH = 150
const MAX_CHAR_LENGTH = 220
const MAX_BODY_CHARS = 6000
const MAX_ATTEMPTS = 5

const groq = createOpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
})

const describer = groq.chat(DESCRIPTION_MODEL)

const LANGUAGE_NAMES: Record<SupportedLang, string> = {
  en: "English",
  pl: "Polish",
  de: "German",
  fr: "French",
  es: "Spanish",
}

type CliArgs = {
  slug?: string
  lang?: string
  dryRun: boolean
}

type DescribeTarget = {
  lang: SupportedLang
  filePath: string
}

function parseArgs(): CliArgs {
  const argv = process.argv.slice(2)
  let slug: string | undefined
  let lang: string | undefined
  let dryRun = false

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i]
    if (!token) {
      continue
    }

    if (token === "--slug" || token === "-s") {
      slug = argv[i + 1]
      i += 1
      continue
    }

    if (token.startsWith("--slug=")) {
      slug = token.split("=")[1]
      continue
    }

    if (token === "--lang" || token === "-l") {
      lang = argv[i + 1]
      i += 1
      continue
    }

    if (token.startsWith("--lang=")) {
      lang = token.split("=")[1]
      continue
    }

    if (token === "--dry-run" || token === "-d") {
      dryRun = true
      continue
    }
  }

  return { slug, lang, dryRun }
}

function assertSlugArg(slug: string | undefined) {
  if (!slug) {
    throw new Error(
      "Missing --slug argument. Usage: bun run describe:post --slug my-post [--lang en]"
    )
  }
  return slug
}

function resolveTargets({ slug, lang }: { slug: string; lang?: string }) {
  if (lang) {
    const normalizedLang = lang.toLowerCase()
    if (!SUPPORTED_LANGS.includes(normalizedLang as SupportedLang)) {
      throw new Error(
        `Unsupported language: ${lang}. Supported languages: ${SUPPORTED_LANGS.join(
          ", "
        )}`
      )
    }

    const filePath = getPostFilePath(slug, normalizedLang)
    if (!filePath) {
      throw new Error(
        `Unable to find ${normalizedLang.toUpperCase()} post for slug: ${slug}`
      )
    }

    return [{ lang: normalizedLang as SupportedLang, filePath }]
  }

  const discovered: DescribeTarget[] = []
  for (const candidate of SUPPORTED_LANGS) {
    const filePath = getPostFilePath(slug, candidate)
    if (filePath) {
      discovered.push({ lang: candidate, filePath })
    }
  }

  if (discovered.length === 0) {
    throw new Error(
      `No localized posts found for slug: ${slug}. Create at least one [lang].mdx file and rerun.`
    )
  }

  return discovered
}

async function main() {
  try {
    if (!process.env.GROQ_API_KEY) {
      throw new Error("Missing GROQ_API_KEY environment variable")
    }

    const args = parseArgs()
    const slug = assertSlugArg(args.slug)
    const targets = resolveTargets({ slug, lang: args.lang })

    for (const { lang, filePath } of targets) {
      await describeLanguage({
        slug,
        targetLang: lang,
        filePath,
        dryRun: args.dryRun,
      })
    }
  } catch (error) {
    console.error((error as Error).message)
    process.exitCode = 1
  }
}

async function describeLanguage({
  slug,
  targetLang,
  filePath,
  dryRun,
}: {
  slug: string
  targetLang: SupportedLang
  filePath: string
  dryRun: boolean
}) {
  const rawFile = await fs.readFile(filePath, "utf-8")
  const { metadata, content } = parseFrontmatter(rawFile)

  const { description, length } = await generateDescription({
    title: metadata.title,
    tags: metadata.tags ?? [],
    lang: targetLang,
    existingDescription: metadata.description ?? "",
    body: content,
  })

  if (dryRun) {
    console.log(
      `[dry-run] ${slug}.${targetLang} → ${length} chars:\n${description}`
    )
    return
  }

  const nextContent = updateFrontmatterDescription(rawFile, description)
  await fs.writeFile(filePath, nextContent, "utf-8")

  console.log(
    `✓ Updated ${slug}.${targetLang} description (${length} chars) at ${filePath}`
  )
}

async function generateDescription({
  title,
  tags,
  lang,
  existingDescription,
  body,
}: {
  title: string
  tags: string[]
  lang: SupportedLang
  existingDescription?: string
  body: string
}) {
  const excerpt = buildBodyExcerpt(body)

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    const prompt = buildPrompt({
      title,
      tags,
      lang,
      existingDescription,
      excerpt,
    })

    const { text } = await generateText({
      model: describer,
      temperature: 0.4,
      prompt,
    })

    const candidate = normalizeDescription(text)
    const length = candidate.length

    if (length >= MIN_CHAR_LENGTH && length <= MAX_CHAR_LENGTH) {
      return { description: candidate, length }
    }

    console.warn(
      `Attempt ${attempt} produced ${length} characters (expected ${MIN_CHAR_LENGTH}-${MAX_CHAR_LENGTH}). Retrying...`
    )
  }

  throw new Error(
    `Failed to generate description within ${MIN_CHAR_LENGTH}-${MAX_CHAR_LENGTH} characters after ${MAX_ATTEMPTS} attempts.`
  )
}

function buildPrompt({
  title,
  tags,
  lang,
  existingDescription,
  excerpt,
}: {
  title: string
  tags: string[]
  lang: SupportedLang
  existingDescription?: string
  excerpt: string
}) {
  const languageName = LANGUAGE_NAMES[lang] ?? lang
  const tagInstruction = tags.length
    ? `- Naturally weave at least one of these focus topics: ${tags
        .slice(0, 6)
        .join(", ")}.`
    : "- Base the hook on the central themes expressed in the excerpt."

  return `You are an SEO copywriter. Write a single inviting meta description in ${languageName} for the blog post below.

Requirements:
- 1-2 sentences between ${MIN_CHAR_LENGTH} and ${MAX_CHAR_LENGTH} characters inclusive (spaces count).
- Use active voice with a clear benefit for the reader but write the description in first person and describe what I, the author, offer and shortly explain what the post is about.
- Make it engaging and clickable in search results while accurately reflecting the post content.
- Do not reuse or paraphrase any existing description.
${tagInstruction}
- Avoid hashtags, emojis, quotation marks, markdown, and ellipses.
- Respond with plain text only (no labels or extra commentary).

TITLE: ${title}
CURRENT DESCRIPTION: ${existingDescription || "(none)"}

POST EXCERPT:
"""
${excerpt}
"""`
}

function buildBodyExcerpt(body: string) {
  const trimmed = body.trim()
  if (trimmed.length <= MAX_BODY_CHARS) {
    return trimmed
  }
  return `${trimmed.slice(
    0,
    MAX_BODY_CHARS
  )}\n\n[Excerpt truncated after ${MAX_BODY_CHARS} characters]`
}

function normalizeDescription(output: string) {
  const trimmed = output.trim()
  const fenceRegex = /^```(?:mdx|markdown|text)?\s*([\s\S]*?)\s*```$/i
  const fencedMatch = fenceRegex.exec(trimmed)
  const unfenced = fencedMatch ? fencedMatch[1].trim() : trimmed
  const unquoted = unfenced.replace(/^['"`]+/, "").replace(/['"`]+$/, "")
  return unquoted.replace(/\s+/g, " ").trim()
}

function updateFrontmatterDescription(
  fileContent: string,
  description: string
) {
  const frontmatterRegex = /^---\s*([\s\S]*?)\s*---/
  const match = frontmatterRegex.exec(fileContent)

  if (!match) {
    throw new Error("No frontmatter found in the target file")
  }

  const frontmatter = match[1]
  const descriptionLine = `description: ${quoteForYaml(description)}`
  const descriptionRegex = /^description\s*:\s*.*$/im
  let nextFrontmatter: string

  if (descriptionRegex.test(frontmatter)) {
    nextFrontmatter = frontmatter.replace(descriptionRegex, descriptionLine)
  } else {
    nextFrontmatter = insertDescriptionLine(frontmatter, descriptionLine)
  }

  return fileContent.replace(
    frontmatterRegex,
    `---\n${nextFrontmatter.trimEnd()}\n---`
  )
}

function insertDescriptionLine(frontmatter: string, line: string) {
  const lines = frontmatter.split("\n")
  const titleIndex = lines.findIndex((entry) =>
    entry.trim().startsWith("title:")
  )

  if (titleIndex >= 0) {
    lines.splice(titleIndex + 1, 0, line)
  } else {
    lines.unshift(line)
  }

  return lines.join("\n")
}

function quoteForYaml(value: string) {
  return JSON.stringify(value)
}

void main()
