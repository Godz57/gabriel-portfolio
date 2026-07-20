---
slug: agent-tooling
title: Agent tooling for CLI LLMs
summary: Skills, loops, and quality gates that define how the agent actually works.
audience: [recruiter, oss]
stack: [TypeScript, Grok skills, CLI, TDD]
repoUrl: https://github.com/Godz57/grok-superpowers
cover: /cases/agent-tooling.jpg
order: 3
---

## Context & problem

Coding agents improvise. Without process, the result is fragile vibe-coding: code that “works in chat” and breaks in the repository. What was missing was an installable, modular, documented kit for engineering with LLMs in the CLI.

## Constraints

- On-demand skills (do not load huge libraries every session)
- Work in the Grok / CLI agent ecosystem
- Installable, versionable, and reusable on real projects
- Separate process (superpowers), autonomy (loops), and quality (craftsman)

## Architecture

Public modular kits under `Godz57/*`:

- **grok-superpowers** — brainstorm → write-plan → execute-tasks → TDD → verify-done
- **grok-loops** — autonomous loops with stop states and guardrails
- **grok-craftsman** — always-on quality gates (Clean Code, YAGNI, EARS)
- Complements under authorization: pentest, strix, cyber-skills; continuity with ai-memory

## Technical decisions

1. **Skill router** instead of an always-on monolith — load only what is needed.
2. **Spec before code** — design and plan with exact paths before implementing.
3. **Verify-done** — fresh build/test evidence before calling it done.
4. **Explicit stop states** in loops — avoids infinite runs without an exit criterion.

## What it proves (CLI/LLM skill)

Agent DX design: operational prompts, quality gates, cross-session handoff, and tooling the author uses day to day in engineering with agents.

## Outcome

Public suite on GitHub (`Godz57/*`) used as a real engineering playbook for CLI/LLM agents — not a throwaway demo.

## Links

- https://github.com/Godz57/grok-superpowers
- https://github.com/Godz57/grok-loops
- https://github.com/Godz57/grok-craftsman
