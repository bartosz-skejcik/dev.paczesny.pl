import { runtimeAbsoluteUrl } from "@/lib/runtime-url"

export const dynamic = "force-static"
export const revalidate = 3600

// API Catalog (RFC 9727) — advertises the machine-readable resources this site
// exposes (feeds, sitemap, llms.txt) as an application/linkset+json document so
// agents can discover them programmatically. RFC 8288 link relations are used.
export function GET() {
  const linkset = [
    {
      anchor: runtimeAbsoluteUrl("/"),
      "service-doc": [
        {
          href: runtimeAbsoluteUrl("/llms.txt"),
          type: "text/plain",
          title: "llms.txt — agent-oriented site index",
        },
      ],
      "service-desc": [
        {
          href: runtimeAbsoluteUrl("/feed.json"),
          type: "application/feed+json",
          title: "JSON Feed of blog posts",
        },
        {
          href: runtimeAbsoluteUrl("/feed.xml"),
          type: "application/rss+xml",
          title: "RSS Feed of blog posts",
        },
      ],
      describedby: [
        {
          href: runtimeAbsoluteUrl("/sitemap.xml"),
          type: "application/xml",
          title: "XML Sitemap",
        },
      ],
    },
  ]

  return Response.json(
    { linkset },
    {
      headers: {
        "Content-Type": "application/linkset+json",
        "Cache-Control": "s-maxage=3600, stale-while-revalidate=1800",
      },
    }
  )
}
