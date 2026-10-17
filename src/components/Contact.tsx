import { useState } from 'react'
import SectionHeading from './SectionHeading'

const contacts = [
  {
    label: 'Email',
    value: 'aldyimam03@gmail.com',
    href: 'mailto:aldyimam03@gmail.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'github.com/aldyimam03',
    href: 'https://github.com/aldyimam03',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 2.87-.39c.97 0 1.95.13 2.87.39 2.18-1.49 3.14-1.18 3.14-1.18.63 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.26 5.66.41.36.78 1.05.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.2.67.8.55A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/aldyimamwijaya',
    href: 'https://www.linkedin.com/in/aldyimamwijaya/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M5.2 3.4A2.2 2.2 0 1 1 .8 3.4a2.2 2.2 0 0 1 4.4 0ZM1.1 8.1h4.2V23H1.1V8.1ZM7.9 8.1h4v2h.1c.6-1.1 2-2.3 4.2-2.3 4.5 0 5.3 3 5.3 6.9V23h-4.2v-7.4c0-1.8 0-4.1-2.5-4.1s-2.9 2-2.9 4V23H7.9V8.1Z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    value: 'wa.me/6287702519051',
    href: 'https://wa.me/6287702519051',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.1 1.6 5.8L.2 24l6.6-1.7a11.8 11.8 0 0 0 5.3 1.3h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.3-6.1-3.5-8.3ZM12.1 21.5h-.1a9.7 9.7 0 0 1-4.9-1.3l-.4-.2-3.9 1 1-3.8-.3-.4a9.7 9.7 0 0 1-1.5-5.1c0-5.4 4.4-9.8 9.9-9.8 2.6 0 5.1 1 6.9 2.9a9.7 9.7 0 0 1 2.9 6.9c-.1 5.4-4.5 9.8-9.6 9.8Zm5.4-7.3c-.3-.1-1.8-.9-2.1-1-.3-.1-.5-.1-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.5-.7-2.5-1.2-3.5-2.7-.3-.5.3-.5.8-1.7.1-.2 0-.4 0-.5s-.7-1.7-.9-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.8 4.3 1.8.8 2.5.9 3.4.8.5-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.3-.3-.4-.5-.5Z" />
      </svg>
    ),
  },
]

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('aldyimam03@gmail.com')
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = 'mailto:aldyimam03@gmail.com'
    }
  }

  return (
    <section id="kontak" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24">
      <SectionHeading index="04" title="Kontak" />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <p className="text-base text-justify leading-relaxed text-slate-400">
            Sedang mencari developer untuk sebuah proyek? Saya terbuka untuk{' '}
            <span className="text-slate-200">diskusi, kolaborasi, dan kesempatan baru</span>.
            Jangan ragu untuk menghubungi saya pada kontak yang tersedia
          </p>
          <div className="flex flex-col gap-3 pt-2">
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
                className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-indigo-500/40 hover:bg-white/[0.06]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-300 transition group-hover:bg-indigo-500/25">
                  {c.icon}
                </span>
                <span>
                  <span className="block font-mono text-[11px] uppercase tracking-wider text-slate-500">
                    {c.label}
                  </span>
                  <span className="block text-sm font-medium text-slate-200 group-hover:text-white">
                    {c.value}
                  </span>
                </span>
              </a>
            ))}
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 text-sm text-slate-300 transition hover:border-indigo-400/50 hover:bg-indigo-500/10 hover:text-white"
            >
              {copied ? (
                <>
                  <span className="text-emerald-400">✓</span> Email disalin
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="9" y="9" width="10" height="10" rx="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  Salin email
                </>
              )}
            </button>
          </div>
        </div>

        <figure className="flex items-center justify-center">
          <img
            src="/me-002.png"
            alt="Foto Aldy Imam Wijaya"
            loading="lazy"
            className="w-full max-w-sm rounded-xl border border-white/10 object-cover shadow-xl shadow-slate-950/40"
          />
        </figure>
      </div>
    </section>
  )
}