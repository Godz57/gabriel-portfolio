type OssRepo = {
  name: string
  url: string
  blurb: string
}

type OssListProps = {
  repos: OssRepo[]
}

export function OssList({ repos }: OssListProps) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {repos.map((repo) => (
        <li key={repo.url}>
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 transition-colors hover:border-violet-500/50 hover:bg-zinc-900/80"
          >
            <h3 className="text-lg font-semibold tracking-tight text-zinc-50 group-hover:text-violet-300">
              {repo.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              {repo.blurb}
            </p>
          </a>
        </li>
      ))}
    </ul>
  )
}
