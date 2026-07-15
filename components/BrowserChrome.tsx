import type { ReactNode } from 'react'

type BrowserChromeProps = {
  children: ReactNode
  title?: string
}

/** macOS-style product window (Codelab hero mockup). */
export function BrowserChrome({
  children,
  title = 'gabriel@portfolio — agent shell',
}: BrowserChromeProps) {
  return (
    <div className="glass-panel relative overflow-hidden rounded-2xl">
      <div className="flex items-center gap-2 border-b border-white/5 bg-zinc-950/50 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 flex-1 truncate rounded-md bg-zinc-900/80 px-3 py-1 text-center font-mono text-[11px] text-zinc-500">
          {title}
        </span>
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}
