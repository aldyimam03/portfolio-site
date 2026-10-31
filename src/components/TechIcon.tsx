import { TECH_PATHS } from './tech-icons'

/**
 * Nama teknologi -> slug Simple Icons (CC0). Ikon digambar satu warna
 * (currentColor) supaya tetap di dalam palet tiga warna DESIGN.md; merek
 * dikenali dari bentuk, bukan dari warna.
 */
const SLUGS: Record<string, string> = {
  laravel: 'laravel',
  php: 'php',
  blade: 'laravel',
  laravelmix: 'webpack',
  phpspreadsheet: 'php',
  inertiajs: 'inertia',
  react: 'react',
  typescript: 'typescript',
  tailwindcss: 'tailwindcss',
  postgresql: 'postgresql',
  redis: 'redis',
  docker: 'docker',
  laravelsanctum: 'laravel',
  rabbitmq: 'rabbitmq',
  axios: 'axios',
  bootstrap: 'bootstrap',
  scss: 'sass',
  nodejs: 'nodedotjs',
  expressjs: 'express',
  mysql: 'mysql',
  jwt: 'jsonwebtokens',
  jwtauthentication: 'jsonwebtokens',
  sequelize: 'sequelize',
  sequelizeorm: 'sequelize',
  sqlite: 'sqlite',
  jest: 'jest',
  jesttesting: 'jest',
  vite: 'vite',
  htmlcss: 'html5',
  github: 'github',
  gitgithub: 'github',
  database: 'mysql',
  tools: 'git',
  toolspractices: 'git',
  ai: 'claude',
  aiassisted: 'claude',
  aiautomation: 'claude',
  aiassisteddevelopment: 'claude',
}

/** Cadangan bila slug tidak ada: potongan teks, bukan ikon generik. */
const GLYPHS: Record<string, string> = {
  sqlserver: 'SQL',
  laravelexcel: 'XLS',
  joi: 'J',
  joivalidation: 'J',
  helmet: 'H',
  bcryptjs: 'B',
  restapidesign: 'API',
  promptengineering: 'P',
  llmapiintegration: 'LLM',
  aiworkflowautomation: 'AI',
  automationworkflow: 'AI',
  agile: 'AG',
  agilephasebaseddelivery: 'AG',
  frontend: '</>',
  backend: '{}',
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '')
}

interface TechIconProps {
  name: string
  size?: number
  className?: string
}

export function TechIcon({ name, size = 16, className = '' }: TechIconProps) {
  const key = normalize(name)
  const slug = SLUGS[key]
  const path = slug ? TECH_PATHS[slug] : undefined
  const glyph = GLYPHS[key] ?? name.slice(0, 2).toUpperCase()

  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center text-ink-faint ${className}`}
      style={{ width: size, height: size }}
    >
      {path ? (
        <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} focusable="false">
          <path d={path.d} />
        </svg>
      ) : (
        <span className="font-sans leading-none" style={{ fontSize: Math.max(8, Math.round(size * 0.72)) }}>
          {glyph}
        </span>
      )}
    </span>
  )
}
