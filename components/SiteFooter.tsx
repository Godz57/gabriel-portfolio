import Link from 'next/link'

type SiteFooterProps = {
  name: string
  githubUrl: string
}

export function SiteFooter({ name, githubUrl }: SiteFooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 mt-auto border-t border-white/5 bg-zinc-950/80">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-12 sm:flex-row sm:items-center sm:px-6">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-white">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600/20 text-violet-400 ring-1 ring-violet-500/30">
              G
            </span>
            {name}
          </p>
          <p className="mt-2 text-sm text-zinc-500">
            © {year} · CLI · LLM · automação real
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
          <Link href="/#servicos" className="hover:text-violet-400">
            Serviços
          </Link>
          <Link href="/cases" className="hover:text-violet-400">
            Cases
          </Link>
          <Link href="/stack" className="hover:text-violet-400">
            Stack
          </Link>
          <Link href="/contato" className="hover:text-violet-400">
            Contato
          </Link>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-violet-400"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
