import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Geist_Mono } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { DEFAULT_SEO_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo"

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
})

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
    <html className={geistMono.className}>
      <body className={`antialiased min-h-screen`}>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Navbar />
          {children}
          <Footer username="bartosz-skejcik" />
          <Analytics />
          <SpeedInsights />
        </div>
      </body>
    </html>
  )
}
