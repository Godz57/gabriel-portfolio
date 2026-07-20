import { afterEach, describe, expect, it } from 'vitest'
import {
  getLanguageAlternates,
  getLocalizedPath,
  getSeoCopy,
  getSiteUrl,
  htmlLang,
} from './seo'

describe('seo helpers', () => {
  afterEach(() => {
    delete process.env.NEXT_PUBLIC_SITE_URL
  })

  it('htmlLang maps pt → pt-BR and en → en', () => {
    expect(htmlLang('pt')).toBe('pt-BR')
    expect(htmlLang('en')).toBe('en')
  })

  it('getSeoCopy returns locale-specific metadata', () => {
    expect(getSeoCopy('pt').title).toMatch(/ARC WEB/)
    expect(getSeoCopy('pt').description).toMatch(/sites|agentes|automa/i)
    expect(getSeoCopy('en').description).toMatch(/agent/i)
    expect(getSeoCopy('en').ogTitle).toMatch(/agents/i)
  })

  it('getSiteUrl falls back to localhost and respects env', () => {
    expect(getSiteUrl()).toBe('http://localhost:3000')
    process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com/'
    expect(getSiteUrl()).toBe('https://example.com/')
  })

  it('getLanguageAlternates for home: pt without /en, en with /en', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com'
    const alt = getLanguageAlternates('/')

    expect(alt['pt-BR']).toMatch(/^https:\/\/example\.com\/?$/)
    expect(alt['pt-BR']).not.toMatch(/\/en/)
    expect(alt.en).toMatch(/\/en\/?$/)
    expect(alt['x-default']).toBe(alt['pt-BR'])
  })

  it('getLanguageAlternates maps /contato → /contact in EN', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com'
    const alt = getLanguageAlternates('/contato')

    expect(alt['pt-BR']).toMatch(/\/contato$/)
    expect(alt.en).toMatch(/\/en\/contact$/)
    expect(alt['x-default']).toBe(alt['pt-BR'])
  })

  it('getLanguageAlternates resolves case slug for both locales', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com'
    const alt = getLanguageAlternates({
      pathname: '/cases/[slug]',
      params: { slug: 'wpp-grok' },
    })

    expect(alt['pt-BR']).toBe('https://example.com/cases/wpp-grok')
    expect(alt.en).toBe('https://example.com/en/cases/wpp-grok')
    expect(alt['x-default']).toBe(alt['pt-BR'])
  })

  it('getLanguageAlternates accepts { pathname } without params', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com'
    const alt = getLanguageAlternates({ pathname: '/stack' })

    expect(alt['pt-BR']).toBe('https://example.com/stack')
    expect(alt.en).toBe('https://example.com/en/stack')
  })

  it('getLocalizedPath builds as-needed prefixes and contact alias', () => {
    expect(getLocalizedPath('pt', '/')).toBe('/')
    expect(getLocalizedPath('en', '/')).toBe('/en')
    expect(getLocalizedPath('pt', '/contato')).toBe('/contato')
    expect(getLocalizedPath('en', '/contato')).toBe('/en/contact')
    expect(getLocalizedPath('pt', '/cases/[slug]', { slug: 'arc-web' })).toBe(
      '/cases/arc-web',
    )
    expect(getLocalizedPath('en', '/cases/[slug]', { slug: 'arc-web' })).toBe(
      '/en/cases/arc-web',
    )
  })
})
