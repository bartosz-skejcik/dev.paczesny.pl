import type { ReactNode } from "react"
import { LocalizedSection } from "@/components/localized-section"
import { DEFAULT_FALLBACK_LANG } from "@/lib/i18n"

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <LocalizedSection lang={DEFAULT_FALLBACK_LANG} className="contents">
      {children}
    </LocalizedSection>
  )
}
