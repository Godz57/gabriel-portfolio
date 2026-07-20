---
slug: agent-tooling
title: Agent tooling para CLI LLM
summary: Skills, loops e quality gates que definem como o agente trabalha de verdade.
audience: [recruiter, oss]
stack: [TypeScript, Grok skills, CLI, TDD]
repoUrl: https://github.com/Godz57/grok-superpowers
cover: /cases/agent-tooling.jpg
order: 3
---

## Contexto e problema

Agentes de coding improvisam. Sem processo, o resultado é vibe-coding frágil: código que “funciona no chat” e quebra no repositório. Faltava um kit instalável, modular e documentado para engenharia com LLMs em CLI.

## Restrições

- Skills on-demand (não carregar bibliotecas enormes em toda sessão)
- Funcionar no ecossistema Grok / agentes CLI
- Instalável, versionável e reutilizável em projetos reais
- Separar processo (superpowers), autonomia (loops) e qualidade (craftsman)

## Arquitetura

Kits modulares públicos sob `Godz57/*`:

- **grok-superpowers** — brainstorm → write-plan → execute-tasks → TDD → verify-done
- **grok-loops** — loops autônomos com stop states e guardrails
- **grok-craftsman** — quality gates always-on (Clean Code, YAGNI, EARS)
- Complementos sob autorização: pentest, strix, cyber-skills; continuidade com ai-memory

## Decisões técnicas

1. **Router de skills** em vez de monolito always-on — carrega só o necessário.
2. **Spec antes de código** — design e plano com caminhos exatos antes de implementar.
3. **Verify-done** — evidência fresca de build/testes antes de declarar pronto.
4. **Stop states explícitos** nos loops — evita corridas infinitas sem critério de saída.

## O que prova habilidade CLI/LLM

Desenho de DX de agente: prompts operacionais, gates de qualidade, handoff entre sessões e tooling que o próprio autor usa no dia a dia de engenharia.

## Resultado

Suite pública no GitHub (`Godz57/*`) usada como playbook real de engenharia com agentes CLI/LLM — não demo descartável.

## Links

- https://github.com/Godz57/grok-superpowers
- https://github.com/Godz57/grok-loops
- https://github.com/Godz57/grok-craftsman
