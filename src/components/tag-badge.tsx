import Link from "next/link"
import { createTagSlug } from "@/lib/tags"

export type TagBadgeProps = {
  tag: string
  href?: string
  className?: string
}

export function TagBadge({ tag, href, className }: TagBadgeProps) {
  const targetHref = href ?? `/blog/tags/${createTagSlug(tag)}`
  const composedClassName = [
    "inline-flex items-center rounded-full border border-neutral-800 px-2 py-0.5 text-[10px] tracking-wide text-neutral-400 transition-colors duration-200 hover:border-accent/60 hover:text-accent whitespace-nowrap flex-shrink-0",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <Link
      href={targetHref}
      className={composedClassName}
      aria-label={`View posts tagged ${tag}`}
    >
      #{tag}
    </Link>
  )
}
