<samp>
stack: next.js, tailwindcss, typescript, mdx, vercel
</samp>

## Translations

- Canonical blog content lives in `content/posts/[slug]/pl.mdx`. Each translated version is stored as `[lang].mdx` in the same folder.
- Set `GROQ_API_KEY` to a Groq API token. The Vercel AI SDK talks to `https://api.groq.com/openai/v1/chat/completions` using the `llama-3.1-70b-versatile` chat model.
- Trigger on-demand translations by calling `POST /api/translations/[slug]` with `{ "targetLang": "de" }`. Successful requests cache the translated markdown to disk and revalidate `/blog/{lang}/{slug}`.
- Run `bun run translate:top` (powered by `scripts/pretranslate.ts`) during CI/CD to prebuild `TOP_PREBUILD_LANGS` so that the most popular languages are statically generated.
- Blog pages automatically redirect to `/blog/en/[slug]` whenever a requested locale is missing. A language switcher renders links for every supported language and disables untranslated ones for clarity.

## Meta Descriptions

- Generate or refresh MDX `description` front matter with `bun run describe:post --slug proxmox-first-install --lang de`. The script in `scripts/describe.ts` uses the same `GROQ_API_KEY` to call Groq's `llama-3.3-70b-versatile` model and enforces friendly copy between 150–220 characters.
- Add `--dry-run` (or `-d`) to preview the proposed text and character count without touching the file, then rerun without the flag to persist changes once you're satisfied.
- Skip `--lang` to rewrite every localized version available for that slug; the script inspects `content/posts/[slug]` and iterates through each `[lang].mdx` it finds.

## SEO & Localization

- Every route rendered from `src/app/(site)` inherits language metadata from `LocalizedSection`, which sets both `lang` (BCP-47) and `dir` attributes. Nested layouts such as `src/app/(site)/blog/[lang]/layout.tsx` override the wrapper so translated blog posts ship with server-rendered attributes (no client-side mutation required).
- Use `buildLocalizedMetadata` from `src/lib/seo.ts` inside each page or route to emit locale-aware `<title>`, `<meta name="description">`, Open Graph, Twitter, and `hreflang` alternates. Pass the route path (`/blog`, `/projects`, etc.) and an optional `openGraphImagePath`; the helper resolves canonical URLs via `https://dev.paczesny.pl`.
- Blog posts derive alternates automatically by inspecting `getAvailableLanguages(slug)`. Each detected translation becomes a canonical URL of the form `https://dev.paczesny.pl/blog/{lang}/{slug}` with `hreflang` codes populated from `getLanguageConfig`. Adding or removing a `[lang].mdx` file instantly updates the sitemap, metadata, and `<link rel="alternate">` output with no extra wiring.

## Syndication Feeds

- Subscribe via `/feed.xml` (RSS 2.0) or `/feed.json` (JSON Feed 1.1). Both routes reuse the multi-locale metadata assembled in [src/lib/feed.ts](src/lib/feed.ts) so every translated MDX file emits its own entry with proper `hreflang` alternates, tags, and cover image references.
- Feed metadata stays consistent with `/blog` by sharing `BLOG_FEED_DESCRIPTION`, ensuring copy updates propagate to schema.org, RSS, and JSON feeds simultaneously.
- Promotion happens in both the hero header and footer so crawlers and readers discover the feeds without relying on auto-discovery alone.
- Validation workflow:
  1. `NEXT_PUBLIC_SITE_URL=http://localhost:3000 bun dev`
  2. Inspect `http://localhost:3000/feed.xml` / `feed.json` to confirm entries per language and absolute URLs.
  3. Paste the public feed URL into https://validator.w3.org/feed/ for W3C validation and add the same URL inside https://feedly.com/i/myfeed to verify ingestion.

## Structured Data

