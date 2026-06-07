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

const BASE_URL = "https://bikramkhatri.com.np"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Bikram Khatri | Portfolio",
    template: "%s | Bikram Khatri",
  },
  description:
    "Portfolio of Bikram Khatri — Java Developer & Software Engineer specializing in Spring Boot, Spring AI, and modern web development.",
  keywords: [
    "Bikram Khatri",
    "Java Developer",
    "Software Engineer",
    "Spring Boot",
    "Spring AI",
    "Web Development",
    "Portfolio",
    "TypeScript",
    "Next.js",
    "Nepal",
  ],
  authors: [{ name: "Bikram Khatri", url: BASE_URL }],
  creator: "Bikram Khatri",
  publisher: "Bikram Khatri",
  category: "Technology",
  icons: {
    icon: "/profile-image.jpg",
    shortcut: "/profile-image.jpg",
    apple: "/profile-image.jpg",
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    title: "Bikram Khatri | Portfolio",
    description:
      "Portfolio of Bikram Khatri — Java Developer & Software Engineer specializing in Spring Boot, Spring AI, and modern web development.",
    siteName: "Bikram Khatri Portfolio",
    images: [
      {
        url: "/profile-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bikram Khatri — Java Developer & Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bikram Khatri | Portfolio",
    description:
      "Portfolio of Bikram Khatri — Java Developer & Software Engineer specializing in Spring Boot, Spring AI, and modern web development.",
    creator: "@parichakra",
    images: ["/profile-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your Google Search Console verification token here once you have it
    // google: "your-google-verification-token",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${BASE_URL}/#person`,
        name: "Bikram Khatri",
        url: BASE_URL,
        image: {
          "@type": "ImageObject",
          url: `${BASE_URL}/profile-image.jpg`,
          caption: "Bikram Khatri",
        },
        jobTitle: "Java Developer & Software Engineer",
        description:
          "Java Developer and Software Engineer specializing in Spring Boot, Spring AI, and modern web development.",
        sameAs: [
          "https://github.com/bikramkhatri",
          "https://linkedin.com/in/bikramkhatri",
          "https://twitter.com/parichakra",
        ],
        knowsAbout: ["Java", "Spring Boot", "Spring AI", "TypeScript", "Next.js", "Web Development"],
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "Bikram Khatri Portfolio",
        description:
          "Portfolio of Bikram Khatri — Java Developer & Software Engineer.",
        author: { "@id": `${BASE_URL}/#person` },
        inLanguage: "en-US",
      },
    ],
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
