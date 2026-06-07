import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Bikram Khatri | Portfolio",
  description:
    "Professional portfolio of Bikram Khatri — a java developer specializing in Spring, Spring AI, and modern web experiences.",
  keywords: ["java developer", "It engineer", "Spring boot", "web development", "portfolio", "typescript"],
  authors: [{ name: "Bikram Khatri" }],
  icons: {
    icon: "/profile-image.jpg",
    shortcut: "/profile-image.jpg",
    apple: "/profile-image.jpg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bikramkhatri.com.np",
    title: "Bikram Khatri | Portfolio",
    description:
      "Professional portfolio of Bikram Khatri — a java developer specializing in Spring Framework, Spring AI, and modern web experiences.",
    siteName: "Bikram Khatri Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bikram Khatri | Portfolio",
    description:
      "Professional portfolio of Bikram Khatri — a java developer specializing in Spring framework, Spring AI, and modern web experiences.",
    creator: "@parichakra",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Suspense>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </Suspense>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
