<samp>
stack: next.js, tailwindcss, typescript, mdx, vercel
</samp>

## Translations

- Canonical blog content lives in `content/posts/[slug]/pl.mdx`. Each translated version is stored as `[lang].mdx` in the same folder.
- Set `GROQ_API_KEY` to a Groq API token. The Vercel AI SDK talks to `https://api.groq.com/openai/v1/chat/completions` using the `llama-3.1-70b-versatile` chat model.
- Trigger on-demand translations by calling `POST /api/translations/[slug]` with `{ "targetLang": "de" }`. Successful requests cache the translated markdown to disk and revalidate `/blog/{lang}/{slug}`.
- Run `bun run translate:top` (powered by `scripts/pretranslate.ts`) during CI/CD to prebuild `TOP_PREBUILD_LANGS` so that the most popular languages are statically generated.
- Blog pages automatically redirect to `/blog/en/[slug]` whenever a requested locale is missing. A language switcher renders links for every supported language and disables untranslated ones for clarity.
