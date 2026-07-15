import Link from 'next/link'
import { CaseCard } from '@/components/CaseCard'
import { Hero } from '@/components/Hero'
import { MethodSteps } from '@/components/MethodSteps'
import { OssList } from '@/components/OssList'
import { ProofBar } from '@/components/ProofBar'
import { SectionHeading } from '@/components/SectionHeading'
import { TerminalHero } from '@/components/TerminalHero'
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

      {/* Logo / stack strip — Codelab “loved by” style */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <p className="mb-6 text-center text-sm text-zinc-500">
          Stack e ecossistema com que eu construo
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

      <ProofBar items={site.proofItems} />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          label="Cases"
          title="Do skill ao bot em produção"
          description="Automação real, agentes e sistemas com loop — cada case com arquitetura e decisões."
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          label="Método"
          title="Do design aprovado à evidência de pronto"
          description="O mesmo fluxo dos kits de agentes: brainstorm, plan, TDD e verify-done."
        />
        <MethodSteps steps={site.methodSteps} />
      </section>

      {/* Pill tags — Codelab “what makes different” */}
      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <SectionHeading
          label="Foco"
          title="O que eu entrego"
          description="Especialização em tooling de agentes e automação com qualidade."
        />
        <ul className="flex flex-wrap justify-center gap-3">
          {[
            'Agent tooling',
            'CLI + LLM',
            'Playwright loops',
            'TDD & verify',
            'Security gates',
            'Open source kits',
            'Automação comercial',
          ].map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-200/90"
            >
              {tag}
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          label="Open source"
          title="Kits públicos no GitHub"
          description="Skills, loops e quality gates — stats ao vivo do GitHub."
        />
        <OssList repos={site.ossRepos} />
      </section>

      <section className="relative overflow-hidden px-4 py-20 sm:px-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent"
        />
        <div className="glass-panel relative mx-auto max-w-3xl rounded-3xl px-8 py-14 text-center">
          <p className="section-label mb-3">Contato</p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Fale comigo
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-zinc-400 sm:text-base">
            Automação, agentes e sistemas com loop em produção. Vamos conversar.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contato"
              className="inline-flex items-center rounded-full bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-600/30 transition-colors hover:bg-blue-500"
            >
              Falar comigo
            </Link>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-blue-500/40"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
