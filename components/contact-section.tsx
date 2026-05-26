"use client"

import type React from "react"
import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { AlertCircle, Mail, MapPin, Github, Linkedin, Twitter, Send } from "lucide-react"
import Link from "next/link"

const contactInfo = [
  { icon: Mail, label: "Email", value: "khatrivikram005@gmail.com", href: "mailto:khatrivikram005@gmail.com" },
  { icon: MapPin, label: "Location", value: "Kathmandu, Nepal", href: null },
]

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
]

export default function ContactSection() {
  const { toast } = useToast()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setFormError(null)

    const formData = new FormData(event.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong. Please try again.")
      }

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      })

      event.currentTarget.reset()
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Failed to send message. Please try again."
      setFormError(msg)
      toast({ title: "Error", description: msg, variant: "destructive" })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="section-padding bg-secondary/30">
      <div className="container mx-auto container-padding">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <span className="mb-3 inline-block rounded-full bg-accent/10 px-4 py-1 text-sm font-medium text-accent">
              Contact
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Let&apos;s work together
            </h2>
            <p className="mt-4 text-muted-foreground">
              Have a project in mind? I&apos;d love to hear about it.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            {/* Left info panel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 flex flex-col justify-center gap-8"
            >
              <div>
                <h3 className="mb-2 text-xl font-bold">Get in touch</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I&apos;m always open to discussing new projects, creative ideas, or opportunities
                  to be part of your vision.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{label}</p>
                      {href ? (
                        <a href={href} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm text-muted-foreground">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <p className="mb-3 text-sm font-medium">Find me on</p>
                <div className="flex gap-3">
                  {socials.map(({ icon: Icon, label, href }) => (
                    <Link
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition-all hover:border-accent/50 hover:text-accent hover:scale-110"
                    >
                      <Icon className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-3"
            >
              <Card className="border-border shadow-lg">
                <CardHeader>
                  <CardTitle>Send a Message</CardTitle>
                  <CardDescription>Fill out the form and I&apos;ll get back to you within 24 hours.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <Input id="name" name="name" placeholder="Your name" required aria-required="true" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          required
                          aria-required="true"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input id="subject" name="subject" placeholder="What's this about?" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell me about your project..."
                        rows={5}
                        required
                        aria-required="true"
                      />
                    </div>

                    {formError && (
                      <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <p>{formError}</p>
                      </div>
                    )}

                    <Button type="submit" className="w-full rounded-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
