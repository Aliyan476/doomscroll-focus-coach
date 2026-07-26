"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CheckInPage() {
  const [screenTime, setScreenTime] = useState("");
  const [sleep, setSleep] = useState("");
  const [studyHours, setStudyHours] = useState("");
  const [mood, setMood] = useState("Motivated");
  const [appUsed, setAppUsed] = useState("");
  const [distraction, setDistraction] = useState("");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<any>(null);

  async function handleAnalyze() {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/coach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          screenTime,
          sleep,
          studyHours,
          mood,
          appUsed,
          distraction,
        }),
      });

      const data = await res.json();

      console.log(data);

      if (!res.ok) {
        alert(data.error || "Something went wrong.");
        setLoading(false);
        return;
      }

      setResult(data);
console.log("API returned:", data);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { error } = await supabase.from("checkins").insert({
         user_id: user.id,
  screen_time: Number(screenTime),
  sleep: Number(sleep),
  study_hours: Number(studyHours),
  mood,
  app_used: appUsed,
  distraction,
  focus_score: data.focus_score,
  doomscroll_risk: data.doomscroll_risk,
  ai_result: `${data.analysis}

Action Plan:
• ${data.action_plan.join("\n• ")}

Motivation:
${data.motivation}`,
        });

        if (error) {
          console.error(error);
        } else {
          console.log("✅ Check-in saved!");
        }
      }
    } catch (err) {
      console.error(err);
      alert("Server error.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-2xl mx-auto bg-slate-900 rounded-xl p-8">

        <h1 className="text-4xl font-bold text-cyan-400 mb-8">
          Daily Focus Check-In
        </h1>

        <input
          className="w-full p-3 mb-4 rounded bg-slate-800"
          placeholder="Screen Time (hours)"
          value={screenTime}
          onChange={(e) => setScreenTime(e.target.value)}
        />

        <input
          className="w-full p-3 mb-4 rounded bg-slate-800"
          placeholder="Sleep (hours)"
          value={sleep}
          onChange={(e) => setSleep(e.target.value)}
        />

        <input
          className="w-full p-3 mb-4 rounded bg-slate-800"
          placeholder="Study Hours"
          value={studyHours}
          onChange={(e) => setStudyHours(e.target.value)}
        />

        <input
          className="w-full p-3 mb-4 rounded bg-slate-800"
          placeholder="Most Used App"
          value={appUsed}
          onChange={(e) => setAppUsed(e.target.value)}
        />

        <input
          className="w-full p-3 mb-4 rounded bg-slate-800"
          placeholder="Biggest Distraction"
          value={distraction}
          onChange={(e) => setDistraction(e.target.value)}
        />

        <select
          className="w-full p-3 mb-6 rounded bg-slate-800"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        >
          <option>Motivated</option>
          <option>Happy</option>
          <option>Neutral</option>
          <option>Stressed</option>
          <option>Tired</option>
        </select>

        <button
          onClick={handleAnalyze}
          className="w-full bg-cyan-500 py-3 rounded-lg font-bold hover:bg-cyan-400"
        >
          {loading ? "Analyzing..." : "Analyze My Day"}
        </button>

        {result && (
          <div className="mt-8 bg-slate-800 rounded-lg p-6 space-y-6">

            <div>
              <h2 className="text-cyan-400 text-3xl font-bold">
                🎯 Focus Score
              </h2>

              <p className="text-6xl font-bold mt-2">
                {result.focus_score}/100
              </p>
            </div>

            <div>
              <h2 className="text-cyan-400 text-2xl font-bold">
                📱 Doomscroll Risk
              </h2>

              <p className="text-xl">
                {result.doomscroll_risk}
              </p>
            </div>

            <div>
              <h2 className="text-cyan-400 text-2xl font-bold">
                🧠 Analysis
              </h2>

              <p className="mt-2 leading-8">
                {result.analysis}
              </p>
            </div>

            <div>
              <h2 className="text-cyan-400 text-2xl font-bold">
                💡 Personalized Action Plan
              </h2>

              <ol className="list-decimal ml-6 mt-2 space-y-2">
                {result.action_plan?.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ol>
            </div>

            <div>
              <h2 className="text-cyan-400 text-2xl font-bold">
                🚀 Motivation
              </h2>

              <p className="mt-2">
                {result.motivation}
              </p>
            </div>

          </div>
        )}

      </div>
    </main>
  );
}