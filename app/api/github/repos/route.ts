import { NextResponse } from 'next/server'
import { getSiteConfig } from '@/lib/content'
import { fetchGithubRepoStats, type GithubRepoStats } from '@/lib/github'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

function emptyPayload() {
  return NextResponse.json(
    { repos: {} as Record<string, GithubRepoStats | null> },
    {
      status: 200,
      headers: {
        'Cache-Control': 's-maxage=60, stale-while-revalidate=300',
      },
    },
  )
}

export async function GET() {
  try {
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
  } catch {
    // Never return empty/non-JSON body to the client
    return emptyPayload()
  }
}
