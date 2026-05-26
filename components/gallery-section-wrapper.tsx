import { getAllImages } from "@/lib/gallery"
import GallerySection from "./gallery-section"

// Server component — reads manifest, passes data to client component
export default async function GallerySectionWrapper() {
  const images = await getAllImages()
  return <GallerySection images={images} />
}
