"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const router = useRouter();

  async function handleGetStarted() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      router.push("/dashboard");
    } else {
      router.push("/signup");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-cyan-400">
          DoomScroll Coach
        </h1>

        <button
          onClick={handleGetStarted}
          className="rounded-xl bg-cyan-500 px-5 py-2 font-semibold hover:bg-cyan-400 transition"
        >
          Get Started
        </button>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-8 pt-20 text-center">
        <span className="inline-block rounded-full border border-cyan-500 px-4 py-2 text-cyan-300 mb-6">
          AI Productivity Assistant
        </span>

        <h1 className="text-6xl font-extrabold leading-tight">
          Stop
          <span className="text-cyan-400"> Doomscrolling.</span>
          <br />
          Start Focusing.
        </h1>

        <p className="text-gray-400 text-xl mt-8 max-w-3xl mx-auto">
          An AI-powered coach that analyzes your screen habits, mood,
          productivity and distractions to help you build healthier digital
          routines.
        </p>

        <div className="mt-10 flex justify-center gap-5">
          <button
            onClick={handleGetStarted}
            className="rounded-xl bg-cyan-500 px-8 py-4 font-semibold hover:bg-cyan-400 transition"
          >
            Start Free
          </button>

          <button
            onClick={() =>
              document
                .getElementById("features")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="rounded-xl border border-cyan-500 px-8 py-4 hover:bg-cyan-500/10 transition"
          >
            Learn More
          </button>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="max-w-6xl mx-auto px-8 mt-24 grid md:grid-cols-3 gap-8"
      >
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8 hover:border-cyan-500 transition">
          <h3 className="text-2xl font-bold mb-4 text-cyan-400">
            📊 Smart Analytics
          </h3>

          <p className="text-gray-400">
            Visualize focus, mood, sleep and scrolling trends.
          </p>
        </div>

        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8 hover:border-cyan-500 transition">
          <h3 className="text-2xl font-bold mb-4 text-cyan-400">
            🤖 AI Coach
          </h3>

          <p className="text-gray-400">
            Receive personalized recommendations every day.
          </p>
        </div>

        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8 hover:border-cyan-500 transition">
          <h3 className="text-2xl font-bold mb-4 text-cyan-400">
            🎯 Goals & Streaks
          </h3>

          <p className="text-gray-400">
            Build healthier habits using achievable goals.
          </p>
        </div>
      </section>

      <footer className="text-center text-gray-500 mt-24 py-8 border-t border-slate-800">
        © 2026 DoomScroll & Focus Pattern Coach
      </footer>
    </main>
  );
}