"use client";
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
    return <div>No links available in this category</div>;
  }
  return (
    <div>
      <h2 onClick={() => setShowList(!showList)}>{title}</h2>
      {showList && (
        <>
          <ul>
            {topLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
          <button onClick={() => router.push(`/categories/list?category_id=${id}`)}>
            View more
          </button>
        </>
      )}
    </div>
  );
}
