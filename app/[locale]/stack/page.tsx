import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { MethodSteps } from '@/components/MethodSteps'
import { ScrollReveal } from '@/components/ScrollReveal'
import { isLocale } from '@/i18n/routing'
import { getSiteConfig } from '@/lib/content'

type StackPageProps = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: StackPageProps): Promise<Metadata> {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : 'pt'
  if (locale === 'en') {
    return {
      title: 'Stack',
      description:
        'Working method and stack: TypeScript, Next.js, Playwright, Vitest, and CLI/LLM agents.',
    }
  }
  return {
    title: 'Stack',
    description:
      'Método de trabalho e stack: TypeScript, Next.js, Playwright, Vitest e agents CLI/LLM.',
  }
}

const stackItems = [
  'TypeScript',
  'Next.js',
  'Playwright',
  'Vitest',
  'Agents CLI / LLM',
] as const

export default async function StackPage({ params }: StackPageProps) {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : 'pt'
  setRequestLocale(locale)

  const t = await getTranslations('Stack')
  const site = getSiteConfig(locale)

  return (
    <div>
      <ScrollReveal variant="up">
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            {t('title')}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            {t('intro')}
          </p>
        </section>
      </ScrollReveal>

      <ScrollReveal variant="up" stagger={60}>
        <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 sm:pb-20">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
            {t('mainTitle')}
          </h2>
          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {stackItems.map((item) => (
              <li
                key={item}
                data-reveal-child
                className="glass-panel rounded-xl px-5 py-4 text-sm font-medium text-zinc-200"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      </ScrollReveal>

      <ScrollReveal variant="up">
        <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 sm:pb-20">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
            {t('methodTitle')}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            {t('methodIntro')}
          </p>
          <div className="mt-8">
            <MethodSteps steps={site.methodSteps} />
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}
