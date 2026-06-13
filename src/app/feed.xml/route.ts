import { buildRssFeed, collectFeedEntries } from "@/lib/feed"

export const revalidate = 3600

export async function GET() {
  const feed = buildRssFeed(collectFeedEntries())

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=1800",
    },
  })
}
