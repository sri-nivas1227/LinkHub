"use client";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface LinkType {
  _id: string;
  title: string;
  url: string;
  category: string | null;
  user_id: number;
}

function LinksList() {
  const { useSearchParams } = require("next/navigation");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [links, setLinks] = useState<LinkType[]>([]);
  const [title, setTitle] = useState<string | null>("");
  const categoryId = searchParams.get("category_id");

  useEffect(() => {
    if (!categoryId) return;
    const fetchLinks = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/urls/category?category_id=${categoryId}`
        );
        const data = await response.json();
        setLinks(data.data.links);
        setTitle(data.data.category);
      } catch (error) {
        console.error("Error fetching links for category:", error);
      }
    };
    fetchLinks();
  }, [categoryId]);

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
    <div className="w-4/5 h-full glass-card rounded-[4rem] p-2 text-center">
      <h2 className="font-bold cursor-pointer text-2xl">{title}</h2>
      <div>
        <ul className="mt-2 text-lg">
          {links.map((link) => (
            <li
              key={link._id}
              className="p-1 px-4 border bg-black/50 border-white/20 m-1 my-2 rounded-4xl"
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

export default function Page() {
  return (
    <Suspense>
      <LinksList />
    </Suspense>
  );
}
