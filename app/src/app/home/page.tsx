"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Copy, Link as LinkIcon, Plus, Sparkles } from "lucide-react";
import { checkTokenAction } from "../auth/actions";

interface Category {
  id: string;
  name: string;
}

interface LinkType {
  _id: string;
  title: string;
  url: string;
}
// Check for token in cookies before loading the home page
export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const [links, setLinks] = useState<LinkType[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingLinks, setIsLoadingLinks] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    checkTokenAction().then((isAuthenticated) => {
      if (!isAuthenticated) {
        window.location.href = "/auth/login";
      }
    });
  }, []);
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const response = await fetch(
          "http://localhost:5000/categories?user_id=17",
        );
        const data = await response.json();
        const nextCategories = Array.isArray(data?.data) ? data.data : [];
        setCategories(nextCategories);
        if (nextCategories.length > 0) {
          setSelectedCategoryId((current) => current ?? nextCategories[0].id);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (!selectedCategoryId) {
      setLinks([]);
      setIsLoadingLinks(false);
      console.log("returning");
      return;
    }

    const fetchLinks = async () => {
      setIsLoadingLinks(true);
      try {
        const response = await fetch(
          `http://localhost:5000/urls/category?category_id=${selectedCategoryId}`,
        );
        const data = await response.json();
        const nextLinks = Array.isArray(data?.data?.links)
          ? data.data.links
          : [];
        setLinks(nextLinks);
      } catch (error) {
        console.error("Error fetching links:", error);
        setLinks([]);
      } finally {
        setIsLoadingLinks(false);
      }
    };

    fetchLinks();
  }, [selectedCategoryId]);

  const selectedCategoryName = useMemo(() => {
    return categories.find((category) => category.id === selectedCategoryId)
      ?.name;
  }, [categories, selectedCategoryId]);

  const handleCopy = async (id: string, url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Your LinkHub</h1>
        <p className="text-sm text-zinc-400">
          Curate your best links and keep everything in one sleek feed.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-zinc-300">Collections</p>
          <span className="text-xs text-zinc-500">Swipe to explore</span>
        </div>
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
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

      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-300">Feed</p>
            <p className="text-xs text-zinc-500">
              {selectedCategoryName ?? "Pick a collection"}
            </p>
          </div>
          <Link
            href="/addLink"
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
