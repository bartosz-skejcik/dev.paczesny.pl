import { getPosts } from "@/lib/blog"
import { DEFAULT_FALLBACK_LANG } from "@/lib/i18n"
import { runtimeAbsoluteUrl } from "@/lib/runtime-url"
import { DEFAULT_SEO_DESCRIPTION, SITE_NAME } from "@/lib/seo"

export const dynamic = "force-static"
export const revalidate = 3600

// llms.txt (https://llmstxt.org) — a curated, markdown entry point for LLMs and
// agents. Lists every post with a link and summary, plus the machine-readable
// feeds. Every page also supports `Accept: text/markdown` for a clean body.
export function GET() {
  const posts = getPosts(DEFAULT_FALLBACK_LANG).sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  )

  const lines: string[] = [
    `# ${SITE_NAME}`,
    "",
    `> ${DEFAULT_SEO_DESCRIPTION}`,
    "",
    "Developer blog and portfolio. Any page returns clean Markdown when requested with the `Accept: text/markdown` header.",
    "",
    "## Blog Posts",
    "",
  ]

  for (const post of posts) {
    const url = runtimeAbsoluteUrl(`/blog/${post.lang}/${post.slug}`)
    const description = post.metadata.description?.trim()
    lines.push(`- [${post.metadata.title}](${url})${description ? `: ${description}` : ""}`)
  }

  lines.push(
    "",
    "## Feeds & Indexes",
    "",
    `- [RSS Feed](${runtimeAbsoluteUrl("/feed.xml")})`,
    `- [JSON Feed](${runtimeAbsoluteUrl("/feed.json")})`,
    `- [Sitemap](${runtimeAbsoluteUrl("/sitemap.xml")})`,
    `- [API Catalog](${runtimeAbsoluteUrl("/.well-known/api-catalog")})`,
    ""
  )

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=1800",
    },
  })
}
