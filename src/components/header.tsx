import { ScrambleText } from "@/components/scramble-text"
import { MapPin, Building2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function Header() {
  const age = new Date().getFullYear() - 2005
  return (
    <header className="mb-16 space-y-4">
      <h1 className="text-4xl font-bold mb-4 animate-fade-in text-white">
        <Image
          src="/profile.jpg"
          alt="Portrait of Bartek Paczesny"
          width={45}
          height={45}
          priority
          sizes="45px"
          className="inline-block mr-4 rounded-full align-middle"
        />
        <span className="inline-block">
          <ScrambleText text="bartek paczesny" />
        </span>
      </h1>
      <div className="flex flex-col gap-2 text-neutral-400">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" aria-hidden="true" focusable="false" />
          warsaw, poland
        </div>
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4" aria-hidden="true" focusable="false" />
          IT Specialist @ MGW
        </div>
      </div>
      <p className="leading-relaxed animate-fade-in-up">
        i&apos;m a {age} y/o cs undergrad student. i love building things and
        solving problems. i enjoy language design, theoretical computer science
        and i live on the terminal. if i&apos;m not coding, i&apos;m probably
        playing football, reading the Witcher series or skateboarding.
      </p>
      <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-neutral-500">
        <span>subscribe</span>
        <Link
          href="/feed.xml"
          className="text-neutral-300 hover:text-accent transition-colors duration-200"
        >
          rss
        </Link>
        <span className="text-neutral-600">/</span>
        <Link
          href="/feed.json"
          className="text-neutral-300 hover:text-accent transition-colors duration-200"
        >
          json feed
        </Link>
        <Link href="https://emedics.pl" className="hidden">
          emedics
        </Link>
      </div>
    </header>
  )
}
