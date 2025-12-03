"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { SUPPORTED_LANGS, type SupportedLang } from "@/lib/i18n"

type LanguageSwitcherProps = {
  slug: string
  currentLang: SupportedLang
  availableLangs: SupportedLang[]
}

export function LanguageSwitcher({
  slug,
  currentLang,
  availableLangs,
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const toggle = () => setIsOpen((prev) => !prev)
  const close = () => setIsOpen(false)
  const handleFocusExit = (event: {
    relatedTarget: EventTarget | null
    currentTarget: EventTarget & Node
  }) => {
    const nextTarget = event.relatedTarget as Node | null
    if (!nextTarget || !event.currentTarget.contains(nextTarget)) {
      close()
    }
  }

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        close()
      }
    }

    window.addEventListener("pointerdown", handlePointerDown)
    return () => window.removeEventListener("pointerdown", handlePointerDown)
  }, [isOpen])

  return (
    <div
      ref={containerRef}
      className="relative inline-flex"
      onBlur={handleFocusExit}
    >
      <button
        type="button"
        onClick={toggle}
        className="flex items-center gap-2 rounded-full border border-neutral-800 px-3 py-1 text-sm text-neutral-200 hover:border-neutral-600"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span>{currentLang.toUpperCase()}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <nav
          className="absolute right-0 top-full mt-1 z-20 w-44 rounded-xl border border-neutral-800 bg-black/80 backdrop-blur"
          aria-label="Language selector"
        >
          <ul className="p-2">
            {SUPPORTED_LANGS.map((lang) => {
              const isActive = lang === currentLang
              const isAvailable = availableLangs.includes(lang)
              const baseClasses =
                "flex items-center justify-between rounded-lg px-3 py-2 text-sm"

              if (!isAvailable) {
                return (
                  <li key={lang} className="opacity-40">
                    <span className={`${baseClasses} cursor-not-allowed`}>
                      {lang.toUpperCase()}
                      <span className="text-xs">soon</span>
                    </span>
                  </li>
                )
              }

              return (
                <li key={lang}>
                  <Link
                    href={`/blog/${lang}/${slug}`}
                    onClick={close}
                    className={`${baseClasses} ${
                      isActive
                        ? "bg-neutral-800 text-white"
                        : "text-neutral-300 hover:bg-neutral-900"
                    }`}
                  >
                    <span>{lang.toUpperCase()}</span>
                    {isActive && (
                      <span className="text-xs text-accent">now</span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      )}
    </div>
  )
}
