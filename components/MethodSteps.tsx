type MethodStep = {
  title: string
  description: string
}

type MethodStepsProps = {
  steps: MethodStep[]
}

export function MethodSteps({ steps }: MethodStepsProps) {
  return (
    <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <li
          key={step.title}
          className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/40 p-6"
        >
          <span className="text-sm font-medium text-violet-400">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="mt-2 text-lg font-semibold tracking-tight text-zinc-50">
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
