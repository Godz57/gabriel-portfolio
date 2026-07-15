'use client'

import { useState } from 'react'

export type FaqItem = {
  question: string
  answer: string
}

const DEFAULT_FAQS: FaqItem[] = [
  {
    question: 'O que você entrega na prática?',
    answer:
      'Sites e landings com Next.js, agentes com AI (CLI/LLM), automações (WhatsApp, browser, funis) e tooling de qualidade — do design ao deploy, com método (plan → TDD → verify).',
  },
  {
    question: 'Você faz só o bot ou o site também?',
    answer:
      'Os dois. Muitos projetos são híbridos: landing/site que converte + agente ou automação no WhatsApp/backoffice. Montamos o escopo junto, sem forçar o que não cabe.',
  },
  {
    question: 'Como funciona o agente / automação no WhatsApp?',
    answer:
      'Loop controlado: ler contexto → decidir com LLM → humanizar → responder, com limites (quando parar, quando escalar para humano). Sem expor dados sensíveis de leads no código público.',
  },
  {
    question: 'Quanto tempo leva um projeto típico?',
    answer:
      'Landing enxuta: dias a poucas semanas. Site institucional ou agente em produção: depende do escopo, integrações e conteúdo. Sempre começamos com escopo e marcos claros.',
  },
  {
    question: 'Trabalha freela, CLT ou parceria?',
    answer:
      'Aberto a projeto freela, colaboração e conversas de CLT. O melhor encaixe depende do que você precisa — fale comigo e alinhamos formato e expectativa.',
  },
  {
    question: 'Qual a stack principal?',
    answer:
      'TypeScript, Next.js, Playwright, Vitest, Vercel, e LLMs (Grok/OpenAI e similares). O método importa tanto quanto a stack: brainstorm, plan, TDD e evidência antes de “pronto”.',
  },
]

type FaqAccordionProps = {
  items?: FaqItem[]
}

export function FaqAccordion({ items = DEFAULT_FAQS }: FaqAccordionProps) {
  const [open, setOpen] = useState<number | null>(1)

  return (
    <div className="mx-auto max-w-2xl space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div
            key={item.question}
            className={`glass-panel overflow-hidden rounded-2xl transition-colors ${
              isOpen ? 'border-violet-500/35' : ''
            }`}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-sm font-medium text-white sm:text-base">
                {item.question}
              </span>
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm transition-colors ${
                  isOpen
                    ? 'border-violet-500/40 bg-violet-600/20 text-violet-200'
                    : 'border-white/10 text-zinc-400'
                }`}
                aria-hidden
              >
                {isOpen ? '−' : '+'}
              </span>
            </button>
            {isOpen ? (
              <div className="border-t border-white/5 px-5 pb-4 pt-3 text-sm leading-relaxed text-zinc-400">
                {item.answer}
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
