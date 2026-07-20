---
slug: shelter
title: Shelter — Django catalog with staff panel and API
summary: Django 5 portfolio app — catalog, auth, search, reading list, site-styled /manage, and JSON API, live on Vercel with Postgres.
audience: [recruiter, freelance]
stack: [Python, Django, DRF, PostgreSQL, Vercel]
repoUrl: https://github.com/Godz57/shelter
demoUrl: https://shelter-phi.vercel.app
cover: /cases/shelter.png
order: 1
---

## Context & problem

Needed a portfolio project that **proves real Django skill** — models, templates, auth, staff tooling, search, and a JSON API — without cloning a real publisher or claiming multi-year tenure. The product is a **fictional** gospel-publishing catalog (Shelter) that mirrors content-app patterns: catalog + admin + accounts + API.

## Constraints

- English UI (Web Developer / Django candidacy)
- Fully fictional content; no Crossway/ESV branding
- YAGNI: no cart, OAuth, or SPA
- Serverless deploy (Vercel) + managed Postgres (Neon)
- Automated tests and CI

## Architecture

- **Django 5** — `catalog` app (models, views, staff, seed)
- **Server-rendered templates** + static CSS/JS (visual identity, mobile nav)
- **`/manage/` panel** — site-styled CRUD, section permissions and team
- **Auth** — signup/login + **Your Shelter** (private reading list)
- **DRF** — read-only list/detail/pick at `/api/books/`
- **Postgres + WhiteNoise** — production; SQLite in dev

## Technical decisions

1. **Single main app (`catalog`)** — unified domain without over-splitting.
2. **Custom staff UI over raw Admin** — content-friendly UX; `/admin/` redirects to `/manage/`.
3. **Idempotent seed** — stable demo data and covers for portfolio and deploy.
4. **Thin API** — proves JSON without a heavy BFF.
5. **TDD and CI** — `manage.py test` + GitHub Actions.

## What it proves

Models/migrations, views and forms, auth, staff CRUD with permissions, search/filter, REST API, Postgres deploy, and Git hygiene — honest Django skill evidence for recruiters.

## Outcome

Live site with seeded catalog, About page, health check, staff panel, and public API. Source on GitHub at `Godz57/shelter`.

## Links

- Live: https://shelter-phi.vercel.app
- Code: https://github.com/Godz57/shelter
- Stack: Python · Django 5 · DRF · PostgreSQL · Vercel
