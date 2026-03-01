"use client";
import { useEffect } from "react";
import NavBar from "../components/NavBar";
import { pingServerAction } from "../actions";
import { useRouter } from "next/navigation";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  useEffect(() => {
    const pingServer = async () => {
      const response = await pingServerAction();
      console.log("Ping response:", response.success);
      if (!response.success) {
        console.log("User not authenticated. Redirecting to login.");
        router.push("/auth/login");
      }
    };
    pingServer();
  }, []);
  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="mx-auto w-full max-w-md px-4 pb-24 pt-6">
        {children}
      </main>
    </div>
  );
}
