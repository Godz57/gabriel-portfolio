import Image from 'next/image'
import { Link } from '@/i18n/navigation'

type CaseCardProps = {
  slug: string
  title: string
  summary: string
  stack: string[]
  cover?: string
}

export function CaseCard({ slug, title, summary, stack, cover }: CaseCardProps) {
  return (
    <Link
      href={{ pathname: '/cases/[slug]', params: { slug } }}
      className="glass-panel group flex flex-col overflow-hidden rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.45)] motion-reduce:transform-none"
    >
      <div
        aria-hidden
        className="relative h-40 w-full overflow-hidden border-b border-violet-500/10 bg-gradient-to-br from-violet-600/20 via-zinc-950 to-transparent sm:h-44"
      >
        {cover ? (
          <Image
            src={cover}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transform-none"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-mono text-3xl text-violet-500/40 transition-colors group-hover:text-violet-400/70">
              {'</>'}
            </span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-6 pt-5">
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
      </div>
    </Link>
  )
}
