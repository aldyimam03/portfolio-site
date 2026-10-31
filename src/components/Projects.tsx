import { useEffect, useRef, useState } from 'react'
import { projects, categoryLabel, type Project, type ProjectCategory } from '../data/projects'
import Section from './Section'

type Filter = 'semua' | ProjectCategory

const filters: { id: Filter; label: string }[] = [
  { id: 'semua', label: 'Semua' },
  { id: 'web', label: 'Web App' },
  { id: 'api', label: 'API' },
]

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('semua')
  const [query, setQuery] = useState('')
  const [active, setActive] = useState<Project | null>(null)

  const visible = projects.filter((project) => {
    const matchesFilter = filter === 'semua' || project.category === filter
    const searchable = `${project.title} ${project.tagline} ${project.tech.join(' ')}`.toLowerCase()
    return matchesFilter && searchable.includes(query.toLowerCase())
  })

  const reset = () => {
    setQuery('')
    setFilter('semua')
  }

  return (
    <Section id="proyek" index="03" title="Proyek">
      <div className="flex flex-col gap-4 border-b border-rule pb-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
        <div className="flex gap-6" role="group" aria-label="Filter proyek">
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={filter === item.id}
              onClick={() => setFilter(item.id)}
              className="text-control"
            >
              {item.label}
            </button>
          ))}
        </div>

        <label className="flex items-baseline gap-3 sm:w-64">
          <span className="text-xs text-ink-faint">Cari</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="nama proyek atau teknologi"
            className="min-w-0 flex-1 border-b border-rule bg-transparent pb-1 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint hover:border-rule-strong focus:border-accent"
          />
        </label>
      </div>

      <p role="status" aria-live="polite" className="num mt-3 text-xs text-ink-faint">
        {visible.length} dari {projects.length} proyek
        {query ? `, kata kunci “${query}”` : ''}
      </p>

      {visible.length ? (
        <ol className="mt-4">
          {visible.map((project, index) => (
            <li key={project.id} className="border-b border-rule">
              <article className="grid gap-3 py-6 md:grid-cols-[2.5rem_minmax(0,1fr)_auto] md:gap-6 md:py-7">
                <span className="num text-xs text-ink-faint md:pt-2">{String(index + 1).padStart(2, '0')}</span>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <h3 className="text-[1.35rem] leading-snug">
                      <button
                        type="button"
                        onClick={() => setActive(project)}
                        className="text-left transition-colors hover:text-accent"
                      >
                        {project.title}
                      </button>
                    </h3>
                    {project.featured && <span className="text-[0.6875rem] text-accent">Fokus utama</span>}
                  </div>
                  <p className="mt-2 max-w-[62ch] text-[0.9375rem] text-ink-muted">{project.tagline}</p>
                  <p className="num mt-3 text-xs text-ink-faint">{project.tech.join(' · ')}</p>
                </div>

                <div className="flex items-start gap-5 md:pt-2">
                  <button type="button" onClick={() => setActive(project)} className="doc-link -my-1 py-1 text-sm">
                    Detail
                  </button>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Buka demo ${project.title} di tab baru`}
                      className="doc-link -my-1 py-1 text-sm"
                    >
                      Live
                    </a>
                  )}
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Buka kode ${project.title} di GitHub`}
                      className="doc-link -my-1 py-1 text-sm"
                    >
                      Kode
                    </a>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ol>
      ) : (
        <div className="border-b border-rule py-10">
          <p className="text-[0.9375rem] text-ink">
            Tidak ada proyek yang cocok dengan {query ? `kata kunci “${query}”` : 'filter ini'}.
          </p>
          <button type="button" onClick={reset} className="doc-link mt-2 text-sm">
            Tampilkan semua proyek
          </button>
        </div>
      )}

      {active && <ProjectSheet project={active} onClose={() => setActive(null)} />}
    </Section>
  )
}

function ProjectSheet({ project, onClose }: { project: Project; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-sheet-title"
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto p-4 pt-20 sm:pt-24"
    >
      <button
        type="button"
        aria-label="Tutup detail proyek"
        onClick={onClose}
        tabIndex={-1}
        className="fixed inset-0 z-0 cursor-default bg-overlay"
      />

      <div ref={panelRef} role="document" className="sheet relative z-10 w-full max-w-2xl overflow-y-auto p-6 sm:p-8">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <p className="text-xs text-ink-faint">{categoryLabel[project.category]}</p>
            <h3 id="project-sheet-title" className="mt-1.5 text-[1.75rem] leading-tight">
              {project.title}
            </h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="-mr-2 -mt-2 flex h-10 w-10 shrink-0 items-center justify-center text-ink-muted transition-colors hover:text-ink"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="mt-5 space-y-3 border-t border-rule pt-5">
          {project.description.map((paragraph) => (
            <p key={paragraph} className="text-[0.9375rem] leading-relaxed text-ink-muted">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-6 border-t border-rule pt-4">
          <p className="text-xs text-ink-faint">Teknologi</p>
          <p className="num mt-1.5 text-sm text-ink-soft">{project.tech.join(' · ')}</p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="rounded-[2px] bg-accent px-4 py-2 text-sm font-medium text-on-accent transition-colors hover:bg-accent-strong"
            >
              Buka demo
            </a>
          )}
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noreferrer" className="doc-link text-sm">
              Lihat kode
            </a>
          )}
          {!project.demo && !project.repo && (
            <p className="text-xs text-ink-faint">Repositori publik belum tersedia.</p>
          )}
        </div>
      </div>
    </div>
  )
}
