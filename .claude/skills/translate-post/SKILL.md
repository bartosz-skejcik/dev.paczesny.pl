---
name: translate-post
description: Use when generating en/de/fr translations of a dev.paczesny.pl post from its canonical Polish source.
---

# Translate Post

Generate the `en`, `de`, and `fr` translations of a post from its canonical `pl.mdx`, then run the
deterministic integrity fixer on each. You wrap the existing pipeline; you do NOT reimplement the Groq
call. The translation client lives in `src/lib/translator.ts` and is invoked through
`bun run translate:post`. Do not modify that file.

Cross-reference the known failure patterns in [`_shared/failure-modes.md`](../_shared/failure-modes.md):
F1 (daily cap), F2 (per-minute cap), F3 (slug bug), F4 (dropped tags).

## Input

| Field | Value |
|---|---|
| slug | The post directory name under `content/posts/`. |
| target languages | Default `en`, `de`, `fr`. |

Do NOT translate to `es`. Phase 1 scope is exactly `pl, en, de, fr`. The repo i18n also lists `es`, but
no post is translated to it yet, so leave it out.

## Procedure (per language)

1. Run the existing CLI, one language at a time:

   ```bash
   bun run translate:post --slug <slug> --lang <en|de|fr>
   ```

   This calls Groq `llama-3.3-70b-versatile` via `scripts/translate.ts` and `src/lib/translator.ts`,
   writing `<lang>.mdx` next to `pl.mdx`. Do not reimplement the Groq call or the prompt.

2. Immediately run the deterministic fixer on the file that just landed:

   ```bash
   bun run fix:post-integrity --slug <slug> --lang <lang>
   ```

   This rewrites any translated (non-canonical) internal slug back to the real directory name (F3, DoD-4)
   and re-inserts a dropped or divergent `tags` line (F4, DoD-5). It is deterministic code from
   `src/lib/post-integrity.ts`, not a prompt. Alternatively hand off to `verify-post`, which runs the same
   fixer. Prompts are not reliable for F3 and F4, so this step is mandatory, not advisory.

## Rate limits

| Failure mode | Numbers | Handling |
|---|---|---|
| F2 per-minute cap | TPM 12000 per minute; output cap already 6000 in `translator.ts` | Space back-to-back requests about 65 seconds apart. On HTTP 429, read and honor the Groq `retry-after` header rather than a blind fixed sleep, then retry with backoff. Do not lower the output cap; it is already set. |
| F1 daily cap | TPD 100000 per day | Detect the "tokens per day" error explicitly. When hit, do not block for a day: translate the remaining languages with the running agent's own model instead, still enforcing canonical slugs and intact tags (run `fix:post-integrity` on those files too). |

## Provenance report

Report which languages came from the Groq path and which from the agent-model fallback path (F1). For
example: `en, de from Groq; fr from agent fallback (Groq TPD hit)`. This makes the source of each
translation auditable downstream.

## Output

`en.mdx`, `de.mdx`, `fr.mdx` written next to `pl.mdx`, each passed through `fix:post-integrity`, plus the
per-language provenance report.
