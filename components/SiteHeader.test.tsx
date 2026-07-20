import { render, screen } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import { describe, it, expect, vi } from 'vitest'
import { SiteHeader } from './SiteHeader'

const messages = {
  LocaleSwitcher: { label: 'Idioma', pt: 'PT', en: 'EN' },
  Nav: {
    services: 'Serviços',
    cases: 'Cases',
    scope: 'Escopo',
    faq: 'FAQ',
    contact: 'Contato',
    stack: 'Stack',
    cta: 'Fale comigo',
    ariaHome: 'ARC WEB — início',
    ariaMain: 'Principal',
  },
}

vi.mock('@/i18n/navigation', () => ({
  Link: ({
    href,
    children,
    ...props
  }: {
    href: string
    children: React.ReactNode
  }) => (
    <a href={typeof href === 'string' ? href : '#'} {...props}>
      {children}
    </a>
  ),
  usePathname: () => '/',
  useRouter: () => ({ replace: vi.fn() }),
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

function renderHeader() {
  return render(
    <NextIntlClientProvider locale="pt" messages={messages}>
      <SiteHeader />
    </NextIntlClientProvider>,
  )
}

describe('SiteHeader', () => {
  it('shows ARC WEB logo home link, main sections, CTA and locale switcher', () => {
    renderHeader()
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
    expect(screen.getByRole('link', { name: /fale comigo/i })).toHaveAttribute(
      'href',
      '/contato',
    )
    expect(screen.getByRole('group', { name: /idioma/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^pt$/i })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByRole('button', { name: /^en$/i })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
  })
})
