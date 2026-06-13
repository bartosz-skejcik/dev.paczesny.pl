"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { HelpCircle, Keyboard } from "lucide-react"
import { Toaster, toast } from "sonner"

const STORAGE_KEY = "shortcut-intro-seen"

type Shortcut = {
  keys: string[]
  action: string
}

type ShortcutGroup = {
  title: string
  scope: string
  shortcuts: Shortcut[]
}

const shortcutGroups: ShortcutGroup[] = [
  {
    title: "Global navigation",
    scope: "Available anywhere on the site",
    shortcuts: [
      { keys: ["h"], action: "Go to the home page" },
      { keys: ["b"], action: "Open the blog" },
      { keys: ["p"], action: "Visit projects" },
      { keys: ["?"], action: "Open the shortcuts guide" },
    ],
  },
  {
    title: "Blog list",
    scope: "On the blog listing page",
    shortcuts: [
      { keys: ["/"], action: "Open quick search" },
      { keys: ["Escape"], action: "Close search" },
      { keys: ["Ctrl/⌘ + J", "ArrowDown"], action: "Next result" },
      { keys: ["Ctrl/⌘ + K", "ArrowUp"], action: "Previous result" },
      { keys: ["Enter"], action: "Open highlighted post" },
    ],
  },
]

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }
  const tag = target.tagName
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    target.isContentEditable ||
    target.getAttribute("role") === "textbox"
  )
}

function KeyBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded border border-neutral-800 bg-neutral-900 px-2 py-1 text-xs font-medium text-neutral-200 shadow-sm">
      {label}
    </span>
  )
}

function ShortcutToastCard({
  id,
  onOpenModal,
}: {
  id: string | number
  onOpenModal: () => void
}) {
  return (
    <div className="pointer-events-auto w-[380px] overflow-hidden border-0.5 border-neutral-900 bg-gradient-to-br from-[#0d0d0d] via-[#0a0a0a] to-[#0f0f0f] shadow-[0_18px_45px_rgba(0,0,0,0.55)]">
      <div className="flex items-start gap-3 p-3">
        <span
          className="mt-1 h-2 w-2 rounded-full bg-accent shadow-[0_0_0_6px_rgba(225,113,0,0.18)]"
          aria-hidden="true"
        />
        <div className="space-y-2">
          <p className="text-sm font-semibold text-neutral-50">
            Keyboard shortcuts
          </p>
          <p className="text-xs leading-relaxed text-neutral-400">
            You can navigate the website with keyboard shortcuts. Try these:
          </p>
          <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
            <KeyBadge label="h" />
            <KeyBadge label="b" />
            <KeyBadge label="p" />
            <KeyBadge label="/" />
            <KeyBadge label="Ctrl/⌘ + J" />
            <KeyBadge label="Ctrl/⌘ + K" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 border-t border-neutral-800/60 bg-neutral-950/70 px-3 py-2">
        <button
          onClick={() => toast.dismiss(id)}
          className="rounded border border-neutral-800 px-3 py-1 text-xs font-medium text-neutral-300 transition hover:border-neutral-600 hover:text-neutral-50"
        >
          Dismiss
        </button>
        <button
          onClick={() => {
            onOpenModal()
            toast.dismiss(id)
          }}
          className="rounded bg-accent px-3 py-1 text-xs font-semibold text-black transition hover:brightness-110"
        >
          See all shortcuts
        </button>
      </div>
    </div>
  )
}

