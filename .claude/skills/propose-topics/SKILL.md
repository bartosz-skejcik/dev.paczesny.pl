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

The structured candidate list (3 to 5 items, six fields each), or the explicit empty result with its
honest reason. That is the whole output. The routine posts it to Slack; you do not.
