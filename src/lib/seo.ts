import type { Metadata } from "next"
import {
  DEFAULT_FALLBACK_LANG,
  getLanguageConfig,
  type SupportedLang,
} from "@/lib/i18n"

export const SITE_URL = "https://dev.paczesny.pl"
export const SITE_NAME = "Bartek Paczesny"
export const DEFAULT_SEO_DESCRIPTION =
  'Developer, IT Specialist and the "I can fix your computer" guy.'

const DEFAULT_TWITTER_HANDLE = "@j5on"

export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString()
}

type MetadataInput = {
  lang?: SupportedLang
  title: string
  description: string
  path: string
  openGraphImagePath?: string
  publishedTime?: string
  type?: "website" | "article"
  alternates?: Record<string, string>
  twitterHandle?: string
}

export function buildLocalizedMetadata({
  lang = DEFAULT_FALLBACK_LANG,
  title,
  description,
  path,
  openGraphImagePath,
  publishedTime,
  type = "website",
  alternates,
  twitterHandle = DEFAULT_TWITTER_HANDLE,
}: MetadataInput): Metadata {
  const { hrefLang, openGraphLocale, dir } = getLanguageConfig(lang)
  const canonical = absoluteUrl(path)
  const ogImage = absoluteUrl(openGraphImagePath ?? "/og/home")
  const languages = {
    ...(alternates ?? {}),
  }

  if (!languages[hrefLang]) {
    languages[hrefLang] = canonical
  }

  if (!languages["x-default"]) {
    languages["x-default"] = canonical
  }

  return {
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type,
      locale: openGraphLocale,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
        },
      ],
      ...(publishedTime && type === "article" ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      creator: twitterHandle,
      title,
      description,
      images: [ogImage],
    },
    other: {
      "content-language": hrefLang,
      "content-direction": dir,
    },
  }
}
