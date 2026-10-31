import { useState } from 'react'
import { asset } from '../lib/asset'
import Section from './Section'

const contacts = [
  { label: 'Email', value: 'aldyimam03@gmail.com', href: 'mailto:aldyimam03@gmail.com' },
  { label: 'GitHub', value: 'github.com/aldyimam03', href: 'https://github.com/aldyimam03' },
  { label: 'LinkedIn', value: 'linkedin.com/in/aldyimamwijaya', href: 'https://www.linkedin.com/in/aldyimamwijaya/' },
  { label: 'WhatsApp', value: 'wa.me/6287702519051', href: 'https://wa.me/6287702519051' },
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
    <Section id="kontak" index="04" title="Kontak">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
        <div className="min-w-0">
          <p className="doc-prose text-ink-muted">
            Sedang mencari developer untuk sebuah proyek? Saya terbuka untuk{' '}
            <span className="text-ink">diskusi, kolaborasi, dan kesempatan baru</span>.
          </p>

          <a
            href="mailto:aldyimam03@gmail.com"
            className="mt-6 inline-block font-display text-[clamp(1.5rem,4vw,2.125rem)] leading-tight text-ink transition-colors hover:text-accent"
          >
            aldyimam03@gmail.com
          </a>

          <dl className="mt-10 border-t border-rule">
            {contacts.map((contact) => (
              <div
                key={contact.label}
                className="grid gap-1 border-b border-rule py-3 sm:grid-cols-[6rem_minmax(0,1fr)] sm:gap-4"
              >
                <dt className="text-xs text-ink-faint sm:pt-0.5">{contact.label}</dt>
                <dd>
                  <a
                    href={contact.href}
                    target={contact.href.startsWith('http') ? '_blank' : undefined}
                    rel={contact.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="doc-link inline-block break-all py-1 text-[0.9375rem]"
                  >
                    {contact.value}
                  </a>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
            <button type="button" onClick={copyEmail} className="text-control">
              {copied ? 'Email disalin' : 'Salin email'}
            </button>
            <span role="status" aria-live="polite" className="text-xs text-ink-faint">
              {copied ? 'aldyimam03@gmail.com ada di papan klip.' : ''}
            </span>
          </div>
        </div>

        <figure className="lg:pt-1">
          <img
            src={asset('me-002.webp')}
            alt="Aldy Imam Wijaya"
            loading="lazy"
            width={800}
            height={1066}
            className="portrait h-56 w-44 border border-rule object-cover object-center lg:h-auto lg:w-full lg:aspect-[3/4]"
          />
        </figure>
      </div>
    </Section>
  )
}
