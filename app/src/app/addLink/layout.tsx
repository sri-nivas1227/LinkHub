import NavBar from "../components/NavBar";
export default function AddLinkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <div className="">
        <NavBar />
        <div className="">
          {children}
        </div>
      </div>
    </div>
  );
}
