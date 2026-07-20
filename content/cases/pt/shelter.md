---
slug: shelter
title: Shelter — catálogo Django com painel staff e API
summary: App de portfólio em Django 5 — catálogo, auth, busca, lista de leitura, /manage e API JSON, no ar na Vercel com Postgres.
audience: [recruiter, freelance]
stack: [Python, Django, DRF, PostgreSQL, Vercel]
repoUrl: https://github.com/Godz57/shelter
demoUrl: https://shelter-phi.vercel.app
order: 1
---

## Contexto e problema

Precisava de um projeto de portfólio que **provasse skill real de Django** — models, templates, auth, painel de staff, busca e uma API JSON — sem copiar um publisher real e sem inventar multi-anos de tenure. O produto é um catálogo gospel-publishing **fictício** (Shelter), alinhado a padrões de apps de conteúdo (catálogo + admin + contas + API).

## Restrições

- UI em inglês (candidatura Web Developer / Django)
- Conteúdo 100% fictício; sem marca Crossway/ESV
- YAGNI: sem carrinho, OAuth ou SPA
- Deploy serverless (Vercel) + Postgres gerenciado (Neon)
- Testes automatizados e CI

## Arquitetura

- **Django 5** — app `catalog` (models, views, staff, seed)
- **Templates server-rendered** + CSS/JS estáticos (identidade visual, mobile nav)
- **Painel `/manage/`** — CRUD site-styled, permissões por seção e equipe
- **Auth** — signup/login + **Your Shelter** (lista de leitura privada)
- **DRF** — list/detail/pick read-only em `/api/books/`
- **Postgres + WhiteNoise** — produção; SQLite no dev

## Decisões técnicas

1. **Um app principal (`catalog`)** — domínio unificado (livros, reading list, staff) sem over-split.
2. **Staff próprio em vez de Admin cru** — UX amigável para conteúdo; `/admin/` redireciona para `/manage/`.
3. **Seed idempotente** — dados de demo e capas estáveis para portfolio e deploy.
4. **API fina** — prova JSON sem inventar BFF pesado.
5. **TDD e CI** — `manage.py test` + GitHub Actions.

## O que prova

Models/migrations, views e forms, auth, CRUD staff com permissões, search/filter, API REST, deploy Postgres e higiene de Git — evidência honesta de skill Django para recrutador.

## Resultado

Site live com catálogo seedado, About, health check, painel staff e API pública. Código em GitHub sob `Godz57/shelter`.

## Links

- Live: https://shelter-phi.vercel.app
- Código: https://github.com/Godz57/shelter
- Stack: Python · Django 5 · DRF · PostgreSQL · Vercel
