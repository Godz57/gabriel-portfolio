import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Hero } from './Hero'

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

describe('Hero', () => {
  it('shows name, tagline and CTAs', () => {
    render(
      <Hero
        name="Gabriel Almeida"
        tagline="Engenharia de agentes CLI/LLM."
        githubUrl="https://github.com/Godz57"
      />,
    )
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Gabriel Almeida',
    )
    expect(screen.getByText(/engenharia de agentes/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /ver cases/i })).toHaveAttribute(
      'href',
      '/cases',
    )
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      'https://github.com/Godz57',
    )
    expect(screen.getByRole('img', { name: 'Gabriel Almeida' })).toHaveAttribute(
      'src',
      '/gabriel-almeida.jpg',
    )
  })
})
