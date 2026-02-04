"use client";
import Link from "next/link";
import { Search, UserRound } from "lucide-react";

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-20 border-b border-zinc-800 bg-zinc-900/60 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-md items-center justify-between px-4 py-3">
        <Link
          href="/home"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 text-sm font-semibold tracking-tight"
        >
          LH
        </Link>
        <div className="flex items-center gap-2">
          <button
            aria-label="Search"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950/60 text-zinc-300 transition hover:text-zinc-100"
          >
            <Search size={18} />
          </button>
          <button
            aria-label="User profile"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950/60 text-zinc-300 transition hover:text-zinc-100"
          >
            <UserRound size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
}
