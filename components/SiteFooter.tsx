import Link from 'next/link'
import { ArcLogo } from '@/components/ArcLogo'

type SiteFooterProps = {
  githubUrl: string
}

export function SiteFooter({ githubUrl }: SiteFooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 mt-auto border-t border-white/5 bg-zinc-950/80">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-12 sm:flex-row sm:items-center sm:px-6">
        <div>
          <Link
            href="/"
            className="group inline-flex"
            aria-label="ARC WEB — início"
          >
            <ArcLogo variant="mark" size={28} />
          </Link>
          <p className="mt-3 text-sm text-zinc-500">
            © {year} ARC WEB · sites, agentes e automação
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
          <Link href="/#servicos" className="hover:text-violet-400">
            Serviços
          </Link>
          <Link href="/cases" className="hover:text-violet-400">
            Cases
          </Link>
          <Link href="/#escopo" className="hover:text-violet-400">
            Escopo
          </Link>
          <Link href="/#faq" className="hover:text-violet-400">
            FAQ
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
