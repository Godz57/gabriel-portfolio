'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { BrowserChrome } from '@/components/BrowserChrome'
import { prefersReducedMotion } from '@/lib/motion'

type ProductMockupProps = {
  shell: ReactNode
  onFocusShell?: () => void
}

const FILES = [
  { name: 'src', kind: 'dir' as const },
  { name: '  brain.ts', kind: 'file' as const, active: false },
  { name: '  loop.ts', kind: 'file' as const, active: false },
  { name: '  humanizer.ts', kind: 'file' as const, active: true },
  { name: '  writer.ts', kind: 'file' as const, active: false },
  { name: 'skills', kind: 'dir' as const },
  { name: '  superpowers', kind: 'file' as const, active: false },
  { name: '  craftsman', kind: 'file' as const, active: false },
]

const CODE_LINES: { n: number; text: string; tone?: 'kw' | 'str' | 'cmt' | 'fn' }[] =
  [
    { n: 1, text: "import { plan } from './brain'", tone: 'kw' },
    { n: 2, text: "import { humanize } from './humanizer'", tone: 'kw' },
    { n: 3, text: '' },
    { n: 4, text: '/** Agent turn: read → decide → reply */', tone: 'cmt' },
    { n: 5, text: 'export async function runTurn(msg: string) {', tone: 'fn' },
    { n: 6, text: '  const intent = await plan(msg)', tone: 'fn' },
    { n: 7, text: '  if (intent.escalate) return handoff()', tone: 'fn' },
    { n: 8, text: '  const draft = await reply(intent)', tone: 'fn' },
    { n: 9, text: '  return humanize(draft)', tone: 'fn' },
    { n: 10, text: '}', tone: 'fn' },
  ]

const CHAT: { role: 'agent' | 'user'; text: string }[] = [
  {
    role: 'agent',
    text: 'oi! aqui é o Rafael, da ARC WEB. que tipo de site você tem em mente?',
  },
  {
    role: 'user',
    text: 'Landing page com WhatsApp e portfolio.',
  },
  {
    role: 'agent',
    text: 'perfeito. vou montar o fluxo: hero → cases → contato. ok?',
  },
]

const PARTICLES = [
  { top: '12%', left: '18%', delay: '0s', size: 'h-1.5 w-1.5' },
  { top: '8%', left: '48%', delay: '0.4s', size: 'h-1 w-1' },
  { top: '16%', left: '72%', delay: '0.8s', size: 'h-1.5 w-1.5' },
  { top: '22%', left: '38%', delay: '1.2s', size: 'h-1 w-1' },
  { top: '10%', left: '62%', delay: '1.6s', size: 'h-1 w-1' },
  { top: '28%', left: '55%', delay: '0.2s', size: 'h-1.5 w-1.5' },
]

/**
 * Codelab-style product window: live chat, code caret, particles + shell.
 */
