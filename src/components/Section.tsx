import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  index: string
  title: string
  children: ReactNode
}

/**
 * Kerangka bagian halaman: margin kiri bernomor seperti lembar spesifikasi,
 * konten di kolom kanan dengan lebar baca terbatas. Motif ini yang menyatukan
 * seluruh halaman (lihat DESIGN.md).
 */
export default function Section({ id, index, title, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-16 border-t border-rule">
      <div className="mx-auto w-full max-w-[78rem] px-6 py-16 md:px-10 md:py-24">
        <div className="md:grid md:grid-cols-[7rem_minmax(0,1fr)] md:gap-12 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-16">
          <div className="mb-8 md:sticky md:top-24 md:mb-0 md:self-start">
            <p className="num text-xs text-ink-faint">{index}</p>
            <h2 className="mt-2 text-2xl md:text-[1.65rem]">{title}</h2>
          </div>
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </section>
  )
}
