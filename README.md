# AI Study Companion

**IIT Mandi Multimodal Hackathon 2026 · Track D: Personalized Tutoring & Adaptive Learning**

A complete, source-grounded frontend application featuring Bayesian Knowledge Tracing (BKT) adaptive learning, multimodal source citation (videos, PDFs, slide decks), interactive concept knowledge mapping, and socratic AI tutoring.

---

## Key Features
- **100% Source-Grounded Tutoring**: Answers include inline citation chips (`[cite:...]`). Clicking any chip opens the exact textbook page, video timestamp seek, or lecture slide.
- **Honest Abstention**: Off-material questions are strictly declined to prevent AI hallucinations.
- **Bayesian Knowledge Tracing (BKT)**: Every quiz answer updates the real-time probability $P(L)$ of concept mastery.
- **Adaptive Quiz Engine**: Selects practice questions targeting ~70% expected success rate based on learner ability.
- **Interactive Prerequisite Knowledge Map**: Renders concept nodes colored by BKT mastery levels (High, Moderate, Low, Untested).
- **Active Revision Hub**: Spaced-repetition flashcards with flip animation and audio briefs.
- **RAGAS Benchmark Evaluation**: Reports metrics on Faithfulness, Answer Relevancy, Context Precision, and Refusal Recall.

---

## Tech Stack
- **Framework**: Next.js App Router (TypeScript strict)
- **Styling**: Tailwind CSS with custom theme variables (Light/Dark mode)
- **Icons & Animation**: Lucide React, Framer Motion
- **State Management**: Zustand
- **Data Visualization**: Recharts
- **Validation**: Zod Schemas

---

## Quick Start (Running Locally)

1. **Clone & Install Dependencies**:
   ```bash
   git clone https://github.com/harshkumargupta016-a11y/Study_Comapanion.git
   cd Study_Comapanion
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

---

## Switching to Real FastAPI Backend

By default, the application reads from realistic local mock data in `src/lib/mock/data.ts`.

To connect to a live FastAPI backend:
1. Open or create `.env.local`:
   ```env
   NEXT_PUBLIC_USE_MOCK=false
   NEXT_PUBLIC_API_BASE_URL=https://your-fastapi-backend.com
   ```
2. Restart the Next.js dev server. All API requests in `src/lib/api/index.ts` will fetch from the real endpoints without requiring any UI code changes.
