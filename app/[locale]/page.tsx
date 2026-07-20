import { getTranslations, setRequestLocale } from 'next-intl/server'
import { CaseCard } from '@/components/CaseCard'
import { Hero } from '@/components/Hero'
import { HomeProductDemo } from '@/components/HomeProductDemo'
import { MethodSteps } from '@/components/MethodSteps'
import { OssList } from '@/components/OssList'
import { ProofBar } from '@/components/ProofBar'
import { FaqAccordion } from '@/components/FaqAccordion'
import { ScopePlayground } from '@/components/ScopePlayground'
import { ScrollReveal } from '@/components/ScrollReveal'
import { SectionHeading } from '@/components/SectionHeading'
import { ServicesGrid } from '@/components/ServicesGrid'
import { Link } from '@/i18n/navigation'
import { isLocale } from '@/i18n/routing'
import { getSiteConfig, loadCases } from '@/lib/content'

const STACK_LOGOS = [
  'TypeScript',
  'Next.js',
  'Playwright',
  'Vitest',
  'Vercel',
  'GitHub',
  'OpenAI',
  'Grok',
]

type HomePageProps = {
  params: Promise<{ locale: string }>
}

export default async function Home({ params }: HomePageProps) {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : 'pt'
  setRequestLocale(locale)

  const t = await getTranslations('Home')
  const tHero = await getTranslations('Hero')
  const tCommon = await getTranslations('Common')
  const site = getSiteConfig(locale)
  const cases = loadCases(locale)
  const digits = site.whatsapp?.replace(/\D/g, '') || undefined

  return (
    <div>
      <ScrollReveal variant="fade" delay={0}>
        <Hero
          name={site.name}
          tagline={site.tagline}
          githubUrl={site.github}
          headline={tHero('headline')}
          headlineAccent={tHero('headlineAccent')}
          viewCasesLabel={tHero('viewCases')}
          githubLabel={tCommon('github')}
        />
      </ScrollReveal>

      <ScrollReveal variant="up" delay={80}>
        <HomeProductDemo
          caseSlugs={cases.map((c) => c.slug)}
          githubUrl={site.github}
          whatsappDigits={digits}
          tagline={site.tagline}
        />
      </ScrollReveal>

      <ScrollReveal variant="up">
        <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
          <p className="mb-6 text-center text-sm text-zinc-500">
            {t('stackEcosystem')}
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {STACK_LOGOS.map((name) => (
              <li
                key={name}
                className="text-sm font-medium tracking-wide text-zinc-500 transition-colors hover:text-zinc-300"
              >
                {name}
              </li>
            ))}
          </ul>
        </section>
      </ScrollReveal>

      <ScrollReveal variant="scale">
        <ProofBar items={site.proofItems} />
      </ScrollReveal>

      <ScrollReveal id="servicos" variant="up" stagger={70}>
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <SectionHeading
            label={t('servicesLabel')}
            title={t('servicesTitle')}
            description={t('servicesDescription')}
          />
          <div data-reveal-child>
            <ServicesGrid services={site.services} />
          </div>
          <p
            data-reveal-child
            className="mx-auto mt-10 max-w-2xl text-center text-sm text-zinc-500"
          >
            {t('servicesHybrid')}{' '}
            <Link
              href="/contato"
              className="font-medium text-violet-400 underline-offset-4 hover:text-violet-300 hover:underline"
            >
              {t('servicesHybridCta')}
            </Link>{' '}
            {t('servicesHybridSuffix')}
          </p>
        </section>
      </ScrollReveal>

      <ScrollReveal variant="up" stagger={90}>
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <SectionHeading
            label={t('casesLabel')}
            title={t('casesTitle')}
            description={t('casesDescription')}
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cases.map((c) => (
              <div key={c.slug} data-reveal-child>
                <CaseCard
                  slug={c.slug}
                  title={c.title}
                  summary={c.summary}
                  stack={c.stack}
                  cover={c.cover}
                />
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal variant="up">
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <SectionHeading
            label={t('methodLabel')}
            title={t('methodTitle')}
            description={t('methodDescription')}
          />
          <MethodSteps steps={site.methodSteps} />
        </section>
      </ScrollReveal>

      <ScrollReveal variant="up" stagger={80}>
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <SectionHeading
            label={t('ossLabel')}
            title={t('ossTitle')}
            description={t('ossDescription')}
          />
          <div data-reveal-child>
            <OssList repos={site.ossRepos} />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal id="escopo" variant="up">
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <SectionHeading
            label={t('scopeLabel')}
            title={t('scopeTitle')}
            description={t('scopeDescription')}
          />
          <ScopePlayground whatsappDigits={digits} />
        </section>
      </ScrollReveal>

      <ScrollReveal id="faq" variant="up">
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <SectionHeading
            label={t('faqLabel')}
            title={t('faqTitle')}
            description={t('faqDescription')}
          />
          <FaqAccordion items={site.faqs} />
          <div className="glass-panel mx-auto mt-10 max-w-md rounded-2xl px-6 py-8 text-center">
            <p className="text-sm font-medium text-white">{t('faqCtaTitle')}</p>
            <Link
              href="/contato"
              className="mt-4 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm text-zinc-200 transition-colors hover:border-violet-500/40 hover:text-white"
            >
              {t('faqCtaButton')}
            </Link>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal variant="scale">
        <section className="relative overflow-hidden px-4 py-20 sm:px-6">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-violet-600/10 to-transparent"
          />
          <div className="glass-panel relative mx-auto max-w-3xl rounded-3xl px-8 py-14 text-center">
            <p className="section-label mb-3">{t('contactLabel')}</p>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {t('contactTitle')}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-zinc-400 sm:text-base">
              {t('contactBody')}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contato"
                className="inline-flex items-center rounded-full bg-violet-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-600/30 transition-colors hover:bg-violet-500"
              >
                {t('contactCta')}
              </Link>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-violet-500/40"
              >
                {tCommon('github')}
              </a>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}
