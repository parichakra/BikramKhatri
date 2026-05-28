import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Clock, Calendar } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { BlogPost } from "@/lib/blog"
import { getAllPosts } from "@/lib/blog"

const tagColors: Record<string, string> = {
  Accessibility: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  "Next.js": "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  Animation: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
  TypeScript: "bg-blue-600/10 text-blue-700 dark:text-blue-300 border-blue-600/20",
  CSS: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
  Performance: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  React: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
  JavaScript: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
}

// Server component — reads manifest at request time, no database needed
export default async function BlogSection() {
  const posts = await getAllPosts()
  const preview = posts.slice(0, 3)

  return (
    <section id="blog" className="section-padding bg-background">
      <div className="container mx-auto container-padding">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="mb-3 inline-block rounded-full bg-accent/10 px-4 py-1 text-sm font-medium text-accent">
                Blog
              </span>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Thoughts &amp; Tutorials
              </h2>
              <p className="mt-2 text-muted-foreground">
                Writing about backend development, design, and the web.
              </p>
            </div>
            {posts.length > 3 && (
              <Button variant="outline" asChild className="rounded-full shrink-0">
                <Link href="/blog">
                  All posts
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>

          {preview.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border py-20 text-center text-muted-foreground">
              <p className="text-lg font-medium">No posts yet</p>
              <p className="mt-1 text-sm">
                Add HTML files to <code className="rounded bg-secondary px-1.5 py-0.5 text-xs">public/blogs/</code> and
                register them in <code className="rounded bg-secondary px-1.5 py-0.5 text-xs">public/blogs/manifest.json</code>
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {preview.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}

          {/* How to add a post — visible only in dev */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-10 rounded-xl border border-dashed border-accent/30 bg-accent/5 p-5 text-sm">
              <p className="font-semibold text-accent">📝 How to add a blog post</p>
              <ol className="mt-2 list-decimal space-y-1 pl-4 text-muted-foreground">
                <li>
                  Create <code className="rounded bg-secondary px-1 py-0.5 text-xs">public/blogs/your-slug.html</code> — write your post inside an <code className="rounded bg-secondary px-1 py-0.5 text-xs">&lt;article&gt;</code> tag
                </li>
                <li>
                  Add an entry to <code className="rounded bg-secondary px-1 py-0.5 text-xs">public/blogs/manifest.json</code> with slug, title, excerpt, tag, date, readTime, and cover
                </li>
                <li>Done — the post appears here and at <code className="rounded bg-secondary px-1 py-0.5 text-xs">/blog/your-slug</code></li>
              </ol>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function BlogCard({ post }: { post: BlogPost }) {
  const tagClass = tagColors[post.tag] ?? "bg-accent/10 text-accent border-accent/20"

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <Card className="h-full overflow-hidden border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5">
        {/* Cover image */}
        <div className="relative h-48 w-full overflow-hidden bg-secondary">
          {post.cover ? (
            <Image
              src={post.cover}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-accent/10 to-violet-500/10">
              <span className="text-4xl">✍️</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
          <div className="absolute left-3 top-3">
            <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${tagClass}`}>
              {post.tag}
            </span>
          </div>
        </div>

        <CardHeader className="pb-2">
          <h3 className="line-clamp-2 text-lg font-semibold leading-snug transition-colors group-hover:text-accent">
            {post.title}
          </h3>
        </CardHeader>

        <CardContent>
          <p className="line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>{post.readTime}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
