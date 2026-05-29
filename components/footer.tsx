import Link from "next/link"
import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react"

const navLinks = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/#projects" },
  { name: "Blog", href: "/#blog" },
  { name: "Gallery", href: "/#gallery" },
  { name: "Contact", href: "/#contact" },
]

const socials = [
  { icon: Github, href: "https://github.com/parichakra", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/parichakra", label: "LinkedIn" },
  { icon: Facebook, href: "https://www.facebook.com/veekram.khatri", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/amiibikram/", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-secondary/20">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="#home" className="text-xl font-bold tracking-tighter">
              <span className="gradient-text">Bikram</span>
              <span>Khatri</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Software developer crafting beautiful, accessible, and performant web experiences.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Navigation
            </p>
            <ul className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-accent"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Connect
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all hover:border-accent/50 hover:text-accent"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} parichakra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
