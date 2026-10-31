import { useEffect, useState } from 'react'
import { asset } from '../lib/asset'
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
      <div aria-hidden className="hero-glow pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid min-w-0 w-full max-w-6xl items-center gap-12 px-6 py-32 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="animate-fade-up min-w-0 w-full max-w-2xl">
          <p className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-hairline bg-surface-soft px-4 py-1.5 font-mono text-xs text-muted backdrop-blur-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
            </span>
            <span className="inline-flex items-center">
              <span>{displayed}</span>
              <span className="animate-cursor ml-0.5 inline-block text-mint">|</span>
            </span>
          </p>

          <h1 className="text-4xl font-extrabold leading-tight text-ink sm:text-5xl lg:text-6xl">
            Halo, saya <span className="hero-name brand-gradient bg-clip-text text-transparent">Aldy Imam Wijaya</span>
          </h1>

          <p className="mt-4 text-lg text-soft sm:text-xl">
            Dari baris CODE pertama hingga aplikasi yang siap digunakan.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#proyek"
              className="rounded-lg bg-accent-solid px-6 py-3 text-sm font-semibold text-on-accent shadow-lg shadow-accent/25 transition hover:bg-accent-solid-hover"
            >
              Lihat Proyek
            </a>
            <a
              href="#kontak"
              className="rounded-lg border border-hairline-strong bg-surface-soft px-6 py-3 text-sm font-semibold text-body transition hover:border-hairline-hover hover:bg-surface-soft"
            >
              Hubungi Saya
            </a>
            <a
              href={asset('cv-aldy-imam-wijaya.pdf')}
              download="Aldy-Imam-Wijaya-CV.pdf"
              className="rounded-lg border border-mint/30 bg-mint/10 px-6 py-3 text-sm font-semibold text-mint-soft transition hover:border-mint/50 hover:bg-mint/20"
            >
              Download CV
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
          <div aria-hidden className="photo-halo absolute -inset-3 rounded-[2rem] blur-2xl" />
          <div className="photo-frame relative overflow-hidden rounded-[2rem] border border-hairline-strong bg-panel p-2 shadow-2xl shadow-deep/60">
            <img
              src={asset('me-001.webp')}
              alt="Foto profil Aldy Imam Wijaya"
              fetchPriority="high"
              width={472}
              height={528}
              className="aspect-[0.89] w-full rounded-[1.5rem] bg-photo-bg object-cover object-top"
            />
          </div>
          <p className="mt-4 text-center font-mono text-[11px] tracking-wide text-faint">
            build carefully · ship completely
          </p>
        </div>
      </div>
    </section>
  )
}
