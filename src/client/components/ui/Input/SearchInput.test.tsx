import { render, fireEvent } from '@testing-library/react'
import SearchInput from './SearchInput'
import '@testing-library/jest-dom'

describe('SearchInput', () => {
  it('renders a heading', () => {
    const { getByTestId, getByPlaceholderText, getByRole } = render(<SearchInput />)
    
    
    
    const input = getByRole('textbox') as HTMLInputElement

    expect(input).toBeInTheDocument();

    fireEvent.change(input, {
      target: { value: 'Haz' }
    })

    expect(input.value).toBe('Haz')
  })
  
})