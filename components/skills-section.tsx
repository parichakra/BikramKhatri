"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Html5, Css3, Javascript, ReactLogo, Nextjs, Tailwind, Typescript, Git, Figma, Redux } from "./skill-icons"

const skillCategories = [
  {
    category: "Frontend",
    skills: [
      { name: "HTML5", icon: Html5, level: 95, color: "text-orange-500" },
      { name: "CSS3", icon: Css3, level: 90, color: "text-blue-500" },
      { name: "JavaScript", icon: Javascript, level: 92, color: "text-yellow-400" },
      { name: "TypeScript", icon: Typescript, level: 85, color: "text-blue-600" },
    ],
  },
  {
    category: "Frameworks",
    skills: [
      { name: "React", icon: ReactLogo, level: 93, color: "text-cyan-400" },
      { name: "Next.js", icon: Nextjs, level: 88, color: "text-foreground" },
      { name: "Tailwind CSS", icon: Tailwind, level: 90, color: "text-cyan-500" },
      { name: "Redux", icon: Redux, level: 80, color: "text-purple-600" },
    ],
  },
  {
    category: "Tools",
    skills: [
      { name: "Git", icon: Git, level: 88, color: "text-orange-600" },
      { name: "Figma", icon: Figma, level: 75, color: "text-pink-500" },
    ],
  },
]

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section id="skills" ref={sectionRef} className="section-padding bg-background">
      <div className="container mx-auto container-padding">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <span className="mb-3 inline-block rounded-full bg-accent/10 px-4 py-1 text-sm font-medium text-accent">
              Skills
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Technologies I work with
            </h2>
          </motion.div>

          <div className="space-y-12">
            {skillCategories.map((cat, catIndex) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 * catIndex }}
              >
                <h3 className="mb-6 text-lg font-semibold text-muted-foreground">{cat.category}</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {cat.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, delay: 0.05 * index + 0.1 * catIndex }}
                      className="rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-md"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`${skill.color}`}>
                            <skill.icon className="h-6 w-6" />
                          </div>
                          <span className="font-medium">{skill.name}</span>
                        </div>
                        <span className="text-sm font-semibold text-accent">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: 0.3 + 0.05 * index, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-accent to-violet-400"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
