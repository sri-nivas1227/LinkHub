import Image from "next/image";
export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      lang="en"
      className="w-full p-0 rounded-xl bg-gradient-to-b from-[#791216] to-[#b6313c] via-[#d98283] h-full"
    >
      <div className={`flex justify-center items-center h-full w-full `}>
        {children}
      </div>
    </div>
  );
}
