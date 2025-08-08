import Header from "@/components/header"
import Link from "next/link"

export default function Experience() {
  return (
    <div className="min-h-screen bg-neutral-200 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200 font-mono text-sm leading-relaxed">
      {/* Header */}
      <Header />

      <main className="max-w-4xl mx-auto p-4 space-y-8">
        {/* Page Title */}
        <section className="border-2 border-neutral-900 dark:border-neutral-200 p-3 sm:p-4">
          <div className="hidden sm:block">
            <pre className="whitespace-pre-wrap text-xs sm:text-sm">
              {`
▓█████ ▒██   ██▒ ██▓███  ▓█████  ██▀███   ██▓▓█████  ███▄    █  ▄████▄  ▓█████
▓█   ▀ ▒▒ █ █ ▒░▓██░  ██▒▓█   ▀ ▓██ ▒ ██▒▓██▒▓█   ▀  ██ ▀█   █ ▒██▀ ▀█  ▓█   ▀
▒███   ░░  █   ░▓██░ ██▓▒▒███   ▓██ ░▄█ ▒▒██▒▒███   ▓██  ▀█ ██▒▒▓█    ▄ ▒███
▒▓█  ▄  ░ █ █ ▒ ▒██▄█▓▒ ▒▒▓█  ▄ ▒██▀▀█▄  ░██░▒▓█  ▄ ▓██▒  ▐▌██▒▒▓▓▄ ▄██▒▒▓█  ▄
░▒████▒▒██▒ ▒██▒▒██▒ ░  ░░▒████▒░██▓ ▒██▒░██░░▒████▒▒██░   ▓██░▒ ▓███▀ ░░▒████▒
░░ ▒░ ░▒▒ ░ ░▓ ░▒▓▒░ ░  ░░░ ▒░ ░░ ▒▓ ░▒▓░░▓  ░░ ▒░ ░░ ▒░   ▒ ▒ ░ ░▒ ▒  ░░░ ▒░ ░
 ░ ░  ░░░   ░▒ ░░▒ ░      ░ ░  ░  ░▒ ░ ▒░ ▒ ░ ░ ░  ░░ ░░   ░ ▒░  ░  ▒    ░ ░  ░
   ░    ░    ░  ░░          ░     ░░   ░  ▒ ░   ░      ░   ░ ░ ░         ░
   ░  ░ ░    ░              ░  ░   ░      ░     ░  ░         ░ ░ ░       ░  ░
`}
            </pre>
          </div>
          <div className="sm:hidden text-center">
            <h1 className="text-2xl font-bold mb-2">EXPERIENCE</h1>
            <p className="text-sm">PROFESSIONAL JOURNEY</p>
          </div>
        </section>

        {/* Professional Experience */}
        <section className="border border-neutral-900 dark:border-neutral-200 p-3 sm:p-4">
          <h2 className="text-xl font-bold mb-4 underline">PROFESSIONAL.EXPERIENCE</h2>

          <div className="space-y-6">
            {/* Junior Software Engineer */}
            <div className="border-l-4 border-neutral-900 dark:border-neutral-200 pl-4">
              <div className="bg-neutral-900 dark:bg-neutral-200 text-neutral-200 dark:text-neutral-900 p-2 mb-2">
                <p className="font-bold">JUNIOR SOFTWARE ENGINEER</p>
                <p className="text-xs">DURATION: 2 MONTHS | TYPE: INTERNSHIP</p>
              </div>
              <div className="space-y-2">
                <p>{">"} Gained hands-on experience in professional software development environment</p>
                <p>{">"} Collaborated with senior developers on real-world projects</p>
                <p>{">"} Learned industry best practices and development workflows</p>
                <p>{">"} Contributed to codebase improvements and bug fixes</p>
                <p>{">"} Participated in code reviews and team meetings</p>
              </div>
              <div className="mt-2 text-xs">
                <p>SKILLS DEVELOPED: Team collaboration | Code review | Professional workflows | Industry standards</p>
              </div>
            </div>

            {/* Self-Taught Journey */}
            <div className="border-l-4 border-neutral-900 dark:border-neutral-200 pl-4">
              <div className="bg-neutral-900 dark:bg-neutral-200 text-neutral-200 dark:text-neutral-900 p-2 mb-2">
                <p className="font-bold">SELF-TAUGHT DEVELOPER</p>
                <p className="text-xs">DURATION: 5+ YEARS | TYPE: CONTINUOUS LEARNING</p>
              </div>
              <div className="space-y-2">
                <p>{">"} Independently mastered fullstack web development</p>
                <p>{">"} Built and deployed multiple production-ready applications</p>
                <p>{">"} Continuously learning new technologies and frameworks</p>
                <p>{">"} Created award-winning community management system (mOsiedle)</p>
                <p>{">"} Developed AI-powered applications and SaaS products</p>
              </div>
              <div className="mt-2 text-xs">
                <p>ACHIEVEMENTS: Award-winning project | Multiple deployed applications | Self-directed learning</p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Timeline */}
        <section className="border border-neutral-900 dark:border-neutral-200 p-3 sm:p-4">
          <h2 className="text-xl font-bold mb-4 underline">SKILLS.TIMELINE</h2>
          <div className="bg-neutral-900 dark:bg-neutral-200 text-neutral-200 dark:text-neutral-900 p-4 font-mono text-xs">
            <p>{">"} git log --oneline --reverse --skills</p>
            <div className="mt-2 space-y-1">
              <p>* 2019-01 Started with HTML/CSS fundamentals</p>
              <p>* 2019-06 Learned JavaScript and DOM manipulation</p>
              <p>* 2020-01 Mastered PHP and MySQL for backend development</p>
              <p>* 2020-08 Adopted modern CSS frameworks (Tailwind CSS)</p>
              <p>* 2021-03 Transitioned to TypeScript and modern frameworks</p>
              <p>* 2021-09 Deep dive into React and Next.js ecosystem</p>
              <p>* 2022-02 Explored Go for high-performance backend services</p>
              <p>* 2022-10 Integrated AI/ML APIs into web applications</p>
              <p>* 2023-05 Professional internship experience</p>
              <p>* 2024-01 Advanced state management and architecture patterns</p>
            </div>
          </div>
        </section>

        {/* Back to Home */}
        <section className="border border-neutral-900 dark:border-neutral-200 p-3 sm:p-4 text-center">
          <Link href="/" className="underline hover:no-underline text-lg">
            [RETURN TO MAIN DIRECTORY]
          </Link>
        </section>
      </main>
    </div>
  )
}
