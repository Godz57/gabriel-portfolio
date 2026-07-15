import { describe, it, expect, vi } from 'vitest'
import {
  parseGithubRepoUrl,
  formatRelativeUpdated,
  fetchGithubRepoStats,
} from './github'

describe('parseGithubRepoUrl', () => {
  it('parses owner/repo', () => {
    expect(parseGithubRepoUrl('https://github.com/Godz57/grok-loops')).toEqual({
      owner: 'Godz57',
      repo: 'grok-loops',
    })
  })

  it('returns null for non-github', () => {
    expect(parseGithubRepoUrl('https://example.com/x')).toBeNull()
  })
})

describe('formatRelativeUpdated', () => {
  it('formats today', () => {
    const now = Date.parse('2026-07-15T12:00:00Z')
    expect(formatRelativeUpdated('2026-07-15T08:00:00Z', now)).toBe(
      'atualizado hoje',
    )
  })

  it('formats days', () => {
    const now = Date.parse('2026-07-15T12:00:00Z')
    expect(formatRelativeUpdated('2026-07-10T12:00:00Z', now)).toBe(
      'atualizado há 5d',
    )
  })
})

describe('fetchGithubRepoStats', () => {
  it('maps API payload', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        name: 'grok-loops',
        full_name: 'Godz57/grok-loops',
        html_url: 'https://github.com/Godz57/grok-loops',
        stargazers_count: 12,
        language: 'TypeScript',
        pushed_at: '2026-07-01T00:00:00Z',
      }),
    })

    const stats = await fetchGithubRepoStats(
      'https://github.com/Godz57/grok-loops',
      fetchImpl as unknown as typeof fetch,
    )
    expect(stats).toEqual({
      name: 'grok-loops',
      fullName: 'Godz57/grok-loops',
      url: 'https://github.com/Godz57/grok-loops',
      stars: 12,
      language: 'TypeScript',
      updatedAt: '2026-07-01T00:00:00Z',
    })
  })

  it('returns null on error', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: false })
    const stats = await fetchGithubRepoStats(
      'https://github.com/Godz57/x',
      fetchImpl as unknown as typeof fetch,
    )
    expect(stats).toBeNull()
  })
})
