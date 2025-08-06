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
      console.log("API response:", data); // Debug log

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
      console.log("Link added successfully:", data);
    } catch (error) {
      console.error("Error adding link:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  console.log(categoryList);
  console.log("filled values: ", { link, title, category, newCategory });
  return (
    <div className="w-full h-full flex justify-center items-center font-ibm-plex-mono">
      <div className="w-3/5 min-h-2/3 flex flex-col justify-center items-center bg-black/15 rounded-[5rem] overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100/30 p-2 text-center ">
        <div className="flex flex-col justify-center items-center gap-5">
          <input
            type="text"
            name="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            id="link"
            className="w-full p-2 border border-gray-300 rounded-3xl"
            placeholder="Paste your link here"
          />
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            className="w-full p-2 border border-gray-300 rounded-3xl"
            placeholder="Choose title..."
          />
          <CategoryDropdown
            categoryList={categoryList}
            setCategoryList={setCategoryList}
            selectedCategory={category}
            setSelectedCategory={setCategory}
            newCategory={newCategory}
            setNewCategory={setNewCategory}
          />

          <button
            onClick={handleSubmit}
            className="p-1 px-8 w-fit text-black font-semibold rounded-full border border-black/30 bg-gradient-to-r shadow-md shadow-black/40 from-white via-[#c2c2c2] to-[#929292]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
