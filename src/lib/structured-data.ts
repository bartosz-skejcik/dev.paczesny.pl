import {
  absoluteUrl,
  DEFAULT_SEO_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo"
import { DEFAULT_FALLBACK_LANG, type SupportedLang } from "@/lib/i18n"
import type { MDXFileData } from "@/lib/blog"

export type SchemaNode = Record<string, unknown>

type PersonSchemaInput = {
  name?: string
  alternateName?: string
  description?: string
  jobTitle?: string
  url?: string
  imagePath?: string
  worksFor?: {
    name: string
    url?: string
  }
  homeLocation?: {
    city: string
    country: string
  }
  sameAs?: string[]
  email?: string
  skills?: string[]
}

type WebsiteSchemaInput = {
  name?: string
  description: string
  path: string
  headline?: string
  inLanguage?: SupportedLang
}

type CollectionPageItemInput = {
  name: string
  description: string
  path: string
  lang?: SupportedLang
  datePublished?: string
}

type CollectionPageSchemaInput = {
  name: string
  description: string
  path: string
  lang?: SupportedLang
  items: CollectionPageItemInput[]
}

type BreadcrumbItemInput = {
  name: string
  path: string
}

type ProjectSchemaInput = {
  title: string
  description: string
  href: string
  technologies: string[]
  role?: string
  status?: string
}

type TagListSchemaInput = {
  path: string
  description?: string
  tags: Array<{
    label: string
    slug: string
    count: number
  }>
}

export function buildPersonSchema({
  name = "Bartłomiej Paczesny",
  alternateName = "Bartek Paczesny",
  description = DEFAULT_SEO_DESCRIPTION,
  jobTitle = "Developer & IT Specialist",
  url = SITE_URL,
  imagePath = "/profile.jpg",
  worksFor = { name: "MGW", url: "https://1943.pl" },
  homeLocation = { city: "Warsaw", country: "PL" },
  sameAs = [
    "https://x.com/_j5on",
    "https://github.com/bartosz-skejcik",
    "https://www.linkedin.com/in/bartosz-skejcik",
  ],
  email = "mailto:bartek@paczesny.pl",
  skills = [
    "frontend engineering",
    "infrastructure automation",
    "multilingual publishing systems",
  ],
}: PersonSchemaInput = {}): SchemaNode {
  return {
    "@type": "Person",
    name,
    alternateName,
    description,
    jobTitle,
    url,
    image: absoluteUrl(imagePath),
    sameAs,
    worksFor: {
      "@type": "Organization",
      name: worksFor.name,
      ...(worksFor.url ? { url: worksFor.url } : {}),
    },
    homeLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: homeLocation.city,
        addressCountry: homeLocation.country,
      },
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "work",
      email,
    },
    knowsAbout: skills,
  }
}

export function buildWebsiteSchema({
  name = SITE_NAME,
  description,
  path,
  headline = SITE_NAME,
  inLanguage = DEFAULT_FALLBACK_LANG,
}: WebsiteSchemaInput): SchemaNode {
  return {
    "@type": "WebSite",
    name,
    url: absoluteUrl(path),
    description,
    inLanguage,
    headline,
    publisher: {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
    },
  }
}

export function buildCollectionPageSchema({
  name,
  description,
  path,
  lang = DEFAULT_FALLBACK_LANG,
  items,
}: CollectionPageSchemaInput): SchemaNode {
  return {
    "@type": "CollectionPage",
    name,
    description,
    url: absoluteUrl(path),
    inLanguage: lang,
    numberOfItems: items.length,
    hasPart: items.map((item) => ({
      "@type": "BlogPosting",
      name: item.name,
      description: item.description,
      url: resolveUrl(item.path),
      inLanguage: item.lang ?? lang,
      ...(item.datePublished ? { datePublished: item.datePublished } : {}),
    })),
  }
}

export function buildArticleSchema(
  post: MDXFileData,
  slug: string
): SchemaNode {
  const basePath = `/blog/${post.lang}/${slug}`
  const canonical = absoluteUrl(basePath)
  const ogImage = absoluteUrl(
    `/og/blog?title=${encodeURIComponent(post.metadata.title)}&lang=${
      post.lang
    }`
  )
  const wordCount = post.content.split(/\s+/).filter(Boolean).length

  return {
    "@type": "BlogPosting",
    headline: post.metadata.title,
    description: post.metadata.description,
    url: canonical,
    mainEntityOfPage: canonical,
    inLanguage: post.lang,
    image: ogImage,
    datePublished: post.metadata.date,
    dateModified: post.metadata.date,
    wordCount,
    author: {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
    },
  }
}

export function buildBreadcrumbSchema(
  items: BreadcrumbItemInput[]
): SchemaNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: resolveUrl(item.path),
    })),
  }
}

export function buildProjectsItemList(
  projects: ProjectSchemaInput[]
): SchemaNode {
  return {
    "@type": "ItemList",
    name: "Projects",
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": ["CreativeWork", "SoftwareApplication"],
        name: project.title,
        description: project.description,
        url: resolveUrl(project.href),
        creator: SITE_NAME,
        programmingLanguage: project.technologies,
        keywords: project.technologies.join(", "),
        applicationCategory: project.role,
        developmentStatus: project.status,
      },
    })),
  }
}

export function buildTagListSchema({
  path,
  description = "Browse blog tags and their post counts.",
  tags,
}: TagListSchemaInput): SchemaNode {
  return {
    "@type": "ItemList",
    name: "Blog Tags",
    description,
    url: absoluteUrl(path),
    numberOfItems: tags.length,
    itemListElement: tags.map((tag, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "DefinedTerm",
        name: `#${tag.label.toLowerCase()}`,
        description: `${tag.count} post${tag.count === 1 ? "" : "s"}`,
        termCode: tag.slug,
        url: absoluteUrl(`/blog/tags/${tag.slug}`),
      },
    })),
  }
}

export function createJsonLd(...nodes: SchemaNode[]) {
  const list = nodes.flat().filter(Boolean)
  if (list.length === 1) {
    return {
      "@context": "https://schema.org",
      ...list[0],
    }
  }

  return {
    "@context": "https://schema.org",
    "@graph": list,
  }
}

function resolveUrl(candidate: string): string {
  if (/^https?:\/\//i.test(candidate)) {
    return candidate
  }

  return absoluteUrl(candidate)
}
