"use client";
import SearchBox from "@/app/components/SearchBox";
import LinkList from "./LinkList";
import { useEffect, useState } from "react";
import { Category } from "@/app/types";
import { getCategoriesAction } from "@/app/actions";
import { toast } from "sonner";

export default function CollectionNavigationPanel() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const response = await getCategoriesAction();
        const nextCategories = Array.isArray(response?.data)
          ? response.data
          : [];
        setCategories(nextCategories);
      } catch (error) {
        toast.error("Failed to load categories. Please try again.");
        setCategories([]);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);
  return (
    <div className="">
      <SearchBox setSearchQuery={setSearchQuery} />

      {!searchQuery && (
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-zinc-300">Collections</p>
            <span className="text-xs text-zinc-500">Swipe to explore</span>
          </div>
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
            {isLoadingCategories ? (
              <div className=""></div>
            ) : (
              <button
                onClick={() => setSelectedCategoryId("all")}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition ${
                  selectedCategoryId === "all"
                    ? "border-indigo-500 bg-indigo-500/15 text-indigo-200 shadow-[0_0_20px_rgba(99,102,241,0.25)]"
                    : "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                All Links
              </button>
            )}
            {isLoadingCategories
              ? Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={`category-skeleton-${index}`}
                    className="shimmer h-9 w-24 rounded-full border border-zinc-800"
                  />
                ))
              : categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategoryId(category.id)}
                    className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition ${
                      selectedCategoryId === category.id
                        ? "border-indigo-500 bg-indigo-500/15 text-indigo-200 shadow-[0_0_20px_rgba(99,102,241,0.25)]"
                        : "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
          </div>
        </section>
      )}

      <LinkList
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        searchQuery={searchQuery}
      />
    </div>
  );
}
