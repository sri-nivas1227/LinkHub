import Link from "next/link";
import CategoryHeader from "./CategoryHeader";
import { motion } from "framer-motion";
import { Copy, Edit, LinkIcon, Sparkles, Trash } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Category, LinkType } from "@/app/types";
import { ROUTES, UI_CONFIG } from "@/config/constants";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  deleteURLAction,
  getAllLinksAction,
  getLinkOnSearchAction,
  getLinksFromCategoriesAction,
} from "@/app/actions";

interface Props {
  selectedCategoryId: string;
  categories: Category[];
  searchQuery: string;
}
export default function LinkList({
  selectedCategoryId,
  categories,
  searchQuery,
}: Props) {
  const [isLoadingLinks, setIsLoadingLinks] = useState(true);
  const [links, setLinks] = useState<LinkType[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const router = useRouter();
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
    const fetchLinks = async () => {
      setIsLoadingLinks(true);
      try {
        const responseData = searchQuery
          ? await getLinkOnSearchAction(searchQuery)
          : selectedCategoryId === "all"
            ? await getAllLinksAction()
            : await getLinksFromCategoriesAction(selectedCategoryId);

        const allLinks = Array.isArray(responseData?.data?.links)
          ? responseData.data.links
          : [];

        if (!responseData.success && searchQuery) {
          toast.error(responseData.message);
        }
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
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <CategoryHeader
          title={selectedCategoryName}
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
                    <p className="truncate text-xs text-zinc-400">{link.url}</p>
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
  );
}
