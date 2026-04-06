# EnglishOS

**Not a language app. An operating system for learning English.**

EnglishOS is a 300-day English fluency platform for South Asian (Urdu/Hindi) learners, built on the Polymath methodology: DiSS Framework + Feynman Technique + Spaced Repetition + Serial Mastery.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, TypeScript, Tailwind CSS, Framer Motion |
| Backend | Express.js, TypeScript, Prisma ORM |
| Database | PostgreSQL |
| AI | OpenAI GPT-4o (Feynman evaluation + Conversation simulator) |
| Monorepo | pnpm workspaces |

---

## Running in Development

### Prerequisites

- Node.js 20+
- pnpm 9+
- PostgreSQL 15+

### 1. Install dependencies

```bash
pnpm install
```

### 2. Set environment variables

Copy `.env.example` to `server/.env` and fill in the values (see **Required Environment Variables** below).

### 3. Set up the database

```bash
# Apply all migrations
cd server && npx prisma migrate dev

# Seed Level 1 content (Modules 1–4)
npx prisma db seed
```

### 4. Start development servers

```bash
# From the project root — starts both client (port 5173) and server (port 5000)
pnpm dev
```

The React client proxies `/api/*` requests to the Express server automatically via Vite's `server.proxy` configuration.

---

## Running in Production

### Build

```bash
pnpm build
```

This compiles the React frontend into `client/dist/` and the Express server into `server/dist/`.

### Start

```bash
node server/dist/server.js
```

The Express server serves the compiled React app as static files and handles all API routes. Everything runs on a single port (`PORT` env var, defaults to `5000`).

---

## Required Environment Variables

Set these in `server/.env` for local development, or in Replit Secrets for production.

| Variable | Description | Example |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/englishos` |
| `JWT_SECRET` | Secret for signing access tokens (min 32 chars, random) | `openssl rand -hex 32` |
| `JWT_REFRESH_SECRET` | Secret for signing refresh tokens (different from JWT_SECRET) | `openssl rand -hex 32` |
| `OPENAI_API_KEY` | OpenAI API key for Feynman evaluation and conversation AI | `sk-...` |
| `NODE_ENV` | Set to `production` for production builds | `production` |
| `PORT` | HTTP port the server listens on | `5000` |
| `CLIENT_URL` | Allowed CORS origin for the frontend (production URL) | `https://your-app.replit.app` |

> **Security note:** `JWT_SECRET` and `JWT_REFRESH_SECRET` must be different, randomly generated strings. Never commit them to source control. The `OPENAI_API_KEY` is only read server-side and is never exposed to the client.

---

## Seeding the Database

The seed script populates all Level 1 content (Modules 1–4) with Roman Urdu translations, Power Pack flags, and sort orders:

```bash
cd server && npx prisma db seed
```

**What gets seeded:**

| Module | Content | Items |
|---|---|---|
| Module 1 — Alphabets | 5 vowels (Power Pack) + 21 consonants | 26 |
| Module 2 — Core 100 Words | Groups A–F (Pronouns, Be Verbs, Action Verbs, Nouns, Adjectives, Connectors) | 135 |
| Module 3 — Basic Sentences | SVO Formula + Positive / Negative / Question sentence patterns | 23 |
| Module 4 — Daily Patterns | Greetings, Polite Requests, Numbers 1–10 | 26 |

The seed is idempotent — it deletes all existing Level 1 content before re-inserting, so it is safe to run multiple times.

---

## Project Structure

```
englishos/
├── client/               # React + Vite frontend
│   ├── src/
│   │   ├── components/   # UI components, layout, mission phases, gamification
│   │   ├── pages/        # Route-level page components
│   │   ├── stores/       # Zustand state stores (auth, progress, SR queue, UI)
│   │   ├── services/     # API client, auth API
│   │   └── hooks/        # Custom React hooks
│   └── public/           # Static assets (manifest, icons, robots.txt)
├── server/               # Express + Prisma backend
│   ├── src/
│   │   ├── controllers/  # Route handlers
│   │   ├── routes/       # Express router definitions
│   │   ├── middleware/    # Auth, error handler, rate limiting, logging
│   │   ├── lib/          # Prisma client, shared utilities
│   │   └── schemas/      # Zod validation schemas
│   └── prisma/
│       ├── schema.prisma # Database schema
│       ├── migrations/   # Migration history
│       └── seed.ts       # Level 1 content seed
└── package.json          # Root pnpm workspace config
```

---

## Security Notes

- Passwords are hashed with bcrypt (12 rounds) — the `passwordHash` field is never returned in any API response
- JWT access tokens expire in 15 minutes; refresh tokens rotate on every use
- Auth endpoints are rate-limited to 10 requests per 15 minutes per IP (brute-force protection)
- Helmet sets `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, and HSTS in production
- The OpenAI API key lives exclusively in server-side environment variables
