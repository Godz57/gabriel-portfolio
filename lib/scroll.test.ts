import { describe, it, expect } from 'vitest'
import { computeScrollProgress } from './scroll'

describe('computeScrollProgress', () => {
  it('returns 0 at top', () => {
    expect(computeScrollProgress(0, 2000, 800)).toBe(0)
  })

  it('returns 1 at bottom', () => {
    expect(computeScrollProgress(1200, 2000, 800)).toBe(1)
  })

  it('returns mid value', () => {
    expect(computeScrollProgress(600, 2000, 800)).toBe(0.5)
  })

  it('returns 0 when page does not scroll', () => {
    expect(computeScrollProgress(0, 800, 800)).toBe(0)
  })

  it('clamps above 1', () => {
    expect(computeScrollProgress(9999, 2000, 800)).toBe(1)
  })
})
