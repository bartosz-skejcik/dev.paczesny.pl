"use client"

import { Check, Copy } from "lucide-react"
import { useState } from "react"

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 p-2 rounded-md bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 transition-all duration-200 opacity-0 group-hover:opacity-100"
      aria-label="Copy code to clipboard"
    >
      {copied ? (
        <Check className="w-4 h-4 text-accent animate-in fade-in zoom-in duration-200" />
      ) : (
        <Copy className="w-4 h-4 text-neutral-400 hover:text-neutral-200 transition-colors duration-200" />
      )}
    </button>
  )
}
