import { render, screen } from '@testing-library/react'
import App from './App'

const health = {
  status: 'ok',
  app: 'Laravel',
  environment: 'local',
  laravel: '13.37.0',
  php: '8.3.35',
  database: { connected: true, driver: 'mysql', name: 'app' },
}

describe('App', () => {
  beforeEach(() => {
    // Stub fetch so the test never depends on a running backend, and so the
    // state update it triggers is awaited below instead of escaping act().
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(health),
        }),
      ),
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('render tanpa error', async () => {
    const { container } = render(<App />)

    expect(container).not.toBeEmptyDOMElement()
    expect(await screen.findByText('mysql / app')).toBeInTheDocument()
  })
})
