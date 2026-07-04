import { promises as fs } from "fs"
import path from "path"
import { generateText } from "ai"
import { createOpenAI } from "@ai-sdk/openai"
import { CANONICAL_LANG, SUPPORTED_LANGS, type SupportedLang } from "@/lib/i18n"
import { getPostFilePath, parseFrontmatter } from "@/lib/blog"
import type { Metadata } from "@/lib/blog"

const TRANSLATION_MODEL = "llama-3.3-70b-versatile"
const TRANSLATION_OUTPUT_EXTENSION = ".mdx"

const groq = createOpenAI({
  apiKey: process.env.GROQ_API_KEY,
  // Requests issued via the chat API, which maps to /chat/completions under the hood.
  baseURL: "https://api.groq.com/openai/v1",
})

const translator = groq.chat(TRANSLATION_MODEL)

type TranslateParams = {
  slug: string
  targetLang: SupportedLang
}

export async function ensureTranslation({ slug, targetLang }: TranslateParams) {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("Missing GROQ_API_KEY environment variable")
  }

  if (!SUPPORTED_LANGS.includes(targetLang)) {
    throw new Error(`Unsupported language: ${targetLang}`)
  }

  if (targetLang === CANONICAL_LANG) {
    throw new Error(
      "Translations are only required for non-canonical languages"
    )
  }

  const existingPath = getPostFilePath(slug, targetLang)
  if (existingPath) {
    const content = await fs.readFile(existingPath, "utf-8")
    return { filePath: existingPath, content }
  }

  const canonicalPath = getPostFilePath(slug, CANONICAL_LANG)
  if (!canonicalPath) {
    throw new Error(`Unable to find canonical post for slug: ${slug}`)
  }

  const canonicalRaw = await fs.readFile(canonicalPath, "utf-8")
  const { metadata, content } = parseFrontmatter(canonicalRaw)
  const prompt = buildPrompt({
    targetLang,
    metadata,
    markdown: content,
  })

  const { text } = await generateText({
    model: translator,
    temperature: 0.2,
    // Groq's default completion cap truncates long posts mid-sentence, but the
    // account's on_demand TPM limit (12000) caps prompt+output per request, so
    // this can't just be maxed out — pick something with margin over expected
    // output (~1.3x source length) while leaving room for prompt tokens.
    maxOutputTokens: 7000,
    prompt,
  })

  const cleaned = sanitizeModelOutput(text)
  // Ensure the output still contains frontmatter before caching it.
  parseFrontmatter(cleaned)

  const outputPath = path.join(
    path.dirname(canonicalPath),
    `${targetLang}${TRANSLATION_OUTPUT_EXTENSION}`
  )
  await fs.mkdir(path.dirname(outputPath), { recursive: true })
  await fs.writeFile(outputPath, cleaned, "utf-8")

  return { filePath: outputPath, content: cleaned }
}

function buildPrompt({
  targetLang,
  metadata,
  markdown,
}: {
  targetLang: SupportedLang
  metadata: Metadata
  markdown: string
}) {
  return `You are a meticulous technical translator. Translate the following Polish MDX blog post to ${targetLang.toUpperCase()} while preserving:
- YAML frontmatter keys: title, description, date (date must stay ${
    metadata.date
  }).
- Markdown structure, headings, code blocks, inline formatting, links, and lists.
- Developer tone (keep technical jargon) and mirror the author's informal voice.

Do not wrap the translation in code fences. Respond with valid Markdown that starts with the updated YAML frontmatter, followed by the translated body.

---
TITLE: ${metadata.title}
DESCRIPTION: ${metadata.description}
DATE: ${metadata.date}
---

${markdown}`
}

function sanitizeModelOutput(output: string) {
  const trimmed = output.trim()
  const fenceRegex = /^```(?:mdx|markdown)?\s*([\s\S]*?)\s*```$/i
  const match = fenceRegex.exec(trimmed)
  if (match) {
    return match[1].trim()
  }
  return trimmed
}

export { TRANSLATION_MODEL }
