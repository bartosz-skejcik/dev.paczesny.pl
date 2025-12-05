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
