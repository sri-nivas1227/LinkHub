"use client";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
export default function NavBar() {
  const router = useRouter();
  return (
    <nav className="flex justify-between font-ibm-plex-mono items-center p-4 text-white">
      <div onClick={() => router.back()} className="flex items-center">
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2 w-8 h-8" />
      </div>
      <div className="text-3xl font-semibold">DropLinks</div>
      <div className=""></div>
    </nav>
  );
}
