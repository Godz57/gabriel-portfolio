import { describe, it, expect } from 'vitest'
import { getSiteConfig, loadCases, getCaseBySlug } from './content'

describe('getSiteConfig', () => {
  it('returns required identity fields', () => {
    const site = getSiteConfig()
    expect(site.name).toBe('Gabriel Almeida')
    expect(site.tagline.length).toBeGreaterThan(10)
    expect(site.github).toMatch(/^https:\/\/github\.com\//)
    expect(site.proofItems.length).toBeGreaterThanOrEqual(3)
    expect(site.ossRepos.length).toBeGreaterThanOrEqual(3)
  })

  it('proof items have label and value', () => {
    const site = getSiteConfig()
    for (const item of site.proofItems) {
      expect(item.label.length).toBeGreaterThan(0)
      expect(item.value.length).toBeGreaterThan(0)
    }
  })
})

describe('loadCases', () => {
  it('loads exactly 3 cases sorted by order', () => {
    const cases = loadCases()
    expect(cases).toHaveLength(3)
    expect(cases.map((c) => c.slug)).toEqual([
      'agent-tooling',
      'wpp-grok',
      'arc-web',
    ])
    expect(cases[0].order).toBeLessThan(cases[1].order)
    expect(cases[1].order).toBeLessThan(cases[2].order)
  })

  it('each case has body and required frontmatter', () => {
    for (const c of loadCases()) {
      expect(c.title.length).toBeGreaterThan(0)
      expect(c.summary.length).toBeGreaterThan(0)
      expect(c.body.length).toBeGreaterThan(20)
      expect(c.stack.length).toBeGreaterThan(0)
      expect(c.audience.length).toBeGreaterThan(0)
    }
  })
})

describe('getCaseBySlug', () => {
  it('returns case for known slug', () => {
    const c = getCaseBySlug('wpp-grok')
    expect(c?.slug).toBe('wpp-grok')
  })

  it('returns null for unknown slug', () => {
    expect(getCaseBySlug('nope')).toBeNull()
  })
})
