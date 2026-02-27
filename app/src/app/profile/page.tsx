"use client";

import { motion } from "framer-motion";
import { User, Mail, Link as LinkIcon, Edit } from "lucide-react";
import { useState } from "react";
import EditProfileForm from "./components/EditProfileForm";

const dummyUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  bio: "Software developer and Next.js enthusiast. Love creating beautiful and functional web applications.",
};

const dummyLinks = [
  { _id: "1", title: "Portfolio", url: "https://johndoe.com" },
  { _id: "2", title: "GitHub", url: "https://github.com/johndoe" },
  { _id: "3", title: "LinkedIn", url: "https://linkedin.com/in/johndoe" },
];

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };
  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
        {!isEditing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-lg bg-zinc-900/30 text-zinc-200 shadow-md"
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
                    <h2 className="text-xl font-semibold">{dummyUser.name}</h2>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Mail size={16} />
                      <span>{dummyUser.email}</span>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-gray-500">{dummyUser.bio}</p>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {dummyLinks.map((link) => (
                  <div
                    key={link._id}
                    className="flex items-center justify-between rounded-lg bg-white p-2 shadow-sm"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                        <LinkIcon size={16} className="text-gray-500" />
                      </div>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-indigo-900 hover:scale-105"
                      >
                        {link.title}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
        {isEditing && <EditProfileForm />}
      </main>
    </div>
  );
}
