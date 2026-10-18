import { useEffect, useState } from 'react'
import { TechBadge } from './TechIcon'

const techStrip = [
  'Laravel',
  'Node.js',
  'Express.js',
  'React',
  'TypeScript',
  'Tailwind CSS',
  'MySQL',
  'PostgreSQL',
  'Redis',
  'Docker',
  'AI',
]

const fullText = 'OPEN TO WORK....'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function Hero() {
  const [displayed, setDisplayed] = useState(() => (prefersReducedMotion() ? fullText : ''))

  useEffect(() => {
    if (prefersReducedMotion()) {
      return
    }

    let i = 0
    let isDeleting = false
    let timeoutId: number

    const tick = () => {
      if (!isDeleting) {
        i += 1
        setDisplayed(fullText.slice(0, i))
        if (i >= fullText.length) {
          isDeleting = true
          timeoutId = window.setTimeout(tick, 2400)
          return
        }
        timeoutId = window.setTimeout(tick, 45)
      } else {
        i -= 1
        setDisplayed(fullText.slice(0, i))
        if (i <= 0) {
          isDeleting = false
          timeoutId = window.setTimeout(tick, 500)
          return
        }
        timeoutId = window.setTimeout(tick, 20)
      }
    }

    timeoutId = window.setTimeout(tick, 300)
    return () => window.clearTimeout(timeoutId)
  }, [])

  return (
    <section id="beranda" className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background glow */}
      <div
        aria-hidden
        className="hero-glow pointer-events-none absolute inset-0"
      />

      <div className="relative mx-auto grid min-w-0 w-full max-w-6xl items-center gap-12 px-6 py-32 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="animate-fade-up min-w-0 w-full max-w-2xl">
          <p className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-xs text-slate-400 backdrop-blur-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="inline-flex items-center">
              <span>{displayed}</span>
              <span className="animate-cursor ml-0.5 inline-block text-emerald-400">|</span>
            </span>
          </p>

          <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            Halo, saya{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
              Aldy Imam Wijaya
            </span>
          </h1>

          <p className="mt-4 text-lg text-slate-300 sm:text-xl">
            Dari baris CODE pertama hingga aplikasi yang siap digunakan.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#proyek"
              className="rounded-lg bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:bg-indigo-400"
            >
              Lihat Proyek
            </a>
            <a
              href="#kontak"
              className="rounded-lg border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/30 hover:bg-white/10"
            >
              Hubungi Saya
            </a>
          </div>

          {/* Auto-scrolling tech strip — single line, smooth marquee with fade mask */}
          <div className="animate-fade-up mt-12 overflow-hidden [animation-delay:150ms] [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="animate-marquee gap-3 py-1">
              {[...techStrip, ...techStrip].map((tech, idx) => (
                <TechBadge key={idx} name={tech} />
              ))}
            </div>
          </div>
        </div>

        <div className="animate-fade-up relative mx-auto w-full max-w-[270px] [animation-delay:100ms] lg:max-w-none">
          <div
            aria-hidden
            className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-indigo-500/40 via-sky-500/10 to-emerald-400/30 blur-2xl"
          />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-slate-900 p-2 shadow-2xl shadow-indigo-950/60">
            <img
              src="/me-001.png"
              alt="Foto profil Aldy Imam Wijaya"
              className="aspect-[0.89] w-full rounded-[1.5rem] bg-white object-cover object-top"
            />
          </div>
          <p className="mt-4 text-center font-mono text-[11px] tracking-wide text-slate-500">
            build carefully · ship completely
          </p>
        </div>
      </div>
    </section>
  )
}
