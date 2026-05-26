"use client"

import { useRef, useState, useCallback } from "react"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import type { GalleryItem } from "@/lib/gallery"

const categories = ["All", "Sketch", "Photo"]

interface Props {
  images: GalleryItem[]
}

export default function GallerySection({ images }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const [activeCategory, setActiveCategory] = useState("All")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered =
    activeCategory === "All" ? images : images.filter((img) => img.category === activeCategory)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length))
  }, [filtered.length])

  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length))
  }, [filtered.length])

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
      if (e.key === "Escape") closeLightbox()
    },
    [prev, next],
  )

  return (
    <section id="gallery" ref={sectionRef} className="section-padding bg-secondary/30">
      <div className="container mx-auto container-padding">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <span className="mb-3 inline-block rounded-full bg-accent/10 px-4 py-1 text-sm font-medium text-accent">
              Gallery
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Sketches &amp; Photos
            </h2>
            <p className="mt-3 text-muted-foreground">
              A visual journal — pencil sketches, ink drawings, and photography.
            </p>
          </motion.div>

          {/* Filter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mb-8 flex justify-center gap-2"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-1.5 text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : "border border-border bg-background text-muted-foreground hover:border-accent/50 hover:text-accent"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Empty state */}
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border py-20 text-center text-muted-foreground">
              <p className="text-lg font-medium">No images yet</p>
              <p className="mt-1 text-sm">
                Add images to <code className="rounded bg-secondary px-1.5 py-0.5 text-xs">public/gallery/</code> and
                register them in <code className="rounded bg-secondary px-1.5 py-0.5 text-xs">public/gallery/manifest.json</code>
              </p>
            </div>
          ) : (
            /* Masonry-style grid */
            <motion.div
              layout
              className="columns-2 gap-4 sm:columns-3 lg:columns-4"
            >
              {filtered.map((img, index) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: 0.04 * index }}
                  className="group relative mb-4 cursor-pointer overflow-hidden rounded-xl break-inside-avoid"
                  onClick={() => openLightbox(index)}
                >
                  <div className="relative w-full">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={400}
                      height={400}
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/70 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    <ZoomIn className="h-6 w-6 text-accent" />
                    {img.caption && (
                      <p className="px-3 text-center text-xs font-medium text-foreground">
                        {img.caption}
                      </p>
                    )}
                  </div>
                  {/* Category badge */}
                  <div className="absolute left-2 top-2 rounded-full bg-background/80 px-2 py-0.5 text-xs font-medium backdrop-blur-sm">
                    {img.category}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* How to add — dev only */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-10 rounded-xl border border-dashed border-accent/30 bg-accent/5 p-5 text-sm">
              <p className="font-semibold text-accent">🖼️ How to add gallery images</p>
              <ol className="mt-2 list-decimal space-y-1 pl-4 text-muted-foreground">
                <li>
                  Drop your image into <code className="rounded bg-secondary px-1 py-0.5 text-xs">public/gallery/</code>
                </li>
                <li>
                  Add an entry to <code className="rounded bg-secondary px-1 py-0.5 text-xs">public/gallery/manifest.json</code> with id, src, alt, category, and optional caption
                </li>
                <li>Done — it appears in the gallery automatically</li>
              </ol>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && filtered[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            {/* Close */}
            <button
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Prev */}
            {filtered.length > 1 && (
              <button
                className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-secondary text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                onClick={(e) => { e.stopPropagation(); prev() }}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative max-h-[85vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].alt}
                width={1200}
                height={900}
                className="max-h-[80vh] w-auto rounded-xl object-contain shadow-2xl"
              />
              {filtered[lightboxIndex].caption && (
                <p className="mt-3 text-center text-sm text-muted-foreground">
                  {filtered[lightboxIndex].caption}
                </p>
              )}
              <p className="mt-1 text-center text-xs text-muted-foreground/60">
                {lightboxIndex + 1} / {filtered.length}
              </p>
            </motion.div>

            {/* Next */}
            {filtered.length > 1 && (
              <button
                className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-secondary text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                onClick={(e) => { e.stopPropagation(); next() }}
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
