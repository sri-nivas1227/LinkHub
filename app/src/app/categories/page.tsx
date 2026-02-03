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
    return <div>No categories available</div>;
  }
  return (
    <div>
      <h2>Categories</h2>
      {categories.map((category) => (
        <CategoryBubble
          key={category.id}
          id={category.id}
          title={category.name}
        />
      ))}
    </div>
  );
}
