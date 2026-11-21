import { ArrowLeft } from 'lucide-react'

const AddCategory = () => {
    return (
        <div className='bg-containerbg rounded-3xl w-285.5'>
            <div className='flex gap-4 items-center px-10 py-6 border-b border-stroke'>
                <button aria-label="Close add product overlay" type="button">
                    <ArrowLeft size={52} />
                </button>
                <h1 className="font-medium text-[32px]">Add Category</h1>
            </div>

            <div className="mx-11.75 mt-10 flex flex-col gap-7.5 border-b border-stroke mb-10 pb-10">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <p className="">Name</p>
                        <input type="text" placeholder="Category name" className="border border-stroke rounded-xl py-3 px-2" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="">unit</p>
                        <input type="text" placeholder="e.g., kg, piece, liter. gr." className="border border-stroke rounded-xl py-3 px-2" />
                    </div>

                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-[16px]">Category Image</p>
                    <div className="flex justify-start px-5 py-2 border border-stroke rounded-xl">
                        <div className="flex justify-between gap-4 items-center">
                            <div className="bg-accent rounded-xl text-white py-2 px-6">
                                <p className="font-medium text-[16px]">Choose file</p>
                            </div>
                            <p className="text-[16px]">No file choosen</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="">Description</p>
                    <textarea name="" id="" placeholder="Category description......" className="border border-stroke rounded-xl py-3 px-2">

                    </textarea>
                </div>
            </div>

            <div className="flex justify-end px-11.75 pb-10">
                <button className="font-medium text-xl bg-accent rounded-xl px-8 py-4 text-white">
                    Add Category
                </button>
            </div>
        </div>


    )
}

export default AddCategory