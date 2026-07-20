import type { Locale } from '@/i18n/routing'

export type CommandAction =
  | { type: 'navigate'; href: string }
  | { type: 'external'; href: string }
  | { type: 'output'; lines: string[] }
  | { type: 'clear' }

export type SiteCommand = {
  id: string
  /** Primary name shown in palette / help */
  name: string
  /** Extra triggers (aliases) */
  aliases?: string[]
  description: string
  /** Palette keywords for fuzzy-ish filter */
  keywords?: string[]
  action: CommandAction
}

export type CommandContext = {
  caseSlugs: string[]
  githubUrl: string
  whatsappDigits?: string
}

type CommandCopy = {
  helpDesc: string
  helpLines: string[]
  whoamiDesc: string
  whoamiLines: string[]
  casesDesc: string
  casesTip: string
  emptyCases: string
  casesNavName: string
  casesNavDesc: string
  stackDesc: string
  contatoDesc: string
  githubDesc: string
  clearDesc: string
  arcDesc: string
  arcLines: string[]
  rafaelDesc: string
  rafaelLines: string[]
  whatsappDesc: string
  openCaseDesc: (slug: string) => string
  caseNotFound: (slug: string) => string[]
  unknown: (raw: string) => string[]
}

const copy: Record<Locale, CommandCopy> = {
  pt: {
    helpDesc: 'Lista comandos disponíveis',
    helpLines: [
      'Comandos:',
      '  help                 — esta ajuda',
      '  whoami               — identidade',
      '  cases | ls           — listar cases',
      '  open <slug>          — abrir case',
      '  stack                — método e stack',
      '  contato | contact    — falar comigo',
      '  github               — perfil GitHub',
      '  whatsapp             — WhatsApp (se configurado)',
      '  clear                — limpar terminal',
      '  arc | rafael         — easter eggs',
    ],
    whoamiDesc: 'Quem sou eu',
    whoamiLines: [
      'Gabriel Almeida',
      'Engenharia de agentes CLI/LLM e automação real:',
      'do skill ao bot em produção.',
    ],
    casesDesc: 'Ir para /cases ou listar slugs no terminal',
    casesTip: 'Dica: open <slug>  ou  cases (palette → /cases)',
    emptyCases: '(nenhum case)',
    casesNavName: 'Ir para Cases',
    casesNavDesc: 'Abrir página de cases',
    stackDesc: 'Abrir /stack',
    contatoDesc: 'Abrir /contato',
    githubDesc: 'Abrir GitHub',
    clearDesc: 'Limpar saída do terminal',
    arcDesc: 'Easter egg ARC WEB',
    arcLines: [
      'ARC WEB — sites e automação com cara de produto.',
      'Case: open arc-web',
    ],
    rafaelDesc: 'Easter egg persona wpp-grok',
    rafaelLines: [
      'Rafael? É a persona de atendimento do wpp-grok.',
      'Loop: ler → decidir → humanizar → responder.',
      'Case: open wpp-grok',
    ],
    whatsappDesc: 'Abrir WhatsApp',
    openCaseDesc: (slug) => `Abrir case ${slug}`,
    caseNotFound: (slug) => [`case não encontrado: ${slug}`, 'use: cases'],
    unknown: (raw) => [
      `comando desconhecido: ${raw}`,
      'digite help para a lista',
    ],
  },
  en: {
    helpDesc: 'List available commands',
    helpLines: [
      'Commands:',
      '  help                 — this help',
      '  whoami               — identity',
      '  cases | ls           — list cases',
      '  open <slug>          — open case',
      '  stack                — method and stack',
      '  contato | contact    — get in touch',
      '  github               — GitHub profile',
      '  whatsapp             — WhatsApp (if configured)',
      '  clear                — clear terminal',
      '  arc | rafael         — easter eggs',
    ],
    whoamiDesc: 'Who I am',
    whoamiLines: [
      'Gabriel Almeida',
      'CLI/LLM agent engineering and real automation:',
      'from skill to production bot.',
    ],
    casesDesc: 'Go to /cases or list slugs in the terminal',
    casesTip: 'Tip: open <slug>  or  cases (palette → /cases)',
    emptyCases: '(no cases)',
    casesNavName: 'Go to Cases',
    casesNavDesc: 'Open cases page',
    stackDesc: 'Open /stack',
    contatoDesc: 'Open /contato',
    githubDesc: 'Open GitHub',
    clearDesc: 'Clear terminal output',
    arcDesc: 'ARC WEB easter egg',
    arcLines: [
      'ARC WEB — sites and automation with product polish.',
      'Case: open arc-web',
    ],
    rafaelDesc: 'wpp-grok persona easter egg',
    rafaelLines: [
      'Rafael? That is the wpp-grok support persona.',
      'Loop: read → decide → humanize → respond.',
      'Case: open wpp-grok',
    ],
    whatsappDesc: 'Open WhatsApp',
    openCaseDesc: (slug) => `Open case ${slug}`,
    caseNotFound: (slug) => [`case not found: ${slug}`, 'use: cases'],
    unknown: (raw) => [
      `unknown command: ${raw}`,
      'type help for the list',
    ],
  },
}

