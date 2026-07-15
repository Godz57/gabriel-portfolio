# Portfolio Pessoal (Gabriel Almeida) — Design

**Date:** 2026-07-15  
**Status:** approved (conversa 2026-07-15 — proof stack + Next + 3 cases)  
**Owner:** Gabriel Almeida  

## Goal

Lançar um **site pessoal em Next.js** que posicione Gabriel como engenheiro forte em **CLI / LLM / agent tooling** e automação real, servindo **três públicos** na mesma vitrine:

1. **Recrutadores / CLT** — clareza em 30s, stack, senioridade, cases com arquitetura  
2. **Clientes freelance / ARC WEB** — problema → resultado de negócio, sem jargão excessivo  
3. **Comunidade OSS / GitHub** — kits públicos, links, prova de craft  

A peça central é **empacotar o que já existe** (kits Godz57, wpp-grok, arc-web), não inventar um produto novo.

## Non-goals (MVP)

- CLI `npx gabriel` / portfolio-as-agent (fase 2 opcional)
- Blog completo ou CMS
- Mais de **3** cases no lançamento
- Visual HUD / Arc Reactor copiado da ARC WEB
- Auth, i18n, dashboard, área logada
- Expor dados de leads, números de clientes, ou mídia sensível do wpp-grok
- Reimplementar os kits dentro do site (só links + narrativa + trechos)

## Background

Material já existente no workspace / GitHub:

| Ativo | Prova |
|-------|--------|
| `grok-superpowers`, `grok-loops`, `grok-craftsman`, `grok-pentest`, `grok-strix`, `grok-cyber-skills`, `grok-ai-memory` | Agent tooling, skills, quality gates, security wrappers |
| `wpp-grok` | Bot WhatsApp + Playwright + LLM em loop real |
| `arc-web` | Site comercial Next + 3D + conversão WhatsApp |

Repos do design aprovado em conversa: abordagem **A — Proof stack**, formato **site Next + cases profundos**.

## Approaches considered

| | Abordagem | Decisão |
|---|-----------|---------|
| A | Proof stack (home em camadas + 3 cases longos) | **Escolhida** |
| B | Product museum (grid de produtos) | Rejeitada — parece catálogo, fraca narrativa |
| C | Agency clone (visual ARC) | Rejeitada — compete com a marca ARC e prioriza estética |

## Proposed design

### Posicionamento (uma linha)

> **Gabriel Almeida** — engenharia de agentes CLI/LLM e automação real: do skill ao bot em produção.

### Mapa de rotas

| Rota | Função |
|------|--------|
| `/` | Home — prova em camadas |
| `/cases` | Índice dos 3 cases |
| `/cases/agent-tooling` | Case: kits Grok / agent tooling |
| `/cases/wpp-grok` | Case: bot WhatsApp + LLM |
| `/cases/arc-web` | Case: site comercial ARC WEB |
| `/stack` | Método de trabalho + stack |
| `/contato` | CTAs: GitHub, LinkedIn, WhatsApp, e-mail |

### Home — seções (ordem)

1. **Hero** — nome, linha de posicionamento, CTAs: “Ver cases” | “GitHub”  
2. **Proof bar** — contagens/facts estáticos (ex.: N kits públicos, bot em produção, stack principal)  
3. **Cases** — 3 cards (1 frase de impacto + link)  
4. **Método** — 4 passos: brainstorm → plan → TDD/execute → verify  
5. **Open source** — lista curta de repos Godz57 com links  
6. **CTA final** — freela / CLT / collab → `/contato`

### Template de case (conteúdo)

Cada case em Markdown/MDX com frontmatter:

1. Contexto e problema  
2. Restrições  
3. Arquitetura (Mermaid no MDX ou diagrama estático)  
4. Decisões técnicas (2–4)  
5. O que prova habilidade CLI/LLM  
6. Resultado (qualitativo ok no MVP)  
7. Links: repo, demo (GIF/vídeo sanitizado), trechos  

### Cases de lançamento

| Slug | Ângulo | Público principal |
|------|--------|-------------------|
| `agent-tooling` | Desenho do *processo* do agente (skills, loops, quality) | Recrutador + OSS |
| `wpp-grok` | Loop real: ler → decidir → humanizar → responder | Freela + eng |
| `arc-web` | Produto web E2E + conversão | Cliente + full-stack |

### Visual / UX

- Limpo, moderno, tipografia forte — **não** clonar HUD/reactor da ARC  
- Dark mode default (dev-friendly); contraste AA  
- Mobile-first; navegação simples  
- Performance: poucas imagens; GIFs leves nos cases  

