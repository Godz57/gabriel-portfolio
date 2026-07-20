import type { Locale } from '@/i18n/routing'
import { siteConfigSchema, type SiteConfig } from '@/lib/schemas'
import { siteConfig as pt } from './pt'
import { siteConfig as en } from './en'

const byLocale = { pt, en } as const

export function getSiteConfig(locale: Locale): SiteConfig {
  return siteConfigSchema.parse(byLocale[locale])
}
