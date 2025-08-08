"use client"

import { useTheme } from "next-themes"


export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else if (theme === "dark") {
      setTheme("system")
    } else {
      setTheme("light")
    }
  }

  const getButtonText = () => {
    switch (theme) {
      case "light":
        return "LIGHT_MODE"
      case "dark":
        return "DARK_MODE"
      case "system":
        return `SYSTEM_MODE(${theme.toUpperCase()})`
      default:
        return "THEME"
    }
  }

  const getNextTheme = () => {
    switch (theme) {
      case "light":
        return "DARK"
      case "dark":
        return "SYSTEM"
      case "system":
        return "LIGHT"
      default:
        return "NEXT"
    }
  }

  return (
    <button
      onClick={cycleTheme}
      className="border border-neutral-900 dark:border-neutral-200 px-2 py-1 text-xs font-mono hover:bg-neutral-900 hover:text-neutral-200 dark:hover:bg-neutral-200 dark:hover:text-neutral-900 transition-colors"
      aria-label={`Switch to ${getNextTheme().toLowerCase()} mode`}
      title={`Current: ${getButtonText()} | Click for ${getNextTheme()}`}
    >
      [{getButtonText()}]
    </button>
  )
}

