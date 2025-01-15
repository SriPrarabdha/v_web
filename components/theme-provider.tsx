"use client"

import * as React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  attribute?: string
  defaultTheme?: Theme
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  attribute = "data-theme",
  defaultTheme = "system",
  enableSystem = true,
  disableTransitionOnChange = false,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as Theme) || defaultTheme
    }
    return defaultTheme
  })

  useEffect(() => {
    const root = window.document.documentElement

    // Remove old attribute value
    root.removeAttribute(attribute)

    if (theme === "system" && enableSystem) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.setAttribute(attribute, systemTheme)
      return
    }

    root.setAttribute(attribute, theme)
  }, [theme, attribute, enableSystem])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    
    const handleChange = () => {
      if (theme === "system" && enableSystem) {
        const root = window.document.documentElement
        const systemTheme = mediaQuery.matches ? "dark" : "light"
        root.setAttribute(attribute, systemTheme)
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme, attribute, enableSystem])

  useEffect(() => {
    localStorage.setItem("theme", theme)
  }, [theme])

  if (disableTransitionOnChange) {
    useEffect(() => {
      document.documentElement.classList.add("[&_*]:!transition-none")
      const timeout = setTimeout(() => {
        document.documentElement.classList.remove("[&_*]:!transition-none")
      }, 0)
      return () => clearTimeout(timeout)
    }, [theme])
  }

  return (
    <ThemeProviderContext.Provider
      {...props}
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}