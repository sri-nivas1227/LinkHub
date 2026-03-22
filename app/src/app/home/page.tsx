"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Copy,
  Link as LinkIcon,
  Plus,
  Sparkles,
  Edit,
  Trash,
} from "lucide-react";
import {
  deleteURLAction,
  getAllLinksAction,
  getCategoriesAction,
  getLinkOnSearchAction,
  getLinksFromCategoriesAction,
} from "../actions";
import { ROUTES, UI_CONFIG } from "@/config/constants";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import SearchBox from "../components/SearchBox";
import CategoryHeader from "./components/CategoryHeader";

interface Category {
  id: string;
  name: string;
  is_public: boolean;
}

interface LinkType {
  _id: string;
  title: string;
  url: string;
  visits: number;
  category_id: string;
  updated_id: string;
  tags: string[];
}
// Check for token in cookies before loading the home page
export default function Home() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");
  const [links, setLinks] = useState<LinkType[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingLinks, setIsLoadingLinks] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const response = await getCategoriesAction();
        const nextCategories = Array.isArray(response?.data)
          ? response.data
          : [];
        setCategories(nextCategories);
      } catch (error) {
        toast.error("Failed to load categories. Please try again.");
        setCategories([]);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchLinks = async () => {
      setIsLoadingLinks(true);
      try {
        let responsedata;
        if (selectedCategoryId === "all") {
          responsedata = await getAllLinksAction();
        } else {
          responsedata = await getLinksFromCategoriesAction(selectedCategoryId);
        }
        const allLinks = Array.isArray(responsedata?.data?.links)
          ? responsedata.data.links
          : [];
        setLinks(allLinks);
      } catch (error) {
        toast.error("Failed to load links. Please try again.");
        setLinks([]);
      } finally {
        setIsLoadingLinks(false);
      }
    };

    fetchLinks();
  }, [selectedCategoryId, searchQuery]);

  const selectedCategoryName = useMemo(() => {
    return categories.find((category) => category.id === selectedCategoryId)
      ?.name;
  }, [categories, selectedCategoryId]);

  const handleCopy = async (id: string, url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), UI_CONFIG.COPY_NOTIFICATION_TIMEOUT);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };
  const handleEditLink = (link_id: string) => {
    router.push(`${ROUTES.ADD_LINK}?linkId=${link_id}`);
  };

  const handleDeleteLink = async (link_id: string) => {
    const response = await deleteURLAction(link_id);
    if (response.success) {
      setLinks((prev) => prev.filter((item) => item._id != link_id));
      toast.success("Link Deleted");
    } else {
      toast.warning("Deletion Failed");
    }
  };
  const showConfirm = (link_id: string) => {
    toast.custom((t) => (
      <div className="w-md border-red-500 bg-white p-4 rounded-lg shadow-lg border flex flex-col gap-3 dark:bg-zinc-900">
        <p className="text-md text-center font-medium">
          Are you sure you want to proceed?
        </p>
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => {
              toast.dismiss(t);
            }}
            className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded dark:bg-zinc-800 dark:hover:bg-zinc-700"
          >
            No
          </button>
          <button
            onClick={() => {
              // Your logic here
              toast.dismiss(t);
              handleDeleteLink(link_id);
            }}
            className="px-3 py-1 text-xs bg-black text-white rounded hover:bg-zinc-800 dark:bg-white dark:text-black"
          >
            Yes
          </button>
        </div>
      </div>
    ));
  };
  useEffect(() => {
    if (!searchQuery) return;
    const fetchResultsForQuery = async () => {
      const response = await getLinkOnSearchAction(searchQuery);
      if (!response.success) {
        toast.error(response.message);
      }
      const allLinks = response.data.links;
      setLinks(allLinks);
    };
    fetchResultsForQuery();
  }, [searchQuery]);

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Your LinkHub</h1>
        <p className="text-sm text-zinc-400">
          Curate your best links and keep everything in one sleek feed.
        </p>
      </section>
      <SearchBox setSearchQuery={setSearchQuery} />

      {!searchQuery && (
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-zinc-300">Collections</p>
            <span className="text-xs text-zinc-500">Swipe to explore</span>
          </div>
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
            {isLoadingCategories ? (
              <div className=""></div>
            ) : (
              <button
                onClick={() => setSelectedCategoryId("all")}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition ${
                  selectedCategoryId === "all"
                    ? "border-indigo-500 bg-indigo-500/15 text-indigo-200 shadow-[0_0_20px_rgba(99,102,241,0.25)]"
                    : "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                All Links
              </button>
            )}

            {isLoadingCategories
              ? Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={`category-skeleton-${index}`}
                    className="shimmer h-9 w-24 rounded-full border border-zinc-800"
                  />
                ))
              : categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategoryId(category.id)}
                    className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition ${
                      selectedCategoryId === category.id
                        ? "border-indigo-500 bg-indigo-500/15 text-indigo-200 shadow-[0_0_20px_rgba(99,102,241,0.25)]"
                        : "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
          </div>
        </section>
      )}

      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          {/* <div>
            <p className="text-sm font-medium text-zinc-300">
              {searchQuery
                ? `Results for: ${searchQuery}`
                : (selectedCategoryName ?? "All Links")}
            </p>
          </div> */}
          <CategoryHeader
            title={selectedCategoryName}
            isPublic={
              categories.find((category) => category.id === selectedCategoryId)
                ?.is_public
            }
            categoryId={selectedCategoryId}
          />
          <Link
            href={ROUTES.ADD_LINK}
            className="text-xs font-medium text-indigo-300 transition hover:text-indigo-200"
          >
            Add link
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {isLoadingLinks
            ? Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={`link-skeleton-${index}`}
                  className="shimmer h-20 rounded-2xl border border-zinc-800"
                />
              ))
            : links.map((link) => (
                <motion.div
                  key={link._id}
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
                    <button
                      onClick={() => handleEditLink(link._id)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 text-zinc-300 transition hover:text-indigo-200"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={async () => showConfirm(link._id)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 text-zinc-300 transition hover:text-red-400"
                    >
                      <Trash size={16} />
                    </button>
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
                  {(searchQuery || selectedCategoryId == "all") && (
                    <p className="text-xs text-zinc-400 mt-2">
                      Collection Name:{" "}
                      {categories.find((cat) => cat.id === link.category_id)
                        ?.name || "Uncategorized"}
                    </p>
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
              <p className="text-xs text-zinc-500">
                Add the first link to light up this collection.
              </p>
            </div>
            <Link
              href="/addLink"
              className="rounded-full border border-indigo-500/60 bg-indigo-500/15 px-4 py-2 text-xs font-semibold text-indigo-200"
            >
              Add your first link
            </Link>
          </div>
        )}
      </section>

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
