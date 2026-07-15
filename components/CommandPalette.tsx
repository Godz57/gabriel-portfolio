'use client'

import { useRouter } from 'next/navigation'
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import {
  buildCommands,
  filterCommands,
  type SiteCommand,
} from '@/lib/commands'

type CommandPaletteProps = {
  caseSlugs: string[]
  githubUrl: string
  whatsappDigits?: string
}

export function CommandPalette({
  caseSlugs,
  githubUrl,
  whatsappDigits,
}: CommandPaletteProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const commands = useMemo(
    () =>
      buildCommands({
        caseSlugs,
        githubUrl,
        whatsappDigits,
      }),
    [caseSlugs, githubUrl, whatsappDigits],
  )

  const filtered = useMemo(
    () => filterCommands(commands, query),
    [commands, query],
  )

  useEffect(() => {
    function onKey(e: globalThis.KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => {
    setActive(0)
  }, [query])

  const run = useCallback(
    (cmd: SiteCommand) => {
      const { action } = cmd
      setOpen(false)
      if (action.type === 'navigate') {
        router.push(action.href)
        return
      }
      if (action.type === 'external') {
        window.open(action.href, '_blank', 'noopener,noreferrer')
        return
      }
      if (action.type === 'output') {
        // surface in alert is bad — scroll to terminal or toast; for palette output, navigate home with hash
        if (cmd.id === 'cases') {
          router.push('/cases')
          return
        }
        router.push('/#terminal')
      }
    },
    [router],
  )

  function onInputKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => Math.min(i + 1, Math.max(filtered.length - 1, 0)))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const cmd = filtered[active]
      if (cmd) run(cmd)
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-40 hidden items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/90 px-3 py-2 text-xs text-zinc-400 shadow-lg backdrop-blur sm:flex hover:border-violet-500/50 hover:text-violet-300"
        aria-label="Abrir command palette"
      >
        <span>Buscar</span>
        <kbd className="rounded border border-zinc-600 px-1.5 py-0.5 font-mono text-[10px]">
          Ctrl K
        </kbd>
      </button>
    )
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 px-4 pt-[12vh] backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-xl border border-zinc-700 bg-zinc-950 shadow-2xl shadow-violet-950/50 ring-1 ring-violet-500/20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-zinc-800 px-3 py-2">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKey}
            placeholder="Buscar cases, stack, github…"
            className="w-full bg-transparent py-2 text-sm text-zinc-100 outline-none placeholder:text-zinc-600"
            aria-label="Filtrar comandos"
          />
        </div>
        <ul className="max-h-72 overflow-y-auto py-1" role="listbox">
          {filtered.length === 0 ? (
            <li className="px-4 py-6 text-center text-sm text-zinc-500">
              Nenhum resultado
            </li>
          ) : (
            filtered.map((cmd, i) => (
              <li key={cmd.id} role="option" aria-selected={i === active}>
                <button
                  type="button"
                  onClick={() => run(cmd)}
                  onMouseEnter={() => setActive(i)}
                  className={`flex w-full flex-col items-start px-4 py-2.5 text-left text-sm transition-colors ${
                    i === active
                      ? 'bg-violet-600/20 text-violet-100'
                      : 'text-zinc-300 hover:bg-zinc-900'
                  }`}
                >
                  <span className="font-medium">{cmd.name}</span>
                  <span className="text-xs text-zinc-500">{cmd.description}</span>
                </button>
              </li>
            ))
          )}
        </ul>
        <div className="border-t border-zinc-800 px-4 py-2 text-[10px] text-zinc-600">
          ↑↓ navegar · Enter abrir · Esc fechar
        </div>
      </div>
    </div>
  )
}
