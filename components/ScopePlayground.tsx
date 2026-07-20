'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useMemo, useState, type FormEvent } from 'react'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import {
  buildWhatsAppScopeMessage,
  suggestScope,
  whatsappHref,
  type ScopeSuggestion,
} from '@/lib/scope-matcher'

type ScopePlaygroundProps = {
  whatsappDigits?: string
}

function ConfidenceBadge({
  level,
  confidenceLabel,
  levelLabel,
}: {
  level: ScopeSuggestion['confidence']
  confidenceLabel: string
  levelLabel: string
}) {
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
      {confidenceLabel}: {levelLabel}
    </span>
  )
}

export function ScopePlayground({ whatsappDigits }: ScopePlaygroundProps) {
  const locale = useLocale() as Locale
  const t = useTranslations('Scope')
  const [text, setText] = useState('')
  const [result, setResult] = useState<ScopeSuggestion | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const digits = whatsappDigits?.replace(/\D/g, '') || ''

  const examples = useMemo(
    () => [
      t('example1'),
      t('example2'),
      t('example3'),
      t('example4'),
      t('example5'),
    ],
    [t],
  )

  function run(raw: string) {
    const suggestion = suggestScope(raw, locale)
    setResult(suggestion)
    setSubmitted(true)
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    run(text)
  }

  const waLink = useMemo(() => {
    if (!result || !digits) return null
    return whatsappHref(digits, buildWhatsAppScopeMessage(result, locale))
  }, [result, digits, locale])

  const confidenceLevelLabel =
    result?.confidence === 'high'
      ? t('confidenceHigh')
      : result?.confidence === 'medium'
        ? t('confidenceMedium')
        : t('confidenceLow')

  // Split label to highlight "won't invent scope" / "não inventa escopo"
  const fullLabel = t('label')
  const noInvent = t('labelNoInvent')
  const noInventIdx = fullLabel.indexOf(noInvent)

  return (
    <div className="glass-panel mx-auto max-w-3xl rounded-3xl p-6 sm:p-8">
      <form onSubmit={onSubmit} className="space-y-4">
        <label htmlFor="scope-input" className="block text-sm text-zinc-400">
          {noInventIdx >= 0 ? (
            <>
              {fullLabel.slice(0, noInventIdx)}
              <span className="text-violet-300">{noInvent}</span>
              {fullLabel.slice(noInventIdx + noInvent.length)}
            </>
          ) : (
            fullLabel
          )}
        </label>
        <textarea
          id="scope-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          placeholder={t('placeholder')}
          className="w-full resize-y rounded-2xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-sm text-zinc-100 outline-none ring-violet-500/0 transition placeholder:text-zinc-600 focus:border-violet-500/40 focus:ring-2 focus:ring-violet-500/20"
        />
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            className="inline-flex items-center rounded-full bg-violet-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-600/30 transition-colors hover:bg-violet-500"
          >
            {t('submit')}
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
              {t('clear')}
            </button>
          ) : null}
        </div>
      </form>

      <div className="mt-4">
        <p className="mb-2 text-[11px] uppercase tracking-wide text-zinc-600">
          {t('examplesHeading')}
        </p>
        <ul className="flex flex-wrap gap-2">
          {examples.map((ex) => (
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
            <ConfidenceBadge
              level={result.confidence}
              confidenceLabel={t('confidence')}
              levelLabel={confidenceLevelLabel}
            />
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
                {t('deliverablesHeading')}
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
                {t('stackHeading')}
              </h4>
              <p className="text-sm text-zinc-400">{result.stack.join(' · ')}</p>
            </div>
          ) : null}

          {result.clarifyingQuestions.length > 0 ? (
            <div>
              <h4 className="mb-2 text-sm font-medium text-zinc-200">
                {result.confidence === 'low'
                  ? t('clarifyingHeading')
                  : t('closingHeading')}
              </h4>
              <ul className="list-inside list-disc space-y-1.5 text-sm text-zinc-400">
                {result.clarifyingQuestions.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-4">
            <p className="text-xs text-zinc-500">{t('userTextHeading')}</p>
            <p className="mt-1 text-sm text-zinc-300">
              &ldquo;{result.userText}&rdquo;
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {waLink ? (
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-violet-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-600/30 transition-colors hover:bg-violet-500"
              >
                {t('whatsappCta')}
              </a>
            ) : (
              <p className="text-sm text-zinc-500">{t('whatsappMissing')}</p>
            )}
            <Link
              href="/contato"
              className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-zinc-200 transition-colors hover:border-violet-500/40"
            >
              {t('contactPage')}
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  )
}
