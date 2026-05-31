import NavBar from "../components/NavBar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="mx-auto w-md md:w-2/3 px-4 pb-24 pt-6">
        {children}
      </main>
    </div>
  );
}
