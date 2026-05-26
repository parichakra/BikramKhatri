import { readFile } from "fs/promises"
import path from "path"

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  tag: string
  date: string
  readTime: string
  cover?: string
}

const manifestPath = path.join(process.cwd(), "public", "blogs", "manifest.json")

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const raw = await readFile(manifestPath, "utf-8")
    return JSON.parse(raw) as BlogPost[]
  } catch {
    return []
  }
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts()
  return posts.find((p) => p.slug === slug) ?? null
}

export async function getPostContent(slug: string): Promise<string | null> {
  try {
    const filePath = path.join(process.cwd(), "public", "blogs", `${slug}.html`)
    return await readFile(filePath, "utf-8")
  } catch {
    return null
  }
}
