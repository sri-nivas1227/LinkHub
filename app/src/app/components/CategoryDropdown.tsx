"use client";
import { ChangeEvent, useState } from "react";
import { ChevronDown, Plus } from "lucide-react";
import { toast } from "sonner";

interface Category {
  id: string | null;
  name: string;
}

export default function CategoryDropdown({
  setIsAdding,
  selectedCategory,
  setSelectedCategory,
}: {
  setIsAdding: (isAdding: boolean) => void;
  selectedCategory: string | null;
  setSelectedCategory: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  const [selected, setSelected] = useState(selectedCategory);

  const handleAddNewCategory = () => {
    if (!selectedCategory!.trim()) {
      toast.error("New category cannot be empty");
      return;
    }
    setSelected(selectedCategory);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setSelectedCategory({
      target: {
        value: "",
      },
    } as ChangeEvent<HTMLInputElement>);
    setSelected((prev) => prev || "");
  };
  

  return (
    <div className="relative w-full">
      <div className="flex flex-col gap-2">
        <input
          value={selectedCategory || ""}
          onChange={(e) => {
            setSelectedCategory(e);
          }}
          name="new_category"
          placeholder="Enter new category"
          className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-indigo-500/60"
        />
        <div className="flex gap-2">
          <button
            onClick={() => setIsAdding(false)}
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
      {selected && (
        <p className="mt-2 text-xs text-zinc-500">Selected: {selected}</p>
      )}
    </div>
  );
}
