import { getTranslations } from 'next-intl/server'
import { ArcLogo } from '@/components/ArcLogo'
import { Link } from '@/i18n/navigation'

type SiteFooterProps = {
  githubUrl: string
}

export async function SiteFooter({ githubUrl }: SiteFooterProps) {
  const t = await getTranslations('Footer')
  const tNav = await getTranslations('Nav')
  const tCommon = await getTranslations('Common')
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 mt-auto border-t border-white/5 bg-zinc-950/80">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-12 sm:flex-row sm:items-center sm:px-6">
        <div>
          <Link
            href="/"
            className="group inline-flex"
            aria-label={tNav('ariaHome')}
          >
            <ArcLogo variant="mark" size={28} />
          </Link>
          <p className="mt-3 text-sm text-zinc-500">{t('blurb', { year })}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
          <Link href={'/#servicos' as '/'} className="hover:text-violet-400">
            {tNav('services')}
          </Link>
          <Link href="/cases" className="hover:text-violet-400">
            {tNav('cases')}
          </Link>
          <Link href={'/#escopo' as '/'} className="hover:text-violet-400">
            {tNav('scope')}
          </Link>
          <Link href={'/#faq' as '/'} className="hover:text-violet-400">
            {tNav('faq')}
          </Link>
          <Link href="/stack" className="hover:text-violet-400">
            {tNav('stack')}
          </Link>
          <Link href="/contato" className="hover:text-violet-400">
            {tNav('contact')}
          </Link>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-violet-400"
          >
            {tCommon('github')}
          </a>
        </div>
      </div>
    </footer>
  )
}
