import { ImageResponse } from "next/og"

// Dynamic OG image for blog posts. The scene is picked per topic (from the
// post's tags) so a Proxmox post gets a Proxmox shell, not a Claude tool-call
// terminal, and the title is rendered per language by the caller. Posts with an
// explicit coverImage skip this route entirely.

const ACCENT = "#ff6b35"
const BG = "#111"
const CARD = "#181818"
const BAR = "#1f1f1f"
const BORDER = "#262626"
const MUTED = "#6f6f6f"

async function loadGoogleFont(weight: number, text: string) {
  const family = `Geist+Mono:wght@${weight}`
  const url = `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(
    text
  )}`
  const css = await (await fetch(url)).text()
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)
  if (!resource) {
    throw new Error("failed to load font data")
  }
  const response = await fetch(resource[1])
  return response.arrayBuffer()
}

type Line = { mark: string; main: string; mainColor: string; weight: number; tail?: string }
type Theme = { host: string; lines: Line[] }

const prompt = (t: string): Line => ({ mark: ">", main: t, mainColor: "#e6e6e6", weight: 400 })
const act = (fn: string, tail = ""): Line => ({ mark: "*", main: fn, mainColor: "#ffffff", weight: 700, tail })
const err = (fn: string, tail = ""): Line => ({ mark: "x", main: fn, mainColor: ACCENT, weight: 700, tail })
const note = (t: string): Line => ({ mark: "", main: t, mainColor: MUTED, weight: 400 })

// Ordered by distinctive tags; first match wins. Shared tags (ai, seo, nextjs,
// self-hosting) are deliberately not used as triggers so overlapping posts land
// on their true topic.
const THEMES: { match: string[]; theme: Theme }[] = [
  {
    match: ["proxmox", "lxc", "macvlan"],
    theme: {
      host: "root@pve:~#",
      lines: [
        prompt("pct create 110 --hostname node"),
        act("rootfs", "extracted, 110 up"),
        prompt("pct enter 110"),
        act("docker", "active (running)"),
      ],
    },
  },
  {
    match: ["tłumaczenia", "i18n", "llama", "groq"],
    theme: {
      host: "translate:post",
      lines: [
        prompt("bun translate:post --lang de"),
        act("llama-3.3-70b", "translating..."),
        err("link:", "proxmox-czesc-druga"),
        note("-> proxmox-teil-zwei   404"),
      ],
    },
  },
  {
    match: ["agent-ready", "llms-txt", "aeo"],
    theme: {
      host: "curl @ dev.paczesny.pl",
      lines: [
        prompt('curl -H "Accept: text/markdown" /'),
        act("200 OK", "text/markdown"),
        act("llms.txt", "Content-Signal"),
        note("ai-train=yes, search=yes"),
      ],
    },
  },
  {
    match: ["mcp", "claude-code", "analytics", "agenty"],
    theme: {
      host: "claude @ dev.paczesny.pl",
      lines: [
        prompt("analyze this week's traffic"),
        act("get_stats()", "get_timeseries()"),
        act("get_gsc_pages()", "ctr"),
        note("1200 visits, +15%"),
      ],
    },
  },
  {
    match: ["coolify", "searxng", "vaultwarden", "docker", "homelab"],
    theme: {
      host: "deploy @ coolify",
      lines: [
        prompt("git push origin prod"),
        act("build", "next build ok"),
        act("traefik", "cert issued"),
        note("app live on :3000"),
      ],
    },
  },
  {
    match: ["framework", "deno", "nextjs", "webdev", "architektura"],
    theme: {
      host: "~/dev $",
      lines: [
        prompt("rewrite blog to Fresh?"),
        act("cost", "52 files, 24 posts x4"),
        err("regression", "SEO, OG, i18n"),
        note("decision: stay on Next"),
      ],
    },
  },
]

const DEFAULT_THEME: Theme = {
  host: "~/blog $",
  lines: [
    prompt('git commit -m "new post"'),
    act("push", "origin prod"),
    act("coolify", "deploy triggered"),
    note("published ok"),
  ],
}

