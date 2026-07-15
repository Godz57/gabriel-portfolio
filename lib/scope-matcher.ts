/**
 * Scope playground — keyword/scored matcher with safe fallback.
 * Never invent a specific product when confidence is low.
 */

export type ScopeCategoryId =
  | 'landing'
  | 'website'
  | 'agent'
  | 'automation'
  | 'whatsapp'
  | 'ecommerce'
  | 'seo'
  | 'integration'
  | 'security'
  | 'tooling'
  | 'redesign'
  | 'app'

export type Confidence = 'high' | 'medium' | 'low'

export type ScopeCategory = {
  id: ScopeCategoryId
  label: string
  /** Keywords / phrases (matched after normalize) */
  keywords: string[]
  /** Higher weight phrases (multi-word) */
  strongKeywords?: string[]
  deliverables: string[]
  stack: string[]
  nextSteps: string[]
}

export type MatchedCategory = {
  id: ScopeCategoryId
  label: string
  score: number
}

export type ScopeSuggestion = {
  confidence: Confidence
  /** Categories that scored above noise floor */
  matches: MatchedCategory[]
  title: string
  summary: string
  deliverables: string[]
  stack: string[]
  nextSteps: string[]
  /** Shown when we are not sure */
  clarifyingQuestions: string[]
  /** Always echoes the user so WhatsApp stays aligned */
  userText: string
  /** Human note about confidence */
  confidenceNote: string
}

