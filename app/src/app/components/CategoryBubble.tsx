"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface TopLink {
  id: string;
  title: string;
  url: string;
}

export default function CategoryBubble({
  title,
  id,
}: {
  title: string;
  id: string;
}) {
  const [showList, setShowList] = useState(false);
  const [topLinks, setTopLinks] = useState<TopLink[]>([]);
  const router = useRouter();
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/urls/category/top/${id}?user_id=17`
        );
        const data = await response.json();
        setTopLinks(data.data);
      } catch (error) {
        console.error("Error fetching links for category:", error);
      }
    };
    if (showList) {
      fetchLinks();
    }
  }, [showList]);
  if (topLinks && topLinks.length === 0 && showList) {
    return (
      <div className="text-center">No links available in this category</div>
    );
  }
  return (
    <div
      className={`p-2 bg-black/50 border border-white/20 ${
        showList ? "rounded-4xl" : "rounded-full"
      } shadow-lg shadow-black/30 text-center m-1 `}
    >
      <h2
        onClick={() => setShowList(!showList)}
        className={`font-bold cursor-pointer ${
          showList ? "text-3xl" : "text-xl"
        } hover:scale-105`}
      >
        {title}
      </h2>
      {showList && (
        <>
          <ul className="mt-2 text-lg">
            {topLinks.map((link, index) => (
              <li
                key={index}
                className="p-1 px-4 text-base border bg-gray-500/20 border-white/20 m-1 my-2 rounded-4xl"
              >
                <Link href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
          <div
            onClick={() => router.push(`/categories/list?category_id=${id}`)}
            className="w-fit m-auto flex justify-center items-center text-lg cursor-pointer "
          >
            <span className="hover:underline hover:scale-105">more..</span>
            <Image
              src="/right.png"
              alt="arrow right"
              width={16}
              height={16}
              className="invert"
            />
          </div>
        </>
      )}
    </div>
  );
}
