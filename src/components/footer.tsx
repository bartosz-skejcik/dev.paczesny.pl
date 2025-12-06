import { GitCommitVertical } from "lucide-react"
import Link from "next/link"

interface LatestCommitResponse {
  repo: string
  additions: number
  deletions: number
  commitUrl: string
  committedDate: string
  oid: string
  messageHeadline: string
  messageBody: string
}

async function getLatestCommit(username: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://katib.blonie.cloud/commits/latest?username=${username}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    )

    if (!res.ok) {
      return null
    }

    const contentType = res.headers.get("content-type") ?? ""

    if (!contentType.includes("application/json")) {
      const preview = await res.text()
      console.warn("Unexpected latest commit payload", preview.slice(0, 200))
      return null
    }

    try {
      const data: LatestCommitResponse = await res.json()
      return data.oid || null
    } catch (parseError) {
      console.error("Error parsing latest commit payload", parseError)
      return null
    }
  } catch (error) {
    console.error("Error fetching latest commit:", error)
    return null
  }
}

interface FooterProps {
  username: string
}

const links = [
  { title: "rss", href: "/feed.xml" },
  { title: "json feed", href: "/feed.json" },
  { title: "email", href: "mailto:bartek@paczesny.pl" },
  { title: "x.com", href: "https://x.com/_j5on" },
  { title: "github", href: "https://github.com/bartosz-skejcik" },
  { title: "linkedin", href: "https://www.linkedin.com/in/bartosz-skejcik" },
]

export async function Footer({ username }: FooterProps) {
  const commitSha = await getLatestCommit(username)

  return (
    <footer className="mt-16 pt-8 text-sm text-muted-foreground flex items-center justify-between flex-wrap gap-4">
      <div className="flex flex-wrap gap-4 text-sm">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="text-neutral-400 hover:text-accent transition-colors duration-200"
          >
            {link.title}
          </Link>
        ))}
      </div>
      <div>
        {commitSha && (
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs hover:text-accent transition-colors duration-200 flex items-center justify-center"
            title="Latest commit"
          >
            <GitCommitVertical className="inline-block w-4 h-4 mr-1 align-middle" />
            <p className="pt-0.5">{commitSha}</p>
          </a>
        )}
      </div>
    </footer>
  )
}
