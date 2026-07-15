import { CommandPalette } from '@/components/CommandPalette'
import { getSiteConfig, loadCases } from '@/lib/content'

/** Server wrapper: loads data for client palette */
export function CommandPaletteHost() {
  const site = getSiteConfig()
  const cases = loadCases()
  const digits = site.whatsapp?.replace(/\D/g, '') || undefined

  return (
    <CommandPalette
      caseSlugs={cases.map((c) => c.slug)}
      githubUrl={site.github}
      whatsappDigits={digits}
    />
  )
}
