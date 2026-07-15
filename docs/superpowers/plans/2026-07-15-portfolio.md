# Portfolio Pessoal — Implementation Plan

> **For agentic workers:** Execute with `execute-tasks` (or inline in-session).  
> Track steps with checkbox (`- [ ]`) syntax.

**Goal:** Lançar um site Next.js que empacota kits Grok, wpp-grok e arc-web em home “proof stack” + 3 cases profundos, para recrutadores, freela e OSS.

**Architecture:** App Router (Server Components) + conteúdo versionado em `content/` (Markdown + frontmatter) + loader tipado em `lib/content.ts` + UI em `components/`. Build falha se frontmatter inválido. Deploy Vercel.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 3, Vitest, Testing Library, gray-matter, zod, react-markdown, remark-gfm.

**Design spec:** `docs/superpowers/specs/2026-07-15-portfolio-design.md`

## Global Constraints

- YAGNI: sem CLI, CMS, blog, i18n, auth, clone visual ARC
- Exatamente **3** cases no MVP: `agent-tooling`, `wpp-grok`, `arc-web`
- Sem dados sensíveis de leads do wpp-grok
- Testes em Vitest; TDD nas camadas de conteúdo e componentes de prova
- Commits pequenos e frequentes
- Root do projeto: `gabriel-portfolio/` (Desktop/Projetos Grok)
- Node 20+; package manager: npm

## File Map

| Path | Responsibility |
|------|----------------|
| `package.json` | Scripts: `dev`, `build`, `start`, `test`, `test:watch` |
| `vitest.config.ts` | Vitest + jsdom + path alias `@/` |
| `tsconfig.json` | Strict TS, paths `@/*` |
| `next.config.ts` | Next defaults |
| `tailwind.config.ts` / `postcss.config.mjs` | Tailwind |
| `app/globals.css` | Tailwind layers + tokens base |
| `app/layout.tsx` | Root layout, fonts, metadata default, header/footer |
| `app/page.tsx` | Home proof stack |
| `app/cases/page.tsx` | Índice de cases |
| `app/cases/[slug]/page.tsx` | Case individual + `generateStaticParams` |
| `app/stack/page.tsx` | Método + stack |
| `app/contato/page.tsx` | CTAs de contato |
| `app/robots.ts` / `app/sitemap.ts` | SEO |
| `content/site.ts` | SiteConfig (tagline, proof, OSS, contacts) |
| `content/cases/*.md` | 3 cases Markdown + frontmatter |
| `lib/schemas.ts` | Zod schemas CaseFrontmatter + SiteConfig |
| `lib/content.ts` | `getSiteConfig`, `loadCases`, `getCaseBySlug` |
| `lib/content.test.ts` | TDD loader/schema |
| `components/SiteHeader.tsx` | Nav |
| `components/SiteFooter.tsx` | Footer + social |
| `components/Hero.tsx` | Hero home |
| `components/ProofBar.tsx` | Stats |
| `components/CaseCard.tsx` | Card case |
| `components/CaseCard.test.tsx` | Render title/summary/link |
| `components/MethodSteps.tsx` | 4 passos |
| `components/OssList.tsx` | Lista OSS |
| `components/ContactCtas.tsx` | Botões contato |
| `components/MarkdownBody.tsx` | Render Markdown do case |
| `README.md` | Como rodar / deploy |

---

### Task 1: Scaffold Next + Vitest + Tailwind

**Files:**
- Create: project root via `create-next-app` + configs de teste
- Create: `vitest.config.ts`, `vitest.setup.ts`

- [ ] **Step 1: Scaffold**

```bash
cd "C:\Users\Gabriel\Desktop\Projetos Grok"
npx create-next-app@latest gabriel-portfolio --typescript --tailwind --eslint --app --src-dir=false --import-alias "@/*" --turbopack --yes
cd gabriel-portfolio
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install zod gray-matter react-markdown remark-gfm
```

Preserve existing `docs/` folder if create-next-app would conflict — scaffold into temp only if needed; **do not delete** `docs/superpowers/`.

- [ ] **Step 2: Add test scripts and Vitest config**

`package.json` scripts:

```json
{
  "test": "vitest run",
  "test:watch": "vitest"
}
```

`vitest.config.ts`:

```ts
import path from 'node:path'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/*.{test,spec}.{ts,tsx}'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
})
```

`vitest.setup.ts`:

```ts
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 3: Smoke test file**

Create `lib/smoke.test.ts`:

```ts
import { describe, it, expect } from 'vitest'

