"use client";
import { useEffect } from "react";
import NavBar from "../components/NavBar";
import { pingServerAction } from "../actions";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/constants";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  useEffect(() => {
    const pingServer = async () => {
      const response = await pingServerAction();
      if (!response.success) {
        router.push(ROUTES.LOGIN);
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
