import Header from "@/components/header"
import { getAllProjects } from "@/lib/projects-data"
import ProjectCard from "@/components/project-card"
import Link from "next/link"

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <div className="min-h-screen bg-neutral-200 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200 font-mono text-sm leading-relaxed">
      <Header />

      <main className="max-w-4xl mx-auto p-4 space-y-8">
        {/* Page Title */}
        <section className="border-2 border-neutral-900 dark:border-neutral-200 p-3 sm:p-4">
          <div className="hidden sm:block">
            <pre className="whitespace-pre-wrap text-xs sm:text-sm">
              {`
 ██▓███   ██▀███   ▒█████   ▄▄▄██▀▀▀▓█████  ▄████▄  ▄▄▄█████▓  ██████
▓██░  ██▒▓██ ▒ ██▒▒██▒  ██▒   ▒██   ▓█   ▀ ▒██▀ ▀█  ▓  ██▒ ▓▒▒██    ▒
▓██░ ██▓▒▓██ ░▄█ ▒▒██░  ██▒   ░██   ▒███   ▒▓█    ▄ ▒ ▓██░ ▒░░ ▓██▄
▒██▄█▓▒ ▒▒██▀▀█▄  ▒██   ██░▓██▄██▓  ▒▓█  ▄ ▒▓▓▄ ▄██▒░ ▓██▓ ░   ▒   ██▒
▒██▒ ░  ░░██▓ ▒██▒░ ████▓▒░ ▓███▒   ░▒████▒▒ ▓███▀ ░  ▒██▒ ░ ▒██████▒▒
▒▓▒░ ░  ░░ ▒▓ ░▒▓░░ ▒░▒░▒░  ▒▓▒▒░   ░░ ▒░ ░░ ░▒ ▒  ░  ▒ ░░   ▒ ▒▓▒ ▒ ░
░▒ ░       ░▒ ░ ▒░  ░ ▒ ▒░  ▒ ░▒░    ░ ░  ░  ░  ▒       ░    ░ ░▒  ░ ░
░░         ░░   ░ ░ ░ ░ ▒   ░ ░ ░      ░   ░          ░      ░  ░  ░
            ░         ░ ░   ░   ░      ░  ░░ ░                     ░

ALL PROJECTS DIRECTORY
`}
            </pre>
          </div>
          <div className="sm:hidden text-center">
            <h1 className="text-2xl font-bold mb-2">PROJECTS</h1>
            <p className="text-sm">ALL PROJECTS DIRECTORY</p>
          </div>
        </section>

        {/* Projects Stats */}
        <section className="border border-neutral-900 dark:border-neutral-200 p-4">
          <h2 className="text-xl font-bold mb-4 underline">PORTFOLIO.STATS</h2>
          <div className="bg-neutral-900 dark:bg-neutral-200 text-neutral-200 dark:text-neutral-900 p-4 font-mono text-xs">
            <p>{">"} ls -la projects/</p>
            <div className="mt-2 space-y-1">
              <p>total {projects.length} projects</p>
              <p>
                drwxr-xr-x {projects.filter((p) => p.projectLinks.status.includes("PRODUCTION")).length}{" "}
                production-ready
              </p>
              <p>
                drwxr-xr-x {projects.filter((p) => p.projectLinks.status.includes("DEVELOPMENT")).length} in-development
              </p>
              <p>drwxr-xr-x {projects.filter((p) => p.projectLinks.status.includes("AWARD")).length} award-winning</p>
              <p>{">"} Technologies used: Next.js, TypeScript, Go, PHP, PostgreSQL, AI/ML</p>
            </div>
          </div>
        </section>

        {/* All Projects */}
        <section className="border border-neutral-900 dark:border-neutral-200 p-4">
          <h2 className="text-xl font-bold mb-4 underline">ALL.PROJECTS</h2>

          <div className="space-y-6">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </section>

        {/* Project Categories */}
        <section className="border border-neutral-900 dark:border-neutral-200 p-3 sm:p-4">
          <h2 className="text-lg sm:text-xl font-bold mb-4 underline">PROJECT.CATEGORIES</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-neutral-900 dark:border-neutral-200 p-2 sm:p-3">
              <h3 className="font-bold mb-2 text-sm">🤖 AI/ML PROJECTS:</h3>
              <ul className="space-y-1 text-xs">
                {projects
                  .filter((p) =>
                    p.overview.some((text) => text.toLowerCase().includes("ai") || text.toLowerCase().includes("ml")),
                  )
                  .map((project) => (
                    <li key={project.id}>
                      •{" "}
                      <a href={`/projects/${project.slug}`} className="underline hover:no-underline">
                        {project.title}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>

            <div className="border border-neutral-900 dark:border-neutral-200 p-2 sm:p-3">
              <h3 className="font-bold mb-2 text-sm">🚀 WEB APPLICATIONS:</h3>
              <ul className="space-y-1 text-xs">
                {projects
                  .filter((p) =>
                    p.technicalStack.some((stack) =>
                      stack.items.some((item) => item.includes("Next.js") || item.includes("React")),
                    ),
                  )
                  .map((project) => (
                    <li key={project.id}>
                      •{" "}
                      <a href={`/projects/${project.slug}`} className="underline hover:no-underline">
                        {project.title}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>

            <div className="border border-neutral-900 dark:border-neutral-200 p-2 sm:p-3">
              <h3 className="font-bold mb-2 text-sm">⚡ HIGH-PERFORMANCE:</h3>
              <ul className="space-y-1 text-xs">
                {projects
                  .filter((p) =>
                    p.technicalStack.some((stack) =>
                      stack.items.some((item) => item.includes("Go") || item.includes("performance")),
                    ),
                  )
                  .map((project) => (
                    <li key={project.id}>
                      •{" "}
                      <a href={`/projects/${project.slug}`} className="underline hover:no-underline">
                        {project.title}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>

            <div className="border border-neutral-900 dark:border-neutral-200 p-2 sm:p-3">
              <h3 className="font-bold mb-2 text-sm">🏆 AWARD WINNERS:</h3>
              <ul className="space-y-1 text-xs">
                {projects
                  .filter((p) => p.projectLinks.status.includes("AWARD"))
                  .map((project) => (
                    <li key={project.id}>
                      •{" "}
                      <a href={`/projects/${project.slug}`} className="underline hover:no-underline">
                        {project.title}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="border border-neutral-900 dark:border-neutral-200 p-4 text-center">
          <Link href="/" className="underline hover:no-underline text-lg">
            [RETURN TO MAIN DIRECTORY]
          </Link>
        </section>
      </main>
    </div>
  )
}
