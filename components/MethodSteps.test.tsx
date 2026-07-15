import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MethodSteps } from './MethodSteps'

describe('MethodSteps', () => {
  it('renders four steps', () => {
    render(
      <MethodSteps
        steps={[
          { title: 'A', description: 'da' },
          { title: 'B', description: 'db' },
          { title: 'C', description: 'dc' },
          { title: 'D', description: 'dd' },
        ]}
      />,
    )
    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText('D')).toBeInTheDocument()
  })
})
