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
    <header className="border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-zinc-100 transition-colors hover:text-violet-400"
        >
          {name}
        </Link>
        <nav aria-label="Principal" className="flex items-center gap-4 sm:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
            >
              {link.label}
            </Link>
          ))}
          <span
            className="hidden font-mono text-[10px] text-zinc-600 sm:inline"
            title="Command palette"
          >
            Ctrl+K
          </span>
        </nav>
      </div>
    </header>
  )
}
