import fs from "fs"
import { CANONICAL_LANG, SUPPORTED_LANGS, type SupportedLang } from "@/lib/i18n"
import { getPostFilePath, getPostSlugs, parseFrontmatter } from "@/lib/blog"
import { fixPostIntegrity } from "@/lib/post-integrity"

function parseArgs() {
  const argv = process.argv.slice(2)
  let slug: string | undefined
  let lang: string | undefined

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
  }

  return { slug, lang }
}

function assertParams({ slug, lang }: { slug?: string; lang?: string }): {
  slug: string
  targetLang: SupportedLang
} {
  if (!slug) {
    throw new Error(
      "Missing --slug argument. Usage: bun run fix:post-integrity --slug my-post --lang en"
    )
  }

  if (!lang) {
    throw new Error(
      "Missing --lang argument. Usage: bun run fix:post-integrity --slug my-post --lang en"
    )
  }

  const normalizedLang = lang.toLowerCase()
  if (!SUPPORTED_LANGS.includes(normalizedLang as SupportedLang)) {
    throw new Error(
      `Unsupported language: ${lang}. Supported languages: ${SUPPORTED_LANGS.join(
        ", "
      )}`
    )
  }

  return { slug, targetLang: normalizedLang as SupportedLang }
}

function main() {
  const { slug, lang } = parseArgs()
  const { slug: parsedSlug, targetLang } = assertParams({ slug, lang })

  // Read the canonical Polish source for the authoritative tags. File I/O lives
  // here in the CLI; the fixer library itself stays pure.
  const canonicalPath = getPostFilePath(parsedSlug, CANONICAL_LANG)
  if (!canonicalPath) {
    console.error(
      `✗ No canonical ${CANONICAL_LANG.toUpperCase()} source found for slug: ${parsedSlug}`
    )
    process.exitCode = 1
    return
  }

  const targetPath = getPostFilePath(parsedSlug, targetLang)
  if (!targetPath) {
    console.error(
      `✗ No ${targetLang.toUpperCase()} file found for slug: ${parsedSlug}`
    )
    process.exitCode = 1
    return
  }

  const canonicalRaw = fs.readFileSync(canonicalPath, "utf-8")
  const canonicalTags = parseFrontmatter(canonicalRaw).metadata.tags ?? []
  const knownSlugs = getPostSlugs()

  const targetContent = fs.readFileSync(targetPath, "utf-8")
  const result = fixPostIntegrity(parsedSlug, targetContent, {
    knownSlugs,
    canonicalTags,
  })

  if (!result.changed) {
    console.log(
      `✓ ${parsedSlug} ${targetLang.toUpperCase()}: no fixes needed`
    )
    return
  }

  fs.writeFileSync(targetPath, result.content, "utf-8")
  console.log(
    `✓ ${parsedSlug} ${targetLang.toUpperCase()}: applied ${result.fixes.length} fix(es)`
  )
  result.fixes.forEach((fix) => {
    console.log(`  - ${fix}`)
  })
}

try {
  main()
} catch (error) {
  console.error(`✗ Failed fixing post integrity:`, (error as Error).message)
  process.exitCode = 1
}
