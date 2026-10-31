import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { TechBadge, TechIcon } from './TechIcon'

const skillGroups = [
  {
    title: 'Frontend',
    icon: 'Frontend',
    items: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'HTML & CSS'],
  },
  {
    title: 'Backend',
    icon: 'Backend',
    items: ['Laravel', 'Node.js', 'Express.js', 'REST API Design', 'JWT Authentication'],
  },
  {
    title: 'Database',
    icon: 'Database',
    items: ['MySQL', 'PostgreSQL', 'SQLite', 'Sequelize ORM', 'Redis'],
  },
  {
    title: 'AI Assisted',
    icon: 'AI Assisted',
    items: ['AI-Assisted Development', 'Prompt Engineering', 'LLM API Integration', 'AI Workflow Automation'],
  },
  {
    title: 'Tools',
    icon: 'Tools',
    items: ['Git & GitHub', 'Docker', 'Jest', 'Joi', 'Agile Method'],
  },
]

export default function Skills() {
  return (
    <section id="keahlian" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24">
      <SectionHeading index="02" title="Keahlian" />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {skillGroups.map((group, index) => (
          <Reveal key={group.title} delay={index * 80}>
            <div
              className={`h-full rounded-xl border bg-surface p-6 transition hover:-translate-y-1 hover:bg-surface-strong ${
                group.title === 'AI Assisted'
                  ? 'border-mint/30 shadow-lg shadow-mint/10 hover:border-mint/55'
                  : 'border-hairline hover:border-accent-line'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-hairline bg-surface-soft">
                  <TechIcon name={group.icon} size={19} />
                </span>
                <h3 className="font-semibold text-ink">{group.title}</h3>
              </div>
              <ul className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <TechBadge name={item} />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
