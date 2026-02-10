"use client";
import { useEffect, useState } from "react";
import CategoryDropdown from "../components/CategoryDropdown";
import NavBar from "../components/NavBar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getCategoriesAction, postAddURLAction } from "../actions";
import { ROUTES } from "@/config/constants";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message,setMessage] = useState<string|null> (null);


  const fetchCategories = async () => {
    try {
      const response = await getCategoriesAction();
      if(!response.success)
      {
        setError(response.message);
        return;
      }
      if (Array.isArray(response.data)) {
        setCategoryList(response.data);
      } else if (response && Array.isArray(response.data)) {
        setCategoryList(response.data);
      } else {
        console.error("Unexpected response format:", response);
        setCategoryList([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategoryList([]);
    }
  };

  const handleSubmit = async () => {
    if (!link || !title || (!category && !newCategory)) {
      setError("All Fields are required")
      return;
    }

    const newLink = {
      url: link,
      title,
      category_id: category,
      new_category: newCategory,
    };

    try {
      setIsSubmitting(true);
      setError(null)
      const response = await postAddURLAction(newLink);

      if (!response.success) {
        setError(response.message);
        return;
      }

      setLink("");
      setTitle("");
      setNewCategory("");
      setCategory(null);
      setMessage(response.message);
    } catch (error) {
      console.error("Error adding link:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="">
      <main className="mx-auto w-full max-w-md px-4 pb-24 pt-6">
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <Link href={ROUTES.HOME} className="flex items-center gap-1">
            <ArrowLeft size={14} />
            Back
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-6 rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-[0_12px_40px_-24px_rgba(0,0,0,0.6)]">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Add a new link
            </h2>
            <p className="text-sm text-zinc-400">
              Save it to the perfect collection in seconds.
            </p>
          </div>

          <label className="flex flex-col gap-2 text-sm text-zinc-300">
            URL
            <input
              type="text"
              name="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              id="link"
              placeholder="Paste your link here"
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-950/70 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-indigo-500/60"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-zinc-300">
            Title
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              id="title"
              placeholder="Choose a title"
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-950/70 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-indigo-500/60"
            />
          </label>

          <div className="flex flex-col gap-2">
            <span className="text-sm text-zinc-300">Category</span>
            <CategoryDropdown
              categoryList={categoryList}
              setCategoryList={setCategoryList}
              selectedCategory={category}
              setSelectedCategory={setCategory}
              newCategory={newCategory}
              setNewCategory={setNewCategory}
            />
          </div>
           {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}
          {message && (
            <div className="rounded-xl border border-green-500/40 bg-green-500/10 px-4 py-3 text-sm text-green-200">
              {message}
            </div>
          )}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="rounded-full border border-indigo-500/60 bg-indigo-500/20 px-4 py-3 text-sm font-semibold text-indigo-100 transition hover:bg-indigo-500/30 disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save link"}
          </button>
        </div>
      </main>
    </div>
  );
}
