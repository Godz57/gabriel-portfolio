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
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#05060a] to-transparent sm:w-40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#05060a] to-transparent sm:w-40"
      />

      <div className="relative mx-auto max-w-3xl">
        {imageSrc ? (
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-2 rounded-full bg-violet-500/20 blur-xl"
              />
              <Image
                src={imageSrc}
                alt={name}
                width={88}
                height={88}
                priority
                className="relative h-16 w-16 rounded-full border border-white/10 object-cover shadow-xl ring-2 ring-violet-500/30 sm:h-20 sm:w-20"
              />
            </div>
          </div>
        ) : null}

        <p className="text-sm font-medium text-zinc-400 sm:text-base">
          {name}
          <span className="text-zinc-600"> · </span>
          <span className="text-violet-300/90">ARC WEB</span>
        </p>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl sm:leading-[1.12] md:text-[3.25rem]">
          Sites, agentes e automações
          <span className="mt-1 block bg-gradient-to-b from-zinc-100 to-zinc-500 bg-clip-text text-transparent">
            do skill ao bot em produção
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
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
      </div>
    </section>
  )
}
