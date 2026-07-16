import Image from 'next/image'

type ArcLogoProps = {
  /** mark = monogram only; lockup = monogram-as-A + "RC WEB" */
  variant?: 'mark' | 'lockup'
  className?: string
  /** Height of the mark in px */
  size?: number
  title?: string
  priority?: boolean
}

const MARK_SRC = '/brand/mark-a-core.png'

/**
 * ARC WEB wordmark (same system as arc-web site).
 * Uses site Outfit via CSS variable (no second font load).
 */
export function ArcLogo({
  variant = 'lockup',
  className = '',
  size = 28,
  title = 'ARC WEB',
  priority = false,
}: ArcLogoProps) {
  const markBox = size

  const mark = (
    <span
      className="relative shrink-0 overflow-hidden"
      style={{ width: markBox, height: markBox }}
      aria-hidden={variant === 'lockup' ? true : undefined}
    >
      <Image
        src={MARK_SRC}
        alt={variant === 'mark' ? title : ''}
        width={markBox * 2}
        height={markBox * 2}
        className="h-full w-full scale-[1.55] object-contain object-center"
        priority={priority}
        unoptimized
      />
    </span>
  )

  if (variant === 'mark') {
    return (
      <span className={`inline-flex items-center ${className}`} title={title}>
        {mark}
      </span>
    )
  }

  const typeSize = Math.max(13, size * 0.58)
  const gapPull = Math.round(size * 0.12)

  return (
    <span
      className={`inline-flex items-center ${className}`}
      aria-label={title}
      title={title}
    >
      {mark}
      <span
        className="text-zinc-100/90 transition-colors group-hover:text-white"
        style={{
          fontFamily: 'var(--font-outfit), system-ui, sans-serif',
          fontSize: typeSize,
          fontWeight: 300,
          letterSpacing: '0.22em',
          marginLeft: -gapPull,
          lineHeight: 1,
          paddingBottom: 1,
        }}
      >
        RC&nbsp;WEB
      </span>
    </span>
  )
}
