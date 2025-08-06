"use client";
import { useEffect, useState } from "react";
import CategoryBubble from "../components/CategoryBubble";
interface Category {
  id: string;
  name: string;
}
export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/categories?user_id=17"
        );
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  if (categories && categories.length === 0) {
    return <div className="text-center">No categories available</div>;
  }
  return (
    <div className="w-full">
      <div className="w-4/5 m-auto flex flex-col gap-2">
        {categories.map((category) => (
          <CategoryBubble
            key={category.id}
            id={category.id}
            title={category.name}
          />
        ))}
      </div>
    </div>
  );
}
