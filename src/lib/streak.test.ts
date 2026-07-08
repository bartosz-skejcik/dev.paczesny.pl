import { describe, expect, it } from "vitest"

import { computeStreak } from "@/lib/streak"

const NOW = new Date("2026-07-08T00:00:00.000Z")

describe("computeStreak", () => {
  it("reports no streak when the last post is within the past week", () => {
    const result = computeStreak("2026-07-06T12:00:00.000Z", { now: NOW })

    expect(result.weeksSinceLastPost).toBe(0)
    expect(result.streakNote).toBeNull()
  })

  it("reports one week and a Polish note for a gap of exactly seven days", () => {
    const result = computeStreak("2026-07-01T00:00:00.000Z", { now: NOW })

    expect(result.weeksSinceLastPost).toBe(1)
    expect(result.streakNote).not.toBeNull()
    expect(result.streakNote).toContain("tydzień")
  })

  it("computes weeks-since correctly for a multi-week gap", () => {
    const result = computeStreak("2026-06-10T00:00:00.000Z", { now: NOW })

    expect(result.weeksSinceLastPost).toBeGreaterThanOrEqual(4)
    expect(result.streakNote).not.toBeNull()
    expect(result.streakNote).toContain("tydzień")
  })

  it("fails closed on an unparseable date, returning null rather than zero", () => {
    const result = computeStreak("not-a-date", { now: NOW })

    expect(result.weeksSinceLastPost).toBeNull()
    expect(result.streakNote).toBeNull()
  })

  it("treats a missing date as no signal, returning null rather than zero", () => {
    const result = computeStreak(undefined, { now: NOW })

    expect(result.weeksSinceLastPost).toBeNull()
    expect(result.streakNote).toBeNull()
  })

  it("defaults now to the current clock only when options.now is omitted", () => {
    const result = computeStreak("2020-01-01T00:00:00.000Z")

    expect(result.weeksSinceLastPost).not.toBeNull()
    expect(result.weeksSinceLastPost as number).toBeGreaterThanOrEqual(1)
    expect(result.streakNote).toContain("tydzień")
  })
})
