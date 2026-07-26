"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import jsPDF from "jspdf";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function Dashboard() {
  const [checkins, setCheckins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCheckins();
  }, []);

  async function loadCheckins() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("checkins")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setCheckins(data);
    }

    setLoading(false);
  }

  const average =
    checkins.length === 0
      ? 0
      : Math.round(
          checkins.reduce((sum, item) => sum + (item.focus_score || 0), 0) /
            checkins.length
        );

  const highest =
    checkins.length === 0
      ? 0
      : Math.max(...checkins.map((x) => x.focus_score || 0));

  const latest = checkins[0];

  const streak = (() => {
    if (checkins.length === 0) return 0;

    const uniqueDates = [
      ...new Set(checkins.map((item) => new Date(item.created_at).toDateString())),
    ];

    uniqueDates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    let count = 1;

    for (let i = 0; i < uniqueDates.length - 1; i++) {
      const current = new Date(uniqueDates[i]);
      const previous = new Date(uniqueDates[i + 1]);

      const diff = (current.getTime() - previous.getTime()) / (1000 * 60 * 60 * 24);

      if (diff === 1) count++;
      else break;
    }

    return count;
  })();

  const badges = [
    { title: "🥇 Focus Master", earned: highest >= 90, progress: `${highest}/90` },
    { title: "📚 Study Warrior", earned: checkins.length >= 10, progress: `${checkins.length}/10` },
    { title: "🔥 Consistency King", earned: average >= 80, progress: `${average}/80` },
    {
      title: "😴 Healthy Sleeper",
      earned: latest && latest.sleep >= 7 && latest.sleep <= 9,
      progress: latest ? `${latest.sleep} hrs` : "--",
    },
    {
      title: "🚫 No Doomscroller",
      earned: latest && latest.doomscroll_risk === "Low",
      progress: latest?.doomscroll_risk || "--",
    },
  ];

  const chartData = [...checkins]
    .reverse()
    .map((item) => ({ date: new Date(item.created_at).toLocaleDateString(), score: item.focus_score }));

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("DoomScroll AI Report", 20, 20);

    doc.setFontSize(14);
    doc.text(`Total Check-ins: ${checkins.length}`, 20, 40);
    doc.text(`Average Focus: ${average}`, 20, 50);
    doc.text(`Highest Focus: ${highest}`, 20, 60);

    if (latest) {
      doc.text("Latest Check-In", 20, 80);
      doc.text(`Focus Score: ${latest.focus_score}`, 20, 95);
      doc.text(`Risk: ${latest.doomscroll_risk}`, 20, 105);

      const lines = doc.splitTextToSize(latest.ai_result || "", 170);

      doc.text(lines, 20, 120);
    }

    doc.save("doomscroll-report.pdf");
  };

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-bold text-cyan-400">Dashboard</h1>
            <p className="text-slate-400 mt-2">Track your productivity, focus and digital wellbeing.</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/" className="rounded-lg bg-slate-700 hover:bg-slate-600 px-5 py-3 font-semibold transition">
              🏠 Home
            </Link>

            <Link href="/checkin" className="rounded-lg bg-green-600 hover:bg-green-500 px-5 py-3 font-semibold transition">
              ➕ New Check-In
            </Link>

            <button onClick={downloadPDF} className="rounded-lg bg-cyan-500 hover:bg-cyan-400 px-5 py-3 font-semibold transition">
              📄 Export PDF
            </button>

            <button onClick={logout} className="rounded-lg bg-red-600 hover:bg-red-500 px-5 py-3 font-semibold transition">
              🚪 Logout
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-24">
            <p className="text-2xl">Loading dashboard...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && checkins.length === 0 && (
          <div className="bg-slate-900 rounded-2xl p-12 text-center">
            <h2 className="text-4xl font-bold text-cyan-400 mb-5">Welcome 👋</h2>
            <p className="text-slate-400 mb-8">You haven't completed a focus check-in yet. Complete your first one to unlock your dashboard.</p>

            <Link href="/checkin" className="inline-block rounded-xl bg-cyan-500 hover:bg-cyan-400 px-8 py-4 font-bold transition">
              Start Your First Check-In
            </Link>
          </div>
        )}

        {!loading && checkins.length > 0 && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <div className="bg-slate-900 rounded-2xl p-6">
                <p className="text-slate-400 text-sm">Average Focus</p>
                <p className="text-3xl font-bold text-cyan-400 mt-2">{average}</p>
              </div>

              <div className="bg-slate-900 rounded-2xl p-6">
                <p className="text-slate-400 text-sm">Highest Focus</p>
                <p className="text-3xl font-bold text-cyan-400 mt-2">{highest}</p>
              </div>

              <div className="bg-slate-900 rounded-2xl p-6">
                <p className="text-slate-400 text-sm">Current Streak</p>
                <p className="text-3xl font-bold text-cyan-400 mt-2">{streak} days</p>
              </div>

              <div className="bg-slate-900 rounded-2xl p-6">
                <p className="text-slate-400 text-sm">Total Check-ins</p>
                <p className="text-3xl font-bold text-cyan-400 mt-2">{checkins.length}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <div className="bg-slate-900 rounded-2xl p-8">
                <h2 className="text-2xl font-semibold mb-6">Focus Trend</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="date" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" domain={[0, 100]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="score" stroke="#06b6d4" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-slate-900 rounded-2xl p-8">
                <h2 className="text-2xl font-semibold mb-6">Achievements</h2>
                <div className="space-y-4">
                  {badges.map((badge) => (
                    <div key={badge.title} className="flex items-center justify-between rounded-xl border border-slate-800 p-4">
                      <div>
                        <p className="font-semibold">{badge.title}</p>
                        <p className="text-sm text-slate-400">{badge.progress}</p>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-sm font-semibold ${badge.earned ? "bg-green-600 text-white" : "bg-slate-800 text-slate-300"}`}>
                        {badge.earned ? "Unlocked" : "In Progress"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <div className="bg-slate-900 rounded-2xl p-8">
                <h2 className="text-2xl font-semibold mb-6">Latest Check-In</h2>
                {latest ? (
                  <div className="space-y-3 text-slate-300">
                    <p>
                      <span className="text-cyan-400">Focus Score:</span> {latest.focus_score}
                    </p>
                    <p>
                      <span className="text-cyan-400">Sleep:</span> {latest.sleep} hrs
                    </p>
                    <p>
                      <span className="text-cyan-400">Doomscroll Risk:</span> {latest.doomscroll_risk}
                    </p>
                    <p>
                      <span className="text-cyan-400">AI Result:</span> {latest.ai_result}
                    </p>
                  </div>
                ) : (
                  <p>No recent check-in found.</p>
                )}
              </div>

              <div className="bg-slate-900 rounded-2xl p-8">
                <h2 className="text-2xl font-semibold mb-6">Streak Summary</h2>
                <p className="text-5xl font-bold text-cyan-400">{streak}</p>
                <p className="text-slate-400 mt-2">days in a row</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
