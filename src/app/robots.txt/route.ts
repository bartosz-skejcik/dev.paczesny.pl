import { getDeploymentContext, runtimeAbsoluteUrl } from "@/lib/runtime-url"

export const dynamic = "force-static"
export const revalidate = 3600

// robots.txt is served from a route handler (not the metadata convention) so we
// can emit Content-Signal directives (https://contentsignals.org), which the
// MetadataRoute.Robots API does not support. The site is fully open to agents:
// AI training, search indexing, and AI input/answers are all allowed.
const CONTENT_SIGNAL = "Content-Signal: ai-train=yes, search=yes, ai-input=yes"

export function GET() {
  const { baseUrl, isProduction } = getDeploymentContext()
  const sitemapUrl = runtimeAbsoluteUrl("/sitemap.xml")

  const lines = isProduction
    ? ["User-Agent: *", "Allow: /", CONTENT_SIGNAL]
    : ["User-Agent: *", "Disallow: /"]

  lines.push("", `Host: ${baseUrl}`, `Sitemap: ${sitemapUrl}`, "")

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=1800",
    },
  })
}
