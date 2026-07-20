import type { MetadataRoute } from 'next'
import { locales } from '@/i18n/routing'
import { loadCases } from '@/lib/content'
import {
  getSiteUrl,
  getLocalizedPath,
  type AppPathname,
} from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl().replace(/\/$/, '')
  const entries: MetadataRoute.Sitemap = []

  const staticPaths: AppPathname[] = ['/', '/cases', '/stack', '/contato']

  for (const locale of locales) {
    for (const pathname of staticPaths) {
      const path = getLocalizedPath(locale, pathname)
      entries.push({
        url: path === '/' ? `${base}/` : `${base}${path}`,
        lastModified: new Date(),
      })
    }
    for (const c of loadCases(locale)) {
      const path = getLocalizedPath(locale, '/cases/[slug]', { slug: c.slug })
      entries.push({
        url: `${base}${path}`,
        lastModified: new Date(),
      })
    }
  }

  return entries
}