function pickTheme(tags: string[]): Theme {
  const set = new Set(tags.map((t) => t.toLowerCase().trim()))
  for (const { match, theme } of THEMES) {
    if (match.some((m) => set.has(m))) {
      return theme
    }
  }
  return DEFAULT_THEME
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = (searchParams.get("title") ?? "bpaczesny's blog").slice(0, 90)
  const lang = (searchParams.get("lang") ?? "pl").slice(0, 2).toUpperCase()
  const tags = (searchParams.get("tags") ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)

  const theme = pickTheme(tags)

  const glyphSource =
    title +
    " " +
    lang +
    " " +
    theme.host +
    " " +
    theme.lines.map((l) => `${l.mark} ${l.main} ${l.tail ?? ""}`).join(" ") +
    " *>x/.-:()#\"'0123456789 abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

  const [regular, bold] = await Promise.all([
    loadGoogleFont(400, glyphSource),
    loadGoogleFont(700, glyphSource),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: BG,
          fontFamily: "Geist Mono",
          padding: "40px",
          position: "relative",
        }}
      >
        {/* terminal card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            border: `1px solid ${BORDER}`,
            borderRadius: "14px",
            backgroundColor: CARD,
            overflow: "hidden",
          }}
        >
          {/* title bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "48px",
              padding: "0 18px",
              backgroundColor: BAR,
            }}
          >
            <div style={{ display: "flex", width: "70px" }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: "13px",
                    height: "13px",
                    borderRadius: "50%",
                    border: "1.5px solid #575757",
                    marginRight: "9px",
                  }}
                />
              ))}
            </div>
            <div
              style={{
                display: "flex",
                flex: 1,
                justifyContent: "center",
                color: "#8a8a8a",
                fontSize: 19,
              }}
            >
              {theme.host}
            </div>
            <div
              style={{
                display: "flex",
                width: "70px",
                justifyContent: "flex-end",
                color: ACCENT,
                fontSize: 16,
              }}
            >
              {lang}
            </div>
          </div>

          {/* body */}
          <div style={{ display: "flex", flexDirection: "column", padding: "30px 32px" }}>
            {theme.lines.map((line, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  marginBottom: i === theme.lines.length - 1 ? "0" : "20px",
                  fontSize: 24,
                }}
              >
                <div style={{ display: "flex", width: "22px", flexShrink: 0, color: ACCENT }}>
                  {line.mark}
                </div>
                <div style={{ display: "flex", color: line.mainColor, fontWeight: line.weight }}>
                  {line.main}
                </div>
                {line.tail ? (
                  <div style={{ display: "flex", color: MUTED, marginLeft: "10px" }}>
                    {line.tail}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        {/* title row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "auto",
            maxWidth: "860px",
          }}
        >
          <div style={{ display: "flex", color: ACCENT, fontSize: 46, marginRight: "16px" }}>*</div>
          <div style={{ display: "flex", color: "#fff", fontSize: 44, fontWeight: 700, lineHeight: 1.12 }}>
            {title}
          </div>
        </div>

        {/* avatar (ghost) */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "82px",
            height: "82px",
            borderRadius: "50%",
            backgroundColor: "#fff",
          }}
        >
          <svg width="46" height="46" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#2b2b2b"
              d="M50 13c-16 0-27 12-27 30v40c0 4 4 6 7 3l5-5c2-2 5-2 7 0l5 5c2 2 5 2 7 0l5-5c2-2 5-2 7 0l5 5c3 3 7 1 7-3V43c0-18-11-30-28-30z"
            />
            <circle cx="41" cy="45" r="5" fill="#fff" />
            <circle cx="59" cy="45" r="5" fill="#fff" />
          </svg>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        { name: "Geist Mono", data: regular, weight: 400, style: "normal" },
        { name: "Geist Mono", data: bold, weight: 700, style: "normal" },
      ],
    }
  )
}
