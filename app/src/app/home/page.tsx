"use client";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  return (
    <div>
      <button onClick={() => router.push("/categories")}>
        My Links
      </button>
      <button onClick={() => router.push("/addLink")}>
        Add New Link
      </button>
    </div>
  );
}
