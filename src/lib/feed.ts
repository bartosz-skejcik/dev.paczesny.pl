import { getPostBySlug, getPostSlugs } from "@/lib/blog"
import {
  CANONICAL_LANG,
  DEFAULT_FALLBACK_LANG,
  getLanguageConfig,
  type SupportedLang,
} from "@/lib/i18n"
import { runtimeAbsoluteUrl } from "@/lib/runtime-url"
import { SITE_NAME } from "@/lib/seo"

export const BLOG_FEED_DESCRIPTION =
  "Writings on programming, computer science, and more."

const FEED_TITLE = `${SITE_NAME} — Blog`
const JSON_FEED_VERSION = "https://jsonfeed.org/version/1.1"

export type FeedAlternate = {
  lang: SupportedLang
  hrefLang: string
  url: string
}

export type FeedEntry = {
  id: string
  slug: string
  lang: SupportedLang
  title: string
  description: string
  url: string
  datePublished: string
  tags: string[]
  coverImage?: string
  alternates: FeedAlternate[]
}

export type JsonFeed = {
  version: string
  title: string
  home_page_url: string
  feed_url: string
  description: string
  language: string
  items: Array<{
    id: string
    url: string
    title: string
    summary: string
    date_published: string
    tags: string[]
    image?: string
    language?: string
  }>
}

export function collectFeedEntries(): FeedEntry[] {
  const slugs = getPostSlugs()
  const entries: FeedEntry[] = []

  slugs.forEach((slug) => {
    const seedPost =
      getPostBySlug(slug, DEFAULT_FALLBACK_LANG) ??
      getPostBySlug(slug, CANONICAL_LANG)

    if (!seedPost) {
      return
    }

    const languages = seedPost.availableLangs?.length
      ? seedPost.availableLangs
      : [seedPost.lang]

    const alternates = languages.map((language) => {
      const { hrefLang } = getLanguageConfig(language)
      return {
        lang: language,
        hrefLang,
        url: runtimeAbsoluteUrl(`/blog/${language}/${slug}`),
      }
    })

    languages.forEach((language) => {
      const metadata =
        seedPost.localizedMetadata?.[language] ?? seedPost.metadata

      const published = new Date(metadata.date)
      if (Number.isNaN(published.getTime())) {
        return
      }

      const entryUrl = runtimeAbsoluteUrl(`/blog/${language}/${slug}`)
      const entry: FeedEntry = {
        id: entryUrl,
        slug,
        lang: language,
        title: metadata.title,
        description: metadata.description,
        url: entryUrl,
        datePublished: published.toISOString(),
        tags: metadata.tags ?? [],
        coverImage: metadata.coverImage
          ? runtimeAbsoluteUrl(metadata.coverImage)
          : undefined,
        alternates,
      }

      entries.push(entry)
    })
  })

  return entries.sort((a, b) => {
    return (
      new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
    )
  })
}

export function buildRssFeed(entries: FeedEntry[]): string {
  const now = new Date().toUTCString()
  const blogUrl = runtimeAbsoluteUrl("/blog")
  const feedUrl = runtimeAbsoluteUrl("/feed.xml")

  const items = entries
    .map((entry) => {
      const tagElements = entry.tags
        .map((tag) => `<category>${escapeXml(tag)}</category>`)
        .join("")

      const alternateLinks = entry.alternates
        .filter((alt) => alt.url !== entry.url)
        .map(
          (alt) =>
            `<atom:link rel="alternate" hreflang="${alt.hrefLang}" href="${alt.url}" />`
        )
        .join("")

      const image = entry.coverImage
        ? `<media:content url="${entry.coverImage}" medium="image" />`
        : ""

      return `
        <item>
          <title>${escapeXml(entry.title)}</title>
          <link>${entry.url}</link>
          <guid isPermaLink="true">${entry.id}</guid>
          <description><![CDATA[${entry.description}]]></description>
          <pubDate>${new Date(entry.datePublished).toUTCString()}</pubDate>
          <dc:language>${entry.lang}</dc:language>
          ${tagElements}
          ${alternateLinks}
          ${image}
        </item>
      `
    })
    .join("")

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${blogUrl}</link>
    <description>${escapeXml(BLOG_FEED_DESCRIPTION)}</description>
    <language>en-US</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`
}

export function buildJsonFeed(entries: FeedEntry[]): JsonFeed {
  const blogUrl = runtimeAbsoluteUrl("/blog")
  const feedUrl = runtimeAbsoluteUrl("/feed.json")

  return {
    version: JSON_FEED_VERSION,
    title: FEED_TITLE,
    home_page_url: blogUrl,
    feed_url: feedUrl,
    description: BLOG_FEED_DESCRIPTION,
    language: "en-US",
    items: entries.map((entry) => ({
      id: entry.id,
      url: entry.url,
      title: entry.title,
      summary: entry.description,
      date_published: entry.datePublished,
      tags: entry.tags,
      image: entry.coverImage,
      language: entry.lang,
    })),
  }
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}
