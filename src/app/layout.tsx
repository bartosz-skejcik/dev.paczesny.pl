import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Geist_Mono } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ShortcutGuide } from "@/components/shortcut-guide"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { DEFAULT_SEO_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo"
import { DEFAULT_FALLBACK_LANG, getLanguageConfig } from "@/lib/i18n"

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
})

const fallbackLocale = getLanguageConfig(DEFAULT_FALLBACK_LANG)

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_SEO_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang={fallbackLocale.htmlLang}
      dir={fallbackLocale.dir}
      data-locale={DEFAULT_FALLBACK_LANG}
      className={geistMono.className}
    >
      <body className={`antialiased min-h-screen`}>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Navbar />
          <ShortcutGuide />
          {children}
          <Footer username="bartosz-skejcik" />
          <Analytics />
          <SpeedInsights />
        </div>
      </body>
    </html>
  )
}
