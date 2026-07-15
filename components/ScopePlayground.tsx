'use client'

import { useMemo, useState, type FormEvent } from 'react'
import {
  buildWhatsAppScopeMessage,
  suggestScope,
  whatsappHref,
  type ScopeSuggestion,
} from '@/lib/scope-matcher'

type ScopePlaygroundProps = {
  whatsappDigits?: string
}

const EXAMPLES = [
  'Landing page para captar lead de campanha no Instagram',
  'Site institucional da minha clínica com WhatsApp',
  'Bot no WhatsApp com IA para qualificar leads',
  'Automação que lê planilha e atualiza o CRM',
  'Agente de IA para triagem de suporte',
]

function ConfidenceBadge({ level }: { level: ScopeSuggestion['confidence'] }) {
  const label =
    level === 'high' ? 'Alta' : level === 'medium' ? 'Média' : 'Baixa'
  const cls =
    level === 'high'
      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
      : level === 'medium'
        ? 'border-amber-500/30 bg-amber-500/10 text-amber-200'
        : 'border-zinc-500/30 bg-zinc-500/10 text-zinc-300'
  return (
    <span
      className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${cls}`}
    >
      Confiança: {label}
    </span>
  )
}

export function ScopePlayground({ whatsappDigits }: ScopePlaygroundProps) {
  const [text, setText] = useState('')
  const [result, setResult] = useState<ScopeSuggestion | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const digits = whatsappDigits?.replace(/\D/g, '') || ''

  function run(raw: string) {
    const suggestion = suggestScope(raw)
    setResult(suggestion)
    setSubmitted(true)
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    run(text)
  }

  const waLink = useMemo(() => {
    if (!result || !digits) return null
    return whatsappHref(digits, buildWhatsAppScopeMessage(result))
  }, [result, digits])

  return (
    <div className="glass-panel mx-auto max-w-3xl rounded-3xl p-6 sm:p-8">
      <form onSubmit={onSubmit} className="space-y-4">
        <label htmlFor="scope-input" className="block text-sm text-zinc-400">
          Descreva o que você precisa — com suas palavras. Se o site não tiver
          certeza, ele{' '}
          <span className="text-violet-300">não inventa escopo</span>: pede
          esclarecimento e manda seu texto original no WhatsApp.
        </label>
        <textarea
          id="scope-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          placeholder="Ex.: Preciso de uma landing para meu curso e um bot no WhatsApp para atender quem clicar no anúncio…"
          className="w-full resize-y rounded-2xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-sm text-zinc-100 outline-none ring-violet-500/0 transition placeholder:text-zinc-600 focus:border-violet-500/40 focus:ring-2 focus:ring-violet-500/20"
        />
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            className="inline-flex items-center rounded-full bg-violet-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-600/30 transition-colors hover:bg-violet-500"
          >
            Gerar escopo
          </button>
          {submitted && result ? (
            <button
              type="button"
              onClick={() => {
                setText('')
                setResult(null)
                setSubmitted(false)
              }}
              className="text-sm text-zinc-500 hover:text-zinc-300"
            >
              Limpar
            </button>
          ) : null}
        </div>
      </form>

      <div className="mt-4">
        <p className="mb-2 text-[11px] uppercase tracking-wide text-zinc-600">
          Exemplos (clique para preencher)
        </p>
        <ul className="flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <li key={ex}>
              <button
                type="button"
                onClick={() => {
                  setText(ex)
                  run(ex)
                }}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-left text-xs text-zinc-400 transition-colors hover:border-violet-500/40 hover:text-violet-200"
              >
                {ex}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {result ? (
        <div className="mt-8 space-y-5 border-t border-white/10 pt-8">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-lg font-semibold text-white">{result.title}</h3>
            <ConfidenceBadge level={result.confidence} />
          </div>
          <p className="text-sm leading-relaxed text-zinc-400">
            {result.summary}
          </p>
          <p className="text-xs text-zinc-500">{result.confidenceNote}</p>

          {result.matches.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {result.matches.map((m) => (
                <span
                  key={m.id}
                  className="rounded-full border border-violet-500/25 bg-violet-500/10 px-2.5 py-0.5 text-[11px] text-violet-200"
                  title={`score ${m.score.toFixed(1)}`}
                >
                  {m.label}
                </span>
              ))}
            </div>
          ) : null}

          {result.deliverables.length > 0 ? (
            <div>
              <h4 className="mb-2 text-sm font-medium text-zinc-200">
                Entregáveis (rascunho)
              </h4>
              <ul className="list-inside list-disc space-y-1.5 text-sm text-zinc-400">
                {result.deliverables.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {result.stack.length > 0 ? (
            <div>
              <h4 className="mb-2 text-sm font-medium text-zinc-200">
                Stack provável
              </h4>
              <p className="text-sm text-zinc-400">{result.stack.join(' · ')}</p>
            </div>
          ) : null}

          {result.clarifyingQuestions.length > 0 ? (
            <div>
              <h4 className="mb-2 text-sm font-medium text-zinc-200">
                {result.confidence === 'low'
                  ? 'Perguntas para não chutar o escopo'
                  : 'Para fechar o escopo'}
              </h4>
              <ul className="list-inside list-disc space-y-1.5 text-sm text-zinc-400">
                {result.clarifyingQuestions.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-4">
            <p className="text-xs text-zinc-500">Seu texto (vai no WhatsApp)</p>
            <p className="mt-1 text-sm text-zinc-300">&ldquo;{result.userText}&rdquo;</p>
          </div>

          <div className="flex flex-wrap gap-3">
            {waLink ? (
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-violet-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-600/30 transition-colors hover:bg-violet-500"
              >
                Continuar no WhatsApp
              </a>
            ) : (
              <p className="text-sm text-zinc-500">
                WhatsApp não configurado neste ambiente — copie o texto e me
                chame pelo contato.
              </p>
            )}
            <a
              href="/contato"
              className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-zinc-200 transition-colors hover:border-violet-500/40"
            >
              Página de contato
            </a>
          </div>
        </div>
      ) : null}
    </div>
  )
}
