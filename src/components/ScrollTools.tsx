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
        className="scroll-progress brand-gradient fixed inset-x-0 top-0 z-[70] h-0.5 origin-left transition-transform duration-150"
        style={{ transform: `scaleX(${progress})` }}
      />

      {showTop && (
        <button
          type="button"
          onClick={backToTop}
          aria-label="Kembali ke atas"
          className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-hairline-strong bg-panel/90 text-soft shadow-xl shadow-deep/40 backdrop-blur transition hover:-translate-y-1 hover:border-accent-line hover:text-ink"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        </button>
      )}
    </>
  )
}
