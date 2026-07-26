"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) {
        setMessage(error.message);
        setLoading(false);
        return;
      }

      // Redirect after successful signup
      router.push("/dashboard");

    } catch (err) {
      console.error("Signup error:", err);
      setMessage("Something went wrong.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 p-8 shadow-xl">

        <h1 className="text-3xl font-bold text-center text-cyan-400 mb-6">
          Create Account
        </h1>

        <input
          className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 mb-4"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 mb-4"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 mb-6"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full rounded-lg bg-cyan-500 py-3 font-semibold hover:bg-cyan-400 disabled:bg-slate-600"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>


        <p className="mt-6 text-center text-slate-400">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/login")}
            className="text-cyan-400 hover:underline"
          >
            Login
          </button>
        </p>


        {message && (
          <p className="mt-4 text-center text-red-400">
            {message}
          </p>
        )}

      </div>
    </main>
  );
}