"use client"

import Link from "next/link"
import { useEffect, useMemo, useRef } from "react"
import { TagBadge } from "@/components/tag-badge"
import { trackAnalyticsEvent } from "@/lib/analytics"
import type { RelatedPostSummary } from "@/lib/related-posts"
import { getLanguageConfig, type SupportedLang } from "@/lib/i18n"
import { ScrambleText } from "./scramble-text"

const SECTION_COPY: Record<
  SupportedLang,
  {
    heading: string
    kicker: string
    fallback: string
    empty: string
    cta: string
  }
> = {
  en: {
    heading: "Related reading",
    kicker: "Keep exploring",
    fallback: "No perfect tag overlap yet, so here are the freshest posts.",
    empty:
      "More writing is on the way. Jump back to the blog index in the meantime.",
    cta: "Browse all posts",
  },
  pl: {
    heading: "Powiazane wpisy",
    kicker: "Czytaj dalej",
    fallback: "Brak idealnych tagow, ale te nowe wpisy sa najblizej tematu.",
    empty: "Wkrotce pojawia sie kolejne teksty. Wroc do listy bloga.",
    cta: "Zobacz wszystkie wpisy",
  },
  de: {
    heading: "Verwandte artikel",
    kicker: "Weiterlesen",
    fallback:
      "Noch keine perfekten Tags, deshalb zeigen wir die frischesten posts.",
    empty: "Weitere inhalte folgen bald. Zur blog-ubersicht.",
    cta: "Alle posts ansehen",
  },
  fr: {
    heading: "Lectures recommandees",
    kicker: "Continuez a explorer",
    fallback:
      "Pas encore de tags identiques, voici donc les articles les plus recents.",
    empty: "D'autres articles arrivent bientot. Retour au blog.",
    cta: "Voir tous les articles",
  },
  es: {
    heading: "Lecturas relacionadas",
    kicker: "Sigue explorando",
    fallback:
      "Sin coincidencias exactas de etiquetas aun, mostramos las entradas mas nuevas.",
    empty: "Habra mas articulos pronto. Vuelve al indice del blog.",
    cta: "Ver todas las entradas",
  },
}

type RelatedPostsSectionProps = {
  currentSlug: string
  currentLang: SupportedLang
  items: RelatedPostSummary[]
  usedFallback?: boolean
}

export function RelatedPostsSection({
  currentSlug,
  currentLang,
  items,
  usedFallback = false,
}: RelatedPostsSectionProps) {
  const copy = SECTION_COPY[currentLang]
  const headingId = `related-heading-${currentSlug}`
  const sectionRef = useRef<HTMLElement | null>(null)
  const hasTrackedImpression = useRef(false)
  const locale = getLanguageConfig(currentLang).locale

  useEffect(() => {
    if (!sectionRef.current || hasTrackedImpression.current || !items.length) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!hasTrackedImpression.current && entry.isIntersecting) {
            hasTrackedImpression.current = true
            trackAnalyticsEvent("related_posts_impression", {
              slug: currentSlug,
              lang: currentLang,
              fallback: usedFallback,
              count: items.length,
            })
          }
        })
      },
      { threshold: 0.35 }
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [currentLang, currentSlug, items.length, usedFallback])

  const formatter = useMemo(() => {
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }, [locale])

  if (!items.length) {
    return (
      <section
        ref={sectionRef}
        className="mt-16 rounded-lg border border-neutral-800/80 bg-neutral-900/40 p-6 text-neutral-200"
        aria-labelledby={headingId}
      >
        <p
          className="text-xs uppercase tracking-[0.3em] text-neutral-500"
          id={headingId}
        >
          {copy.heading}
        </p>
        <p className="mt-2 text-base text-neutral-300">{copy.empty}</p>
        <Link
          href="/blog"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
          data-analytics-event="related_post_fallback_cta"
        >
          {copy.cta}
          <span aria-hidden="true">{"->"}</span>
        </Link>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      className="mt-16 border-t border-neutral-900 pt-12"
      aria-labelledby={headingId}
    >
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-neutral-500">
            {copy.kicker}
          </p>
          <h2 id={headingId} className="mt-2 text-3xl font-semibold text-white">
            <span className="text-accent mr-2">*</span>
            <ScrambleText text={copy.heading} />
          </h2>
        </div>
        <p className="text-sm text-neutral-400 max-w-2xl">
          {usedFallback ? copy.fallback : copy.kicker}
        </p>
      </div>

      <ul className="grid gap-6 sm:grid-cols-2" aria-live="polite">
        {items.map((item, index) => {
          const descriptionId = `${item.slug}-${item.lang}-description`
          const formattedDate = safeFormatDate(formatter, item.date)
          return (
            <li key={`${item.slug}-${item.lang}`}>
              <article
                className="flex h-full flex-col justify-between rounded-md border border-neutral-800/80 bg-gradient-to-br from-neutral-900/60 to-black/40 p-5 transition hover:border-accent/50"
                aria-describedby={descriptionId}
                data-related-rank={index + 1}
                data-related-score={item.score}
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                    {formattedDate}
                  </p>
                  <Link
                    href={`/blog/${item.lang}/${item.slug}`}
                    className="mt-2 block text-lg font-semibold text-white hover:text-accent"
                    prefetch={true}
                    onClick={() =>
                      trackAnalyticsEvent("related_post_click", {
                        slug: currentSlug,
                        lang: currentLang,
                        targetSlug: item.slug,
                        targetLang: item.lang,
                        position: index + 1,
                        fallback: usedFallback,
                        score: item.score,
                      })
                    }
                    aria-describedby={descriptionId}
                  >
                    {item.title}
                  </Link>
                  <p
                    id={descriptionId}
                    className="mt-2 text-sm text-neutral-400"
                  >
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                  <span className="rounded border border-neutral-800 px-2 py-0.5 uppercase tracking-wide">
                    {item.lang}
                  </span>
                  {item.tags.slice(0, 4).map((tag) => (
                    <TagBadge
                      key={`${item.slug}-${tag}`}
                      tag={tag}
                      className="text-[11px]!"
                    />
                  ))}
                </div>
              </article>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function safeFormatDate(formatter: Intl.DateTimeFormat, value?: string) {
  if (!value) {
    return ""
  }
  const parsed = Date.parse(value)
  if (Number.isNaN(parsed)) {
    return value
  }
  return formatter.format(parsed)
}
