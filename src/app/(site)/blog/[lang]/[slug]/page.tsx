import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { MDX } from "./mdx"
import { getAvailableLanguages, getPostBySlug, getPostSlugs } from "@/lib/blog"
import {
  DEFAULT_FALLBACK_LANG,
  getLanguageConfig,
  normalizeLang,
  type SupportedLang,
} from "@/lib/i18n"
import { absoluteUrl, buildLocalizedMetadata } from "@/lib/seo"
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  createJsonLd,
} from "@/lib/structured-data"
import { LanguageSwitcher } from "@/components/language-switcher"
import { TagBadge } from "@/components/tag-badge"

// @ts-ignore
import { ViewTransition } from "react"

export const revalidate = 3600
export const dynamicParams = true

type PageProps = {
  params: Promise<{ lang: string; slug: string }>
}

export async function generateStaticParams() {
  return getPostSlugs().flatMap((slug) =>
    getAvailableLanguages(slug).map((lang) => ({ lang, slug }))
  )
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata | undefined> {
  const { lang, slug } = await params
  const normalizedLang = normalizeLang(lang)
  const post =
    getPostBySlug(slug, normalizedLang) ??
    getPostBySlug(slug, DEFAULT_FALLBACK_LANG)

  if (!post) {
    return
  }

  const available = getAvailableLanguages(slug)
  const publishedTime = new Date(post.metadata.date).toISOString()
  const ogImagePath = `/og/blog?title=${encodeURIComponent(
    post.metadata.title
  )}&lang=${post.lang}`
  const alternates = available.reduce<Record<string, string>>(
    (map, language) => {
      const { hrefLang } = getLanguageConfig(language)
      map[hrefLang] = absoluteUrl(`/blog/${language}/${slug}`)
      return map
    },
    {}
  )

  return buildLocalizedMetadata({
    lang: post.lang,
    title: post.metadata.title,
    description: post.metadata.description,
    path: `/blog/${post.lang}/${slug}`,
    openGraphImagePath: ogImagePath,
    publishedTime,
    type: "article",
    alternates,
    twitterHandle: "@_j5on",
  })
}

export default async function Post({ params }: PageProps) {
  const { lang, slug } = await params
  const normalizedLang = normalizeLang(lang)

  let post = getPostBySlug(slug, normalizedLang)
  if (!post) {
    const fallbackPost = getPostBySlug(slug, DEFAULT_FALLBACK_LANG)
    if (fallbackPost && normalizedLang !== DEFAULT_FALLBACK_LANG) {
      redirect(`/blog/${DEFAULT_FALLBACK_LANG}/${slug}`)
    }
    if (!fallbackPost) {
      notFound()
    }
    post = fallbackPost
  }

  const availableLanguages = getAvailableLanguages(slug)
  const readingTimeOverride =
    post.metadata.readingTimeMinutes ??
    post.localizedMetadata?.[DEFAULT_FALLBACK_LANG]?.readingTimeMinutes
  const timeToRead = readingTimeOverride
    ? Math.round(readingTimeOverride)
    : Math.max(1, Math.round(post.content.split(/\s+/).length / 180))
  const tags =
    post.metadata.tags ??
    post.localizedMetadata?.[DEFAULT_FALLBACK_LANG]?.tags ??
    []

  const articleJsonLd = createJsonLd(
    buildArticleSchema(post, slug),
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.metadata.title, path: `/blog/${post.lang}/${slug}` },
    ])
  )

  return (
    <ViewTransition>
      <section className="animate-fade-in-up">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleJsonLd),
          }}
        />

        <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-4xl font-bold text-white">
            <span className="text-accent mr-2">*</span>
            <ViewTransition name={`post-title-${post.slug}`}>
              <span>{post.metadata.title}</span>
            </ViewTransition>
          </h1>
          <LanguageSwitcher
            slug={slug}
            currentLang={post.lang}
            availableLangs={availableLanguages}
          />
        </div>

        <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-neutral-400">
          <span>{timeToRead} min read</span>
          <span className="font-black">•</span>
          <ViewTransition name={`post-date-${post.slug}`}>
            <span>{formatDate(post.metadata.date, post.lang)}</span>
          </ViewTransition>
        </div>

        {tags.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2 text-neutral-500">
            {tags.map((tag) => (
              <TagBadge key={tag} tag={tag} className="text-xs!" />
            ))}
          </div>
        )}

        <article className="prose prose-invert max-w-none prose-headings:text-white prose-a:text-white hover:prose-a:underline">
          <MDX source={post.content} />
        </article>
      </section>
    </ViewTransition>
  )
}

function formatDate(date: string, lang: SupportedLang) {
  const { locale } = getLanguageConfig(lang)
  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