export function ProductMockup({ shell, onFocusShell }: ProductMockupProps) {
  const [chatCount, setChatCount] = useState(0)
  const [showStatus, setShowStatus] = useState(false)
  const [codeLines, setCodeLines] = useState(CODE_LINES.length)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setChatCount(CHAT.length)
      setShowStatus(true)
      setCodeLines(CODE_LINES.length)
      return
    }

    setChatCount(0)
    setShowStatus(false)
    setCodeLines(0)

    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []

    CHAT.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          if (!cancelled) setChatCount(i + 1)
        }, 500 + i * 900),
      )
    })

    timers.push(
      setTimeout(() => {
        if (!cancelled) setShowStatus(true)
      }, 500 + CHAT.length * 900 + 200),
    )

    CODE_LINES.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          if (!cancelled) setCodeLines(i + 1)
        }, 400 + i * 120),
      )
    })

    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [])

  return (
    <section className="relative mx-auto max-w-6xl px-4 pb-8 sm:px-6 sm:pb-12">
      <div className="mockup-glow" aria-hidden />
      <div className="hero-beams opacity-60" aria-hidden />

      {/* Floating particles around mockup */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 hidden sm:block"
      >
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className={`float-particle absolute rounded-full bg-violet-400/70 ${p.size}`}
            style={{
              top: p.top,
              left: p.left,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <BrowserChrome title="gabriel.portfolio / agent-workspace">
          <div className="flex items-center gap-1 border-b border-white/5 bg-zinc-950/60 px-3 py-2 text-xs">
            {['Agent', 'Workspace', 'Cases', 'Verify'].map((tab, i) => (
              <span
                key={tab}
                className={
                  i === 0
                    ? 'rounded-md bg-violet-600/25 px-2.5 py-1 font-medium text-violet-200'
                    : 'rounded-md px-2.5 py-1 text-zinc-500'
                }
              >
                {tab}
              </span>
            ))}
            <span className="ml-auto rounded-md bg-violet-600 px-2.5 py-1 text-[11px] font-medium text-white">
              Deploy
            </span>
          </div>

          <div className="grid max-h-[min(560px,75vh)] grid-cols-1 overflow-hidden pb-16 lg:grid-cols-12 lg:max-h-[520px]">
            {/* Chat — sequential reveal */}
            <aside className="hidden flex-col border-r border-white/5 bg-zinc-950/50 lg:col-span-3 lg:flex">
              <div className="border-b border-white/5 px-3 py-2 text-[11px] font-medium text-zinc-500">
                Agent · Rafael
              </div>
              <div className="flex flex-1 flex-col gap-3 overflow-hidden p-3 text-[12px] leading-relaxed">
                {CHAT.slice(0, chatCount).map((m, i) => (
                  <div
                    key={i}
                    className={
                      m.role === 'agent'
                        ? 'fade-slide-in max-w-[95%] self-start rounded-xl rounded-tl-sm border border-white/5 bg-zinc-900/80 px-3 py-2 text-zinc-300'
                        : 'fade-slide-in max-w-[90%] self-end rounded-xl rounded-tr-sm bg-violet-600/30 px-3 py-2 text-violet-100'
                    }
                  >
                    {m.text}
                  </div>
                ))}
                {chatCount < CHAT.length ? (
                  <div className="flex gap-1 self-start px-1 py-2">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500 [animation-delay:0ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500 [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500 [animation-delay:300ms]" />
                  </div>
                ) : null}
                {showStatus ? (
                  <div className="mt-auto flex items-center gap-2 rounded-lg border border-violet-500/20 bg-violet-500/10 px-2 py-1.5 text-[10px] text-violet-300">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400" />
                    loop: humanize → send · TDD green
                  </div>
                ) : null}
              </div>
            </aside>

            <aside className="hidden border-r border-white/5 bg-zinc-950/40 lg:col-span-2 lg:block">
              <div className="border-b border-white/5 px-3 py-2 text-[11px] font-medium text-zinc-500">
                Explorer
              </div>
              <ul className="space-y-0.5 p-2 font-mono text-[11px]">
                {FILES.map((f) => (
                  <li
                    key={f.name}
                    className={
                      f.active
                        ? 'rounded-md bg-violet-600/20 px-2 py-1 text-violet-200'
                        : f.kind === 'dir'
                          ? 'px-2 py-1 text-zinc-500'
                          : 'rounded-md px-2 py-1 text-zinc-400'
                    }
                  >
                    {f.name}
                  </li>
                ))}
              </ul>
            </aside>

            <div className="flex min-h-0 flex-col lg:col-span-7">
              <div className="flex items-center gap-2 border-b border-white/5 bg-zinc-950/30 px-3 py-1.5 text-[11px]">
                <span className="rounded-t border border-b-0 border-white/10 bg-zinc-900 px-2 py-1 text-violet-200">
                  humanizer.ts
                </span>
                <span className="px-2 py-1 text-zinc-600">loop.ts</span>
                <span className="ml-auto font-mono text-zinc-600">
                  TypeScript
                </span>
              </div>
              <div className="hidden max-h-36 overflow-hidden border-b border-white/5 bg-[#0a0810] px-3 py-2 font-mono text-[11px] leading-5 sm:block">
                {CODE_LINES.slice(0, codeLines).map((line, idx) => (
                  <div key={line.n} className="flex gap-3">
                    <span className="w-5 shrink-0 select-none text-right text-zinc-700">
                      {line.n}
                    </span>
                    <span
                      className={
                        line.tone === 'cmt'
                          ? 'text-zinc-600'
                          : line.tone === 'kw'
                            ? 'text-violet-300/90'
                            : 'text-zinc-300'
                      }
                    >
                      {line.text || ' '}
                      {idx === codeLines - 1 &&
                      codeLines === CODE_LINES.length ? (
                        <span className="caret-blink" aria-hidden />
                      ) : null}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="min-h-0 flex-1 overflow-hidden bg-[#07060c]"
                onClick={onFocusShell}
              >
                {shell}
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 w-[min(92%,420px)] -translate-x-1/2 lg:bottom-5">
            <button
              type="button"
              onClick={() => {
                onFocusShell?.()
                const el = document.getElementById('escopo')
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className="pointer-events-auto flex w-full items-center gap-2 rounded-2xl border border-violet-500/30 bg-zinc-950/90 px-3 py-2.5 text-left shadow-2xl shadow-violet-950/50 backdrop-blur-md transition-colors hover:border-violet-400/50"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 text-zinc-500">
                +
              </span>
              <span className="min-w-0 flex-1 truncate text-sm text-zinc-500">
                Digite help no shell · ou role até Escopo
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg shadow-violet-600/40">
                →
              </span>
            </button>
          </div>
        </BrowserChrome>
      </div>

      <p className="relative z-10 mt-4 text-center text-xs text-zinc-500">
        Workspace interativo — digite{' '}
        <kbd className="rounded border border-white/10 bg-zinc-900/80 px-1.5 py-0.5 font-mono text-zinc-400">
          help
        </kbd>{' '}
        no shell ou{' '}
        <kbd className="rounded border border-white/10 bg-zinc-900/80 px-1.5 py-0.5 font-mono text-zinc-400">
          Ctrl+K
        </kbd>
      </p>
    </section>
  )
}