export function ShortcutGuide() {
  const [mounted, setMounted] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const openModal = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  const showIntroToast = useCallback(() => {
    toast.custom(
      (id) => <ShortcutToastCard id={id} onOpenModal={openModal} />,
      {
        position: "bottom-right",
        duration: 15000,
      }
    )
  }, [openModal])

  useEffect(() => {
    if (!mounted) return

    const hasSeen = localStorage.getItem(STORAGE_KEY)
    if (hasSeen) return

    showIntroToast()

    localStorage.setItem(STORAGE_KEY, "1")
  }, [mounted, showIntroToast])

  useEffect(() => {
    if (!mounted) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isTypingTarget(event.target)) {
        return
      }

      const isQuestionMark =
        event.key === "?" || (event.key === "/" && event.shiftKey)
      if (isQuestionMark) {
        event.preventDefault()
        openModal()
      }

      if (event.key === "Escape" && isModalOpen) {
        event.preventDefault()
        closeModal()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [mounted, isModalOpen, openModal, closeModal])

  useEffect(() => {
    if (!isModalOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const focusTimeout = window.setTimeout(() => {
      closeButtonRef.current?.focus()
    }, 50)

    return () => {
      document.body.style.overflow = previousOverflow
      window.clearTimeout(focusTimeout)
    }
  }, [isModalOpen])

  const groupedShortcuts = useMemo(() => shortcutGroups, [])

  return (
    <>
      <Toaster
        position="bottom-right"
        theme="dark"
        toastOptions={{
          classNames: {
            toast:
              "w-full max-w-[400px] rounded-md border border-neutral-800 bg-[#0b0b0b] text-neutral-100 shadow-[0_18px_45px_rgba(0,0,0,0.55)] backdrop-blur",
            title: "text-sm font-semibold text-neutral-50",
            description: "text-xs text-neutral-400 leading-relaxed",
            actionButton:
              "rounded bg-accent px-3 py-1.5 text-xs font-semibold text-black transition hover:brightness-110",
            closeButton: "text-neutral-500 hover:text-neutral-200 transition",
          },
        }}
      />

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 py-8"
          role="dialog"
          aria-modal="true"
          aria-label="Keyboard shortcuts guide"
        >
          <div className="relative w-full max-w-3xl overflow-hidden rounded-lg border border-neutral-800 bg-[#0d0d0d] shadow-[0_18px_55px_rgba(0,0,0,0.65)]">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-800/80 px-5 py-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-accent">
                  <Keyboard size={18} aria-hidden="true" />
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-neutral-500">
                    Keyboard shortcuts
                  </p>
                  <h2 className="text-lg font-semibold text-neutral-50">
                    Navigate faster
                  </h2>
                  <p className="text-sm text-neutral-400">
                    Press ? anytime to reopen this panel.
                  </p>
                </div>
              </div>
              <button
                ref={closeButtonRef}
                onClick={closeModal}
                className="flex items-center gap-2 rounded border border-neutral-800 px-3 py-2 text-sm text-neutral-200 transition hover:border-neutral-700 hover:text-neutral-50"
                aria-label="Close shortcuts guide"
              >
                <HelpCircle size={16} aria-hidden="true" />
                Close
              </button>
            </div>

            <div className="grid max-h-[70vh] gap-3 overflow-auto px-5 py-4 md:grid-cols-2">
              {groupedShortcuts.map((group) => (
                <div
                  key={group.title}
                  className="rounded-md border border-neutral-800 bg-neutral-900/70 p-4"
                >
                  <div className="mb-3 space-y-1">
                    <p className="text-[11px] uppercase tracking-[0.12em] text-neutral-500">
                      {group.scope}
                    </p>
                    <h3 className="text-base font-semibold text-neutral-50">
                      {group.title}
                    </h3>
                  </div>
                  <ul className="space-y-2.5">
                    {group.shortcuts.map((shortcut) => (
                      <li
                        key={shortcut.action}
                        className="flex items-start justify-between gap-3"
                      >
                        <span className="text-sm text-neutral-200">
                          {shortcut.action}
                        </span>
                        <div className="flex flex-wrap items-center gap-2">
                          {shortcut.keys.map((key) => (
                            <KeyBadge
                              key={`${shortcut.action}-${key}`}
                              label={key}
                            />
                          ))}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-neutral-800/80 bg-neutral-950/60 px-5 py-3 text-xs text-neutral-500">
              <span>Tip: press ? anywhere to see this again.</span>
              <span className="hidden sm:inline">Press Esc to close.</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
