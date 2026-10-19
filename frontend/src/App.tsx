import { useEffect, useState } from 'react'

type Health = {
  status: string
  app: string
  environment: string
  laravel: string
  php: string
  database: {
    connected: boolean
    driver?: string
    name?: string
    error?: string
  }
}

type State =
  | { phase: 'loading' }
  | { phase: 'ready'; data: Health }
  | { phase: 'error'; message: string }

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <dt className="text-slate-400">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  )
}

function App() {
  const [state, setState] = useState<State>({ phase: 'loading' })

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    // Wrapped in try/catch so a failed or unavailable fetch degrades into an
    // error message instead of throwing out of the effect and blanking the UI.
    const load = async () => {
      try {
        const response = await fetch('/api/health', { signal: controller.signal })

        if (!response.ok) {
          throw new Error(`backend responded with HTTP ${response.status}`)
        }

        const data = (await response.json()) as Health

        if (active) {
          setState({ phase: 'ready', data })
        }
      } catch (error: unknown) {
        if (!active || (error instanceof Error && error.name === 'AbortError')) {
          return
        }

        setState({
          phase: 'error',
          message: error instanceof Error ? error.message : 'unknown error',
        })
      }
    }

    void load()

    return () => {
      active = false
      controller.abort()
    }
  }, [])

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-slate-100">
      <section className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg">
        <h1 className="text-2xl font-semibold">Erusea</h1>
        <p className="mt-1 text-sm text-slate-400">React frontend + Laravel API</p>

        <h2 className="mt-6 text-xs font-medium tracking-wide text-slate-400 uppercase">
          Backend status
        </h2>

        <div className="mt-2 text-sm" aria-live="polite">
          {state.phase === 'loading' && <p className="text-slate-300">Checking…</p>}

          {state.phase === 'error' && (
            <p className="text-red-400">Unreachable: {state.message}</p>
          )}

          {state.phase === 'ready' && (
            <dl className="divide-y divide-slate-800">
              <Row label="Status" value={state.data.status} />
              <Row label="Environment" value={state.data.environment} />
              <Row label="Laravel" value={state.data.laravel} />
              <Row label="PHP" value={state.data.php} />
              <Row
                label="Database"
                value={
                  state.data.database.connected
                    ? `${state.data.database.driver} / ${state.data.database.name}`
                    : (state.data.database.error ?? 'disconnected')
                }
              />
            </dl>
          )}
        </div>
      </section>
    </main>
    
  )
}

export default App
