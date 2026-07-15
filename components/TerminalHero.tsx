'use client'

import { useRouter } from 'next/navigation'
import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  forwardRef,
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

export type TerminalHeroHandle = {
  focus: () => void
}

type TerminalHeroProps = {
  caseSlugs: string[]
  githubUrl: string
  whatsappDigits?: string
  tagline: string
  /** Embed inside ProductMockup (no outer chrome) */
  embedded?: boolean
}

const BOOT_LINES = (tagline: string): Line[] => [
  { kind: 'system', text: 'gabriel@portfolio — agent shell v1' },
  { kind: 'input', text: 'whoami' },
  { kind: 'output', text: 'Gabriel Almeida' },
  { kind: 'output', text: tagline },
  { kind: 'input', text: 'ls cases/' },
]

export const TerminalHero = forwardRef<TerminalHeroHandle, TerminalHeroProps>(
  function TerminalHero(
    { caseSlugs, githubUrl, whatsappDigits, tagline, embedded = false },
    ref,
  ) {
    const router = useRouter()
    const inputRef = useRef<HTMLInputElement>(null)
    const scrollerRef = useRef<HTMLDivElement>(null)
    const [lines, setLines] = useState<Line[]>([])
    const [value, setValue] = useState('')
    const [booted, setBooted] = useState(false)
    const [history, setHistory] = useState<string[]>([])
    const [histIdx, setHistIdx] = useState(-1)

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
    }))

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

    const body = (
      <div
        ref={scrollerRef}
        className={
          embedded
            ? 'h-full min-h-[160px] overflow-y-auto px-3 py-2 font-mono text-[12px] leading-relaxed sm:min-h-[180px]'
            : 'h-56 overflow-y-auto bg-zinc-950/80 px-4 py-3 font-mono text-sm leading-relaxed sm:h-72'
        }
        onClick={() => inputRef.current?.focus()}
      >
        <div className="mb-1 text-[10px] text-zinc-600">shell · interactive</div>
        {lines.map((line, i) => (
          <div
            key={`${i}-${line.text.slice(0, 12)}`}
            className={
              line.kind === 'input'
                ? 'text-brand-fg-soft'
                : line.kind === 'system'
                  ? 'text-zinc-500'
                  : 'text-zinc-300'
            }
          >
            {line.kind === 'input' ? (
              <>
                <span className="text-brand-fg-soft">❯ </span>
                {line.text}
              </>
            ) : (
              line.text
            )}
          </div>
        ))}
        {booted ? (
          <form onSubmit={onSubmit} className="mt-1 flex items-center gap-2">
            <span className="text-brand-fg-soft">❯</span>
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
    )

    if (embedded) {
      return (
        <div aria-label="Terminal interativo" className="h-full">
          {body}
        </div>
      )
    }

    return (
      <section aria-label="Terminal interativo" className="mx-auto max-w-5xl px-4">
        {body}
      </section>
    )
  },
)
