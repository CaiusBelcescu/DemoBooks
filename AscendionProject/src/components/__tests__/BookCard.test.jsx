import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import BookCard from '../BookCard'

describe('BookCard', () => {
  test('shows title and toggles description', () => {
    const props = { title: 'A very long title that could overflow but should be truncated', description: 'Long description text about the book that explains the content.', image: '' }
    render(<BookCard {...props} />)

    expect(screen.getByText(/A very long title/i)).toBeInTheDocument()
    // description visible initially
    expect(screen.getByText(/Long description text/)).toBeInTheDocument()

    // find the toggle button and click
    const btn = screen.getByRole('button')
    fireEvent.click(btn)
    expect(screen.queryByText(/Long description text/)).toBeNull()
  })
})
