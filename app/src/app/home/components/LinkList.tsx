import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Category, LinkType } from "@/app/types";

import { toast } from "sonner";

import {
  deleteURLAction,
  getAllLinksAction,
  getLinkOnSearchAction,
  getLinksFromCategoriesAction,
} from "@/app/actions";
import LinkBox from "./LinkBox";
import { Sparkles } from "lucide-react";

interface Props {
  selectedCategory: {
    selectedCategoryId: string;
    selectedCategoryName: string | null;
  };
  searchQuery: string;
}
export default function LinkList({ selectedCategory, searchQuery }: Props) {
  const [isLoadingLinks, setIsLoadingLinks] = useState(true);
  const [links, setLinks] = useState<LinkType[]>([]);
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
          : selectedCategory.selectedCategoryId === "all"
            ? await getAllLinksAction()
            : await getLinksFromCategoriesAction(
                selectedCategory.selectedCategoryId,
              );

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
  }, [selectedCategory.selectedCategoryId, searchQuery]);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col lg:grid lg:grid-cols-2 2xl:grid-cols-3 gap-3">
        {isLoadingLinks
          ? Array.from({ length: 3 }).map((_, index) => (
              <div
                key={`link-skeleton-${index}`}
                className="shimmer h-20 rounded-2xl border border-zinc-800"
              />
            ))
          : links.map((link) => (
              <LinkBox
                key={link._id}
                link={link}
                category_name={
                  searchQuery || selectedCategory.selectedCategoryId == "all"
                    ? selectedCategory.selectedCategoryName || null
                    : null
                }
                showDeleteConfirm={showConfirm}
              />
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
