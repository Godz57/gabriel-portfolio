'use client'

import { useRouter } from 'next/navigation'
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from 'react'
import {
  buildCommands,
  parseCommandLine,
  type CommandAction,
} from '@/lib/commands'

type Line = {
  kind: 'system' | 'input' | 'output'
  text: string
}

type TerminalHeroProps = {
  caseSlugs: string[]
  githubUrl: string
  whatsappDigits?: string
  tagline: string
}

const BOOT_LINES = (tagline: string): Line[] => [
  { kind: 'system', text: 'gabriel@portfolio — agent shell v1' },
  { kind: 'input', text: 'whoami' },
  { kind: 'output', text: 'Gabriel Almeida' },
  { kind: 'output', text: tagline },
  { kind: 'input', text: 'ls cases/' },
]

export function TerminalHero({
  caseSlugs,
  githubUrl,
  whatsappDigits,
  tagline,
}: TerminalHeroProps) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [lines, setLines] = useState<Line[]>([])
  const [value, setValue] = useState('')
  const [booted, setBooted] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)

  const commands = useMemo(
    () =>
      buildCommands({
        caseSlugs,
        githubUrl,
        whatsappDigits,
      }),
    [caseSlugs, githubUrl, whatsappDigits],
  )

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      setLines([
        ...BOOT_LINES(tagline),
        ...caseSlugs.map((s) => ({ kind: 'output' as const, text: `  ${s}` })),
        { kind: 'system', text: 'digite help · Ctrl+K abre a palette' },
      ])
      setBooted(true)
      return
    }

    let cancelled = false
    const base = BOOT_LINES(tagline)
    const extras: Line[] = [
      ...caseSlugs.map((s) => ({ kind: 'output' as const, text: `  ${s}` })),
      { kind: 'system', text: 'digite help · Ctrl+K abre a palette' },
    ]
    const sequence = [...base, ...extras]

    ;(async () => {
      for (let i = 0; i < sequence.length; i++) {
        if (cancelled) return
        await new Promise((r) => setTimeout(r, i === 0 ? 120 : 90))
        setLines((prev) => [...prev, sequence[i]])
      }
      if (!cancelled) setBooted(true)
    })()

    return () => {
      cancelled = true
    }
  }, [caseSlugs, tagline])

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight })
  }, [lines])

  const runAction = useCallback(
    (action: CommandAction) => {
      switch (action.type) {
        case 'clear':
          setLines([])
          return
        case 'navigate':
          router.push(action.href)
          return
        case 'external':
          window.open(action.href, '_blank', 'noopener,noreferrer')
          return
        case 'output':
          setLines((prev) => [
            ...prev,
            ...action.lines.map((text) => ({ kind: 'output' as const, text })),
          ])
          return
      }
    },
    [router],
  )

  const submit = useCallback(
    (raw: string) => {
      const trimmed = raw.trim()
      if (!trimmed) return
      setLines((prev) => [...prev, { kind: 'input', text: trimmed }])
      setHistory((h) => [trimmed, ...h].slice(0, 50))
      setHistIdx(-1)
      const action = parseCommandLine(trimmed, commands)
      // special: "cases" also offer navigation hint already in output
      runAction(action)
      setValue('')
    },
    [commands, runAction],
  )

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    submit(value)
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(histIdx + 1, history.length - 1)
      if (history[next]) {
        setHistIdx(next)
        setValue(history[next])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = histIdx - 1
      if (next < 0) {
        setHistIdx(-1)
        setValue('')
      } else {
        setHistIdx(next)
        setValue(history[next] ?? '')
      }
    }
  }

  return (
    <section
      aria-label="Terminal interativo"
      className="mx-auto max-w-5xl px-4 pb-4 sm:px-6"
    >
      <div
        className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/90 shadow-xl shadow-violet-950/40 ring-1 ring-violet-500/20"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900/80 px-4 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono text-xs text-zinc-500">
            ~/gabriel-portfolio
          </span>
        </div>
        <div
          ref={scrollerRef}
          className="h-56 overflow-y-auto px-4 py-3 font-mono text-sm leading-relaxed sm:h-64"
        >
          {lines.map((line, i) => (
            <div
              key={`${i}-${line.text.slice(0, 12)}`}
              className={
                line.kind === 'input'
                  ? 'text-violet-300'
                  : line.kind === 'system'
                    ? 'text-zinc-500'
                    : 'text-zinc-300'
              }
            >
              {line.kind === 'input' ? (
                <>
                  <span className="text-violet-500">❯ </span>
                  {line.text}
                </>
              ) : (
                line.text
              )}
            </div>
          ))}
          {booted ? (
            <form onSubmit={onSubmit} className="mt-1 flex items-center gap-2">
              <span className="text-violet-500">❯</span>
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                aria-label="Comando do terminal"
                autoComplete="off"
                spellCheck={false}
                className="min-w-0 flex-1 bg-transparent text-zinc-100 outline-none placeholder:text-zinc-600"
                placeholder="help · open wpp-grok · stack"
              />
            </form>
          ) : null}
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-zinc-500 sm:text-left">
        Experimente{' '}
        <kbd className="rounded border border-zinc-700 bg-zinc-900 px-1.5 py-0.5 font-mono text-zinc-400">
          help
        </kbd>{' '}
        ou{' '}
        <kbd className="rounded border border-zinc-700 bg-zinc-900 px-1.5 py-0.5 font-mono text-zinc-400">
          Ctrl+K
        </kbd>
      </p>
    </section>
  )
}
