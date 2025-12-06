"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import type { MDXFileData } from "@/lib/blog"
import { PostItem, buildPostDomId } from "./post-item"
import { SUPPORTED_LANGS, type SupportedLang } from "@/lib/i18n"

type PostsProps = {
  posts: MDXFileData[]
}

export function PostsList({ posts }: PostsProps) {
  const [isSearching, setIsSearching] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [preferredLang, setPreferredLang] = useState<SupportedLang | null>(null)
  const router = useRouter()
  const selectedItemRef = useRef<HTMLDivElement>(null)

  const normalizedQuery = searchQuery.trim().toLowerCase()

  const filteredPosts = posts.filter((item) => {
    if (!normalizedQuery) {
      return true
    }

    const searchable = new Set<string>()
    const addMetadata = (meta?: MDXFileData["metadata"]) => {
      if (!meta) {
        return
      }
      searchable.add(meta.title)
      searchable.add(meta.description)
    }

    if (preferredLang && item.localizedMetadata?.[preferredLang]) {
      addMetadata(item.localizedMetadata[preferredLang])
    }

    addMetadata(item.metadata)

    if (item.localizedMetadata) {
      Object.entries(item.localizedMetadata).forEach(([lang, localized]) => {
        if (!localized) {
          return
        }
        if (preferredLang && lang === preferredLang) {
          return
        }
        addMetadata(localized)
      })
    }

    searchable.add(item.slug)
    searchable.add(item.slug.replace(/[-_]/g, " "))

    for (const value of searchable) {
      if (value.toLowerCase().includes(normalizedQuery)) {
        return true
      }
    }

    return false
  })
  const searchResultsId = "post-search-results"
  const searchResultsSummaryId = "post-search-results-summary"

  useEffect(() => {
    setSelectedIndex(0)
  }, [searchQuery])

  const scrollSelectedIntoView = () => {
    if (selectedItemRef.current) {
      selectedItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }
  }

  useEffect(() => {
    const stored = localStorage.getItem("preferredLang") as SupportedLang | null
    if (stored && SUPPORTED_LANGS.includes(stored)) {
      setPreferredLang(stored)
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== "preferredLang") {
        return
      }
      const next = (event.newValue as SupportedLang | null) ?? null
      if (next && SUPPORTED_LANGS.includes(next)) {
        setPreferredLang(next)
      } else {
        setPreferredLang(null)
      }
    }

    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !isSearching) {
        e.preventDefault()
        setIsSearching(true)
      } else if (e.key === "Escape" && isSearching) {
        setIsSearching(false)
        setSearchQuery("")
        document.activeElement instanceof HTMLElement &&
          document.activeElement.blur()
      } else if (
        isSearching &&
        (((e.ctrlKey || e.metaKey) && (e.key === "j" || e.key === "k")) ||
          e.key === "ArrowDown" ||
          e.key === "ArrowUp")
      ) {
        e.preventDefault()
        setSelectedIndex((prev) => {
          const isDownward =
            e.key === "ArrowDown" || ((e.ctrlKey || e.metaKey) && e.key === "j")

          const newIndex = isDownward
            ? prev < filteredPosts.length - 1
              ? prev + 1
              : prev
            : prev > 0
            ? prev - 1
            : prev

          scrollSelectedIntoView()
          return newIndex
        })
      } else if (isSearching && e.key === "Enter" && filteredPosts.length > 0) {
        const target = filteredPosts[selectedIndex]
        const resolvedLang =
          preferredLang && target.availableLangs?.includes(preferredLang)
            ? preferredLang
            : target.lang
        router.push(`/blog/${resolvedLang}/${target.slug}`)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isSearching, filteredPosts, selectedIndex, router, preferredLang])

  return (
    <>
      {isSearching && (
        <div className="fixed bottom-4 left-4 right-4 mx-auto max-w-2xl border border-neutral-800 bg-black/50 p-2 backdrop-blur-sm">
          <div className="flex items-center text-neutral-400">
            <span className="mr-2 text-accent" aria-hidden="true">
              /
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none"
              autoFocus
              placeholder="search posts..."
              aria-label="Search posts"
              aria-describedby={searchResultsSummaryId}
              role="searchbox"
              aria-expanded={filteredPosts.length > 0}
              aria-controls={searchResultsId}
              aria-activedescendant={
                isSearching && filteredPosts.length > 0
                  ? buildPostDomId(filteredPosts[selectedIndex])
                  : undefined
              }
            />
          </div>
        </div>
      )}

      <p id={searchResultsSummaryId} className="sr-only" aria-live="polite">
        {`${filteredPosts.length} ${
          filteredPosts.length === 1 ? "result" : "results"
        } available`}
      </p>

      <div
        id={searchResultsId}
        role={isSearching ? "listbox" : undefined}
        aria-label="Blog posts"
        className="space-y-8 sm:space-y-4"
      >
        {filteredPosts.map((item, index) => (
          <div
            key={`${item.slug}-${item.lang}`}
            ref={
              isSearching && index === selectedIndex ? selectedItemRef : null
            }
          >
            <PostItem
              post={item}
              isSelected={isSearching && index === selectedIndex}
              preferredLang={preferredLang}
              searchContext={isSearching}
            />
          </div>
        ))}
      </div>
    </>
  )
}
