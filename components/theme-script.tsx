"use client"

import { useTheme } from "next-themes"
import { useEffect } from "react"

export function ThemeScript() {
  const { setTheme, theme } = useTheme()

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setTheme(prefersDark ? "dark" : "light")
    }
  }, [setTheme])

  useEffect(() => {
    if (theme) {
      localStorage.setItem("theme", theme)
    }
  }, [theme])

  return null
}
