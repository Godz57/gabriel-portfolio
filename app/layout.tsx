import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { CommandPaletteHost } from '@/components/CommandPaletteHost'
import { CursorGlow } from '@/components/CursorGlow'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { getSiteConfig } from '@/lib/content'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Gabriel Almeida',
    template: '%s · Gabriel Almeida',
  },
  description:
    'Portfólio de Gabriel Almeida — engenharia de agentes CLI/LLM, automação real e toolkits open source: do skill ao bot em produção.',
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col bg-[#05060a] text-zinc-100">
        <CursorGlow />
        <SiteHeader name={site.name} />
        <main className="relative z-10 flex-1">{children}</main>
        <SiteFooter name={site.name} githubUrl={site.github} />
        <CommandPaletteHost />
      </body>
    </html>
  )
}
