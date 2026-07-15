'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

type Star = {
  id: number
  top: number
  left: number
  duration: number
  length: number
  /** Distance along the trail axis (vw) — full cross-screen flight */
  travelVw: number
  opacity: number
  angle: number
}

let nextId = 0

function makeStar(): Star {
  return {
    id: nextId++,
    // Enter from off / near top-left so the path crosses the viewport
    top: -8 + Math.random() * 35,
    left: -15 + Math.random() * 45,
    duration: 1.15 + Math.random() * 0.75,
    length: 90 + Math.random() * 90,
    travelVw: 70 + Math.random() * 45,
    opacity: 0.55 + Math.random() * 0.35,
    angle: 22 + Math.random() * 18,
  }
}

/**
 * Occasional shooting stars that cross the sky (long trail + bright head).
 * Disabled when prefers-reduced-motion.
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
        const life = (s.duration + 0.25) * 1000
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
              ['--star-travel' as string]: `${star.travelVw}vw`,
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
