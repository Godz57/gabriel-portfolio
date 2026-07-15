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
    <section className="relative overflow-hidden px-4 pb-8 pt-16 text-center sm:px-6 sm:pb-10 sm:pt-20">
      <div className="hero-beams" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[20%] h-[480px] w-[min(100%,640px)] -translate-x-1/2 rounded-full bg-violet-600/25 blur-[110px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[48%] h-48 w-48 -translate-x-1/2 rounded-full bg-violet-400/25 blur-3xl"
      />
      {/* Side vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#05060a] to-transparent sm:w-40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#05060a] to-transparent sm:w-40"
      />

      <div className="relative mx-auto max-w-4xl">
        <p className="mb-6 inline-flex items-center rounded-full border border-violet-500/25 bg-violet-500/10 px-3.5 py-1 text-xs font-medium tracking-wide text-violet-300">
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
            className="inline-flex items-center rounded-full bg-violet-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-600/30 transition-colors hover:bg-violet-500"
          >
            Ver cases
          </Link>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-medium text-zinc-200 backdrop-blur transition-colors hover:border-violet-500/40 hover:text-white"
          >
            GitHub
          </a>
        </div>

        {imageSrc ? (
          <div className="mt-10 flex justify-center">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-3 rounded-full bg-violet-500/20 blur-xl"
              />
              <Image
                src={imageSrc}
                alt={name}
                width={96}
                height={96}
                priority
                className="relative h-20 w-20 rounded-full border border-white/10 object-cover shadow-xl ring-2 ring-violet-500/30 sm:h-24 sm:w-24"
              />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
