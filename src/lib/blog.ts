import fs from "fs"
import path from "path"
import {
  CANONICAL_LANG,
  DEFAULT_FALLBACK_LANG,
  SUPPORTED_LANGS,
  type SupportedLang,
} from "@/lib/i18n"
import { createTagSlug } from "@/lib/tags"

export type Metadata = {
  title: string
  description: string
  date: string
  tags?: string[]
  coverImage?: string
  readingTimeMinutes?: number
}

export type FrontmatterParseResult = {
  metadata: Metadata
  content: string
}

export type MDXFileData = FrontmatterParseResult & {
  slug: string
  lang: SupportedLang
  availableLangs?: SupportedLang[]
  localizedMetadata?: Partial<Record<SupportedLang, Metadata>>
}

export type TagSummary = {
  slug: string
  label: string
  count: number
}

const POSTS_ROOT = path.join(process.cwd(), "content", "posts")
const SUPPORTED_EXTENSIONS = [".mdx", ".md"]

export function getPosts(
  preferredLang: SupportedLang = DEFAULT_FALLBACK_LANG
): MDXFileData[] {
  return getPostSlugs()
    .map(
      (slug) =>
        getPostBySlug(slug, preferredLang) ??
        getPostBySlug(slug, CANONICAL_LANG)
    )
    .filter((post): post is MDXFileData => Boolean(post))
}

export function getPostBySlug(
  slug: string,
  lang: SupportedLang
): MDXFileData | null {
  const filePath = getPostFilePath(slug, lang)
  if (!filePath) {
    return null
  }
  const { metadata, content } = readMDXFile(filePath)
  const availableLangs = getAvailableLanguages(slug)
  const localizedMetadataEntries: Array<[SupportedLang, Metadata]> = [
    [lang, metadata],
  ]

  availableLangs
    .filter((availableLang) => availableLang !== lang)
    .forEach((availableLang) => {
      const alternativePath = getPostFilePath(slug, availableLang)
      if (!alternativePath) {
        return
      }
      const { metadata: alternativeMetadata } = readMDXFile(alternativePath)
      localizedMetadataEntries.push([availableLang, alternativeMetadata])
    })

  const localizedMetadata = Object.fromEntries(
    localizedMetadataEntries
  ) as Partial<Record<SupportedLang, Metadata>>

  return { metadata, content, slug, lang, availableLangs, localizedMetadata }
}

export function getCanonicalPost(slug: string) {
  return getPostBySlug(slug, CANONICAL_LANG)
}

export function getTagSummaries(
  preferredLang: SupportedLang = DEFAULT_FALLBACK_LANG
): TagSummary[] {
  const posts = getPosts(preferredLang)
  const summaryMap = new Map<string, TagSummary>()

  posts.forEach((post) => {
    const tags = Array.from(new Set(getTagsForPost(post, preferredLang)))
    tags.forEach((tag) => {
      const slug = createTagSlug(tag)
      if (!slug) {
        return
      }

      const current = summaryMap.get(slug)
      if (current) {
        current.count += 1
      } else {
        summaryMap.set(slug, { slug, label: tag, count: 1 })
      }
    })
  })

  return Array.from(summaryMap.values()).sort((a, b) => {
    if (b.count === a.count) {
      return a.label.localeCompare(b.label)
    }
    return b.count - a.count
  })
}

export function getTagSummaryBySlug(
  tagSlug: string,
  preferredLang: SupportedLang = DEFAULT_FALLBACK_LANG
): TagSummary | null {
  const normalizedSlug = createTagSlug(tagSlug)
  if (!normalizedSlug) {
    return null
  }

  return (
    getTagSummaries(preferredLang).find(
      (summary) => summary.slug === normalizedSlug
    ) ?? null
  )
}

export function getPostsByTag(
  tagSlugOrLabel: string,
  preferredLang: SupportedLang = DEFAULT_FALLBACK_LANG
): MDXFileData[] {
  const normalizedSlug = createTagSlug(tagSlugOrLabel)
  return getPosts(preferredLang).filter((post) => {
    return getTagsForPost(post, preferredLang).some(
      (tag) => createTagSlug(tag) === normalizedSlug
    )
  })
}

export function getTagsForPost(
  post: MDXFileData,
  lang: SupportedLang = post.lang
) {
  const metadataForLang =
    post.localizedMetadata?.[lang] ??
    post.localizedMetadata?.[post.lang] ??
    post.metadata

  return metadataForLang.tags ?? post.metadata.tags ?? []
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_ROOT)) {
    return []
  }

  return fs
    .readdirSync(POSTS_ROOT)
    .filter((entry) => fs.statSync(path.join(POSTS_ROOT, entry)).isDirectory())
}

export function getAvailableLanguages(slug: string): SupportedLang[] {
  return SUPPORTED_LANGS.filter((lang) => Boolean(getPostFilePath(slug, lang)))
}

export function getPostFilePath(slug: string, lang: string): string | null {
  const dir = path.join(POSTS_ROOT, slug)
  if (!fs.existsSync(dir)) {
    return null
  }

  for (const extension of SUPPORTED_EXTENSIONS) {
    const candidate = path.join(dir, `${lang}${extension}`)
    if (fs.existsSync(candidate)) {
      return candidate
    }
  }

  return null
}

export function parseFrontmatter(fileContent: string): FrontmatterParseResult {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  const match = frontmatterRegex.exec(fileContent)

  if (!match) {
    throw new Error("No frontmatter found")
  }

  const frontmatter = match[1]

  if (!frontmatter) {
    throw new Error("No frontmatter found")
  }

  const content = fileContent.replace(frontmatterRegex, "").trim()
  const frontmatterLines = frontmatter
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
  const metadata: Partial<Metadata> = {}

  frontmatterLines.forEach((line) => {
    const [rawKey, ...rest] = line.split(":")
    if (!rawKey || rest.length === 0) {
      return
    }

    const key = rawKey.trim()
    let value = rest.join(":").trim()
    value = value.replace(/^["'](.*)["']$/, "$1")

    if (!value) {
      return
    }

    if (key === "tags") {
      metadata.tags = parseListValue(value)
      return
    }

    if (key === "readingTimeMinutes") {
      const minutes = Number.parseFloat(value)
      if (!Number.isNaN(minutes) && minutes > 0) {
        metadata.readingTimeMinutes = minutes
      }
      return
    }

    metadata[key as keyof Metadata] = value as Metadata[keyof Metadata]
  })

  return { metadata: metadata as Metadata, content }
}

function parseListValue(value: string): string[] {
  let normalized = value.trim()
  if (normalized.startsWith("[") && normalized.endsWith("]")) {
    normalized = normalized.slice(1, -1)
  }

  return normalized
    .split(",")
    .map((item) => item.trim().replace(/^["'](.*)["']$/, "$1"))
    .filter(Boolean)
}

function readMDXFile(filePath: string): FrontmatterParseResult {
  const rawContent = fs.readFileSync(filePath, "utf-8")
  return parseFrontmatter(rawContent)
}
