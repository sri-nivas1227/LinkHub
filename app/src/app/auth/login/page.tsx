"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Handle login logic here
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Login successful:", data);
      // Redirect or update state as needed
      router.push("/home");
    } else {
      console.error("Login failed");
    }
  };

  return (
    <div className="h-full flex flex-col justify-center items-center my-4">
      {/* <h1 className="text-3xl font-semibold">Login</h1> */}
      <div className="flex flex-col bg-gray-800 gap-3 p-3 rounded-3xl text-xl font-semibold">
        <label className="flex gap-3 justify-between items-baseline">
          <span className="">Email:</span>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-white outline-none rounded-3xl p-1"
          />
        </label>
        <label className="flex gap-3 justify-between items-baseline">
          <span className="">Password:</span>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-white outline-none rounded-3xl p-1"
          />
        </label>
        <div className="flex justify-center items-center">
          <button
            onClick={handleLogin}
            className="p-2 px-4 bg-gray-200 text-black rounded-3xl border w-fit"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
