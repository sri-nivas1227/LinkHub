import Link from "next/link";
import CollectionNavigationPanel from "./components/CollectionNavigationPanel";
import { Plus } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Your LinkHub</h1>
        <p className="text-sm text-zinc-400">
          Curate your best links and keep everything in one sleek feed.
        </p>
      </section>
      <CollectionNavigationPanel />

      <footer className="pt-4 text-center text-xs text-zinc-500">
        Built with LinkHub © 2026.
      </footer>

      <Link
        href="/addLink"
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full border border-indigo-500/60 bg-indigo-500 text-white shadow-[0_20px_50px_-20px_rgba(99,102,241,0.9)] transition hover:brightness-110 md:right-1/2 md:translate-x-[210px]"
        aria-label="Add new link"
      >
        <Plus size={22} />
      </Link>
    </div>
  );
}
