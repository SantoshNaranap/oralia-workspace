
import React, { createContext, useContext, useState, useEffect } from 'react'

type Theme = 'dark' | 'light'
type ColorTheme = 'purple' | 'blue' | 'green' | 'orange'

interface ThemeContextType {
  theme: Theme
  colorTheme: ColorTheme
  setTheme: (theme: Theme) => void
  setColorTheme: (colorTheme: ColorTheme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [colorTheme, setColorTheme] = useState<ColorTheme>('purple')

  useEffect(() => {
    const root = document.documentElement
    root.className = `${theme} theme-${colorTheme}`
  }, [theme, colorTheme])

  return (
    <ThemeContext.Provider value={{ theme, colorTheme, setTheme, setColorTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
