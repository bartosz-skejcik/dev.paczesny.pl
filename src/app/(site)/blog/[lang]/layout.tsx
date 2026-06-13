import type { ReactNode } from "react"
import { LocalizedSection } from "@/components/localized-section"
import { normalizeLang } from "@/lib/i18n"

type BlogLangLayoutProps = {
  children: ReactNode
  params: Promise<{ lang: string }>
}

export default async function BlogLangLayout({
  children,
  params,
}: BlogLangLayoutProps) {
  const { lang } = await params
  const normalizedLang = normalizeLang(lang)

  return (
    <LocalizedSection lang={normalizedLang} className="contents">
      {children}
    </LocalizedSection>
  )
}
