import Section from './Section'
import { TechIcon } from './TechIcon'

const skillGroups = [
  {
    title: 'Frontend',
    items: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'HTML & CSS'],
  },
  {
    title: 'Backend',
    items: ['Laravel', 'Node.js', 'Express.js', 'REST API Design', 'JWT Authentication'],
  },
  {
    title: 'Database',
    items: ['MySQL', 'PostgreSQL', 'SQLite', 'Sequelize ORM', 'Redis'],
  },
  {
    title: 'AI assisted',
    items: ['AI-Assisted Development', 'Prompt Engineering', 'LLM API Integration', 'AI Workflow Automation'],
  },
  {
    title: 'Tools',
    items: ['Git & GitHub', 'Docker', 'Jest', 'Joi', 'Agile Method'],
  },
]

export default function Skills() {
  return (
    <Section id="keahlian" index="02" title="Keahlian">
      <p className="doc-prose text-ink-muted">Perangkat yang saya pakai sehari-hari, dikelompokkan per lapisan.</p>

      <dl className="mt-8 border-t border-rule">
        {skillGroups.map((group) => (
          <div
            key={group.title}
            className="grid gap-2 border-b border-rule py-5 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-8"
          >
            <dt className="text-[0.9375rem] text-ink">{group.title}</dt>
            <dd className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-muted">
              {group.items.map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5">
                  <TechIcon name={item} size={13} />
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
