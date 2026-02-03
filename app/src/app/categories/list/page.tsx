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
      <div>
        <p>No category selected.</p>
        <button onClick={() => router.push("/categories")}>
          Go to Categories
        </button>
      </div>
    );
  }

  if (links.length === 0) {
    return (
      <div>
        <p>No links found for this category.</p>
        <button onClick={() => router.push("/categories")}>
          Go to Categories
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {links.map((link) => (
          <li key={link._id}>
            <Link href={link.url} target="_blank">
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
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
