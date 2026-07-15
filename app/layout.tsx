import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
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

export const metadata: Metadata = {
  title: {
    default: 'Gabriel Almeida',
    template: '%s · Gabriel Almeida',
  },
  description:
    'Engenharia de agentes CLI/LLM e automação real: do skill ao bot em produção.',
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
      <body className="flex min-h-full flex-col bg-zinc-950 text-zinc-100">
        <SiteHeader name={site.name} />
        <main className="flex-1">{children}</main>
        <SiteFooter name={site.name} githubUrl={site.github} />
      </body>
    </html>
  )
}
