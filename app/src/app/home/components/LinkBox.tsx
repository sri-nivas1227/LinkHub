import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Copy, Edit, Trash } from "lucide-react";
import { toast } from "sonner";
import { ROUTES } from "@/config/constants";
import { useRouter } from "next/navigation";
import { deleteURLAction } from "@/app/actions";
interface LinkBoxProps {
  link: {
    _id: string;
    url: string;
    title: string;
    category_id: string;
  };
  category_name: string | null;
  showDeleteConfirm: (link_id: string) => void;
  canDelete?: boolean;
  canEdit?: boolean;
}
const LinkBox = ({
  link,
  category_name,
  showDeleteConfirm,
  canDelete,
  canEdit,
}: LinkBoxProps) => {
  const router = useRouter();

  const handleCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link Copied to Clipboard!");
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };
  const handleEditLink = (link_id: string) => {
    router.push(`${ROUTES.ADD_LINK}?linkId=${link_id}`);
  };

  return (
    <motion.div
      key={link._id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 shadow-[0_8px_30px_-20px_rgba(0,0,0,0.6)] transition hover:-translate-y-0.5 hover:border-indigo-500/40 hover:shadow-[0_12px_40px_-20px_rgba(99,102,241,0.45)] active:scale-95"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center">
          <Link
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="block text-sm font-semibold tracking-tight text-zinc-100"
          >
            <Image
              src={`https://www.google.com/s2/favicons?domain=${link.url}&sz=64`}
              alt="favicon"
              width={24}
              height={24}
              className="h-8 w-8"
            />
          </Link>
        </div>
        <div className="min-w-0 flex-1">
          <Link
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="block text-sm font-semibold tracking-tight text-zinc-100"
          >
            {link.title}
          </Link>
          <p className="">
            <Link
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="block truncate text-xs text-zinc-400 font-semibold tracking-tight"
            >
              {link.url}
            </Link>
          </p>
        </div>
        {canEdit && (
          <button
            onClick={() => handleEditLink(link._id)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 text-zinc-300 transition hover:text-indigo-200"
          >
            <Edit size={16} />
          </button>
        )}
        {canDelete && (
          <button
            onClick={async () => showDeleteConfirm(link._id)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 text-zinc-300 transition hover:text-red-400"
          >
            <Trash size={16} />
          </button>
        )}
        <button
          onClick={() => handleCopy(link.url)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 text-zinc-300 transition hover:text-indigo-200"
          aria-label="Quick copy"
        >
          <Copy size={16} />
        </button>
      </div>
      {category_name && (
        <p className="text-xs text-zinc-400 mt-2">
          Collection Name: {category_name}
        </p>
      )}
    </motion.div>
  );
};

export default LinkBox;
