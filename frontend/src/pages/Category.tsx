import { ArrowLeft, Search, SquarePen } from "lucide-react";
import { useState } from "react";
import AddProduct from "../components/overlays/AddProduct";

const Category = () => {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  return (
    <div className="mt-5 h-fit w-full">
      <div className="flex flex-col gap-10 mb-20">
        <ArrowLeft size={52} />
        <h1 className="font-bold text-[40px]">Bakery</h1>
      </div>

      <div className="flex justify-between">
        <h1 className="font-medium text-xl">Add or manage products</h1>
        <div className="flex justify-between gap-3">
          <div className="flex flex-col bg-secaccent rounded-xl px-3.5 py-2">
            <h1 className="text-accent text-xl">80</h1>
            <p className="text-textsecondary text-xs">product types</p>
          </div>

          <div className="flex flex-col bg-[#F3F4F6] rounded-xl px-3.5 py-2">
            <h1 className="text-textprimary text-xl">480</h1>
            <p className="text-textsecondary text-xs">total stocks</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 px-3 py-3 bg-containerbg rounded-xl border-stroke border mt-5 mb-10">
        <Search className="text-textsecondary" />
        <p className="text-textsecondary text-[16px] fhd:text-sm">
          search category
        </p>
      </div>

      <button
        className="bg-accent text-white font-medium text-xl rounded-[10px] px-10 py-4 my-12 cursor-pointer"
        onClick={() => setIsAddProductOpen(true)}
        type="button"
      >
        Add new product
      </button>

      {isAddProductOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setIsAddProductOpen(false)}
        >
          <div
            aria-modal="true"
            className="max-h-full max-w-full overflow-auto"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <AddProduct onClose={() => setIsAddProductOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex flex-col gap-11.5 mt-20">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-warning">Out of stock</p>
          <div className="grid grid-cols-6 gap-2">
            <div className="flex flex-col gap-4 bg-containerbg p-2 rounded-xl border border-stroke w-fit">
              <img src="" alt="" className="w-43.5 h-30" />
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-[16px]">Rp 5.800</p>
                <p className="text-[14px] text-textsecondary">
                  Roti tawar sari roti
                </p>
                <p className="text-xs text-warning">0 in stock</p>
              </div>

              <div className="bg-accent py-2 text-white rounded-md flex justify-center items-center gap-1">
                <SquarePen size={12} />
                <p className="text-sm ">Edit</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm text-alert">Almost out of stock</p>
          <div className="grid grid-cols-6">
            <div className="flex flex-col gap-4 bg-containerbg p-2 rounded-xl border border-stroke w-fit">
              <img src="" alt="" className="w-43.5 h-30" />
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-[16px]">Rp 5.800</p>
                <p className="text-[14px] text-textsecondary">
                  Roti tawar sari roti
                </p>
                <p className="text-xs text-warning">0 in stock</p>
              </div>

              <div className="bg-accent py-2 text-white rounded-md flex justify-center items-center gap-1">
                <SquarePen size={12} />
                <p className="text-sm ">Edit</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm text-primarygreen">in stock</p>
          <div className="grid grid-cols-6">
            <div className="flex flex-col gap-4 bg-containerbg p-2 rounded-xl border border-stroke w-fit">
              <img src="" alt="" className="w-43.5 h-30" />
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-[16px]">Rp 5.800</p>
                <p className="text-[14px] text-textsecondary">
                  Roti tawar sari roti
                </p>
                <p className="text-xs text-warning">0 in stock</p>
              </div>

              <div className="bg-accent py-2 text-white rounded-md flex justify-center items-center gap-1">
                <SquarePen size={12} />
                <p className="text-sm ">Edit</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
