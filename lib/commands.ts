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

export function buildCommands(ctx: CommandContext): SiteCommand[] {
  const caseLines =
    ctx.caseSlugs.length > 0
      ? ctx.caseSlugs.map((s) => `  ${s}`)
      : ['  (nenhum case)']

  const commands: SiteCommand[] = [
    {
      id: 'help',
      name: 'help',
      aliases: ['?', 'ajuda'],
      description: 'Lista comandos disponíveis',
      keywords: ['help', 'ajuda', 'comandos'],
      action: {
        type: 'output',
        lines: [
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
      },
    },
    {
      id: 'whoami',
      name: 'whoami',
      description: 'Quem sou eu',
      keywords: ['quem', 'identidade', 'gabriel'],
      action: {
        type: 'output',
        lines: [
          'Gabriel Almeida',
          'Engenharia de agentes CLI/LLM e automação real:',
          'do skill ao bot em produção.',
        ],
      },
    },
    {
      id: 'cases',
      name: 'cases',
      aliases: ['ls', 'list'],
      description: 'Ir para /cases ou listar slugs no terminal',
      keywords: ['cases', 'portfolio', 'trabalhos'],
      action: {
        type: 'output',
        lines: ['cases/', ...caseLines, '', 'Dica: open <slug>  ou  cases (palette → /cases)'],
      },
    },
    {
      id: 'cases-nav',
      name: 'Ir para Cases',
      aliases: ['goto cases', 'go cases'],
      description: 'Abrir página de cases',
      keywords: ['cases', 'navegar'],
      action: { type: 'navigate', href: '/cases' },
    },
    {
      id: 'stack',
      name: 'stack',
      aliases: ['method', 'metodo'],
      description: 'Abrir /stack',
      keywords: ['stack', 'método', 'tdd'],
      action: { type: 'navigate', href: '/stack' },
    },
    {
      id: 'contato',
      name: 'contato',
      aliases: ['contact', 'fale'],
      description: 'Abrir /contato',
      keywords: ['contato', 'email', 'falar'],
      action: { type: 'navigate', href: '/contato' },
    },
    {
      id: 'github',
      name: 'github',
      aliases: ['gh'],
      description: 'Abrir GitHub',
      keywords: ['github', 'oss', 'repos'],
      action: { type: 'external', href: ctx.githubUrl },
    },
    {
      id: 'clear',
      name: 'clear',
      aliases: ['cls'],
      description: 'Limpar saída do terminal',
      keywords: ['clear', 'limpar'],
      action: { type: 'clear' },
    },
    {
      id: 'arc',
      name: 'arc',
      description: 'Easter egg ARC WEB',
      keywords: ['arc', 'web', 'agencia'],
      action: {
        type: 'output',
        lines: [
          'ARC WEB — sites e automação com cara de produto.',
          'Case: open arc-web',
        ],
      },
    },
    {
      id: 'rafael',
      name: 'rafael',
      description: 'Easter egg persona wpp-grok',
      keywords: ['rafael', 'whatsapp', 'bot'],
      action: {
        type: 'output',
        lines: [
          'Rafael? É a persona de atendimento do wpp-grok.',
          'Loop: ler → decidir → humanizar → responder.',
          'Case: open wpp-grok',
        ],
      },
    },
  ]

  if (ctx.whatsappDigits) {
    commands.push({
      id: 'whatsapp',
      name: 'whatsapp',
      aliases: ['wa', 'wpp'],
      description: 'Abrir WhatsApp',
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
      description: `Abrir case ${slug}`,
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
): CommandAction {
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
      lines: [`case não encontrado: ${slug}`, 'use: cases'],
    }
  }

  // goto-style from palette names like "Ir para Cases"
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
    lines: [
      `comando desconhecido: ${raw.trim()}`,
      'digite help para a lista',
    ],
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
