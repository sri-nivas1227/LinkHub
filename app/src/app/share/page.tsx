"use client";
import { useEffect, useState } from "react";
import SearchBox from "../components/SearchBox";
import { Copy, LinkIcon, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { getLinksFromPublicCategory } from "../actions";
import { UI_CONFIG } from "@/config/constants";

interface LinkType {
  _id: string;
  title: string;
  url: string;
  visits: number;
  category_id: string;
  updated_id: string;
  tags: string[];
}

export default function Share() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoadingLinks, setIsLoadingLinks] = useState(true);
  const [links, setLinks] = useState<LinkType[]>([]);
  const [category, setCategory] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const urlParams = useSearchParams();
  const categoryId = urlParams.get("categoryId");
  useEffect(() => {
    console.log("fetching urls")
    const fetchLinks = async () => {
      setIsLoadingLinks(true);
      try {
        let responsedata;
        responsedata = await getLinksFromPublicCategory(categoryId!);
        console.log(responsedata)
        const allLinks = Array.isArray(responsedata?.data?.links)
          ? responsedata.data.links
          : [];
        const category = responsedata.data.category ?? "";
        console.log(allLinks, category)
        setCategory(category);
        setLinks(allLinks);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load links. Please try again.");
        setLinks([]);
      } finally {
        setIsLoadingLinks(false);
      }
    };
    if (!categoryId) {
      return;
    }
    fetchLinks();
  }, [categoryId]);
  const handleCopy = async (id: string, url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), UI_CONFIG.COPY_NOTIFICATION_TIMEOUT);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };
  console.log(links)
  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">{category}</h1>
        {/* <p className="text-sm text-zinc-400">
          Curate your best links and keep everything in one sleek feed.
        </p> */}
      </section>
      <SearchBox setSearchQuery={setSearchQuery} />

      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          {isLoadingLinks
            ? Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={`link-skeleton-${index}`}
                  className="shimmer h-20 rounded-2xl border border-zinc-800"
                />
              ))
            : links.map((link,index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 shadow-[0_8px_30px_-20px_rgba(0,0,0,0.6)] transition hover:-translate-y-0.5 hover:border-indigo-500/40 hover:shadow-[0_12px_40px_-20px_rgba(99,102,241,0.45)] active:scale-95"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 text-indigo-300">
                      <LinkIcon size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="block text-sm font-semibold tracking-tight text-zinc-100"
                      >
                        {link.title}
                      </a>
                      <p className="truncate text-xs text-zinc-400">
                        {link.url}
                      </p>
                    </div>
                    {/* <button
                      onClick={() => handleEditLink(link._id)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 text-zinc-300 transition hover:text-indigo-200"
                    >
                      <Edit size={16} />
                    </button> */}
                    {/* <button
                      onClick={async () => showConfirm(link._id)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 text-zinc-300 transition hover:text-red-400"
                    >
                      <Trash size={16} />
                    </button> */}
                    <button
                      onClick={() => handleCopy(link._id, link.url)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 text-zinc-300 transition hover:text-indigo-200"
                      aria-label="Quick copy"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                  {copiedId === link._id && (
                    <p className="mt-3 text-xs text-emerald-300">Copied!</p>
                  )}
                </motion.div>
              ))}
        </div>

        {!isLoadingLinks && links.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/40 px-6 py-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 text-indigo-300">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold">No links yet</p>
              {/* <p className="text-xs text-zinc-500">
                Add the first link to light up this collection.
              </p> */}
            </div>
            {/* <Link
              href="/addLink"
              className="rounded-full border border-indigo-500/60 bg-indigo-500/15 px-4 py-2 text-xs font-semibold text-indigo-200"
            >
              Add your first link
            </Link> */}
          </div>
        )}
      </section>

      <footer className="pt-4 text-center text-xs text-zinc-500">
        Built with LinkHub © 2026.
      </footer>
    </div>
  );
}
