"use client"

import { type MDXFileData } from "@/lib/blog"
import type { SupportedLang } from "@/lib/i18n"
import Link from "next/link"
import { useEffect, useState } from "react"
import { TagBadge } from "@/components/tag-badge"

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
  const tags = Array.from(
    new Set(metadataForLang.tags ?? post.metadata.tags ?? [])
  ).filter(Boolean)

  return (
    <article
      id={domId}
      role={searchContext ? "option" : undefined}
      aria-selected={searchContext ? Boolean(isSelected) : undefined}
      aria-labelledby={titleId}
      aria-describedby={metaId}
      className={`group flex flex-col gap-1.5 ${
        isSelected
          ? "bg-gradient-to-r from-accent/10 to-transparent -mx-2 px-2 py-1 border-l-2 border-l-accent/50"
          : ""
      }`}
    >
      <div className="flex items-baseline justify-between gap-4">
        <Link
          href={`/blog/${lang}/${post.slug}`}
          prefetch={true}
          className="min-w-0 text-neutral-200 group-hover:text-accent transition-colors duration-200 leading-snug"
          aria-labelledby={titleId}
          aria-describedby={metaId}
        >
          <ViewTransition name={`post-title-${post.slug}`}>
            <span id={titleId}>{metadataForLang.title.toLowerCase()}</span>
          </ViewTransition>
        </Link>

        <ViewTransition name={`post-date-${post.slug}`}>
          <span className="shrink-0 whitespace-nowrap text-xs uppercase tracking-wide text-neutral-500 tabular-nums">
            {formattedPublishedDate}
          </span>
        </ViewTransition>
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px]">
        <span
          className="flex items-center gap-1.5"
          aria-label={`Available in ${languagesDescription}`}
        >
          {availableLangs.map((availableLang) => (
            <span
              key={availableLang}
              className={
                availableLang === lang
                  ? "text-accent"
                  : "text-neutral-600 transition-colors group-hover:text-neutral-500"
              }
              aria-current={availableLang === lang ? "true" : undefined}
            >
              {availableLang}
            </span>
          ))}
        </span>

        {tags.length > 0 && (
          <>
            <span aria-hidden="true" className="text-neutral-700">
              ·
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {tags.slice(0, 3).map((tag) => (
                <TagBadge key={tag} tag={tag} className="text-[10px]!" />
              ))}
            </div>
          </>
        )}
      </div>

      <p id={metaId} className="sr-only">
        {`Published ${formattedPublishedDate}. Available languages: ${languagesDescription}.${
          tags.length ? ` Tags: ${tags.join(", ")}.` : ""
        }`}
      </p>
    </article>
  )
}
