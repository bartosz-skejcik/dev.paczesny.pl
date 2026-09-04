import { getPostSlugs, parseFrontmatter } from "@/lib/blog"

// Matches an internal blog link of the shape ](/blog/<lang>/<slug>). The <lang>
// segment is any two letter language code and is left alone; the <slug> segment
// must be an existing content directory name or it gets rewritten.
const INTERNAL_LINK_REGEX = /\]\(\/blog\/([a-z]{2})\/([a-z0-9-]+)\)/g

// Matches the leading YAML frontmatter block so tag edits only touch frontmatter,
// never a stray "tags:" mention in the body. Split into open, inner, close so the
// surrounding bytes are preserved exactly when nothing needs to change.
const FRONTMATTER_BLOCK_REGEX = /^(---[ \t]*\r?\n)([\s\S]*?)(\r?\n---)/

// Known frontmatter keys mapped from their lowercased form to the canonical
// casing the rest of the app (and the case-sensitive parseFrontmatter) expects.
// The translator sometimes echoes the prompt's uppercase reference block
// (TITLE:/DESCRIPTION:/DATE:) as the output keys, which makes metadata.title
// undefined and later crashes the site build. See normalizeFrontmatterKeyCasing.
const CANONICAL_FRONTMATTER_KEYS: Record<string, string> = {
  title: "title",
  description: "description",
  date: "date",
  tags: "tags",
  coverimage: "coverImage",
  readingtimeminutes: "readingTimeMinutes",
}

// A single frontmatter key line: leading indent, the bare key name (letters
// only, so camelCase keys match but hyphenated or suffixed keys do not), then
// the colon. The value after the colon is never captured, so it is preserved.
const FRONTMATTER_KEY_LINE_REGEX = /^(\s*)([A-Za-z]+)(\s*:)/

export type PostIntegrityFixResult = {
  changed: boolean
  fixes: string[]
  content: string
}

export type PostIntegrityOptions = {
  knownSlugs?: string[]
  canonicalTags?: string[]
}

type HelperResult = {
  content: string
  fixes: string[]
}

/**
 * Deterministic post integrity guard for translated MDX. Rewrites any internal
 * slug that is not a real content directory back to the canonical slug (DoD-4,
 * failure mode F3) and re inserts the canonical tags line when the translator
 * dropped or diverged it (DoD-5, failure mode F4).
 *
 * Also normalizes the casing of known frontmatter keys (TITLE: back to title:)
 * so a translation with uppercased keys cannot crash the build (DoD-8, F6).
 *
 * Pure: never touches the filesystem. The CLI caller supplies knownSlugs and
 * canonicalTags and owns all file I/O. Returns changed false for the already
 * correct case (content is returned unchanged); throws only for malformed input
 * with no frontmatter, mirroring parseFrontmatter.
 */
export function fixPostIntegrity(
  canonicalSlug: string,
  translatedContent: string,
  options?: PostIntegrityOptions
): PostIntegrityFixResult {
  // Validate that frontmatter exists. Throws "No frontmatter found" on malformed
  // input, reusing the existing parser rather than reimplementing the check.
  parseFrontmatter(translatedContent)

  const knownSlugs = options?.knownSlugs ?? getPostSlugs()
  const canonicalTags = options?.canonicalTags ?? []

  const slugResult = rewriteInternalSlugLinks(
    translatedContent,
    canonicalSlug,
    knownSlugs
  )
  // Normalize key casing before the tag step, so a divergent-case tags key is
  // canonicalized first and reinsertCanonicalTags sees the corrected frontmatter.
  const caseResult = normalizeFrontmatterKeyCasing(slugResult.content)
  const tagResult = reinsertCanonicalTags(caseResult.content, canonicalTags)

  const fixes = [...slugResult.fixes, ...caseResult.fixes, ...tagResult.fixes]

  return {
    changed: fixes.length > 0,
    fixes,
    content: tagResult.content,
  }
}

/**
 * Rewrite internal blog links whose slug is not a known content directory back
 * to the canonical slug. A slug that is already a valid member of knownSlugs is
 * never rewritten, which is the false positive guard: a real other post whose
 * slug is a substring of the canonical slug stays untouched.
 */
