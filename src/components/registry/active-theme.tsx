"use client"

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

const DEFAULT_THEME = "default"
const THEME_STORAGE_KEY = "active-theme"

type ThemeContextType = {
  activeTheme: string
  setActiveTheme: (theme: string) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ActiveThemeProvider({
  children,
  initialTheme,
}: {
  children: ReactNode
  initialTheme?: string
}) {
  const [activeTheme, setActiveThemeState] = useState<string>(() => {
    // Try to read from localStorage first
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(THEME_STORAGE_KEY)
      if (stored) {
        return stored
      }
    }
    return initialTheme || DEFAULT_THEME
  })

  const [mounted, setMounted] = useState(false)
  // Theme is considered loaded once we've mounted and applied the initial theme
  const themeLoaded = mounted

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    // Ensure theme is applied immediately on mount
    Array.from(document.body.classList)
      .filter((className) => className.startsWith("theme-"))
      .forEach((className) => {
        document.body.classList.remove(className)
      })
    document.body.classList.add(`theme-${activeTheme}`)
    if (activeTheme.endsWith("-scaled")) {
      document.body.classList.add("theme-scaled")
    }

    // Remove loading state and show content
    document.body.classList.remove("theme-loading")

    // Save to localStorage
    localStorage.setItem(THEME_STORAGE_KEY, activeTheme)
  }, [activeTheme, mounted])

  const setActiveTheme = (theme: string) => {
    setActiveThemeState(theme)
  }

  // Don't render children until theme is loaded to prevent FOUC
  if (!themeLoaded) {
    return null
  }

  return (
    <ThemeContext.Provider value={{ activeTheme, setActiveTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeConfig() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useThemeConfig must be used within an ActiveThemeProvider")
  }
  return context
}
