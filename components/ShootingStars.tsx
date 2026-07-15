'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

type Star = {
  id: number
  top: number
  left: number
  duration: number
  length: number
  /** Horizontal travel (vw) — always to the right */
  dx: number
  /** Vertical travel (vh) — always downward */
  dy: number
  opacity: number
  /** CSS rotate so the trail aligns with the fall path */
  angle: number
}

let nextId = 0

function makeStar(): Star {
  // Fall down-right: positive dx + positive dy (CSS Y grows downward)
  const dx = 55 + Math.random() * 40 // vw
  const dy = 40 + Math.random() * 45 // vh
  // angle of velocity vector in CSS degrees (clockwise from +X)
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI

  return {
    id: nextId++,
    // Start upper-left so the path crosses the sky
    top: -5 + Math.random() * 28,
    left: -10 + Math.random() * 40,
    duration: 1.2 + Math.random() * 0.7,
    length: 100 + Math.random() * 80,
    dx,
    dy,
    opacity: 0.6 + Math.random() * 0.3,
    angle,
  }
}

/**
 * Occasional shooting stars falling down-right (meteor trail + head).
 */
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
        const life = (s.duration + 0.3) * 1000
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
        spawn(Math.random() < 0.15 ? 2 : 1)
        schedule()
      }, wait)
    }

    timeout = setTimeout(() => {
      if (cancelled) return
      spawn(1)
      schedule()
    }, 2000)

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
              top: `${star.top}%`,
              left: `${star.left}%`,
              ['--star-length' as string]: `${star.length}px`,
              ['--star-dx' as string]: `${star.dx}vw`,
              ['--star-dy' as string]: `${star.dy}vh`,
              ['--star-opacity' as string]: String(star.opacity),
              ['--star-angle' as string]: `${star.angle}deg`,
              ['--star-duration' as string]: `${star.duration}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}
