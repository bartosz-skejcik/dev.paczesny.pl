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
      className={`flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between group ${
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

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 text-sm text-neutral-400 shrink-0">
        <div className="flex items-center gap-2">
          {post.availableLangs && post.availableLangs.length > 1 ? (
            <div className="flex items-center flex-wrap gap-2">
              {post.availableLangs.map((availableLang) => (
                <span
                  key={availableLang}
                  className={`px-2 py-0.5 text-[11px] border rounded ${
                    availableLang === lang
                      ? "border-accent/50 text-accent"
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
              className="px-2 py-0.5 text-[11px] border border-neutral-700 rounded"
              aria-label={`Available in ${post.lang.toUpperCase()} language`}
            >
              {post.lang}
            </span>
          )}
        </div>

        {tags.length > 0 && (
          <div
            className="flex gap-2 text-neutral-500 overflow-hidden max-w-full flex-nowrap"
            style={{
              maskImage:
                "linear-gradient(90deg, rgba(0, 0, 0, 0.95) 80%, transparent)",
              WebkitMaskImage:
                "linear-gradient(90deg, rgba(0, 0, 0, 0.95) 80%, transparent)",
            }}
          >
            {tags.length > 3
              ? tags
                  .slice(0, 3)
                  .map((tag) => (
                    <TagBadge key={tag} tag={tag} className="text-[11px]!" />
                  ))
              : tags.map((tag) => (
                  <TagBadge key={tag} tag={tag} className="text-[11px]!" />
                ))}
          </div>
        )}

        <ViewTransition name={`post-date-${post.slug}`}>
          <span className="text-xs uppercase tracking-wide text-neutral-500">
            {formattedPublishedDate}
          </span>
        </ViewTransition>
      </div>
      <p id={metaId} className="sr-only">
        {`Published ${formattedPublishedDate}. Available languages: ${languagesDescription}.${
          tags.length ? ` Tags: ${tags.join(", ")}.` : ""
        }`}
      </p>
    </article>
  )
}
