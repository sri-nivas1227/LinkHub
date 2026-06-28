import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

interface Props {
  name: string;
  username: string;
  slug: string;
}

export default function PublicCollectionCard({ name, username, slug }: Props) {
  return (
    <Link
      href={`/share/${username}/${slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-sm text-zinc-300 transition hover:border-indigo-500/60 hover:bg-indigo-500/5 hover:text-indigo-200"
    >
      <span className="font-medium truncate">{name}</span>
      <SquareArrowOutUpRight size={14} className="shrink-0 opacity-60" />
    </Link>
  );
}
