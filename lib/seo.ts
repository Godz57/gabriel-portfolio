import type { Locale } from '@/i18n/routing'
import { defaultLocale, pathnames } from '@/i18n/routing'

export function htmlLang(locale: Locale): string {
  return locale === 'pt' ? 'pt-BR' : 'en'
}

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
}

export function getSeoCopy(locale: Locale) {
  if (locale === 'en') {
    return {
      title: 'Gabriel Almeida · ARC WEB',
      description:
        'Sites, agents, and automations — from skill to production bot. Portfolio of Gabriel Almeida · ARC WEB.',
      ogTitle: 'Gabriel Almeida · Sites, agents, and automations',
    }
  }
  return {
    title: 'Gabriel Almeida · ARC WEB',
    description:
      'Sites, agentes e automações — do skill ao bot em produção. Portfólio de Gabriel Almeida · ARC WEB.',
    ogTitle: 'Gabriel Almeida · Sites, agentes e automações',
  }
}

export type AppPathname =
  | '/'
  | '/cases'
  | '/cases/[slug]'
  | '/stack'
  | '/contato'

type LanguageAlternatesHref =
  | AppPathname
  | { pathname: '/cases/[slug]'; params: { slug: string } }
  | { pathname: AppPathname }

/**
 * Pure localized path builder (no request context).
 * Mirrors next-intl `localePrefix: 'as-needed'` + `pathnames` map so unit tests
 * work in Vitest without next/navigation.
 */
export function getLocalizedPath(
  locale: Locale,
  pathname: AppPathname,
  params?: { slug?: string },
): string {
  const entry = pathnames[pathname]
  let path: string

  if (typeof entry === 'string') {
    path = entry
  } else {
    path = entry[locale]
  }

  if (params?.slug != null) {
    path = path.replace('[slug]', params.slug)
  }

  if (locale !== defaultLocale) {
    if (path === '/') return `/${locale}`
    return `/${locale}${path.startsWith('/') ? path : `/${path}`}`
  }

  return path
}

function normalizeHref(href: LanguageAlternatesHref): {
  pathname: AppPathname
  params?: { slug: string }
} {
  if (typeof href === 'string') {
    return { pathname: href }
  }
  if (href.pathname === '/cases/[slug]' && 'params' in href && href.params) {
    return { pathname: href.pathname, params: href.params }
  }
  return { pathname: href.pathname }
}

/** Build absolute hreflang map for a logical path */
export function getLanguageAlternates(
  href: LanguageAlternatesHref,
): Record<string, string> {
  const base = getSiteUrl().replace(/\/$/, '')
  const { pathname, params } = normalizeHref(href)

  const ptPath = getLocalizedPath('pt', pathname, params)
  const enPath = getLocalizedPath('en', pathname, params)

  const abs = (path: string) => {
    if (path === '/' || path === '') return `${base}/`
    return `${base}${path.startsWith('/') ? path : `/${path}`}`
  }

  return {
    'pt-BR': abs(ptPath),
    en: abs(enPath),
    'x-default': abs(ptPath),
  }
}
