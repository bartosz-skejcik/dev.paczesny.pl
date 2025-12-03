import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { getPosts } from "@/lib/blog"

// @ts-ignore
import { ViewTransition } from "react"

const posts = getPosts()
  .sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  )
  .slice(0, 4)

export function BlogSection() {
  if (posts.length === 0) {
    return null
  }

  return (
    <section className="mb-16 animate-fade-in-up">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-white">
        <span className="text-accent mr-2">*</span>
        blog
      </h2>
      <div className="space-y-4">
        {posts.map((post, index) => (
          <div key={index} className="flex justify-between items-center group">
            <Link
              href={`/blog/${post.lang}/${post.slug}`}
              className="text-neutral-200 hover:text-accent transition-colors duration-200"
            >
              <ViewTransition name={`post-title-${post.slug}`}>
                <span>{post.metadata.title.toLowerCase()}</span>
              </ViewTransition>
            </Link>
            <ViewTransition name={`post-date-${post.slug}`}>
              <span className="flex items-center gap-3 text-sm text-neutral-400">
                <span className="rounded-full border border-neutral-700 px-2 py-0.5 text-xs uppercase text-neutral-300">
                  {post.lang}
                </span>
                {formatDate(post.metadata.date)}
              </span>
            </ViewTransition>
          </div>
        ))}
      </div>
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 mt-6 text-accent hover:underline group"
      >
        all posts{" "}
        <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </Link>
    </section>
  )
}

function formatDate(dateString: string) {
  return new Date(dateString)
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .toLowerCase()
}
