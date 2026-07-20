---
slug: wpp-grok
title: Automação WhatsApp com Playwright e loop LLM
summary: Bot de atendimento e qualificação em produção — browser automation + raciocínio LLM com guardrails.
audience: [recruiter, freelance]
stack: [TypeScript, Playwright, LLM, WhatsApp Web]
order: 4
---

## Contexto e problema

Atendimento comercial no WhatsApp exige resposta rápida, contexto de conversa e follow-up sem perder leads em horários ociosos. APIs oficiais nem sempre estavam disponíveis ou cabiam no orçamento; era preciso automação real sobre o fluxo de mensagens com inteligência para classificar intenção e redigir respostas úteis.

## Restrições

- Operar de forma estável sobre interface web (sem inventar API não documentada de forma frágil)
- Não expor dados sensíveis de leads (nomes reais, telefones de clientes, históricos privados)
- Loop LLM com limites: quando parar, quando escalar para humano
- Observabilidade mínima para falhas de seletor, sessão e rate limit

## Arquitetura

Pipeline em camadas:

1. **Camada de automação** — Playwright controla WhatsApp Web (login persistente, leitura de chats, envio).
2. **Camada de contexto** — extrai trechos relevantes da conversa e metadados de estado (novo lead, follow-up, fechamento).
3. **Camada LLM** — classifica intenção, propõe resposta e aplica políticas (tom, escopo, “não inventar preço”).
4. **Guardrails** — stop states: incerteza alta, pedido humano, fora de escopo, ou limite de turnos.

## Decisões técnicas

1. **Playwright em vez de scrapers ad-hoc** — waits explícitos, isolamento de sessão e retries previsíveis.
2. **Loop com critério de parada** — o LLM não “conversa para sempre”; cada turno tem check de done/escalate.
3. **Prompts com políticas de negócio** — respostas alinhadas a funil e script, sem dados de terceiros no repo.
4. **Separação config/runtime** — credenciais e sessão fora do código versionado.

## O que prova habilidade CLI/LLM

Integração ponta a ponta de browser automation + raciocínio de modelo em loop, com engineering de produção (falhas, limites, handoff humano) — não só um prompt isolado.

## Resultado

Fluxo de automação em uso real para qualificação e resposta assistida no WhatsApp, com redução de latência no primeiro contato e trilha clara para escalar casos ambíguos.

## Links

- Stack: Playwright + TypeScript + provedor LLM
- Método alinhado aos kits de agent tooling (loops + verify-done)
