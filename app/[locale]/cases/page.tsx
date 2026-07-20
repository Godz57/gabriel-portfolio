import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { CaseCard } from '@/components/CaseCard'
import { ScrollReveal } from '@/components/ScrollReveal'
import { isLocale } from '@/i18n/routing'
import { loadCases } from '@/lib/content'

type CasesPageProps = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: CasesPageProps): Promise<Metadata> {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : 'pt'
  if (locale === 'en') {
    return {
      title: 'Cases',
      description:
        'CLI/LLM agent engineering cases, real automation, and systems in production.',
    }
  }
  return {
    title: 'Cases',
    description:
      'Cases de engenharia de agentes CLI/LLM, automação real e sistemas em produção.',
  }
}

export default async function CasesPage({ params }: CasesPageProps) {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : 'pt'
  setRequestLocale(locale)

  const cases = loadCases(locale)

  return (
    <ScrollReveal variant="up" stagger={90}>
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          Cases
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
          Projetos reais de automação, agentes e tooling — do problema ao loop
          em produção, com stack, decisões e restrições documentadas.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {cases.map((c) => (
            <div key={c.slug} data-reveal-child>
              <CaseCard
                slug={c.slug}
                title={c.title}
                summary={c.summary}
                stack={c.stack}
              />
            </div>
          ))}
        </div>
      </section>
    </ScrollReveal>
  )
}
