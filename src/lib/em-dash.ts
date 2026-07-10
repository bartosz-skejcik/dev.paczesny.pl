// U+2014 EM DASH. This project forbids it everywhere, in any language, per both
// CLAUDE.md files and DoD-1. Prose avoidance is not reliable: a generated PR body
// once shipped 13 of them past a clean content check, so the guard is code, not a
// prompt. Strip every em dash before the text can leave for GitHub. The character
// is referenced below only via its Unicode escape, never as a literal glyph, so
// this file itself stays clean under a mechanical em dash scan.

// One run of em dashes with any surrounding spaces or tabs, so "a b", "ab", and a
// doubled run all collapse to a single comma plus space. Only [ \t] is consumed
// around the run, never newlines, so line structure, headings, and lists survive.
const EM_DASH_RUN_REGEX = /[ \t]*\u2014[ \t\u2014]*/g

// Counts individual em dashes for the report, independent of how they are grouped.
const EM_DASH_GLOBAL_REGEX = /\u2014/g

export type EmDashStripResult = {
  text: string
  count: number
  changed: boolean
}

/**
 * Deterministically remove every em dash (U+2014) from a block of text, replacing
 * each run with a comma and a space, this project's default substitute (commas,
 * periods, colons only). Pure. The returned text is guaranteed to contain no
 * U+2014, which is the whole point: the caller can rely on that, not on prose
 * discipline. No-op (text returned byte identical) when there is no em dash.
 */
export function stripEmDashes(text: string): EmDashStripResult {
  const count = (text.match(EM_DASH_GLOBAL_REGEX) ?? []).length
  if (count === 0) {
    return { text, count: 0, changed: false }
  }

  const stripped = text.replace(EM_DASH_RUN_REGEX, ", ")

  return { text: stripped, count, changed: true }
}
