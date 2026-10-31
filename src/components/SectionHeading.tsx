interface Props {
  index: string
  title: string
}

export default function SectionHeading({ index, title }: Props) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-sm text-accent">{index}</span>
      <h2 className="text-3xl font-bold tracking-tight text-ink">{title}</h2>
      <span aria-hidden className="hidden" />
    </div>
  )
}
