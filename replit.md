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

Command: `concurrently "pnpm --filter server dev" "pnpm --filter client dev"`

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

## Production Build

For production deployment, build both packages:
```bash
pnpm --filter client build   # outputs to client/dist/
pnpm --filter server build   # compiles TS to server/dist/
```
The Express server in production mode serves the client build as static files and handles client-side routing.
