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
        <Reveal className="space-y-4 text-base leading-relaxed text-slate-400">
          <p>
            Saya suka membangun aplikasi web dan melihat bagaimana sebuah ide bisa berubah menjadi sesuatu yang{' '}
            <span className="text-slate-200">benar-benar bisa digunakan</span>.
          </p>
          <p>
            Biasanya, saya terlibat dari awal hingga akhir, mulai dari{' '}
            <span className="text-slate-200">merancang database</span> dan{' '}
            <span className="text-slate-200">membangun API</span>, sampai{' '}
            <span className="text-slate-200">mengembangkan tampilan</span> yang nyaman digunakan.
            Sehari-hari, saya banyak bekerja dengan{' '}
            <span className="text-slate-200">Laravel</span>,{' '}
            <span className="text-slate-200">Node.js</span>,{' '}
            <span className="text-slate-200">React</span>, dan{' '}
            <span className="text-slate-200">TypeScript</span>.
          </p>
          <p>
            Bagi saya, membuat aplikasi bukan cuma soal{' '}
            <span className="text-slate-200">memastikan semuanya berjalan</span>, tetapi juga{' '}
            <span className="text-slate-200">bagaimana membuatnya mudah dipahami</span>,{' '}
            <span className="text-slate-200">bisa diandalkan</span>, dan{' '}
            <span className="text-slate-200">siap digunakan</span>.
            Karena itu, saya berusaha{' '}
            <span className="text-slate-200">menyelesaikan setiap proyek dengan baik</span>, mulai dari{' '}
            <span className="text-slate-200">proses pengembangan</span> hingga{' '}
            <span className="text-slate-200">pengujian</span> dan{' '}
            <span className="text-slate-200">dokumentasi</span>.
          </p>
        </Reveal>

        <Reveal className="grid gap-4 sm:grid-cols-1" delay={120}>
          {highlights.map((h) => (
            <div
              key={h.title}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-indigo-500/40 hover:bg-white/[0.06]"
            >
              <h3 className="font-semibold text-white">{h.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{h.desc}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}