### Conteúdo e dados

- Cases e copy de home em arquivos versionados (`content/`), não CMS  
- Stats da proof bar e links OSS em `content/site.ts` (ou JSON tipado)  
- Contatos via env (`NEXT_PUBLIC_WHATSAPP`, etc.) quando sensível; defaults públicos ok  

### SEO e share

- `metadata` por página (title, description)  
- `og:image` simples (fase 1: estático ou gerado básico)  
- `robots.txt` + `sitemap`  

## Components and interfaces

### Camada de conteúdo

```ts
// content types (conceitual)
type CaseFrontmatter = {
  slug: string
  title: string
  summary: string // 1 frase home card
  audience: ('recruiter' | 'freelance' | 'oss')[]
  stack: string[]
  repoUrl?: string
  demoUrl?: string
  order: number
}

type SiteConfig = {
  name: string
  tagline: string
  github: string
  linkedin?: string
  whatsapp?: string
  email?: string
  proofItems: { label: string; value: string }[]
  ossRepos: { name: string; url: string; blurb: string }[]
}
```

### UI (MVP)

| Componente | Responsabilidade |
|------------|------------------|
| `SiteHeader` / `SiteFooter` | Nav + links sociais |
| `Hero` | Headline + CTAs |
| `ProofBar` | Stats |
| `CaseCard` | Card do case na home/índice |
| `CaseLayout` | Layout de página de case |
| `MethodSteps` | 4 passos do método |
| `OssList` | Repos públicos |
| `ContactCtas` | Botões de contato |

### Data flow

```
content/*.mdx + content/site.ts
        │
        ▼
 lib/content.ts  (loadCases, getCaseBySlug, getSiteConfig)
        │
        ▼
 app/**/page.tsx  (Server Components)
        │
        ▼
 components/* (presentational)
```

### Error handling

- Case slug inexistente → `notFound()`  
- Frontmatter inválido → falha em **build** ou teste de schema (preferível quebrar cedo)  
- Links externos `rel="noopener noreferrer"` + `target="_blank"`  

## Testing strategy

| Camada | O quê |
|--------|--------|
| Unit | Schema/frontmatter, `loadCases` ordenação/slug, helpers de metadata |
| Component (leve) | CaseCard renderiza title/summary; Hero CTAs com hrefs corretos |
| Smoke | Build Next (`next build`) passa; rotas principais existem |
| Manual | Lighthouse mobile básico; leitura dos 3 cases; sem dados sensíveis no wpp |

TDD nas funções de conteúdo e nos componentes críticos de prova; páginas finas.

## Risks

| Risco | Mitigação |
|-------|-----------|
| Cases viram wall of text | Template fixo + summary de 1 frase + seções curtas |
| Leak de dados do wpp-grok | Checklist de sanitização; só GIFs mock/redacted |
| Escopo creep (CLI, blog, 3D) | Non-goals rígidos no MVP |
| Parecer “só freela” ou “só dev” | Home híbrida + labels de audiência nos cases |
| Stats inventados | Só números verificáveis (repos públicos, stack real) |

## Open questions

- Domínio final (`gabrielalmeida.dev` vs subdomínio vs `*.vercel.app` no launch)  
- Número exato de WhatsApp no CTA (reusar ARC ou pessoal)  
- Foto/avatar oficial e tom (1ª vs 3ª pessoa)  
- Fase 2: CLI portfolio-as-agent — fora do MVP  

## Key decisions

1. **Empacotar existentes** > projeto greenfield de produto  
2. **Proof stack** home + **3 cases** profundos  
3. **Next.js + Tailwind + content files** (MDX ou Markdown + gray-matter)  
4. **Visual próprio**, não clone ARC WEB  
5. **Deploy Vercel**, SEO básico no MVP  
6. Público-alvo **híbrido** na mesma home, profundidade nos cases  

## Success criteria

- Recrutador entende em **~30s** o posicionamento  
- Eng chega em **arquitetura + repo** em 1 clique a partir do case  
- Cliente lê **problema → resultado** sem depender de jargão de agents  
- Cada case tem **prova** (link repo e/ou demo), não só copy  
- `next build` verde; zero conteúdo sensível de leads  

## Implementation handoff

Após aprovação deste arquivo → plano TDD em:

`docs/superpowers/plans/2026-07-15-portfolio.md`

Depois → `/execute-tasks` (subagent-driven ou inline).
