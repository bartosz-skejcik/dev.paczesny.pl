import {
  getPosts,
  type MDXFileData,
  getTagsForPost,
  type Metadata,
} from "@/lib/blog"
import { DEFAULT_FALLBACK_LANG, type SupportedLang } from "@/lib/i18n"
import { DEFAULT_SEO_DESCRIPTION } from "@/lib/seo"
import { createTagSlug } from "@/lib/tags"

const DEFAULT_LIMIT = 4
const DEFAULT_MINIMUM_SCORE = 0.22
const KEYWORD_WEIGHT = 0.25
const TAG_WEIGHT = 0.65
const RECENCY_WEIGHT = 0.1
const MAX_CONTENT_SLICE = 800

export type RelatedPostSummary = {
  slug: string
  lang: SupportedLang
  title: string
  description: string
  date: string
  tags: string[]
  availableLangs?: SupportedLang[]
  score: number
}

export type RelatedPostResult = {
  items: RelatedPostSummary[]
  usedFallback: boolean
}

type RelatedPostOptions = {
  limit?: number
  preferredLang?: SupportedLang
  minimumScore?: number
  candidates?: MDXFileData[]
}

type KeywordVector = Map<string, number>

type SimilarityInput = {
  baseVector: KeywordVector
  candidateVector: KeywordVector
  baseTags: Set<string>
  candidateTags: Set<string>
  baseDate: number | null
  candidateDate: number | null
}

type FallbackInput = {
  pool: MDXFileData[]
  exclude: Set<string>
  limit: number
  preferredLang: SupportedLang
}

export function resolveRelatedPosts(
  basePost: MDXFileData,
  options?: RelatedPostOptions
): RelatedPostResult {
  const limit = Math.max(1, options?.limit ?? DEFAULT_LIMIT)
  const preferredLang = options?.preferredLang ?? basePost.lang
  const minimumScore = options?.minimumScore ?? DEFAULT_MINIMUM_SCORE

  const pool = (options?.candidates ?? getPosts(preferredLang)).filter(
    (candidate) => candidate.slug !== basePost.slug
  )

  if (pool.length === 0) {
    return { items: [], usedFallback: false }
  }

  const baseVector = buildKeywordVector(basePost, preferredLang)
  const baseTags = buildTagSet(basePost, preferredLang)
  const baseDate = getPublishedTimestamp(basePost, preferredLang)

  const scored = pool.map((candidate) => {
    const candidateVector = buildKeywordVector(candidate, preferredLang)
    const candidateTags = buildTagSet(candidate, preferredLang)
    const candidateDate = getPublishedTimestamp(candidate, preferredLang)

    const score = calculateSimilarityScore({
      baseVector,
      candidateVector,
      baseTags,
      candidateTags,
      baseDate,
      candidateDate,
    })

    return { candidate, score }
  })

  const relevant = scored
    .filter(({ score }) => score >= minimumScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)

  const needsFallback = relevant.length < limit
  const fallbackItems = needsFallback
    ? pickFallbackPosts({
        pool,
        exclude: new Set(relevant.map(({ candidate }) => candidate.slug)),
        limit: limit - relevant.length,
        preferredLang,
      })
    : []

  const summaries = [
    ...relevant.map(({ candidate, score }) =>
      buildSummary(candidate, preferredLang, score)
    ),
    ...fallbackItems,
  ].slice(0, limit)

  return {
    items: summaries,
    usedFallback: needsFallback && fallbackItems.length > 0,
  }
}

function calculateSimilarityScore({
  baseVector,
  candidateVector,
  baseTags,
  candidateTags,
  baseDate,
  candidateDate,
}: SimilarityInput) {
  const tagScore = computeTagOverlapScore(baseTags, candidateTags)
  const keywordScore = computeCosineSimilarity(baseVector, candidateVector)
  const recencyScore = computeRecencyBoost(baseDate, candidateDate)

  const weighted =
    tagScore * TAG_WEIGHT +
    keywordScore * KEYWORD_WEIGHT +
    recencyScore * RECENCY_WEIGHT

  return Number(weighted.toFixed(6))
}

