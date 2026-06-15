import { getPostBySlug, getPosts } from "@/lib/blog"
import {
  DEFAULT_FALLBACK_LANG,
  normalizeLang,
  SUPPORTED_LANGS,
} from "@/lib/i18n"
import { runtimeAbsoluteUrl } from "@/lib/runtime-url"
import { DEFAULT_SEO_DESCRIPTION, SITE_NAME } from "@/lib/seo"

export const revalidate = 3600

// Markdown content negotiation. The middleware rewrites requests carrying
// `Accept: text/markdown` to this route, so e.g. GET / (Accept: text/markdown)
// is served here as Markdown while browsers keep getting HTML.

const MARKDOWN_HEADERS = {
  "Content-Type": "text/markdown; charset=utf-8",
  "Cache-Control": "s-maxage=3600, stale-while-revalidate=1800",
  Vary: "Accept",
}

function markdown(body: string) {
  return new Response(body, { headers: MARKDOWN_HEADERS })
}

function postList(): string {
  const posts = getPosts(DEFAULT_FALLBACK_LANG).sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  )
  return posts
    .map((post) => {
      const url = runtimeAbsoluteUrl(`/blog/${post.lang}/${post.slug}`)
      const description = post.metadata.description?.trim()
      return `- [${post.metadata.title}](${url})${description ? `: ${description}` : ""}`
    })
    .join("\n")
}

function homeMarkdown(): string {
  return [
    `# ${SITE_NAME}`,
    "",
    `> ${DEFAULT_SEO_DESCRIPTION}`,
    "",
    "## Blog Posts",
    "",
    postList(),
    "",
  ].join("\n")
}

function blogIndexMarkdown(): string {
  return [`# Blog — ${SITE_NAME}`, "", postList(), ""].join("\n")
}

function postMarkdown(lang: string, slug: string): Response | null {
  const normalized = normalizeLang(lang)
  const post = getPostBySlug(slug, normalized)
  if (!post) {
    return null
  }

  const { metadata, content } = post
  const meta: string[] = []
  if (metadata.date) {
    meta.push(`Published: ${metadata.date}`)
  }
  if (metadata.tags?.length) {
    meta.push(`Tags: ${metadata.tags.join(", ")}`)
  }

  const body = [
    `# ${metadata.title}`,
    "",
    metadata.description ? `> ${metadata.description}` : "",
    meta.length ? `\n_${meta.join(" · ")}_` : "",
    "",
    content,
    "",
  ]
    .filter((segment) => segment !== "")
    .join("\n")

  return markdown(body)
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const { path = [] } = await params

  // Home: rewritten from "/"
  if (path.length === 0) {
    return markdown(homeMarkdown())
  }

  // Blog index: "/blog"
  if (path.length === 1 && path[0] === "blog") {
    return markdown(blogIndexMarkdown())
  }

  // Blog post: "/blog/{lang}/{slug}"
  if (
    path.length === 3 &&
    path[0] === "blog" &&
    (SUPPORTED_LANGS as readonly string[]).includes(path[1]!)
  ) {
    const response = postMarkdown(path[1]!, path[2]!)
    if (response) {
      return response
    }
  }

  return new Response("Not found", {
    status: 404,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
