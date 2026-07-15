import { CaseCard } from '@/components/CaseCard'
import { Hero } from '@/components/Hero'
import { ProofBar } from '@/components/ProofBar'
import { getSiteConfig, loadCases } from '@/lib/content'

export default function Home() {
  const site = getSiteConfig()
  const cases = loadCases()

  return (
    <div>
      <Hero name={site.name} tagline={site.tagline} githubUrl={site.github} />
      <ProofBar items={site.proofItems} />
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
          Cases
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
          Automação real, agentes e sistemas com loop em produção.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <CaseCard
              key={c.slug}
              slug={c.slug}
              title={c.title}
              summary={c.summary}
              stack={c.stack}
            />
          ))}
        </div>
      </section>
      {/* Remaining home sections: method, OSS, CTA — later tasks */}
    </div>
  )
}
