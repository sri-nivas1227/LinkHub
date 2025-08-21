"use client";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  return (
    <div className="w-4/5 min-h-[40%] flex flex-col justify-center glass-card rounded-[4rem] p-2 py-4 text-center">
      <div className="flex flex-col justify-center gap-3">
        <button
          onClick={() => {
            router.push("/categories");
          }}
          className="text-black m-auto text-xl p-2 px-8 font-bold bg-gradient-to-r shadow-md shadow-black/40 from-white to-[#b2b2b2] rounded-full"
        >
          My Links
        </button>
        <button
          onClick={() => {
            router.push("/addLink");
          }}
          className="text-black m-auto text-xl p-2 px-12 font-bold bg-gradient-to-r shadow-md shadow-black/40 from-white via-[#d2d2d2] to-[#b2b2b2] rounded-full"
        >
          Add New Link
        </button>
      </div>
      <div className=""></div>
    </div>
  );
}
