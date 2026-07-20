import { Link } from '@/i18n/navigation'

type CaseCardProps = {
  slug: string
  title: string
  summary: string
  stack: string[]
}

export function CaseCard({ slug, title, summary, stack }: CaseCardProps) {
  return (
    <Link
      href={{ pathname: '/cases/[slug]', params: { slug } }}
      className="glass-panel group flex flex-col rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.45)] motion-reduce:transform-none"
    >
      <div
        aria-hidden
        className="mb-5 flex h-28 items-center justify-center rounded-xl border border-violet-500/10 bg-gradient-to-br from-violet-600/15 via-transparent to-transparent"
      >
        <span className="font-mono text-3xl text-violet-500/40 transition-colors group-hover:text-violet-400/70">
          {'</>'}
        </span>
      </div>
      <h3 className="text-lg font-semibold tracking-tight text-white group-hover:text-violet-200">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
        {summary}
      </p>
      {stack.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-zinc-400"
            >
              {tech}
            </li>
          ))}
        </ul>
      ) : null}
    </Link>
  )
}
