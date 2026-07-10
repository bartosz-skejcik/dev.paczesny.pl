# Known failure modes and required mitigations

Learned the hard way during the manual dry run. The system must handle all of them. The five blog
skills link here by name instead of repeating the list. F3, F4, F6, and F7 are closed by deterministic
code: `src/lib/post-integrity.ts`, invoked via `bun run fix:post-integrity --slug <slug> --lang <lang>`.

## F1. Groq daily token cap (TPD 100000 per day)

Long posts consume roughly 11k tokens each; a full batch can exhaust the daily budget and then every
translation fails with a `tokens per day` error.

Mitigation: detect the TPD error explicitly; when hit, fall back to translating the remaining files
with the running agent's own model (still enforcing DoD-4 and DoD-5) rather than blocking for an hour.
Report which languages were produced by which path.

## F2. Groq per minute cap (TPM 12000 per minute)

A single request of prompt plus output must stay under 12000, and back to back requests in one minute
exceed it.

Mitigation: the output cap is already 6000; space requests about 65 seconds apart; retry with backoff.

## F3. Slug translation bug

The model translates the human readable words inside URL slugs (for example `/blog/de/proxmox-czesc-druga`
became `/blog/de/proxmox-teil-zwei`), producing 404s, because a slug looks like translatable prose but
is actually a shared identifier.

Mitigation: the prompt now forbids it, but prompts are not reliable for this, so a deterministic post
check rewrites any non canonical slug back to the canonical directory name. Implemented in
`src/lib/post-integrity.ts` (`rewriteInternalSlugLinks`), run via `bun run fix:post-integrity`. This
check is mandatory (DoD-4), not advisory.

## F4. Dropped tags

The translator's prompt historically listed only `title, description, date` as keys to preserve, so
the model silently dropped the `tags` line, which broke the per topic OG (it fell back to the default
theme) and the site's tag surfaces.

Mitigation: the prompt now says to copy `tags` and `coverImage` verbatim, and a deterministic step re
inserts the canonical tags line if it is missing. Implemented in `src/lib/post-integrity.ts`
(`reinsertCanonicalTags`), run via `bun run fix:post-integrity` (DoD-5).

## F5. Tool call leakage into files

A drafting agent once wrote its own tool call markup into the end of an MDX file, breaking the MDX
parse.

Mitigation: `verify-post` greps for stray markup and confirms the file ends cleanly; DoD-7 (render
check) catches the rest.

## F6. Uppercase frontmatter keys (whole site build crash)

Discovered 2026-07-08 during the full-chain retest. Groq intermittently echoes the prompt's uppercase
reference block (`TITLE:`, `DESCRIPTION:`, `DATE:`) as the actual output frontmatter keys. Because
`parseFrontmatter` in `src/lib/blog.ts` is case sensitive, `metadata.title` then resolves to `undefined`,
and `src/lib/related-posts.ts` calls `tokenize(metadata.title)` unguarded during the build prerender, so
`undefined.toLowerCase()` throws and `bun run build` exits non zero for the WHOLE site, not just the one
page. One bad translation can block the entire deploy.

Mitigation: the deterministic step `normalizeFrontmatterKeyCasing` in `src/lib/post-integrity.ts` rewrites
any case variant of a known frontmatter key back to its canonical lowercase form (values untouched, body
untouched), run via `bun run fix:post-integrity`. Since `translate-post` already mandates the fixer after
every translation, the crashing case can no longer reach the build. Prompts are unreliable for this at
temperature 0.2, so the guard is code, not prose.

## F7. Stray tags list continuations and dangling coverImage

Seen twice in production and both times fixed by hand during verification (the PRs that produced
`i-made-my-blog-nag-me-on-slack` and `five-claude-code-skills-blog-pipeline`), never by the fixer. A
translation left a leftover YAML list under the tags line, a `- claude-code` / `- blog` block from a prior
malformed tags block, after the tags line itself was already a canonical scalar. Separately, a
hallucinated `coverImage` pointed at an empty value or a file that does not exist. The dangling list
corrupts the frontmatter shape, and a bogus `coverImage` overrides the dynamic per topic OG with a broken
cover (DoD-6).

Mitigation: the deterministic step `stripStrayFrontmatterContinuations` in `src/lib/post-integrity.ts`
removes any `- ` list line immediately under a scalar tags line, and removes a `coverImage` line whose
value is empty or whose asset does not exist. Existence is resolved by the CLI (`public/` rooted, the same
way the app resolves image paths), so the library itself stays filesystem free. It runs last in
`fixPostIntegrity`, after tags has been canonicalized so any list below it is unambiguously stray, and is
invoked via `bun run fix:post-integrity`. Prompts are unreliable here, so the guard is code, not prose.
