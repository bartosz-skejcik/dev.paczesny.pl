import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { MDX } from "./mdx"
import {
  getAvailableLanguages,
  getPostBySlug,
  getPostSlugs,
  type MDXFileData,
} from "@/lib/blog"
import {
  DEFAULT_FALLBACK_LANG,
  SUPPORTED_LANGS,
  type SupportedLang,
} from "@/lib/i18n"
import { LanguageSwitcher } from "@/components/language-switcher"

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
  const canonicalUrl = `https://dev.paczesny.pl/blog/${post.lang}/${slug}`
  const publishedTime = new Date(post.metadata.date).toISOString()
  const alternateLanguages = Object.fromEntries(
    available.map((language) => [
      language,
      `https://dev.paczesny.pl/blog/${language}/${slug}`,
    ])
  )

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    alternates: {
      canonical: canonicalUrl,
      languages: alternateLanguages,
    },
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      publishedTime,
      locale: post.lang,
      type: "article",
      url: canonicalUrl,
      images: [
        {
          url: `https://dev.paczesny.pl/og/blog?title=${encodeURIComponent(
            post.metadata.title
          )}&lang=${post.lang}`,
        },
      ],
    },
    twitter: {
      title: post.metadata.title,
      description: post.metadata.description,
      card: "summary_large_image",
      creator: "@_j5on",
      images: [
        `https://dev.paczesny.pl/og/blog?title=${encodeURIComponent(
          post.metadata.title
        )}&lang=${post.lang}`,
      ],
    },
  }
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
  const timeToRead = Math.max(
    1,
    Math.round(post.content.split(/\s+/).length / 180)
  )

  const articleSchema = buildArticleSchema(post, slug)

  return (
    <ViewTransition>
      <section className="animate-fade-in-up">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema),
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

        <article className="prose prose-invert max-w-none prose-headings:text-white prose-a:text-white hover:prose-a:underline">
          <MDX source={post.content} />
        </article>
      </section>
    </ViewTransition>
  )
}

function buildArticleSchema(post: MDXFileData, slug: string) {
  const baseUrl = `https://dev.paczesny.pl/blog/${post.lang}/${slug}`
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.metadata.title,
    description: post.metadata.description,
    datePublished: post.metadata.date,
    dateModified: post.metadata.date,
    inLanguage: post.lang,
    image: `https://dev.paczesny.pl/og/blog?title=${encodeURIComponent(
      post.metadata.title
    )}&lang=${post.lang}`,
    mainEntityOfPage: baseUrl,
    url: baseUrl,
    author: {
      "@type": "Person",
      name: "Bartłomiej Paczesny",
    },
  }
}

function normalizeLang(lang: string): SupportedLang {
  const candidate = lang?.toLowerCase() as SupportedLang
  return SUPPORTED_LANGS.includes(candidate) ? candidate : DEFAULT_FALLBACK_LANG
}

function formatDate(date: string, lang: SupportedLang) {
  const locales: Record<SupportedLang, string> = {
    pl: "pl-PL",
    en: "en-US",
    de: "de-DE",
    fr: "fr-FR",
    es: "es-ES",
  }
  return new Date(date).toLocaleDateString(locales[lang], {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
