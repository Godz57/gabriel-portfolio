import type { MetadataRoute } from 'next'
import { loadCases } from '@/lib/content'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/cases`, lastModified: new Date() },
    { url: `${base}/stack`, lastModified: new Date() },
    { url: `${base}/contato`, lastModified: new Date() },
  ]

  const caseRoutes: MetadataRoute.Sitemap = loadCases().map((c) => ({
    url: `${base}/cases/${c.slug}`,
    lastModified: new Date(),
  }))

  return [...staticRoutes, ...caseRoutes]
}
