type ProofItem = {
  label: string
  value: string
}

type ProofBarProps = {
  items: ProofItem[]
}

export function ProofBar({ items }: ProofBarProps) {
  return (
    <section
      aria-label="Provas e métricas"
      className="border-y border-zinc-800 bg-zinc-900/50"
    >
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col gap-1">
            <span className="text-lg font-semibold text-violet-400 sm:text-xl">
              {item.value}
            </span>
            <span className="text-sm text-zinc-400">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
