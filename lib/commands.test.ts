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

  it('unknown command in EN is English', () => {
    const cmds = buildCommands(ctx, 'en')
    const action = parseCommandLine('xyz', cmds, 'en')
    expect(action.type).toBe('output')
    if (action.type === 'output') {
      expect(action.lines.join(' ')).toMatch(/unknown command/i)
      expect(action.lines.join(' ')).not.toMatch(/desconhecido/i)
    }
  })

  it('case not found in EN is English', () => {
    const cmds = buildCommands(ctx, 'en')
    const action = parseCommandLine('open missing-slug', cmds, 'en')
    expect(action.type).toBe('output')
    if (action.type === 'output') {
      expect(action.lines[0]).toMatch(/case not found/i)
      expect(action.lines.join(' ')).toMatch(/use:\s*cases/i)
    }
  })
})

describe('buildCommands locale', () => {
  it('EN help description is English, not Portuguese Lista', () => {
    const cmds = buildCommands(ctx, 'en')
    const help = cmds.find((c) => c.id === 'help')
    expect(help).toBeDefined()
    expect(help!.description).toMatch(/list|command/i)
    expect(help!.description).not.toMatch(/Lista/)
  })

  it('PT help description stays Portuguese', () => {
    const cmds = buildCommands(ctx, 'pt')
    const help = cmds.find((c) => c.id === 'help')
    expect(help!.description).toMatch(/Lista/i)
  })

  it('EN empty cases line is English', () => {
    const cmds = buildCommands({ ...ctx, caseSlugs: [] }, 'en')
    const cases = cmds.find((c) => c.id === 'cases')
    expect(cases?.action.type).toBe('output')
    if (cases?.action.type === 'output') {
      expect(cases.action.lines.join(' ')).toMatch(/\(no cases\)/i)
      expect(cases.action.lines.join(' ')).not.toMatch(/nenhum/i)
    }
  })

  it('navigate hrefs stay logical pathnames', () => {
    const cmds = buildCommands(ctx, 'en')
    const contato = cmds.find((c) => c.id === 'contato')
    expect(contato?.action).toEqual({ type: 'navigate', href: '/contato' })
    const open = cmds.find((c) => c.id === 'open-arc-web')
    expect(open?.action).toEqual({
      type: 'navigate',
      href: '/cases/arc-web',
    })
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
