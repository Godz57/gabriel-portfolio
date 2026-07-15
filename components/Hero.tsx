import Image from 'next/image'
import Link from 'next/link'

type HeroProps = {
  name: string
  tagline: string
  githubUrl: string
  /** Public path under /public. Omit to hide photo. */
  imageSrc?: string
}

export function Hero({
  name,
  tagline,
  githubUrl,
  imageSrc = '/gabriel-almeida.jpg',
}: HeroProps) {
  return (
    <section className="relative mx-auto max-w-5xl overflow-hidden px-4 py-16 sm:px-6 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-violet-600/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 left-0 h-48 w-48 rounded-full bg-violet-900/30 blur-3xl"
      />

      <div className="relative flex flex-col-reverse items-start gap-10 sm:flex-row sm:items-center sm:justify-between sm:gap-12">
        <div className="min-w-0 flex-1">
          <p className="mb-3 text-sm font-medium tracking-wide text-violet-400">
            CLI · LLM · automação real
          </p>
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
        </div>

        {imageSrc ? (
          <div className="shrink-0">
            <Image
              src={imageSrc}
              alt={name}
              width={176}
              height={176}
              priority
              className="h-36 w-36 rounded-2xl border border-zinc-800 object-cover shadow-xl shadow-violet-950/50 ring-2 ring-violet-500/35 sm:h-44 sm:w-44"
            />
          </div>
        ) : null}
      </div>
    </section>
  )
}
