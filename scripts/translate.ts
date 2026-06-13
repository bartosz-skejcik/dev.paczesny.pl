import { loadEnvConfig } from "@next/env"
import { SUPPORTED_LANGS, type SupportedLang } from "@/lib/i18n"

loadEnvConfig(process.cwd())

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
      "Missing --slug argument. Usage: bun run translate:post --slug my-post --lang en"
    )
  }

  if (!lang) {
    throw new Error(
      "Missing --lang argument. Usage: bun run translate:post --slug my-post --lang en"
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

async function main() {
  const { slug, lang } = parseArgs()
  const { slug: parsedSlug, targetLang } = assertParams({ slug, lang })
  const { ensureTranslation } = await import("@/lib/translator")

  try {
    const { filePath } = await ensureTranslation({
      slug: parsedSlug,
      targetLang,
    })
    console.log(
      `✓ ${parsedSlug} → ${targetLang.toUpperCase()} cached at ${filePath}`
    )
  } catch (error) {
    console.error(
      `✗ Failed translating ${parsedSlug} → ${targetLang.toUpperCase()}:`,
      (error as Error).message
    )
    process.exitCode = 1
  }
}

void main()
