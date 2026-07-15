import Link from 'next/link'

type CaseCardProps = {
  slug: string
  title: string
  summary: string
  stack: string[]
}

export function CaseCard({ slug, title, summary, stack }: CaseCardProps) {
  return (
    <Link
      href={`/cases/${slug}`}
      className="group flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 transition-colors hover:border-violet-500/50 hover:bg-zinc-900/80"
    >
      <h3 className="text-lg font-semibold tracking-tight text-zinc-50 group-hover:text-violet-300">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">{summary}</p>
      {stack.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {stack.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-zinc-700/80 bg-zinc-950/60 px-2 py-0.5 text-xs text-zinc-400"
            >
              {tech}
            </li>
          ))}
        </ul>
      ) : null}
    </Link>
  )
}
