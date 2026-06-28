import { redirect } from "next/navigation";

// Legacy route — public collections are now at /<username>/<slug>
export default function SharePage() {
  redirect("/");
}
