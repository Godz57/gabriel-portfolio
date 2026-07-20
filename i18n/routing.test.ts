import { describe, expect, it } from 'vitest'
import { defaultLocale, locales, pathnames, isLocale } from './routing'

describe('i18n routing', () => {
  it('exposes pt (default) and en only', () => {
    expect(locales).toEqual(['pt', 'en'])
    expect(defaultLocale).toBe('pt')
  })

  it('isLocale accepts only known locales', () => {
    expect(isLocale('pt')).toBe(true)
    expect(isLocale('en')).toBe(true)
    expect(isLocale('es')).toBe(false)
    expect(isLocale('')).toBe(false)
  })

  it('maps contact pathnames per locale', () => {
    expect(pathnames['/contato']).toEqual({
      pt: '/contato',
      en: '/contact',
    })
  })

  it('keeps cases and stack paths shared', () => {
    expect(pathnames['/cases']).toBe('/cases')
    expect(pathnames['/stack']).toBe('/stack')
    expect(pathnames['/cases/[slug]']).toBe('/cases/[slug]')
  })
})
