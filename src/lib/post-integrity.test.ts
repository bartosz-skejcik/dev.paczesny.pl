import { describe, expect, it } from "vitest"

import { fixPostIntegrity } from "@/lib/post-integrity"

describe("fixPostIntegrity", () => {
  it("rewrites a mangled self-link and re-inserts a dropped tags line", () => {
    const content = [
      "---",
      "title: Proxmox Teil zwei",
      'description: "Zweiter Teil der Kaempfe mit Proxmox"',
      "date: 2025-11-15T18:00:00.000Z",
      "---",
      "",
      "Lies zuerst den [zweiten Teil](/blog/de/proxmox-teil-zwei).",
      "",
      "Und den [ersten Teil](/blog/de/proxmox-first-install).",
      "",
    ].join("\n")

    const result = fixPostIntegrity("proxmox-czesc-druga", content, {
      knownSlugs: ["proxmox-czesc-druga", "proxmox-first-install"],
      canonicalTags: ["nextjs", "proxmox"],
    })

    expect(result.changed).toBe(true)
    // The mangled self-link is rewritten back to the canonical directory name.
    expect(result.content).toContain("](/blog/de/proxmox-czesc-druga)")
    expect(result.content).not.toContain("proxmox-teil-zwei")
    // The real other post link is left alone.
    expect(result.content).toContain("](/blog/de/proxmox-first-install)")
    // The dropped tags line is re-inserted verbatim from the canonical tags.
    expect(result.content).toContain("tags: nextjs, proxmox")

    const slugFixes = result.fixes.filter((fix) => fix.startsWith("slug"))
    const tagFixes = result.fixes.filter((fix) => fix.startsWith("tags"))
    expect(slugFixes).toHaveLength(1)
    expect(tagFixes).toHaveLength(1)
  })

  it("returns changed false and byte-identical content when nothing is wrong", () => {
    const content = [
      "---",
      "title: Proxmox Teil zwei",
      'description: "Zweiter Teil der Kaempfe mit Proxmox"',
      "date: 2025-11-15T18:00:00.000Z",
      "tags: nextjs, proxmox",
      "---",
      "",
      "Lies den [ersten Teil](/blog/de/proxmox-first-install).",
      "Und den [zweiten Teil](/blog/de/proxmox-czesc-druga).",
      "",
    ].join("\n")

    const result = fixPostIntegrity("proxmox-czesc-druga", content, {
      knownSlugs: ["proxmox-czesc-druga", "proxmox-first-install"],
      canonicalTags: ["nextjs", "proxmox"],
    })

    expect(result.changed).toBe(false)
    expect(result.fixes).toEqual([])
    expect(result.content).toBe(content)
  })

  it("never rewrites a valid slug that is a substring of the canonical one, and throws on missing frontmatter", () => {
    const content = [
      "---",
      "title: Proxmox Teil zwei",
      "description: Zweiter Teil",
      "date: 2025-11-15T18:00:00.000Z",
      "tags: nextjs, proxmox",
      "---",
      "",
      "Siehe die [Proxmox Serie](/blog/en/proxmox).",
      "Siehe den [zweiten Teil](/blog/de/proxmox-czesc-druga).",
      "Kaputt: [hier](/blog/de/proxmox-zweiter-teil).",
      "",
    ].join("\n")

    const result = fixPostIntegrity("proxmox-czesc-druga", content, {
      // "proxmox" is a real other post whose slug is a substring of the canonical slug.
      knownSlugs: ["proxmox-czesc-druga", "proxmox", "proxmox-first-install"],
      canonicalTags: ["nextjs", "proxmox"],
    })

    // Neither the substring slug nor the already-canonical self-link is touched.
    expect(result.content).toContain("](/blog/en/proxmox)")
    expect(result.content).toContain("](/blog/de/proxmox-czesc-druga)")
    // Only the genuinely non-canonical slug is rewritten.
    expect(result.content).not.toContain("proxmox-zweiter-teil")
    expect(result.fixes.filter((fix) => fix.startsWith("slug"))).toHaveLength(1)

    // Malformed input with no frontmatter throws, mirroring parseFrontmatter.
    expect(() =>
      fixPostIntegrity("proxmox-czesc-druga", "no frontmatter here", {
        knownSlugs: ["proxmox-czesc-druga"],
        canonicalTags: ["nextjs", "proxmox"],
      })
    ).toThrow("No frontmatter found")
  })

  it("normalizes uppercase frontmatter keys to canonical lowercase, preserving values", () => {
    const content = [
      "---",
      "TITLE: My Title With Spaces",
      'DESCRIPTION: "Some description with: a colon"',
      "DATE: 2026-07-08T12:00:00.000Z",
      "tags: nextjs, proxmox",
      "---",
      "",
      "Body [self](/blog/de/proxmox-czesc-druga).",
      "",
    ].join("\n")

    const result = fixPostIntegrity("proxmox-czesc-druga", content, {
      knownSlugs: ["proxmox-czesc-druga"],
      canonicalTags: ["nextjs", "proxmox"],
    })

    expect(result.changed).toBe(true)
    expect(result.content).toContain("title: My Title With Spaces")
    expect(result.content).toContain(
      'description: "Some description with: a colon"'
    )
    expect(result.content).toContain("date: 2026-07-08T12:00:00.000Z")
    expect(result.content).not.toMatch(/^TITLE:/m)
    expect(result.content).not.toMatch(/^DESCRIPTION:/m)
    expect(result.content).not.toMatch(/^DATE:/m)

    const caseFixes = result.fixes.filter((fix) => fix.startsWith("frontmatter"))
    expect(caseFixes).toHaveLength(3)
  })

  it("leaves already-lowercase frontmatter keys untouched (no casing fix)", () => {
    const content = [
      "---",
      "title: Fine",
      "description: Fine description",
      "date: 2026-07-08T12:00:00.000Z",
      "tags: nextjs, proxmox",
      "---",
      "",
      "Body [self](/blog/de/proxmox-czesc-druga).",
      "",
    ].join("\n")

    const result = fixPostIntegrity("proxmox-czesc-druga", content, {
      knownSlugs: ["proxmox-czesc-druga"],
      canonicalTags: ["nextjs", "proxmox"],
    })

    expect(
      result.fixes.filter((fix) => fix.startsWith("frontmatter"))
    ).toHaveLength(0)
    expect(result.changed).toBe(false)
    expect(result.content).toBe(content)
  })

  it("does not touch keys that only partially match a known key", () => {
    const content = [
      "---",
      "title: Real Title",
      "titleImage: /assets/x.png",
      "dateModified: 2026-07-08",
      "description: desc",
      "date: 2026-07-08T12:00:00.000Z",
      "tags: nextjs, proxmox",
      "---",
      "",
      "Body.",
      "",
    ].join("\n")

    const result = fixPostIntegrity("proxmox-czesc-druga", content, {
      knownSlugs: ["proxmox-czesc-druga"],
      canonicalTags: ["nextjs", "proxmox"],
    })

    // titleImage and dateModified are not known keys: left exactly as written.
    expect(result.content).toContain("titleImage: /assets/x.png")
    expect(result.content).toContain("dateModified: 2026-07-08")
    expect(
      result.fixes.filter((fix) => fix.startsWith("frontmatter"))
    ).toHaveLength(0)
  })

  it("strips stray YAML list continuations left under a canonical tags line", () => {
    const content = [
      "---",
      "title: Skille",
      "description: desc",
      "date: 2026-07-08T12:00:00.000Z",
      "tags: nextjs, proxmox, selfhosting",
      "- nextjs",
      "- proxmox",
      "- selfhosting",
      "---",
      "",
      "Body [self](/blog/de/proxmox-czesc-druga).",
      "",
    ].join("\n")

    const result = fixPostIntegrity("proxmox-czesc-druga", content, {
      knownSlugs: ["proxmox-czesc-druga"],
      canonicalTags: ["nextjs", "proxmox", "selfhosting"],
    })

    expect(result.changed).toBe(true)
    // The canonical scalar tags line survives.
    expect(result.content).toContain("tags: nextjs, proxmox, selfhosting")
    // Every dangling list continuation is gone.
    expect(result.content).not.toMatch(/^- nextjs$/m)
    expect(result.content).not.toMatch(/^- proxmox$/m)
    expect(result.content).not.toMatch(/^- selfhosting$/m)
    // The body self-link is untouched.
    expect(result.content).toContain("](/blog/de/proxmox-czesc-druga)")

    const frontmatterFixes = result.fixes.filter((fix) =>
      fix.startsWith("frontmatter")
    )
    expect(frontmatterFixes).toHaveLength(3)
  })

  it("removes an empty coverImage line", () => {
    const content = [
      "---",
      "title: T",
      "description: desc",
      "date: 2026-07-08T12:00:00.000Z",
      "tags: nextjs, proxmox",
      "coverImage:",
      "---",
      "",
      "Body [self](/blog/de/proxmox-czesc-druga).",
      "",
    ].join("\n")

    const result = fixPostIntegrity("proxmox-czesc-druga", content, {
      knownSlugs: ["proxmox-czesc-druga"],
      canonicalTags: ["nextjs", "proxmox"],
      // An empty coverImage is stripped unconditionally, even if the predicate
      // would happily accept any asset.
      coverImageAssetExists: () => true,
    })

    expect(result.changed).toBe(true)
    expect(result.content).not.toContain("coverImage")
    expect(result.fixes).toContain(
      "frontmatter: removed empty coverImage line"
    )
  })

  it("leaves a coverImage that points at a real asset untouched", () => {
    const content = [
      "---",
      "title: T",
      "description: desc",
      "date: 2026-07-08T12:00:00.000Z",
      "tags: nextjs, proxmox",
      "coverImage: /assets/images/real.png",
      "---",
      "",
      "Body [self](/blog/de/proxmox-czesc-druga).",
      "",
    ].join("\n")

    const result = fixPostIntegrity("proxmox-czesc-druga", content, {
      knownSlugs: ["proxmox-czesc-druga"],
      canonicalTags: ["nextjs", "proxmox"],
      coverImageAssetExists: (assetPath) =>
        assetPath === "/assets/images/real.png",
    })

    expect(result.changed).toBe(false)
    expect(result.content).toBe(content)
    expect(result.content).toContain("coverImage: /assets/images/real.png")
  })

  it("removes a coverImage that points at a missing asset", () => {
    const content = [
      "---",
      "title: T",
      "description: desc",
      "date: 2026-07-08T12:00:00.000Z",
      "tags: nextjs, proxmox",
      "coverImage: /assets/images/ghost.png",
      "---",
      "",
      "Body [self](/blog/de/proxmox-czesc-druga).",
      "",
    ].join("\n")

    const result = fixPostIntegrity("proxmox-czesc-druga", content, {
      knownSlugs: ["proxmox-czesc-druga"],
      canonicalTags: ["nextjs", "proxmox"],
      // Only the real asset exists, so the ghost cover is dropped.
      coverImageAssetExists: (assetPath) =>
        assetPath === "/assets/images/real.png",
    })

    expect(result.changed).toBe(true)
    expect(result.content).not.toContain("coverImage")
    expect(result.fixes).toContain(
      "frontmatter: removed coverImage line pointing at missing asset /assets/images/ghost.png"
    )
  })

  it("is a no-op on a file with no continuation or coverImage defect", () => {
    const content = [
      "---",
      "title: Fine",
      "description: Fine description",
      "date: 2026-07-08T12:00:00.000Z",
      "tags: nextjs, proxmox",
      "coverImage: /assets/images/real.png",
      "---",
      "",
      "Body [self](/blog/de/proxmox-czesc-druga).",
      "",
    ].join("\n")

    const result = fixPostIntegrity("proxmox-czesc-druga", content, {
      knownSlugs: ["proxmox-czesc-druga"],
      canonicalTags: ["nextjs", "proxmox"],
      coverImageAssetExists: () => true,
    })

    expect(result.changed).toBe(false)
    expect(result.fixes).toEqual([])
    expect(result.content).toBe(content)
  })
})
