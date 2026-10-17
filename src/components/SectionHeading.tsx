interface Props {
  index: string
  title: string
}

export default function SectionHeading({ index, title }: Props) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-sm text-indigo-400">{index}</span>
      <h2 className="text-3xl font-bold tracking-tight text-white">{title}</h2>
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
    </div>
  )
}