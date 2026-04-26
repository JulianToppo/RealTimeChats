"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!username.trim()) return;

    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });

    const user = await res.json();

    
    localStorage.setItem("user", JSON.stringify(user));

    
    router.push("/homepage");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-zinc-900 text-white">
      <div className="flex flex-col gap-4 p-6 bg-zinc-800 rounded-xl">
        <h1 className="text-lg font-semibold">Login</h1>

        <input
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-4 py-2 rounded bg-zinc-700 outline-none"
        />

        <button
          onClick={handleLogin}
          className="bg-indigo-500 px-4 py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}