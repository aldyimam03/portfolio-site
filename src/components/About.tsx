import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const highlights = [
  {
    title: 'Backend yang kokoh',
    desc: 'Rancangan database, REST API, autentikasi JWT, validasi, hingga keamanan (Helmet, rate limiting, magic link/OTP).',
  },
  {
    title: 'Frontend modern',
    desc: 'Antarmuka responsif dengan React, TypeScript, dan Tailwind CSS — mobile-first.',
  },
  {
    title: 'Disiplin engineering',
    desc: 'Dokumentasi arsitektur (PRD, ADR), migrasi database, test otomatis, dan commit yang terstruktur.',
  },
]

export default function About() {
  return (
    <section id="tentang" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24">
      <SectionHeading index="01" title="Tentang Saya" />

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <Reveal className="space-y-4 text-base leading-relaxed text-muted">
          <p>
            Saya suka membangun aplikasi web dan melihat bagaimana sebuah ide bisa berubah menjadi sesuatu yang{' '}
            <span className="text-body">benar-benar bisa digunakan</span>.
          </p>
          <p>
            Biasanya, saya terlibat dari awal hingga akhir, mulai dari{' '}
            <span className="text-body">merancang database</span> dan <span className="text-body">membangun API</span>,
            sampai <span className="text-body">mengembangkan tampilan</span> yang nyaman digunakan. Sehari-hari, saya
            banyak bekerja dengan <span className="text-body">Laravel</span>, <span className="text-body">Node.js</span>
            , <span className="text-body">React</span>, dan <span className="text-body">TypeScript</span>.
          </p>
          <p>
            Bagi saya, membuat aplikasi bukan cuma soal <span className="text-body">memastikan semuanya berjalan</span>,
            tetapi juga <span className="text-body">bagaimana membuatnya mudah dipahami</span>,{' '}
            <span className="text-body">bisa diandalkan</span>, dan <span className="text-body">siap digunakan</span>.
            Karena itu, saya berusaha <span className="text-body">menyelesaikan setiap proyek dengan baik</span>, mulai
            dari <span className="text-body">proses pengembangan</span> hingga{' '}
            <span className="text-body">pengujian</span> dan <span className="text-body">dokumentasi</span>.
          </p>
        </Reveal>

        <Reveal className="grid gap-4 sm:grid-cols-1" delay={120}>
          {highlights.map((h) => (
            <div
              key={h.title}
              className="rounded-xl border border-hairline bg-surface p-5 transition hover:border-accent-line hover:bg-surface-strong"
            >
              <h3 className="font-semibold text-ink">{h.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{h.desc}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
