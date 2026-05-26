import { readFile } from "fs/promises"
import path from "path"

export interface GalleryItem {
  id: number
  src: string
  alt: string
  category: string
  caption?: string
}

const manifestPath = path.join(process.cwd(), "public", "gallery", "manifest.json")

export async function getAllImages(): Promise<GalleryItem[]> {
  try {
    const raw = await readFile(manifestPath, "utf-8")
    return JSON.parse(raw) as GalleryItem[]
  } catch {
    return []
  }
}
