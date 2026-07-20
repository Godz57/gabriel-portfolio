import { describe, it, expect } from 'vitest'
import { getSiteConfig, loadCases, getCaseBySlug } from './content'

describe('getSiteConfig', () => {
  it('returns PT identity by default locale', () => {
    const site = getSiteConfig('pt')
    expect(site.name).toBe('Gabriel Almeida')
    expect(site.tagline).toMatch(/agentes|Landing|sites/i)
    expect(site.github).toMatch(/^https:\/\/github\.com\//)
    expect(site.services.length).toBeGreaterThanOrEqual(4)
    expect(site.faqs.length).toBeGreaterThanOrEqual(4)
  })

  it('returns English tagline and aligned structure', () => {
    const pt = getSiteConfig('pt')
    const en = getSiteConfig('en')
    expect(en.name).toBe(pt.name)
    expect(en.github).toBe(pt.github)
    expect(en.proofItems).toHaveLength(pt.proofItems.length)
    expect(en.ossRepos).toHaveLength(pt.ossRepos.length)
    expect(en.methodSteps).toHaveLength(4)
    expect(en.services).toHaveLength(pt.services.length)
    expect(en.faqs).toHaveLength(pt.faqs.length)
    expect(en.tagline).not.toBe(pt.tagline)
    expect(en.tagline.toLowerCase()).toMatch(/agent|landing|tdd|production/)
  })

  it('defaults to pt when locale omitted', () => {
    expect(getSiteConfig().tagline).toBe(getSiteConfig('pt').tagline)
  })
})

describe('loadCases', () => {
  it('loads cases for pt and en with same slugs', () => {
    const pt = loadCases('pt')
    const en = loadCases('en')
    expect(pt.length).toBeGreaterThanOrEqual(4)
    expect(en.map((c) => c.slug)).toEqual(pt.map((c) => c.slug))
    expect(pt.map((c) => c.slug)).toEqual(
      expect.arrayContaining(['shelter', 'arc-web']),
    )
    expect(en[0].title).not.toBe(pt[0].title)
    expect(en[0].body.length).toBeGreaterThan(20)
  })

  it('shelter and arc-web expose live demo URLs', () => {
    const shelter = getCaseBySlug('shelter', 'en')
    const arc = getCaseBySlug('arc-web', 'en')
    expect(shelter?.demoUrl).toMatch(/shelter/i)
    expect(shelter?.repoUrl).toMatch(/github\.com\/Godz57\/shelter/)
    expect(arc?.demoUrl).toBe('https://arcweb.com.br')
  })

  it('each case has body and required frontmatter', () => {
    for (const c of loadCases('pt')) {
      expect(c.title.length).toBeGreaterThan(0)
      expect(c.summary.length).toBeGreaterThan(0)
      expect(c.body.length).toBeGreaterThan(20)
      expect(c.stack.length).toBeGreaterThan(0)
      expect(c.audience.length).toBeGreaterThan(0)
    }
  })
})

describe('getCaseBySlug', () => {
  it('returns localized case', () => {
    const pt = getCaseBySlug('wpp-grok', 'pt')
    const en = getCaseBySlug('wpp-grok', 'en')
    expect(pt?.slug).toBe('wpp-grok')
    expect(en?.slug).toBe('wpp-grok')
    expect(en?.summary).not.toBe(pt?.summary)
  })

  it('returns null for unknown slug', () => {
    expect(getCaseBySlug('nope', 'pt')).toBeNull()
  })
})
