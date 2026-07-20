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
  services: [
    {
      icon: '◈',
      title: 'Sites e web apps',
      description:
        'Sites institucionais e produtos web com Next.js: performance, SEO e visual moderno que converte visita em contato.',
      tags: ['Next.js', 'UI', 'Deploy'],
    },
    {
      icon: '◆',
      title: 'Landing pages',
      description:
        'Páginas de oferta com copy clara, CTAs e tracking — ideais para campanhas, lançamentos e geração de leads.',
      tags: ['Conversão', 'Ads', 'WhatsApp'],
    },
    {
      icon: '◎',
      title: 'Agentes com AI',
      description:
        'Agentes que leem contexto, decidem e agem: atendimento, qualificação, resumo de código e loops com stop states.',
      tags: ['LLM', 'CLI', 'Skills'],
    },
    {
      icon: '⚡',
      title: 'Automações',
      description:
        'Fluxos que rodam sozinhos: WhatsApp, browser (Playwright), notificações, handoff humano e integração com seu funil.',
      tags: ['Playwright', 'Bots', 'Ops'],
    },
    {
      icon: '⟨/⟩',
      title: 'Tooling & DX de agentes',
      description:
        'Skills, quality gates, loops e playbooks para o agente trabalhar com método — não só “vibe coding”.',
      tags: ['TDD', 'Superpowers', 'OSS'],
    },
    {
      icon: '⇄',
      title: 'Integrações & APIs',
      description:
        'Conectamos CRM, planilhas, webhooks, pagamentos e serviços externos ao site ou ao agente com segurança.',
      tags: ['API', 'Webhooks', 'Auth'],
    },
    {
      icon: '▲',
      title: 'SEO & performance',
      description:
        'Core Web Vitals, metadados, sitemap e estrutura pensada para ranquear e carregar rápido no mobile.',
      tags: ['SEO', 'Vercel', 'CWV'],
    },
    {
      icon: '▣',
      title: 'Qualidade & segurança',
      description:
        'Revisão OWASP, gates de qualidade e hardening para apps gerados com AI — antes de ir pra produção.',
      tags: ['Pentest', 'Review', 'RLS'],
    },
  ],
  faqs: [
    {
      question: 'O que você entrega na prática?',
      answer:
        'Sites e landings com Next.js, agentes com AI (CLI/LLM), automações (WhatsApp, browser, funis) e tooling de qualidade — do design ao deploy, com método (plan → TDD → verify).',
    },
    {
      question: 'Você faz só o bot ou o site também?',
      answer:
        'Os dois. Muitos projetos são híbridos: landing/site que converte + agente ou automação no WhatsApp/backoffice. Montamos o escopo junto, sem forçar o que não cabe.',
    },
    {
      question: 'Como funciona o agente / automação no WhatsApp?',
      answer:
        'Loop controlado: ler contexto → decidir com LLM → humanizar → responder, com limites (quando parar, quando escalar para humano). Sem expor dados sensíveis de leads no código público.',
    },
    {
      question: 'Quanto tempo leva um projeto típico?',
      answer:
        'Landing enxuta: dias a poucas semanas. Site institucional ou agente em produção: depende do escopo, integrações e conteúdo. Sempre começamos com escopo e marcos claros.',
    },
    {
      question: 'Trabalha freela, CLT ou parceria?',
      answer:
        'Aberto a projeto freela, colaboração e conversas de CLT. O melhor encaixe depende do que você precisa — fale comigo e alinhamos formato e expectativa.',
    },
    {
      question: 'Qual a stack principal?',
      answer:
        'TypeScript, Next.js, Playwright, Vitest, Vercel, e LLMs (Grok/OpenAI e similares). O método importa tanto quanto a stack: brainstorm, plan, TDD e evidência antes de “pronto”.',
    },
  ],
} satisfies SiteConfig
