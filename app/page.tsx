import Link from 'next/link'
import { CaseCard } from '@/components/CaseCard'
import { Hero } from '@/components/Hero'
import { MethodSteps } from '@/components/MethodSteps'
import { OssList } from '@/components/OssList'
import { ProofBar } from '@/components/ProofBar'
import { TerminalHero } from '@/components/TerminalHero'
import { getSiteConfig, loadCases } from '@/lib/content'

export default function Home() {
  const site = getSiteConfig()
  const cases = loadCases()
  const digits = site.whatsapp?.replace(/\D/g, '') || undefined

  return (
    <div>
      <Hero name={site.name} tagline={site.tagline} githubUrl={site.github} />
      <div id="terminal">
        <TerminalHero
          caseSlugs={cases.map((c) => c.slug)}
          githubUrl={site.github}
          whatsappDigits={digits}
          tagline={site.tagline}
        />
      </div>
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
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
          Método
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
          Do design aprovado à evidência de pronto — o mesmo fluxo dos kits de
          agentes.
        </p>
        <div className="mt-8">
          <MethodSteps steps={site.methodSteps} />
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
          Open source
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
          Kits públicos para agentes CLI, loops e quality gates — stats ao vivo
          do GitHub.
        </p>
        <div className="mt-8">
          <OssList repos={site.ossRepos} />
        </div>
      </section>
      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
            Freela, CLT ou collab
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            Automação, agentes e sistemas com loop em produção. Vamos conversar.
          </p>
          <div className="mt-8">
            <Link
              href="/contato"
              className="inline-flex items-center rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-500"
            >
              Falar comigo
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
