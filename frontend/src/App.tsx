import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Category from './pages/Category'
import Dashboard from './pages/Dashboard'
import Inventory from './pages/Inventory'
import EmployeeManagement from './pages/EmployeeManagement'
import Login from './pages/Login'
import LandingPage from './pages/LandingPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="login" element={<Login />} />
        <Route
          path="category"
          element={
            <main
              id="main-content"
              tabIndex={-1}
              className="mx-4 my-5 py-8 focus:outline-none sm:mx-40"
            >
              <Category />
            </main>
          }
        />
        <Route element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route
            path="transactions"
            element={
              <section aria-labelledby="transactions-title">
                <h1 id="transactions-title" className="text-3xl font-bold text-textprimary">
                  Transactions
                </h1>
                <p className="mt-2 text-base text-textsecondary">
                  Transaction history will appear here.
                </p>
              </section>
            }
          />
          <Route path="inventory" element={<Inventory />} />
          <Route path='employee-management' element={<EmployeeManagement />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
