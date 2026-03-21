"use client";
import { useEffect } from "react";
import NavBar from "../components/NavBar";
import { pingServerAction } from "../actions";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/constants";

export default function ShareLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="mx-auto w-full max-w-md px-4 pb-24 pt-6">
        {children}
      </main>
    </div>
  );
}
