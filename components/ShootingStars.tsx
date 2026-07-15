'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

type Star = {
  id: number
  top: number
  left: number
  duration: number
  delay: number
  length: number
  opacity: number
  angle: number
}

let nextId = 0

function makeStar(): Star {
  return {
    id: nextId++,
    // Start somewhere in the upper half / left-right spread
    top: 5 + Math.random() * 45,
    left: 10 + Math.random() * 70,
    duration: 0.7 + Math.random() * 0.6,
    delay: 0,
    length: 48 + Math.random() * 56,
    opacity: 0.25 + Math.random() * 0.25,
    angle: 28 + Math.random() * 12,
  }
}

/**
 * Occasional subtle shooting stars across the sky background.
 * Desktop + mobile; disabled when prefers-reduced-motion.
 */
export function ShootingStars() {
  const [enabled, setEnabled] = useState(false)
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    if (prefersReducedMotion()) return
    setEnabled(true)

    let cancelled = false
    let timeout: ReturnType<typeof setTimeout>

    function schedule() {
      // 4–11s between showers; sometimes 1 star, rarely 2
      const wait = 4000 + Math.random() * 7000
      timeout = setTimeout(() => {
        if (cancelled) return
        const batch = Math.random() < 0.18 ? 2 : 1
        const fresh = Array.from({ length: batch }, () => makeStar())
        setStars((prev) => [...prev, ...fresh].slice(-6))
        // Remove after animation ends
        for (const s of fresh) {
          const life = (s.duration + 0.15) * 1000
          setTimeout(() => {
            if (cancelled) return
            setStars((prev) => prev.filter((x) => x.id !== s.id))
          }, life)
        }
        schedule()
      }, wait)
    }

    // First star after a short calm intro
    timeout = setTimeout(() => {
      if (cancelled) return
      const s = makeStar()
      setStars([s])
      setTimeout(() => {
        if (!cancelled) setStars((prev) => prev.filter((x) => x.id !== s.id))
      }, (s.duration + 0.15) * 1000)
      schedule()
    }, 2500)

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
          className="shooting-star absolute block"
          style={
            {
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.length}px`,
              opacity: star.opacity,
              ['--star-angle' as string]: `${star.angle}deg`,
              ['--star-duration' as string]: `${star.duration}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}
