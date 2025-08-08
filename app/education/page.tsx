import Header from "@/components/header"
import Link from "next/link"

export default function Education() {
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
▓█████ ▓█████▄  █    ██  ▄████▄   ▄▄▄     ▄▄▄█████▓ ██▓ ▒█████   ███▄    █
▓█   ▀ ▒██▀ ██▌ ██  ▓██▒▒██▀ ▀█  ▒████▄   ▓  ██▒ ▓▒▓██▒▒██▒  ██▒ ██ ▀█   █
▒███   ░██   █▌▓██  ▒██░▒▓█    ▄ ▒██  ▀█▄ ▒ ▓██░ ▒░▒██▒▒██░  ██▒▓██  ▀█ ██▒
▒▓█  ▄ ░▓█▄   ▌▓▓█  ░██░▒▓▓▄ ▄██▒░██▄▄▄▄██░ ▓██▓ ░ ░██░▒██   ██░▓██▒  ▐▌██▒
░▒████▒░▒████▓ ▒▒█████▓ ▒ ▓███▀ ░ ▓█   ▓██▒ ▒██▒ ░ ░██░░ ████▓▒░▒██░   ▓██░
░░ ▒░ ░ ▒▒▓  ▒ ░▒▓▒ ▒ ▒ ░ ░▒ ▒  ░ ▒▒   ▓▒█░ ▒ ░░   ░▓  ░ ▒░▒░▒░ ░ ▒░   ▒ ▒
 ░ ░  ░ ░ ▒  ▒ ░░▒░ ░ ░   ░  ▒     ▒   ▒▒ ░   ░     ▒ ░  ░ ▒ ▒░ ░ ░░   ░ ▒░
   ░    ░ ░  ░  ░░░ ░ ░ ░          ░   ▒    ░       ▒ ░░ ░ ░ ▒     ░   ░ ░
   ░  ░   ░       ░     ░ ░            ░  ░         ░      ░ ░           ░
        ░               ░
`}
            </pre>
          </div>
          <div className="sm:hidden text-center">
            <h1 className="text-2xl font-bold mb-2">EDUCATION</h1>
            <p className="text-sm">SELF-DIRECTED LEARNING</p>
          </div>
        </section>

        {/* Self-Taught Education */}
        <section className="border border-neutral-900 dark:border-neutral-200 p-4">
          <h2 className="text-xl font-bold mb-4 underline">SELF.DIRECTED.LEARNING</h2>

          <div className="space-y-6">
            {/* Primary Education Path */}
            <div className="border-l-4 border-neutral-900 dark:border-neutral-200 pl-4">
              <div className="bg-neutral-900 dark:bg-neutral-200 text-neutral-200 dark:text-neutral-900 p-2 mb-2">
                <p className="font-bold">AUTODIDACTIC PROGRAMMING EDUCATION</p>
                <p className="text-xs">DURATION: 2019 - PRESENT | METHOD: SELF-TAUGHT</p>
              </div>
              <div className="space-y-2">
                <p>{">"} Comprehensive self-directed learning in computer science and software engineering</p>
                <p>{">"} Mastered multiple programming languages and frameworks through practice</p>
                <p>{">"} Built real-world projects to solidify theoretical knowledge</p>
                <p>{">"} Continuously updated skills with emerging technologies</p>
              </div>
            </div>

            {/* Learning Resources */}
            <div className="border-l-4 border-neutral-900 dark:border-neutral-200 pl-4">
              <div className="bg-neutral-900 dark:bg-neutral-200 text-neutral-200 dark:text-neutral-900 p-2 mb-2">
                <p className="font-bold">LEARNING RESOURCES & METHODOLOGIES</p>
                <p className="text-xs">APPROACH: PRACTICAL + THEORETICAL</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold mb-2">ONLINE RESOURCES:</h4>
                  <ul className="space-y-1 text-xs">
                    <li>• Official documentation deep-dives</li>
                    <li>• Open-source project contributions</li>
                    <li>• Technical blogs and articles</li>
                    <li>• Video tutorials and courses</li>
                    <li>• Developer communities and forums</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-2">PRACTICAL LEARNING:</h4>
                  <ul className="space-y-1 text-xs">
                    <li>• Building production applications</li>
                    <li>• Code challenges and algorithms</li>
                    <li>• Reverse engineering existing solutions</li>
                    <li>• Experimenting with new technologies</li>
                    <li>• Teaching others through code examples</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Knowledge Areas */}
        <section className="border border-neutral-900 dark:border-neutral-200 p-3 sm:p-4">
          <h2 className="text-lg sm:text-xl font-bold mb-4 underline">KNOWLEDGE.DOMAINS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="border border-neutral-900 dark:border-neutral-200 p-2 sm:p-3">
              <h3 className="font-bold mb-2 text-sm">COMPUTER SCIENCE FUNDAMENTALS:</h3>
              <ul className="space-y-1 text-xs">
                <li>• Data structures and algorithms</li>
                <li>• Object-oriented programming</li>
                <li>• Functional programming concepts</li>
                <li>• Database design and optimization</li>
                <li>• System architecture patterns</li>
                <li>• API design and RESTful services</li>
              </ul>
            </div>
            <div className="border border-neutral-900 dark:border-neutral-200 p-2 sm:p-3">
              <h3 className="font-bold mb-2 text-sm">MODERN DEVELOPMENT PRACTICES:</h3>
              <ul className="space-y-1 text-xs">
                <li>• Version control (Git workflows)</li>
                <li>• Test-driven development</li>
                <li>• Continuous integration/deployment</li>
                <li>• Code review and collaboration</li>
                <li>• Performance optimization</li>
                <li>• Security best practices</li>
              </ul>
            </div>
            <div className="border border-neutral-900 dark:border-neutral-200 p-2 sm:p-3">
              <h3 className="font-bold mb-2 text-sm">WEB TECHNOLOGIES:</h3>
              <ul className="space-y-1 text-xs">
                <li>• Frontend frameworks (React, Next.js)</li>
                <li>• Backend development (Node.js, Go, PHP)</li>
                <li>• Database systems (PostgreSQL, MySQL)</li>
                <li>• Cloud services and deployment</li>
                <li>• DevOps and containerization</li>
                <li>• Progressive Web Apps</li>
              </ul>
            </div>
            <div className="border border-neutral-900 dark:border-neutral-200 p-2 sm:p-3">
              <h3 className="font-bold mb-2 text-sm">EMERGING TECHNOLOGIES:</h3>
              <ul className="space-y-1 text-xs">
                <li>• AI/ML integration in web apps</li>
                <li>• Serverless architecture</li>
                <li>• Microservices design</li>
                <li>• Real-time applications</li>
                <li>• Mobile-first development</li>
                <li>• Accessibility and inclusive design</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Learning Philosophy */}
        <section className="border border-neutral-900 dark:border-neutral-200 p-4">
          <h2 className="text-xl font-bold mb-4 underline">LEARNING.PHILOSOPHY</h2>
          <div className="bg-neutral-900 dark:bg-neutral-200 text-neutral-200 dark:text-neutral-900 p-4">
            <p className="mb-2">{">"} &quot;The best way to learn is by doing.&quot;</p>
            <div className="space-y-2 text-xs">
              <p>• Every project is a learning opportunity</p>
              <p>• Embrace failure as a stepping stone to mastery</p>
              <p>• Stay curious and question everything</p>
              <p>• Share knowledge to reinforce understanding</p>
              <p>• Adapt quickly to new technologies and paradigms</p>
              <p>• Focus on solving real problems, not just learning syntax</p>
            </div>
          </div>
        </section>

        {/* Back to Home */}
        <section className="border border-neutral-900 dark:border-neutral-200 p-4 text-center">
          <Link href="/" className="underline hover:no-underline text-lg">
            [RETURN TO MAIN DIRECTORY]
          </Link>
        </section>
      </main>
    </div>
  )
}
