import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt =
  'Gabriel Almeida · ARC WEB — sites, agentes e automações'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

/**
 * Preview image for WhatsApp / social shares (1200×630).
 */
export default async function OpenGraphImage() {
  let markDataUrl: string | null = null
  try {
    const markPath = join(process.cwd(), 'public', 'brand', 'mark-a-core.png')
    const bytes = await readFile(markPath)
    markDataUrl = `data:image/png;base64,${bytes.toString('base64')}`
  } catch {
    markDataUrl = null
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 64px',
          background: '#05060a',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Ambient glows */}
        <div
          style={{
            position: 'absolute',
            top: -80,
            left: '30%',
            width: 520,
            height: 520,
            borderRadius: 9999,
            background:
              'radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -120,
            right: -40,
            width: 420,
            height: 420,
            borderRadius: 9999,
            background:
              'radial-gradient(circle, rgba(109,40,217,0.28) 0%, transparent 70%)',
            display: 'flex',
          }}
        />
        {/* Diagonal beam */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(115deg, transparent 40%, rgba(139,92,246,0.08) 48%, transparent 56%)',
            display: 'flex',
          }}
        />

        {/* Top brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            position: 'relative',
          }}
        >
          {markDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={markDataUrl}
              width={56}
              height={56}
              alt=""
              style={{
                width: 56,
                height: 56,
                objectFit: 'contain',
                borderRadius: 12,
              }}
            />
          ) : (
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: 'rgba(139,92,246,0.2)',
                border: '1px solid rgba(139,92,246,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#c4b5fd',
                fontSize: 22,
                fontWeight: 600,
              }}
            >
              A
            </div>
          )}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <span
              style={{
                color: '#e4e4e7',
                fontSize: 22,
                fontWeight: 500,
                letterSpacing: '0.18em',
              }}
            >
              ARC WEB
            </span>
            <span style={{ color: '#71717a', fontSize: 16 }}>
              Portfólio · Gabriel Almeida
            </span>
          </div>
        </div>

        {/* Main copy */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            position: 'relative',
            maxWidth: 900,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              border: '1px solid rgba(139,92,246,0.35)',
              background: 'rgba(139,92,246,0.12)',
              borderRadius: 999,
              padding: '8px 18px',
              color: '#c4b5fd',
              fontSize: 18,
              fontWeight: 500,
              letterSpacing: '0.04em',
            }}
          >
            CLI · LLM · AUTOMAÇÃO REAL
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              color: '#fafafa',
              fontSize: 56,
              fontWeight: 600,
              lineHeight: 1.12,
              letterSpacing: '-0.03em',
            }}
          >
            <span>Sites, agentes e</span>
            <span>automações</span>
            <span style={{ color: '#a1a1aa', fontSize: 42, fontWeight: 500 }}>
              do skill ao bot em produção
            </span>
          </div>
        </div>

        {/* Bottom chips */}
        <div
          style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            position: 'relative',
          }}
        >
          {['Landing pages', 'Agentes AI', 'WhatsApp', 'Next.js'].map(
            (label) => (
              <div
                key={label}
                style={{
                  display: 'flex',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: 999,
                  padding: '10px 18px',
                  color: '#d4d4d8',
                  fontSize: 18,
                }}
              >
                {label}
              </div>
            ),
          )}
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}
