---
name: draft-post-pl
description: Use when writing the canonical Polish pl.mdx for a chosen dev.paczesny.pl blog topic in the author's voice.
---

# Draft Post (Polish)

Write `content/posts/<slug>/pl.mdx`: the canonical Polish source, in Bartek's voice, from a chosen topic.
Polish is canonical; the other languages are generated from this file later. The whole product is that
the post reads like a real person's struggle, not like AI. Voice authenticity is the core value, so this
skill is the one most likely to fail on "looks right." Do not trust a first draft.

## 1. Frontmatter

Write valid frontmatter with exactly these keys, mirroring the existing posts:

| Key | Rule |
|---|---|
| `title` | The post title, in voice. |
| `description` | At most 160 characters. |
| `date` | ISO 8601, for example `2026-07-06T12:00:00.000Z`. |
| `tags` | Comma separated, matching the style of existing posts' `tags` lines. |

Do NOT add a `coverImage` key. Its absence is what makes the post use the dynamic per topic OG route.
Adding it opts the post out of the OG generator, which is wrong for a new post.

Shape to match (from a real post):

```yaml
---
title: "Chcialem przepisac bloga na hype'owy framework i dlaczego sie wypisalem"
description: "Wpadl mi w oko Fresh na Deno i chcialem przepisac na niego bloga. Policzylem koszt. Wypisalem sie."
date: 2026-07-06T12:00:00.000Z
tags: nextjs, framework, deno, fresh, architektura, seo, decyzje, webdev
---
```

## 2. Voice

Non negotiable, from the project `CLAUDE.md`:

- Casual Polish, first person, written as a live struggle journey.
- Numbered goals near the top (a "co chce zrobic" / "dostaniesz trzy rzeczy" list).
- Slang and profanity are welcome. It must NOT read as polished AI prose.
- Real specifics and real code where relevant, never invented numbers or fake commands.
- Ends on an ironic lesson.
- Any tool mention (for example Paczesny Analytics) is incidental only, never a sales pitch.

Imitate the most recent published post, not an abstract "good writing" standard. When in doubt, copy the
rhythm, section shapes, and register of that post.

## 3. Structure and depth (show the receipts, match the real posts)

Depth comes from concreteness, NOT from length, an arbitrary word count, or compressing everything into
abbreviations. A generic, hastily summarized post is a failed draft even when the voice is close. Bartek
has rejected exactly this ("bardzo generyczny i pospiesznie napisany, strasznie duzo skrotow"). Match the
shape the existing posts actually have:

- **Show the receipts.** Pull real, concrete evidence from the actual repo and git history: real file
  counts, real diffs, real code blocks with real file paths, real tables, real commit hashes, real
  numbers. Do not narrate a summary of what happened; show what happened. Read `content/posts/` and run
  `git log` / `git show` to extract the real material BEFORE drafting. If a claim cannot be substantiated
  with something real from the repo, cut it. Never invent numbers or commands.
- **FAQ section (required).** After the main body, include a `## FAQ` with 4 to 5 real question and answer
  pairs in the post's own voice: the questions a reader would actually ask, not generic filler.
- **Linki section (required).** End with a `## Linki` section: a bulleted list of references, both
  internal `/blog/<lang>/<slug>` links and external URLs, matching the pattern in the existing posts.
- **Honest counter-argument (when applicable).** If the topic carries a decision or a claim, include a
  section before the wrap-up that honestly argues the other side ("kiedy X MIALby sens", when the other
  option actually makes sense). This is what keeps a post from reading like a pitch. The real posts always
  do it.

Before drafting, open the newest post (section 4 resolves which one) and copy its actual section
skeleton: cold personal hook, numbered goals list, body carried by receipts, honest counter-argument,
wrap-up on an ironic lesson, FAQ, Linki.

## 4. Resolve the voice imitation target (compute, do not hardcode)

"The most recent published post" is resolved by frontmatter `date`, sorted descending, NOT by file mtime
and NOT by git commit order. Compute it every run, because the target changes as new posts land.

```bash
for f in content/posts/*/pl.mdx; do
  d=$(grep -m1 '^date:' "$f" | cut -d: -f2- | tr -d ' "')
  printf '%s\t%s\n' "$d" "$f"
done | sort -r | head -1
```

ISO 8601 dates sort lexicographically in chronological order, so `sort -r` on the date column gives the
newest post. As of writing this resolves to `why-i-didnt-rewrite-my-blog-to-a-new-framework`, but do not
hardcode that: always recompute, and read that post as the voice reference before drafting.

## 5. Voice guard (mandatory)

Before this draft is considered done:

1. Invoke `creative-writing-skills:llm-writing` and revise the draft until it no longer reads as AI prose.
   This guard is doubly locked: the project `CLAUDE.md` and the build spec both require it.
2. Mechanically reject any em dash (Unicode U+2014). Polish and English alike: commas, periods, colons
   only. Grep the file and fix every hit before finishing.
3. Reject named AI tells, in either language. If you see them, rewrite:
   - "let's dive in", "in conclusion", "in today's fast paced world"
   - "zanurzmy sie", "podsumowujac na wstepie", "w dzisiejszym swiecie"
   - hollow transitions that restate the previous sentence, and corrections of a misconception nobody has.

If, after honest revision, the draft still cannot be made to pass the voice guard, do NOT ship it
silently. Flag it for human attention in the PR (say what is off and why) so Bartek can take the voice by
hand. A flagged draft is acceptable; a silently AI sounding one is not.

## 6. Final self-check (before done)

Do not call the draft done until all of these are true, checked against the shape of the existing posts
in `content/posts/`:

- Real extracted evidence is present (actual numbers, diffs, code, file paths, commit hashes), not
  described in the abstract.
- A `## FAQ` section with 4 to 5 real question and answer pairs is present.
- A `## Linki` section is present.
- An honest counter-argument section is present, if the topic has a decision or claim to argue against.
- Zero em dashes, and the `creative-writing-skills:llm-writing` guard passed.
- It reads like the newest post, not generic or rushed.

## Output

`content/posts/<slug>/pl.mdx`: correct frontmatter with no `coverImage`, in the author's voice, having
passed the `creative-writing-skills:llm-writing` guard, or explicitly flagged for human attention when it
could not.
