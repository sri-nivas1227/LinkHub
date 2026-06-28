"use client";

import { motion } from "framer-motion";
import { Edit, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { getProfileAction, getPublicProfileAction, logoutAction } from "@/app/actions";
import { ROUTES } from "@/config/constants";
import EditProfileForm from "../components/EditProfileForm";
import EditPasswordForm from "../components/EditPasswordForm";
import PublicCollectionCard from "./components/PublicCollectionCard";

interface ProfileLink {
  title: string;
  url: string;
}

interface PublicCollection {
  name: string;
  slug: string;
}

interface PublicProfile {
  name: string;
  username: string;
  description: string;
  links: ProfileLink[];
  public_collections: PublicCollection[];
}

interface OwnProfile {
  name: string;
  username: string;
  email: string;
  description: string;
  links: ProfileLink[];
}

export default function PublicProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const router = useRouter();

  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [ownProfile, setOwnProfile] = useState<OwnProfile | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPublicProfile = async () => {
    const res = await getPublicProfileAction(username);
    if (res.success) setProfile(res.data);
  };

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const [publicRes, ownRes] = await Promise.allSettled([
        getPublicProfileAction(username),
        getProfileAction(),
      ]);

      if (publicRes.status === "fulfilled" && publicRes.value.success) {
        setProfile(publicRes.value.data);
      }

      if (ownRes.status === "fulfilled" && ownRes.value.success) {
        const p = ownRes.value.data?.profile;
        if (p?.username === username) {
          setIsOwner(true);
          setOwnProfile(p);
        }
      }

      setIsLoading(false);
    };
    load();
  }, [username]);

  useEffect(() => {
    if (!isEditing) {
      fetchPublicProfile();
    }
  }, [isEditing]);

  const handleLogout = async () => {
    await logoutAction();
    router.push(ROUTES.LOGIN);
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl p-6 space-y-4">
        <div className="shimmer h-32 rounded-2xl" />
        <div className="shimmer h-20 rounded-2xl" />
        <div className="shimmer h-40 rounded-2xl" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="mx-auto max-w-2xl p-6 text-center text-zinc-400">
        <p className="text-lg font-semibold">User not found</p>
        <p className="text-sm mt-1">No profile exists for @{username}</p>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="mx-auto max-w-2xl p-4">
        {changePassword ? (
          <EditPasswordForm
            setIsEditing={setIsEditing}
            setChangePassword={setChangePassword}
          />
        ) : (
          <EditProfileForm
            profile={ownProfile ?? { name: profile.name, email: "", description: profile.description, links: profile.links }}
            setIsEditing={setIsEditing}
          />
        )}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-2xl p-4 space-y-4"
    >
      {/* Profile card */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-zinc-400">
              <User size={28} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-zinc-100">{profile.name}</h1>
              <p className="text-sm text-zinc-500">@{profile.username}</p>
            </div>
          </div>

          {isOwner && (
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => { setChangePassword(false); setIsEditing(true); }}
                className="flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:border-indigo-500/60 hover:text-indigo-200 transition cursor-pointer"
              >
                <Edit size={13} />
                Edit
              </button>
              <button
                onClick={() => { setChangePassword(true); setIsEditing(true); }}
                className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:border-zinc-500 transition cursor-pointer"
              >
                Change Password
              </button>
              <button
                onClick={handleLogout}
                className="rounded-lg border border-red-900/50 bg-red-950/40 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-900/40 transition cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {profile.description && (
          <p className="mt-4 text-base text-zinc-400">{profile.description}</p>
        )}

        {profile.links.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {profile.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-sm text-zinc-300 hover:border-indigo-500/60 hover:text-indigo-200 transition"
              >
                <Image
                  src={`https://www.google.com/s2/favicons?domain=${link.url}&sz=32`}
                  alt=""
                  width={14}
                  height={14}
                  className="rounded-sm"
                />
                {link.title}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Public collections */}
      <div className="space-y-2">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 px-1">
          Public Collections
        </h2>
        {profile.public_collections.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {profile.public_collections.map((col) => (
              <PublicCollectionCard
                key={col.slug}
                name={col.name}
                username={username}
                slug={col.slug}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-zinc-600 py-2 px-1">No public collections yet.</p>
        )}
      </div>
    </motion.div>
  );
}