function buildKeywordVector(post: MDXFileData, lang: SupportedLang) {
  const metadata = getMetadataForLang(post, lang)
  const tokens: string[] = []
  const tags = getTagsForPost(post, lang)

  tags.forEach((tag) => {
    const normalized = createTagSlug(tag)
    if (normalized) {
      tokens.push(normalized, normalized)
    }
  })

  tokens.push(...tokenize(metadata.title))

  if (metadata.description) {
    tokens.push(...tokenize(metadata.description))
  }

  tokens.push(...tokenize(post.slug))

  if (post.content) {
    tokens.push(...tokenize(post.content.slice(0, MAX_CONTENT_SLICE)))
  }

  const vector: KeywordVector = new Map()
  tokens.forEach((token) => {
    if (!token) {
      return
    }
    vector.set(token, (vector.get(token) ?? 0) + 1)
  })

  return vector
}

function buildTagSet(post: MDXFileData, lang: SupportedLang) {
  const tags = getTagsForPost(post, lang)
  return new Set(
    tags
      .map((tag) => createTagSlug(tag))
      .filter((tag): tag is string => Boolean(tag))
  )
}

function computeTagOverlapScore(
  baseTags: Set<string>,
  candidateTags: Set<string>
) {
  if (baseTags.size === 0 || candidateTags.size === 0) {
    return 0
  }

  let shared = 0
  baseTags.forEach((tag) => {
    if (candidateTags.has(tag)) {
      shared += 1
    }
  })

  return shared / Math.max(baseTags.size, candidateTags.size)
}

function computeCosineSimilarity(a: KeywordVector, b: KeywordVector) {
  const magnitudeA = Math.sqrt(
    Array.from(a.values()).reduce((sum, value) => sum + value * value, 0)
  )
  const magnitudeB = Math.sqrt(
    Array.from(b.values()).reduce((sum, value) => sum + value * value, 0)
  )

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0
  }

  let dot = 0
  a.forEach((value, key) => {
    const other = b.get(key)
    if (other) {
      dot += value * other
    }
  })

  return dot / (magnitudeA * magnitudeB)
}

function computeRecencyBoost(
  baseDate: number | null,
  candidateDate: number | null
) {
  if (!baseDate || !candidateDate) {
    return 0
  }

  const diffMs = Math.abs(baseDate - candidateDate)
  const diffDays = diffMs / (1000 * 60 * 60 * 24)

  if (diffDays <= 7) {
    return 1
  }

  const years = diffDays / 365
  return Math.max(0, 1 - Math.min(years / 3, 1))
}

function pickFallbackPosts({
  pool,
  exclude,
  limit,
  preferredLang,
}: FallbackInput) {
  if (limit <= 0) {
    return []
  }

  return pool
    .filter((candidate) => !exclude.has(candidate.slug))
    .sort((a, b) => {
      const dateA = getPublishedTimestamp(a, preferredLang)
      const dateB = getPublishedTimestamp(b, preferredLang)
      if (dateA && dateB) {
        return dateB - dateA
      }
      if (dateA) {
        return -1
      }
      if (dateB) {
        return 1
      }
      return a.slug.localeCompare(b.slug)
    })
    .slice(0, limit)
    .map((post) => buildSummary(post, preferredLang, 0))
}

function buildSummary(
  post: MDXFileData,
  lang: SupportedLang,
  score: number
): RelatedPostSummary {
  const metadata = getMetadataForLang(post, lang)
  const description = metadata.description ?? DEFAULT_SEO_DESCRIPTION

  return {
    slug: post.slug,
    lang: post.lang,
    title: metadata.title,
    description,
    date: metadata.date ?? post.metadata.date,
    tags: getTagsForPost(post, lang),
    availableLangs: post.availableLangs,
    score: Number(score.toFixed(3)),
  }
}

function getMetadataForLang(post: MDXFileData, lang: SupportedLang): Metadata {
  return (
    post.localizedMetadata?.[lang] ??
    post.localizedMetadata?.[DEFAULT_FALLBACK_LANG] ??
    post.metadata
  )
}

function getPublishedTimestamp(post: MDXFileData, lang: SupportedLang) {
  const metadata = getMetadataForLang(post, lang)
  const candidate = metadata.date ?? post.metadata.date
  if (!candidate) {
    return null
  }
  const timestamp = Date.parse(candidate)
  return Number.isNaN(timestamp) ? null : timestamp
}

function tokenize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .split(" ")
    .map((token) => token.trim())
    .filter((token) => token.length > 2)
}
