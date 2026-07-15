'use client'

import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

type AnimatedStatProps = {
  value: string
  label: string
}

/** Animate numeric prefix of value (e.g. "7+" → count up to 7, keep "+"). */
export function AnimatedStat({ value, label }: AnimatedStatProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [display, setDisplay] = useState(value)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSeen(true)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!seen) return
    if (prefersReducedMotion()) {
      setDisplay(value)
      return
    }

    const match = /^(\d+)(.*)$/.exec(value)
    if (!match) {
      setDisplay(value)
      return
    }

    const target = Number(match[1])
    const suffix = match[2]
    const duration = 700
    const start = performance.now()

    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - (1 - t) ** 3
      const n = Math.round(eased * target)
      setDisplay(`${n}${suffix}`)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [seen, value])

  return (
    <div ref={ref} className="flex flex-col items-center gap-1">
      <span className="text-xl font-semibold text-blue-400 sm:text-2xl">
        {display}
      </span>
      <span className="text-xs text-zinc-400 sm:text-sm">{label}</span>
    </div>
  )
}
