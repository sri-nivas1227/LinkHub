"use client";

import { motion } from "framer-motion";
import { User, Mail, Edit } from "lucide-react";
import { useEffect, useState } from "react";
import EditProfileForm from "./components/EditProfileForm";
import { getProfileAction, logoutAction } from "../actions";
import { ROUTES } from "@/config/constants";
import { useRouter } from "next/navigation";
import Image from "next/image";
import EditPasswordForm from "./components/EditPasswordForm";

interface Link {
  title: string;
  url: string;
}
interface Profile {
  name: string;
  email: string;
  description: string;
  links: Link[];
}
export default function ProfilePage() {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleChangePassword = () => {
    setIsEditing(true);
    setChangePassword(true);
  };
  const handleLogout = async () => {
    await logoutAction();
    router.push(ROUTES.LOGIN);
  };
  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await getProfileAction();
      setProfile(profileData.data.profile);
    };
    fetchProfile();
  }, []);
  useEffect(() => {
    // refresh profile data after editing
    const fetchProfile = async () => {
      const profileData = await getProfileAction();
      setProfile(profileData.data.profile);
    };
    if (!isEditing) {
      fetchProfile();
    }
  }, [isEditing]);
  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
        {!isEditing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-lg bg-zinc-700/50 text-zinc-200 shadow-md"
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Profile</h1>
                <button
                  onClick={handleEditClick}
                  className="flex items-center space-x-2 rounded-md bg-zinc-200 px-3 py-1 text-sm font-medium text-zinc-900 hover:border-2 hover:border-indigo-300 cursor-pointer"
                >
                  <Edit size={16} />
                  <span>Edit</span>
                </button>
              </div>
              <div className="mt-6">
                <div className="flex items-center space-x-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-gray-500">
                    <User size={32} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{profile?.name}</h2>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Mail size={16} />
                      <span>{profile?.email}</span>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-gray-500">{profile?.description}</p>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                {profile?.links.map((link, index) => (
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={index}
                    className="flex items-center justify-between rounded-3xl bg-zinc-300 p-2 shadow-sm"
                  >
                    <div className="w-full flex items-center justify-center space-x-4">
                      <div className="flex h-8 w-8 items-center justify-center">
                        <Image
                          src={`https://www.google.com/s2/favicons?domain=${link.url}&sz=64`}
                          alt="favicon"
                          width={24}
                          height={24}
                          className="h-8 w-8"
                        />
                      </div>

                      <div className="font-bold text-indigo-900 hover:scale-105">
                        {link.title}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
              <div className="mt-6">
                <button
                  onClick={handleChangePassword}
                  className="w-full flex justify-center items-center space-x-2 rounded-md bg-zinc-500 p-2 text-lg font-medium text-white hover:bg-red-600 cursor-pointer"
                >
                  <span>Change Password</span>
                </button>
              </div>
              <div className="mt-6">
                <button
                  onClick={handleLogout}
                  className="w-full flex justify-center items-center space-x-2 rounded-md bg-red-500 p-2 text-lg font-medium text-white hover:bg-red-600 cursor-pointer"
                >
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
        {isEditing &&
          (changePassword ? (
            <EditPasswordForm
              setIsEditing={setIsEditing}
              setChangePassword={setChangePassword}
            />
          ) : (
            <EditProfileForm profile={profile} setIsEditing={setIsEditing} />
          ))}
      </main>
    </div>
  );
}
