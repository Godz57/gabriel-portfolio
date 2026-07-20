import { describe, expect, it } from 'vitest'
import pt from './pt.json'
import en from './en.json'

function keys(obj: unknown, prefix = ''): string[] {
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
    return prefix ? [prefix] : []
  }
  return Object.entries(obj as Record<string, unknown>).flatMap(([k, v]) =>
    keys(v, prefix ? `${prefix}.${k}` : k),
  )
}

describe('messages parity', () => {
  it('en has the same key tree as pt', () => {
    expect(keys(en).sort()).toEqual(keys(pt).sort())
  })
})
