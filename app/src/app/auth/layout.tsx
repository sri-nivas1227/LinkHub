export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-3/5 min-h-2/3 flex flex-col items-center bg-black/80 border rounded-[5rem] overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 shadow-lg shadow-white p-2 text-center ">
        <h1 className="text-white m-3 font-mono text-5xl font-bold">
          DropLinks
        </h1>
        {children}
      </div>
    </div>
  );
}
