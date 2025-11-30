import { notFound } from "next/navigation"
import { MDX } from "./mdx"
import { getPostBySlug } from "@/lib/blog"

// @ts-ignore
import { ViewTransition } from "react"

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const slug = (await params).slug
  const post = getPostBySlug(slug)
  if (!post) {
    return
  }

  const publishedTime = formatDate(post.metadata.date)

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      publishedTime,
      type: "article",
      url: `https://dev.paczesny.pl/blog/${post.slug}`,
      images: [
        {
          url: `https://dev.paczesny.pl/og/blog?title=${post.metadata.title}`,
        },
      ],
    },
    twitter: {
      title: post.metadata.title,
      description: post.metadata.description,
      card: "summary_large_image",
      creator: "@_j5on",
      images: [
        `https://dev.paczesny.pl/og/blog?title=${post.metadata.title}&top=${publishedTime}`,
      ],
    },
  }
}

export default async function Post({ params }: PageProps) {
  const slug = (await params).slug
  const post = getPostBySlug(slug)
  if (!post) {
    notFound()
  }

  const timeToRead = (post.content.split(" ").length / 166).toFixed(0)

  return (
    <ViewTransition>
      <section className="animate-fade-in-up">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.metadata.title,
              datePublished: post.metadata.date,
              dateModified: post.metadata.date,
              description: post.metadata.description,
              image: `https://dev.paczesny.pl/og/blog?title=${
                post.metadata.title
              }&top=${formatDate(post.metadata.date)}`,
              url: `https://dev.paczesny.pl/blog/${post.slug}`,
              author: {
                "@type": "Person",
                name: "Bartłomiej Paczesny",
              },
            }),
          }}
        />

        <h1 className="text-4xl font-bold mb-4 text-white">
          <span className="text-accent mr-2">*</span>
          <ViewTransition name={`post-title-${post.slug}`}>
            <span>{post.metadata.title}</span>
          </ViewTransition>
        </h1>

        <div className="mb-8 flex items-center justify-start gap-4 text-sm text-neutral-400">
          <span>{timeToRead} min read</span>
          <span className="font-black">•</span>
          <ViewTransition name={`post-date-${post.slug}`}>
            <span>{formatDate(post.metadata.date)}</span>
          </ViewTransition>
        </div>

        <article className="prose prose-invert max-w-none prose-headings:text-white prose-a:text-white hover:prose-a:underline">
          <MDX source={post.content} />
        </article>
      </section>
    </ViewTransition>
  )
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
