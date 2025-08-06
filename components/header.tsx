import Link from "next/link"
import ThemeToggle from "./theme-toggle"

export default function Header() {
  return (
    <header className="border-b border-neutral-300 dark:border-neutral-800 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-xl sm:text-2xl font-bold">
            <Link href="/" className="hover:underline">
              BARTEK.DEV
            </Link>
          </h1>
          <ThemeToggle />
        </div>
        <nav className="flex flex-wrap gap-2 sm:gap-4">
          <Link href="/" className="underline hover:no-underline text-sm sm:text-base">
            HOME
          </Link>
          <Link href="/experience" className="underline hover:no-underline text-sm sm:text-base">
            EXPERIENCE
          </Link>
          <Link href="/education" className="underline hover:no-underline text-sm sm:text-base">
            EDUCATION
          </Link>
          <Link href="/projects" className="underline hover:no-underline text-sm sm:text-base">
            PROJECTS
          </Link>
          <Link href="/#tech" className="underline hover:no-underline text-sm sm:text-base">
            TECH
          </Link>
          <Link href="/#contact" className="underline hover:no-underline text-sm sm:text-base">
            CONTACT
          </Link>
        </nav>
      </div>
    </header>
  )
}

