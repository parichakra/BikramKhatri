import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Clock, Calendar } from "lucide-react"
import { getAllPosts } from "@/lib/blog"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Blog | John Doe",
  description: "Thoughts, tutorials, and deep dives on frontend development.",
}

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

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <main className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/#blog"
          className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to portfolio
        </Link>

        {/* Header */}
        <div className="mb-12">
          <span className="mb-3 inline-block rounded-full bg-accent/10 px-4 py-1 text-sm font-medium text-accent">
            Blog
          </span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Thoughts &amp; Tutorials
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {posts.length} post{posts.length !== 1 ? "s" : ""} on frontend development, design, and the web.
          </p>
        </div>

        {/* Posts */}
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border py-24 text-center text-muted-foreground">
            <p className="text-lg font-medium">No posts yet</p>
            <p className="mt-1 text-sm">
              Add HTML files to <code className="rounded bg-secondary px-1.5 py-0.5 text-xs">public/blogs/</code>
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Featured — first post large */}
            {posts[0] && (
              <Link href={`/blog/${posts[0].slug}`} className="group block">
                <article className="overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/5 sm:flex">
                  <div className="relative h-56 shrink-0 overflow-hidden bg-secondary sm:h-auto sm:w-72">
                    {posts[0].cover ? (
                      <Image
                        src={posts[0].cover}
                        alt={posts[0].title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-accent/10 to-violet-500/10 text-5xl">
                        ✍️
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center p-6 sm:p-8">
                    <div className="mb-3 flex items-center gap-3">
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                          tagColors[posts[0].tag] ?? "bg-accent/10 text-accent border-accent/20"
                        }`}
                      >
                        {posts[0].tag}
                      </span>
                      <span className="text-xs text-muted-foreground">Featured</span>
                    </div>
                    <h2 className="mb-3 text-2xl font-bold leading-snug transition-colors group-hover:text-accent sm:text-3xl">
                      {posts[0].title}
                    </h2>
                    <p className="mb-4 line-clamp-3 text-muted-foreground">{posts[0].excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {posts[0].date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {posts[0].readTime}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            )}

            {/* Rest of posts */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {posts.slice(1).map((post) => {
                const tagClass = tagColors[post.tag] ?? "bg-accent/10 text-accent border-accent/20"
                return (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                    <article className="h-full overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/5">
                      <div className="relative h-44 overflow-hidden bg-secondary">
                        {post.cover ? (
                          <Image
                            src={post.cover}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-gradient-to-br from-accent/10 to-violet-500/10 text-4xl">
                            ✍️
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                        <div className="absolute left-3 top-3">
                          <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${tagClass}`}>
                            {post.tag}
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="mb-2 line-clamp-2 font-semibold leading-snug transition-colors group-hover:text-accent">
                          {post.title}
                        </h3>
                        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" />
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
