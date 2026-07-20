'use client'

import { useTranslations } from 'next-intl'
import { ArcLogo } from '@/components/ArcLogo'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import { Link } from '@/i18n/navigation'

const navLinks = [
  { href: '/#servicos' as const, labelKey: 'services' as const },
  { href: '/cases' as const, labelKey: 'cases' as const },
  { href: '/#escopo' as const, labelKey: 'scope' as const },
  { href: '/#faq' as const, labelKey: 'faq' as const },
  { href: '/contato' as const, labelKey: 'contact' as const },
]

export function SiteHeader() {
  const t = useTranslations('Nav')

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl border border-white/10 bg-zinc-950/70 px-4 py-3 shadow-lg shadow-black/40 backdrop-blur-xl sm:px-6">
        <Link
          href="/"
          className="group flex shrink-0 items-center transition-opacity hover:opacity-90"
          aria-label={t('ariaHome')}
        >
          <ArcLogo variant="mark" size={32} priority />
        </Link>
        <nav
          aria-label={t('ariaMain')}
          className="flex min-w-0 flex-1 items-center justify-center gap-0.5 sm:gap-1"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href as '/'}
              className="rounded-lg px-2 py-1.5 text-xs text-zinc-400 transition-colors hover:bg-white/5 hover:text-white sm:px-3 sm:text-sm"
            >
              {t(link.labelKey)}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <LocaleSwitcher />
          <span
            className="hidden font-mono text-[10px] text-zinc-600 lg:inline"
            title="Command palette"
          >
            Ctrl+K
          </span>
          <Link
            href="/contato"
            className="rounded-full bg-violet-600 px-3.5 py-1.5 text-xs font-medium text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-500 sm:px-4 sm:text-sm"
          >
            {t('cta')}
          </Link>
        </div>
      </div>
    </header>
  )
}
