import { ScrambleText } from "@/components/scramble-text"
import { MapPin, Building2 } from "lucide-react"

export function Header() {
  const age = new Date().getFullYear() - 2005
  return (
    <header className="mb-16 space-y-4">
      <h1 className="text-4xl font-bold mb-4 animate-fade-in text-white">
        <span className="inline-block">
          <ScrambleText text="bartek paczesny" />
        </span>
      </h1>
      <div className="flex flex-col gap-2 text-neutral-400">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          warsaw, poland
        </div>
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4" />
          IT Specialist @ MGW
        </div>
      </div>
      <p className="leading-relaxed animate-fade-in-up">
        i&apos;m a {age} y/o cs undergrad student. i love building things and
        solving problems. i enjoy language design, theoretical computer science
        and i live on the terminal. if i&apos;m not coding, i&apos;m probably
        playing football, reading the wither series or skateboarding.
      </p>
    </header>
  )
}
