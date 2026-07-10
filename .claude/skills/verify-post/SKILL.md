---
name: verify-post
description: Use when checking a dev.paczesny.pl post against every publish gate before opening a PR, or when a translation may have broken slugs, tags, or rendering.
---

# Verify Post

The publish-gate sweep. Run every Definition of Done gate against a post. Auto-fix the only two gates
that are deterministically fixable (DoD-4 slugs, DoD-5 tags) via `bun run fix:post-integrity`; hard-fail
every other gate. The pass or fail report you produce is used verbatim in the PR body by `open-post-pr`,
and any hard fail blocks the PR.

Run every gate in [`_shared/definition-of-done.md`](../_shared/definition-of-done.md). Cross-reference
[`_shared/failure-modes.md`](../_shared/failure-modes.md) for F3 (slug bug), F4 (dropped tags), and F5
(stray markup).

## Input

The `slug`. The four post files live at `content/posts/<slug>/{pl,en,de,fr}.mdx`.

## Gates

| Gate | Check | Disposition |
|---|---|---|
| DoD-2 Completeness | `pl`, `en`, `de`, `fr` all exist. Exactly these four; do NOT require `es`. | hard fail |
| DoD-3 No truncation | Each translation is at least 70 percent of the `pl` word count and ends on a complete section, AND every `##` section header present in `pl.mdx` is also present in the translation (see below). | hard fail |
| DoD-4 Canonical slugs | Every internal link `](/blog/<lang>/<slug>)` uses a slug that is a real `content/posts/` directory. Validate against `getPostSlugs()` in `src/lib/blog.ts`, the source of truth, not a regex guess. | AUTO-FIX: run `bun run fix:post-integrity --slug <slug> --lang <lang>` per language |
| DoD-5 Tags | `tags` line present and identical across all four languages. | AUTO-FIX: the same fixer re-inserts the canonical tags line |
| DoD-1 Em dashes | Zero em dashes anywhere (mechanical). An em dash present after the draft stage is a failure. | hard fail |
| F5 Stray markup and secrets | Grep for tool-call markup or stray fragments and confirm each file ends cleanly. Also grep for secret-shaped strings (anything resembling a `GROQ_API_KEY` value) so a secret can never reach a PR. | hard fail if found |
| DoD-6 OG | `coverImage` absent (dynamic OG) or points to a real file. Run the OG check PER LANGUAGE (see below). Confirm `og:image` returns 200 and resolves to the intended topic theme. | hard fail |
| DoD-7 Renders | Every one of the four pages and the OG route return HTTP 200 from an in-session build. | hard fail |
| DoD-8 Frontmatter | `description` at most 160 chars, valid `date`, well-formed `tags`. | hard fail |

DoD-9 (post-deploy sitemap) is Phase D and is NOT run here.

The DoD-1 em dash scan here covers the four content `.mdx` files only. The PR body that `open-post-pr`
later generates is a separate surface, guarded there by its own deterministic em dash pass
(`bun run fix:em-dash`), because clean content files do not guarantee a clean PR body.

## DoD-3 also compares section headers, not just word count

The word-count ratio is not enough. On a long post the translator can silently drop a whole trailing
section (for example `## Linki`) while the rest of the translation is verbose enough to still clear the 70
percent bar and still end on a complete section, so a word-count-only check passes a truncated post. So
also compare the SET of `##` section headers between the canonical `pl.mdx` and each translation. Count
the number of `##` headers in each; any header count in a translation that is lower than in `pl.mdx`, or
any `pl` section missing from a translation, is a dropped section and a hard fail.

```bash
# per language: pl header count vs translation header count
plh=$(grep -cE '^## ' content/posts/<slug>/pl.mdx)
for lang in en de fr; do
  th=$(grep -cE '^## ' content/posts/<slug>/${lang}.mdx)
  [ "$th" -lt "$plh" ] && echo "${lang}: dropped section, ${th} of ${plh} headers, HARD FAIL"
done
```

This is a DETECTION improvement only. It does NOT fix the translator's tendency to truncate very long
posts under its output token cap; that remains a known, separate limitation, documented and not resolved
in this phase. When it fires, the fix is to re-translate the affected language (or shorten the source),
not to paper over the missing section.

## DoD-4 and DoD-5 are deterministic, not advisory

Prompts do not reliably prevent F3 (translated slugs) and F4 (dropped tags), so these two gates are fixed
by code, not by asking the model to be careful:

```bash
bun run fix:post-integrity --slug <slug> --lang <lang>   # run per language after translation
```

Every other gate is a hard fail: do not auto-fix it, fix the source or block the PR.

## DoD-6 OG check runs PER LANGUAGE

A dropped or altered tag in a single translation (F4) makes only that language's OG image fall back to
the wrong theme, so a `pl`-only check would miss it. Check each of `pl`, `en`, `de`, `fr`.

Validate the theme against the ACTUAL resolver logic (the `THEMES` array in `src/app/og/post/route.tsx`,
`pickTheme` is first-match-wins over lowercased tags), or against the actually rendered image. Do NOT
trust the code comment: the `framework` theme's `match` array includes `nextjs` even though a comment
near the top of `THEMES` says shared tags like `nextjs` are not used as triggers. Trust the array, not
the comment.

## DoD-7 render check (one command)

Run the wrapper, which builds the site, starts a local server, and curls all four pages plus the OG route,
asserting HTTP 200 for each. In-session per decision D8, never a Coolify preview.

```bash
scripts/verify-post-render.sh <slug>
```

## Output

A pass or fail line per gate, used verbatim in the PR body by `open-post-pr`. Any hard fail blocks the PR.
Report which gates were auto-fixed (DoD-4, DoD-5) and what changed.
