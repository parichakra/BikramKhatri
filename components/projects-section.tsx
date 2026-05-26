"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

const allProjects = [
  {
    id: 1,
    title: "E-Commerce Dashboard",
    description:
      "A comprehensive dashboard for e-commerce businesses with analytics, inventory management, and order processing.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "Next.js", "Tailwind CSS", "Chart.js"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
    category: "Web App",
    featured: true,
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A productivity app for managing tasks, projects, and team collaboration with real-time updates.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "Firebase", "Tailwind CSS", "TypeScript"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
    category: "Web App",
    featured: true,
  },
  {
    id: 3,
    title: "Travel Blog Platform",
    description:
      "A content management system for travel bloggers with rich text editing, image galleries, and SEO tools.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Next.js", "Sanity CMS", "Tailwind CSS", "Vercel"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
    category: "CMS",
    featured: false,
  },
  {
    id: 4,
    title: "Fitness Tracking App",
    description:
      "A mobile-first web application for tracking workouts, nutrition, and fitness progress with data visualization.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
    category: "Web App",
    featured: false,
  },
  {
    id: 5,
    title: "Weather Dashboard",
    description: "A real-time weather dashboard with forecasts, historical data, and location-based weather alerts.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "OpenWeather API", "Chart.js", "Geolocation"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
    category: "Dashboard",
    featured: false,
  },
  {
    id: 6,
    title: "Recipe Sharing Platform",
    description:
      "A community-driven platform for sharing, discovering, and saving recipes with user ratings and comments.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Next.js", "Supabase", "Tailwind CSS", "Authentication"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
    category: "Web App",
    featured: true,
  },
]

const categories = ["All", ...Array.from(new Set(allProjects.map((p) => p.category)))]

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const [activeCategory, setActiveCategory] = useState("All")

  const filtered =
    activeCategory === "All" ? allProjects : allProjects.filter((p) => p.category === activeCategory)

  return (
    <section id="projects" ref={sectionRef} className="section-padding bg-secondary/30">
      <div className="container mx-auto container-padding">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <span className="mb-3 inline-block rounded-full bg-accent/10 px-4 py-1 text-sm font-medium text-accent">
              Projects
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Things I&apos;ve built
            </h2>
          </motion.div>

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-8 flex flex-wrap justify-center gap-2"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : "border border-border bg-background text-muted-foreground hover:border-accent/50 hover:text-accent"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.05 * index }}
              >
                <Card className="group h-full overflow-hidden border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5">
                  <div className="relative h-48 w-full overflow-hidden bg-secondary">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {project.featured && (
                      <div className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
                        Featured
                      </div>
                    )}
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 flex items-center justify-center gap-3 bg-background/80 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                      <Button size="sm" variant="outline" asChild className="rounded-full">
                        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-1.5 h-3.5 w-3.5" />
                          Code
                        </a>
                      </Button>
                      <Button size="sm" asChild className="rounded-full">
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                          Demo
                        </a>
                      </Button>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <Badge variant="outline" className="shrink-0 text-xs">
                        {project.category}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t border-border pt-4">
                    <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-accent">
                      <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-accent">
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
