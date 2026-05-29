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
      <div className="w-full md:w-3/4 flex items-center px-2 outline-none border rounded-2xl border-zinc-700 focus-within:border-indigo-500 transition-colors">
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
        className="hidden md:flex items-center justify-center rounded-2xl p-2 border bg-gray-50 font-semibold text-indigo-500 transition hover:bg-indigo-500 hover:border-indigo-500 hover:text-gray-50 hover:brightness-110"
        aria-label="Add new link"
      >
        <Plus size={22} className="font-semibold" /> Add New Link
      </Link>
    </div>
  );
}
