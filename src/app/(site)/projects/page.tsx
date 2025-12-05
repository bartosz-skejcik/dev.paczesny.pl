import type { Metadata } from "next"
import { ScrambleText } from "@/components/scramble-text"
import { ProjectCard } from "@/components/project-card"
import { DEFAULT_FALLBACK_LANG } from "@/lib/i18n"
import { buildLocalizedMetadata } from "@/lib/seo"
import { buildProjectsItemList, createJsonLd } from "@/lib/structured-data"

const projects = [
  {
    title: "pile app",
    description: "diary, journal, and notes app in one for android",
    role: "creator",
    period: "aug 2025 - present",
    achievements: [
      "designed and implemented a user-friendly interface for seamless note-taking and journaling",
      "integrated AI features to enhance user experience and productivity",
      "managed app deployment and updates on the Google Play Store",
    ],
    technologies: ["jetpack compose", "groq-ai", "java", "kotlin"],
    href: "https://github.com/bartosz-skejcik/pile-android",
    status: "beta",
  },
  {
    title: "go analytics",
    description:
      "a privacy-focused web analytics backend service for tracking user sessions, page views, and custom events without invasive tracking",
    role: "creator",
    period: "2024",
    achievements: [
      "built a lightweight REST API backend with Go achieving high performance and low resource usage",
      "implemented privacy-focused anonymous tracking using cryptographic hashing with daily rotation",
      "integrated IP-based geolocation for visitor insights across 15+ data points (country, region, city, timezone)",
      "designed and implemented PostgreSQL database schema with optimized indexes for analytics queries",
      "configured serverless deployment on Vercel with CORS support for cross-origin requests",
      "developed flexible custom event logging system with JSON data storage for business metrics",
    ],
    technologies: ["go", "gin", "postgresql", "docker", "vercel", "rest api"],
    href: "https://github.com/bartosz-skejcik/go-analytics",
    status: "prod",
  },
  {
    title: "mosiedle",
    description: "award-winning community management system",
    role: "creator",
    period: "2024",
    achievements: [
      "designed a comprehensive platform for community management in residential complexes, neighborhoods, and housing communities",
      "facilitated communication, resource sharing, and administrative tasks for modern living communities",
      "created an award-winning user experience and technical implementation for real-world community management challenges",
    ],
    technologies: [
      "typeScript",
      "tailwindcss",
      "framer motion",
      "php",
      "mysql",
      "docker",
      "git",
      "restful api",
    ],
    href: "https://github.com/bartosz-skejcik/mosiedle",
    status: "prod",
  },
  {
    title: "content planner",
    description:
      "a simple tool to help you plan and organize your social media content ideas",
    role: "creator",
    period: "2024",
    achievements: [
      "developed a user-friendly interface for easy content planning and organization",
      "implemented features for scheduling and tracking content ideas",
      "ensured cross-platform compatibility and smooth performance",
    ],
    technologies: ["tauri", "react", "typescript", "rust", "tailwindcss"],
    href: "https://github.com/bartosz-skejcik/content-planner",
    status: "dev",
  },
]

const projectsJsonLd = createJsonLd(
  buildProjectsItemList(
    projects.map((project) => ({
      title: project.title,
      description: project.description,
      href: project.href,
      technologies: project.technologies,
      role: project.role,
      status: project.status,
    }))
  )
)

export default function ProjectsPage() {
  return (
    <main className="animate-fade-in-up">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectsJsonLd),
        }}
      />
      <h1 className="text-4xl font-bold mb-8 text-white">
        <span className="text-accent mr-2">*</span>
        <ScrambleText text="projects" />
      </h1>

      <p className="text-neutral-400 mb-12 leading-relaxed">
        here are some of the projects i&apos;ve worked on. i love building tools
        that make developers&apos; lives easier and exploring new technologies
        along the way.
      </p>

      <section className="mb-12">
        <div className="bg-neutral-950 text-neutral-300 p-4 font-mono text-xs rounded-md">
          <p>{"$"} ls -la projects/</p>
          <div className="mt-2 space-y-1">
            <p>total {projects.length} projects</p>
            <p>
              drwxr-xr-x{" "}
              {projects.filter((p) => p.status.includes("prod")).length}{" "}
              production-ready
            </p>
            <p>
              drwxr-xr-x{" "}
              {projects.filter((p) => p.status.includes("beta")).length} in-beta
            </p>
            <p>
              drwxr-xr-x{" "}
              {projects.filter((p) => p.status.includes("dev")).length}{" "}
              in-development
            </p>
          </div>
        </div>
      </section>

      <div className="space-y-12">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </main>
  )
}

export const metadata: Metadata = buildLocalizedMetadata({
  lang: DEFAULT_FALLBACK_LANG,
  title: "Projects",
  description: "Some of the projects I've worked on.",
  path: "/projects",
  openGraphImagePath: "/og/home?title=projects",
})
