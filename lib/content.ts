import fs from 'node:fs'
import path from 'node:path'
import { siteConfig } from '@/content/site'
import { parseFrontmatter } from '@/lib/frontmatter'
import {
  caseFrontmatterSchema,
  siteConfigSchema,
  type CaseDocument,
  type SiteConfig,
} from '@/lib/schemas'

const CASES_DIR = path.join(process.cwd(), 'content', 'cases')

export function getSiteConfig(): SiteConfig {
  return siteConfigSchema.parse(siteConfig)
}

export function loadCases(): CaseDocument[] {
  if (!fs.existsSync(CASES_DIR)) return []
  const files = fs.readdirSync(CASES_DIR).filter((f) => f.endsWith('.md'))
  const cases = files.map((file) => {
    const raw = fs.readFileSync(path.join(CASES_DIR, file), 'utf8')
    const { data, content } = parseFrontmatter(raw)
    const frontmatter = caseFrontmatterSchema.parse(data)
    return { ...frontmatter, body: content.trim() }
  })
  return cases.sort((a, b) => a.order - b.order)
}

export function getCaseBySlug(slug: string): CaseDocument | null {
  return loadCases().find((c) => c.slug === slug) ?? null
}
