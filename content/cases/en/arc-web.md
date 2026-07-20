---
slug: arc-web
title: ARC WEB — commercial Next.js site with 3D conversion
summary: Premium ARC WEB landing — Next, Three.js/R3F, and WhatsApp CTA. Live at arcweb.com.br.
audience: [freelance, recruiter]
stack: [Next.js, TypeScript, Three.js, Tailwind CSS]
demoUrl: https://arcweb.com.br
cover: /cases/arc-web.png
order: 2
---

## Context & problem

A local business needed a web presence that feels premium and turns visits into commercial conversations. Generic templates were not enough: strong visuals (including 3D), acceptable mobile performance, and a short path to WhatsApp were required.

## Constraints

- Commercial delivery with fixed timeline and scope
- Mobile performance: 3D must not kill LCP/CLS
- Primary CTA = conversion via WhatsApp (not a long form)
- Maintainability: content and contacts easy to update

## Architecture

- **Next.js (App Router)** — pages, metadata, and static/SSR deploy as needed
- **Three.js / R3F** — hero or 3D section with fallback and lazy load
- **Tailwind** — responsive layout and clean typography
- **WhatsApp CTA** — `wa.me` deep link with prefilled context message

## Technical decisions

1. **On-demand 3D** — load the scene only in viewport / after idle so first paint is not blocked.
2. **Lean design system** — few color and spacing tokens; focus on hierarchy and CTA.
3. **Conversion over ornament** — every section pushes the same goal (talk on WhatsApp).
4. **TypeScript end-to-end** — typed components and config for safe handoff.

## What it proves (CLI/LLM skill)

Full-stack front delivery for a commercial product: performance, conversion UX, and a modern stack (Next + 3D), aligned with agent engineering process (plan, TDD where it fits, verify-done).

## Outcome

Live site with strong visual identity, controlled 3D section, and a direct WhatsApp contact flow — visitor becomes a lead in one click.

## Links

- Live: https://arcweb.com.br
- Stack: Next.js · Three.js · Tailwind · TypeScript
- Conversion: WhatsApp deep link
