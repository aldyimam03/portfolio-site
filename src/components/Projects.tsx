import { useEffect, useRef, useState } from 'react'
import { projects, categoryLabel, type Project, type ProjectCategory } from '../data/projects'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { TechBadge } from './TechIcon'

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

  return (
    <section id="proyek" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24">
      <SectionHeading index="03" title="Proyek" />

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter proyek">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-full px-4 py-1.5 text-sm transition ${
                filter === f.id
                  ? 'bg-accent-solid text-on-accent shadow-lg shadow-accent/25'
                  : 'border border-hairline bg-surface-soft text-muted hover:border-hairline-hover hover:text-ink'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <label className="flex h-10 items-center gap-2 rounded-lg border border-hairline bg-surface px-3 text-faint transition focus-within:border-accent-line focus-within:text-accent-strong">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>
          <span className="sr-only">Cari proyek</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari proyek atau stack..."
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ghost sm:w-52"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Hapus pencarian"
              className="text-faint hover:text-ink"
            >
              ×
            </button>
          )}
        </label>
      </div>

      <p className="mt-5 font-mono text-[11px] text-ghost" role="status" aria-live="polite">
        {visible.length} proyek ditemukan{query ? ` untuk “${query}”` : ''}
      </p>

      {visible.length ? (
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, index) => (
            <Reveal key={project.id} delay={index * 80}>
              <article className="group flex h-full flex-col rounded-xl border border-hairline bg-surface p-6 transition hover:-translate-y-1 hover:border-accent-line hover:bg-surface-strong">
                <div className="flex items-center justify-between">
                  <span className="rounded-md border border-hairline bg-surface-soft px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-accent-strong">
                    {categoryLabel[project.category]}
                  </span>
                  {project.featured && <span className="font-mono text-[11px] text-faint">★ fokus utama</span>}
                </div>

                <h3 className="mt-4 text-lg font-semibold text-ink">{project.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.tagline}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 5).map((tech) => (
                    <TechBadge key={tech} name={tech} />
                  ))}
                  {project.tech.length > 5 && (
                    <span className="rounded border border-hairline bg-surface-soft px-2 py-0.5 font-mono text-[11px] text-faint">
                      +{project.tech.length - 5}
                    </span>
                  )}
                </div>

                <div className="mt-5 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setActive(project)}
                    className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap text-sm font-medium text-accent transition group-hover:gap-3 hover:text-accent-strong"
                  >
                    Detail proyek
                    <span aria-hidden>→</span>
                  </button>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-ink"
                      aria-label={`Buka live demo ${project.title}`}
                    >
                      <span className="rounded bg-accent-soft px-2 py-0.5 font-mono text-[11px] text-accent-strong">
                        Live
                      </span>
                    </a>
                  )}
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-ink"
                      aria-label={`Buka repositori ${project.title}`}
                    >
                      <TechBadge name="GitHub" />
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-dashed border-hairline bg-surface-faint px-6 py-12 text-center">
          <p className="text-sm text-muted">Tidak ada proyek yang cocok.</p>
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setFilter('semua')
            }}
            className="mt-3 text-sm text-accent hover:text-accent-strong"
          >
            Reset filter
          </button>
        </div>
      )}

      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </section>
  )
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab' || !modalRef.current) return
      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
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
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto p-4 pb-8 pt-24 sm:px-6 sm:pt-24"
    >
      <button
        type="button"
        aria-label="Tutup detail proyek"
        onClick={onClose}
        tabIndex={-1}
        className="project-modal-overlay fixed inset-0 z-0 cursor-default bg-overlay backdrop-blur-sm"
      />

      <div
        ref={modalRef}
        role="document"
        className="project-modal animate-fade-up relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-hairline bg-panel p-6 shadow-2xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="rounded-md border border-hairline bg-surface-soft px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-accent-strong">
              {categoryLabel[project.category]}
            </span>
            <h3 id="project-modal-title" className="mt-3 text-2xl font-bold text-ink">
              {project.title}
            </h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted transition hover:bg-surface-soft hover:text-ink"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted">
          {project.description.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-6">
          <p className="font-mono text-[11px] uppercase tracking-wider text-faint">Tech stack</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-accent-line bg-accent-solid px-5 py-2.5 text-sm font-semibold text-on-accent shadow-lg shadow-accent/25 transition hover:bg-accent-solid-hover"
            >
              Lihat Demo ↗
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-hairline-strong bg-surface-soft px-5 py-2.5 text-sm font-semibold text-body transition hover:border-hairline-hover hover:bg-surface-soft"
            >
              Kode Sumber ↗
            </a>
          )}
          {!project.demo && !project.repo && <p className="text-xs text-faint">Repositori publik belum tersedia.</p>}
        </div>
      </div>
    </div>
  )
}
