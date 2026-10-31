const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="border-t border-hairline-soft py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-sm text-faint sm:flex-row">
        <p>
          © {currentYear} <span className="text-soft">Aldy Imam Wijaya</span>
        </p>
        <p className="font-mono text-xs">React · TypeScript · Tailwind CSS</p>
      </div>
    </footer>
  )
}
