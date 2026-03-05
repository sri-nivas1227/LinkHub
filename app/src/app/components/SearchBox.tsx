import { SearchIcon } from "lucide-react";
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
    <div className="flex items-center px-2 outline-none border rounded-2xl border-zinc-700 focus-within:border-indigo-500 transition-colors">
      <input
        type="text"
        placeholder="Search..."
        className="outline-none w-full p-2"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <SearchIcon size={18} />
    </div>
  );
}
