import { redirect } from "next/navigation";

export default function Home() {
  redirect("/home");
  return (
    <div className="font-mono flex flex-col justify-between items-center min-h-screen p-8 pb-20 gap-16 sm:p-20"></div>
  );
}
