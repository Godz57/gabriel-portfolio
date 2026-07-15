export type GithubRepoStats = {
  name: string
  fullName: string
  url: string
  stars: number
  language: string | null
  updatedAt: string
}

export function parseGithubRepoUrl(
  url: string,
): { owner: string; repo: string } | null {
  try {
    const u = new URL(url)
    if (u.hostname !== 'github.com') return null
    const parts = u.pathname.replace(/^\//, '').split('/').filter(Boolean)
    if (parts.length < 2) return null
    return { owner: parts[0], repo: parts[1].replace(/\.git$/, '') }
  } catch {
    return null
  }
}

export function formatRelativeUpdated(
  iso: string,
  now = Date.now(),
): string {
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return 'atualizado ?'
  const days = Math.floor((now - then) / (1000 * 60 * 60 * 24))
  if (days <= 0) return 'atualizado hoje'
  if (days === 1) return 'atualizado ontem'
  if (days < 30) return `atualizado há ${days}d`
  const months = Math.floor(days / 30)
  if (months < 12) return `atualizado há ${months}m`
  return `atualizado há ${Math.floor(months / 12)}a`
}

type GhApiRepo = {
  name: string
  full_name: string
  html_url: string
  stargazers_count: number
  language: string | null
  pushed_at: string
}

/** Safe JSON parse — empty / invalid body returns null (no throw). */
export function safeJsonParse<T>(text: string): T | null {
  const trimmed = text.trim()
  if (!trimmed) return null
  try {
    return JSON.parse(trimmed) as T
  } catch {
    return null
  }
}

export async function fetchGithubRepoStats(
  url: string,
  fetchImpl: typeof fetch = fetch,
): Promise<GithubRepoStats | null> {
  const parsed = parseGithubRepoUrl(url)
  if (!parsed) return null

  const res = await fetchImpl(
    `https://api.github.com/repos/${parsed.owner}/${parsed.repo}`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'gabriel-portfolio',
      },
    },
  )

  if (!res.ok) return null

  const text = await res.text()
  const data = safeJsonParse<GhApiRepo>(text)
  if (!data || typeof data.stargazers_count !== 'number') return null

  return {
    name: data.name,
    fullName: data.full_name,
    url: data.html_url,
    stars: data.stargazers_count,
    language: data.language,
    updatedAt: data.pushed_at,
  }
}
