import type { Metadata } from 'next'
import { JetBrains_Mono, Outfit, Sora } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { CommandPaletteHost } from '@/components/CommandPaletteHost'
import { CursorGlow } from '@/components/CursorGlow'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { isLocale, locales, type Locale } from '@/i18n/routing'
import { getSiteConfig } from '@/lib/content'
import {
  getLanguageAlternates,
  getSeoCopy,
  getSiteUrl,
  htmlLang,
} from '@/lib/seo'

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

/** Static PNG in /public — WhatsApp requires absolute .png/.jpg URL. */
const ogImage = {
  url: '/og.png',
  width: 1200,
  height: 630,
  alt: 'Gabriel Almeida · ARC WEB — sites, agentes e automações',
  type: 'image/png' as const,
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : 'pt'
  const copy = getSeoCopy(locale)
  const siteUrl = getSiteUrl()
  const canonical = locale === 'en' ? '/en' : '/'
  const ogLocale = locale === 'pt' ? 'pt_BR' : 'en_US'

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: copy.title,
      template: '%s · Gabriel Almeida',
    },
    description: copy.description,
    alternates: {
      canonical,
      languages: getLanguageAlternates('/'),
    },
    openGraph: {
      type: 'website',
      locale: ogLocale,
      url: canonical,
      siteName: 'Gabriel Almeida · ARC WEB',
      title: copy.ogTitle,
      description: copy.description,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.ogTitle,
      description: copy.description,
      images: [ogImage],
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()

  const locale: Locale = raw
  setRequestLocale(locale)
  const messages = await getMessages()
  const site = getSiteConfig(locale)

  return (
    <html
      lang={htmlLang(locale)}
      className={`${outfit.variable} ${sora.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col bg-[#05060a] text-zinc-100">
        <NextIntlClientProvider messages={messages}>
          <CursorGlow />
          <SiteHeader />
          <main className="relative z-10 flex-1">{children}</main>
          <SiteFooter githubUrl={site.github} />
          <CommandPaletteHost locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
