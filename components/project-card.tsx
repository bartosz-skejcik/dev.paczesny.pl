import type { Project } from "@/lib/projects-data"
import Link from "next/link";

export default function ProjectCard({
  project,
  index,
  isOnHomePage = false,
}: { project: Project; index: number; isOnHomePage?: boolean }) {
  return (
    <div className="border border-neutral-900 dark:border-neutral-100 p-3 sm:p-4">
      <div className="flex flex-row justify-between items-start mb-2 gap-2">
        <h3 className="text-base sm:text-lg font-bold">
          {project.emoji} {project.title}
        </h3>
        {isOnHomePage == false && (
          <span className="text-xs bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900 px-2 py-1 self-start">
            #{String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>

      <p className="text-sm mb-2">{project.subtitle}</p>

      <p className="mb-3 text-xs leading-relaxed">{project.overview[0].substring(0, 200)}...</p>

      {/* Tech Stack Preview */}
      <div className="mb-3">
        <h4 className="font-bold text-xs mb-1">TECH STACK:</h4>
        <div className="flex flex-wrap gap-1">
          {project.technicalStack.flatMap((stack) =>
            stack.items.slice(0, 4).map((tech, techIndex) => (
              <span key={techIndex} className="text-xs border border-neutral-900 dark:border-neutral-100 px-1 py-0.5">
                {tech.split(" ")[0]}
              </span>
            )),
          )}
        </div>
      </div>

      {isOnHomePage ? (
        <div className="flex justify-start items-center">
          <Link href={`/projects/${project.slug}`} className="underline hover:no-underline text-sm">
            [VIEW DETAILS]
          </Link>
        </div>
      ) : (
        <>
          {/* Status and Links */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <div className="text-xs">
              <span className="font-bold">STATUS:</span> {project.projectLinks.status}
              {project.title === "MOSIEDLE" && (
                <span className="ml-2 bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900 px-1 py-0.5">🏆 AWARD</span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {project.projectLinks.demo && (
                <Link href={`https://${project.projectLinks.demo}`} className="underline hover:no-underline text-sm">
                  [DEMO]
                </Link>
              )}
              {project.projectLinks.live && (
                <Link href={`https://${project.projectLinks.live}`} className="underline hover:no-underline text-sm">
                  [LIVE]
                </Link>
              )}
              {project.projectLinks.github && (
                <Link href={`https://${project.projectLinks.github}`} className="underline hover:no-underline text-sm">
                  [CODE]
                </Link>
              )}
              <Link href={`/projects/${project.slug}`} className="underline hover:no-underline text-sm font-bold">
                [DETAILS]
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

