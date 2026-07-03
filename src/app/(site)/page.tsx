import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Item, SectionList } from "@/components/section-list"
import { BlogSection } from "@/components/blog-section"
import { EducationSection } from "@/components/education-section"
import { GitHubActivity } from "@/components/github-activity"
import { buildLocalizedMetadata, DEFAULT_SEO_DESCRIPTION } from "@/lib/seo"
import { DEFAULT_FALLBACK_LANG } from "@/lib/i18n"
import {
  buildPersonSchema,
  buildWebsiteSchema,
  createJsonLd,
} from "@/lib/structured-data"

// @ts-ignore
import { ViewTransition } from "react"

const workItems: Item[] = [
  {
    title: "MGW",
    role: "IT specialist",
    period: "aug 2025 - present",
    description:
      "maintaining and developing internal systems, providing technical support to employees, and managing IT infrastructure",
    href: "https://1943.pl",
  },
  {
    title: "varsit",
    role: "co-founder and cto",
    period: "jul 2025 - present",
    description:
      "building custom websites and web applications for clients, focusing on modern design and user experience",
    href: "https://varsit.pl",
  },
  {
    title: "bearly.io",
    role: "frontend developer intern",
    period: "may 2023 - jun 2023",
    description:
      "worked on the frontend of a online gaming server hosting platform using React and TypeScript",
    href: "https://bearly.io",
  },
  {
    title: "devapo sp. z o.o.",
    role: "frontend developer intern",
    period: "may 2022 - jun 2022",
    description:
      "worked on the frontend of an internal tool for absence management",
    href: "https://devapo.io",
  },
]

const projectItems = [
  {
    title: "pile app",
    role: "creator and maintainer",
    description: "diary, journal, and notes app in one for android",
    href: "https://github.com/bartosz-skejcik/pile-android",
  },
  {
    title: "go analytics",
    description:
      "a privacy-focused web analytics backend service for tracking user sessions, page views, and custom events without invasive tracking",
    role: "creator and main",
    href: "https://github.com/bartosz-skejcik/go-analytics",
  },
  {
    title: "mosiedle",
    description: "award-winning community management system",
    role: "creator",
    href: "https://github.com/bartosz-skejcik/mosiedle",
  },
]

const homepageJsonLd = createJsonLd(
  buildPersonSchema(),
  buildWebsiteSchema({
    description: DEFAULT_SEO_DESCRIPTION,
    path: "/",
  })
)

export default function HomePage() {
  return (
    <ViewTransition>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageJsonLd),
        }}
      />
      <Header />
      <SectionList title="work" items={workItems} />
      <BlogSection />
      <GitHubActivity username="bartosz-skejcik" limit={5} />
      <SectionList
        title="projects"
        items={projectItems}
        viewAllHref="/projects"
        viewAllText="all projects"
      />
      <EducationSection />
    </ViewTransition>
  )
}

export const metadata: Metadata = {
  ...buildLocalizedMetadata({
    lang: DEFAULT_FALLBACK_LANG,
    title: "Bartek Paczesny",
    description: DEFAULT_SEO_DESCRIPTION,
    path: "/",
    openGraphImagePath: "/og/home",
  }),
  // The root layout's title template would render "Bartek Paczesny | Bartek Paczesny" here.
  title: { absolute: "Bartek Paczesny: Developer & Homelab Blog" },
}
