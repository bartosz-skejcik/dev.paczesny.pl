"use client"

import { SUPPORTED_LANGS } from "@/lib/i18n"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMemo } from "react"

export default function Breadcrumbs() {
  const pathname = usePathname()

  const breadcrumbs = useMemo(() => {
    if (!pathname) return []

    const items = pathname
      .split("/")
      .filter((item) => SUPPORTED_LANGS.includes(item as any) === false)
      .filter(Boolean)

    return items
  }, [pathname])

  return (
    <nav aria-label="Breadcrumbs">
      <ul className="text-md flex items-center">
        {/* Home link */}
        <li className="inline-flex items-center">
          <Link
            className="animation-wiggle text-accent hover:text-accent/70"
            href="/"
          >
            ~
          </Link>
        </li>

        {/* Dynamic breadcrumbs */}
        {breadcrumbs.map((text, i) => {
          const href = "/" + breadcrumbs.slice(0, i + 1).join("/")
          const isLast = i === breadcrumbs.length - 1

          return (
            <li key={`bred-${i}`} className="flex items-center">
              <span className="mx-0.5 inline-flex items-center">/</span>

              <span className="inline-flex items-center">
                {isLast ? (
                  <span aria-current="page">{text}</span>
                ) : (
                  <Link
                    className="animation-wiggle hover:text-accent"
                    href={href}
                  >
                    {text}
                  </Link>
                )}
              </span>
            </li>
          )
        })}

        {/* Ending slash */}
        <li className="mx-0.5 inline-flex items-center" aria-hidden="true">
          /
        </li>

        {/* Blinking cursor */}
        <li className="ml-1 inline-flex items-center">
          <span className="cursor-blink bg-accent h-4 w-2" aria-hidden="true" />
        </li>
      </ul>

      <style jsx>{`
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          20% {
            opacity: 0;
          }
        }

        .cursor-blink {
          animation: blink 3s cubic-bezier(0.2, 1, 0.8, 1) infinite;
        }
      `}</style>
    </nav>
  )
}
