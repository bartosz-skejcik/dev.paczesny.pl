"use client"

import { type MDXFileData } from "@/lib/blog"
import type { SupportedLang } from "@/lib/i18n"
import Link from "next/link"
import { useEffect, useState } from "react"

// @ts-ignore
import { ViewTransition } from "react"

export const buildPostDomId = (post: Pick<MDXFileData, "lang" | "slug">) =>
  `post-${post.lang}-${post.slug}`

type PostItemProps = {
  post: MDXFileData
  isSelected?: boolean
  preferredLang?: SupportedLang | null
  searchContext?: boolean
}

export function PostItem({
  post,
  isSelected,
  preferredLang,
  searchContext,
}: PostItemProps) {
  const [lang, setLang] = useState<SupportedLang>(post.lang)

  useEffect(() => {
    if (preferredLang && post.availableLangs?.includes(preferredLang)) {
      setLang(preferredLang)
      return
    }

    const browserLang = navigator.language?.slice(0, 2).toLowerCase() as
      | SupportedLang
      | undefined

    if (browserLang && post.availableLangs?.includes(browserLang)) {
      setLang(browserLang)
    } else {
      setLang(post.lang)
    }
  }, [preferredLang, post.availableLangs, post.lang])

  const metadataForLang =
    post.localizedMetadata?.[lang] ??
    post.localizedMetadata?.[post.lang] ??
    post.metadata

  const domId = buildPostDomId(post)
  const titleId = `${domId}-title`
  const metaId = `${domId}-meta`
  const publishedDate = metadataForLang.date ?? post.metadata.date
  const formattedPublishedDate = new Date(publishedDate)
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .toLowerCase()

  const availableLangs =
    post.availableLangs && post.availableLangs.length > 0
      ? post.availableLangs
      : [post.lang]

  const languagesDescription = availableLangs.join(", ")

  return (
    <article
      id={domId}
      role={searchContext ? "option" : undefined}
      aria-selected={searchContext ? Boolean(isSelected) : undefined}
      aria-labelledby={titleId}
      aria-describedby={metaId}
      className={`flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 group ${
        isSelected
          ? "bg-gradient-to-r from-accent/10 to-transparent -mx-2 px-2 border-l-2 border-l-accent/50"
          : ""
      }`}
    >
      <Link
        href={`/blog/${lang}/${post.slug}`}
        prefetch={true}
        className="text-neutral-200 hover:text-accent transition-colors duration-200"
        aria-labelledby={titleId}
        aria-describedby={metaId}
      >
        <ViewTransition name={`post-title-${post.slug}`}>
          <span id={titleId}>{metadataForLang.title.toLowerCase()}</span>
        </ViewTransition>
      </Link>
      <div className="flex items-center text-sm text-neutral-400 shrink-0">
        {post.availableLangs && post.availableLangs.length > 1 ? (
          <div>
            {post.availableLangs.map((availableLang) => (
              <span
                key={availableLang}
                className={`px-1 py-0.5 text-xs border rounded mr-3 ${
                  availableLang === lang
                    ? "border-accent/50 text-accent/80"
                    : "border-neutral-700"
                }`}
                aria-label={`Available in ${availableLang.toUpperCase()} language${
                  availableLang === lang ? ", currently shown" : ""
                }`}
                aria-current={availableLang === lang ? "true" : undefined}
              >
                {availableLang}
              </span>
            ))}
          </div>
        ) : (
          <span
            className="px-1 py-0.5 text-xs border border-neutral-700 rounded mr-3"
            aria-label={`Available in ${post.lang.toUpperCase()} language`}
          >
            {post.lang}
          </span>
        )}
        <ViewTransition name={`post-date-${post.slug}`}>
          <span>{formattedPublishedDate}</span>
        </ViewTransition>
      </div>
      <p id={metaId} className="sr-only">
        {`Published ${formattedPublishedDate}. Available languages: ${languagesDescription}.`}
      </p>
    </article>
  )
}
