import { useEffect, useState } from 'react'

const links = [
  { id: 'beranda', href: '#beranda', label: 'Beranda' },
  { id: 'tentang', href: '#tentang', label: 'Tentang' },
  { id: 'keahlian', href: '#keahlian', label: 'Keahlian' },
  { id: 'proyek', href: '#proyek', label: 'Proyek' },
  { id: 'kontak', href: '#kontak', label: 'Kontak' },
]

interface NavbarProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
  onOpenPalette: () => void
}

export default function Navbar({ theme, onToggleTheme, onOpenPalette }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('beranda')

  useEffect(() => {
    const ids = links.map((link) => link.id)

    const update = () => {
      setScrolled(window.scrollY > 8)

      const offset = window.innerHeight * 0.25
      let current = ids[0]
      for (const id of ids) {
        const element = document.getElementById(id)
        if (element && element.getBoundingClientRect().top <= offset) current = id
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8
      setActive(atBottom ? ids[ids.length - 1] : current)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const navigate = (id: string) => {
    setActive(id)
    setOpen(false)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-paper transition-colors ${
        scrolled ? 'border-b border-rule' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 w-full max-w-[78rem] items-center justify-between gap-6 px-6 md:px-10">
        <a
          href="#beranda"
          onClick={() => navigate('beranda')}
          className="font-display text-[1.05rem] tracking-tight text-ink transition-colors hover:text-accent"
        >
          Aldy Imam Wijaya
        </a>

        <ul className="hidden items-baseline gap-7 md:flex">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                onClick={() => navigate(link.id)}
                aria-current={active === link.id ? 'location' : undefined}
                className={`inline-block border-b pb-0.5 text-[0.9375rem] transition-colors ${
                  active === link.id ? 'border-accent text-ink' : 'border-transparent text-ink-muted hover:text-ink'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onOpenPalette}
            className="hidden h-9 items-center gap-2 px-2 text-[0.8125rem] text-ink-muted transition-colors hover:text-ink sm:flex"
            aria-label="Buka pencarian bagian"
          >
            Cari
            <kbd className="num rounded-[2px] border border-rule px-1 py-0.5 text-[0.625rem] text-ink-faint">⌘K</kbd>
          </button>

          <button
            type="button"
            onClick={onOpenPalette}
            aria-label="Buka pencarian"
            className="flex h-9 w-9 items-center justify-center text-ink-muted transition-colors hover:text-ink sm:hidden"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" strokeLinecap="round" />
            </svg>
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'light' ? 'Gunakan tema gelap' : 'Gunakan tema terang'}
            title={theme === 'light' ? 'Tema gelap' : 'Tema terang'}
            aria-pressed={theme === 'dark'}
            className="flex h-9 w-9 items-center justify-center text-ink-muted transition-colors hover:text-ink"
          >
            {theme === 'light' ? (
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              >
                <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.7 6.7 0 0 0 9.8 9.8Z" />
              </svg>
            ) : (
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
            )}
          </button>

          <button
            type="button"
            aria-label={open ? 'Tutup daftar bagian' : 'Buka daftar bagian'}
            aria-expanded={open}
            aria-controls="navigasi-mobile"
            onClick={() => setOpen((value) => !value)}
            className="flex h-9 w-9 items-center justify-center text-ink-muted transition-colors hover:text-ink md:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div id="navigasi-mobile" className="border-t border-rule md:hidden">
          <ul className="mx-auto w-full max-w-[78rem] px-6 py-2">
            {links.map((link) => (
              <li key={link.id} className="border-b border-rule last:border-b-0">
                <a
                  href={link.href}
                  onClick={() => navigate(link.id)}
                  aria-current={active === link.id ? 'location' : undefined}
                  className={`block py-3 text-base transition-colors ${
                    active === link.id ? 'text-accent' : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
