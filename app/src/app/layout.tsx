import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { APP_CONFIG } from "@/config/constants";
import { Toaster } from "sonner";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: APP_CONFIG.NAME,
  description: APP_CONFIG.DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} relative font-sans antialiased min-h-screen bg-zinc-950 text-zinc-100`}
      >
        <Toaster position="top-center" richColors={true} />

        {children}
        <div className="w-full">
          <Footer />
        </div>
      </body>
    </html>
  );
}
