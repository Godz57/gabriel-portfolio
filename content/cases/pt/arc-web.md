---
slug: arc-web
title: ARC WEB — site comercial Next.js com 3D e conversão
summary: Landing premium da ARC WEB — Next, Three.js/R3F e CTA WhatsApp. Live em arcweb.com.br.
audience: [freelance, recruiter]
stack: [Next.js, TypeScript, Three.js, Tailwind CSS]
demoUrl: https://arcweb.com.br
cover: /cases/arc-web.png
order: 2
---

## Contexto e problema

Negócio local precisava de presença web que transmite premium e converte visita em conversa comercial. Templates genéricos não bastavam: era necessário visual forte (incluindo 3D), performance aceitável em mobile e caminho curto até o WhatsApp.

## Restrições

- Entrega comercial com prazo e escopo fechados
- Performance mobile: 3D não pode matar LCP/CLS
- CTA principal = conversão via WhatsApp (não formulário longo)
- Manutenibilidade: conteúdo e contatos fáceis de atualizar

## Arquitetura

- **Next.js (App Router)** — páginas, metadata e deploy estático/SSR conforme necessidade
- **Three.js / R3F** — hero ou seção 3D com fallback e lazy load
- **Tailwind** — layout responsivo e tipografia limpa
- **CTA WhatsApp** — deep link `wa.me` com mensagem pré-preenchida de contexto

## Decisões técnicas

1. **3D sob demanda** — carregar cena só no viewport / após idle para não bloquear first paint.
2. **Design system enxuto** — poucos tokens de cor e espaçamento; foco em hierarquia e CTA.
3. **Conversão > ornamentação** — cada seção empurra para o mesmo objetivo (falar no WhatsApp).
4. **TypeScript end-to-end** — componentes e config tipados para handoff seguro.

## O que prova habilidade CLI/LLM

Entrega full-stack front de produto comercial: performance, UX de conversão e stack moderna (Next + 3D), alinhada a processo de engenharia com agentes (plano, TDD onde couber, verify-done).

## Resultado

Site no ar com identidade visual forte, seção 3D controlada e fluxo de contato direto no WhatsApp — visitante vira lead com um clique.

## Links

- Live: https://arcweb.com.br
- Stack: Next.js · Three.js · Tailwind · TypeScript
- Conversão: WhatsApp deep link
