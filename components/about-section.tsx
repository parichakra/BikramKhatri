"use client"

import { useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download, MapPin, Mail, Calendar } from "lucide-react"
import { motion, useInView } from "framer-motion"

const stats = [
  { label: "Years Experience", value: "5+" },
  { label: "Projects Completed", value: "40+" },
  { label: "Happy Clients", value: "20+" },
  { label: "Open Source Contributions", value: "15+" },
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section id="about" ref={sectionRef} className="section-padding bg-secondary/30">
      <div className="container mx-auto container-padding">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <span className="mb-3 inline-block rounded-full bg-accent/10 px-4 py-1 text-sm font-medium text-accent">
              About Me
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Information Technology Engineer
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Image side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center"
            >
              <div className="relative">
                {/* Decorative ring */}
                <div className="absolute -inset-4 rounded-full border-2 border-dashed border-accent/20 animate-float" />
                <div className="relative h-72 w-72 overflow-hidden rounded-full border-4 border-background shadow-2xl sm:h-80 sm:w-80">
                  <Image
                    src="/profile-image.jpg"
                    alt="Bikram Khatri"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 rounded-2xl border border-border bg-background px-4 py-2 shadow-lg">
                  <p className="text-xs text-muted-foreground">Based in</p>
                  <p className="font-semibold">Kathmandu, NEPAL</p>
                </div>
              </div>
            </motion.div>

            {/* Content side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col justify-center"
            >
              <h3 className="mb-4 text-2xl font-bold">
                Software Engineer &amp; Java Developer
              </h3>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                I&apos;m Computer Science enthusiast with a deep passion for programming, 
                software engineering, and related technologies who loves to build secure backends with Spring 
                Boot and Also enjoys Python (Django), JavaScript, and C/C++.Always learning, exploring, and solving problems with code..
              </p>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                When I&apos;m not coding, you can find me exploring new technologies, contributing to
                open-source projects, or sharing my knowledge through blog posts and community events.
              </p>

              {/* Info list */}
              <div className="mb-8 space-y-2">
                {[
                  { icon: MapPin, text: "Kathmandu, Nepal" },
                  { icon: Mail, text: "bikramparichakra@gmail.com" },
                  { icon: Calendar, text: "Available for freelance" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Icon className="h-4 w-4 text-accent" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              <Button asChild className="w-fit rounded-full px-6">
                <a href="/resume.pdf" download>
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-background/50 p-6 text-center backdrop-blur-sm"
              >
                <p className="text-3xl font-bold gradient-text">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
