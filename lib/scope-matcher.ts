/**
 * Scope playground — keyword/scored matcher with safe fallback.
 * Never invent a specific product when confidence is low.
 * Keywords stay bilingual; labels/copy follow locale.
 */

import type { Locale } from '@/i18n/routing'

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
  /** Keywords / phrases (matched after normalize) — bilingual, language-neutral */
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

type CategoryBase = {
  id: ScopeCategoryId
  keywords: string[]
  strongKeywords?: string[]
  stack: string[]
}

type CategoryCopy = {
  label: string
  deliverables: string[]
  nextSteps: string[]
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

/** Language-neutral matching data (keywords stay mixed PT/EN). */
const CATEGORY_BASE: CategoryBase[] = [
  {
    id: 'landing',
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
    stack: ['Next.js', 'SEO básico', 'Analytics', 'Deploy Vercel'],
  },
  {
    id: 'website',
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
    stack: ['Next.js', 'UI moderna', 'SEO', 'Vercel'],
  },
  {
    id: 'agent',
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
    stack: ['TypeScript', 'LLM API', 'Guardrails', 'Observabilidade'],
  },
  {
    id: 'automation',
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
    stack: ['Playwright / APIs', 'TypeScript', 'Filas / cron', 'Monitoramento'],
  },
  {
    id: 'whatsapp',
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
    stack: ['Playwright ou API oficial', 'LLM', 'Persona / scripts'],
  },
  {
    id: 'ecommerce',
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
    stack: ['Next.js', 'Pagamentos', 'CMS/catálogo', 'SEO'],
  },
  {
    id: 'seo',
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
    stack: ['Next.js SEO', 'Lighthouse', 'Search Console'],
  },
  {
    id: 'integration',
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
    stack: ['TypeScript', 'APIs REST', 'Auth', 'Observabilidade'],
  },
  {
    id: 'security',
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
    stack: ['Review de código', 'Checklist OWASP', 'Testes'],
  },
  {
    id: 'tooling',
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
    stack: ['TypeScript', 'Node CLI', 'Docs', 'CI'],
  },
  {
    id: 'redesign',
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
    stack: ['Next.js', 'Design system leve', 'SEO preservado'],
  },
  {
    id: 'app',
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
    stack: ['Next.js', 'Auth', 'DB/API', 'TypeScript'],
  },
]

const CATEGORY_COPY: Record<Locale, Record<ScopeCategoryId, CategoryCopy>> = {
  pt: {
    landing: {
      label: 'Landing page',
      deliverables: [
        'Landing focada em uma oferta/CTA',
        'Copy e seções de conversão (hero, prova, FAQ, contato)',
        'Integração WhatsApp / formulário / pixel (conforme necessidade)',
      ],
      nextSteps: [
        'Definir oferta, público e CTA principal',
        'Reunir textos, logo e referências visuais',
      ],
    },
    website: {
      label: 'Site institucional / multi-página',
      deliverables: [
        'Site multi-seção ou multi-página (home, serviços, sobre, contato)',
        'Layout responsivo e identidade visual alinhada à marca',
        'SEO on-page e formulário / WhatsApp',
      ],
      nextSteps: [
        'Mapear páginas e conteúdo de cada uma',
        'Definir tom de voz e referências de design',
      ],
    },
    agent: {
      label: 'Agente com AI / LLM',
      deliverables: [
        'Agente com loop (ler → decidir → agir) e critérios de parada',
        'Prompts/policies e handoff para humano quando necessário',
        'Integração com canal (web, CLI, WhatsApp, etc.)',
      ],
      nextSteps: [
        'Definir o que o agente pode e não pode fazer',
        'Escolher canal e fontes de contexto (docs, CRM, etc.)',
      ],
    },
    automation: {
      label: 'Automação de processos',
      deliverables: [
        'Mapeamento do processo atual e pontos de automação',
        'Fluxo automatizado com logs e tratamento de erro',
        'Handoff humano em falhas / casos fora do script',
      ],
      nextSteps: [
        'Descrever o processo passo a passo (como é feito hoje)',
        'Listar sistemas envolvidos e acessos necessários',
      ],
    },
    whatsapp: {
      label: 'WhatsApp (atendimento / bot)',
      deliverables: [
        'Fluxo de atendimento / qualificação no WhatsApp',
        'Respostas com LLM + regras de negócio e escalonamento',
        'Métricas básicas (volume, falhas, handoff)',
      ],
      nextSteps: [
        'Definir script de atendimento e horários',
        'Escolher API oficial vs automação web (prós/contras)',
      ],
    },
    ecommerce: {
      label: 'Loja / catálogo / vendas online',
      deliverables: [
        'Vitrine/catálogo ou loja com fluxo de compra (conforme escopo)',
        'Integração de pagamento e/ou catálogo',
        'Páginas de produto e contato/suporte',
      ],
      nextSteps: [
        'Listar produtos e se precisa de pagamento online de verdade',
        'Definir se é catálogo + WhatsApp ou checkout completo',
      ],
    },
    seo: {
      label: 'SEO e performance',
      deliverables: [
        'Auditoria de SEO técnico e performance',
        'Metadados, sitemap, estrutura e melhorias de CWV',
        'Plano de conteúdo / keywords (se aplicável)',
      ],
      nextSteps: [
        'Informar URL atual (se existir) e palavras-alvo',
        'Priorizar: técnico, conteúdo ou os dois',
      ],
    },
    integration: {
      label: 'Integrações e APIs',
      deliverables: [
        'Desenho das integrações (o que entra/sai de cada sistema)',
        'Implementação de APIs/webhooks com auth e logs',
        'Testes de ponta a ponta nos fluxos críticos',
      ],
      nextSteps: [
        'Listar sistemas e se há documentação/API disponível',
        'Definir o fluxo principal a integrar primeiro',
      ],
    },
    security: {
      label: 'Qualidade e segurança',
      deliverables: [
        'Revisão white-box / checklist OWASP do app',
        'Lista priorizada de riscos e correções',
        'Gates de qualidade (testes, lint, verify) se desejado',
      ],
      nextSteps: [
        'Informar se o app é próprio e em qual ambiente (staging)',
        'Priorizar: login, dados de usuário, pagamentos, etc.',
      ],
    },
    tooling: {
      label: 'Tooling / CLI / skills de agentes',
      deliverables: [
        'CLI ou skill instalável com docs claras',
        'Fluxo de uso (help, exemplos, erros amigáveis)',
        'Testes e versionamento',
      ],
      nextSteps: [
        'Descrever o fluxo manual que a ferramenta deve encurtar',
        'Definir público (time interno, open source, clientes)',
      ],
    },
    redesign: {
      label: 'Redesign / modernização de site',
      deliverables: [
        'Novo visual mantendo (ou melhorando) conversão e SEO',
        'Componentes e tipografia consistentes',
        'Migração de conteúdo e deploy',
      ],
      nextSteps: [
        'Enviar URL atual e o que mais incomoda no site de hoje',
        'Referências de sites que você gosta',
      ],
    },
    app: {
      label: 'Web app / sistema / dashboard',
      deliverables: [
        'MVP ou módulo de produto com fluxos principais',
        'Auth e papéis se necessário',
        'Deploy e base para evoluir',
      ],
      nextSteps: [
        'Listar as 3 telas/fluxos mais importantes do MVP',
        'Definir se há login e tipos de usuário',
      ],
    },
  },
  en: {
    landing: {
      label: 'Landing page',
      deliverables: [
        'Landing focused on a single offer/CTA',
        'Conversion sections (hero, proof, FAQ, contact)',
        'WhatsApp / form / pixel integration (as needed)',
      ],
      nextSteps: [
        'Define offer, audience, and main CTA',
        'Gather copy, logo, and visual references',
      ],
    },
    website: {
      label: 'Institutional / multi-page website',
      deliverables: [
        'Multi-section or multi-page site (home, services, about, contact)',
        'Responsive layout and brand-aligned visuals',
        'On-page SEO and form / WhatsApp',
      ],
      nextSteps: [
        'Map pages and content for each one',
        'Define tone of voice and design references',
      ],
    },
    agent: {
      label: 'AI / LLM agent',
      deliverables: [
        'Agent loop (read → decide → act) with stop criteria',
        'Prompts/policies and human handoff when needed',
        'Channel integration (web, CLI, WhatsApp, etc.)',
      ],
      nextSteps: [
        'Define what the agent can and cannot do',
        'Choose channel and context sources (docs, CRM, etc.)',
      ],
    },
    automation: {
      label: 'Process automation',
      deliverables: [
        'Map of the current process and automation points',
        'Automated flow with logs and error handling',
        'Human handoff on failures / out-of-script cases',
      ],
      nextSteps: [
        'Describe the process step by step (as done today)',
        'List systems involved and required access',
      ],
    },
    whatsapp: {
      label: 'WhatsApp (support / bot)',
      deliverables: [
        'Support / lead-qualification flow on WhatsApp',
        'LLM replies + business rules and escalation',
        'Basic metrics (volume, failures, handoff)',
      ],
      nextSteps: [
        'Define support script and hours',
        'Choose official API vs web automation (pros/cons)',
      ],
    },
    ecommerce: {
      label: 'Store / catalog / online sales',
      deliverables: [
        'Catalog/storefront or store with purchase flow (per scope)',
        'Payment and/or catalog integration',
        'Product pages and contact/support',
      ],
      nextSteps: [
        'List products and whether real online payment is needed',
        'Decide catalog + WhatsApp vs full checkout',
      ],
    },
    seo: {
      label: 'SEO and performance',
      deliverables: [
        'Technical SEO and performance audit',
        'Metadata, sitemap, structure, and CWV improvements',
        'Content / keyword plan (if applicable)',
      ],
      nextSteps: [
        'Share current URL (if any) and target keywords',
        'Prioritize: technical, content, or both',
      ],
    },
    integration: {
      label: 'Integrations and APIs',
      deliverables: [
        'Integration design (what enters/leaves each system)',
        'API/webhook implementation with auth and logs',
        'End-to-end tests on critical flows',
      ],
      nextSteps: [
        'List systems and whether docs/APIs are available',
        'Define the main flow to integrate first',
      ],
    },
    security: {
      label: 'Quality and security',
      deliverables: [
        'White-box review / OWASP checklist for the app',
        'Prioritized risk and fix list',
        'Quality gates (tests, lint, verify) if desired',
      ],
      nextSteps: [
        'Confirm the app is yours and which environment (staging)',
        'Prioritize: login, user data, payments, etc.',
      ],
    },
    tooling: {
      label: 'Tooling / CLI / agent skills',
      deliverables: [
        'Installable CLI or skill with clear docs',
        'Usage flow (help, examples, friendly errors)',
        'Tests and versioning',
      ],
      nextSteps: [
        'Describe the manual flow the tool should shorten',
        'Define audience (internal team, open source, clients)',
      ],
    },
    redesign: {
      label: 'Redesign / site modernization',
      deliverables: [
        'New visuals while keeping (or improving) conversion and SEO',
        'Consistent components and typography',
        'Content migration and deploy',
      ],
      nextSteps: [
        'Share current URL and what bothers you most today',
        'References of sites you like',
      ],
    },
    app: {
      label: 'Web app / system / dashboard',
      deliverables: [
        'MVP or product module with core flows',
        'Auth and roles if needed',
        'Deploy and foundation to evolve',
      ],
      nextSteps: [
        'List the 3 most important MVP screens/flows',
        'Define whether login and user types are needed',
      ],
    },
  },
}

type FixedCopy = {
  genericQuestions: string[]
  shortTitle: string
  shortSummary: string
  shortNextSteps: string[]
  shortConfidenceNote: string
  lowTitle: string
  lowSummary: string
  lowDeliverables: string[]
  lowStack: string[]
  lowNextSteps: string[]
  lowRelatedQuestion: (label: string) => string
  lowConfidenceNote: string
  hybridTitle: (labels: string) => string
  singleTitle: (label: string) => string
  highSummary: (labels: string) => string
  mediumSummary: (labels: string) => string
  mvpQuestion: string
  highConfidenceNote: string
  mediumConfidenceNote: string
  waGreeting: string
  waWrote: string
  waLowBody: string
  waQuestionsHelp: string
  waSuggested: (confidence: string, title: string) => string
  waDeliverables: string
  waStack: string
  waClosing: string
}

const FIXED_COPY: Record<Locale, FixedCopy> = {
  pt: {
    genericQuestions: [
      'Qual o objetivo principal: vender, atender, automatizar ou tudo junto?',
      'Já existe site/sistema hoje? Se sim, qual a URL?',
      'Tem prazo ou data de campanha em mente?',
      'Prefere começar por um MVP enxuto ou um pacote mais completo?',
    ],
    shortTitle: 'Conte um pouco mais',
    shortSummary:
      'Escreva em 1–3 frases o que você precisa (ex.: “landing para campanha + bot no WhatsApp”). Quanto mais contexto, melhor o encaixe.',
    shortNextSteps: ['Descrever objetivo, público e se já existe site'],
    shortConfidenceNote:
      'Ainda não há texto suficiente para sugerir um escopo sem chutar.',
    lowTitle: 'Vamos alinhar o escopo juntos',
    lowSummary:
      'Entendi o pedido, mas ainda não encaixei com segurança em um tipo de projeto específico — e prefiro não inventar. O ideal é conversarmos com o seu texto original.',
    lowDeliverables: [
      'Call ou WhatsApp para esclarecer objetivo e restrições',
      'Proposta enxuta depois do alinhamento (sem chute de escopo)',
    ],
    lowStack: ['A definir com base no que você precisa'],
    lowNextSteps: [
      'Enviar o texto abaixo no WhatsApp (já inclui o que você escreveu)',
      'Responder 2–3 perguntas de esclarecimento',
    ],
    lowRelatedQuestion: (label) =>
      `Tem a ver com “${label}” ou era outra coisa?`,
    lowConfidenceNote:
      'Confiança baixa: palavras genéricas ou fora do mapa. Nada de sugestão forçada.',
    hybridTitle: (labels) => `Escopo híbrido: ${labels}`,
    singleTitle: (label) => `Escopo sugerido: ${label}`,
    highSummary: (labels) =>
      `Pelo que você escreveu, o encaixe mais natural é ${labels}. Abaixo um rascunho de escopo — sempre validamos contigo antes de fechar.`,
    mediumSummary: (labels) =>
      `Sinais de ${labels}. Pode haver sobreposição; o rascunho abaixo é um ponto de partida, não proposta fechada.`,
    mvpQuestion: 'O que é obrigatório no MVP vs. “seria legal ter”?',
    highConfidenceNote: 'Confiança alta: termos claros no pedido.',
    mediumConfidenceNote:
      'Confiança média: há match, mas vale validar detalhes no WhatsApp.',
    waGreeting: 'Olá! Vim pelo portfólio do Gabriel.',
    waWrote: 'O que eu escrevi:',
    waLowBody:
      'Ainda não fechei o tipo de projeto no site (prefiro alinhar sem chute).',
    waQuestionsHelp: 'Perguntas que ajudam:',
    waSuggested: (confidence, title) =>
      `Escopo sugerido no site (${confidence}): ${title}`,
    waDeliverables: 'Entregáveis (rascunho):',
    waStack: 'Stack provável:',
    waClosing: 'Quero conversar para validar e fechar o escopo.',
  },
  en: {
    genericQuestions: [
      'Main goal: sell, support, automate, or a mix?',
      'Do you already have a site/system? If yes, what is the URL?',
      'Any deadline or campaign date in mind?',
      'Prefer a lean MVP first or a fuller package?',
    ],
    shortTitle: 'Tell me a bit more',
    shortSummary:
      'Write in 1–3 sentences what you need (e.g. “landing for a campaign + WhatsApp bot”). More context means a better match.',
    shortNextSteps: [
      'Describe goal, audience, and whether a site already exists',
    ],
    shortConfidenceNote:
      'Not enough text yet to suggest a scope without guessing.',
    lowTitle: "Let's align the scope together",
    lowSummary:
      "I understood the request, but I still can't confidently map it to a specific project type — and I prefer not to invent one. Best is to talk with your original text.",
    lowDeliverables: [
      'Call or WhatsApp to clarify goals and constraints',
      'Lean proposal after alignment (no guessed scope)',
    ],
    lowStack: ['To define based on what you need'],
    lowNextSteps: [
      'Send the text below on WhatsApp (already includes what you wrote)',
      'Answer 2–3 clarifying questions',
    ],
    lowRelatedQuestion: (label) =>
      `Is this about “${label}” or something else?`,
    lowConfidenceNote:
      'Low confidence: generic or out-of-map wording. No forced suggestion.',
    hybridTitle: (labels) => `Hybrid scope: ${labels}`,
    singleTitle: (label) => `Suggested scope: ${label}`,
    highSummary: (labels) =>
      `From what you wrote, the most natural fit is ${labels}. Below is a draft scope — we always validate with you before locking anything in.`,
    mediumSummary: (labels) =>
      `Signals of ${labels}. There may be overlap; the draft below is a starting point, not a closed proposal.`,
    mvpQuestion: 'What is must-have for the MVP vs. “nice to have”?',
    highConfidenceNote: 'High confidence: clear terms in the request.',
    mediumConfidenceNote:
      'Medium confidence: there is a match, but details are worth validating on WhatsApp.',
    waGreeting: "Hello! I came from Gabriel's portfolio.",
    waWrote: 'What I wrote:',
    waLowBody:
      "I haven't locked a project type on the site yet (I prefer aligning without guessing).",
    waQuestionsHelp: 'Questions that help:',
    waSuggested: (confidence, title) =>
      `Scope suggested on the site (${confidence}): ${title}`,
    waDeliverables: 'Deliverables (draft):',
    waStack: 'Likely stack:',
    waClosing: 'I want to talk to validate and finalize the scope.',
  },
}

export function getScopeCategories(locale: Locale = 'pt'): ScopeCategory[] {
  const copy = CATEGORY_COPY[locale] ?? CATEGORY_COPY.pt
  return CATEGORY_BASE.map((base) => {
    const c = copy[base.id]
    return {
      id: base.id,
      label: c.label,
      keywords: base.keywords,
      strongKeywords: base.strongKeywords,
      deliverables: c.deliverables,
      stack: base.stack,
      nextSteps: c.nextSteps,
    }
  })
}

/** @deprecated Prefer getScopeCategories(locale). Kept for PT default callers. */
export const SCOPE_CATEGORIES: ScopeCategory[] = getScopeCategories('pt')

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

export function scoreCategories(
  raw: string,
  locale: Locale = 'pt',
): MatchedCategory[] {
  const normalized = normalizeText(raw)
  if (!normalized || normalized.length < 3) return []

  const categories = getScopeCategories(locale)
  const results: MatchedCategory[] = []

  for (const cat of categories) {
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

function categoryById(
  id: ScopeCategoryId,
  locale: Locale,
): ScopeCategory {
  const c = getScopeCategories(locale).find((x) => x.id === id)
  if (!c) throw new Error(`Unknown category ${id}`)
  return c
}

/**
 * Main entry: raw user text → suggestion with confidence + safe fallback.
 */
export function suggestScope(
  raw: string,
  locale: Locale = 'pt',
): ScopeSuggestion {
  const copy = FIXED_COPY[locale] ?? FIXED_COPY.pt
  const userText = raw.trim()
  const matches = scoreCategories(userText, locale)
  const top = matches[0]
  const topScore = top?.score ?? 0

  // Empty / too short
  if (userText.length < 8) {
    return {
      confidence: 'low',
      matches: [],
      title: copy.shortTitle,
      summary: copy.shortSummary,
      deliverables: [],
      stack: [],
      nextSteps: copy.shortNextSteps,
      clarifyingQuestions: copy.genericQuestions,
      userText,
      confidenceNote: copy.shortConfidenceNote,
    }
  }

  // Low confidence: do NOT invent a specific product
  if (!top || topScore < MEDIUM_THRESHOLD) {
    return {
      confidence: 'low',
      matches,
      title: copy.lowTitle,
      summary: copy.lowSummary,
      deliverables: copy.lowDeliverables,
      stack: copy.lowStack,
      nextSteps: copy.lowNextSteps,
      clarifyingQuestions: [
        ...matches
          .slice(0, 2)
          .map((m) => copy.lowRelatedQuestion(m.label)),
        ...copy.genericQuestions,
      ].slice(0, 5),
      userText,
      confidenceNote: copy.lowConfidenceNote,
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
    : [
        top,
        ...(second && second.score >= HIGH_THRESHOLD * 0.7 ? [second] : []),
      ].slice(0, hybrid ? 2 : topScore >= HIGH_THRESHOLD ? 1 : 2)

  // Dedupe selected by id
  const selectedUnique: MatchedCategory[] = []
  for (const m of selected) {
    if (!selectedUnique.find((x) => x.id === m.id)) selectedUnique.push(m)
  }

  const cats = selectedUnique.map((m) => categoryById(m.id, locale))
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
      ? copy.hybridTitle(labels)
      : copy.singleTitle(cats[0].label)

  const summary =
    confidence === 'high'
      ? copy.highSummary(labels)
      : copy.mediumSummary(labels)

  const clarifying =
    confidence === 'high'
      ? cats.flatMap((c) => c.nextSteps).slice(0, 3)
      : [
          ...cats.flatMap((c) => c.nextSteps).slice(0, 2),
          copy.mvpQuestion,
          ...copy.genericQuestions.slice(0, 2),
        ]

  return {
    confidence,
    matches: selectedUnique,
    title,
    summary,
    deliverables: mergeUnique(cats.map((c) => c.deliverables)).slice(0, 8),
    stack: mergeUnique(cats.map((c) => c.stack)).slice(0, 10),
    nextSteps: mergeUnique(cats.map((c) => c.nextSteps)).slice(0, 5),
    clarifyingQuestions: clarifying.slice(0, 5),
    userText,
    confidenceNote:
      confidence === 'high'
        ? copy.highConfidenceNote
        : copy.mediumConfidenceNote,
  }
}

export function buildWhatsAppScopeMessage(
  suggestion: ScopeSuggestion,
  locale: Locale = 'pt',
): string {
  const copy = FIXED_COPY[locale] ?? FIXED_COPY.pt
  const lines = [
    copy.waGreeting,
    '',
    copy.waWrote,
    `"${suggestion.userText}"`,
    '',
  ]

  if (suggestion.confidence === 'low') {
    lines.push(
      copy.waLowBody,
      '',
      copy.waQuestionsHelp,
      ...suggestion.clarifyingQuestions.map((q) => `• ${q}`),
    )
  } else {
    lines.push(
      copy.waSuggested(suggestion.confidence, suggestion.title),
      '',
      copy.waDeliverables,
      ...suggestion.deliverables.map((d) => `• ${d}`),
      '',
      copy.waStack,
      suggestion.stack.join(', '),
      '',
      copy.waClosing,
    )
  }

  return lines.join('\n')
}

export function whatsappHref(digits: string, message: string): string {
  const d = digits.replace(/\D/g, '')
  return `https://wa.me/${d}?text=${encodeURIComponent(message)}`
}
