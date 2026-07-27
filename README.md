<div align="center">

# 🧠 DoomScroll Focus Coach

### AI-Powered Productivity & Digital Wellbeing Assistant

Reduce doomscrolling, improve focus, and build healthier digital habits using personalized AI coaching.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38BDF8?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://vercel.com/)

</div>

---

# 🌐 Live Demo

**Live Application**

https://doomscroll-focus-coach.vercel.app

---

# 📂 GitHub Repository

https://github.com/Aliyan476/doomscroll-focus-coach

---

# 📖 Project Overview

DoomScroll Focus Coach is an AI-powered web application designed to help students reduce excessive social media usage and improve their productivity.

Many students unknowingly spend several hours every day scrolling through social media platforms, reducing study time, harming sleep quality, and lowering overall productivity.

This application allows users to record their daily habits, analyze them using Artificial Intelligence, and receive personalized recommendations that encourage healthier digital behaviour.

Unlike generic productivity applications, DoomScroll Focus Coach provides personalized coaching based on each user's own daily routine.

---

# 🎯 Problem Statement

Digital distraction has become one of the biggest challenges faced by students.

Excessive use of platforms such as Instagram, TikTok, Facebook and YouTube often leads to:

- Poor concentration
- Reduced academic performance
- Low productivity
- Poor sleep schedule
- Increased screen addiction

DoomScroll Focus Coach helps users recognize these habits and receive practical, AI-generated recommendations to improve their daily routine.

---

# 👥 Target Users

- University Students
- College Students
- High School Students
- Self Learners
- Anyone wanting healthier screen habits

---

# ✨ Features

## 🔐 Authentication

- User Registration
- Secure Login
- Supabase Authentication

---

## 📊 Daily Focus Check-In

Users record:

- Screen Time
- Sleep Hours
- Study Hours
- Mood
- Most Used Application
- Biggest Daily Distraction

---

## 🤖 AI Productivity Coach

The AI analyzes daily habits and generates:

- Focus Score
- Doomscroll Risk
- Personalized Analysis
- Action Plan
- Motivation

---

## 📈 Dashboard

- Average Focus Score
- Highest Focus Score
- Daily Streak
- Achievement Badges
- Recent Check-ins
- Focus Trend Graph

---

## 📄 PDF Report

Generate a downloadable productivity report containing:

- Focus Statistics
- AI Analysis
- Doomscroll Risk
- Latest Results

---

# 🤖 AI Feature

The application uses an AI Productivity Coach to analyze the user's daily routine.

The AI considers:

- Screen Time
- Sleep Hours
- Study Hours
- Mood
- Most Used App
- Biggest Distraction

It returns:

- Focus Score
- Doomscroll Risk
- Personalized Analysis
- Action Plan
- Motivational Advice

---

# 🧠 AI System Prompt

The AI is instructed to behave as a supportive productivity coach.

It follows instructions similar to:

> Analyze the user's daily digital habits and generate:
>
> - Focus Score (0–100)
> - Doomscroll Risk (Low, Moderate, High)
> - Personalized productivity analysis
> - Five practical recommendations
> - One motivational sentence
>
> Encourage healthier digital habits using realistic and actionable advice.

---

# 🛠 Technologies Used

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- Next.js API Routes

### Database

- Supabase PostgreSQL

### Authentication

- Supabase Authentication

### AI

- Google Gemini API

### Charts

- Recharts

### PDF Generation

- jsPDF

### Deployment

- Vercel

---

# 📸 Application Screenshots

## 🏠 Home Page

<p align="center">
<img src="screenshots/home-page.png" width="900">
</p>

The landing page introduces the application, explains its purpose, and allows users to begin by creating an account.

---

## 👤 Create Account

<p align="center">
<img src="screenshots/signup-page.png" width="700">
</p>

Users can securely create an account using Supabase Authentication.

---

## 📊 Daily Focus Check-In

<p align="center">
<img src="screenshots/checkin-page.png" width="700">
</p>

Users enter their daily digital habits. The AI analyzes these inputs and provides personalized productivity recommendations.

---

# 🚀 How to Run the Project

Clone the repository

```bash
git clone https://github.com/Aliyan476/doomscroll-focus-coach.git
```

Move into the project

```bash
cd doomscroll-focus-coach
```

Install dependencies

```bash
npm install
```

Create a `.env.local` file

```env
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL

NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

GEMINI_API_KEY=YOUR_API_KEY
```

Run locally

```bash
npm run dev
```

Build production version

```bash
npm run build
```

---

# 📁 Project Structure

```text
app/
│
├── api/
├── checkin/
├── dashboard/
├── login/
├── signup/
├── layout.tsx
├── page.tsx
│
lib/
│
├── supabase.ts
│
screenshots/
│
├── home-page.png
├── signup-page.png
└── checkin-page.png
```

---

# 🚀 Future Improvements

- Weekly AI Reports
- Calendar Integration
- Email Reminders
- Mobile Application
- Gamification
- Dark / Light Theme
- Habit Tracking
- Advanced Analytics

---

# 👨‍💻 Developer

**Muhammad Aliyan Majid**

BS Electrical Engineering

University of Engineering & Technology (UET) Taxila

GitHub:

https://github.com/Aliyan476

---

# 📄 License

This project was developed as an original individual university project for educational purposes.

---

<div align="center">

### ⭐ Thank you for visiting DoomScroll Focus Coach!

If you found this project useful, feel free to ⭐ the repository.

</div>
