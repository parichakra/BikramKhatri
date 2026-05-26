import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react"
import { getAllPosts, getPost, getPostContent } from "@/lib/blog"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: "Post not found" }
  return {
    title: `${post.title} | John Doe`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const [post, content] = await Promise.all([getPost(slug), getPostContent(slug)])

  if (!post || !content) notFound()

  return (
    <main className="min-h-screen bg-background pb-24 pt-24">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          href="/#blog"
          className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>

        {/* Cover */}
        {post.cover && (
          <div className="relative mb-10 h-64 w-full overflow-hidden rounded-2xl bg-secondary sm:h-80">
            <Image src={post.cover} alt={post.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
          </div>
        )}

        {/* Meta */}
        <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            <Tag className="h-3 w-3" />
            {post.tag}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
          {post.title}
        </h1>

        {/* Excerpt */}
        <p className="mb-10 text-lg text-muted-foreground leading-relaxed border-l-4 border-accent/40 pl-4">
          {post.excerpt}
        </p>

        {/* Divider */}
        <hr className="mb-10 border-border" />

        {/* Post content rendered from HTML file */}
        <div
          className="prose-blog"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Footer */}
        <div className="mt-16 flex items-center justify-between border-t border-border pt-8">
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            All posts
          </Link>
          <Link
            href="/#contact"
            className="text-sm text-muted-foreground transition-colors hover:text-accent"
          >
            Have thoughts? Get in touch →
          </Link>
        </div>
      </div>
    </main>
  )
}
