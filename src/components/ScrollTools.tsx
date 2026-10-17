import { useEffect, useState } from 'react'

export default function ScrollTools() {
  const [progress, setProgress] = useState(0)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    let frame = 0

    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        const nextProgress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
        setProgress(nextProgress)
        setShowTop(window.scrollY > 560)
      })
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const backToTop = () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })
  }

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 transition-transform duration-150"
        style={{ transform: `scaleX(${progress})` }}
      />

      {showTop && (
        <button
          type="button"
          onClick={backToTop}
          aria-label="Kembali ke atas"
          className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-slate-900/90 text-slate-300 shadow-xl shadow-slate-950/40 backdrop-blur transition hover:-translate-y-1 hover:border-indigo-400/60 hover:text-white"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m18 15-6-6-6 6" />
          </svg>
        </button>
      )}
    </>
  )
}
