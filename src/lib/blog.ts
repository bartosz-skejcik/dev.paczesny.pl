import fs from "fs"
import path from "path"
import {
  CANONICAL_LANG,
  DEFAULT_FALLBACK_LANG,
  SUPPORTED_LANGS,
  type SupportedLang,
} from "@/lib/i18n"

export type Metadata = {
  title: string
  description: string
  date: string
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
  const frontmatterLines = frontmatter.trim().split("\n")
  const metadata: Partial<Metadata> = {}

  frontmatterLines.forEach((line) => {
    const [key, ...values] = line.split(": ")
    let value = values.join(": ").trim()
    value = value.replace(/^['"](.*)['"]$/, "$1")
    if (key && value) {
      metadata[key.trim() as keyof Metadata] = value
    }
  })

  return { metadata: metadata as Metadata, content }
}

function readMDXFile(filePath: string): FrontmatterParseResult {
  const rawContent = fs.readFileSync(filePath, "utf-8")
  return parseFrontmatter(rawContent)
}
