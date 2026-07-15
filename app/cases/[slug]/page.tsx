import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MarkdownBody } from '@/components/MarkdownBody'
import { getCaseBySlug, loadCases } from '@/lib/content'

type CasePageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return loadCases().map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: CasePageProps): Promise<Metadata> {
  const { slug } = await params
  const doc = getCaseBySlug(slug)
  if (!doc) {
    return { title: 'Case' }
  }
  return {
    title: doc.title,
    description: doc.summary,
  }
}

export default async function CasePage({ params }: CasePageProps) {
  const { slug } = await params
  const doc = getCaseBySlug(slug)
  if (!doc) notFound()

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          {doc.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
          {doc.summary}
        </p>
        {doc.stack.length > 0 ? (
          <ul className="mt-6 flex flex-wrap gap-2">
            {doc.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-zinc-700/80 bg-zinc-950/60 px-2.5 py-1 text-xs text-zinc-400"
              >
                {tech}
              </li>
            ))}
          </ul>
        ) : null}
        {doc.repoUrl ? (
          <p className="mt-6">
            <a
              href={doc.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-violet-400 underline underline-offset-4 hover:text-violet-300"
            >
              Ver repositório
            </a>
          </p>
        ) : null}
      </header>
      <div className="mt-10 border-t border-zinc-800 pt-10">
        <MarkdownBody source={doc.body} />
      </div>
    </article>
  )
}
