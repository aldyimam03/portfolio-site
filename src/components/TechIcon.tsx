import { TECH_PATHS } from './tech-icons'

/**
 * Peta nama teknologi -> ikon.
 * `slug` merujuk ke data path di ./tech-icons.ts (Simple Icons, CC0).
 * Bila `slug` tidak ada, komponen jatuh ke glyph teks agar tetap ada penanda visual.
 */
type IconDefinition = {
  slug?: string
  color: string
  glyph: string
}

const iconDefinitions: Record<string, IconDefinition> = {
  laravel: { slug: 'laravel', color: '#FF2D20', glyph: 'L' },
  php: { slug: 'php', color: '#777BB4', glyph: 'PHP' },
  blade: { slug: 'laravel', color: '#FF2D20', glyph: 'B' },
  sqlserver: { color: '#F87171', glyph: 'SQL' },
  laravelmix: { slug: 'webpack', color: '#8DD6F9', glyph: 'M' },
  laravelexcel: { color: '#4ADE80', glyph: 'XLS' },
  phpspreadsheet: { slug: 'php', color: '#777BB4', glyph: 'XLS' },
  inertiajs: { slug: 'inertia', color: '#9553E9', glyph: 'I' },
  react: { slug: 'react', color: '#61DAFB', glyph: 'R' },
  typescript: { slug: 'typescript', color: '#3178C6', glyph: 'TS' },
  tailwindcss: { slug: 'tailwindcss', color: '#06B6D4', glyph: 'TW' },
  postgresql: { slug: 'postgresql', color: '#4169E1', glyph: 'PG' },
  redis: { slug: 'redis', color: '#DC382D', glyph: 'R' },
  docker: { slug: 'docker', color: '#2496ED', glyph: 'D' },
  laravelsanctum: { slug: 'laravel', color: '#FF2D20', glyph: 'S' },
  rabbitmq: { slug: 'rabbitmq', color: '#FF8A3D', glyph: 'MQ' },
  axios: { slug: 'axios', color: '#A78BFA', glyph: 'A' },
  bootstrap: { slug: 'bootstrap', color: '#C4B5FD', glyph: 'B' },
  scss: { slug: 'sass', color: '#F0A6CA', glyph: 'SCSS' },
  nodejs: { slug: 'nodedotjs', color: '#83CD29', glyph: 'JS' },
  expressjs: { slug: 'express', color: '#D97757', glyph: 'Ex' },
  mysql: { slug: 'mysql', color: '#4479A1', glyph: 'SQL' },
  jwt: { slug: 'jsonwebtokens', color: '#D97757', glyph: 'JWT' },
  joi: { color: '#BBA7E3', glyph: 'J' },
  helmet: { color: '#F5C542', glyph: 'H' },
  bcryptjs: { color: '#8B5CF6', glyph: 'B' },
  sequelize: { slug: 'sequelize', color: '#52B0E7', glyph: 'S' },
  sqlite: { slug: 'sqlite', color: '#70B7D8', glyph: 'DB' },
  jest: { slug: 'jest', color: '#C21325', glyph: 'J' },
  jesttesting: { slug: 'jest', color: '#C21325', glyph: 'J' },
  joivalidation: { color: '#BBA7E3', glyph: 'J' },
  sequelizeorm: { slug: 'sequelize', color: '#52B0E7', glyph: 'S' },
  agilephasebaseddelivery: { color: '#34D399', glyph: '↗' },
  vite: { slug: 'vite', color: '#A78BFA', glyph: 'V' },
  htmlcss: { slug: 'html5', color: '#E34F26', glyph: '</>' },
  restapidesign: { color: '#38BDF8', glyph: 'API' },
  jwtauthentication: { slug: 'jsonwebtokens', color: '#D97757', glyph: 'JWT' },
  github: { slug: 'github', color: 'var(--soft)', glyph: 'GH' },
  gitgithub: { slug: 'github', color: 'var(--soft)', glyph: 'GH' },
  agile: { color: '#34D399', glyph: '↗' },
  frontend: { color: '#E0724E', glyph: '</>' },
  backend: { color: '#FBBF24', glyph: '{}' },
  database: { slug: 'mysql', color: '#4479A1', glyph: 'DB' },
  tools: { slug: 'git', color: '#F05032', glyph: '⚒' },
  toolspractices: { slug: 'git', color: '#F05032', glyph: '⚒' },
  ai: { slug: 'claude', color: '#D97757', glyph: 'AI' },
  aiassisted: { slug: 'claude', color: '#D97757', glyph: 'AI' },
  aiautomation: { slug: 'claude', color: '#D97757', glyph: 'AI' },
  aiassisteddevelopment: { slug: 'claude', color: '#D97757', glyph: 'AI' },
  promptengineering: { color: '#A78BFA', glyph: 'P' },
  llmapiintegration: { color: '#38BDF8', glyph: 'LLM' },
  aiworkflowautomation: { color: '#34D399', glyph: '↗' },
  automationworkflow: { color: '#34D399', glyph: '↗' },
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '')
}

function getDefinition(name: string): IconDefinition {
  const key = normalize(name)
  return (
    iconDefinitions[key] ?? {
      color: 'var(--muted)',
      glyph: name.slice(0, 2).toUpperCase(),
    }
  )
}

interface TechIconProps {
  name: string
  size?: number
  className?: string
}

export function TechIcon({ name, size = 16, className = '' }: TechIconProps) {
  const definition = getDefinition(name)
  const path = definition.slug ? TECH_PATHS[definition.slug] : undefined

  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center ${className}`}
      style={{ width: size, height: size, color: definition.color }}
    >
      {path ? (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          width={size}
          height={size}
          className="h-full w-full"
          focusable="false"
        >
          <path d={path.d} />
        </svg>
      ) : (
        <span className="font-mono font-bold leading-none" style={{ fontSize: Math.max(8, Math.round(size * 0.48)) }}>
          {definition.glyph}
        </span>
      )}
    </span>
  )
}

export function TechBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded border border-hairline bg-surface-soft px-2 py-0.5 font-mono text-[11px] text-soft">
      <TechIcon name={name} size={14} />
      {name}
    </span>
  )
}
