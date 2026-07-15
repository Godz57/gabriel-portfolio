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
        className="inline-flex items-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-600/25 transition-colors hover:bg-blue-500"
      >
        GitHub
      </a>
      {digits ? (
        <a
          href={`https://wa.me/${digits}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-blue-500/40 hover:text-white"
        >
          WhatsApp
        </a>
      ) : null}
    </div>
  )
}
