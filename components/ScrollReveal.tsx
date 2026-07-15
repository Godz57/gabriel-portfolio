'use client'

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react'
import { prefersReducedMotion } from '@/lib/motion'

type Variant = 'up' | 'fade' | 'left' | 'right' | 'scale'

type ScrollRevealProps = {
  children: ReactNode
  className?: string
  /** Entrance style */
  variant?: Variant
  /** Delay in ms after entering viewport */
  delay?: number
  /** Stagger direct children with [data-reveal-child] by this ms */
  stagger?: number
  /** Root margin for IntersectionObserver */
  rootMargin?: string
  as?: ElementType
  id?: string
}

const VARIANT_CLASS: Record<Variant, string> = {
  up: 'reveal-up',
  fade: 'reveal-fade',
  left: 'reveal-left',
  right: 'reveal-right',
  scale: 'reveal-scale',
}

/**
 * Fade/slide content in when it enters the viewport (scroll-driven).
 */
export function ScrollReveal({
  children,
  className = '',
  variant = 'up',
  delay = 0,
  stagger,
  rootMargin = '0px 0px -8% 0px',
  as: Tag = 'div',
  id,
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (prefersReducedMotion()) {
      setVisible(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin])

  useEffect(() => {
    if (!visible || stagger == null || stagger <= 0) return
    const el = ref.current
    if (!el) return
    const kids = el.querySelectorAll<HTMLElement>('[data-reveal-child]')
    kids.forEach((kid, i) => {
      kid.style.transitionDelay = `${delay + i * stagger}ms`
      kid.classList.add('reveal-child-visible')
    })
  }, [visible, stagger, delay])

  const style = {
    '--reveal-delay': `${delay}ms`,
  } as CSSProperties

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      id={id}
      style={style}
      className={[
        'reveal',
        VARIANT_CLASS[variant],
        visible ? 'reveal-visible' : '',
        stagger != null ? 'reveal-stagger' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </Tag>
  )
}
