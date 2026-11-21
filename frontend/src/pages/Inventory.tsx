import { Search } from "lucide-react"
import { Link } from "react-router-dom"

const categories = [
    {name: "bakery", id: 1},
    {name: "dairy", id: 2},
    {name: "staples", id: 3},
    {name: "fruits", id: 4},
    {name: "frozen", id: 5},
];

const Inventory = () => {

  return (
    <div className="mt-10 h-fit w-full">
        <div className="flex justify-between">
            <h1 className="font-medium text-xl">Add or manage inventory</h1>

            <div className="flex justify-between gap-3">
                <div className="flex flex-col bg-secaccent rounded-xl px-3.5 py-2">
                    <h1 className="text-accent text-xl">5</h1>
                    <p className="text-textsecondary text-xs">categories</p>
                </div>

                <div className="flex flex-col bg-[#F3F4F6] rounded-xl px-3.5 py-2">
                    <h1 className="text-textprimary text-xl">80</h1>
                    <p className="text-textsecondary text-xs">product types</p>
                </div>
            </div>
        </div>

        <div className="flex gap-2 px-3 py-3 bg-containerbg rounded-xl border-stroke border mt-5 mb-10 items-center">
            <Search className="text-textsecondary" size={16}/>
            <p className="text-textsecondary text-[16px] fhd:text-sm">search category</p>
        </div>

        <p className="text-textsecondary text-[16px] fhd:text-sm">List of your categories</p>
        <div className="flex flex-col gap-4 my-2">

            {categories.map((category)=>(
                <Link
                    key={category.id}
                    to="/category"
                    aria-label={`Open ${category.name} category`}
                    className="bg-containerbg rounded-xl border border-stroke flex gap-10 px-6 py-4"
                >
                <div className="flex justify-between gap-2 items-center">
                    <img src="/frontend/public/sunday pf.png" alt="" className="w-14 h-14 border"/>
                    <p className="text-[16px]">{category.name}</p>
                </div>

                <div className="flex gap-6 border-l-2 border-stroke px-4 w-full">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-[18px]">8</h1>
                        <p className="text-xs text-textsecondary">Product types</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <h1 className="text-[18px]">74</h1>
                        <p className="text-xs text-textsecondary">Total inventory</p>
                    </div>
                </div>

                <span className="self-center py-2 px-6 text-sm text-white rounded-md bg-accent">
                    Edit
                </span>
            </Link>
            ))}
            
            <div className="flex justify-center bg-secaccent border-accent border-2 border-dashed py-5 rounded-xl">
                <p className="text-[16px] text-accent font-medium">Add new category +</p>
            </div>
        </div>
      
    </div>
  )
}

export default Inventory
