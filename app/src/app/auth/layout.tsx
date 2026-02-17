"use client";
import { useEffect } from "react";
import { checkTokenAction } from "../actions";
import { ROUTES } from "@/config/constants";
import { Toaster } from "sonner";
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    checkTokenAction().then((isAuthenticated) => {
      if (isAuthenticated) {
        window.location.href = ROUTES.HOME;
      }
    });
  }, []);
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0B0F1A]">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-24 right-16 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-[110px]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl rounded-[2.5rem] border border-white/10 bg-white/5 p-2 shadow-2xl shadow-indigo-500/10 backdrop-blur-xl">
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-8">
            <Toaster position="top-center" richColors={true} />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