function rewriteInternalSlugLinks(
  content: string,
  canonicalSlug: string,
  knownSlugs: string[]
): HelperResult {
  const known = new Set(knownSlugs)
  const fixes: string[] = []

  const rewritten = content.replace(
    INTERNAL_LINK_REGEX,
    (match, lang: string, slug: string) => {
      if (known.has(slug)) {
        return match
      }
      fixes.push(
        `slug: rewrote /blog/${lang}/${slug} to /blog/${lang}/${canonicalSlug}`
      )
      return `](/blog/${lang}/${canonicalSlug})`
    }
  )

  return { content: rewritten, fixes }
}

/**
 * Normalize the casing of known frontmatter keys back to their canonical form
 * (for example TITLE: to title:, Description: to description:). Operates only on
 * the leading frontmatter block, never the body, and rewrites only the key name:
 * the value after the colon is preserved byte for byte. Matches the key name
 * case-insensitively and as a whole word, so a partial or suffixed key such as
 * titleImage: or dateModified: is left untouched. No-op when every known key is
 * already correctly cased.
 *
 * This closes the build-crash failure mode: when the translator echoes the
 * prompt's uppercase reference block as output keys, parseFrontmatter (which is
 * case sensitive) yields metadata.title === undefined, and related-posts.ts then
 * calls tokenize(metadata.title) unguarded during the build prerender, crashing
 * the entire site build. Running this before the build removes the cause.
 */
function normalizeFrontmatterKeyCasing(content: string): HelperResult {
  const fixes: string[] = []

  const block = FRONTMATTER_BLOCK_REGEX.exec(content)
  if (!block) {
    return { content, fixes }
  }

  const [, open, inner, close] = block
  const lines = inner.split("\n").map((line) => {
    const match = FRONTMATTER_KEY_LINE_REGEX.exec(line)
    if (!match) {
      return line
    }
    const [, indent, rawKey, colon] = match
    const canonical = CANONICAL_FRONTMATTER_KEYS[rawKey.toLowerCase()]
    if (!canonical || canonical === rawKey) {
      return line
    }
    fixes.push(`frontmatter: normalized key ${rawKey} to ${canonical}`)
    return indent + canonical + colon + line.slice(match[0].length)
  })

  if (fixes.length === 0) {
    return { content, fixes }
  }

  const rebuilt =
    open + lines.join("\n") + close + content.slice(block[0].length)

  return { content: rebuilt, fixes }
}

/**
 * Ensure the frontmatter tags line is present and equal to the canonical tags,
 * comma separated. Replaces a divergent line, inserts a missing one (after the
 * date line when present), and returns the content unchanged when it already
 * matches. An empty canonicalTags set means "do not touch tags".
 */
function reinsertCanonicalTags(
  content: string,
  canonicalTags: string[]
): HelperResult {
  const fixes: string[] = []

  if (canonicalTags.length === 0) {
    return { content, fixes }
  }

  const currentTags = parseFrontmatter(content).metadata.tags ?? []
  if (tagsAreEqual(currentTags, canonicalTags)) {
    return { content, fixes }
  }

  const block = FRONTMATTER_BLOCK_REGEX.exec(content)
  if (!block) {
    // Frontmatter presence is validated by the caller, so this is unreachable in
    // practice; return unchanged rather than throw a second time.
    return { content, fixes }
  }

  const [, open, inner, close] = block
  const desiredLine = `tags: ${canonicalTags.join(", ")}`
  const lines = inner.split("\n")
  const tagsIndex = lines.findIndex((line) => /^\s*tags\s*:/.test(line))

  if (tagsIndex >= 0) {
    lines[tagsIndex] = desiredLine
    fixes.push("tags: replaced divergent tags line with canonical tags")
  } else {
    const dateIndex = lines.findIndex((line) => /^\s*date\s*:/.test(line))
    if (dateIndex >= 0) {
      lines.splice(dateIndex + 1, 0, desiredLine)
    } else {
      lines.push(desiredLine)
    }
    fixes.push("tags: re-inserted missing canonical tags line")
  }

  const rebuilt =
    open + lines.join("\n") + close + content.slice(block[0].length)

  return { content: rebuilt, fixes }
}

function tagsAreEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) {
    return false
  }
  return a.every((tag, index) => tag === b[index])
}
