'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

type Star = {
  id: number
  startTop: number
  startLeft: number
  endTop: number
  endLeft: number
  duration: number
  length: number
  opacity: number
  angle: number
}

let nextId = 0

function makeStar(): Star {
  // Start below the header band, left half of the sky
  const startTop = 12 + Math.random() * 32
  const startLeft = -8 + Math.random() * 35
  // Always fall down-right in % of viewport ( unambiguous with top/left )
  const endTop = startTop + 35 + Math.random() * 40
  const endLeft = startLeft + 45 + Math.random() * 45
  const dTop = endTop - startTop
  const dLeft = endLeft - startLeft
  // CSS rotate: positive = clockwise; y grows downward → atan2(dTop, dLeft)
  const angle = (Math.atan2(dTop, dLeft) * 180) / Math.PI

  return {
    id: nextId++,
    startTop,
    startLeft,
    endTop,
    endLeft,
    duration: 1.25 + Math.random() * 0.7,
    length: 100 + Math.random() * 70,
    opacity: 0.65 + Math.random() * 0.25,
    angle,
  }
}

export function ShootingStars() {
  const [enabled, setEnabled] = useState(false)
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    if (prefersReducedMotion()) return
    setEnabled(true)

    let cancelled = false
    let timeout: ReturnType<typeof setTimeout>

    function spawn(batch = 1) {
      const fresh = Array.from({ length: batch }, () => makeStar())
      setStars((prev) => [...prev, ...fresh].slice(-8))
      for (const s of fresh) {
        const life = (s.duration + 0.35) * 1000
        setTimeout(() => {
          if (cancelled) return
          setStars((prev) => prev.filter((x) => x.id !== s.id))
        }, life)
      }
    }

    function schedule() {
      const wait = 3500 + Math.random() * 6500
      timeout = setTimeout(() => {
        if (cancelled) return
        spawn(Math.random() < 0.12 ? 2 : 1)
        schedule()
      }, wait)
    }

    timeout = setTimeout(() => {
      if (cancelled) return
      spawn(1)
      schedule()
    }, 1800)

    return () => {
      cancelled = true
      clearTimeout(timeout)
    }
  }, [])

  if (!enabled) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      {stars.map((star) => (
        <span
          key={star.id}
          className="shooting-star"
          style={
            {
              ['--star-start-top' as string]: `${star.startTop}%`,
              ['--star-start-left' as string]: `${star.startLeft}%`,
              ['--star-end-top' as string]: `${star.endTop}%`,
              ['--star-end-left' as string]: `${star.endLeft}%`,
              ['--star-length' as string]: `${star.length}px`,
              ['--star-opacity' as string]: String(star.opacity),
              ['--star-angle' as string]: `${star.angle}deg`,
              ['--star-duration' as string]: `${star.duration}s`,
            } as CSSProperties
          }
        >
          <span className="shooting-star__body" />
        </span>
      ))}
    </div>
  )
}
