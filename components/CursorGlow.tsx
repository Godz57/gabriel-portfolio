'use client'

import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

/** Desktop-only violet spotlight that follows the pointer. */
export function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [on, setOn] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    setOn(true)
    function move(e: MouseEvent) {
      setPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])

  if (!on) return null

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 mix-blend-screen"
      style={{
        background: `radial-gradient(500px circle at ${pos.x}px ${pos.y}px, rgba(139, 92, 246, 0.12), transparent 45%)`,
      }}
    />
  )
}
