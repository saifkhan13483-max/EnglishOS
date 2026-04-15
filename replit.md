# EnglishOS

A full-stack language learning web application built for South Asian learners. Implements spaced repetition, AI-powered Feynman technique grading, gamification, and a 300-day English learning roadmap.

## Architecture

- **Monorepo** managed with `pnpm` workspaces
- **client/** — React 18 + TypeScript + Vite + Tailwind CSS
- **server/** — Node.js + Express + TypeScript + Prisma ORM

## Running the Application

The single workflow `Start application` runs both services concurrently:
- **Vite dev server** (React frontend) on port **5000** — serves the web UI
- **Express API server** on port **3001** — serves `/api/v1/*` and `/health`
- Vite proxies `/api` and `/health` requests to localhost:3001

Command: `pnpm exec concurrently "pnpm --filter server dev" "pnpm --filter client dev"`

## Key Technologies

| Layer | Stack |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, Zustand, React Router, Framer Motion, Recharts, dnd-kit |
| Backend | Express 4, TypeScript, Prisma 6, PostgreSQL |
| AI | Google Gemini (`@google/generative-ai`) for Feynman response grading |
| Auth | JWT (access + refresh tokens), bcryptjs |
| Email | Resend |
| Logging | pino, morgan |

## Database

- PostgreSQL via Replit's built-in database (DATABASE_URL secret)
- Prisma schema at `server/prisma/schema.prisma`
- Migrations at `server/prisma/migrations/`
- Run migrations: `cd server && pnpm exec prisma migrate deploy`
- Generate client: `cd server && pnpm exec prisma generate`

## Environment Variables

Stored as Replit environment variables/secrets:
- `NODE_ENV` — `development` (shared)
- `PORT` — `3001` (server port, shared)
- `JWT_SECRET` — JWT signing secret (shared)
- `JWT_REFRESH_SECRET` — JWT refresh signing secret (shared)
- `GEMINI_API_KEY` — Google Gemini API key (shared)
- `DATABASE_URL` — PostgreSQL connection string (Replit secret, auto-managed)

## Key Features

- **Spaced Repetition Queue (SRQ)** — optimizes review intervals for vocabulary/grammar items
- **Feynman Moments** — AI grades learner explanations for concept retention
- **Gamification** — XP, ranks, badges, streaks, Batman Mode
- **Leaderboard** — weekly rankings with upvoting
- **Scheduled Jobs** — daily reminders and streak tracking via node-cron
- **Mastery Map** — tracks progress across levels and modules

## API Structure

All API routes are prefixed `/api/v1/`:
- `/auth` — register, login, refresh, logout
- `/learner` — profile, onboarding, settings
- `/content` — vocabulary and grammar content items
- `/mission` — daily morning/evening sessions
- `/feynman` — AI-graded explanation submissions
- `/conversation` — conversation practice
- `/progress` — level and module progress tracking
- `/leaderboard` — weekly leaderboard entries and upvotes
- `/notifications` — push notification preferences
- `/log` — client-side error logging
- `/debug` — debug utilities

## Seed Data

Run once after first deploy or after a database reset:
```bash
cd server && npx prisma db seed
```
Seeds 657 ContentItems across Levels 1–6. Level 1 has 26 alphabet items (Module 1), 135 core words (Module 2), 23 sentence patterns (Module 3), and 26 daily patterns (Module 4).

## Beginner-Friendly Improvements (April 2026)

The following UX improvements were made to make the course easier to understand for beginners:

- **CoreDrop (Lesson Cards)** — Each card now shows a color-coded content type badge (Letter/Word/Grammar Rule/Phrase/Sentence), a beginner tip for each content type, a clear progress bar at the top, and better visual hierarchy. Roman Urdu is always available via toggle (default ON).
- **WarmupFlash (Review Cards)** — Added a "How to use flashcards" guide that shows on the first session. Improved action button labels ("Forgot it / Got it") and progress dots showing green for completed cards.
- **ApplyIt (Practice)** — Added a highlighted word bank showing the hint words as clickable chips, making it easier for beginners to scaffold their responses. Added an encouraging message below the text box.
- **FeynmanMoment** — Added a "Beginner Tip" panel reminding learners to write in simple words and not worry about mistakes.
- **Landing Page** — Added a new "For Beginners" section that shows exactly what Day 1 looks like, with 3 sample lesson cards (Letter, Word, Sentence) and a simple 3-step "How It Works" breakdown.

## Known-Fixed Bugs

- **SR Queue initialization on registration** (`auth.controller.ts`): When a new user registers, `initializeSRQueue` is now called immediately for all Level 1 Module 1 content items so WarmupFlash cards are available from Day 1.
- **Duplicate tile IDs in SentenceBuilder** (`sentences.ts`): All exercises now have unique tile strings. Previously some exercises had duplicate strings (e.g., `'is not'` × 2, `'Is'` × 2) which caused dnd-kit to silently drop extra tiles from the pool on drag.

## Production Build

For production deployment, build both packages:
```bash
pnpm --filter client build   # outputs to client/dist/
pnpm --filter server build   # compiles TS to server/dist/
```
The Express server in production mode serves the client build as static files and handles client-side routing.
