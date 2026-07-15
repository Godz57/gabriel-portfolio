'use client'

import { useEffect, useState } from 'react'
import {
  formatRelativeUpdated,
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

export function OssList({ repos }: OssListProps) {
  const [stats, setStats] = useState<Record<string, GithubRepoStats | null>>(
    {},
  )

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('/api/github/repos')
        if (!res.ok) return
        const data = (await res.json()) as {
          repos: Record<string, GithubRepoStats | null>
        }
        if (!cancelled) setStats(data.repos ?? {})
      } catch {
        // keep static fallback
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
              className="group flex h-full flex-col rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-violet-500/60 hover:bg-zinc-900/80 hover:shadow-lg hover:shadow-violet-950/40 motion-reduce:transform-none"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold tracking-tight text-zinc-50 group-hover:text-violet-300">
                  {repo.name}
                </h3>
                {s ? (
                  <span className="shrink-0 rounded-md border border-zinc-700 bg-zinc-950/70 px-2 py-0.5 font-mono text-xs text-amber-200/90">
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
              ) : (
                <p className="mt-3 font-mono text-[11px] text-zinc-600">
                  GitHub · live stats loading…
                </p>
              )}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
