import { loadEnvConfig } from "@next/env"
import { getPostSlugs } from "@/lib/blog"
import {
  CANONICAL_LANG,
  TOP_PREBUILD_LANGS,
  type SupportedLang,
} from "@/lib/i18n"

loadEnvConfig(process.cwd())

async function main() {
  const { ensureTranslation } = await import("@/lib/translator")
  const slugs = getPostSlugs()
  if (slugs.length === 0) {
    console.log("No posts found under content/posts")
    return
  }

  for (const slug of slugs) {
    for (const targetLang of TOP_PREBUILD_LANGS) {
      if (targetLang === CANONICAL_LANG) {
        continue
      }

      try {
        const { filePath } = await ensureTranslation({ slug, targetLang })
        console.log(
          `✓ ${slug} → ${targetLang.toUpperCase()} cached at ${filePath}`
        )
      } catch (error) {
        console.error(
          `✗ Failed translating ${slug} → ${targetLang.toUpperCase()}:`,
          (error as Error).message
        )
        process.exitCode = 1
      }
    }
  }
}

void main()
