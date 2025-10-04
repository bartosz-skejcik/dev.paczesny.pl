import React from "react"

type EducationItem = {
  period?: string
  title?: string
  subtitle?: string
  institution: string
  date?: string
  exam?: string
  code?: string
  practice?: string
  theory?: string
  skills?: string[]
}

const items: EducationItem[] = [
  {
    period: "oct 2024 — present",
    title: "computer science • engineering",
    institution: "vistula university",
  },
  {
    date: "26 march 2024",
    exam: "IT proffesion exam",
    code: "INF. 03",
    institution: "Zespół Szkół nr 14, Warsaw",
    practice: "practice 98%",
    theory: "theory 96%",
  },
  {
    date: "01 june 2022",
    exam: "IT proffesion exam",
    code: "INF. 02",
    institution: "Zespół Szkół nr 14, Warsaw",
    practice: "practice 100%",
    theory: "theory 86%",
  },
  {
    period: "sep 2019 — apr 2024",
    title: "high school",
    subtitle: "IT • technician",
    institution: "Zespół Szkół nr 14, Warsaw",
  },
]

export function EducationSection() {
  return (
    <section className="mb-16 animate-fade-in-up">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-white">
        <span className="text-accent mr-2">*</span> education
      </h2>

      <div className="space-y-8">
        {items.map((it, idx) => {
          const isExam = Boolean(it.exam)
          return (
            <div key={idx} className="group">
              {isExam ? (
                <div>
                  <p className="text-sm text-neutral-400 mb-2">{it.date}</p>
                  <h3 className="text-xl font-semibold mb-1 text-white">
                    {it.exam}
                    {" • "}
                    {it.code}
                  </h3>
                  <p className="text-neutral-300">
                    {it.institution}
                    {(it.practice || it.theory) && (
                      <span className="block mt-2 text-sm text-neutral-400">
                        {it.practice && (
                          <span className="mr-4">{it.practice}</span>
                        )}
                        {it.theory && <span>{it.theory}</span>}
                      </span>
                    )}
                  </p>
                </div>
              ) : (
                // regular study item
                <div className="flex flex-col md:flex-row md:justify-between">
                  <div>
                    {it.period && (
                      <div className="text-neutral-400 text-sm mb-1">
                        {it.period}
                      </div>
                    )}
                    {it.title && (
                      <h3 className="text-xl font-semibold mb-1 text-white">
                        {it.title}
                      </h3>
                    )}
                    {it.subtitle && (
                      <p className="text-sm text-neutral-300 mb-1">
                        {it.subtitle}
                      </p>
                    )}
                    <p className="text-neutral-300">{it.institution}</p>
                    {it.skills && (
                      <ul className="flex flex-wrap gap-2 mt-2 text-sm text-neutral-400">
                        {it.skills.map((s) => (
                          <li
                            key={s}
                            className="px-2 py-1 bg-neutral-800 rounded"
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="mt-4 md:mt-0 text-sm text-neutral-400 md:text-right">
                    {it.date && <div>{it.date}</div>}
                    {it.code && <div className="mt-1">{it.code}</div>}
                    {it.practice && <div className="mt-1">{it.practice}</div>}
                    {it.theory && <div>{it.theory}</div>}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default EducationSection