/** Strip accents, lowercase, collapse spaces */
export function normalizeText(raw: string): string {
  return raw
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[^\p{L}\p{N}\s+#./-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export const SCOPE_CATEGORIES: ScopeCategory[] = [
  {
    id: 'landing',
    label: 'Landing page',
    strongKeywords: [
      'landing page',
      'pagina de vendas',
      'pagina de captura',
      'sales page',
      'squeeze page',
    ],
    keywords: [
      'landing',
      'captura',
      'lead magnet',
      'lp',
      'one page',
      'onepage',
      'oferta',
      'lancamento',
      'launch',
      'campanha',
      'ads',
      'meta ads',
      'google ads',
      'trafego',
      'conversao',
      'cta',
      'captar lead',
      'gerar lead',
      'pagina unica',
    ],
    deliverables: [
      'Landing focada em uma oferta/CTA',
      'Copy e seções de conversão (hero, prova, FAQ, contato)',
      'Integração WhatsApp / formulário / pixel (conforme necessidade)',
    ],
    stack: ['Next.js', 'SEO básico', 'Analytics', 'Deploy Vercel'],
    nextSteps: [
      'Definir oferta, público e CTA principal',
      'Reunir textos, logo e referências visuais',
    ],
  },
  {
    id: 'website',
    label: 'Site institucional / multi-página',
    strongKeywords: [
      'site institucional',
      'site da empresa',
      'site corporativo',
      'site completo',
      'multi pagina',
      'multipagina',
    ],
    keywords: [
      'site',
      'website',
      'pagina web',
      'paginas',
      'institucional',
      'empresa',
      'portfolio site',
      'vitrine',
      'home page',
      'homepage',
      'sobre nos',
      'servicos online',
      'presenca digital',
      'web design',
      'webdesign',
    ],
    deliverables: [
      'Site multi-seção ou multi-página (home, serviços, sobre, contato)',
      'Layout responsivo e identidade visual alinhada à marca',
      'SEO on-page e formulário / WhatsApp',
    ],
    stack: ['Next.js', 'UI moderna', 'SEO', 'Vercel'],
    nextSteps: [
      'Mapear páginas e conteúdo de cada uma',
      'Definir tom de voz e referências de design',
    ],
  },
  {
    id: 'agent',
    label: 'Agente com AI / LLM',
    strongKeywords: [
      'agente de ia',
      'agente ia',
      'agente ai',
      'ai agent',
      'llm agent',
      'assistente inteligente',
      'chatbot inteligente',
    ],
    keywords: [
      'agente',
      'agent',
      'llm',
      'gpt',
      'grok',
      'chatgpt',
      'openai',
      'claude',
      'inteligencia artificial',
      'ia generativa',
      'ai',
      'copiloto',
      'copilot',
      'assistente virtual',
      'rag',
      'prompt',
      'skill',
      'skills',
      'autonomo',
      'raciocinio',
    ],
    deliverables: [
      'Agente com loop (ler → decidir → agir) e critérios de parada',
      'Prompts/policies e handoff para humano quando necessário',
      'Integração com canal (web, CLI, WhatsApp, etc.)',
    ],
    stack: ['TypeScript', 'LLM API', 'Guardrails', 'Observabilidade'],
    nextSteps: [
      'Definir o que o agente pode e não pode fazer',
      'Escolher canal e fontes de contexto (docs, CRM, etc.)',
    ],
  },
  {
    id: 'automation',
    label: 'Automação de processos',
    strongKeywords: [
      'automatizar processo',
      'automacao de processo',
      'rpa',
      'browser automation',
      'automacao de tarefas',
    ],
    keywords: [
      'automacao',
      'automatizar',
      'automatico',
      'workflow',
      'fluxo',
      'pipeline',
      'playwright',
      'puppeteer',
      'selenium',
      'scraping',
      'scraper',
      'robo',
      'bot de sistema',
      'integrar sistemas',
      'sem trabalho manual',
      'rotina',
      'agendar',
      'cron',
      'n8n',
      'zapier',
      'make.com',
    ],
    deliverables: [
      'Mapeamento do processo atual e pontos de automação',
      'Fluxo automatizado com logs e tratamento de erro',
      'Handoff humano em falhas / casos fora do script',
    ],
    stack: ['Playwright / APIs', 'TypeScript', 'Filas / cron', 'Monitoramento'],
    nextSteps: [
      'Descrever o processo passo a passo (como é feito hoje)',
      'Listar sistemas envolvidos e acessos necessários',
    ],
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp (atendimento / bot)',
    strongKeywords: [
      'bot no whatsapp',
      'bot whatsapp',
      'whatsapp bot',
      'atendimento no whatsapp',
      'whatsapp business',
      'api do whatsapp',
    ],
    keywords: [
      'whatsapp',
      'wpp',
      'zap',
      'wa.me',
      'atendimento',
      'mensagem automatica',
      'resposta automatica',
      'qualificacao de lead',
      'follow up',
      'follow-up',
      'chat comercial',
      'suporte pelo zap',
    ],
    deliverables: [
      'Fluxo de atendimento / qualificação no WhatsApp',
      'Respostas com LLM + regras de negócio e escalonamento',
      'Métricas básicas (volume, falhas, handoff)',
    ],
    stack: ['Playwright ou API oficial', 'LLM', 'Persona / scripts'],
    nextSteps: [
      'Definir script de atendimento e horários',
      'Escolher API oficial vs automação web (prós/contras)',
    ],
  },
  {
    id: 'ecommerce',
    label: 'Loja / catálogo / vendas online',
    strongKeywords: [
      'loja virtual',
      'e-commerce',
      'ecommerce',
      'loja online',
      'carrinho de compras',
    ],
    keywords: [
      'loja',
      'catalogo',
      'produto',
      'produtos',
      'venda online',
      'checkout',
      'pagamento',
      'stripe',
      'mercado pago',
      'shopify',
      'woocommerce',
      'pedido',
      'estoque',
    ],
    deliverables: [
      'Vitrine/catálogo ou loja com fluxo de compra (conforme escopo)',
      'Integração de pagamento e/ou catálogo',
      'Páginas de produto e contato/suporte',
    ],
    stack: ['Next.js', 'Pagamentos', 'CMS/catálogo', 'SEO'],
    nextSteps: [
      'Listar produtos e se precisa de pagamento online de verdade',
      'Definir se é catálogo + WhatsApp ou checkout completo',
    ],
  },
  {
    id: 'seo',
    label: 'SEO e performance',
    strongKeywords: [
      'aparecer no google',
      'primeira pagina do google',
      'otimizacao seo',
      'core web vitals',
    ],
    keywords: [
      'seo',
      'ranqueamento',
      'google',
      'busca organica',
      'performance',
      'velocidade',
      'lighthouse',
      'otimizar site',
      'palavras chave',
      'keyword',
      'sitemap',
      'meta tags',
      'blog',
      'conteudo seo',
    ],
    deliverables: [
      'Auditoria de SEO técnico e performance',
      'Metadados, sitemap, estrutura e melhorias de CWV',
      'Plano de conteúdo / keywords (se aplicável)',
    ],
    stack: ['Next.js SEO', 'Lighthouse', 'Search Console'],
    nextSteps: [
      'Informar URL atual (se existir) e palavras-alvo',
      'Priorizar: técnico, conteúdo ou os dois',
    ],
  },
  {
    id: 'integration',
    label: 'Integrações e APIs',
    strongKeywords: [
      'integrar api',
      'integracao com crm',
      'webhook',
      'conectar sistemas',
    ],
    keywords: [
      'integracao',
      'integrar',
      'api',
      'apis',
      'crm',
      'hubspot',
      'rd station',
      'pipefy',
      'notion',
      'airtable',
      'planilha',
      'google sheets',
      'erp',
      'webhook',
      'rest',
      'graphql',
      'oauth',
      'auth',
      'login',
      'cadastro',
    ],
    deliverables: [
      'Desenho das integrações (o que entra/sai de cada sistema)',
      'Implementação de APIs/webhooks com auth e logs',
      'Testes de ponta a ponta nos fluxos críticos',
    ],
    stack: ['TypeScript', 'APIs REST', 'Auth', 'Observabilidade'],
    nextSteps: [
      'Listar sistemas e se há documentação/API disponível',
      'Definir o fluxo principal a integrar primeiro',
    ],
  },
  {
    id: 'security',
    label: 'Qualidade e segurança',
    strongKeywords: [
      'pentest',
      'auditoria de seguranca',
      'revisao de seguranca',
      'owasp',
    ],
    keywords: [
      'seguranca',
      'security',
      'vulnerabilidade',
      'hack',
      'lgpd',
      'privacidade',
      'rls',
      'auth',
      'autorizacao',
      'hardening',
      'code review',
      'revisao de codigo',
      'qualidade',
      'testes',
      'tdd',
    ],
    deliverables: [
      'Revisão white-box / checklist OWASP do app',
      'Lista priorizada de riscos e correções',
      'Gates de qualidade (testes, lint, verify) se desejado',
    ],
    stack: ['Review de código', 'Checklist OWASP', 'Testes'],
    nextSteps: [
      'Informar se o app é próprio e em qual ambiente (staging)',
      'Priorizar: login, dados de usuário, pagamentos, etc.',
    ],
  },
  {
    id: 'tooling',
    label: 'Tooling / CLI / skills de agentes',
    strongKeywords: [
      'cli tool',
      'ferramenta cli',
      'skill de agente',
      'agent tooling',
      'developer experience',
    ],
    keywords: [
      'cli',
      'sdk',
      'tooling',
      'dx',
      'devtools',
      'skill',
      'skills',
      'npx',
      'biblioteca',
      'lib',
      'framework interno',
      'boilerplate',
      'scaffold',
      'template de projeto',
    ],
    deliverables: [
      'CLI ou skill instalável com docs claras',
      'Fluxo de uso (help, exemplos, erros amigáveis)',
      'Testes e versionamento',
    ],
    stack: ['TypeScript', 'Node CLI', 'Docs', 'CI'],
    nextSteps: [
      'Descrever o fluxo manual que a ferramenta deve encurtar',
      'Definir público (time interno, open source, clientes)',
    ],
  },
  {
    id: 'redesign',
    label: 'Redesign / modernização de site',
    strongKeywords: [
      'redesign',
      'reformular site',
      'modernizar site',
      'refazer o site',
      'site antigo',
    ],
    keywords: [
      'redesign',
      'rebrand',
      'visual novo',
      'ui nova',
      'ux',
      'modernizar',
      'atualizar site',
      'melhorar visual',
      'deixar bonito',
      'identidade visual',
      'figma',
    ],
    deliverables: [
      'Novo visual mantendo (ou melhorando) conversão e SEO',
      'Componentes e tipografia consistentes',
      'Migração de conteúdo e deploy',
    ],
    stack: ['Next.js', 'Design system leve', 'SEO preservado'],
    nextSteps: [
      'Enviar URL atual e o que mais incomoda no site de hoje',
      'Referências de sites que você gosta',
    ],
  },
  {
    id: 'app',
    label: 'Web app / sistema / dashboard',
    strongKeywords: [
      'web app',
      'aplicativo web',
      'sistema web',
      'painel administrativo',
      'dashboard',
      'saas',
    ],
    keywords: [
      'app',
      'aplicativo',
      'sistema',
      'plataforma',
      'painel',
      'admin',
      'dashboard',
      'crm proprio',
      'area logada',
      'usuarios',
      'assinatura',
      'saas',
      'mvp',
      'produto digital',
    ],
    deliverables: [
      'MVP ou módulo de produto com fluxos principais',
      'Auth e papéis se necessário',
      'Deploy e base para evoluir',
    ],
    stack: ['Next.js', 'Auth', 'DB/API', 'TypeScript'],
    nextSteps: [
      'Listar as 3 telas/fluxos mais importantes do MVP',
      'Definir se há login e tipos de usuário',
    ],
  },
]

const NOISE_FLOOR = 1
const HIGH_THRESHOLD = 3.5
const MEDIUM_THRESHOLD = 1.8

function countKeywordHits(
  normalized: string,
  keywords: string[],
  weight: number,
): { score: number; hits: string[] } {
  let score = 0
  const hits: string[] = []
  for (const kw of keywords) {
    const k = normalizeText(kw)
    if (!k) continue
    // word-boundary-ish for short tokens; substring for multi-word
    const isPhrase = k.includes(' ')
    if (isPhrase) {
      if (normalized.includes(k)) {
        score += weight
        hits.push(kw)
      }
    } else {
      // avoid matching tiny tokens inside other words when possible
      const re = new RegExp(
        `(^|[^\\p{L}\\p{N}])${escapeRegExp(k)}([^\\p{L}\\p{N}]|$)`,
        'u',
      )
      if (re.test(normalized) || (k.length >= 4 && normalized.includes(k))) {
        score += weight
        hits.push(kw)
      }
    }
  }
  return { score, hits }
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function scoreCategories(raw: string): MatchedCategory[] {
  const normalized = normalizeText(raw)
  if (!normalized || normalized.length < 3) return []

  const results: MatchedCategory[] = []

  for (const cat of SCOPE_CATEGORIES) {
    const weak = countKeywordHits(normalized, cat.keywords, 1)
    const strong = countKeywordHits(
      normalized,
      cat.strongKeywords ?? [],
      2.5,
    )
    const score = weak.score + strong.score
    if (score >= NOISE_FLOOR) {
      results.push({ id: cat.id, label: cat.label, score })
    }
  }

  return results.sort((a, b) => b.score - a.score)
}

function mergeUnique(lists: string[][]): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const list of lists) {
    for (const item of list) {
      if (!seen.has(item)) {
        seen.add(item)
        out.push(item)
      }
    }
  }
  return out
}