export function buildCommands(
  ctx: CommandContext,
  locale: Locale = 'pt',
): SiteCommand[] {
  const t = copy[locale]
  const caseLines =
    ctx.caseSlugs.length > 0
      ? ctx.caseSlugs.map((s) => `  ${s}`)
      : [`  ${t.emptyCases}`]

  const commands: SiteCommand[] = [
    {
      id: 'help',
      name: 'help',
      aliases: ['?', 'ajuda'],
      description: t.helpDesc,
      keywords: ['help', 'ajuda', 'comandos', 'commands'],
      action: {
        type: 'output',
        lines: t.helpLines,
      },
    },
    {
      id: 'whoami',
      name: 'whoami',
      description: t.whoamiDesc,
      keywords: ['quem', 'identidade', 'gabriel', 'who'],
      action: {
        type: 'output',
        lines: t.whoamiLines,
      },
    },
    {
      id: 'cases',
      name: 'cases',
      aliases: ['ls', 'list'],
      description: t.casesDesc,
      keywords: ['cases', 'portfolio', 'trabalhos', 'work'],
      action: {
        type: 'output',
        lines: ['cases/', ...caseLines, '', t.casesTip],
      },
    },
    {
      id: 'cases-nav',
      name: t.casesNavName,
      aliases: ['goto cases', 'go cases'],
      description: t.casesNavDesc,
      keywords: ['cases', 'navegar', 'navigate'],
      action: { type: 'navigate', href: '/cases' },
    },
    {
      id: 'stack',
      name: 'stack',
      aliases: ['method', 'metodo'],
      description: t.stackDesc,
      keywords: ['stack', 'método', 'method', 'tdd'],
      action: { type: 'navigate', href: '/stack' },
    },
    {
      id: 'contato',
      name: 'contato',
      aliases: ['contact', 'fale'],
      description: t.contatoDesc,
      keywords: ['contato', 'email', 'falar', 'contact'],
      action: { type: 'navigate', href: '/contato' },
    },
    {
      id: 'github',
      name: 'github',
      aliases: ['gh'],
      description: t.githubDesc,
      keywords: ['github', 'oss', 'repos'],
      action: { type: 'external', href: ctx.githubUrl },
    },
    {
      id: 'clear',
      name: 'clear',
      aliases: ['cls'],
      description: t.clearDesc,
      keywords: ['clear', 'limpar'],
      action: { type: 'clear' },
    },
    {
      id: 'arc',
      name: 'arc',
      description: t.arcDesc,
      keywords: ['arc', 'web', 'agencia', 'agency'],
      action: {
        type: 'output',
        lines: t.arcLines,
      },
    },
    {
      id: 'rafael',
      name: 'rafael',
      description: t.rafaelDesc,
      keywords: ['rafael', 'whatsapp', 'bot'],
      action: {
        type: 'output',
        lines: t.rafaelLines,
      },
    },
  ]

  if (ctx.whatsappDigits) {
    commands.push({
      id: 'whatsapp',
      name: 'whatsapp',
      aliases: ['wa', 'wpp'],
      description: t.whatsappDesc,
      keywords: ['whatsapp', 'zap'],
      action: {
        type: 'external',
        href: `https://wa.me/${ctx.whatsappDigits}`,
      },
    })
  }

  for (const slug of ctx.caseSlugs) {
    commands.push({
      id: `open-${slug}`,
      name: `open ${slug}`,
      aliases: [slug],
      description: t.openCaseDesc(slug),
      keywords: ['open', 'case', slug],
      action: { type: 'navigate', href: `/cases/${slug}` },
    })
  }

  return commands
}

/** Normalize user input for matching */
export function normalizeInput(raw: string): string {
  return raw.trim().toLowerCase().replace(/\s+/g, ' ')
}

/**
 * Parse a terminal line into an action.
 * Supports: exact command names, aliases, `open <slug>`, unknown → help hint.
 */
export function parseCommandLine(
  raw: string,
  commands: SiteCommand[],
  locale: Locale = 'pt',
): CommandAction {
  const t = copy[locale]
  const input = normalizeInput(raw)
  if (!input) {
    return { type: 'output', lines: [] }
  }

  // open <slug>
  const openMatch = /^open\s+([a-z0-9-]+)$/.exec(input)
  if (openMatch) {
    const slug = openMatch[1]
    const found = commands.find((c) => c.id === `open-${slug}`)
    if (found) return found.action
    return {
      type: 'output',
      lines: t.caseNotFound(slug),
    }
  }

  // goto-style from palette names like "Ir para Cases" / "Go to Cases"
  for (const cmd of commands) {
    if (normalizeInput(cmd.name) === input) return cmd.action
    if (cmd.aliases?.some((a) => normalizeInput(a) === input)) return cmd.action
  }

  // bare slug without open
  const bare = commands.find((c) => c.id === `open-${input}`)
  if (bare) return bare.action

  // special: "cases" in terminal lists; palette has separate navigate
  // already handled via name cases → output

  return {
    type: 'output',
    lines: t.unknown(raw.trim()),
  }
}

/** Filter commands for palette by query (substring on name/desc/keywords) */
export function filterCommands(
  commands: SiteCommand[],
  query: string,
): SiteCommand[] {
  const q = normalizeInput(query)
  // Terminal-only noise: hide pure output helpers that duplicate palette nav when empty? show all useful
  const paletteCommands = commands.filter(
    (c) =>
      c.action.type === 'navigate' ||
      c.action.type === 'external' ||
      c.id === 'help' ||
      c.id === 'whoami' ||
      c.id === 'cases' ||
      c.id === 'arc' ||
      c.id === 'rafael',
  )

  if (!q) return paletteCommands

  return paletteCommands.filter((c) => {
    const hay = [
      c.name,
      c.description,
      ...(c.aliases ?? []),
      ...(c.keywords ?? []),
    ]
      .join(' ')
      .toLowerCase()
    return hay.includes(q)
  })
}
