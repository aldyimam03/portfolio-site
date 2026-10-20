import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'

const commands = [
  { id: 'beranda', label: 'Buka Beranda', hint: 'Home', keywords: 'home beranda awal', icon: '⌂' },
  { id: 'tentang', label: 'Lihat Tentang Saya', hint: 'About', keywords: 'about tentang profil', icon: '01' },
  { id: 'keahlian', label: 'Lihat Keahlian', hint: 'Skills', keywords: 'skills keahlian teknologi stack', icon: '02' },
  { id: 'proyek', label: 'Jelajahi Proyek', hint: 'Projects', keywords: 'projects proyek portfolio karya', icon: '03' },
  { id: 'kontak', label: 'Hubungi Saya', hint: 'Contact', keywords: 'contact kontak email hubungi', icon: '04' },
  { id: 'cv', label: 'Download CV', hint: 'Resume', keywords: 'cv resume curriculum vitae download unduh', icon: '↓' },
]

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = commands.filter((command) =>
    `${command.label} ${command.hint} ${command.keywords}`.toLowerCase().includes(query.toLowerCase()),
  )
  const activeSelected = Math.min(selected, Math.max(filtered.length - 1, 0))
  const changeOpen = useCallback(
    (nextOpen: boolean) => {
      onOpenChange(nextOpen)
      if (!nextOpen) {
        setQuery('')
        setSelected(0)
      }
    },
    [onOpenChange],
  )

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        changeOpen(!open)
      }
      if (event.key === 'Escape') changeOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [changeOpen, open])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => inputRef.current?.focus())
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const goTo = (id: string) => {
    changeOpen(false)
    if (id === 'cv') {
      const link = document.createElement('a')
      link.href = '/cv-aldy-imam-wijaya.pdf'
      link.download = 'Aldy-Imam-Wijaya-CV.pdf'
      link.click()
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setSelected((value) => (filtered.length ? (value + 1) % filtered.length : 0))
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setSelected((value) => (filtered.length ? (value - 1 + filtered.length) % filtered.length : 0))
    }
    if (event.key === 'Enter' && filtered[activeSelected]) goTo(filtered[activeSelected].id)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[16vh]" role="dialog" aria-modal="true" aria-label="Command palette">
      <button
        type="button"
        aria-label="Tutup command palette"
        onClick={() => changeOpen(false)}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
      />
      <div className="animate-fade-up relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/15 bg-slate-900 shadow-2xl shadow-black/50">
        <div className="flex items-center gap-3 border-b border-white/10 px-4">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="shrink-0 text-slate-500">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onInputKeyDown}
            placeholder="Cari section..."
            aria-label="Cari perintah"
            className="h-14 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
          />
          <kbd className="rounded border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-slate-500">ESC</kbd>
        </div>

        <div className="max-h-72 overflow-y-auto p-2">
          {filtered.length ? (
            filtered.map((command, index) => (
              <button
                key={command.id}
                type="button"
                onClick={() => goTo(command.id)}
                onMouseEnter={() => setSelected(index)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition ${
                  activeSelected === index ? 'bg-indigo-500/15 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/5 font-mono text-[10px] text-indigo-300">
                  {command.icon}
                </span>
                <span className="flex-1 text-sm">{command.label}</span>
                <span className="font-mono text-[10px] text-slate-600">{command.hint}</span>
              </button>
            ))
          ) : (
            <p className="px-3 py-8 text-center text-sm text-slate-500">Section tidak ditemukan.</p>
          )}
        </div>
        <div className="flex items-center gap-4 border-t border-white/10 px-4 py-2.5 font-mono text-[10px] text-slate-600">
          <span>↑↓ navigasi</span>
          <span>↵ pilih</span>
          <span className="ml-auto">Ctrl K buka/tutup</span>
        </div>
      </div>
    </div>
  )
}
