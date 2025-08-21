"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.status === 200 || res.status === 201) {
        router.push("/auth/login");
      } else {
        const data = await res.json();
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col justify-center items-center my-4">
      <h1 className="text-white m-3 font-mono text-3xl font-bold">DropLinks</h1>
      <div className="flex flex-col gap-3 p-2 rounded-3xl font-semibold w-full max-w-md">
        <label className="flex gap-3 justify-between items-baseline">
          <span>Name:</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="border border-white outline-none rounded-3xl p-1 text-white"
            required
          />
        </label>
        <label className="flex gap-3 justify-between items-baseline">
          <span>Email:</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="border border-white outline-none rounded-3xl p-1 text-white"
            required
          />
        </label>
        <label className="flex gap-3 justify-between items-baseline">
          <span>Password:</span>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="border border-white outline-none rounded-3xl p-1 text-white"
            required
          />
        </label>
        {error && (
          <div className="text-red-400 text-base text-center">{error}</div>
        )}
        <div className="flex justify-center items-center">
          <button
            type="button"
            className="p-2 px-4 bg-gray-200 text-black rounded-3xl border w-fit"
            disabled={loading}
            onClick={handleSignUp}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
