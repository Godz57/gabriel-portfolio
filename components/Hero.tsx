import Image from 'next/image'
import Link from 'next/link'

type HeroProps = {
  name: string
  tagline: string
  githubUrl: string
  imageSrc?: string
}

export function Hero({
  name,
  tagline,
  githubUrl,
  imageSrc = '/gabriel-almeida.jpg',
}: HeroProps) {
  return (
    <section className="relative mx-auto max-w-4xl overflow-hidden px-4 pb-8 pt-16 text-center sm:px-6 sm:pb-10 sm:pt-20">
      {/* Ambient orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[55%] h-40 w-40 -translate-x-1/2 rounded-full bg-brand-fg/30 blur-3xl"
      />

      <div className="relative">
        <p className="mb-6 inline-flex items-center rounded-full border border-brand/40 bg-brand/30 px-3.5 py-1 text-xs font-medium tracking-wide text-brand-fg">
          CLI · LLM · AUTOMACÃO REAL
        </p>

        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl md:leading-[1.08]">
          {name}
          <span className="mt-2 block bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
            Agentes e sistemas em produção
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
          {tagline}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/cases"
            className="inline-flex items-center rounded-full bg-brand px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-brand/30 transition-colors hover:bg-brand-hover"
          >
            Ver cases
          </Link>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-medium text-zinc-200 backdrop-blur transition-colors hover:border-brand/40 hover:text-white"
          >
            GitHub
          </a>
        </div>

        {imageSrc ? (
          <div className="mt-10 flex justify-center">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-3 rounded-full bg-brand-hover/20 blur-xl"
              />
              <Image
                src={imageSrc}
                alt={name}
                width={96}
                height={96}
                priority
                className="relative h-20 w-20 rounded-full border border-white/10 object-cover shadow-xl ring-2 ring-brand/30 sm:h-24 sm:w-24"
              />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
