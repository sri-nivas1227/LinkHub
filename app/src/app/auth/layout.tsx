
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative w-full h-full flex justify-center items-center overflow-hidden">
      <div className="absolute w-4/5 min-h-2/3 h-1/2 flex flex-col glass-card border rounded-[5rem] overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 shadow-lg shadow-white p-2 text-center ">
        {children}
      </div>
    </div>
  );
}
