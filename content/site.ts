import type { SiteConfig } from '@/lib/schemas'

export const siteConfig = {
  name: 'Gabriel Almeida',
  tagline:
    'Landing pages, sites e sistemas com agentes CLI/LLM — com método, TDD e resultado em produção.',
  github: 'https://github.com/Godz57',
  linkedin: undefined,
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP,
  email: undefined,
  proofItems: [
    { label: 'Kits públicos de agent tooling', value: '7+' },
    { label: 'Automação real em produção', value: 'WhatsApp + LLM' },
    { label: 'Stack principal', value: 'TypeScript · Next · Playwright' },
    { label: 'Método', value: 'TDD · loops · verify-done' },
  ],
  ossRepos: [
    {
      name: 'grok-superpowers',
      url: 'https://github.com/Godz57/grok-superpowers',
      blurb: 'Brainstorm → plan → TDD → verify para agentes.',
    },
    {
      name: 'grok-loops',
      url: 'https://github.com/Godz57/grok-loops',
      blurb: 'Loops autônomos com stop states e guardrails.',
    },
    {
      name: 'grok-craftsman',
      url: 'https://github.com/Godz57/grok-craftsman',
      blurb: 'Quality gates always-on para vibe-coding.',
    },
    {
      name: 'grok-pentest',
      url: 'https://github.com/Godz57/grok-pentest',
      blurb: 'Auditoria OWASP white-box para apps vibe-coded.',
    },
    {
      name: 'grok-ai-memory',
      url: 'https://github.com/Godz57/grok-ai-memory',
      blurb: 'Memória de longo prazo entre sessões de agentes.',
    },
  ],
  methodSteps: [
    {
      title: 'Brainstorm',
      description: 'Design aprovado antes de código.',
    },
    {
      title: 'Write plan',
      description: 'Plano TDD com tarefas pequenas e caminhos exatos.',
    },
    {
      title: 'Execute + TDD',
      description: 'Red → green → refactor, task por task.',
    },
    {
      title: 'Verify done',
      description: 'Evidência fresca de build/testes antes de “pronto”.',
    },
  ],
} satisfies SiteConfig
