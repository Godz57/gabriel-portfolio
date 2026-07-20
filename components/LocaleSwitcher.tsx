'use client'

import { useParams } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing, type Locale } from '@/i18n/routing'

export function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher')
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const params = useParams()
  const router = useRouter()

  function switchTo(next: Locale) {
    if (next === locale) return
    // Pathname may be a dynamic template (e.g. /cases/[slug]); pass params so
    // next-intl can rebuild the localized URL. Runtime params always match.
    router.replace(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- current route
      { pathname, params } as any,
      { locale: next },
    )
  }

  return (
    <div
      role="group"
      aria-label={t('label')}
      className="flex items-center gap-1.5 font-mono text-[11px] tracking-wide"
    >
      {routing.locales.map((code, index) => {
        const active = code === locale
        return (
          <span key={code} className="flex items-center gap-1.5">
            {index > 0 ? (
              <span className="select-none text-zinc-700" aria-hidden>
                |
              </span>
            ) : null}
            <button
              type="button"
              onClick={() => switchTo(code)}
              aria-pressed={active}
              className={
                active
                  ? 'text-violet-300'
                  : 'text-zinc-500 transition-colors hover:text-zinc-300'
              }
            >
              {t(code)}
            </button>
          </span>
        )
      })}
    </div>
  )
}
