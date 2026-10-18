import { useEffect, useState } from 'react'
import About from './components/About'
import CommandPalette from './components/CommandPalette'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import ScrollTools from './components/ScrollTools'
import Skills from './components/Skills'

type Theme = 'dark' | 'light'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  try {
    return window.localStorage.getItem('portfolio-theme') === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

function saveTheme(theme: Theme) {
  try {
    window.localStorage.setItem('portfolio-theme', theme)
  } catch {
    // Storage can be blocked in private or embedded browser contexts.
  }
}

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    saveTheme(theme)
  }, [theme])

  return (
    <div className="site-shell relative isolate min-h-screen overflow-x-clip font-sans">
      <div aria-hidden="true" className="site-background" />
      <ScrollTools />
      <Navbar
        theme={theme}
        onToggleTheme={() => setTheme((value) => (value === 'dark' ? 'light' : 'dark'))}
        onOpenPalette={() => setPaletteOpen(true)}
      />
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
