'use client'

import { useEffect, useState } from 'react'
import { computeScrollProgress } from '@/lib/scroll'

const TICK_COUNT = 20

function RailTicks() {
  return (
    <div
      className="absolute inset-y-20 flex flex-col justify-between"
      aria-hidden
    >
      {Array.from({ length: TICK_COUNT }, (_, i) => (
        <span
          key={i}
          className={`block h-px bg-violet-500/20 ${
            i % 4 === 0 ? 'w-2.5 bg-violet-400/45' : 'w-1.5'
          }`}
        />
      ))}
    </div>
  )
}

/**
 * Desktop side HUD: violet rails + vertical scroll progress.
 * Hidden below lg; decorative + accessible progressbar.
 */
export function SideChrome() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function update() {
      const el = document.documentElement
      setProgress(
        computeScrollProgress(
          window.scrollY,
          el.scrollHeight,
          window.innerHeight,
        ),
      )
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const pct = Math.round(progress * 100)

  return (
    <>
      {/* Left rail */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-y-0 left-0 z-20 hidden w-10 lg:block xl:w-12"
      >
        <div className="absolute inset-y-8 left-5 w-px bg-gradient-to-b from-transparent via-violet-500/45 to-transparent shadow-[0_0_14px_rgba(139,92,246,0.4)] xl:left-6" />
        <div className="absolute inset-y-0 left-5 w-3 xl:left-6">
          <RailTicks />
        </div>
        <div className="absolute left-1.5 top-24 flex flex-col items-center gap-2 xl:left-2">
          <span className="font-mono text-[9px] tracking-[0.25em] text-violet-400/75 [writing-mode:vertical-rl] rotate-180">
            SYS
          </span>
          <span className="h-5 w-px bg-violet-500/35" />
          <span className="font-mono text-[9px] tracking-[0.25em] text-zinc-600 [writing-mode:vertical-rl] rotate-180">
            AGENT
          </span>
        </div>
        <div className="absolute bottom-20 left-2 font-mono text-[9px] text-zinc-700 xl:left-2.5">
          01
        </div>
      </div>

      {/* Right rail + scroll progress */}
      <div className="pointer-events-none fixed inset-y-0 right-0 z-20 hidden w-10 lg:block xl:w-12">
        <div
          aria-hidden
          className="absolute inset-y-8 right-5 w-px bg-gradient-to-b from-transparent via-zinc-700 to-transparent xl:right-6"
        />
        <div
          className="absolute inset-y-8 right-5 w-0.5 overflow-hidden rounded-full bg-zinc-800/90 xl:right-6"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
          aria-label="Progresso da página"
        >
          <div
            className="absolute left-0 right-0 top-0 rounded-full bg-gradient-to-b from-violet-400 to-violet-600 shadow-[0_0_12px_rgba(139,92,246,0.55)] transition-[height] duration-150 ease-out motion-reduce:transition-none"
            style={{ height: `${pct}%` }}
          />
        </div>
        <div className="absolute inset-y-0 right-5 w-3 xl:right-6" aria-hidden>
          <RailTicks />
        </div>
        <div
          className="absolute right-1 top-24 font-mono text-[9px] tracking-[0.2em] text-violet-400/70 [writing-mode:vertical-rl] xl:right-1.5"
          aria-hidden
        >
          SCROLL
        </div>
        <div
          className="absolute bottom-20 right-1.5 font-mono text-[10px] tabular-nums text-zinc-500 xl:right-2"
          aria-hidden
        >
          {String(pct).padStart(2, '0')}
        </div>
      </div>
    </>
  )
}
