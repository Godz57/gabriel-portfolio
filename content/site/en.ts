import type { SiteConfig } from '@/lib/schemas'

export const siteConfig = {
  name: 'Gabriel Almeida',
  tagline:
    'Landing pages, sites, and systems with CLI/LLM agents — method, TDD, and production results.',
  github: 'https://github.com/Godz57',
  linkedin: undefined,
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP,
  email: undefined,
  proofItems: [
    { label: 'Public agent tooling kits', value: '7+' },
    { label: 'Real production automation', value: 'WhatsApp + LLM' },
    { label: 'Core stack', value: 'TypeScript · Next · Playwright' },
    { label: 'Method', value: 'TDD · loops · verify-done' },
  ],
  ossRepos: [
    {
      name: 'grok-superpowers',
      url: 'https://github.com/Godz57/grok-superpowers',
      blurb: 'Brainstorm → plan → TDD → verify for agents.',
    },
    {
      name: 'grok-loops',
      url: 'https://github.com/Godz57/grok-loops',
      blurb: 'Autonomous loops with stop states and guardrails.',
    },
    {
      name: 'grok-craftsman',
      url: 'https://github.com/Godz57/grok-craftsman',
      blurb: 'Always-on quality gates for vibe-coding.',
    },
    {
      name: 'grok-pentest',
      url: 'https://github.com/Godz57/grok-pentest',
      blurb: 'OWASP white-box audits for vibe-coded apps.',
    },
    {
      name: 'grok-ai-memory',
      url: 'https://github.com/Godz57/grok-ai-memory',
      blurb: 'Long-term memory across agent sessions.',
    },
  ],
  methodSteps: [
    {
      title: 'Brainstorm',
      description: 'Approved design before writing code.',
    },
    {
      title: 'Write plan',
      description: 'TDD plan with small tasks and exact file paths.',
    },
    {
      title: 'Execute + TDD',
      description: 'Red → green → refactor, task by task.',
    },
    {
      title: 'Verify done',
      description: 'Fresh build/test evidence before calling it “done”.',
    },
  ],
  services: [
    {
      icon: '◈',
      title: 'Sites and web apps',
      description:
        'Institutional sites and web products with Next.js: performance, SEO, and modern UI that turns visits into contact.',
      tags: ['Next.js', 'UI', 'Deploy'],
    },
    {
      icon: '◆',
      title: 'Landing pages',
      description:
        'Offer pages with clear copy, CTAs, and tracking — ideal for campaigns, launches, and lead generation.',
      tags: ['Conversion', 'Ads', 'WhatsApp'],
    },
    {
      icon: '◎',
      title: 'AI agents',
      description:
        'Agents that read context, decide, and act: support, qualification, code summaries, and loops with stop states.',
      tags: ['LLM', 'CLI', 'Skills'],
    },
    {
      icon: '⚡',
      title: 'Automations',
      description:
        'Flows that run on their own: WhatsApp, browser (Playwright), notifications, human handoff, and funnel integration.',
      tags: ['Playwright', 'Bots', 'Ops'],
    },
    {
      icon: '⟨/⟩',
      title: 'Agent tooling & DX',
      description:
        'Skills, quality gates, loops, and playbooks so the agent works with method — not just “vibe coding”.',
      tags: ['TDD', 'Superpowers', 'OSS'],
    },
    {
      icon: '⇄',
      title: 'Integrations & APIs',
      description:
        'We connect CRM, spreadsheets, webhooks, payments, and external services to your site or agent securely.',
      tags: ['API', 'Webhooks', 'Auth'],
    },
    {
      icon: '▲',
      title: 'SEO & performance',
      description:
        'Core Web Vitals, metadata, sitemap, and structure built to rank and load fast on mobile.',
      tags: ['SEO', 'Vercel', 'CWV'],
    },
    {
      icon: '▣',
      title: 'Quality & security',
      description:
        'OWASP review, quality gates, and hardening for AI-generated apps — before production.',
      tags: ['Pentest', 'Review', 'RLS'],
    },
  ],
  faqs: [
    {
      question: 'What do you actually deliver?',
      answer:
        'Next.js sites and landings, AI agents (CLI/LLM), automations (WhatsApp, browser, funnels), and quality tooling — from design to deploy, with method (plan → TDD → verify).',
    },
    {
      question: 'Do you only build the bot, or the site too?',
      answer:
        'Both. Many projects are hybrid: a converting landing/site plus an agent or automation on WhatsApp/backoffice. We scope together without forcing what does not fit.',
    },
    {
      question: 'How does the WhatsApp agent / automation work?',
      answer:
        'Controlled loop: read context → decide with an LLM → humanize → reply, with limits (when to stop, when to escalate to a human). No sensitive lead data in public code.',
    },
    {
      question: 'How long does a typical project take?',
      answer:
        'Lean landing: days to a few weeks. Institutional site or production agent: depends on scope, integrations, and content. We always start with clear scope and milestones.',
    },
    {
      question: 'Freelance, full-time, or partnership?',
      answer:
        'Open to freelance projects, collaboration, and full-time conversations. The best fit depends on what you need — reach out and we align format and expectations.',
    },
    {
      question: 'What is the main stack?',
      answer:
        'TypeScript, Next.js, Playwright, Vitest, Vercel, and LLMs (Grok/OpenAI and similar). Method matters as much as stack: brainstorm, plan, TDD, and evidence before “done”.',
    },
  ],
} satisfies SiteConfig
