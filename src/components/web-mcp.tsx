"use client"

import { useEffect } from "react"

// WebMCP (https://webmachinelearning.github.io/webmcp/) — exposes site actions
// as tools to in-browser AI agents via navigator.modelContext. Renders nothing.

type ToolResult = { content: Array<{ type: "text"; text: string }> }

type WebMcpTool = {
  name: string
  description: string
  inputSchema: Record<string, unknown>
  execute: (args: Record<string, unknown>) => Promise<ToolResult>
}

type ModelContext = {
  provideContext?: (context: { tools: WebMcpTool[] }) => void
  registerTool?: (tool: WebMcpTool) => void
}

type FeedItem = {
  title: string
  url: string
  summary?: string
  date_published?: string
  tags?: string[]
}

const text = (value: string): ToolResult => ({
  content: [{ type: "text", text: value }],
})

async function fetchFeed(): Promise<FeedItem[]> {
  const res = await fetch("/feed.json", { headers: { accept: "application/json" } })
  if (!res.ok) {
    return []
  }
  const feed = (await res.json()) as { items?: FeedItem[] }
  return feed.items ?? []
}

function formatItem(item: FeedItem): string {
  const parts = [`- ${item.title} (${item.url})`]
  if (item.summary) {
    parts.push(`  ${item.summary}`)
  }
  return parts.join("\n")
}

const TOOLS: WebMcpTool[] = [
  {
    name: "list_posts",
    description:
      "List all blog posts on this site with their title, URL and summary.",
    inputSchema: { type: "object", properties: {} },
    async execute() {
      const items = await fetchFeed()
      if (!items.length) {
        return text("No posts found.")
      }
      return text(items.map(formatItem).join("\n"))
    },
  },
  {
    name: "search_posts",
    description:
      "Search this site's blog posts by keyword across title, summary and tags.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Keyword(s) to search for." },
      },
      required: ["query"],
    },
    async execute(args) {
      const query = String(args.query ?? "").toLowerCase().trim()
      if (!query) {
        return text("Provide a non-empty query.")
      }
      const items = await fetchFeed()
      const matches = items.filter((item) => {
        const haystack = [item.title, item.summary, ...(item.tags ?? [])]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
        return haystack.includes(query)
      })
      if (!matches.length) {
        return text(`No posts matched "${query}".`)
      }
      return text(matches.map(formatItem).join("\n"))
    },
  },
  {
    name: "get_post",
    description:
      "Fetch the full Markdown content of a blog post given its URL (as returned by list_posts or search_posts).",
    inputSchema: {
      type: "object",
      properties: {
        url: { type: "string", description: "Absolute or relative post URL." },
      },
      required: ["url"],
    },
    async execute(args) {
      const url = String(args.url ?? "").trim()
      if (!url) {
        return text("Provide a post URL.")
      }
      try {
        const res = await fetch(url, { headers: { accept: "text/markdown" } })
        if (!res.ok) {
          return text(`Could not fetch ${url} (HTTP ${res.status}).`)
        }
        return text(await res.text())
      } catch {
        return text(`Could not fetch ${url}.`)
      }
    },
  },
]

export function WebMcp() {
  useEffect(() => {
    const modelContext = (
      navigator as Navigator & { modelContext?: ModelContext }
    ).modelContext
    if (!modelContext) {
      return
    }

    if (typeof modelContext.provideContext === "function") {
      modelContext.provideContext({ tools: TOOLS })
    } else if (typeof modelContext.registerTool === "function") {
      TOOLS.forEach((tool) => modelContext.registerTool?.(tool))
    }
  }, [])

  return null
}
