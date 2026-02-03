"use client";
import { useState } from "react";

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
    <div>
      {!isAdding ? (
        <div>
          <button onClick={() => setIsOpen(!isOpen)}>
            {selected ? selected : "Select Category"}
          </button>
          {isOpen && (
            <div>
              <button
                onClick={() => {
                  setIsAdding(true);
                  setIsOpen(false);
                }}
              >
                Add New
              </button>
              <div>
                {categoryList.length > 0 ? (
                  categoryList.map((category) => (
                    <button
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setSelected(category.name);
                        setIsOpen(false);
                      }}
                      key={category.id}
                    >
                      {category.name}
                    </button>
                  ))
                ) : (
                  <p>No categories</p>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter new category"
          />
          <button onClick={handleAdd}>Add</button>
          <button onClick={handleCancel} type="button">
            Cancel
          </button>
        </div>
      )}
      {selected && <p>Selected: {selected}</p>}
    </div>
  );
}
