type SiteFooterProps = {
  name: string
  githubUrl: string
}

export function SiteFooter({ name, githubUrl }: SiteFooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-3 px-4 py-8 text-sm text-zinc-400 sm:flex-row sm:items-center sm:px-6">
        <p>
          © {year} {name}
        </p>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-400 transition-colors hover:text-violet-400"
        >
          GitHub
        </a>
      </div>
    </footer>
  )
}
