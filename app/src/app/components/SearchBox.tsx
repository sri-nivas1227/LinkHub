import { Plus, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface SearchBoxProps {
  setSearchQuery: (query: string) => void;
}
export default function SearchBox({
  setSearchQuery,
}: SearchBoxProps) {
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(searchInput.trim());
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [searchInput]);
  return (
    <div className="flex items-center gap-10">
      <div className="md:w-3/4 flex items-center px-2 outline-none border rounded-2xl border-zinc-700 focus-within:border-indigo-500 transition-colors">
        <input
          type="text"
          placeholder="Search..."
          className="outline-none w-full p-2"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <SearchIcon size={18} />
      </div>
      <Link
        href="/addLink"
        className="hidden md:flex items-center justify-center rounded-2xl p-2 border border-indigo-500/60 bg-indigo-500 text-white shadow-[0_20px_50px_-20px_rgba(99,102,241,0.9)] transition hover:brightness-110"
        aria-label="Add new link"
      >
        <Plus size={22} /> Add New Link
      </Link>
    </div>
  );
}
