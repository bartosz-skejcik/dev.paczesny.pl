import { getProjectBySlug, getAllProjects } from "@/lib/projects-data"
import Header from "@/components/header"
import { notFound } from "next/navigation"
import Link from "next/link"

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const projects = getAllProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  const allProjects = getAllProjects()
  const currentIndex = allProjects.findIndex((p) => p.slug === params.slug)
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null

  return (
    <div className="min-h-screen bg-neutral-200 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200 font-mono text-sm leading-relaxed">
      <Header />

      <main className="max-w-4xl mx-auto p-4 space-y-8">
        {/* Project Title */}
        <section className="border-2 border-neutral-900 dark:border-neutral-200 p-3 sm:p-4">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            {project.emoji} {project.title}
          </h1>
          <p className="text-base sm:text-lg">{project.subtitle}</p>
          {project.title === "MOSIEDLE" && (
            <div className="mt-2 bg-neutral-900 dark:bg-neutral-200 text-neutral-200 dark:text-neutral-900 p-2 inline-block">
              <p className="text-xs font-bold">🏆 AWARD WINNER</p>
            </div>
          )}
        </section>

        {/* Project Overview */}
        <section className="border border-neutral-900 dark:border-neutral-200 p-4">
          <h2 className="text-xl font-bold mb-4 underline">PROJECT.OVERVIEW</h2>
          <div className="space-y-4">
            {project.overview.map((paragraph, index) => (
              <p key={index}>
                {">"} {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Challenges Solved */}
        <section className="border border-neutral-900 dark:border-neutral-200 p-4">
          <h2 className="text-xl font-bold mb-4 underline">CHALLENGES.SOLVED</h2>
          <div className="space-y-4">
            {project.challengesSolved.map((challenge, index) => (
              <div key={index} className="border-l-4 border-neutral-900 dark:border-neutral-200 pl-4">
                <h3 className="font-bold">{challenge.title}</h3>
                <p className="text-xs">{challenge.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Key Features */}
        <section className="border border-neutral-900 dark:border-neutral-200 p-3 sm:p-4">
          <h2 className="text-lg sm:text-xl font-bold mb-4 underline">KEY.FEATURES</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.keyFeatures.map((feature, index) => (
              <div key={index} className="border border-neutral-900 dark:border-neutral-200 p-2 sm:p-3">
                <h3 className="font-bold mb-2 text-sm">{feature.title}</h3>
                <ul className="space-y-1 text-xs">
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Stack */}
        <section className="border border-neutral-900 dark:border-neutral-200 p-3 sm:p-4">
          <h2 className="text-lg sm:text-xl font-bold mb-4 underline">
            {project.architecture ? "TECHNICAL.ARCHITECTURE" : "TECHNICAL.STACK"}
          </h2>
          <div className="bg-neutral-900 dark:bg-neutral-200 text-neutral-200 dark:text-neutral-900 p-3 sm:p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.technicalStack.map((stack, index) => (
                <div key={index}>
                  <h3 className="font-bold mb-2 text-sm">{stack.title}</h3>
                  <ul className="space-y-1 text-xs">
                    {stack.items.map((item, itemIndex) => (
                      <li key={itemIndex}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Architecture Diagram (if available) */}
        {project.architecture && (
          <section className="border border-neutral-900 dark:border-neutral-200 p-4">
            <h2 className="text-xl font-bold mb-4 underline">SYSTEM.ARCHITECTURE</h2>
            <div className="bg-neutral-900 dark:bg-neutral-200 text-neutral-200 dark:text-neutral-900 p-4 font-mono text-xs">
              <pre>{project.architecture}</pre>
            </div>
          </section>
        )}

        {/* Performance Metrics (if available) */}
        {project.metrics && (
          <section className="border border-neutral-900 dark:border-neutral-200 p-4">
            <h2 className="text-xl font-bold mb-4 underline">{project.metrics.title}</h2>
            <div className="bg-neutral-900 dark:bg-neutral-200 text-neutral-200 dark:text-neutral-900 p-4 font-mono text-xs">
              <pre>{project.metrics.content}</pre>
            </div>
          </section>
        )}

        {/* Project Links */}
        <section className="border border-neutral-900 dark:border-neutral-200 p-4">
          <h2 className="text-xl font-bold mb-4 underline">PROJECT.LINKS</h2>
          <div className="space-y-2">
            {project.projectLinks.demo && (
              <p>
                DEMO:{" "}
                <a href={`https://${project.projectLinks.demo}`} className="underline hover:no-underline">
                  {project.projectLinks.demo}
                </a>
              </p>
            )}
            {project.projectLinks.live && (
              <p>
                LIVE SITE:{" "}
                <a href={`https://${project.projectLinks.live}`} className="underline hover:no-underline">
                  {project.projectLinks.live}
                </a>
              </p>
            )}
            {project.projectLinks.github && (
              <p>
                GITHUB:{" "}
                <a href={`https://${project.projectLinks.github}`} className="underline hover:no-underline">
                  {project.projectLinks.github}
                </a>
              </p>
            )}
            <p>STATUS: {project.projectLinks.status}</p>
          </div>
        </section>

        {/* Navigation */}
        <section className="border border-neutral-900 dark:border-neutral-200 p-3 sm:p-4 text-center">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
            {prevProject && (
              <a href={`/projects/${prevProject.slug}`} className="underline hover:no-underline text-sm">
                [← PREV: {prevProject.title}]
              </a>
            )}
            {nextProject && (
              <a href={`/projects/${nextProject.slug}`} className="underline hover:no-underline text-sm">
                [NEXT: {nextProject.title} →]
              </a>
            )}
            <Link href="/#projects" className="underline hover:no-underline text-sm">
              [BACK TO PROJECTS]
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
