import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      screenTime,
      sleep,
      mood,
      studyHours,
      distraction,
      appUsed,
    } = await req.json();

    // =========================
    // Calculate Focus Score
    // =========================

    const screen = Number(screenTime);
    const sleepHours = Number(sleep);
    const study = Number(studyHours);

    let score = 100;

    // Screen Time
    if (screen <= 2) score -= 0;
    else if (screen <= 4) score -= 10;
    else if (screen <= 6) score -= 20;
    else if (screen <= 8) score -= 35;
    else score -= 50;

    // Sleep
    if (sleepHours >= 7 && sleepHours <= 9) {
      score += 10;
    } else if (sleepHours >= 6) {
      score += 0;
    } else {
      score -= 20;
    }

    // Study
    if (study >= 5) score += 15;
    else if (study >= 3) score += 10;
    else if (study >= 1) score += 5;
    else score -= 10;

    // Mood
    switch (mood) {
      case "Motivated":
        score += 10;
        break;

      case "Happy":
        score += 8;
        break;

      case "Neutral":
        break;

      case "Stressed":
        score -= 10;
        break;

      case "Tired":
        score -= 15;
        break;
    }

    // Apps
    const app = appUsed.toLowerCase();
    const distract = distraction.toLowerCase();

    if (app.includes("instagram")) score -= 10;
    if (app.includes("youtube")) score -= 8;
    if (app.includes("tiktok")) score -= 15;

    if (distract.includes("reels")) score -= 10;
    if (distract.includes("shorts")) score -= 8;
    if (distract.includes("gaming")) score -= 8;

    score = Math.max(0, Math.min(100, Math.round(score)));

    let risk = "Low";

    if (score < 70) risk = "Moderate";
    if (score < 40) risk = "High";

    // =========================
    // AI Prompt
    // =========================

    
const prompt = `
You are DoomScroll AI.

The user's Focus Score is ${score}/100.
The user's Doomscroll Risk is ${risk}.

User Data:

Screen Time: ${screenTime} hours
Sleep: ${sleep} hours
Mood: ${mood}
Study Hours: ${studyHours}
Most Used App: ${appUsed}
Biggest Distraction: ${distraction}

Respond EXACTLY like this.

Analysis:
Two short sentences.

Action Plan:
1. First tip.
2. Second tip.
3. Third tip.

Motivation:
One short sentence.

Do not use markdown.
Do not use JSON.
Do not explain.
Do not include any text before "Analysis".
`;


    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "nvidia/nemotron-nano-12b-v2-vl:free",

          messages: [
            {
              role: "system",
              content:
  "You are DoomScroll AI. Follow the user's requested output format exactly. Do not add markdown or extra commentary.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],

         temperature: 0.2,
max_tokens: 700,


        }),
      }
    );

    const data = await response.json();

    console.log("========== OPENROUTER ==========");
    console.log(JSON.stringify(data, null, 2));
    console.log("===============================");

   if (!response.ok) {
  console.log("STATUS:", response.status);
  console.log("OPENROUTER ERROR:");
  console.log(JSON.stringify(data, null, 2));

  return NextResponse.json(
    {
      error: data?.error?.message || JSON.stringify(data),
    },
    {
      status: response.status,
    }
  );
}
   console.log("FULL OPENROUTER RESPONSE:");
console.dir(data, { depth: null });

const choice = data?.choices?.[0];

const content =
  choice?.message?.content ||
  choice?.text ||
  "";

console.log("Extracted content:", content);
      console.log("===== RAW AI CONTENT =====");
console.log(content);

if (!content) {
  return NextResponse.json(
    {
      error: "Empty AI response.",
    },
    {
      status: 500,
    }
  );
}

// Remove markdown if the model adds it
const cleaned = content
  .replace(/```json/gi, "")
  .replace(/```/g, "")
  .trim();

console.log("===== CLEANED CONTENT =====");
console.log(cleaned);

// -------- Extract Analysis --------
let analysis = "";

const analysisMatch = cleaned.match(
  /Analysis:?[\s\S]*?\n([\s\S]*?)Action Plan:?/i
);
if (analysisMatch) {
  analysis = analysisMatch[1].trim();
}

// -------- Extract Action Plan --------
let action_plan: string[] = [];

const actionMatch = cleaned.match(
  /Action Plan:?[\s\S]*?\n([\s\S]*?)Motivation:?/i
);

if (actionMatch) {
  action_plan = actionMatch[1]
    .split("\n")
    .map((line: string) =>
      line.replace(/^\d+\.\s*/, "").trim()
    )
    .filter((line: string) => line.length > 0);
}

// -------- Extract Motivation --------
let motivation = "";

const motivationMatch = cleaned.match(
  /Motivation:?([\s\S]*)$/i
);

if (motivationMatch) {
  motivation = motivationMatch[1].trim();
}

// -------- Fallbacks --------

// If AI forgot the heading
if (!analysis) {
  analysis = cleaned.split("\n")[0];
}

// Ensure exactly 3 action items
while (action_plan.length < 3) {
  action_plan.push("Stay consistent with your daily goals.");
}

action_plan = action_plan.slice(0, 3);

if (!motivation) {
  motivation =
    "Small improvements every day lead to big achievements.";
}

return NextResponse.json({
  focus_score: score,
  doomscroll_risk: risk,
  analysis,
  action_plan,
  motivation,
});  } catch (error) {
    console.error("Coach API error:", error);
    return NextResponse.json(
      {
        error: "Internal server error.",
      },
      {
        status: 500,
      }
    );
  }
}  