describe('scaffold', () => {
  it('runs vitest', () => {
    expect(1 + 1).toBe(2)
  })
})
```

- [ ] **Step 4: Run tests — expect PASS**

```bash
npm test
```

Expected: PASS `scaffold`

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next portfolio with Vitest and Tailwind"
```

---

### Task 2: SiteConfig schema + getSiteConfig

**Files:**
- Create: `lib/schemas.ts`
- Create: `content/site.ts`
- Create: `lib/content.ts`
- Test: `lib/content.test.ts`

**Interfaces:**
- Produces: `SiteConfig`, `getSiteConfig()`

- [ ] **Step 1: Write the failing test**

`lib/content.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { getSiteConfig } from './content'

describe('getSiteConfig', () => {
  it('returns required identity fields', () => {
    const site = getSiteConfig()
    expect(site.name).toBe('Gabriel Almeida')
    expect(site.tagline.length).toBeGreaterThan(10)
    expect(site.github).toMatch(/^https:\/\/github\.com\//)
    expect(site.proofItems.length).toBeGreaterThanOrEqual(3)
    expect(site.ossRepos.length).toBeGreaterThanOrEqual(3)
  })

  it('proof items have label and value', () => {
    const site = getSiteConfig()
    for (const item of site.proofItems) {
      expect(item.label.length).toBeGreaterThan(0)
      expect(item.value.length).toBeGreaterThan(0)
    }
  })
})
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
npm test -- lib/content.test.ts
```

Expected: cannot find module `./content` or `getSiteConfig` undefined

- [ ] **Step 3: Minimal implementation**

`lib/schemas.ts`:

```ts
import { z } from 'zod'

export const proofItemSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
})

export const ossRepoSchema = z.object({
  name: z.string().min(1),
  url: z.string().url(),
  blurb: z.string().min(1),
})

export const siteConfigSchema = z.object({
  name: z.string().min(1),
  tagline: z.string().min(10),
  github: z.string().url(),
  linkedin: z.string().url().optional(),
  whatsapp: z.string().optional(),
  email: z.string().email().optional(),
  proofItems: z.array(proofItemSchema).min(3),
  ossRepos: z.array(ossRepoSchema).min(3),
  methodSteps: z
    .array(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
      }),
    )
    .length(4),
})

export type SiteConfig = z.infer<typeof siteConfigSchema>

export const caseFrontmatterSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  summary: z.string().min(1),
  audience: z.array(z.enum(['recruiter', 'freelance', 'oss'])).min(1),
  stack: z.array(z.string().min(1)).min(1),
  repoUrl: z.string().url().optional(),
  demoUrl: z.string().url().optional(),
  order: z.number().int().positive(),
})

export type CaseFrontmatter = z.infer<typeof caseFrontmatterSchema>

export type CaseDocument = CaseFrontmatter & {
  body: string
}
```

`content/site.ts`:

```ts
import type { SiteConfig } from '@/lib/schemas'

export const siteConfig = {
  name: 'Gabriel Almeida',
  tagline:
    'Engenharia de agentes CLI/LLM e automação real: do skill ao bot em produção.',
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
```

`lib/content.ts`:

```ts
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { siteConfig } from '@/content/site'
import {
  caseFrontmatterSchema,
  siteConfigSchema,
  type CaseDocument,
  type SiteConfig,
} from '@/lib/schemas'

const CASES_DIR = path.join(process.cwd(), 'content', 'cases')

export function getSiteConfig(): SiteConfig {
  return siteConfigSchema.parse(siteConfig)
}

export function loadCases(): CaseDocument[] {
  if (!fs.existsSync(CASES_DIR)) return []
  const files = fs.readdirSync(CASES_DIR).filter((f) => f.endsWith('.md'))
  const cases = files.map((file) => {
    const raw = fs.readFileSync(path.join(CASES_DIR, file), 'utf8')
    const { data, content } = matter(raw)
    const frontmatter = caseFrontmatterSchema.parse(data)
    return { ...frontmatter, body: content.trim() }
  })
  return cases.sort((a, b) => a.order - b.order)
}

export function getCaseBySlug(slug: string): CaseDocument | null {
  return loadCases().find((c) => c.slug === slug) ?? null
}
```

- [ ] **Step 4: Run test — expect PASS**

```bash
npm test -- lib/content.test.ts
```

Expected: PASS both tests

- [ ] **Step 5: Commit**

```bash
git add lib/schemas.ts lib/content.ts lib/content.test.ts content/site.ts
git commit -m "feat: add SiteConfig schema and getSiteConfig"
```

---

### Task 3: Case loader + 3 fixture cases (minimal)

**Files:**
- Create: `content/cases/agent-tooling.md`
- Create: `content/cases/wpp-grok.md`
- Create: `content/cases/arc-web.md`
- Modify: `lib/content.test.ts`

