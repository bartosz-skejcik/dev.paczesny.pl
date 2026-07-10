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

2. Construct the full PR body into a file (`<body>`). There is no `.github` PR template in this repo, so
   write the whole thing yourself. The body must carry, in this order:
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

3. Run the deterministic em dash guard over the body file BEFORE opening the PR. DoD-1 forbids em dashes
   (U+2014) everywhere, but verify-post's DoD-1 scan only reads the four content `.mdx` files, never this
   generated body, and a generated PR body once shipped 13 em dashes past clean content files. Prompts do
   not reliably keep them out, so the guard is code, not a reminder:

   ```bash
   bun run fix:em-dash --file <body>   # strips every U+2014, replacing each with a comma
   ```

   After this runs the body file is guaranteed to contain zero U+2014. Never open the PR from an
   unguarded body.

4. Open the PR against `dev` using the built-in GitHub PR tool. This is how the skill actually fires: the
   last live runs opened the PR through the harness's built-in GitHub integration, not the `gh` CLI. Give
   it base `dev`, head `claude/post-<slug>`, title `post: <title>`, and the guarded `<body>` file from
   steps 2 and 3 as the PR body.

   Fallback, only when the environment exposes no built-in GitHub tool: the `gh` CLI does the same thing.

   ```bash
   gh pr create --base dev --head claude/post-<slug> --title "post: <title>" --body-file <body>
   ```

5. Compute and attach the live preview URL. The instant the PR is created and its number `N` is known,
   compute the deterministic Coolify preview URL, with no API call and no build wait:
   `https://preview-N.dev.paczesny.pl`. This matches Coolify's `preview-{{pr_id}}.dev.paczesny.pl`
   template, where `pr_id` is the PR number. GitHub assigns the PR number at creation time and it cannot
   be reliably pre-computed (a concurrent PR could take the next number), so this step runs AFTER the PR
   opens, never in the step-2 body.

   Append a single line of the exact form to the PR body via one follow-up edit, using the built-in GitHub
   PR tool's body-edit capability, or `gh pr edit N --body-file <updated-body>` as the fallback:

   ```
   Live preview: https://preview-N.dev.paczesny.pl
   ```

   Do not poll Coolify or wait for the preview build. The URL is deterministic and the build is
   asynchronous.

6. Prepare the Slack summary content: the PR link, the live preview link
   (`Live preview: https://preview-N.dev.paczesny.pl`), the tl;dr, and the DoD summary, as structured
   output fields so Routine B can render the preview link in its Slack notification. This skill produces
   that content as structured output only. It does NOT call a Slack webhook: none exists in Repo B, and
   actual Slack delivery is a routine concern (Phase 2 or 3), not this skill's job.

## Hard rules

- Never merge the PR. Only Bartek merges.
- Never push to `dev` or `prod`, directly or via the PR. Only the `claude/post-<slug>` branch is pushed.
- The human publish gate is mandatory. The PR targets `dev` and stops there.
- The PR body must pass the em dash guard (`bun run fix:em-dash --file <body>`) before the PR opens. A
  body carrying U+2014 must never reach GitHub, even when the four content files are clean.

## Output

The open PR to `dev` (with a `Live preview` link in the body) and the prepared Slack summary content (PR
link, live preview link, tl;dr, DoD summary).
