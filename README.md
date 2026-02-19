# AI Resume Analyzer (ATS Evaluation System)

An AI-powered Applicant Tracking System (ATS) Resume Analyzer that evaluates a resume against a Job Description and returns a structured compatibility analysis.

This project simulates how modern ATS systems screen candidates by matching resume content with job requirements and generating a quantified evaluation.

---

## 🚀 Features

- 📄 Upload Resume (PDF)
- 📝 Provide Job Description
- 📊 AI-generated Match Score (0–100)
- 🔎 Missing Skills Detection
- 💡 Recommended Keywords
- ✅ Strengths & Weaknesses Analysis
- 🛠 Actionable Improvement Suggestions
- 🔒 Strict JSON validation (no malformed responses)

---

## 🧠 System Architecture

### 1️⃣ Resume Processing
- PDF uploaded via frontend
- Backend extracts readable text using `pdf-parse`
- Prevents hallucination by sending only extracted text to AI

### 2️⃣ AI Evaluation Engine
- Uses OpenAI API
- Deterministic output (`temperature: 0`)
- Strict JSON-only structured response
- Case-insensitive skill matching
- No skill guessing — only explicit resume content is considered

### 3️⃣ Backend Validation
- Cleans AI output (removes code fences if present)
- Validates JSON before sending to frontend
- Handles malformed AI responses gracefully

---

## 🛠 Tech Stack

### Frontend
- React
- Fetch API
- FormData (file upload handling)

### Backend
- Node.js
- Express
- Multer (file handling middleware)
- pdf-parse (PDF text extraction)
- OpenAI API

---
