import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type MarkdownBodyProps = {
  source: string
  className?: string
}

export function MarkdownBody({ source, className = '' }: MarkdownBodyProps) {
  return (
    <div
      className={[
        'max-w-none space-y-4 text-base leading-relaxed text-zinc-300',
        '[&_h1]:mt-8 [&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:tracking-tight [&_h1]:text-zinc-100 [&_h1]:first:mt-0',
        '[&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-zinc-100 [&_h2]:first:mt-0',
        '[&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-zinc-100',
        '[&_p]:leading-relaxed',
        '[&_a]:font-medium [&_a]:text-violet-400 [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-violet-300',
        '[&_strong]:font-semibold [&_strong]:text-zinc-200',
        '[&_ul]:my-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6',
        '[&_ol]:my-4 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6',
        '[&_li]:leading-relaxed',
        '[&_code]:rounded [&_code]:bg-zinc-900 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm [&_code]:text-violet-300',
        '[&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-zinc-800 [&_pre]:bg-zinc-900/80 [&_pre]:p-4',
        '[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-zinc-300',
        '[&_blockquote]:border-l-2 [&_blockquote]:border-violet-500/50 [&_blockquote]:pl-4 [&_blockquote]:text-zinc-400',
        '[&_hr]:border-zinc-800',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{source}</ReactMarkdown>
    </div>
  )
}
