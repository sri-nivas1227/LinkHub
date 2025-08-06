"use client";
import { useEffect, useState } from "react";
import { ChevronDown, Plus } from "@deemlol/next-icons";

interface Category {
  id: string | null;
  name: string;
}

export default function CategoryDropdown({
  categoryList,
  setCategoryList,
  selectedCategory,
  setSelectedCategory,
  newCategory,
  setNewCategory,
}: {
  categoryList: Category[];
  setCategoryList: (categories: Category[]) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  newCategory: string;
  setNewCategory: (category: string) => void;
}) {
  const [selected, setSelected] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleAdd = () => {
    if (!newCategory.trim()) {
      console.error("New category cannot be empty");
      return;
    }
    setSelected(newCategory);
    setSelectedCategory(null);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setSelected("");
  };

  return (
    <div className="flex flex-col bg-transparent gap-2 w-64">
      {!isAdding ? (
        <div className="relative">
          <p
            onClick={() => setIsOpen(!isOpen)}
            className="w-full p-2 border border-gray-300 rounded-3xl flex justify-around cursor-pointer"
          >
            {selected ? selected : "Select Category"}{" "}
            <ChevronDown size={24} color="#FFFFFF" />
          </p>
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } w-full border rounded-3xl absolute top-full left-0 shadow-lg z-10  bg-white text-black text-lg font-semibold`}
          >
            <p
              onClick={() => {
                setIsAdding(true);
                setIsOpen(false);
              }}
              className=" flex items-center justify-between px-4 py-1 cursor-pointer bg-black/50 rounded-t-3xl"
            >
              Add New
              <Plus />
            </p>
            <div className="h-[15vh] flex flex-col gap-2 divide-black divide-y- overflow-y-auto">
              {categoryList.length > 0 ? (
                categoryList.map((category) => (
                  <p
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setSelected(category.name);
                      setIsOpen(false);
                    }}
                    key={category.id}
                    className=""
                  >
                    {category.name}
                  </p>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter new option"
            className="flex-1 p-2 border rounded"
          />
          <div className="flex gap-2 justify-center">
            <button
              onClick={handleAdd}
              className="px-3 py-2 bg-blue-600 text-white rounded"
            >
              Add
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-2 bg-red-600/80 text-white rounded"
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className="flex justify-center">
        {selected && (
          <p className="px-2 text-sm text-gray-800 font-semibold rounded-3xl bg-yellow-300/70">
            Selected: {selected}
          </p>
        )}
      </div>
    </div>
  );
}
