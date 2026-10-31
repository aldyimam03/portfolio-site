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
        setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0)
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
        className="scroll-progress fixed inset-x-0 top-0 z-[70] h-0.5 origin-left"
        style={{ transform: `scaleX(${progress})` }}
      />

      {showTop && (
        <button
          type="button"
          onClick={backToTop}
          aria-label="Kembali ke atas"
          className="fixed bottom-6 right-6 z-40 flex h-9 w-9 items-center justify-center border border-rule-strong bg-paper text-ink-muted transition-colors hover:border-accent hover:text-accent"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M12 19V5M6 11l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </>
  )
}
