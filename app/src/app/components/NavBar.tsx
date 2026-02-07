"use client";
import Link from "next/link";
import { Search, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { extractTokenAction, logoutAction } from "../actions";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const [profileClicked, setProfileClicked] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>("");
  const router = useRouter();

  const getUsername = async () => {
    const response = await extractTokenAction();
    if (response && typeof response === "object") {
      return (
        (response as any).username ?? (response as any).name ?? "Hello User!"
      );
    }
    return "Hello User!";
  };
  const handleLogout = async () => {
    await logoutAction();
    router.push("/auth/login");
  };
  useEffect(() => {
    getUsername().then((value) => setUsername(value));
  }, []);
  return (
    <nav className="sticky top-0 z-20 border-b border-zinc-800 bg-zinc-900/60 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-md items-center justify-between px-4 py-3">
        <Link
          href="/home"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 text-sm font-semibold tracking-tight"
        >
          LH
        </Link>
        <div className="flex items-center gap-2">
          <button
            aria-label="Search"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950/60 text-zinc-300 transition hover:text-zinc-100"
          >
            <Search size={18} />
          </button>
          <div className="relative">
            <button
              aria-label="User profile"
              onClick={() => setProfileClicked((prev) => !prev)}
              className="cursor-pointer inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950/60 text-zinc-300 transition hover:text-zinc-100"
            >
              <UserRound size={18} />
            </button>
            {profileClicked ? (
              <div className="absolute top-10 left-5 flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 shadow-[0_8px_30px_-20px_rgba(0,0,0,0.6)] transition  hover:shadow-[0_12px_40px_-20px_rgba(99,102,241,0.45)] active:scale-95">
                <span className="font-semibold text-zinc-200 text-center border-b border-white whitespace-nowrap">
                  {username}
                </span>
                <span className="font-light hover:text-zinc-300 cursor-pointer text-zinc-400 text-center ">
                  Profile
                </span>
                <span
                  onClick={handleLogout}
                  className="font-light hover:text-zinc-300 cursor-pointer text-zinc-400 text-center"
                >
                  Logout
                </span>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
