'use client'

import { useRef } from 'react'
import { ProductMockup } from '@/components/ProductMockup'
import {
  TerminalHero,
  type TerminalHeroHandle,
} from '@/components/TerminalHero'

type HomeProductDemoProps = {
  caseSlugs: string[]
  githubUrl: string
  whatsappDigits?: string
  tagline: string
}

/** Codelab-level product mockup + interactive shell. */
export function HomeProductDemo({
  caseSlugs,
  githubUrl,
  whatsappDigits,
  tagline,
}: HomeProductDemoProps) {
  const terminalRef = useRef<TerminalHeroHandle>(null)

  return (
    <div id="terminal">
      <ProductMockup
        onFocusShell={() => terminalRef.current?.focus()}
        shell={
          <TerminalHero
            ref={terminalRef}
            embedded
            caseSlugs={caseSlugs}
            githubUrl={githubUrl}
            whatsappDigits={whatsappDigits}
            tagline={tagline}
          />
        }
      />
    </div>
  )
}
