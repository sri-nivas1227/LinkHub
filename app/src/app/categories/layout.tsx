import NavBar from "../components/NavBar";
export default function AddLinkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div lang="en" className="font-ibm-plex-mono page-bg w-full p-0 rounded-xl h-full">
        <NavBar />
      <div className={`flex justify-center   h-full w-full `}>
        {children}
      </div>
    </div>
  );
}
