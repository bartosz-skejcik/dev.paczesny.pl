import { ScrambleText } from "@/components/scramble-text"
import { MapPin, Building2 } from "lucide-react"
import Image from "next/image"

export function Header() {
  const age = new Date().getFullYear() - 2005
  return (
    <header className="mb-16 space-y-4">
      <h1 className="text-4xl font-bold mb-4 animate-fade-in text-white">
        <Image
          src="https://scontent-waw2-2.xx.fbcdn.net/v/t39.30808-1/468620262_2156225508164077_905264934240468389_n.jpg?stp=c0.0.723.723a_dst-jpg_s200x200_tt6&_nc_cat=103&ccb=1-7&_nc_sid=e99d92&_nc_ohc=ptDQYyuJBp8Q7kNvwF18TeE&_nc_oc=AdmVMJoOQGJZ1FBO3YB3JYLRvGjyTYDWdb-WO4gHBP6VtO-xEdWA7-Fj1Ttk8wWu75w&_nc_zt=24&_nc_ht=scontent-waw2-2.xx&_nc_gid=Ti7V7SBJbiZSsMDyC9VS_A&oh=00_Afdu4N4Ke6Aut6WblvXP9_psc-ZPduly4WvahtrZDbvyxw&oe=68E770A8"
          alt="logo"
          width={48}
          height={48}
          className="inline-block mr-4 rounded-full align-middle"
        />
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
