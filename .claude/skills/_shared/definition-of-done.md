# Definition of Done (quality gates)

Single source of truth for the publish gates. `verify-post` runs every gate below; the five blog
skills link here by name instead of repeating the list. A candidate may open a PR only if every gate
passes. These encode the exact failures hit during the manual dry run.

Completeness set for this phase is exactly `pl, en, de, fr`. The i18n code also lists `es`, but no
posts are translated to it yet, so Phase 1 does not require `es`.

Only DoD-4 (canonical slugs) and DoD-5 (tags) are deterministically auto fixed, by
`src/lib/post-integrity.ts` via `bun run fix:post-integrity --slug <slug> --lang <lang>`. Every other
gate is a hard fail: fix the source, do not paper over it.

| Gate | Check | Auto fix |
|---|---|---|
| DoD-1 Voice | `pl.mdx` reads as the author, not as AI. First person, struggle journey, ironic ending, real specifics, zero em dashes (checked mechanically), no "let's dive in" AI tells. | no, hard fail (em dash is a hard fail if present after the draft stage) |
| DoD-2 Completeness | `pl`, `en`, `de`, `fr` all exist. | no, hard fail |
| DoD-3 No truncation | Each translation is at least 70 percent of the Polish word count and ends on a complete section. Translations run 100 to 135 percent in practice; below 70 percent means the model was cut off. | no, hard fail |
| DoD-4 Canonical slugs | Every real internal Markdown link `](/blog/<lang>/<slug>)` uses a slug that is an existing content directory. The language segment may be localized; the slug may not. | yes, rewrite any non canonical slug back to the canonical directory name (see failure mode F3) |
| DoD-5 Tags | `tags` line present and identical across all four languages. The translator drops them by default. | yes, re insert the canonical tags line if missing (see failure mode F4) |
| DoD-6 OG | `coverImage` is absent (so the dynamic OG is used) or points to a real file. The post's `og:image` URL renders HTTP 200 and resolves to the correct topic theme. Run this per language, not just once against `pl`, since tag drift in one translation can silently mis resolve just that language's OG theme. | no, hard fail |
| DoD-7 Renders | Every one of the four pages returns HTTP 200 from an in session build (`bun run build`, then a local server and curl). | no, hard fail |
| DoD-8 Frontmatter | `description` at most 160 chars, valid `date`, tags well formed. | no, hard fail |
| DoD-9 Post deploy | After the eventual merge to `prod`, `sitemap.xml` contains the new post with `hreflang` for all languages. Phase D deferred: `verify-post` does not run this gate in Phase 1. | no, hard fail (deferred to Phase D) |

Slug and tag checks are mandatory and deterministic, not advisory. Prompts do not reliably prevent
the slug and tag failures; the post check is the real guard. See `failure-modes.md` for F3 and F4.
