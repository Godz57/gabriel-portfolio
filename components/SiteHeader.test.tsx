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

describe('SiteHeader', () => {
  it('links to main sections', () => {
    render(<SiteHeader name="Gabriel Almeida" />)
    expect(screen.getByRole('link', { name: /gabriel almeida/i })).toHaveAttribute(
      'href',
      '/',
    )
    expect(screen.getByRole('link', { name: /cases/i })).toHaveAttribute(
      'href',
      '/cases',
    )
    expect(screen.getByRole('link', { name: /stack/i })).toHaveAttribute(
      'href',
      '/stack',
    )
    expect(screen.getByRole('link', { name: /contato/i })).toHaveAttribute(
      'href',
      '/contato',
    )
  })
})
