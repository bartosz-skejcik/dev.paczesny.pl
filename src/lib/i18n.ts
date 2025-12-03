export const SUPPORTED_LANGS = ["pl", "en", "de", "fr", "es"] as const

export type SupportedLang = (typeof SUPPORTED_LANGS)[number]

export const CANONICAL_LANG: SupportedLang = "pl"
export const DEFAULT_FALLBACK_LANG: SupportedLang = "en"

// Languages that should be eagerly translated before builds for better SEO.
export const TOP_PREBUILD_LANGS: SupportedLang[] = ["en", "de", "fr"]
