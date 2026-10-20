import { useEffect, useState } from 'react'
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
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter proyek">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-full px-4 py-1.5 text-sm transition ${
                filter === f.id
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                  : 'border border-white/10 bg-white/5 text-slate-400 hover:border-white/25 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <label className="flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 text-slate-500 transition focus-within:border-indigo-400/60 focus-within:text-indigo-300">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>
          <span className="sr-only">Cari proyek</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari proyek atau stack..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600 sm:w-52"
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} aria-label="Hapus pencarian" className="text-slate-500 hover:text-white">
              ×
            </button>
          )}
        </label>
      </div>

      <p className="mt-5 font-mono text-[11px] text-slate-600">
        {visible.length} proyek ditemukan{query ? ` untuk “${query}”` : ''}
      </p>

      {visible.length ? (
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, index) => (
            <Reveal key={project.id} delay={index * 80}>
              <article className="group flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-indigo-500/40 hover:bg-white/[0.06]">
            <div className="flex items-center justify-between">
              <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-indigo-300">
                {categoryLabel[project.category]}
              </span>
              {project.featured && (
                <span className="font-mono text-[11px] text-slate-500">★ fokus utama</span>
              )}
            </div>

            <h3 className="mt-4 text-lg font-semibold text-white">{project.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{project.tagline}</p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.tech.slice(0, 5).map((tech) => (
                <TechBadge key={tech} name={tech} />
              ))}
              {project.tech.length > 5 && (
                <span className="rounded border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[11px] text-slate-500">
                  +{project.tech.length - 5}
                </span>
              )}
            </div>

            <div className="mt-5 flex items-center gap-4">
              <button
                type="button"
                onClick={() => setActive(project)}
                className="inline-flex items-center gap-2 text-sm font-medium text-indigo-400 transition group-hover:gap-3 hover:text-indigo-300"
              >
                Detail proyek
                <span aria-hidden>→</span>
              </button>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition hover:text-white"
                  aria-label={`Buka live demo ${project.title}`}
                >
                  <span className="rounded bg-indigo-500/15 px-2 py-0.5 font-mono text-[11px] text-indigo-300">Live</span>
                </a>
              )}
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition hover:text-white"
                  aria-label={`Buka repositori ${project.title}`}
                >
                  <TechBadge name="Git & GitHub" />
                </a>
              )}
              </div>
              </article>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-12 text-center">
          <p className="text-sm text-slate-400">Tidak ada proyek yang cocok.</p>
          <button type="button" onClick={() => { setQuery(''); setFilter('semua') }} className="mt-3 text-sm text-indigo-400 hover:text-indigo-300">
            Reset filter
          </button>
        </div>
      )}

      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </section>
  )
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
    >
      <button
        type="button"
        aria-label="Tutup detail proyek"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-slate-950/80 backdrop-blur-sm"
      />

      <div className="animate-fade-up relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-indigo-300">
              {categoryLabel[project.category]}
            </span>
            <h3 className="mt-3 text-2xl font-bold text-white">{project.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-400">
          {project.description.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-6">
          <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500">Tech stack</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="rounded-lg bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-400">
              Lihat Demo ↗
            </a>
          )}
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noreferrer" className="rounded-lg border border-white/15 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-white/30 hover:bg-white/5">
              Kode Sumber ↗
            </a>
          )}
          {!project.demo && !project.repo && (
            <p className="text-xs text-slate-500">Repositori publik belum tersedia.</p>
          )}
        </div>
      </div>
    </div>
  )
}
