"use client";
import { useEffect, useState } from "react";
import CategoryDropdown from "../components/CategoryDropdown";

interface Category {
  id: string | null;
  name: string;
}

export default function AddLinkPage() {
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState("");
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/categories?user_id=17"
      );
      const data = await response.json();

      // Handle different response formats
      if (Array.isArray(data)) {
        setCategoryList(data);
      } else if (data && Array.isArray(data.data)) {
        setCategoryList(data.data);
      } else {
        console.error("Unexpected response format:", data);
        setCategoryList([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategoryList([]); // Set empty array on error
    }
  };

  const handleSubmit = async () => {
    if (!link || !title || (!category && !newCategory)) {
      console.error("All fields are required");
      return;
    }

    const newLink = {
      url: link,
      title,
      category,
      user_id: 17,
      new_category: newCategory,
    };

    try {
      const response = await fetch("http://localhost:5000/urls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLink),
      });

      if (!response.ok) {
        throw new Error("Failed to add link");
      }

      const data = await response.json();
    } catch (error) {
      console.error("Error adding link:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div>
      <h2>Add New Link</h2>
      <div>
        <label>URL:</label>
        <input
          type="text"
          name="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          id="link"
          placeholder="Paste your link here"
        />
      </div>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="title"
          placeholder="Choose title..."
        />
      </div>
      <div>
        <label>Category:</label>
        <CategoryDropdown
          categoryList={categoryList}
          setCategoryList={setCategoryList}
          selectedCategory={category}
          setSelectedCategory={setCategory}
          newCategory={newCategory}
          setNewCategory={setNewCategory}
        />
      </div>
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
}
