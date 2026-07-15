import Link from 'next/link'

type HeroProps = {
  name: string
  tagline: string
  githubUrl: string
}

export function Hero({ name, tagline, githubUrl }: HeroProps) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
        {name}
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
        {tagline}
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Link
          href="/cases"
          className="inline-flex items-center rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-500"
        >
          Ver cases
        </Link>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-lg border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-violet-500 hover:text-violet-400"
        >
          GitHub
        </a>
      </div>
    </section>
  )
}
