import Section from './Section'

const highlights = [
  {
    title: 'Backend yang kokoh',
    desc: 'Rancangan database, REST API, autentikasi JWT, validasi, sampai keamanan: Helmet, rate limiting, magic link dan OTP.',
  },
  {
    title: 'Frontend modern',
    desc: 'Antarmuka responsif dengan React, TypeScript, dan Tailwind CSS, dikerjakan mobile-first.',
  },
  {
    title: 'Disiplin engineering',
    desc: 'Dokumentasi arsitektur (PRD, ADR), migrasi database, test otomatis, dan riwayat commit yang terstruktur.',
  },
]

export default function About() {
  return (
    <Section id="tentang" index="01" title="Tentang">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-16">
        <div>
          <p className="doc-prose text-ink-muted">
            Saya suka membangun aplikasi web dan melihat bagaimana sebuah ide berubah menjadi sesuatu yang{' '}
            <span className="text-ink">benar-benar bisa digunakan</span>.
          </p>
          <p className="doc-prose text-ink-muted">
            Biasanya saya terlibat dari awal sampai akhir: <span className="text-ink">merancang database</span>,{' '}
            <span className="text-ink">membangun API</span>, sampai{' '}
            <span className="text-ink">mengembangkan tampilan</span> yang nyaman dipakai. Sehari-hari saya bekerja
            dengan <span className="text-ink">Laravel</span>, <span className="text-ink">Node.js</span>,{' '}
            <span className="text-ink">React</span>, dan <span className="text-ink">TypeScript</span>.
          </p>
          <p className="doc-prose text-ink-muted">
            Bagi saya, membuat aplikasi bukan cuma soal memastikan semuanya berjalan, tetapi juga bagaimana membuatnya
            mudah dipahami, bisa diandalkan, dan siap digunakan.
          </p>
        </div>

        <dl className="border-t border-rule lg:mt-1">
          {highlights.map((item) => (
            <div key={item.title} className="border-b border-rule py-4">
              <dt className="text-[0.9375rem] text-ink">{item.title}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-ink-muted">{item.desc}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
