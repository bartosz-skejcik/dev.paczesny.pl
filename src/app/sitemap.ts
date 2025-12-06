import type { MetadataRoute } from "next"
import {
  CANONICAL_LANG,
  DEFAULT_FALLBACK_LANG,
  getLanguageConfig,
  type SupportedLang,
} from "@/lib/i18n"
import {
  getAvailableLanguages,
  getPostBySlug,
  getPostSlugs,
  getTagSummaries,
} from "@/lib/blog"
import { runtimeAbsoluteUrl } from "@/lib/runtime-url"

type ChangeFrequency = MetadataRoute.Sitemap[number]["changeFrequency"]

type StaticRoute = {
  path: string
  changeFrequency?: ChangeFrequency
  priority?: number
  languages?: SupportedLang[]
}

const STATIC_ROUTES: StaticRoute[] = [
  {
    path: "/",
    changeFrequency: "weekly",
    priority: 1,
    languages: [DEFAULT_FALLBACK_LANG],
  },
  {
    path: "/blog",
    changeFrequency: "weekly",
    priority: 0.8,
    languages: [DEFAULT_FALLBACK_LANG],
  },
  {
    path: "/blog/tags",
    changeFrequency: "weekly",
    priority: 0.6,
    languages: [DEFAULT_FALLBACK_LANG],
  },
  {
    path: "/projects",
    changeFrequency: "monthly",
    priority: 0.6,
    languages: [DEFAULT_FALLBACK_LANG],
  },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: runtimeAbsoluteUrl(route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    alternates: route.languages
      ? {
          languages: buildLanguageAlternates(
            route.languages,
            (_lang) => route.path
          ),
        }
      : undefined,
  }))

  const postEntries = getPostSlugs().map((slug) => {
    const canonicalPost =
      getPostBySlug(slug, CANONICAL_LANG) ??
      getPostBySlug(slug, DEFAULT_FALLBACK_LANG)

    if (!canonicalPost) {
      return null
    }

    const availableLangs = getAvailableLanguages(slug)
    const alternates = buildLanguageAlternates(
      availableLangs.length ? availableLangs : [canonicalPost.lang],
      (lang) => `/blog/${lang}/${slug}`
    )

    return {
      url: runtimeAbsoluteUrl(`/blog/${canonicalPost.lang}/${slug}`),
      lastModified: new Date(canonicalPost.metadata.date),
      changeFrequency: "weekly" as ChangeFrequency,
      priority: 0.7,
      alternates: alternates ? { languages: alternates } : undefined,
    }
  })

  const tagEntries = getTagSummaries().map((tag) => ({
    url: runtimeAbsoluteUrl(`/blog/tags/${tag.slug}`),
    changeFrequency: "weekly" as ChangeFrequency,
    priority: 0.5,
  }))

  return routes
    .concat(postEntries.filter(Boolean) as MetadataRoute.Sitemap)
    .concat(tagEntries)
}

function buildLanguageAlternates(
  languages: SupportedLang[],
  buildPath: (lang: SupportedLang) => string
) {
  if (!languages.length) {
    return undefined
  }

  const alternates: Record<string, string> = {}
  languages.forEach((lang) => {
    const { hrefLang } = getLanguageConfig(lang)
    alternates[hrefLang] = runtimeAbsoluteUrl(buildPath(lang))
  })

  const fallbackHref = getLanguageConfig(DEFAULT_FALLBACK_LANG).hrefLang
  if (!alternates[fallbackHref]) {
    alternates[fallbackHref] = runtimeAbsoluteUrl(
      buildPath(DEFAULT_FALLBACK_LANG)
    )
  }

  alternates["x-default"] = alternates[fallbackHref]

  return alternates
}
