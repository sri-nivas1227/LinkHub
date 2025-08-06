"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Link {
  id: string;
  title: string;
  url: string;
  category: string | null;
  user_id: number;
}
export default function Page() {
  const router = useRouter();
  const [links, setLinks] = useState<Link[]>([]);
  // fetch category id
  const categoryId = new URLSearchParams(window.location.search).get(
    "category_id"
  );
  if (!categoryId) {
    return (
      <div className="text-center">
        No category selected. Go to{" "}
        <span
          onClick={() => {
            router.push("/categories");
          }}
          className="underline text-blue-500"
        >
          categories
        </span>
      </div>
    );
  }
  // fetch links for the category
  const fetchLinks = async () => {
    if (!categoryId) return;

    try {
      const response = await fetch(
        `http://localhost:5000/urls/category?category_id=${categoryId}`
      );
      const data = await response.json();
      setLinks(data.data);
    } catch (error) {
      console.error("Error fetching links for category:", error);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, [categoryId]);
  if (links.length === 0) {
    return (
      <div className="text-center">
        No links found for this category. Go to{" "}
        <span
          onClick={() => {
            router.push("/categories");
          }}
          className="underline text-blue-500"
        >
          categories
        </span>
      </div>
    );
  }
  return (
    <div className="w-4/5 h-full m-auto p-3 bg-black/20 border border-b-0 border-white/20 rounded-4xl shadow-lg shadow-black/30 text-center">
      <h2 className="font-bold cursor-pointer text-2xl">title</h2>

      <div>
        <ul className="mt-2 text-lg">
          {links.map((link) => (
            <li
              key={link.id}
              className="p-1 px-4 border bg-gray-500/20 border-white/20 m-1 my-2 rounded-4xl"
            >
              <Link href={link.url} target="_blank">
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
