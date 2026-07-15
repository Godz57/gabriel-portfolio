type ContactCtasProps = {
  github: string
  whatsapp?: string
}

export function ContactCtas({ github, whatsapp }: ContactCtasProps) {
  const digits = whatsapp?.replace(/\D/g, '')

  return (
    <div className="flex flex-wrap items-center gap-4">
      <a
        href={github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-500"
      >
        GitHub
      </a>
      {digits ? (
        <a
          href={`https://wa.me/${digits}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-lg border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-violet-500 hover:text-violet-400"
        >
          WhatsApp
        </a>
      ) : null}
    </div>
  )
}
