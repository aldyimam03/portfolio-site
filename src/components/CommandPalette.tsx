import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { asset } from '../lib/asset'

const commands = [
  { id: 'beranda', label: 'Beranda', hint: 'Home', keywords: 'home beranda awal' },
  { id: 'tentang', label: 'Tentang', hint: 'About', keywords: 'about tentang profil' },
  { id: 'keahlian', label: 'Keahlian', hint: 'Skills', keywords: 'skills keahlian teknologi stack' },
  { id: 'proyek', label: 'Proyek', hint: 'Projects', keywords: 'projects proyek portfolio karya' },
  { id: 'kontak', label: 'Kontak', hint: 'Contact', keywords: 'contact kontak email hubungi' },
  { id: 'cv', label: 'Unduh CV', hint: 'PDF', keywords: 'cv resume curriculum vitae download unduh' },
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
      link.href = asset('cv-aldy-imam-wijaya.pdf')
      link.download = 'Aldy-Imam-Wijaya-CV.pdf'
      link.click()
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setSelected(filtered.length ? (activeSelected + 1) % filtered.length : 0)
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setSelected(filtered.length ? (activeSelected - 1 + filtered.length) % filtered.length : 0)
    }
    if (event.key === 'Enter' && filtered[activeSelected]) goTo(filtered[activeSelected].id)
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[14vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Pencarian bagian halaman"
    >
      <button
        type="button"
        aria-label="Tutup pencarian"
        onClick={() => changeOpen(false)}
        tabIndex={-1}
        className="absolute inset-0 cursor-default bg-overlay"
      />

      <div className="sheet relative w-full max-w-md overflow-hidden">
        <div className="flex items-center gap-3 border-b border-rule px-4">
          <label htmlFor="palette-input" className="sr-only">
            Cari bagian
          </label>
          <input
            ref={inputRef}
            id="palette-input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onInputKeyDown}
            placeholder="Cari bagian"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-autocomplete="list"
            aria-activedescendant={filtered.length ? `palette-item-${activeSelected}` : undefined}
            className="h-12 min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
          />
          <kbd className="num rounded-[2px] border border-rule px-1.5 py-0.5 text-[0.625rem] text-ink-faint">Esc</kbd>
        </div>

        <ul id="palette-list" role="listbox" aria-label="Bagian halaman" className="max-h-72 overflow-y-auto">
          {filtered.length ? (
            filtered.map((command, index) => (
              <li key={command.id} id={`palette-item-${index}`} role="option" aria-selected={activeSelected === index}>
                <button
                  type="button"
                  onClick={() => goTo(command.id)}
                  onMouseEnter={() => setSelected(index)}
                  className={`flex w-full items-baseline gap-4 border-b border-rule px-4 py-3 text-left text-sm transition-colors last:border-b-0 ${
                    activeSelected === index ? 'bg-accent-wash text-ink' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  <span className="num text-[0.625rem] text-ink-faint">{String(index + 1).padStart(2, '0')}</span>
                  <span className="flex-1">{command.label}</span>
                  <span className="num text-[0.625rem] text-ink-faint">{command.hint}</span>
                </button>
              </li>
            ))
          ) : (
            <li className="px-4 py-8 text-center text-sm text-ink-muted">Tidak ada bagian yang cocok.</li>
          )}
        </ul>

        <div className="num flex items-center gap-4 border-t border-rule px-4 py-2.5 text-[0.625rem] text-ink-faint">
          <span>↑↓ pilih</span>
          <span>↵ buka</span>
          <span className="ml-auto">Ctrl K</span>
        </div>
      </div>
    </div>
  )
}
