import NavBar from "../components/NavBar";
export default function AddLinkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      lang="en"
      className="font-ibm-plex-mono page-bg w-full p-0 rounded-xl h-full"
    >
      <NavBar />
      <div className={`flex justify-center   h-full w-full `}>
        <div className="w-full">
          <div className="mb-4 flex justify-center">
            <input
              type="text"
              placeholder="Search categories..."
              className="w-4/5 px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2"
            />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
