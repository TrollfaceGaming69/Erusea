import { useState, useRef, useEffect } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";

type AddProductProps = {
  onClose: () => void;
};

const categories = [
  { name: "Bakery", id: 1 },
  { name: "Dairy", id: 2 },
  { name: "Staples", id: 3 },
  { name: "Fruits", id: 4 },
  { name: "Frozen", id: 5 },
];

const AddProduct = ({ onClose }: AddProductProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-containerbg rounded-3xl w-[1142px]">
      <div className="flex gap-4 items-center px-10 py-6 border-b border-stroke">
        <button
          aria-label="Close add product overlay"
          onClick={onClose}
          type="button"
        >
          <ArrowLeft size={52} />
        </button>
        <h1 className="font-medium text-[32px]">Add Product</h1>
      </div>

      <div className="mx-11.75 mt-10 flex flex-col gap-7.5 border-b border-stroke mb-10 pb-10">
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-2">
            <p className="">Name</p>
            <input type="text" placeholder="Product name" className="border border-stroke rounded-xl py-3 px-2" />
          </div>

          <div className="flex flex-col gap-2 relative" ref={dropdownRef}>
            <p className="">Category</p>
            <div
              className="border border-stroke rounded-xl py-3 px-2 flex justify-between items-center cursor-pointer"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            >
              <p className={`text-[16px] ${selectedCategory ? "text-textprimary" : "text-textsecondary"}`}>
                {selectedCategory ?? "Select a category"}
              </p>
              <ChevronDown
                className={`transition-transform duration-200 ${isCategoryOpen ? "rotate-180" : ""}`}
              />
            </div>

            {isCategoryOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-containerbg border border-stroke rounded-xl shadow-lg z-10 overflow-hidden">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.name);
                      setIsCategoryOpen(false);
                    }}
                    className={`px-4 py-3 text-[16px] cursor-pointer hover:bg-secaccent transition-colors ${
                      selectedCategory === category.name
                        ? "bg-secaccent text-accent font-medium"
                        : ""
                    }`}
                  >
                    {category.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <p className="">Price</p>
            <input type="text" placeholder="Rp." className="border border-stroke rounded-xl py-3 px-2" />
          </div>

          <div className="flex flex-col gap-2">
            <p className="">Unit</p>
            <input type="text" placeholder="e.g., kg, piece, liter. gr." className="border border-stroke rounded-xl py-3 px-2" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[16px]">Product Image</p>
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
          <textarea name="" id="" placeholder="product description" className="border border-stroke rounded-xl py-3 px-2">

          </textarea>
        </div>
      </div>

      <div className="flex justify-end px-11.75 pb-10">
        <button className="font-medium text-xl bg-accent rounded-xl px-8 py-4 text-white">
          Add Product
        </button>
      </div>


    </div>
  );
};

export default AddProduct;
