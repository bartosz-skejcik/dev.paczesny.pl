// Freshness / streak signal for the propose-topics ideation skill.
//
// Pure, zero-I/O date arithmetic: given the most recent publish date from the
// live feed (items[0].date_published) and an injectable "now", it reports how
// many whole weeks have passed since the last post and a Polish streak note for
// consecutive empty weeks. The fetch itself lives in the skill step, not here,
// mirroring the feed.ts (pure) vs feed.json/route.ts (I/O) split, so this stays
// trivially unit-testable with a fixed now.
//
// Fails closed: a missing or unparseable date yields weeksSinceLastPost null
// (never 0), so a bad feed reads as "no freshness signal", not a false all-clear.

const MS_PER_DAY = 1000 * 60 * 60 * 24
const DAYS_PER_WEEK = 7

export type StreakResult = {
  weeksSinceLastPost: number | null
  streakNote: string | null
}

export function computeStreak(
  lastPublishedIso: string | undefined,
  options?: { now?: Date }
): StreakResult {
  const now = options?.now ?? new Date()

  const timestamp = parsePublishedTimestamp(lastPublishedIso)
  if (timestamp === null) {
    // Fail closed: an unparseable or missing date is no signal, not zero weeks.
    return { weeksSinceLastPost: null, streakNote: null }
  }

  const daysSince = (now.getTime() - timestamp) / MS_PER_DAY
  // Clamp to 0 so a newest post dated in the future reads as fresh, never negative.
  const weeksSinceLastPost = Math.max(0, Math.floor(daysSince / DAYS_PER_WEEK))

  const streakNote =
    weeksSinceLastPost >= 1
      ? `${weeksSinceLastPost}. tydzień z rzędu bez nowego wpisu`
      : null

  return { weeksSinceLastPost, streakNote }
}

// Mirrors getPublishedTimestamp in related-posts.ts: null on missing/unparseable,
// never a numeric fallback, so callers can distinguish "no signal" from "zero".
function parsePublishedTimestamp(candidate: string | undefined): number | null {
  if (!candidate) {
    return null
  }
  const timestamp = Date.parse(candidate)
  return Number.isNaN(timestamp) ? null : timestamp
}
