import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { ContactCtas } from '@/components/ContactCtas'
import { ScrollReveal } from '@/components/ScrollReveal'
import { isLocale } from '@/i18n/routing'
import { getSiteConfig } from '@/lib/content'

type ContatoPageProps = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: ContatoPageProps): Promise<Metadata> {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : 'pt'
  if (locale === 'en') {
    return {
      title: 'Contact',
      description:
        'Get in touch: freelance, full-time, OSS collab, or agent automation. GitHub and WhatsApp.',
    }
  }
  return {
    title: 'Contato',
    description:
      'Fale comigo: freela, CLT, collab OSS ou automação com agentes. GitHub e WhatsApp.',
  }
}

export default async function ContatoPage({ params }: ContatoPageProps) {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : 'pt'
  setRequestLocale(locale)

  const t = await getTranslations('Contact')
  const site = getSiteConfig(locale)

  return (
    <ScrollReveal variant="up">
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          {t('title')}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
          {t('intro')}
        </p>
        <div className="mt-10">
          <ContactCtas
            github={site.github}
            whatsapp={site.whatsapp}
            email={site.email}
          />
        </div>
      </section>
    </ScrollReveal>
  )
}
