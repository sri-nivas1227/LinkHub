import { redirect } from "next/navigation";
import { ROUTES } from "@/config/constants";

export default function Home() {
  redirect(ROUTES.HOME);
  return (
    <div className="font-mono flex flex-col justify-between items-center min-h-screen p-8 pb-20 gap-16 sm:p-20"></div>
  );
}
