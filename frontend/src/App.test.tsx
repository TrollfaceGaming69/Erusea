import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  it('renders an accessible dashboard with working navigation', async () => {
    const user = userEvent.setup()
    render(<App />)

    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument()
    expect(screen.getByText('manage transactions and view history')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: "Today's Sale" })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveAttribute('aria-current', 'page')

    await user.click(screen.getByRole('link', { name: 'Transaction' }))
    expect(screen.getByRole('heading', { name: 'Transactions', level: 1 })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Transaction' })).toHaveAttribute('aria-current', 'page')

    await user.click(screen.getByRole('link', { name: 'Inventory' }))
    expect(screen.getByRole('heading', { name: 'Add or manage inventory' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Inventory' })).toHaveAttribute('aria-current', 'page')

    await user.click(screen.getByRole('link', { name: 'Open bakery category' }))
    expect(screen.getByRole('heading', { name: 'Bakery', level: 1 })).toBeInTheDocument()
    expect(screen.queryByRole('navigation', { name: 'Main navigation' })).not.toBeInTheDocument()
  })
})
