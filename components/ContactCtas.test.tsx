import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ContactCtas } from './ContactCtas'

describe('ContactCtas', () => {
  it('renders github, email and whatsapp links', () => {
    render(
      <ContactCtas
        github="https://github.com/Godz57"
        whatsapp="5561999999999"
        email="gabrieitous57@gmail.com"
      />,
    )
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      'https://github.com/Godz57',
    )
    expect(
      screen.getByRole('link', { name: /gabrieitous57@gmail\.com/i }),
    ).toHaveAttribute('href', 'mailto:gabrieitous57@gmail.com')
    expect(
      screen.getByRole('link', { name: /whatsapp/i }).getAttribute('href'),
    ).toContain('wa.me/5561999999999')
  })
})
