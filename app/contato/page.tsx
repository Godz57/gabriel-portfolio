import type { Metadata } from 'next'
import { ContactCtas } from '@/components/ContactCtas'
import { getSiteConfig } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Contato',
  description:
    'Fale comigo: freela, CLT, collab OSS ou automação com agentes. GitHub e WhatsApp.',
}

export default function ContatoPage() {
  const site = getSiteConfig()

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
        Contato
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
        Freela, CLT ou collab — automação, agentes CLI/LLM e sistemas com loop
        em produção. Se você recruta, precisa de um bot ou site comercial, ou
        quer contribuir em OSS, vamos conversar.
      </p>
      <div className="mt-10">
        <ContactCtas github={site.github} whatsapp={site.whatsapp} />
      </div>
    </section>
  )
}
