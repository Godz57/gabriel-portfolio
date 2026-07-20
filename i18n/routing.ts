import { defineRouting } from 'next-intl/routing'

export const locales = ['pt', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'pt'

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

export const pathnames = {
  '/': '/',
  '/cases': '/cases',
  '/cases/[slug]': '/cases/[slug]',
  '/stack': '/stack',
  '/contato': {
    pt: '/contato',
    en: '/contact',
  },
} as const

export const routing = defineRouting({
  locales: [...locales],
  defaultLocale,
  localePrefix: 'as-needed',
  pathnames,
  localeDetection: false,
})
