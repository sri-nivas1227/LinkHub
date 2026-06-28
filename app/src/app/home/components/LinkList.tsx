import Link from "next/link";
import { LinkType } from "@/app/types";
import { toast } from "sonner";
import LinkBox from "./LinkBox";
import { CircleAlert, Sparkles } from "lucide-react";

interface Props {
  links: LinkType[];
  isLoading: boolean;
  showPublic?: boolean;
  categoryName?: string | null;
  onDeleteLink: (link_id: string) => void;
}

export default function LinkList({
  links,
  isLoading,
  showPublic,
  categoryName,
  onDeleteLink,
}: Props) {
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
              toast.dismiss(t);
              onDeleteLink(link_id);
            }}
            className="px-3 py-1 text-xs bg-black text-white rounded hover:bg-zinc-800 dark:bg-white dark:text-black"
          >
            Yes
          </button>
        </div>
      </div>
    ));
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col lg:grid lg:grid-cols-2 2xl:grid-cols-3 gap-3">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div
                key={`link-skeleton-${index}`}
                className="shimmer h-20 rounded-2xl border border-zinc-800"
              />
            ))
          : links.map((link, index) => (
              <LinkBox
                key={link._id ?? index}
                link={link}
                category_name={categoryName ?? null}
                showDeleteConfirm={showConfirm}
                canDelete={!showPublic}
                canEdit={!showPublic}
              />
            ))}
      </div>

      {!isLoading && links.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/40 px-6 py-10 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 text-indigo-300">
            {showPublic ? (
              <CircleAlert className="w-full h-full" />
            ) : (
              <Sparkles size={20} />
            )}
          </div>
          <div>
            <p className="text-sm font-semibold">
              {showPublic ? "No Data Available" : "No links yet"}
            </p>
            <p className="text-xs text-zinc-500">
              {showPublic
                ? "This collection is empty or the search query did not match any links."
                : "Add the first link to light up this collection."}
            </p>
          </div>
          {!showPublic && (
            <Link
              href="/addLink"
              className="rounded-full border border-indigo-500/60 bg-indigo-500/15 px-4 py-2 text-xs font-semibold text-indigo-200"
            >
              Add your first link
            </Link>
          )}
        </div>
      )}
    </section>
  );
}
