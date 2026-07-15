'use client'

import type { ReactNode } from 'react'
import { BrowserChrome } from '@/components/BrowserChrome'

type ProductMockupProps = {
  /** Interactive shell (terminal) rendered in the bottom editor zone */
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

const CODE_LINES: { n: number; text: string; tone?: 'kw' | 'str' | 'cmt' | 'fn' }[] = [
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

/**
 * Codelab-style product window: chat + file tree + code + interactive shell.
 */
export function ProductMockup({ shell, onFocusShell }: ProductMockupProps) {
  return (
    <section className="relative mx-auto max-w-6xl px-4 pb-8 sm:px-6 sm:pb-12">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[75%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 blur-[90px]"
      />
      {/* Floating particles */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[18%] z-20 flex -translate-x-1/2 gap-2"
      >
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-fg/80" />
        <span className="mt-2 h-1 w-1 animate-pulse rounded-full bg-brand-fg-soft/50 [animation-delay:200ms]" />
        <span className="h-1 w-1 animate-pulse rounded-full bg-brand-fg/40 [animation-delay:400ms]" />
      </div>

      <div className="relative">
        <BrowserChrome title="gabriel.portfolio / agent-workspace">
          {/* App toolbar */}
          <div className="flex items-center gap-1 border-b border-white/5 bg-zinc-950/60 px-3 py-2 text-xs">
            {['Agent', 'Workspace', 'Cases', 'Verify'].map((tab, i) => (
              <span
                key={tab}
                className={
                  i === 0
                    ? 'rounded-md bg-brand/25 px-2.5 py-1 font-medium text-brand-fg'
                    : 'rounded-md px-2.5 py-1 text-zinc-500'
                }
              >
                {tab}
              </span>
            ))}
            <span className="ml-auto rounded-md bg-brand px-2.5 py-1 text-[11px] font-medium text-white">
              Deploy
            </span>
          </div>

          {/* Multi-panel body */}
          <div className="grid max-h-[min(560px,75vh)] grid-cols-1 overflow-hidden pb-16 lg:grid-cols-12 lg:max-h-[520px]">
            {/* Chat / agent */}
            <aside className="hidden flex-col border-r border-white/5 bg-zinc-950/50 lg:col-span-3 lg:flex">
              <div className="border-b border-white/5 px-3 py-2 text-[11px] font-medium text-zinc-500">
                Agent · Rafael
              </div>
              <div className="flex flex-1 flex-col gap-3 overflow-hidden p-3 text-[12px] leading-relaxed">
                <div className="self-start max-w-[95%] rounded-xl rounded-tl-sm border border-white/5 bg-zinc-900/80 px-3 py-2 text-zinc-300">
                  oi! aqui é o Rafael, da ARC WEB. que tipo de site você tem em
                  mente?
                </div>
                <div className="self-end max-w-[90%] rounded-xl rounded-tr-sm bg-brand/30 px-3 py-2 text-brand-fg">
                  Landing page com WhatsApp e portfolio.
                </div>
                <div className="self-start max-w-[95%] rounded-xl rounded-tl-sm border border-white/5 bg-zinc-900/80 px-3 py-2 text-zinc-300">
                  perfeito. vou montar o fluxo: hero → cases → contato. ok?
                </div>
                <div className="mt-auto flex items-center gap-2 rounded-lg border border-brand/20 bg-brand-hover/10 px-2 py-1.5 text-[10px] text-brand-fg-soft">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-fg" />
                  loop: humanize → send · TDD green
                </div>
              </div>
            </aside>

            {/* File tree */}
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
                        ? 'rounded-md bg-brand/20 px-2 py-1 text-brand-fg'
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

            {/* Code + shell */}
            <div className="flex min-h-0 flex-col lg:col-span-7">
              <div className="flex items-center gap-2 border-b border-white/5 bg-zinc-950/30 px-3 py-1.5 text-[11px]">
                <span className="rounded-t border border-b-0 border-white/10 bg-zinc-900 px-2 py-1 text-brand-fg">
                  humanizer.ts
                </span>
                <span className="px-2 py-1 text-zinc-600">loop.ts</span>
                <span className="ml-auto font-mono text-zinc-600">TypeScript</span>
              </div>
              <div className="hidden max-h-36 overflow-hidden border-b border-white/5 bg-[#0a0810] px-3 py-2 font-mono text-[11px] leading-5 sm:block">
                {CODE_LINES.map((line) => (
                  <div key={line.n} className="flex gap-3">
                    <span className="w-5 shrink-0 select-none text-right text-zinc-700">
                      {line.n}
                    </span>
                    <span
                      className={
                        line.tone === 'cmt'
                          ? 'text-zinc-600'
                          : line.tone === 'kw'
                            ? 'text-brand-fg-soft/90'
                            : 'text-zinc-300'
                      }
                    >
                      {line.text || ' '}
                    </span>
                  </div>
                ))}
              </div>

              {/* Interactive shell */}
              <div
                className="min-h-0 flex-1 overflow-hidden bg-[#07060c]"
                onClick={onFocusShell}
              >
                {shell}
              </div>
            </div>
          </div>

          {/* Floating prompt (Codelab-style) */}
          <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 w-[min(92%,420px)] -translate-x-1/2 lg:bottom-5">
            <button
              type="button"
              onClick={onFocusShell}
              className="pointer-events-auto flex w-full items-center gap-2 rounded-2xl border border-brand/30 bg-zinc-950/90 px-3 py-2.5 text-left shadow-2xl shadow-brand/50 backdrop-blur-md transition-colors hover:border-brand-fg-soft/50"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 text-zinc-500">
                +
              </span>
              <span className="min-w-0 flex-1 truncate text-sm text-zinc-500">
                Descreva o que quer explorar… (ou digite help)
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-white shadow-lg shadow-brand/40">
                →
              </span>
            </button>
          </div>
        </BrowserChrome>
      </div>

      <p className="relative mt-4 text-center text-xs text-zinc-500">
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
