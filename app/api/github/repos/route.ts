import { NextResponse } from 'next/server'
import { getSiteConfig } from '@/lib/content'
import { fetchGithubRepoStats, type GithubRepoStats } from '@/lib/github'

export const revalidate = 3600

export async function GET() {
  const site = getSiteConfig()
  const results: Record<string, GithubRepoStats | null> = {}

  await Promise.all(
    site.ossRepos.map(async (repo) => {
      try {
        results[repo.url] = await fetchGithubRepoStats(repo.url)
      } catch {
        results[repo.url] = null
      }
    }),
  )

  return NextResponse.json(
    { repos: results },
    {
      headers: {
        'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
      },
    },
  )
}
