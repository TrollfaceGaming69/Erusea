import Nav from '../components/Nav'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className="min-h-svh">
      <a
        href="#main-content"
        className="sr-only rounded-md bg-containerbg px-4 py-2 text-accent focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-10 focus:outline-2 focus:outline-offset-2 focus:outline-accent"
      >
        Skip to main content
      </a>
      <Nav />
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-4 mt-5 py-8 focus:outline-none sm:mx-40"
      >
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
