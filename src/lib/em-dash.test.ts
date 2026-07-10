import { describe, expect, it } from "vitest"

import { stripEmDashes } from "@/lib/em-dash"

const DASH = "\u2014"

describe("stripEmDashes", () => {
  it("replaces a spaced em dash with a comma", () => {
    const result = stripEmDashes(`first part ${DASH} second part`)

    expect(result.changed).toBe(true)
    expect(result.count).toBe(1)
    expect(result.text).toBe("first part, second part")
    expect(result.text).not.toContain(DASH)
  })

  it("replaces an unspaced em dash and collapses a doubled run", () => {
    expect(stripEmDashes(`a${DASH}b`).text).toBe("a, b")
    expect(stripEmDashes(`a${DASH}${DASH}b`).text).toBe("a, b")
  })

  it("strips every em dash so none can survive, preserving line structure", () => {
    const body = [
      "## tl;dr",
      `Deterministic guard ${DASH} no em dashes reach GitHub.`,
      `- item one ${DASH} detail`,
      `- item two ${DASH} detail`,
    ].join("\n")

    const result = stripEmDashes(body)

    expect(result.count).toBe(3)
    expect(result.text).not.toContain(DASH)
    // Newlines and the two list items are preserved: still four lines.
    expect(result.text.split("\n")).toHaveLength(4)
    expect(result.text).toContain("- item one, detail")
  })

  it("is a no-op when there is no em dash", () => {
    const clean = "already clean: commas, colons, periods."
    const result = stripEmDashes(clean)

    expect(result.changed).toBe(false)
    expect(result.count).toBe(0)
    expect(result.text).toBe(clean)
  })
})
