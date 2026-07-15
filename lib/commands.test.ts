import { describe, it, expect } from 'vitest'
import {
  buildCommands,
  filterCommands,
  parseCommandLine,
  normalizeInput,
} from './commands'

const ctx = {
  caseSlugs: ['agent-tooling', 'wpp-grok', 'arc-web'],
  githubUrl: 'https://github.com/Godz57',
  whatsappDigits: '5561984556371',
}

describe('normalizeInput', () => {
  it('trims and lowercases', () => {
    expect(normalizeInput('  HELP  ')).toBe('help')
  })
})

describe('parseCommandLine', () => {
  const commands = buildCommands(ctx)

  it('runs help', () => {
    const action = parseCommandLine('help', commands)
    expect(action.type).toBe('output')
    if (action.type === 'output') {
      expect(action.lines.some((l) => l.includes('help'))).toBe(true)
    }
  })

  it('navigates stack', () => {
    expect(parseCommandLine('stack', commands)).toEqual({
      type: 'navigate',
      href: '/stack',
    })
  })

  it('opens case by open slug', () => {
    expect(parseCommandLine('open wpp-grok', commands)).toEqual({
      type: 'navigate',
      href: '/cases/wpp-grok',
    })
  })

  it('opens case by bare slug', () => {
    expect(parseCommandLine('arc-web', commands)).toEqual({
      type: 'navigate',
      href: '/cases/arc-web',
    })
  })

  it('opens github external', () => {
    expect(parseCommandLine('github', commands)).toEqual({
      type: 'external',
      href: 'https://github.com/Godz57',
    })
  })

  it('opens whatsapp', () => {
    expect(parseCommandLine('wa', commands)).toEqual({
      type: 'external',
      href: 'https://wa.me/5561984556371',
    })
  })

  it('clears', () => {
    expect(parseCommandLine('clear', commands)).toEqual({ type: 'clear' })
  })

  it('unknown command hints help', () => {
    const action = parseCommandLine('foobar', commands)
    expect(action.type).toBe('output')
    if (action.type === 'output') {
      expect(action.lines[0]).toMatch(/desconhecido/i)
    }
  })

  it('easter egg rafael', () => {
    const action = parseCommandLine('rafael', commands)
    expect(action.type).toBe('output')
    if (action.type === 'output') {
      expect(action.lines.join(' ')).toMatch(/wpp-grok|persona/i)
    }
  })
})

describe('filterCommands', () => {
  const commands = buildCommands(ctx)

  it('returns palette set when query empty', () => {
    const list = filterCommands(commands, '')
    expect(list.length).toBeGreaterThan(3)
    expect(list.some((c) => c.action.type === 'navigate')).toBe(true)
  })

  it('filters by keyword', () => {
    const list = filterCommands(commands, 'whats')
    expect(list.some((c) => c.id === 'whatsapp')).toBe(true)
  })

  it('filters open case', () => {
    const list = filterCommands(commands, 'wpp')
    expect(list.some((c) => c.id === 'open-wpp-grok')).toBe(true)
  })
})
