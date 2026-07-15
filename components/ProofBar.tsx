import { AnimatedStat } from '@/components/AnimatedStat'

type ProofItem = {
  label: string
  value: string
}

type ProofBarProps = {
  items: ProofItem[]
}

export function ProofBar({ items }: ProofBarProps) {
  return (
    <section aria-label="Provas e métricas" className="px-4 py-12 sm:px-6">
      <p className="mb-8 text-center text-sm text-zinc-500">
        Prova em números — tooling, automação e método
      </p>
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="glass-panel rounded-2xl px-5 py-6 text-center"
          >
            <AnimatedStat value={item.value} label={item.label} />
          </div>
        ))}
      </div>
    </section>
  )
}
