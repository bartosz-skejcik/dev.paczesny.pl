import Header from "@/components/header"
import ProjectCard from "@/components/project-card"
import { getAllProjects } from "@/lib/projects-data"

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-mono text-sm leading-relaxed">
      {/* Header */}
      <Header />

      <main className="max-w-4xl mx-auto p-4 space-y-8">
        {/* Introduction */}
        <section className="border-2 border-black dark:border-white p-3 sm:p-4">
          <div className="hidden sm:block">
            <pre className="whitespace-pre-wrap text-xs sm:text-sm">
              {`
 ██░ ██ ▓█████  ██▓     ██▓     ▒█████     ▄▄▄█████▓ ██░ ██ ▓█████  ██▀███  ▓█████ 
▓██░ ██▒▓█   ▀ ▓██▒    ▓██▒    ▒██▒  ██▒   ▓  ██▒ ▓▒▓██░ ██▒▓█   ▀ ▓██ ▒ ██▒▓█   ▀ 
▒██▀▀██░▒███   ▒██░    ▒██░    ▒██░  ██▒   ▒ ▓██░ ▒░▒██▀▀██░▒███   ▓██ ░▄█ ▒▒███   
░▓█ ░██ ▒▓█  ▄ ▒██░    ▒██░    ▒██   ██░   ░ ▓██▓ ░ ░▓█ ░██ ▒▓█  ▄ ▒██▀▀█▄  ▒▓█  ▄ 
░▓█▒░██▓░▒████▒░██████▒░██████▒░ ████▓▒░     ▒██▒ ░ ░▓█▒░██▓░▒████▒░██▓ ▒██▒░▒████▒
 ▒ ░░▒░▒░░ ▒░ ░░ ▒░▓  ░░ ▒░▓  ░░ ▒░▒░▒░      ▒ ░░    ▒ ░░▒░▒░░ ▒░ ░░ ▒▓ ░▒▓░░░ ▒░ ░
 ▒ ░▒░ ░ ░ ░  ░░ ░ ▒  ░░ ░ ▒  ░  ░ ▒ ▒░        ░     ▒ ░▒░ ░ ░ ░  ░  ░▒ ░ ▒░ ░ ░  ░
 ░  ░░ ░   ░     ░ ░     ░ ░   ░ ░ ░ ▒       ░       ░  ░░ ░   ░     ░░   ░    ░   
 ░  ░  ░   ░  ░    ░  ░    ░  ░    ░ ░               ░  ░  ░   ░  ░   ░        ░  ░

I'M BARTEK - FULLSTACK DEVELOPER FROM POLAND
`}
            </pre>
          </div>
          <div className="sm:hidden text-center">
            <h2 className="text-2xl font-bold mb-2">HELLO THERE!</h2>
            <p className="text-lg font-bold">I&apos;M BARTEK</p>
            <p className="text-sm">FULLSTACK DEVELOPER FROM POLAND</p>
          </div>
        </section>

        {/* About */}
        <section id="about" className="border border-black dark:border-white p-3 sm:p-4">
          <h2 className="text-xl font-bold mb-4 underline">ABOUT.TXT</h2>
          <div className="space-y-4">
            <p>{">"} Hello there! I&apos;m Bartek, a self-taught fullstack developer from Poland.</p>
            <p>
              {">"} I&apos;m passionate about exploring how things work and creating innovative projects with clean,
              accessible design.
            </p>
            <p>{">"} I emphasize building software that is both functional and user-friendly.</p>
            <p>
              {">"} My interests and expertise span modern web technologies, and I consistently work on projects that
              leverage cutting-edge frameworks and tools.
            </p>
            <p>
              {">"} I am committed to continual learning, high-quality code, and making impactful, user-centric digital
              solutions.
            </p>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="border border-black dark:border-white p-3 sm:p-4">
          <h2 className="text-xl font-bold mb-4 underline">EXPERIENCE.LOG</h2>
          <div className="space-y-2">
            <div className="border-l-4 border-black dark:border-white pl-4">
              <p className="font-bold">CODING EXPERIENCE: 5+ YEARS</p>
              <p>Self-taught journey through modern web development</p>
            </div>
            <div className="border-l-4 border-black dark:border-white pl-4">
              <p className="font-bold">JUNIOR SOFTWARE ENGINEER (2 MONTHS)</p>
              <p>Professional internship experience</p>
            </div>
          </div>
        </section>

        {/* GitHub Contributions */}
        <section className="border border-black dark:border-white p-3 sm:p-4">
          <h2 className="text-xl font-bold mb-4 underline">GITHUB.ACTIVITY</h2>
          <div className="bg-black dark:bg-white text-white dark:text-black p-4 font-mono text-xs">
            <p>{">"} git log --oneline --graph</p>
            <div className="mt-2 space-y-1">
              <p>* a1b2c3d Latest project updates</p>
              <p>* d4e5f6g Refactor authentication system</p>
              <p>* g7h8i9j Add new features to PacGPT</p>
              <p>* j0k1l2m Performance optimizations</p>
              <p>* m3n4o5p Bug fixes and improvements</p>
              <p>{">"} Consistent contributions across multiple repositories</p>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section id="tech" className="border border-black dark:border-white p-3 sm:p-4">
          <h2 className="text-lg sm:text-xl font-bold mb-4 underline">TECH.STACK</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <h3 className="font-bold mb-2">FRONTEND:</h3>
              <ul className="space-y-1 text-sm">
                <li>• Next.js</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• Zustand</li>
                <li>• Framer Motion</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">BACKEND:</h3>
              <ul className="space-y-1 text-sm">
                <li>• Go</li>
                <li>• PHP</li>
                <li>• Node.js</li>
                <li>• Gin Gonic</li>
                <li>• PostgreSQL</li>
                <li>• MySQL</li>
              </ul>
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="font-bold mb-2">TOOLS:</h3>
              <ul className="space-y-1 text-sm">
                <li>• Docker</li>
                <li>• Git</li>
                <li>• Supabase</li>
                <li>• Stripe</li>
                <li>• AI/ML APIs</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="border border-black dark:border-white p-3 sm:p-4">
          <h2 className="text-xl font-bold mb-4 underline">FEATURED.PROJECTS</h2>

          <div className="space-y-6">
            {getAllProjects()
              .slice(0, 3)
              .map((project, index) => (
                <ProjectCard key={project.id} index={index} project={project} isOnHomePage={true} />
              ))}
          </div>

          {/* View All Projects Link */}
          <div className="mt-6 text-center border-t border-black dark:border-white pt-4">
            <a href="/projects" className="underline hover:no-underline text-lg">
              [VIEW ALL PROJECTS →]
            </a>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="border border-black dark:border-white p-3 sm:p-4">
          <h2 className="text-xl font-bold mb-4 underline">CONTACT.INFO</h2>
          <div className="space-y-2">
            <p>{">"} Ready to collaborate? Let&apos;s build something amazing together.</p>
            <div className="mt-4 space-y-2">
              <p>
                EMAIL:{" "}
                <a href="mailto:hello@bartek.dev" className="underline hover:no-underline">
                  hello@bartek.dev
                </a>
              </p>
              <p>
                GITHUB:{" "}
                <a href="https://github.com/bartekdev" className="underline hover:no-underline">
                  github.com/bartekdev
                </a>
              </p>
              <p>
                LINKEDIN:{" "}
                <a href="https://linkedin.com/in/bartekdev" className="underline hover:no-underline">
                  linkedin.com/in/bartekdev
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t-2 border-black dark:border-white pt-4 text-center">
          <p>© 2024 BARTEK.DEV - BUILT WITH PASSION AND CODE</p>
          <p className="text-xs mt-2">LAST UPDATED: {new Date().toLocaleDateString()}</p>
        </footer>
      </main>
    </div>
  )
}
