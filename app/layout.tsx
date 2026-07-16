import type { Metadata } from 'next'
import { JetBrains_Mono, Outfit, Sora } from 'next/font/google'
import { CommandPaletteHost } from '@/components/CommandPaletteHost'
import { CursorGlow } from '@/components/CursorGlow'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { getSiteConfig } from '@/lib/content'
import './globals.css'

/** UI body — geometric, soft, matches ARC wordmark system */
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

/** Headlines — slightly more character, still tech-clean */
const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['500', '600', '700'],
  display: 'swap',
})

/** Terminal / code */
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500'],
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

const siteDescription =
  'Sites, agentes e automações — do skill ao bot em produção. Portfólio de Gabriel Almeida · ARC WEB.'

/** Static PNG in /public — WhatsApp requires absolute .png/.jpg URL (dynamic /opengraph-image often fails). */
const ogImage = {
  url: '/og.png',
  width: 1200,
  height: 630,
  alt: 'Gabriel Almeida · ARC WEB — sites, agentes e automações',
  type: 'image/png' as const,
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Gabriel Almeida · ARC WEB',
    template: '%s · Gabriel Almeida',
  },
  description: siteDescription,
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    siteName: 'Gabriel Almeida · ARC WEB',
    title: 'Gabriel Almeida · Sites, agentes e automações',
    description: siteDescription,
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gabriel Almeida · Sites, agentes e automações',
    description: siteDescription,
    images: [ogImage],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const site = getSiteConfig()

  return (
    <html
      lang="pt-BR"
      className={`${outfit.variable} ${sora.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col bg-[#05060a] text-zinc-100">
        <CursorGlow />
        <SiteHeader />
        <main className="relative z-10 flex-1">{children}</main>
        <SiteFooter githubUrl={site.github} />
        <CommandPaletteHost />
      </body>
    </html>
  )
}
