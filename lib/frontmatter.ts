/**
 * Minimal YAML-ish frontmatter parser for our case files.
 * Avoids gray-matter / js-yaml (eval + CJS issues under Turbopack).
 *
 * Supports:
 * - scalars: string, number, boolean
 * - flow sequences: [a, b, c]
 * - quoted strings
 */

export type FrontmatterData = Record<string, unknown>

export type ParsedDocument = {
  data: FrontmatterData
  content: string
}

function stripQuotes(value: string): string {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1)
  }
  return value
}

function parseScalar(raw: string): unknown {
  const value = raw.trim()
  if (value === '') return ''
  if (value === 'true') return true
  if (value === 'false') return false
  if (value === 'null' || value === '~') return null

  if (value.startsWith('[') && value.endsWith(']')) {
    const inner = value.slice(1, -1).trim()
    if (!inner) return []
    return inner.split(',').map((part) => {
      const item = stripQuotes(part.trim())
      if (item === 'true') return true
      if (item === 'false') return false
      if (/^-?\d+(\.\d+)?$/.test(item)) return Number(item)
      return item
    })
  }

  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value)
  return stripQuotes(value)
}

export function parseFrontmatter(raw: string): ParsedDocument {
  const text = raw.replace(/^\uFEFF/, '')
  if (!text.startsWith('---')) {
    return { data: {}, content: text }
  }

  const end = text.indexOf('\n---', 3)
  if (end === -1) {
    return { data: {}, content: text }
  }

  const fmBlock = text.slice(3, end).replace(/^\r?\n/, '')
  const content = text.slice(end + 4).replace(/^\r?\n/, '')

  const data: FrontmatterData = {}
  for (const line of fmBlock.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const colon = trimmed.indexOf(':')
    if (colon === -1) continue
    const key = trimmed.slice(0, colon).trim()
    const valueRaw = trimmed.slice(colon + 1)
    data[key] = parseScalar(valueRaw)
  }

  return { data, content }
}
