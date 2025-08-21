import Image from "next/image";
import bg1 from "@/app/assets/bg1.svg";
import bg2 from "@/app/assets/bg2.svg";
import bg3 from "@/app/assets/bg3.svg";
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative w-full h-full flex justify-center items-center overflow-hidden">
      <div className="relative w-full h-full ">
        <Image
          src={bg1}
          alt="Background"
          width={200}
          height={200}
          objectFit="cover"
          className="absolute -left-[10%] top-[5%] rotate-200"
        />
        <Image
          src={bg1}
          alt="Background"
          width={200}
          height={200}
          objectFit="cover"
          className="absolute right-[10%] top-[40%] rotate-120"
        />
        <Image
          src={bg2}
          alt="Background"
          width={200}
          height={200}
          className="absolute left-[50%] -top-[10%] rotate-140"
        />
        <Image
          src={bg1}
          alt="Background"
          width={150}
          height={150}
          objectFit="cover"
          className="absolute -left-[5%] top-[40%] rotate-170"
        />
        <Image
          src={bg3}
          alt="Background"
          width={200}
          height={200}
          objectFit="cover"
          className="absolute -right-[10%] top-[10%] rotate-180"
        />
        <Image
          src={bg3}
          alt="Background"
          width={200}
          height={200}
          objectFit="cover"
          className="absolute left-0 bottom-0 rotate-180"
        />
        <Image
          src={bg2}
          alt="Background"
          width={200}
          height={200}
          objectFit="cover"
          className="absolute right-[10%] -bottom-[10%] rotate-180"
        />
      </div>
      <div className="absolute w-4/5 min-h-2/3 h-1/2 flex flex-col glass-card border rounded-[5rem] overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 shadow-lg shadow-white p-2 text-center ">
        {children}
      </div>
    </div>
  );
}