**Interfaces:**
- Consumes: `caseFrontmatterSchema`
- Produces: `loadCases()`, `getCaseBySlug()`

- [ ] **Step 1: Write the failing tests (append)**

```ts
import { loadCases, getCaseBySlug } from './content'

describe('loadCases', () => {
  it('loads exactly 3 cases sorted by order', () => {
    const cases = loadCases()
    expect(cases).toHaveLength(3)
    expect(cases.map((c) => c.slug)).toEqual([
      'agent-tooling',
      'wpp-grok',
      'arc-web',
    ])
    expect(cases[0].order).toBeLessThan(cases[1].order)
    expect(cases[1].order).toBeLessThan(cases[2].order)
  })

  it('each case has body and required frontmatter', () => {
    for (const c of loadCases()) {
      expect(c.title.length).toBeGreaterThan(0)
      expect(c.summary.length).toBeGreaterThan(0)
      expect(c.body.length).toBeGreaterThan(20)
      expect(c.stack.length).toBeGreaterThan(0)
      expect(c.audience.length).toBeGreaterThan(0)
    }
  })
})

describe('getCaseBySlug', () => {
  it('returns case for known slug', () => {
    const c = getCaseBySlug('wpp-grok')
    expect(c?.slug).toBe('wpp-grok')
  })

  it('returns null for unknown slug', () => {
    expect(getCaseBySlug('nope')).toBeNull()
  })
})
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
npm test -- lib/content.test.ts
```

Expected: length 0 or missing files

- [ ] **Step 3: Minimal case files**

Create three Markdown files. Example `content/cases/agent-tooling.md`:

