import { LogOutIcon } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

const Nav = () => {
  return (
    <nav aria-label="Main navigation" className="flex justify-between px-10.5 py-2 shadow-[0_1px_3px_rgba(0,0,0,0.2)]">
      <div>
        <Link to="/dashboard" aria-label="Erusea Store dashboard">
          <h1 className="text-[32px] font-bold">StoreName</h1>
          <h3 className="text-[16px] font-bold text-accent">Erusea</h3>
        </Link>
      </div>

      <div className="flex justify-between gap-10 items-center">
        <NavLink
          to="/dashboard"
          aria-label="Dashboard"
          className="flex flex-wrap px-4 py-2 items-center justify-center rounded-md text-accent bg-secaccent font-medium text-[20px] fhd:14px"
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/transactions"
          className="flex flex-wrap px-4 py-2 items-center justify-center rounded-md font-medium text-[20px]"
        >
          Transaction
        </NavLink>

        <NavLink to="/inventory"
          className="flex flex-wrap px-4 py-2 items-center justify-center rounded-md font-medium text-[20px]">
          Inventory
        </NavLink>

        <NavLink to="/employee-management"
          className="flex flex-wrap px-4 py-2 items-center justify-center rounded-md font-medium text-[20px]">
          Employee Management
        </NavLink>
      </div>

      <div className="flex justify-between gap-5 items-center">
        <span aria-hidden="true" />
        <Link to="/login">
          <h3 className="font-medium text-[20px]">
            <span className="sr-only">Signed in as </span>
            Username
          </h3>
        </Link>

        <div className='flex justify-between text-warning cursor-pointer'>
          <LogOutIcon />
          <h3 className=''>Logout</h3>
        </div>
      </div>
    </nav>
  )
}

export default Nav
