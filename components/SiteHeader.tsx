import Link from 'next/link'

type SiteHeaderProps = {
  name: string
}

const navLinks = [
  { href: '/cases', label: 'Cases' },
  { href: '/stack', label: 'Stack' },
  { href: '/contato', label: 'Contato' },
] as const

export function SiteHeader({ name }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl border border-white/10 bg-zinc-950/70 px-4 py-3 shadow-lg shadow-black/40 backdrop-blur-xl sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight text-white transition-colors hover:text-blue-400"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400 ring-1 ring-blue-500/30">
            G
          </span>
          <span className="hidden sm:inline">{name}</span>
        </Link>
        <nav
          aria-label="Principal"
          className="flex items-center gap-1 sm:gap-2"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-2.5 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-white sm:px-3"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <span
            className="hidden font-mono text-[10px] text-zinc-600 md:inline"
            title="Command palette"
          >
            Ctrl+K
          </span>
          <Link
            href="/contato"
            className="rounded-full bg-blue-600 px-3.5 py-1.5 text-xs font-medium text-white shadow-lg shadow-blue-600/25 transition-colors hover:bg-blue-500 sm:px-4 sm:text-sm"
          >
            Fale comigo
          </Link>
        </div>
      </div>
    </header>
  )
}
