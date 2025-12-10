import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Toggle from '../Toggle'

describe('Toggle', () => {
  test('renders and toggles', () => {
    const handle = jest.fn()
    render(<Toggle on={false} onChange={handle} title="t" />)
    const btn = screen.getByRole('button')
    expect(btn).toBeInTheDocument()
    fireEvent.click(btn)
    expect(handle).toHaveBeenCalledWith(true)
  })
})
