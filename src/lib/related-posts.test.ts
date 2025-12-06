import { describe, expect, it } from "vitest"

import type { MDXFileData, Metadata } from "@/lib/blog"
import type { SupportedLang } from "@/lib/i18n"
import { resolveRelatedPosts } from "@/lib/related-posts"

describe("resolveRelatedPosts", () => {
  it("prioritizes posts that share overlapping tags", () => {
    const base = createPost({
      slug: "proxmox",
      tags: ["proxmox", "homelab", "networking"],
      content: "proxmox homelab ceph virtualization",
    })
    const overlap = createPost({
      slug: "homelab-network",
      tags: ["homelab", "networking"],
      content: "network automation homelab",
    })
    const distant = createPost({
      slug: "career-notes",
      tags: ["career"],
      content: "resume writing habits",
    })

    const { items, usedFallback } = resolveRelatedPosts(base, {
      candidates: [overlap, distant],
      preferredLang: "en",
      limit: 2,
    })

    expect(items[0]?.slug).toBe("homelab-network")
    expect(items[1]?.slug).toBe("career-notes")
    expect(usedFallback).toBe(true)
  })

  it("falls back to recent posts when similarity is too low", () => {
    const base = createPost({ slug: "base" })
    const older = createPost({ slug: "older", date: "2024-01-01T00:00:00.000Z" })
    const latest = createPost({
      slug: "latest",
      date: "2025-08-01T00:00:00.000Z",
      content: "completely unrelated topic",
    })

    const { items, usedFallback } = resolveRelatedPosts(base, {
      candidates: [older, latest],
      preferredLang: "en",
      limit: 2,
    })

    expect(usedFallback).toBe(true)
    expect(items.map((item) => item.slug)).toEqual(["latest", "older"])
  })

  it("excludes the active slug and enforces the requested limit", () => {
    const base = createPost({ slug: "active", tags: ["seo"] })
    const candidateA = createPost({ slug: "seo-guide", tags: ["seo"] })
    const candidateB = createPost({ slug: "seo-tools", tags: ["seo", "tools"] })

    const { items } = resolveRelatedPosts(base, {
      candidates: [base, candidateA, candidateB],
      preferredLang: "en",
      limit: 1,
      minimumScore: 0,
    })

    expect(items).toHaveLength(1)
    expect(["seo-guide", "seo-tools"]).toContain(items[0]?.slug)
    expect(items.find((item) => item.slug === "active")).toBeUndefined()
  })
})

type PostInput = {
  slug: string
  lang?: SupportedLang
  title?: string
  description?: string
  date?: string
  tags?: string[]
  content?: string
}

function createPost({
  slug,
  lang = "en",
  title = `Title for ${slug}`,
  description = `Description for ${slug}`,
  date = "2025-01-01T00:00:00.000Z",
  tags = [],
  content = `${slug} content ${tags.join(" ")}`,
}: PostInput): MDXFileData {
  const metadata: Metadata = {
    title,
    description,
    date,
    tags,
  }

  return {
    slug,
    lang,
    content,
    metadata,
    availableLangs: [lang],
    localizedMetadata: {
      [lang]: metadata,
    },
  }
}
