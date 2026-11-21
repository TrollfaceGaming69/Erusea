import { ChevronDown, Search } from "lucide-react"

const EmployeeManagement = () => {
  return (
    <div className="mt-5 h-fit w-full">
      <div className="flex flex-col gap-2">
        <h1 className="font-medium text-xl">Employee Management</h1>
        <p className="text-textsecondary text-sm">Manage your staff roles and schedules.</p>
      </div>

      <div className="border border-stroke rounded-xl bg-containerbg flex justify-start px-5 py-5 gap-8 mt-5">
        <div className="flex justify-between items-center gap-2">
          <div className="h-2 w-2 bg-accent rounded-full"/>
          <p className="text-textsecondary text-sm font-medium">Total Employees</p>
          <p className="text-accent text-sm font-bold">1</p>
        </div>

        <div className="flex justify-between items-center gap-2">
          <div className="h-2 w-2 bg-primarygreen rounded-full"/>
          <p className="text-textsecondary text-sm font-medium">Active</p>
          <p className="text-primarygreen text-sm font-bold">1</p>
        </div>

        <div className="flex justify-between items-center gap-2">
          <div className="h-2 w-2 bg-alert rounded-full"/>
          <p className="text-textsecondary text-sm font-medium">On Leave</p>
          <p className="text-alert text-sm font-bold">1</p>
        </div>
      </div>

      <div className="flex flex-col p-6 border border-stroke rounded-xl bg-containerbg mt-5">
        <h1 className="text-xl font-medium">Employee List</h1>

        <div className="flex justify-between gap-6">
          <div className="flex gap-2 px-3 py-3 bg-containerbg rounded-xl border-stroke border mt-5 mb-10 grow items-center">
            <Search className="text-textsecondary" size={16}/>
            <p className="text-textsecondary text-[16px] fhd:text-sm">Search by name or email…</p>
          </div>
        
          <div className="flex gap-2 p-3 bg-containerbg rounded-xl border border-stroke mt-5 mb-10 items-center cursor-pointer">
              <p className="text-sm font-medium">All Roles</p>
              <ChevronDown size={16}/>
          </div>

          <button className="text-white bg-accent rounded-xl cursor-pointer px-6 py-3 mt-5 mb-10 transition-colors">
            + Add Employee
          </button>
        </div>

        <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="border-b border-gray-200 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    <th className="py-3 px-6">Employee</th>
                    <th className="py-3 px-6">Role</th>
                    <th className="py-3 px-6">Status</th>
                    <th className="py-3 px-6">Phone</th>
                    <th className="py-3 px-6">Join Date</th>
                    <th className="py-3 px-6">Action</th>
                </tr>
            </thead>

            <tbody className="divide-y divide-stroke text-sm text-gray-700">
                {/* Baris Karyawan 1 */}
                <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                            RH
                        </div>
                        <div>
                            <div className="font-medium text-gray-900">Supardi</div>
                            <div className="text-gray-400 text-xs">rina@ambashop.id</div>
                        </div>
                    </td>
                    <td className="py-4 px-6">
                        <span className="px-3 py-1 text-xs font-medium bg-secgreen text-primarygreen rounded-full">
                            Cashier
                        </span>
                    </td>
                    <td className="py-4 px-6">
                        <span className="px-3 py-1 text-xs font-medium bg-secgreen text-primarygreen rounded-full">
                            Active
                        </span>
                    </td>
                    <td className="py-4 px-6 text-gray-600">+62 811-2345-678</td>
                    <td className="py-4 px-6 text-gray-600">2022-03-15</td>
                    <td className="py-4 px-6">
                        <a href="#" className="text-blue-600 font-medium">Manage</a>
                    </td>
                </tr>

                <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                            BS
                        </div>
                        <div>
                            <div className="font-medium text-gray-900">Budi Santoso</div>
                            <div className="text-gray-400 text-xs">budi@ambashop.id</div>
                        </div>
                    </td>
                    <td className="py-4 px-6">
                        <span className="px-3 py-1 text-xs font-medium bg-secgreen text-primarygreen rounded-full">
                            Cashier
                        </span>
                    </td>
                    <td className="py-4 px-6">
                        <span className="px-3 py-1 text-xs font-medium bg-secgreen text-primarygreen rounded-full">
                            Active
                        </span>
                    </td>
                    <td className="py-4 px-6 text-gray-600">+62 812-3456-789</td>
                    <td className="py-4 px-6 text-gray-600">2023-01-10</td>
                    <td className="py-4 px-6">
                        <a href="#" className="text-blue-600 font-medium">Manage</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
      </div>
    </div>
  )
}

export default EmployeeManagement
