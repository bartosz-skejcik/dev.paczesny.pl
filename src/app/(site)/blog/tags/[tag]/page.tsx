import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ScrambleText } from "@/components/scramble-text"
import { PostsList } from "@/components/posts-list"
import { getPostsByTag, getTagSummaries, getTagSummaryBySlug } from "@/lib/blog"
import { DEFAULT_FALLBACK_LANG } from "@/lib/i18n"
import { buildLocalizedMetadata } from "@/lib/seo"
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  createJsonLd,
} from "@/lib/structured-data"
import Link from "next/link"

const sortByDateDesc = (posts: ReturnType<typeof getPostsByTag>) =>
  [...posts].sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  )

type PageProps = {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  return getTagSummaries().map((summary) => ({ tag: summary.slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata | undefined> {
  const { tag } = await params
  const summary = getTagSummaryBySlug(tag)

  if (!summary) {
    return
  }

  return buildLocalizedMetadata({
    lang: DEFAULT_FALLBACK_LANG,
    title: `#${summary.label.toLowerCase()} posts`,
    description: `Archive of articles tagged ${summary.label}.`,
    path: `/blog/tags/${summary.slug}`,
    openGraphImagePath: `/og/home?title=${encodeURIComponent(
      `#${summary.label}`
    )}`,
  })
}

export default async function TagArchivePage({ params }: PageProps) {
  const { tag } = await params
  const summary = getTagSummaryBySlug(tag)

  if (!summary) {
    notFound()
  }

  const posts = getPostsByTag(summary.slug)

  if (!posts.length) {
    notFound()
  }

  const sortedPosts = sortByDateDesc(posts)
  const tagJsonLd = createJsonLd(
    buildCollectionPageSchema({
      name: `#${summary.label.toLowerCase()} posts`,
      description: `Articles tagged ${summary.label}.`,
      path: `/blog/tags/${summary.slug}`,
      items: sortedPosts.map((post) => ({
        name: post.metadata.title,
        description: post.metadata.description,
        path: `/blog/${post.lang}/${post.slug}`,
        lang: post.lang,
        datePublished: post.metadata.date,
      })),
    }),
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: "Tags", path: "/blog/tags" },
      {
        name: `#${summary.label.toLowerCase()}`,
        path: `/blog/tags/${summary.slug}`,
      },
    ])
  )

  return (
    <main className="animate-fade-in-up relative">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(tagJsonLd),
        }}
      />
      <h1 className="text-4xl font-bold mb-4 text-white">
        <span className="text-accent mr-2">*</span>
        <ScrambleText text={`#${summary.label.toLowerCase()}`} />
      </h1>
      <p className="text-sm text-neutral-400 mb-6">
        Showing {sortedPosts.length}{" "}
        {sortedPosts.length === 1 ? "post" : "posts"} tagged{" "}
        <span className="text-white">#{summary.label.toLowerCase()}</span>. Need
        another topic?{" "}
        <Link href="/blog/tags" className="underline">
          Browse all tags
        </Link>
        .
      </p>

      <PostsList posts={sortedPosts} />
    </main>
  )
}
