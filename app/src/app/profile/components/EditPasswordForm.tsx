"use client";
import { logoutAction, postChangePasswordAction } from "@/app/actions";
import { ROUTES } from "@/config/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
export default function EditPasswordForm({
  setIsEditing,
  setChangePassword,
}: {
  setIsEditing: (isEditing: boolean) => void;
  setChangePassword: (changePassword: boolean) => void;
}) {
  const router = useRouter();
  const [updatedPasswordForm, setUpdatedPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  });
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedPasswordForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement password change logic here (e.g., call an API endpoint)
    console.log("Password change submitted:", updatedPasswordForm);
    const response = await postChangePasswordAction(updatedPasswordForm);
    if (response.success) {
      toast.success(response.message || "Password changed successfully!");
      setIsEditing(false);
      setChangePassword(false);
      await logoutAction();
        
      router.push(ROUTES.LOGIN);
    } else {
      toast.error("Failed to change password: " + response.message);
    }
  };
  const handleCancel = () => {
    setIsEditing(false);
    setChangePassword(false);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-lg bg-zinc-700/50 p-6 shadow-md"
    >
      <h2 className="text-2xl font-bold text-zinc-200">Change Password</h2>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="currentPassword"
            className="block text-sm font-semibold text-zinc-300"
          >
            Current Password
          </label>
          <input
            type="password"
            name="currentPassword"
            id="currentPassword"
            value={updatedPasswordForm.currentPassword}
            onChange={handlePasswordChange}
            className="mt-1 block w-full rounded-md border outline-none p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-semibold text-zinc-300"
          >
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            value={updatedPasswordForm.newPassword}
            onChange={handlePasswordChange}
            className="mt-1 block w-full rounded-md border outline-none p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="newPasswordConfirm"
            className="block text-sm font-semibold text-zinc-300"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            name="newPasswordConfirm"
            id="newPasswordConfirm"
            value={updatedPasswordForm.newPasswordConfirm}
            onChange={handlePasswordChange}
            className="mt-1 block w-full rounded-md border outline-none p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
