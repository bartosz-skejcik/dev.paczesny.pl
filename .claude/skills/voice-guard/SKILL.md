---
name: voice-guard
description: Use when a dev.paczesny.pl post draft needs its mandatory voice check before shipping, or when any skill references the voice guard. Local, self-contained replacement for the external creative-writing-skills:llm-writing guard.
---

# Voice Guard

Input: the path to one post file, normally `content/posts/<slug>/pl.mdx`. Output: a PASS or FAIL report.
The job is to catch AI-sounding prose before it ships. The whole product of this blog is that a post reads
like a real person's struggle, so this check is mandatory, not advisory.

This checklist is self-contained on purpose: it lives here, in this repo, versioned in a diff. It does not
depend on any external plugin or skill. The concrete markers below are extracted from the published posts
(the voice reference is the newest post by frontmatter date, currently
`content/posts/why-i-didnt-rewrite-my-blog-to-a-new-framework/pl.mdx`).

## 1. Scope and order

Run this guard against the Polish canonical file FIRST. Translations are generated from the Polish source,
so fixes land in `pl.mdx` and the translations inherit them on regeneration. Running the guard on a
translation before its Polish source has passed is wasted work. A translation may still be checked
afterwards for AI tells introduced by the translator model.

## 2. Voice markers that must be present

These are positive checks. A draft missing several of them fails even with zero AI tells.

- **Casual Polish, first person, live struggle.** The post narrates something that happened to the author,
  as it happened, with the dead ends left in. Not a tutorial voice, not a retrospective whitepaper.
- **A real cold open.** A concrete scene or moment ("wtorek, wieczór, scrolluję X"), not a thesis
  statement.
- **The numbered goals list near the top.** A "dostaniesz trzy rzeczy" style list telling the reader what
  they get.
- **Real specifics.** Actual numbers, file counts, commands, file paths, commit hashes, tables pulled from
  the repo. If a claim has no receipt, it gets cut, never padded.
- **Short punchy sentences mixed with longer ones.** "Klikam link. 404. Klikam następny. 404." next to a
  long winding sentence is the rhythm. Uniform sentence length is a fail.
- **Slang, profanity, self-deprecation where natural.** "Kurwa.", "xd", "sory, nadal się tego uczę",
  "dumny jak paw". The register is a person talking, not a brand.
- **Direct address.** The reader is "Ty": "Znasz to swędzenie, prawda."
- **An honest counter-argument** when the post carries a decision or claim ("Kiedy X MIAŁby sens").
- **An ironic lesson ending.** The wrap-up lands on a pointed, slightly self-mocking takeaway, not a
  motivational summary.

## 3. AI tells that must be absent

These are negative checks. One clear instance is a flag; a pattern of them is a FAIL.

- **Hollow transitions:** "warto zauważyć", "podsumowując", "w dzisiejszym świecie", "zanurzmy się",
  "let's dive in", "in conclusion", "in today's fast paced world", and their cousins.
- **Restating the previous sentence** in different words instead of advancing.
- **Correcting a misconception nobody raised** ("wbrew powszechnemu przekonaniu..." with no one holding
  that belief in the post).
- **Generic filler:** sentences that would be true of any project, any stack, any week.
- **Symmetric paragraph rhythm:** every paragraph the same length, same shape, same three-beat structure.
- **Over-hedging:** "może", "wydaje się", "prawdopodobnie" stacked where the author would just say the
  thing.
- **Listicle-itis:** bullet lists where the real posts would tell it as a story; lists are for receipts
  (tables, dependency lists), not for narration.
- **Every paragraph ending with a mini-summary** of itself.
- **English calques in the Polish:** structures translated word for word from English ("robi różnicę",
  "na koniec dnia", "adresować problem") instead of how a Polish speaker says it.

## 4. Mechanical checks

- **Zero em dashes (U+2014), anywhere, both languages.** Grep the file; every hit is an automatic flag.
  Commas, colons, periods only. This is a project hard rule.
- Frontmatter untouched by the review: the guard reviews prose, it never edits `title`, `description`,
  `date` or `tags` as a side effect. If frontmatter itself has a voice problem, flag it, do not edit it
  silently.

## 5. Procedure and report

Read the whole file, then review line by line against sections 2, 3 and 4. Produce exactly this report:

```text
VOICE GUARD: PASS | FAIL
file: <path>
round: <N>

FLAGS (only when FAIL):
- line <n>: "<the flagged passage, quoted verbatim>"
  why: <which check it violates, named>
  rewrite: <a concrete suggested rewrite in the author's voice, not a description of one>

MISSING MARKERS (only when FAIL):
- <each section 2 marker that is absent, with where it should live>
```

Every flag carries a quoted passage and a concrete rewrite. "Make it more casual" is not a finding; a
rewritten sentence is. PASS means zero flags and no missing markers.

## 6. The loop and the three-round rule

The caller revises the draft against the report and re-runs the guard. Repeat until PASS. If the draft
still fails after 3 rounds, STOP: do not ship it and do not keep grinding. Flag it for human attention
(in the PR or the run output), quoting the flags that would not die, so Bartek can take the voice by
hand. A flagged draft is acceptable. A silently AI-sounding one is not.
