interface Language {
  size: number
  name: string
  color: string
}

interface Commit {
  repo: string
  additions: number
  deletions: number
  commitUrl: string
  committedDate: string
  oid: string
  messageHeadline: string
  messageBody: string
}

interface CommitsResponse {
  commits: Commit[]
  languages: Language[]
  stats: {
    totalAdditions: number
    totalDeletions: number
    totalCommits: number
  }
}

interface GitHubActivityProps {
  username: string
  limit?: number
}

async function getRecentCommits(
  username: string,
  limit: number = 10
): Promise<CommitsResponse | null> {
  try {
    const res = await fetch(
      `https://katib.blonie.cloud/v2/commits/latest?username=${username}&limit=${limit}`
    )

    if (!res.ok) {
      throw new Error("Failed to fetch commits")
    }

    return await res.json()
  } catch (error) {
    console.error("Error fetching commits:", error)
    return null
  }
}

function formatDate(timestamp: string): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days === 0) return "today"
  if (days === 1) return "yesterday"
  if (days < 7) return `${days} days ago`
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

export async function GitHubActivity({
  username,
  limit = 10,
}: GitHubActivityProps) {
  const data = await getRecentCommits(username, limit)

  if (!data || !data.commits || data.commits.length === 0) {
    return (
      <section className="mb-16">
        <h2 className="text-xl font-bold mb-6">recent commits</h2>
        <p className="text-muted-foreground">no recent commits found</p>
      </section>
    )
  }

  const commits: Commit[] = data.commits
  const languages: Language[] = data.languages || []

  // Calculate language percentages
  const totalBytes = languages.reduce((sum, lang) => sum + lang.size, 0)
  const languageStats = languages
    .map((lang) => ({
      name: lang.name,
      bytes: lang.size,
      percentage: ((lang.size / totalBytes) * 100).toFixed(1),
      color: lang.color,
    }))
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 5)

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mb-6 flex items-center text-white">
          <span className="text-accent mr-2">*</span> recent commits
        </h2>
        <a
          href="https://katib.blonie.cloud"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent/80 hover:text-accent text-sm transition-colors"
        >
          [info]
        </a>
      </div>

      {/* Commits List */}
      <ul className="space-y-1.5 mb-3">
        {commits.map((commit) => (
          <li key={commit.oid}>
            <a
              href={commit.commitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground flex min-w-0 items-center gap-2 leading-relaxed"
              title={`${commit.repo}: ${commit.messageHeadline}`}
            >
              <span className="flex-shrink-0 font-medium">
                {commit.repo.split("/")[1]}:
              </span>
              <span className="min-w-0 flex-1 truncate hover:text-accent">
                {commit.messageHeadline.length > 50
                  ? commit.messageHeadline.slice(0, 50) + "…"
                  : commit.messageHeadline}
              </span>
              <span className="flex-shrink-0 text-sm whitespace-nowrap">
                <span className="text-green-400">+{commit.additions}</span>
                <span className="text-muted-foreground/40"> / </span>
                <span className="text-red-400">-{commit.deletions}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      {/* Footer with GitHub link and Language Bar */}
      <div className="flex items-center gap-3 mt-4">
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group text-accent inline-flex items-center gap-1 text-sm hover:underline"
        >
          <span>view on github</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>

        {/* Language Bar */}
        <div className="ml-auto max-w-xs flex-1 sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-full">
          <div className="h-2 w-full rounded-[3px] bg-muted/20">
            <div className="flex h-full w-full">
              {languageStats.map((lang, index) => (
                <div
                  key={lang.name}
                  className="group relative h-full first:rounded-l-[3px] last:rounded-r-[3px]"
                  style={{
                    width: `clamp(8px, ${lang.percentage}%, ${lang.percentage}%)`,
                    backgroundColor: lang.color,
                  }}
                >
                  <div className="pointer-events-none absolute -top-7 left-1/2 z-10 -translate-x-1/2 rounded bg-black/90 border border-white/10 px-2 py-0.5 text-xs whitespace-nowrap opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-2">
                      <span
                        className="inline-block h-2 w-2 rounded"
                        style={{ backgroundColor: lang.color }}
                      />
                      <span className="text-muted-foreground">{lang.name}</span>
                      <span className="text-muted-foreground/40">•</span>
                      <span className="text-white">{lang.percentage}%</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
