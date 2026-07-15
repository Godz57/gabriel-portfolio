import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { SiteHeader } from './SiteHeader'

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode
    href: string
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

vi.mock('next/image', () => ({
  default: ({
    alt,
    src,
    ...props
  }: {
    alt: string
    src: string
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src={src} {...props} />
  ),
}))

vi.mock('next/font/google', () => ({
  Outfit: () => ({ className: 'font-outfit-mock' }),
}))

describe('SiteHeader', () => {
  it('shows ARC WEB logo home link and main sections', () => {
    render(<SiteHeader />)
    expect(
      screen.getByRole('link', { name: /arc web|início/i }),
    ).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: /^serviços$/i })).toHaveAttribute(
      'href',
      '/#servicos',
    )
    expect(screen.getByRole('link', { name: /^cases$/i })).toHaveAttribute(
      'href',
      '/cases',
    )
    expect(screen.getByRole('link', { name: /^escopo$/i })).toHaveAttribute(
      'href',
      '/#escopo',
    )
    expect(screen.getByRole('link', { name: /^faq$/i })).toHaveAttribute(
      'href',
      '/#faq',
    )
    expect(screen.getByRole('link', { name: /^contato$/i })).toHaveAttribute(
      'href',
      '/contato',
    )
  })
})
