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
import { BrowserChrome } from '@/components/BrowserChrome'
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
      className="relative mx-auto max-w-5xl px-4 pb-6 sm:px-6 sm:pb-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/15 blur-[80px]"
      />
      <div
        className="relative"
        onClick={() => inputRef.current?.focus()}
      >
        <BrowserChrome title="gabriel@portfolio — agent shell v1">
          <div
            ref={scrollerRef}
            className="h-56 overflow-y-auto bg-zinc-950/80 px-4 py-3 font-mono text-sm leading-relaxed sm:h-72"
          >
            {lines.map((line, i) => (
              <div
                key={`${i}-${line.text.slice(0, 12)}`}
                className={
                  line.kind === 'input'
                    ? 'text-blue-300'
                    : line.kind === 'system'
                      ? 'text-zinc-500'
                      : 'text-zinc-300'
                }
              >
                {line.kind === 'input' ? (
                  <>
                    <span className="text-blue-500">❯ </span>
                    {line.text}
                  </>
                ) : (
                  line.text
                )}
              </div>
            ))}
            {booted ? (
              <form onSubmit={onSubmit} className="mt-1 flex items-center gap-2">
                <span className="text-blue-500">❯</span>
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
        </BrowserChrome>
      </div>
      <p className="relative mt-4 text-center text-xs text-zinc-500">
        Experimente{' '}
        <kbd className="rounded border border-white/10 bg-zinc-900/80 px-1.5 py-0.5 font-mono text-zinc-400">
          help
        </kbd>{' '}
        ou{' '}
        <kbd className="rounded border border-white/10 bg-zinc-900/80 px-1.5 py-0.5 font-mono text-zinc-400">
          Ctrl+K
        </kbd>
      </p>
    </section>
  )
}
