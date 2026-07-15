'use client'

import { useEffect, useState } from 'react'
import {
  formatRelativeUpdated,
  safeJsonParse,
  type GithubRepoStats,
} from '@/lib/github'

type OssRepo = {
  name: string
  url: string
  blurb: string
}

type OssListProps = {
  repos: OssRepo[]
}

type LoadState = 'loading' | 'ready' | 'error'

export function OssList({ repos }: OssListProps) {
  const [stats, setStats] = useState<Record<string, GithubRepoStats | null>>(
    {},
  )
  const [loadState, setLoadState] = useState<LoadState>('loading')

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('/api/github/repos')
        const text = await res.text()
        const data = safeJsonParse<{
          repos?: Record<string, GithubRepoStats | null>
        }>(text)

        if (cancelled) return

        if (!res.ok || !data) {
          setLoadState('error')
          return
        }

        setStats(data.repos ?? {})
        setLoadState('ready')
      } catch {
        if (!cancelled) setLoadState('error')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {repos.map((repo) => {
        const s = stats[repo.url]
        return (
          <li key={repo.url}>
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel group flex h-full flex-col rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:border-blue-500/40 motion-reduce:transform-none"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold tracking-tight text-white group-hover:text-blue-200">
                  {repo.name}
                </h3>
                {s ? (
                  <span className="shrink-0 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-0.5 font-mono text-xs text-amber-200/90">
                    ★ {s.stars}
                  </span>
                ) : null}
              </div>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
                {repo.blurb}
              </p>
              {s ? (
                <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-zinc-500">
                  {s.language ? <span>{s.language}</span> : null}
                  <span>{formatRelativeUpdated(s.updatedAt)}</span>
                </p>
              ) : loadState === 'loading' ? (
                <p className="mt-3 font-mono text-[11px] text-zinc-600">
                  GitHub · carregando stats…
                </p>
              ) : (
                <p className="mt-3 font-mono text-[11px] text-zinc-600">
                  GitHub · Godz57
                </p>
              )}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
