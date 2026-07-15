export type ServiceItem = {
  title: string
  description: string
  /** Short label under icon */
  icon: string
  tags?: string[]
}

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    icon: '◈',
    title: 'Sites e web apps',
    description:
      'Sites institucionais e produtos web com Next.js: performance, SEO e visual moderno que converte visita em contato.',
    tags: ['Next.js', 'UI', 'Deploy'],
  },
  {
    icon: '◆',
    title: 'Landing pages',
    description:
      'Páginas de oferta com copy clara, CTAs e tracking — ideais para campanhas, lançamentos e geração de leads.',
    tags: ['Conversão', 'Ads', 'WhatsApp'],
  },
  {
    icon: '◎',
    title: 'Agentes com AI',
    description:
      'Agentes que leem contexto, decidem e agem: atendimento, qualificação, resumo de código e loops com stop states.',
    tags: ['LLM', 'CLI', 'Skills'],
  },
  {
    icon: '⚡',
    title: 'Automações',
    description:
      'Fluxos que rodam sozinhos: WhatsApp, browser (Playwright), notificações, handoff humano e integração com seu funil.',
    tags: ['Playwright', 'Bots', 'Ops'],
  },
  {
    icon: '⟨/⟩',
    title: 'Tooling & DX de agentes',
    description:
      'Skills, quality gates, loops e playbooks para o agente trabalhar com método — não só “vibe coding”.',
    tags: ['TDD', 'Superpowers', 'OSS'],
  },
  {
    icon: '⇄',
    title: 'Integrações & APIs',
    description:
      'Conectamos CRM, planilhas, webhooks, pagamentos e serviços externos ao site ou ao agente com segurança.',
    tags: ['API', 'Webhooks', 'Auth'],
  },
  {
    icon: '▲',
    title: 'SEO & performance',
    description:
      'Core Web Vitals, metadados, sitemap e estrutura pensada para ranquear e carregar rápido no mobile.',
    tags: ['SEO', 'Vercel', 'CWV'],
  },
  {
    icon: '▣',
    title: 'Qualidade & segurança',
    description:
      'Revisão OWASP, gates de qualidade e hardening para apps gerados com AI — antes de ir pra produção.',
    tags: ['Pentest', 'Review', 'RLS'],
  },
]

type ServicesGridProps = {
  services?: ServiceItem[]
}

export function ServicesGrid({ services = DEFAULT_SERVICES }: ServicesGridProps) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((s) => (
        <li
          key={s.title}
          className="glass-panel group flex flex-col rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1 hover:border-violet-500/40 motion-reduce:transform-none"
        >
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-600/15 font-mono text-sm text-violet-300 transition-colors group-hover:border-violet-400/40 group-hover:bg-violet-600/25">
            {s.icon}
          </div>
          <h3 className="text-base font-semibold tracking-tight text-white group-hover:text-violet-100">
            {s.title}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
            {s.description}
          </p>
          {s.tags && s.tags.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {s.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-zinc-500"
                >
                  {t}
                </li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ul>
  )
}
