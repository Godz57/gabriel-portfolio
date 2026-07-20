---
slug: wpp-grok
title: WhatsApp automation with Playwright and an LLM loop
summary: Production support and qualification bot — browser automation + LLM reasoning with guardrails.
audience: [recruiter, freelance]
stack: [TypeScript, Playwright, LLM, WhatsApp Web]
order: 2
---

## Context & problem

Commercial support on WhatsApp needs fast replies, conversation context, and follow-up without losing leads during idle hours. Official APIs were not always available or within budget; real automation over the messaging flow was required, with intelligence to classify intent and draft useful replies.

## Constraints

- Operate stably over the web UI (without inventing a fragile undocumented API)
- Do not expose sensitive lead data (real names, client phones, private histories)
- LLM loop with limits: when to stop, when to escalate to a human
- Minimal observability for selector failures, session issues, and rate limits

## Architecture

Layered pipeline:

1. **Automation layer** — Playwright drives WhatsApp Web (persistent login, chat reading, send).
2. **Context layer** — extracts relevant conversation snippets and state metadata (new lead, follow-up, close).
3. **LLM layer** — classifies intent, proposes a reply, and applies policies (tone, scope, “do not invent prices”).
4. **Guardrails** — stop states: high uncertainty, human request, out of scope, or turn limit.

## Technical decisions

1. **Playwright instead of ad-hoc scrapers** — explicit waits, session isolation, and predictable retries.
2. **Loop with stop criteria** — the LLM does not “chat forever”; each turn checks done/escalate.
3. **Prompts with business policies** — replies aligned to funnel and script, without third-party data in the repo.
4. **Config/runtime separation** — credentials and session outside versioned code.

## What it proves (CLI/LLM skill)

End-to-end integration of browser automation + model reasoning in a loop, with production engineering (failures, limits, human handoff) — not just an isolated prompt.

## Outcome

Automation flow in real use for qualification and assisted replies on WhatsApp, with lower first-contact latency and a clear path to escalate ambiguous cases.

## Links

- Stack: Playwright + TypeScript + LLM provider
- Method aligned with agent tooling kits (loops + verify-done)
