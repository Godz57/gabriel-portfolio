import { describe, it, expect } from 'vitest'
import { parseFrontmatter } from './frontmatter'

describe('parseFrontmatter', () => {
  it('parses case-like frontmatter', () => {
    const raw = `---
slug: wpp-grok
title: Bot WhatsApp
summary: Loop real.
audience: [recruiter, freelance]
stack: [TypeScript, Playwright]
order: 2
---

## Body

Hello
`
    const { data, content } = parseFrontmatter(raw)
    expect(data.slug).toBe('wpp-grok')
    expect(data.order).toBe(2)
    expect(data.audience).toEqual(['recruiter', 'freelance'])
    expect(data.stack).toEqual(['TypeScript', 'Playwright'])
    expect(content).toContain('## Body')
    expect(content).toContain('Hello')
  })

  it('handles missing frontmatter', () => {
    const { data, content } = parseFrontmatter('just text')
    expect(data).toEqual({})
    expect(content).toBe('just text')
  })

  it('strips BOM', () => {
    const raw = `\uFEFF---
slug: a
order: 1
---
body`
    expect(parseFrontmatter(raw).data.slug).toBe('a')
  })
})
