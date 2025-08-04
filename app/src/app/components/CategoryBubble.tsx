"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function CategoryBubble({
  title,
}: //   showList,
{
  title: string;
  //   showList?: boolean;
}) {
  const [showList, setShowList] = useState(false);
  const router = useRouter();
  return (
    <div
      className={`p-6 bg-black/20 border border-white/20 ${
        showList ? "rounded-4xl" : "rounded-full"
      } shadow-lg shadow-black/30 text-center  m-2 `}
    >
      <h2
        onClick={() => setShowList(!showList)}
        className="font-bold cursor-pointer text-3xl hover:scale-105"
      >
        {title}
      </h2>
      {showList && (
        <>
          <ul className="mt-2 text-lg">
            <li className="p-1 px-4 border bg-gray-500/20 border-white/20 m-1 my-2 rounded-4xl">
              Link 1
            </li>
            <li className="p-1 px-4 border bg-gray-500/20 border-white/20 m-1 my-2 rounded-4xl">
              Link 2
            </li>
            <li className="p-1 px-4 border bg-gray-500/20 border-white/20 m-1 my-2 rounded-4xl">
              Link 3
            </li>
          </ul>
          <div
            onClick={() => router.push("/categories/list")}
            className="flex justify-center items-center text-lg "
          >
            <span className="underline">more..</span>
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
