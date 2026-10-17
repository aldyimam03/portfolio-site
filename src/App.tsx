import { useState } from 'react'
import About from './components/About'
import CommandPalette from './components/CommandPalette'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import ScrollTools from './components/ScrollTools'
import Skills from './components/Skills'

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-950 font-sans">
      <ScrollTools />
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
      <main>
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