```md
---
slug: agent-tooling
title: Agent tooling para CLI LLM
summary: Skills, loops e quality gates que definem como o agente trabalha de verdade.
audience: [recruiter, oss]
stack: [TypeScript, Grok skills, CLI, TDD]
repoUrl: https://github.com/Godz57/grok-superpowers
order: 1
---

## Contexto e problema

Agentes de coding improvisam. Sem processo, o resultado é vibe-coding frágil.

## Restrições

- Skills on-demand (não carregar bibliotecas enormes sempre)
- Funcionar no ecossistema Grok / agentes CLI
- Instalável e documentado

## Arquitetura

Kits modulares: superpowers (processo), loops (autonomia com stop states), craftsman (quality), pentest/strix/cyber (segurança sob autorização), ai-memory (continuidade).

## Decisões técnicas

1. **Router de skills** em vez de monolito sempre-on.
2. **Spec antes de código** (brainstorm → plan).
3. **Verify-done** com evidência antes de declarar pronto.

## O que prova habilidade CLI/LLM

Desenho de DX de agente: prompts operacionais, gates, e handoff entre sessões.

## Resultado

Suite pública em GitHub (`Godz57/*`) usada no dia a dia de engenharia com agentes.

## Links

- https://github.com/Godz57/grok-superpowers
- https://github.com/Godz57/grok-loops
- https://github.com/Godz57/grok-craftsman
```

`wpp-grok.md` — order 2, audience recruiter+freelance, stack Playwright/TS/LLM, sem nomes de leads, body ≥20 chars com seções do template.

`arc-web.md` — order 3, audience freelance+recruiter, stack Next/Three/Tailwind, repo se público ou omit `repoUrl`.

- [ ] **Step 4: Run test — expect PASS**

```bash
npm test -- lib/content.test.ts
```

Expected: all PASS

- [ ] **Step 5: Commit**

```bash
git add content/cases lib/content.test.ts
git commit -m "feat: load 3 portfolio cases from markdown"
```

---

### Task 4: Layout shell — Header + Footer

**Files:**
- Create: `components/SiteHeader.tsx`
- Create: `components/SiteFooter.tsx`
- Modify: `app/layout.tsx`, `app/globals.css`
- Test: `components/SiteHeader.test.tsx`

- [ ] **Step 1: Failing test**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SiteHeader } from './SiteHeader'

describe('SiteHeader', () => {
  it('links to main sections', () => {
    render(<SiteHeader name="Gabriel Almeida" />)
    expect(screen.getByRole('link', { name: /gabriel almeida/i })).toHaveAttribute(
      'href',
      '/',
    )
    expect(screen.getByRole('link', { name: /cases/i })).toHaveAttribute(
      'href',
      '/cases',
    )
    expect(screen.getByRole('link', { name: /stack/i })).toHaveAttribute(
      'href',
      '/stack',
    )
    expect(screen.getByRole('link', { name: /contato/i })).toHaveAttribute(
      'href',
      '/contato',
    )
  })
})
```

- [ ] **Step 2: Run — expect FAIL**

```bash
npm test -- components/SiteHeader.test.tsx
```

- [ ] **Step 3: Implement Header, Footer, wire layout**

`SiteHeader`: nav links `/`, `/cases`, `/stack`, `/contato`.  
`SiteFooter`: github from `getSiteConfig()`, copyright year.  
`layout.tsx`: wrap children with header/footer; metadata title template `%s · Gabriel Almeida`.

Visual: dark background (`zinc-950`), text zinc-100, accent blue/violet single color — **no** HUD/scanlines.

- [ ] **Step 4: Run — expect PASS**

```bash
npm test -- components/SiteHeader.test.tsx
```

- [ ] **Step 5: Commit**

```bash
git commit -am "feat: site header and footer layout shell"
```

---

### Task 5: Hero + ProofBar

**Files:**
- Create: `components/Hero.tsx`
- Create: `components/ProofBar.tsx`
- Create: `components/Hero.test.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Failing test**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Hero } from './Hero'

describe('Hero', () => {
  it('shows name, tagline and CTAs', () => {
    render(
      <Hero
        name="Gabriel Almeida"
        tagline="Engenharia de agentes CLI/LLM."
        githubUrl="https://github.com/Godz57"
      />,
    )
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Gabriel Almeida',
    )
    expect(screen.getByText(/engenharia de agentes/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /ver cases/i })).toHaveAttribute(
      'href',
      '/cases',
    )
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      'https://github.com/Godz57',
    )
  })
})
```

- [ ] **Step 2: Run — expect FAIL**

```bash
npm test -- components/Hero.test.tsx
```

- [ ] **Step 3: Implement Hero + ProofBar; home uses getSiteConfig()**

`ProofBar` maps `proofItems` to a responsive grid.

- [ ] **Step 4: Run — expect PASS + dev smoke**

```bash
npm test -- components/Hero.test.tsx
npm run build
```

Expected: tests PASS; build succeeds (home may still be partial)

- [ ] **Step 5: Commit**

```bash
git commit -am "feat: home hero and proof bar"
```

---

### Task 6: CaseCard + home cases + /cases index

**Files:**
- Create: `components/CaseCard.tsx`
- Create: `components/CaseCard.test.tsx`
- Create: `app/cases/page.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Failing test**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { CaseCard } from './CaseCard'

describe('CaseCard', () => {
  it('links to case page with title and summary', () => {
    render(
      <CaseCard
        slug="wpp-grok"
        title="Bot WhatsApp + LLM"
        summary="Loop real de atendimento com Playwright."
        stack={['Playwright', 'TypeScript']}
      />,
    )
    expect(screen.getByRole('link')).toHaveAttribute('href', '/cases/wpp-grok')
    expect(screen.getByText('Bot WhatsApp + LLM')).toBeInTheDocument()
    expect(
      screen.getByText(/loop real de atendimento/i),
    ).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run — expect FAIL**

```bash
npm test -- components/CaseCard.test.tsx
```

- [ ] **Step 3: Implement CaseCard; list on home and `/cases` via `loadCases()`**

- [ ] **Step 4: Run — expect PASS**

```bash
npm test -- components/CaseCard.test.tsx
```

- [ ] **Step 5: Commit**

```bash
git commit -am "feat: case cards on home and cases index"
```

---

### Task 7: Case detail page + MarkdownBody

**Files:**
- Create: `components/MarkdownBody.tsx`
- Create: `app/cases/[slug]/page.tsx`
- Test: `lib/content.test.ts` already covers slug; optional generateStaticParams smoke

- [ ] **Step 1: Write failing test for invalid slug helper (if pure)** — skip if only Next `notFound`; instead implement page and assert build.

Implement `app/cases/[slug]/page.tsx`:

```tsx
import { notFound } from 'next/navigation'
import { getCaseBySlug, loadCases } from '@/lib/content'
import { MarkdownBody } from '@/components/MarkdownBody'

export function generateStaticParams() {
  return loadCases().map((c) => ({ slug: c.slug }))
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  // await params (Next 15), title from case or "Case"
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const doc = getCaseBySlug(slug)
  if (!doc) notFound()
  return (
    <article>
      <h1>{doc.title}</h1>
      <p>{doc.summary}</p>
      {/* stack badges, repo link */}
      <MarkdownBody source={doc.body} />
    </article>
  )
}
```

`MarkdownBody`: `react-markdown` + `remark-gfm`.

- [ ] **Step 2: Build — expect 3 static case routes**

```bash
npm run build
```

Expected: no error; `/cases/agent-tooling`, `/cases/wpp-grok`, `/cases/arc-web` generated

- [ ] **Step 3: Deepen case bodies** to full template sections (if still minimal, expand copy now)

- [ ] **Step 4: Commit**

```bash
git commit -am "feat: case detail pages with markdown body"
```

---

### Task 8: MethodSteps + OssList + home complete

**Files:**
- Create: `components/MethodSteps.tsx`
- Create: `components/OssList.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Test MethodSteps renders 4 steps**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MethodSteps } from './MethodSteps'

