import { buildJsonFeed, collectFeedEntries } from "@/lib/feed"

export const revalidate = 3600

export async function GET() {
  const feed = buildJsonFeed(collectFeedEntries())

  return Response.json(feed, {
    headers: {
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=1800",
    },
  })
}