function categoryById(id: ScopeCategoryId): ScopeCategory {
  const c = SCOPE_CATEGORIES.find((x) => x.id === id)
  if (!c) throw new Error(`Unknown category ${id}`)
  return c
}

const GENERIC_QUESTIONS = [
  'Qual o objetivo principal: vender, atender, automatizar ou tudo junto?',
  'Já existe site/sistema hoje? Se sim, qual a URL?',
  'Tem prazo ou data de campanha em mente?',
  'Prefere começar por um MVP enxuto ou um pacote mais completo?',
]

/**
 * Main entry: raw user text → suggestion with confidence + safe fallback.
 */
export function suggestScope(raw: string): ScopeSuggestion {
  const userText = raw.trim()
  const matches = scoreCategories(userText)
  const top = matches[0]
  const topScore = top?.score ?? 0

  // Empty / too short
  if (userText.length < 8) {
    return {
      confidence: 'low',
      matches: [],
      title: 'Conte um pouco mais',
      summary:
        'Escreva em 1–3 frases o que você precisa (ex.: “landing para campanha + bot no WhatsApp”). Quanto mais contexto, melhor o encaixe.',
      deliverables: [],
      stack: [],
      nextSteps: ['Descrever objetivo, público e se já existe site'],
      clarifyingQuestions: GENERIC_QUESTIONS,
      userText,
      confidenceNote:
        'Ainda não há texto suficiente para sugerir um escopo sem chutar.',
    }
  }

  // Low confidence: do NOT invent a specific product
  if (!top || topScore < MEDIUM_THRESHOLD) {
    return {
      confidence: 'low',
      matches,
      title: 'Vamos alinhar o escopo juntos',
      summary:
        'Entendi o pedido, mas ainda não encaixei com segurança em um tipo de projeto específico — e prefiro não inventar. O ideal é conversarmos com o seu texto original.',
      deliverables: [
        'Call ou WhatsApp para esclarecer objetivo e restrições',
        'Proposta enxuta depois do alinhamento (sem chute de escopo)',
      ],
      stack: ['A definir com base no que você precisa'],
      nextSteps: [
        'Enviar o texto abaixo no WhatsApp (já inclui o que você escreveu)',
        'Responder 2–3 perguntas de esclarecimento',
      ],
      clarifyingQuestions: [
        ...matches.slice(0, 2).map(
          (m) =>
            `Tem a ver com “${m.label}” ou era outra coisa?`,
        ),
        ...GENERIC_QUESTIONS,
      ].slice(0, 5),
      userText,
      confidenceNote:
        'Confiança baixa: palavras genéricas ou fora do mapa. Nada de sugestão forçada.',
    }
  }

  // Medium: top + optional second if close
  // High: clear top, maybe hybrid if second is strong
  const second = matches[1]
  const hybrid =
    second &&
    second.score >= MEDIUM_THRESHOLD &&
    second.score >= topScore * 0.55

  const selected = hybrid
    ? [top, second]
    : [top, ...(second && second.score >= HIGH_THRESHOLD * 0.7 ? [second] : [])].slice(
        0,
        hybrid ? 2 : topScore >= HIGH_THRESHOLD ? 1 : 2,
      )

  // Dedupe selected by id
  const selectedUnique: MatchedCategory[] = []
  for (const m of selected) {
    if (!selectedUnique.find((x) => x.id === m.id)) selectedUnique.push(m)
  }

  const cats = selectedUnique.map((m) => categoryById(m.id))
  const confidence: Confidence =
    topScore >= HIGH_THRESHOLD && !hybrid
      ? 'high'
      : topScore >= HIGH_THRESHOLD || (hybrid && topScore >= MEDIUM_THRESHOLD)
        ? hybrid
          ? 'medium'
          : 'high'
        : 'medium'

  const labels = cats.map((c) => c.label).join(' + ')
  const title =
    cats.length > 1
      ? `Escopo híbrido: ${labels}`
      : `Escopo sugerido: ${cats[0].label}`

  const summary =
    confidence === 'high'
      ? `Pelo que você escreveu, o encaixe mais natural é **${labels}**. Abaixo um rascunho de escopo — sempre validamos contigo antes de fechar.`
      : `Sinais de **${labels}**. Pode haver sobreposição; o rascunho abaixo é um ponto de partida, não proposta fechada.`

  const clarifying =
    confidence === 'high'
      ? cats.flatMap((c) => c.nextSteps).slice(0, 3)
      : [
          ...cats.flatMap((c) => c.nextSteps).slice(0, 2),
          'O que é obrigatório no MVP vs. “seria legal ter”?',
          ...GENERIC_QUESTIONS.slice(0, 2),
        ]

  return {
    confidence,
    matches: selectedUnique,
    title,
    summary: summary.replace(/\*\*/g, ''),
    deliverables: mergeUnique(cats.map((c) => c.deliverables)).slice(0, 8),
    stack: mergeUnique(cats.map((c) => c.stack)).slice(0, 10),
    nextSteps: mergeUnique(cats.map((c) => c.nextSteps)).slice(0, 5),
    clarifyingQuestions: clarifying.slice(0, 5),
    userText,
    confidenceNote:
      confidence === 'high'
        ? 'Confiança alta: termos claros no pedido.'
        : 'Confiança média: há match, mas vale validar detalhes no WhatsApp.',
  }
}

export function buildWhatsAppScopeMessage(suggestion: ScopeSuggestion): string {
  const lines = [
    'Olá! Vim pelo portfólio do Gabriel.',
    '',
    'O que eu escrevi:',
    `"${suggestion.userText}"`,
    '',
  ]

  if (suggestion.confidence === 'low') {
    lines.push(
      'Ainda não fechei o tipo de projeto no site (prefiro alinhar sem chute).',
      '',
      'Perguntas que ajudam:',
      ...suggestion.clarifyingQuestions.map((q) => `• ${q}`),
    )
  } else {
    lines.push(
      `Escopo sugerido no site (${suggestion.confidence}): ${suggestion.title}`,
      '',
      'Entregáveis (rascunho):',
      ...suggestion.deliverables.map((d) => `• ${d}`),
      '',
      'Stack provável:',
      suggestion.stack.join(', '),
      '',
      'Quero conversar para validar e fechar o escopo.',
    )
  }

  return lines.join('\n')
}

export function whatsappHref(digits: string, message: string): string {
  const d = digits.replace(/\D/g, '')
  return `https://wa.me/${d}?text=${encodeURIComponent(message)}`
}
