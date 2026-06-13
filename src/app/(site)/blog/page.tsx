import type { Metadata } from "next"
import { ScrambleText } from "@/components/scramble-text"
import { PostsList } from "@/components/posts-list"
import { getPosts } from "@/lib/blog"
import { BLOG_FEED_DESCRIPTION } from "@/lib/feed"
import { DEFAULT_FALLBACK_LANG } from "@/lib/i18n"
import { buildLocalizedMetadata } from "@/lib/seo"
import { buildCollectionPageSchema, createJsonLd } from "@/lib/structured-data"

const posts = getPosts().sort(
  (a, b) =>
    new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
)

const blogCollectionJsonLd = createJsonLd(
  buildCollectionPageSchema({
    name: "Blog",
    description: BLOG_FEED_DESCRIPTION,
    path: "/blog",
    items: posts.map((post) => ({
      name: post.metadata.title,
      description: post.metadata.description,
      path: `/blog/${post.lang}/${post.slug}`,
      lang: post.lang,
      datePublished: post.metadata.date,
    })),
  })
)

export default async function BlogPage() {
  return (
    <main className="animate-fade-in-up relative">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogCollectionJsonLd),
        }}
      />
      <h1 className="text-4xl font-bold mb-8 text-white">
        <span className="text-accent mr-2">*</span>
        <ScrambleText text="blog" />
      </h1>

      <p className="hidden sm:block text-sm text-neutral-400 mb-8">
        press{" "}
        <kbd className="px-1 py-0.5 text-xs border border-neutral-700 rounded">
          /
        </kbd>{" "}
        to search • use{" "}
        <kbd className="px-1 py-0.5 text-xs border border-neutral-700 rounded">
          ctrl / ⌘ j
        </kbd>{" "}
        and{" "}
        <kbd className="px-1 py-0.5 text-xs border border-neutral-700 rounded">
          ctrl / ⌘ k
        </kbd>{" "}
        or{" "}
        <kbd className="px-1 py-0.5 text-xs border border-neutral-700 rounded">
          ↑
        </kbd>{" "}
        and{" "}
        <kbd className="px-1 py-0.5 text-xs border border-neutral-700 rounded">
          ↓
        </kbd>{" "}
        to navigate
      </p>

      <PostsList posts={posts} />
    </main>
  )
}

export const metadata: Metadata = buildLocalizedMetadata({
  lang: DEFAULT_FALLBACK_LANG,
  title: "Blog",
  description: BLOG_FEED_DESCRIPTION,
  path: "/blog",
  openGraphImagePath: "/og/home?title=blog",
})
