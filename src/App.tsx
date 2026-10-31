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

type Theme = 'light' | 'dark'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  try {
    return window.localStorage.getItem('portfolio-theme') === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

function saveTheme(theme: Theme) {
  try {
    window.localStorage.setItem('portfolio-theme', theme)
  } catch {
    // Storage bisa diblokir di konteks private atau embedded.
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
    <div className="min-h-screen bg-paper font-sans">
      <a href="#konten" className="skip-link">
        Langsung ke konten
      </a>
      <ScrollTools />
      <Navbar
        theme={theme}
        onToggleTheme={() => setTheme((value) => (value === 'dark' ? 'light' : 'dark'))}
        onOpenPalette={() => setPaletteOpen(true)}
      />
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
      <main id="konten" tabIndex={-1} className="outline-none">
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
