import type { ElementType, HTMLAttributes } from "react"
import type { SupportedLang } from "@/lib/i18n"
import { getLanguageConfig } from "@/lib/i18n"

export type LocalizedSectionProps = {
  lang: SupportedLang
  as?: keyof JSX.IntrinsicElements
} & Omit<HTMLAttributes<HTMLElement>, "lang" | "dir">

export function LocalizedSection({
  lang,
  as = "div",
  className,
  children,
  ...rest
}: LocalizedSectionProps) {
  const { htmlLang, dir } = getLanguageConfig(lang)
  const Component = as as ElementType

  return (
    <Component
      lang={htmlLang}
      dir={dir}
      data-locale={lang}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  )
}
