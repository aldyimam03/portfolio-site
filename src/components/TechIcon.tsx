import { useState } from 'react'

type IconDefinition = {
  src?: string
  color: string
  glyph: string
}

const iconDefinitions: Record<string, IconDefinition> = {
  laravel: { src: 'https://cdn.simpleicons.org/laravel/FF2D20', color: '#FF2D20', glyph: 'L' },
  php: { src: 'https://cdn.simpleicons.org/php/777BB4', color: '#A5B4FC', glyph: 'PHP' },
  blade: { src: 'https://cdn.simpleicons.org/laravel/FF2D20', color: '#FF2D20', glyph: 'B' },
  sqlserver: { src: 'https://cdn.simpleicons.org/microsoftsqlserver/CC2927', color: '#F87171', glyph: 'SQL' },
  laravelmix: { src: 'https://cdn.simpleicons.org/webpack/8DD6F9', color: '#8DD6F9', glyph: 'M' },
  laravelexcel: { src: 'https://cdn.simpleicons.org/microsoftexcel/217346', color: '#4ADE80', glyph: 'XLS' },
  phpspreadsheet: { src: 'https://cdn.simpleicons.org/php/777BB4', color: '#A5B4FC', glyph: 'XLS' },
  inertiajs: { src: 'https://cdn.simpleicons.org/inertia/9553E9', color: '#9553E9', glyph: 'I' },
  react: { src: 'https://cdn.simpleicons.org/react/61DAFB', color: '#61DAFB', glyph: 'R' },
  typescript: { src: 'https://cdn.simpleicons.org/typescript/3178C6', color: '#3178C6', glyph: 'TS' },
  tailwindcss: { src: 'https://cdn.simpleicons.org/tailwindcss/06B6D4', color: '#06B6D4', glyph: 'TW' },
  postgresql: { src: 'https://cdn.simpleicons.org/postgresql/4169E1', color: '#4169E1', glyph: 'PG' },
  redis: { src: 'https://cdn.simpleicons.org/redis/DC382D', color: '#DC382D', glyph: 'R' },
  docker: { src: 'https://cdn.simpleicons.org/docker/2496ED', color: '#2496ED', glyph: 'D' },
  laravelsanctum: { src: 'https://cdn.simpleicons.org/laravel/FF2D20', color: '#FF2D20', glyph: 'S' },
  rabbitmq: { src: 'https://cdn.simpleicons.org/rabbitmq/FF6600', color: '#FF8A3D', glyph: 'MQ' },
  axios: { src: 'https://cdn.simpleicons.org/axios/5A29E4', color: '#A78BFA', glyph: 'A' },
  bootstrap: { src: 'https://cdn.simpleicons.org/bootstrap/7952B3', color: '#C4B5FD', glyph: 'B' },
  scss: { src: 'https://cdn.simpleicons.org/sass/CC6699', color: '#F0A6CA', glyph: 'SCSS' },
  nodejs: { src: 'https://cdn.simpleicons.org/nodedotjs/339933', color: '#83CD29', glyph: 'JS' },
  expressjs: { src: 'https://cdn.simpleicons.org/express/FFFFFF', color: '#FFFFFF', glyph: 'Ex' },
  mysql: { src: 'https://cdn.simpleicons.org/mysql/4479A1', color: '#4479A1', glyph: 'SQL' },
  jwt: { src: 'https://cdn.simpleicons.org/jsonwebtokens/FFFFFF', color: '#FFFFFF', glyph: 'JWT' },
  joi: { src: 'https://cdn.simpleicons.org/joi/6B5B95', color: '#BBA7E3', glyph: 'J' },
  helmet: { color: '#F5C542', glyph: 'H' },
  bcryptjs: { color: '#8B5CF6', glyph: 'B' },
  sequelize: { src: 'https://cdn.simpleicons.org/sequelize/52B0E7', color: '#52B0E7', glyph: 'S' },
  sqlite: { src: 'https://cdn.simpleicons.org/sqlite/003B57', color: '#70B7D8', glyph: 'DB' },
  jest: { src: 'https://cdn.simpleicons.org/jest/C21325', color: '#C21325', glyph: 'J' },
  jesttesting: { src: 'https://cdn.simpleicons.org/jest/C21325', color: '#C21325', glyph: 'J' },
  joivalidation: { color: '#BBA7E3', glyph: 'J' },
  sequelizeorm: { src: 'https://cdn.simpleicons.org/sequelize/52B0E7', color: '#52B0E7', glyph: 'S' },
  agilephasebaseddelivery: { color: '#34D399', glyph: '↗' },
  vite: { src: 'https://cdn.simpleicons.org/vite/646CFF', color: '#A78BFA', glyph: 'V' },
  htmlcss: { src: 'https://cdn.simpleicons.org/html5/E34F26', color: '#E34F26', glyph: '</>' },
  restapidesign: { color: '#38BDF8', glyph: 'API' },
  jwtauthentication: { src: 'https://cdn.simpleicons.org/jsonwebtokens/FFFFFF', color: '#FFFFFF', glyph: 'JWT' },
  gitgithub: { src: 'https://cdn.simpleicons.org/github/FFFFFF', color: '#FFFFFF', glyph: 'GH' },
  agile: { color: '#34D399', glyph: '↗' },
  frontend: { color: '#F472B6', glyph: '</>' },
  backend: { color: '#FBBF24', glyph: '{}' },
  database: { color: '#60A5FA', glyph: 'DB' },
  toolspractices: { color: '#A78BFA', glyph: '⚒' },
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '')
}

function getDefinition(name: string): IconDefinition {
  const key = normalize(name)
  return (
    iconDefinitions[key] ?? {
      color: '#94A3B8',
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
  const [failed, setFailed] = useState(false)
  const definition = getDefinition(name)

  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center ${className}`}
      style={{ width: size, height: size, color: definition.color }}
    >
      {definition.src && !failed ? (
        <img
          src={definition.src}
          alt=""
          width={size}
          height={size}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-contain"
        />
      ) : (
        <span
          className="font-mono font-bold leading-none"
          style={{ fontSize: Math.max(8, Math.round(size * 0.48)) }}
        >
          {definition.glyph}
        </span>
      )}
    </span>
  )
}

export function TechBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded bg-white/5 px-2 py-0.5 font-mono text-[11px] text-slate-300">
      <TechIcon name={name} size={14} />
      {name}
    </span>
  )
}
