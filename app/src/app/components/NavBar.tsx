"use client";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const router = useRouter();
  return (
    <nav>
      <button onClick={() => router.back()}>Back</button>
      <button onClick={() => router.push("/home")}>DropLinks</button>
    </nav>
  );
}
