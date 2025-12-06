<samp>
stack: next.js, tailwindcss, typescript, mdx, vercel
</samp>

## Translations

- Canonical blog content lives in `content/posts/[slug]/pl.mdx`. Each translated version is stored as `[lang].mdx` in the same folder.
- Set `GROQ_API_KEY` to a Groq API token. The Vercel AI SDK talks to `https://api.groq.com/openai/v1/chat/completions` using the `llama-3.1-70b-versatile` chat model.
- Trigger on-demand translations by calling `POST /api/translations/[slug]` with `{ "targetLang": "de" }`. Successful requests cache the translated markdown to disk and revalidate `/blog/{lang}/{slug}`.
- Run `bun run translate:top` (powered by `scripts/pretranslate.ts`) during CI/CD to prebuild `TOP_PREBUILD_LANGS` so that the most popular languages are statically generated.
- Blog pages automatically redirect to `/blog/en/[slug]` whenever a requested locale is missing. A language switcher renders links for every supported language and disables untranslated ones for clarity.

## SEO & Localization

- Every route rendered from `src/app/(site)` inherits language metadata from `LocalizedSection`, which sets both `lang` (BCP-47) and `dir` attributes. Nested layouts such as `src/app/(site)/blog/[lang]/layout.tsx` override the wrapper so translated blog posts ship with server-rendered attributes (no client-side mutation required).
- Use `buildLocalizedMetadata` from `src/lib/seo.ts` inside each page or route to emit locale-aware `<title>`, `<meta name="description">`, Open Graph, Twitter, and `hreflang` alternates. Pass the route path (`/blog`, `/projects`, etc.) and an optional `openGraphImagePath`; the helper resolves canonical URLs via `https://dev.paczesny.pl`.
- Blog posts derive alternates automatically by inspecting `getAvailableLanguages(slug)`. Each detected translation becomes a canonical URL of the form `https://dev.paczesny.pl/blog/{lang}/{slug}` with `hreflang` codes populated from `getLanguageConfig`. Adding or removing a `[lang].mdx` file instantly updates the sitemap, metadata, and `<link rel="alternate">` output with no extra wiring.

## Structured Data

- Reusable builders in [src/lib/structured-data.ts](src/lib/structured-data.ts) output JSON-LD nodes for `Person`, `WebSite`, `CollectionPage`, `BlogPosting`, `BreadcrumbList`, and the projects `ItemList`. Import helpers such as `buildPersonSchema()` and wrap them with `createJsonLd()` before inlining via `<script type="application/ld+json">`.
- The homepage publishes a combined `Person` and `WebSite` graph so Google can associate `dev.paczesny.pl` with Bartek Paczesny as the primary author.
- `/blog` exports a `CollectionPage` that enumerates every localized post from `getPosts()`, while each article renders a `BlogPosting` plus `BreadcrumbList` to reinforce canonical paths.
- `/projects` shares the portfolio as an `ItemList` of `CreativeWork`/`SoftwareApplication` entries so the same schema can power future feeds (RSS/JSON) without duplicating logic.

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
