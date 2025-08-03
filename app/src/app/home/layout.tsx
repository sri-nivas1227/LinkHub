import Image from "next/image";
export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div lang="en" className="home-bg w-full p-0 rounded-xl h-full">
      <div className={`flex justify-center items-center h-full w-full `}>{children}</div>
    </div>
  );
}
