import { CommandPalette } from '@/components/CommandPalette'
import type { Locale } from '@/i18n/routing'
import { getSiteConfig, loadCases } from '@/lib/content'

/** Server wrapper: loads data for client palette */
export function CommandPaletteHost({ locale = 'pt' }: { locale?: Locale }) {
  const site = getSiteConfig(locale)
  const cases = loadCases(locale)
  const digits = site.whatsapp?.replace(/\D/g, '') || undefined

  return (
    <CommandPalette
      caseSlugs={cases.map((c) => c.slug)}
      githubUrl={site.github}
      whatsappDigits={digits}
    />
  )
}
