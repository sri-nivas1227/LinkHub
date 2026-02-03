import NavBar from "../components/NavBar";
export default function AddLinkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative w-full h-full flex justify-center items-center overflow-hidden">
      <div className="w-full h-full top-0 left-0 absolute overflow-scroll">
        <NavBar />
        <div className="w-full h-full flex flex-col justify-center items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
