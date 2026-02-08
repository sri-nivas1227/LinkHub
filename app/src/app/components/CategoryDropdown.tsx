"use client";
import { useState } from "react";
import { ChevronDown, Plus } from "lucide-react";

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
  const [selected, setSelected] = useState(selectedCategory);
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
    <div className="relative w-full">
      {!isAdding ? (
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex w-full items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-left text-sm text-zinc-300 transition hover:text-zinc-100"
          >
            <span>{selected ? selected : "Select Category"}</span>
            <ChevronDown size={16} />
          </button>
          {isOpen && (
            <div className="absolute top-[3.2rem] z-10 w-full rounded-2xl border border-zinc-800 bg-zinc-900/90 p-2 shadow-lg">
              <button
                onClick={() => {
                  setIsAdding(true);
                  setIsOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs text-indigo-200 transition hover:bg-indigo-500/10"
              >
                <Plus size={14} />
                Add new category
              </button>
              <div className="mt-2 max-h-40 overflow-auto pr-1">
                {categoryList.length > 0 ? (
                  categoryList.map((category) => (
                    <button
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setSelected(category.name);
                        setIsOpen(false);
                      }}
                      key={category.id}
                      className="w-full rounded-xl px-3 py-2 text-left text-xs text-zinc-300 transition hover:bg-zinc-800/60"
                    >
                      {category.name}
                    </button>
                  ))
                ) : (
                  <p className="px-3 py-2 text-xs text-zinc-500">
                    No categories
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter new category"
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-indigo-500/60"
          />
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className="flex-1 rounded-full border border-indigo-500/60 bg-indigo-500/20 px-4 py-2 text-xs font-semibold text-indigo-200"
            >
              Add
            </button>
            <button
              onClick={handleCancel}
              type="button"
              className="flex-1 rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-xs font-semibold text-zinc-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {selected && (
        <p className="mt-2 text-xs text-zinc-500">Selected: {selected}</p>
      )}
    </div>
  );
}