- Reusable builders in [src/lib/structured-data.ts](src/lib/structured-data.ts) output JSON-LD nodes for `Person`, `WebSite`, `CollectionPage`, `BlogPosting`, `BreadcrumbList`, and the projects `ItemList`. Import helpers such as `buildPersonSchema()` and wrap them with `createJsonLd()` before inlining via `<script type="application/ld+json">`.
- The homepage publishes a combined `Person` and `WebSite` graph so Google can associate `dev.paczesny.pl` with Bartek Paczesny as the primary author.
- `/blog` exports a `CollectionPage` that enumerates every localized post from `getPosts()`, while each article renders a `BlogPosting` plus `BreadcrumbList` to reinforce canonical paths.
- `/projects` shares the portfolio as an `ItemList` of `CreativeWork`/`SoftwareApplication` entries so the same schema can power future feeds (RSS/JSON) without duplicating logic.

## Content Taxonomy & Archives

- All MDX front matter now accepts `tags`, `coverImage`, and `readingTimeMinutes`. Tags drive the archive, the cover image feeds OG builders, and the reading time override short-circuits the word-count heuristic when long shell dumps are present. Example:

  ```mdx
  ---
  title: Proxmox - Part Two
  description: Some description
  date: 2025-11-15T18:00:00.000Z
  tags: homelab, proxmox, macvlan, ddns, openvpn, cloudflare
  coverImage: /assets/images/ct-100.png
  readingTimeMinutes: 18
  ---
  ```

- Migration steps for existing content under `content/posts/**`:

  1.  Update the canonical `pl.mdx` front matter for every slug with the three fields above.
  2.  Copy the same key/value pairs into each translated `[lang].mdx` file so localized metadata stays in sync (or translate tag labels if you want localized archives).
  3.  Keep tags kebab/space friendly—`homelab`, `macvlan`, `cloudflare`, etc.—so `/blog/tags/[tag]` routes remain predictable.

- `/blog/tags` lists every discovered tag with usage counts, while `/blog/tags/[tag]` renders a dedicated archive that reuses `PostsList` so search, keyboard control, and view transitions keep working. Each `PostItem` exposes linked tag pills and the article page mirrors them beneath the metadata row.

- Programmatically, use `getTagSummaries()`/`getTagSummaryBySlug()` for tag clouds, `getPostsByTag()` for related content, and `getTagsForPost()` or `<TagBadge>` when you need linked UI chips.

## Accessibility QA

1. `bun dev` and open both `/` and `/blog` in separate tabs so Lighthouse can evaluate the hero/Header and the search workflow.
2. In Chrome DevTools, run a Lighthouse report scoped to Accessibility; expect 100 and verify the "Image alt" audit cites the portrait text `Portrait of Bartek Paczesny`.
3. Use only the keyboard to activate the "Search posts" button (or press `/`), ensure focus moves into the dialog, navigate results with `↑/↓` or `Ctrl/⌘ + J/K`, hit `Enter` to open a post, and press `Esc` to close—focus should return to the trigger.
4. With VoiceOver/NVDA, read a `PostItem` while the dialog is open; confirm screen readers announce the publication date plus available languages via the hidden metadata line.

## Sitemap & Robots

- `src/app/sitemap.ts` emits static routes (`/`, `/blog`, `/projects`) plus every MDX slug under `content/posts/**`. Each post entry collapses `hreflang` alternates via `getAvailableLanguages` so Google sees a single node with localized variants instead of fragmented URLs.
- A shared helper (`src/lib/runtime-url.ts`) keeps sitemap links environment-aware: production always points at `https://dev.paczesny.pl`, Vercel preview builds use their ephemeral host, and local dev falls back to `http://localhost:3000` (or anything passed via `NEXT_PUBLIC_SITE_URL`).
- `src/app/robots.ts` references the sitemap and blocks crawling whenever `VERCEL_ENV` is not `production`, preventing preview/local URLs from being indexed while still exposing the same XML for parity testing.

### Local verification

1. `NEXT_PUBLIC_SITE_URL=http://localhost:3000 bun dev`
2. Visit `http://localhost:3000/sitemap.xml` to inspect generated URLs and `hreflang` alternates.
3. Visit `http://localhost:3000/robots.txt` (expect `Disallow: /` locally). Set `VERCEL_ENV=production` and rerun `bun dev` to preview the production robots output referencing the public sitemap URL.
