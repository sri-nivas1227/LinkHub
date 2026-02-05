"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signupAction } from "../actions";

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    setLoading(true);
    setError(null);
    if(form.email===""||form.name==="" || form.password===""){
      setError("Please fill all fields!")
      setLoading(false);
      return;
    }
    try {
      const response = await signupAction(form);
      console.log(response);
      if (response.success) {
        router.push("/auth/login");
      } else {
        setError(response.message || "Signup Failed :/ Try again!");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="w-full max-w-md text-left">
        <div className="mb-8">
          <p className="text-sm text-zinc-400">Create your account</p>
          <h1 className="text-3xl font-semibold text-white">Join LinkHub</h1>
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
              type="password"
              name="password"
              placeholder="Create a strong password"
              value={form.password}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-xl bg-zinc-900/60 border border-white/10 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
            />
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
            href="/auth/login"
            className="text-indigo-300 hover:text-indigo-200"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
