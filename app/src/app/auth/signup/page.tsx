"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { postLoginAction, postSignupAction } from "../../actions";
import { ROUTES } from "@/config/constants";
import { toast } from "sonner";

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    setLoading(true);
    setError(null);
    if (form.email === "" || form.name === "" || form.password === "") {
      setError("Please fill all fields!");
      setLoading(false);
      return;
    }
    if (!isPasswordStrong(form.password)) {
      // todo: set error like a checklist for password strength (at least 8 characters, one uppercase, one lowercase, one number, and one special character)
      setError(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
      );
      setLoading(false);
      return;
    }
    try {
      const response = await postSignupAction(form);
      if (response.success) {
        toast.success(
          "Welcome to StashD! Please verify your email to continue.",
        );
        router.push(ROUTES.VERIFY_EMAIL);
        return;
      } else {
        setError(response.message || "Signup Failed :/ Try again!");
      }
    } catch (err) {
      // todo: add a report issue button when error occurs to let users report the issue with pre-filled error details
      setError(
        `Network error: ${err instanceof Error ? `: ${err.message}` : ""}`,
      );
    } finally {
      setLoading(false);
    }
  };
  // validate password strength
  const isPasswordStrong = (password: string) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=?.,;:-])[A-Za-z\d!@#$%^&*()_+=?.,;:-]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  // handle enter key press for form submission
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSignUp();
    }
  };
  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="w-full max-w-md text-left">
        <div className="mb-8">
          <p className="text-sm text-zinc-400">Create your account</p>
          <h1 className="text-3xl font-semibold text-white">Join StashD</h1>
          <p className="text-sm text-zinc-400 mt-2">
            Start organizing your links with smart categories and quick access.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-zinc-300">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Jane Doe"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-xl bg-zinc-900/60 border border-white/10 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
            />
          </div>
          <div>
            <label className="text-sm text-zinc-300">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-xl bg-zinc-900/60 border border-white/10 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
            />
          </div>
          <div>
            <label className="text-sm text-zinc-300">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create a strong password"
              value={form.password}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-xl bg-zinc-900/60 border border-white/10 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
            />
            <p
              onClick={() => {
                setShowPassword((prev) => !prev);
              }}
              className="text-end m-1 text-xs cursor-pointer select-none text-indigo-300"
            >
              Show Password
            </p>
          </div>
          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}
          <button
            type="button"
            disabled={loading}
            onClick={handleSignUp}
            className="w-full rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-medium py-3 transition disabled:opacity-60"
          >
            {loading ? "Signing Up..." : "Create Account"}
          </button>
        </div>

        <div className="mt-6 text-sm text-zinc-400">
          Already have an account?{" "}
          <Link
            href={ROUTES.LOGIN}
            className="text-indigo-300 hover:text-indigo-200"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
