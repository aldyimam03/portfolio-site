import { asset } from '../lib/asset'

const stack = ['Laravel', 'Node.js', 'React', 'TypeScript', 'PostgreSQL', 'Docker']

export default function Hero() {
  return (
    <section id="beranda" className="scroll-mt-16">
      <div className="mx-auto w-full max-w-[78rem] px-6 pb-16 pt-28 md:px-10 md:pb-24 md:pt-36">
        {/*
          Di layar sempit urutannya: nama -> foto -> keterangan. Foto kecil di
          dekat nama berfungsi seperti foto penulis, bukan hiasan di ujung
          halaman. Di layar lebar foto pindah ke kolom margin kanan.
        */}
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_13rem] md:items-end md:gap-x-16 md:gap-y-10 lg:grid-cols-[minmax(0,1fr)_15rem]">
          <div className="order-1 min-w-0">
            <p className="flex items-center gap-2.5 text-[0.8125rem] text-ink-muted">
              <span aria-hidden="true" className="inline-block h-1.5 w-1.5 shrink-0 bg-accent" />
              Terbuka untuk pekerjaan penuh waktu dan proyek lepas
            </p>

            <h1 className="mt-5 text-balance text-[clamp(2.5rem,7vw,4.75rem)] leading-[1.02] tracking-[-0.02em]">
              Aldy Imam Wijaya
            </h1>

            <p className="mt-5 text-lg text-ink md:text-xl">Software engineer. Full-stack, web, dan backend.</p>
          </div>

          <figure className="order-2 md:col-start-2 md:row-span-2 md:row-start-1 md:self-end md:justify-self-end">
            <img
              src={asset('me-001.webp')}
              alt="Aldy Imam Wijaya"
              fetchPriority="high"
              width={472}
              height={528}
              className="portrait h-40 w-32 border border-rule object-cover object-top md:h-auto md:w-full md:aspect-[4/5]"
            />
          </figure>

          <div className="order-3 min-w-0">
            <p className="doc-prose text-ink-muted">
              Saya mengerjakan aplikasi web dari rancangan database dan API sampai antarmuka yang dipakai orang setiap
              hari.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a
                href="#proyek"
                className="rounded-[2px] bg-accent px-5 py-2.5 text-[0.9375rem] font-medium text-on-accent transition-colors hover:bg-accent-strong"
              >
                Lihat proyek
              </a>
              <a
                href={asset('cv-aldy-imam-wijaya.pdf')}
                download="Aldy-Imam-Wijaya-CV.pdf"
                className="doc-link text-[0.9375rem]"
              >
                Unduh CV
              </a>
              <a href="mailto:aldyimam03@gmail.com" className="doc-link text-[0.9375rem]">
                aldyimam03@gmail.com
              </a>
            </div>

            <dl className="mt-12 border-t border-rule pt-4 text-[0.8125rem] text-ink-faint">
              <dt className="sr-only">Stack utama</dt>
              <dd className="num">{stack.join(' · ')}</dd>
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
