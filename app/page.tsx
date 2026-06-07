import type { Metadata } from "next"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ProjectsSection from "@/components/projects-section"
import BlogSection from "@/components/blog-section"
import GallerySectionWrapper from "@/components/gallery-section-wrapper"
import ContactSection from "@/components/contact-section"

export const metadata: Metadata = {
  alternates: {
    canonical: "https://bikramkhatri.com.np",
  },
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <BlogSection />
      <GallerySectionWrapper />
      <ContactSection />
    </>
  )
}
