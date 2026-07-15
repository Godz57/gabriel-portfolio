import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { CaseCard } from './CaseCard'

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

describe('CaseCard', () => {
  it('links to case page with title and summary', () => {
    render(
      <CaseCard
        slug="wpp-grok"
        title="Bot WhatsApp + LLM"
        summary="Loop real de atendimento com Playwright."
        stack={['Playwright', 'TypeScript']}
      />,
    )
    expect(screen.getByRole('link')).toHaveAttribute('href', '/cases/wpp-grok')
    expect(screen.getByText('Bot WhatsApp + LLM')).toBeInTheDocument()
    expect(
      screen.getByText(/loop real de atendimento/i),
    ).toBeInTheDocument()
  })
})
