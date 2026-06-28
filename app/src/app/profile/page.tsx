import { redirect } from "next/navigation";
import { getProfileAction } from "../actions";

export default async function ProfilePage() {
  const res = await getProfileAction();
  if (res.success && res.data?.profile?.username) {
    redirect(`/profile/${res.data.profile.username}`);
  }
  redirect("/auth/login");
}
