import { type MDXFileData } from "@/lib/blog"
import Link from "next/link"

// @ts-ignore
import { ViewTransition } from "react"

type PostItemProps = {
  post: MDXFileData
  isSelected?: boolean
}

export function PostItem({ post, isSelected }: PostItemProps) {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 group ${
        isSelected
          ? "bg-gradient-to-r from-accent/10 to-transparent -mx-2 px-2 border-l-2 border-l-accent/50"
          : ""
      }`}
    >
      <Link
        href={`/blog/${post.lang}/${post.slug}`}
        prefetch={true}
        className="text-neutral-200 hover:text-accent transition-colors duration-200"
      >
        <ViewTransition name={`post-title-${post.slug}`}>
          <span>{post.metadata.title.toLowerCase()}</span>
        </ViewTransition>
      </Link>
      <div className="flex items-center text-sm text-neutral-400 shrink-0">
        <span className="mr-3 rounded-full border border-neutral-700 px-2 py-0.5 text-xs uppercase text-neutral-300">
          {post.lang}
        </span>
        <ViewTransition name={`post-date-${post.slug}`}>
          <span>
            {new Date(post.metadata.date)
              .toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
              .toLowerCase()}
          </span>
        </ViewTransition>
      </div>
    </div>
  )
}
