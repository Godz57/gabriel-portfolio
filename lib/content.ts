import fs from 'node:fs'
import path from 'node:path'
import type { Locale } from '@/i18n/routing'
import { getSiteConfig as loadSiteConfig } from '@/content/site'
import { parseFrontmatter } from '@/lib/frontmatter'
import {
  caseFrontmatterSchema,
  type CaseDocument,
  type SiteConfig,
} from '@/lib/schemas'

export function getSiteConfig(locale: Locale = 'pt'): SiteConfig {
  return loadSiteConfig(locale)
}

function casesDir(locale: Locale) {
  return path.join(process.cwd(), 'content', 'cases', locale)
}

export function loadCases(locale: Locale = 'pt'): CaseDocument[] {
  const dir = casesDir(locale)
  if (!fs.existsSync(dir)) return []
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))
  const cases = files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf8')
    const { data, content } = parseFrontmatter(raw)
    const frontmatter = caseFrontmatterSchema.parse(data)
    return { ...frontmatter, body: content.trim() }
  })
  return cases.sort((a, b) => a.order - b.order)
}

export function getCaseBySlug(
  slug: string,
  locale: Locale = 'pt',
): CaseDocument | null {
  return loadCases(locale).find((c) => c.slug === slug) ?? null
}
