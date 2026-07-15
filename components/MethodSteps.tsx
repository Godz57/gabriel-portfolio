type MethodStep = {
  title: string
  description: string
}

type MethodStepsProps = {
  steps: MethodStep[]
}

export function MethodSteps({ steps }: MethodStepsProps) {
  return (
    <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <li
          key={step.title}
          className="glass-panel flex flex-col rounded-2xl p-6 transition-colors hover:border-brand/30"
        >
          <span className="text-sm font-medium text-brand-fg">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="mt-3 text-lg font-semibold tracking-tight text-white">
            {step.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            {step.description}
          </p>
        </li>
      ))}
    </ol>
  )
}
