type ContactCtasProps = {
  github: string
  whatsapp?: string
  email?: string
}

export function ContactCtas({ github, whatsapp, email }: ContactCtasProps) {
  const digits = whatsapp?.replace(/\D/g, '')

  return (
    <div className="flex flex-wrap items-center gap-4">
      <a
        href={github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center rounded-full bg-violet-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-500"
      >
        GitHub
      </a>
      {email ? (
        <a
          href={`mailto:${email}`}
          className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-violet-500/40 hover:text-white"
        >
          Email
        </a>
      ) : null}
      {digits ? (
        <a
          href={`https://wa.me/${digits}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-violet-500/40 hover:text-white"
        >
          WhatsApp
        </a>
      ) : null}
    </div>
  )
}
