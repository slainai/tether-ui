import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, it } from 'vitest'
import { Template } from './Template'

describe('Template', () => {
  it('renders without crashing', () => {
    render(<Template>Hello</Template>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('renders the default variant', () => {
    render(<Template variant="default">Hello</Template>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('merges custom className', () => {
    render(<Template className="custom-class">Hello</Template>)
    expect(screen.getByText('Hello')).toHaveClass('custom-class')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Template ref={ref}>Hello</Template>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
