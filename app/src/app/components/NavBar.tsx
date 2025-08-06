"use client";
import { useRouter } from "next/navigation";
import { ChevronRight2 } from "@deemlol/next-icons";
export default function NavBar() {
  const router = useRouter();
  return (
    <nav className="flex justify-between font-ibm-plex-mono items-center p-4 text-white">
      <div
        onClick={() => router.back()}
        className="flex items-center cursor-pointer"
      >
        <ChevronRight2 className="mr-2 w-8 h-8" />
      </div>
      <div
        onClick={() => router.push("/home")}
        className="text-3xl font-semibold cursor-pointer"
      >
        DropLinks
      </div>
      <div className=""></div>
    </nav>
  );
}
