const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex w-full max-w-[78rem] flex-col gap-2 px-6 py-8 text-xs text-ink-faint md:flex-row md:items-baseline md:justify-between md:px-10">
        <p>© {currentYear} Aldy Imam Wijaya</p>
        <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="num">React · TypeScript · Tailwind CSS</span>
          <a
            href="https://github.com/aldyimam03/portfolio-site"
            target="_blank"
            rel="noreferrer"
            className="doc-link inline-block py-1"
          >
            Kode sumber
          </a>
        </p>
      </div>
    </footer>
  )
}
