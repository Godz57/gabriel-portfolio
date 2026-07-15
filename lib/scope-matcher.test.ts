import { describe, it, expect } from 'vitest'
import {
  normalizeText,
  scoreCategories,
  suggestScope,
  buildWhatsAppScopeMessage,
  whatsappHref,
} from './scope-matcher'

describe('normalizeText', () => {
  it('removes accents and lowercases', () => {
    expect(normalizeText('  Automação WhatsApp  ')).toBe('automacao whatsapp')
  })
})

describe('scoreCategories', () => {
  it('detects landing', () => {
    const scores = scoreCategories(
      'preciso de uma landing page para captar lead da campanha de ads',
    )
    expect(scores[0]?.id).toBe('landing')
    expect(scores[0]!.score).toBeGreaterThanOrEqual(2)
  })

  it('detects whatsapp bot', () => {
    const scores = scoreCategories(
      'quero um bot no whatsapp para atendimento e qualificacao de lead',
    )
    expect(scores.some((s) => s.id === 'whatsapp')).toBe(true)
  })

  it('detects hybrid landing + whatsapp', () => {
    const scores = scoreCategories(
      'landing page de vendas e bot no whatsapp para fechar lead',
    )
    const ids = scores.slice(0, 3).map((s) => s.id)
    expect(ids).toContain('landing')
    expect(ids).toContain('whatsapp')
  })

  it('detects agent / llm', () => {
    const scores = scoreCategories(
      'preciso de um agente de ia com llm para automatizar triagem',
    )
    expect(scores.some((s) => s.id === 'agent')).toBe(true)
  })

  it('detects website institutional', () => {
    const scores = scoreCategories(
      'site institucional da minha empresa com varias paginas',
    )
    expect(scores[0]?.id).toBe('website')
  })
})

describe('suggestScope', () => {
  it('returns low confidence for empty/short text', () => {
    const s = suggestScope('oi')
    expect(s.confidence).toBe('low')
    expect(s.deliverables).toHaveLength(0)
    expect(s.userText).toBe('oi')
  })

  it('returns low confidence for vague text without inventing product', () => {
    const s = suggestScope(
      'preciso de uma coisa legal para o meu negocio crescer mais rapido',
    )
    expect(s.confidence).toBe('low')
    expect(s.clarifyingQuestions.length).toBeGreaterThan(0)
    expect(s.title.toLowerCase()).not.toMatch(/landing|whatsapp|agente/)
  })

  it('returns medium/high for clear landing request', () => {
    const s = suggestScope(
      'Quero uma landing page de captacao de leads para campanha de google ads',
    )
    expect(['medium', 'high']).toContain(s.confidence)
    expect(s.matches.some((m) => m.id === 'landing')).toBe(true)
    expect(s.deliverables.length).toBeGreaterThan(0)
    expect(s.userText.toLowerCase()).toContain('landing')
  })

  it('hybrid keeps both categories when both are strong', () => {
    const s = suggestScope(
      'Preciso de landing page de vendas e automacao de whatsapp com bot de atendimento',
    )
    expect(s.matches.length).toBeGreaterThanOrEqual(2)
    const ids = s.matches.map((m) => m.id)
    expect(ids).toEqual(expect.arrayContaining(['landing', 'whatsapp']))
  })

  it('always echoes user text in whatsapp message', () => {
    const text = 'landing page para meu curso online'
    const s = suggestScope(text)
    const msg = buildWhatsAppScopeMessage(s)
    expect(msg).toContain(text)
    expect(msg).toMatch(/portfólio|portfolio|Gabriel/i)
  })
})

describe('whatsappHref', () => {
  it('builds wa.me with encoded text', () => {
    const href = whatsappHref('5561984556371', 'olá mundo')
    expect(href).toContain('wa.me/5561984556371')
    expect(href).toContain(encodeURIComponent('olá mundo'))
  })
})
