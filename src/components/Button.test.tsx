import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button'

describe('Button', () => {
  it('renders with label', () => {
    render(<Button label="Test Button" />)
    expect(screen.getByText('Test Button')).toBeInTheDocument()
  })

  it('renders primary variant by default', () => {
    render(<Button label="Primary" />)
    const button = screen.getByRole('button')
    expect(button).toHaveStyle({ backgroundColor: '#0066cc' })
  })

  it('renders secondary variant', () => {
    render(<Button label="Secondary" variant="secondary" />)
    const button = screen.getByRole('button')
    expect(button).toHaveStyle({ backgroundColor: '#666' })
  })

  it('handles click events', () => {
    const handleClick = vi.fn()
    render(<Button label="Click me" onClick={handleClick} />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button label="Disabled" disabled />)
    const button = screen.getByRole('button')
    
    expect(button).toBeDisabled()
    expect(button).toHaveStyle({ cursor: 'not-allowed', opacity: '0.6' })
  })

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn()
    render(<Button label="Disabled" disabled onClick={handleClick} />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(handleClick).not.toHaveBeenCalled()
  })
})