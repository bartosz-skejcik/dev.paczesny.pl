---
name: propose-topics
description: Use when generating candidate blog post ideas for dev.paczesny.pl grounded in the repo's real recent activity, or when the weekly ideation routine runs.
---

# Propose Topics

Ideation for the dev.paczesny.pl blog. Read the repo's real recent activity, then propose a few grounded
post ideas or honestly report that nothing this week is worth writing. You produce the structured
candidate list only. Posting it to Slack is the routine's job, not yours.

Never invent a topic. Every idea must anchor to a real, verifiable event from the signal you collected.
An honest empty result beats manufactured filler.

## 1. Collect the signal (read only)

Read, never write, in this step:

1. `git log` for the window (default: since the last run, else the last 7 days). Pull commit messages,
   changed files, and merged PR titles. This is what actually happened.
2. `content/posts/` slugs and each post's frontmatter (`title`, `description`, `date`, `tags`). This is
   what the blog already covers, and the dedup surface for step 4.

Example grounding pass:

```bash
git log --since="7 days ago" --pretty=format:"%h %s" --name-only
ls content/posts/
for f in content/posts/*/pl.mdx; do grep -H -m1 '^title:' "$f"; done
```

## 1b. Check freshness against the live feed

Fetch the public JSON feed and work out how long the blog has gone without a new post. This is the
freshness and streak signal that grounds the empty result message (D-03, D-04). It is derived fresh on
every run from the live feed, never from a stored state file and never from re-reading Slack history.

```bash
curl -s https://dev.paczesny.pl/feed.json | jq -r '.items[0].date_published'
```

Fetch over HTTPS directly: `http://dev.paczesny.pl` answers with a 302 redirect, so a plain `http://`
request never reaches the feed. The request itself is a plain unauthenticated GET, the feed is public.

Feed that `date_published` value into the repo's `computeStreak` helper (`src/lib/streak.ts`) to get
`weeksSinceLastPost` and, when it is 1 or more, a Polish `streakNote` such as
`2. tydzień z rzędu bez nowego wpisu`. The helper is pure weeks-since arithmetic (`floor(daysSince / 7)`,
fail closed on a bad date), so call it through the repo toolchain or replicate the same arithmetic inline
if the session has no build step. If `computeStreak` returns `weeksSinceLastPost` null (a missing or
unparseable feed date), treat it as no freshness signal available, not as zero weeks: say the freshness
check could not read the feed, and never report a false all-clear off a bad feed.

## 2. Decide: did something real happen?

Look at the signal and judge honestly.

| Situation | Output |
|---|---|
| Real, publish worthy activity: a bug fought, a feature shipped, a tool built, a decision made | Proceed to step 3, produce 3 to 5 candidates. |
| Nothing genuinely new, or only trivial churn (deps, typos, formatting) | Return the empty result. Say "nothing worth writing this week" and name what you looked at and why none of it qualified. |

The empty result is a first-class success, not a failure. This blog is not a content mill. Do not
stretch a weak signal into a fake topic just to fill the list.

## 3. Produce 3 to 5 candidates

Each candidate carries exactly these six fields:

| Field | Meaning |
|---|---|
| `title` | The working post title, in the blog's voice. |
| `angle` | One line: the specific take, not a generic topic label. |
| `why_now` | The real, verifiable event from step 1 that anchors this idea. Never invented. Point at the actual commit, PR, or shipped thing. |
| `tags` | Candidate tags, matching the style of the existing posts' `tags` lines. |
| `promotes_tool` | Nullable. A tool the topic genuinely touches (for example Paczesny Analytics). Incidental only, never a reason to pick the topic. |
| `is_update_of` | Nullable. An existing slug, set when this is better as an update to that post than a new one (see step 4). |

`promotes_tool` is never a selection criterion. A topic is chosen because it is real and worth writing,
not because it mentions a product.

## 4. Deduplicate against existing posts

Compare each candidate against the `content/posts/` slugs and frontmatter you read in step 1.

- If a candidate is genuinely new, leave `is_update_of` null.
- If a candidate is too close to an existing post (same subject, would overlap heavily), do not propose a
  duplicate. Set `is_update_of` to that existing slug and frame the idea as an update instead of a new
  post.

## Output

You produce the message ready text and its exact format. The routine posts it to Slack; you do not. Keep
that division intact: never call Slack from this skill.

### Non-empty result: one numbered message

A single numbered list, 1 to 5 items. Each candidate shows its `title`, its one line `angle`, and its
`why_now` inline, so the author can decide without leaving Slack (D-01). Close with a descriptive call to
action that carries an example, phrased like "Odpisz 1-5, albo napisz własny temat jeśli żaden nie pasuje"
(D-02), not a terse one word prompt.

```text
Tematy na ten tydzień:

1. <title>
   Angle: <angle>
   Czemu teraz: <why_now>
2. <title>
   Angle: <angle>
   Czemu teraz: <why_now>

Odpisz 1-5, albo napisz własny temat jeśli żaden nie pasuje.
```

### Empty result: an honest, first-class success

When nothing qualifies, keep it short but never a bare one liner. Name what you actually checked (the git
window and the existing posts in `content/posts/`) and why none of it earned a post (D-03). When the
freshness check from step 1b returned `weeksSinceLastPost` of 1 or more, include its `streakNote` so
consecutive empty weeks are surfaced (D-04). If step 1b could not read the feed (`weeksSinceLastPost`
null), say the freshness check was unavailable this run rather than inventing a streak count.

```text
Nic w tym tygodniu nie łapie się na osobny wpis.

Sprawdziłem: commity z ostatnich 7 dni i tematy już opisane w content/posts/. Same drobne zmiany, nic na
własny wpis.

2. tydzień z rzędu bez nowego wpisu.
```

An empty result is a success, not a failure, consistent with step 2. This blog is not a content mill.
