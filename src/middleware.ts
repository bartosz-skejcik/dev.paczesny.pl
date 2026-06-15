import { NextResponse, type NextRequest } from "next/server"

// RFC 8288 Link headers advertising agent-discoverable resources.
const LINK_HEADER = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</llms.txt>; rel="alternate"; type="text/plain"',
  '</sitemap.xml>; rel="sitemap"',
  '</feed.xml>; rel="alternate"; type="application/rss+xml"',
  '</feed.json>; rel="alternate"; type="application/feed+json"',
].join(", ")

function wantsMarkdown(accept: string | null): boolean {
  if (!accept) {
    return false
  }
  return accept
    .split(",")
    .some((part) => part.trim().toLowerCase().startsWith("text/markdown"))
}

// Map a public path to its Markdown endpoint, or null if not negotiable.
function markdownTarget(pathname: string): string | null {
  if (pathname === "/") {
    return "/api/md"
  }
  if (pathname === "/blog") {
    return "/api/md/blog"
  }
  const post = /^\/blog\/([a-z]{2})\/([^/]+)\/?$/.exec(pathname)
  if (post) {
    return `/api/md/blog/${post[1]}/${post[2]}`
  }
  return null
}

function withDiscoveryHeaders(response: NextResponse): NextResponse {
  response.headers.set("Link", LINK_HEADER)
  const vary = response.headers.get("Vary")
  response.headers.set("Vary", vary ? `${vary}, Accept` : "Accept")
  return response
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (wantsMarkdown(request.headers.get("accept"))) {
    const target = markdownTarget(pathname)
    if (target) {
      const url = request.nextUrl.clone()
      url.pathname = target
      return withDiscoveryHeaders(NextResponse.rewrite(url))
    }
  }

  return withDiscoveryHeaders(NextResponse.next())
}

export const config = {
  // Run on page routes only: skip Next internals, API routes, and any path with
  // a file extension (assets, robots.txt, sitemap.xml, feeds, og images).
  matcher: ["/((?!_next/|api/|.*\\.[a-zA-Z0-9]+$).*)"],
}
