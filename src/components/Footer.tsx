const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-sm text-slate-500 sm:flex-row">
        <p>
          © {currentYear} <span className="text-slate-300">Aldy Imam Wijaya</span>
        </p>
        <p className="font-mono text-xs">
          · TypeScript · Tailwind CSS
        </p>
      </div>
    </footer>
  )
}