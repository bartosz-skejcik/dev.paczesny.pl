---
name: open-post-pr
description: Use when opening a reviewable PR for a completed dev.paczesny.pl post after all publish gates pass.
---

# Open Post PR

Create a `claude/`-prefixed branch, commit the post files in logical units, and open a PR targeting `dev`.
This is the terminal skill in the chain. It never merges and never pushes to `dev` or `prod`. Publishing
is always a human action: Bartek reads the PR, then merges and ships himself. Never push a post live
without his explicit OK (Repo B `CLAUDE.md`).

## Input

| Field | Value |
|---|---|
| slug | The post directory name under `content/posts/`. |
| verify-post report | The pass/fail gate report, passed in. Its DoD checklist goes verbatim into the PR body. |

## Procedure

1. Create the branch and commit in logical units:

   ```bash
   git checkout -b claude/post-<slug>
   git add content/posts/<slug>/pl.mdx && git commit -m "post(<slug>): draft pl"
   git add content/posts/<slug>/{en,de,fr}.mdx && git commit -m "post(<slug>): translations en, de, fr"
   # one more commit only if the integrity fixer changed files:
   git add content/posts/<slug> && git commit -m "post(<slug>): integrity fixes"
   ```

   One commit per logical unit: the draft, the translations, and any integrity fixes. Only the branch is
   pushed, and only a `claude/`-prefixed branch. Never `dev`, never `prod`.

2. Open the PR against `dev`. There is no `.github` PR template in this repo, so construct the full body
   yourself:

   ```bash
   gh pr create --base dev --head claude/post-<slug> --title "post: <title>" --body-file <body>
   ```

   The PR body must carry, in this order:
   - **tl;dr:** one or two lines on what the post is.
   - **DoD checklist:** every gate with pass or fail, taken verbatim from the verify-post report.
   - **Internal links added:** the list of internal `/blog/<lang>/<slug>` links the post introduces.
   - **Verification evidence:** the concrete results (all four pages returned 200, OG resolved per
     language, slugs canonical, tags identical across languages, no stray markup).
   - **OG image preview (per language):** a direct reference to the generated OG image for each of pl,
     en, de, fr, the same `/og/post?title=<title>&lang=<lang>&tags=<tags>` URL that verify-post's DoD-6
     check hit (or a link to the local render). This is a visibility item, not a new gate: Bartek reviews
     OG images by eye and compares them against the recent posts, so give him the links to glance at how
     each card actually looks, not just a pass line.

3. Prepare the Slack summary content: the PR link, the tl;dr, and the DoD summary. This skill produces
   that content as structured output only. It does NOT call a Slack webhook: none exists in Repo B, and
   actual Slack delivery is a routine concern (Phase 2 or 3), not this skill's job.

## Hard rules

- Never merge the PR. Only Bartek merges.
- Never push to `dev` or `prod`, directly or via the PR. Only the `claude/post-<slug>` branch is pushed.
- The human publish gate is mandatory. The PR targets `dev` and stops there.

## Output

The open PR to `dev` and the prepared Slack summary content (PR link, tl;dr, DoD summary).