describe('MethodSteps', () => {
  it('renders four steps', () => {
    render(
      <MethodSteps
        steps={[
          { title: 'A', description: 'da' },
          { title: 'B', description: 'db' },
          { title: 'C', description: 'dc' },
          { title: 'D', description: 'dd' },
        ]}
      />,
    )
    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText('D')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: FAIL → implement → PASS**

- [ ] **Step 3: Wire MethodSteps + OssList + final CTA on `app/page.tsx`**

- [ ] **Step 4: Commit**

```bash
git commit -am "feat: method steps and OSS list on home"
```

---

### Task 9: /stack + /contato

**Files:**
- Create: `app/stack/page.tsx`
- Create: `app/contato/page.tsx`
- Create: `components/ContactCtas.tsx`
- Create: `components/ContactCtas.test.tsx`

- [ ] **Step 1: Failing test ContactCtas**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ContactCtas } from './ContactCtas'

describe('ContactCtas', () => {
  it('renders github link', () => {
    render(
      <ContactCtas github="https://github.com/Godz57" whatsapp="5561999999999" />,
    )
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      'https://github.com/Godz57',
    )
    expect(screen.getByRole('link', { name: /whatsapp/i })).toHaveAttribute(
      'href',
      expect.stringContaining('wa.me/5561999999999'),
    )
  })
})
```

- [ ] **Step 2: FAIL → implement ContactCtas + pages → PASS**

`/stack`: reusa `methodSteps` + lista de stack (TypeScript, Next, Playwright, Vitest, agents CLI).  
`/contato`: texto curto por público + `ContactCtas`.

- [ ] **Step 3: Commit**

```bash
git commit -am "feat: stack and contato pages"
```

---

### Task 10: SEO — metadata, robots, sitemap

**Files:**
- Create: `app/robots.ts`
- Create: `app/sitemap.ts`
- Modify: `app/layout.tsx`, case/stack/contato metadata

- [ ] **Step 1: Implement `robots.ts` and `sitemap.ts`**

```ts
// app/sitemap.ts — include /, /cases, /stack, /contato, and each case slug
// base URL: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
```

- [ ] **Step 2: Build PASS**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git commit -am "feat: robots and sitemap SEO"
```

---

### Task 11: README + final verify

**Files:**
- Create/Update: `README.md`
- Optional: `.env.example` with `NEXT_PUBLIC_WHATSAPP`, `NEXT_PUBLIC_SITE_URL`

- [ ] **Step 1: README** — posicionamento, `npm install`, `npm run dev`, `npm test`, `npm run build`, estrutura de `content/`, nota de sanitização wpp

- [ ] **Step 2: Full verify**

```bash
npm test
npm run build
```

Expected: all tests green; production build OK

- [ ] **Step 3: Manual checklist**

- [ ] Home legível em 30s  
- [ ] 3 cases abrem e têm seções do template  
- [ ] Nenhum lead/nome sensível no case wpp  
- [ ] Links GitHub externos ok  
- [ ] Mobile nav ok  

- [ ] **Step 4: Commit**

```bash
git commit -am "docs: README and launch checklist"
```

---

## Spec → task traceability

| Spec requirement | Task |
|------------------|------|
| Home proof stack | 5, 6, 8 |
| 3 cases profundos | 3, 6, 7 |
| /stack método | 8, 9 |
| /contato | 9 |
| Content versionado + schema | 2, 3 |
| SEO básico | 10 |
| Visual não-ARC | 4 (constraint) |
| Testes conteúdo + componentes | 2–9 |
| Non-goals (no CLI/CMS) | all |

## Out of scope (do not implement in this plan)

- CLI `npx` portfolio-as-agent  
- Blog, CMS, i18n  
- 3D / Arc Reactor  
- Real screenshots com PII  

---

## Handoff

Plan saved at `docs/superpowers/plans/2026-07-15-portfolio.md`.

**Choose execution mode:**

1. **Subagent-driven (recommended)** — fresh subagent per task + review (`execute-tasks`)  
2. **Inline** — same session, checkpoints  
3. **Heavy** — only if you later split multi-PR (not needed for this MVP)
