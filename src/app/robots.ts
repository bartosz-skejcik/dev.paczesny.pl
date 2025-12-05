import type { MetadataRoute } from "next"
import { getDeploymentContext, runtimeAbsoluteUrl } from "@/lib/runtime-url"

export default function robots(): MetadataRoute.Robots {
  const { baseUrl, isProduction } = getDeploymentContext()
  const sitemapUrl = runtimeAbsoluteUrl("/sitemap.xml")

  if (!isProduction) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
      sitemap: [sitemapUrl],
      host: baseUrl,
    }
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: [sitemapUrl],
    host: baseUrl,
  }
}
