import type { Metadata } from "next"
import Link from "next/link"
import { ScrambleText } from "@/components/scramble-text"
import { TagBadge } from "@/components/tag-badge"
import { getTagSummaries } from "@/lib/blog"
import { DEFAULT_FALLBACK_LANG } from "@/lib/i18n"
import { buildLocalizedMetadata } from "@/lib/seo"

const tagSummaries = getTagSummaries()

export const metadata: Metadata = buildLocalizedMetadata({
  lang: DEFAULT_FALLBACK_LANG,
  title: "Tags",
  description: "Filter dev.paczesny.pl posts by topic.",
  path: "/blog/tags",
  openGraphImagePath: "/og/home?title=tags",
})

export default async function TagsIndexPage() {
  return (
    <main className="animate-fade-in-up relative">
      <h1 className="text-4xl font-bold mb-4 text-white">
        <span className="text-accent mr-2">*</span>
        <ScrambleText text="tags" />
      </h1>
      <p className="text-sm text-neutral-400 mb-8">
        {tagSummaries.length === 0 ? (
          <>
            No tags are available yet. Add 'tags' to your MDX front matter to
            begin.
          </>
        ) : (
          <>
            Pick a topic to explore archived posts. Looking for everything?{" "}
            <Link href="/blog" className="underline">
              return to the blog index
            </Link>
            .
          </>
        )}
      </p>

      {tagSummaries.length > 0 && (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tagSummaries.map((tag) => (
            <li key={tag.slug}>
              <Link
                href={`/blog/tags/${tag.slug}`}
                className="border border-neutral-800 p-4 flex flex-col gap-3 hover:border-accent/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <TagBadge tag={tag.label} interactive={false} />
                  <span className="text-xs uppercase tracking-wide text-neutral-500">
                    {tag.count} {tag.count === 1 ? "post" : "posts"}
                  </span>
                </div>
                <p className="text-sm text-neutral-400">
                  Browse all articles filed under #{tag.label.toLowerCase()}.
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
