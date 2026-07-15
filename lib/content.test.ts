import { describe, it, expect } from 'vitest'
import { getSiteConfig } from './content'

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
