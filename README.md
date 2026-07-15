# Portfolio — Gabriel Almeida

Portfolio pessoal de **Gabriel Almeida**: engenharia de agentes CLI/LLM, automação real e sistemas com loop em produção.

**One-liner:** do skill ao bot em produção — agent tooling, Playwright + LLM e entregas web com método (brainstorm → plan → TDD → verify-done).

## Como rodar

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # vitest
npm run build    # build de produção
```

Opcional: copie `.env.example` para `.env.local` e preencha as variáveis.

## Conteúdo

| Caminho | Função |
|---------|--------|
| `content/site.ts` | Config do site (nome, tagline, proof bar, OSS, método, contatos) |
| `content/cases/*.md` | Cases em Markdown + frontmatter (slug, title, stack, etc.) |

Cases atuais: `agent-tooling`, `wpp-grok`, `arc-web`.

> **Privacidade:** o case `wpp-grok` é sanitizado — sem nomes reais de leads, telefones de clientes ou PII de conversas.

## Deploy (Vercel)

1. Conecte o repositório na [Vercel](https://vercel.com).
2. Defina as env vars:
   - `NEXT_PUBLIC_SITE_URL` — URL canônica do site (ex.: `https://seu-dominio.vercel.app`)
   - `NEXT_PUBLIC_WHATSAPP` — (opcional) número em formato internacional sem `+` (ex.: `5561999999999`)

## Design e plano

Documentação de design e plano de implementação:

- [`docs/superpowers/specs/2026-07-15-portfolio-design.md`](docs/superpowers/specs/2026-07-15-portfolio-design.md)
- [`docs/superpowers/plans/2026-07-15-portfolio.md`](docs/superpowers/plans/2026-07-15-portfolio.md)

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS · Vitest · Zod · gray-matter / react-markdown
