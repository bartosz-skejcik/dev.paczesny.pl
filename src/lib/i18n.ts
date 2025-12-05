export const SUPPORTED_LANGS = ["pl", "en", "de", "fr", "es"] as const

export type SupportedLang = (typeof SUPPORTED_LANGS)[number]

export const CANONICAL_LANG: SupportedLang = "pl"
export const DEFAULT_FALLBACK_LANG: SupportedLang = "en"

export type LanguageConfig = {
  /**
   * BCP-47 language tag emitted via the `lang` attribute and `<meta name="content-language">`.
   */
  htmlLang: string
  /**
   * `hreflang` code exposed through Next metadata alternates.
   */
  hrefLang: string
  /**
   * Locale code (used for `toLocaleDateString`).
   */
  locale: string
  /**
   * Open Graph locale identifier.
   */
  openGraphLocale: string
  /**
   * Text direction for the language.
   */
  dir: "ltr" | "rtl"
}

const LANGUAGE_CONFIG: Record<SupportedLang, LanguageConfig> = {
  pl: {
    htmlLang: "pl-PL",
    hrefLang: "pl-PL",
    locale: "pl-PL",
    openGraphLocale: "pl_PL",
    dir: "ltr",
  },
  en: {
    htmlLang: "en-US",
    hrefLang: "en-US",
    locale: "en-US",
    openGraphLocale: "en_US",
    dir: "ltr",
  },
  de: {
    htmlLang: "de-DE",
    hrefLang: "de-DE",
    locale: "de-DE",
    openGraphLocale: "de_DE",
    dir: "ltr",
  },
  fr: {
    htmlLang: "fr-FR",
    hrefLang: "fr-FR",
    locale: "fr-FR",
    openGraphLocale: "fr_FR",
    dir: "ltr",
  },
  es: {
    htmlLang: "es-ES",
    hrefLang: "es-ES",
    locale: "es-ES",
    openGraphLocale: "es_ES",
    dir: "ltr",
  },
}

export function getLanguageConfig(lang: SupportedLang): LanguageConfig {
  return LANGUAGE_CONFIG[lang]
}

export function normalizeLang(
  candidate: string | null | undefined
): SupportedLang {
  const normalized = (
    candidate ?? DEFAULT_FALLBACK_LANG
  ).toLowerCase() as SupportedLang
  return SUPPORTED_LANGS.includes(normalized)
    ? normalized
    : DEFAULT_FALLBACK_LANG
}

// Languages that should be eagerly translated before builds for better SEO.
export const TOP_PREBUILD_LANGS: SupportedLang[] = ["en", "de", "fr"]
