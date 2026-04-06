# EnglishOS

An English learning platform for South Asian learners built around the Polymath methodology (DiSS + Feynman Technique + Spaced Repetition + Serial Mastery).

## Architecture

**Monorepo** using pnpm workspaces with two packages:

| Package | Location | Port | Description |
|---------|----------|------|-------------|
| `client` | `/client` | 5000 | React 18 + Vite frontend |
| `server` | `/server` | 3000 | Express + Node.js API |

## Tech Stack

### Frontend (`/client`)
- **Framework**: React 18 with TypeScript
- **Build**: Vite 6
- **Styling**: Tailwind CSS 3 (custom design system, no default colors)
- **Animation**: Framer Motion
- **State**: Zustand
- **Routing**: React Router DOM v6
- **Analytics**: PostHog

### Backend (`/server`)
- **Runtime**: Node.js 20 + Express + TypeScript
- **Database**: PostgreSQL via Prisma ORM
- **Auth**: JWT with refresh token rotation (bcryptjs, jsonwebtoken)
- **AI**: OpenAI API (GPT-4o)
- **Email**: Resend
- **Validation**: Zod

## Folder Structure

```
/
├── client/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── ui/        # Atomic design elements
│   │   │   └── layout/    # Page layout components
│   │   ├── pages/         # Route-level page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── store/         # Zustand state stores
│   │   ├── lib/           # Utility functions and helpers
│   │   ├── types/         # TypeScript type definitions
│   │   └── assets/        # Static assets
│   ├── tailwind.config.ts # Custom Tailwind config (no default colors)
│   ├── vite.config.ts     # Vite config with API proxy
│   └── tsconfig.json
│
├── server/
│   ├── src/
│   │   ├── routes/        # Express route definitions
│   │   ├── controllers/   # Route handler logic
│   │   ├── middleware/     # Express middleware (auth, validation, etc.)
│   │   ├── services/      # Business logic layer
│   │   ├── lib/           # Shared utilities (prisma, openai, resend)
│   │   └── types/         # TypeScript type definitions
│   ├── prisma/
│   │   └── schema.prisma  # Database schema
│   └── tsconfig.json
│
├── package.json           # Root workspace config
└── pnpm-workspace.yaml    # pnpm workspace definition
```

## Development

```bash
# Run both client and server
pnpm dev

# Run individually
pnpm dev:client   # Vite on port 5000
pnpm dev:server   # Express on port 3000
```

## Design System

### Colors (all available as Tailwind utilities, e.g. `bg-bg-primary`, `text-brand-red`)

| Token | Hex | Usage |
|---|---|---|
| `bg-primary` | `#0A0A0F` | Page background (default) |
| `bg-secondary` | `#111118` | Card / panel backgrounds |
| `bg-tertiary` | `#1A1A28` | Elevated surfaces |
| `border-subtle` | `#2A2A3E` | Dividers, low-contrast borders |
| `border-strong` | `#3A3A5A` | Active / focused borders |
| `brand-red` | `#E94560` | Primary accent — CTAs, XP, alerts |
| `brand-blue` | `#4A9EFF` | Links, highlights, info |
| `brand-gold` | `#F5B014` | Achievements, streaks, rewards |
| `brand-green` | `#2ECC71` | Success, completion, correct |
| `text-primary` | `#FFFFFF` | Headings |
| `text-secondary` | `#C8C8E0` | Body text (default) |
| `text-muted` | `#6A6A8A` | Captions, placeholders |

### Fonts

| Token | Family | Usage |
|---|---|---|
| `font-display` | Space Grotesk | Headings and display text |
| `font-body` | Inter | Body copy (default) |
| `font-mono` | JetBrains Mono | Code, keys, data |

Google Fonts are imported in `client/src/index.css`.

## Routing Architecture

The router (`client/src/router/AppRouter.tsx`) uses React Router v6 with two route groups:

**Public routes** (redirect to `/map` if authenticated):
| Route | Component | Description |
|---|---|---|
| `/` | `Landing.tsx` | Marketing landing page |
| `/login` | `Login.tsx` | Sign-in page |
| `/register` | `Register.tsx` | Registration page |
| `/onboarding` | `Onboarding.tsx` | New user onboarding flow |

**Protected routes** (redirect to `/login` if unauthenticated, wrapped in `AppShell`):
| Route | Component | Description |
|---|---|---|
| `/map` | `MasteryMap.tsx` | Main map — Z-pattern level map, full-screen, hides AppShell top bar |
| `/mission/:type` | `Mission.tsx` | Morning or evening mission (`type` = `morning` or `evening`) |
| `/progress` | `Progress.tsx` | Growth page — stats, level bars, Feynman chart, badge wall |
| `/feynman-archive` | `FeynmanArchive.tsx` | Past Feynman explanations with score trend |
| `/leaderboard` | `Leaderboard.tsx` | Weekly Feynman leaderboard with submission modal |
| `/level-gate/:level` | `LevelGate.tsx` | Full-screen mastery gate — 10 questions, pass/fail reveal |
| `/profile` | `Profile.tsx` | Profile card, settings, stakes, My Why, danger zone |
| `*` | `NotFound.tsx` | 404 page |

## AppShell Layout

`client/src/components/layout/AppShell.tsx` wraps all protected routes:
- **Top bar** (hidden on `/map`): EnglishOS logo, streak badge, Brain Compound mini bar, notifications bell
- **Desktop left sidebar** (always visible): collapsed to 64px (icons only), expands to 208px on hover — 4 nav items: Map, Mission, Progress, Profile
- **Mobile bottom nav** (hidden on `/map`): same 4 nav items with icons and labels

## Zustand Stores

| Store | File | State Shape | Key Actions |
|---|---|---|---|
| `authStore` | `stores/authStore.ts` | `user`, `accessToken`, `isAuthenticated`, `isLoading` | `login`, `register`, `logout`, `refreshSession` |
| `missionStore` | `stores/missionStore.ts` | `missionId`, `currentMission`, `currentPhase`, `moduleContent`, `feynmanResult`, `xpEarned`, `isComplete`, `isLoading` | `startMission`, `loadDailyQueue`, `loadModuleContent`, `completeMission`, `submitFeynmanResponse` |
| `progressStore` | `stores/progressStore.ts` | `learnerProfile`, `levelProgress`, `totalXP`, `streak`, `brainCompoundPct`, `badges`, `mapLevels`, `todayMissions`, `myWhy`, `feynmanScoreTrend`, `levelProgressList`, `totalDaysActive`, `serverBadges` | `setLearnerProfile`, `setStats`, `loadDashboard`, `loadMasteryMap`, `loadStats` |
| `srStore` | `stores/srStore.ts` | `dailyQueue` (SRCard[]), `reviewedToday`, `pendingCount` | `setDailyQueue`, `markReviewed` |
| `uiStore` | `stores/uiStore.ts` | `romanUrduEnabled`, `sidebarOpen`, `activeModal`, `onboardingData` (persisted) | `setRomanUrduEnabled`, `setSidebarOpen` |

## Mission Architecture

- **Morning Mission** (`/mission/morning`): WarmupFlash → CoreDrop → ApplyIt → FeynmanMoment
- **Evening Mission** (`/mission/evening`): StoryReplay → SentenceBuilder → ConversationSim → DayClose
- Shared `MissionShell` component handles phase routing and progress bar

## Key Packages

| Package | Purpose |
|---|---|
| `@dnd-kit/core` | Drag-and-drop in SentenceBuilder |
| `canvas-confetti` | Celebration animation in DayClose |
| `recharts` | Feynman score line chart in Progress page |
| `framer-motion` | Animations throughout |

## Database Schema

Migration `20260405143747_init` applied. All tables live in the `heliumdb` PostgreSQL database.

### Enums
| Enum | Values |
|---|---|
| `ContentType` | VOCAB, GRAMMAR, SENTENCE, PHRASE, ALPHABET |
| `SessionType` | MORNING, EVENING |
| `SessionStatus` | NOT_STARTED, IN_PROGRESS, COMPLETE |
| `ModuleStatus` | LOCKED, ACTIVE, COMPLETE |

### Tables
| Table | Key Fields | Notes |
|---|---|---|
| `Learner` | id, email (unique), passwordHash, name, levelCurrent, xp, streak, rank, brainCompoundPct, batmanModeActive, batmanSkipUsedThisWeek, batmanModeWeekStart | Core user record |
| `ContentItem` | id, level, module, groupName, type, english, urduRoman, exampleSentence, isPowerPack, sortOrder | Course content |
| `SRQueueItem` | learnerId + itemId (unique), intervalDays, nextReviewDate, easeFactor, correctCount, incorrectCount, isKnowledgeGap | Spaced repetition queue |
| `MissionSession` | learnerId, sessionDate, type, status, xpEarned, feynmanScore, feynmanText | Daily mission tracking |
| `LevelProgress` | learnerId + level + module (unique), status, gateScore, gateAttempts | Module/level unlock state |
| `Badge` | learnerId, badgeType, module, earnedAt | Achievement badges |
| `FeynmanResponse` | learnerId, missionId, module, prompt, responseText, clarityScore, vocabScore, relevanceScore, knowledgeGapItems (String[]) | AI-evaluated Feynman answers |
| `RefreshToken` | learnerId, token (unique), expiresAt | JWT refresh token rotation |
| `LeaderboardEntry` | learnerId, week (ISO format "2026-W14"), module, prompt, responseText, clarityScore, upvoteCount | Weekly leaderboard submissions |

All FK relations use `CASCADE` delete. Prisma migration file: `server/prisma/migrations/20260405143747_init/migration.sql`

## API Endpoints (all require `Authorization: Bearer <token>`)

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/v1/mission/start` | Start a mission (`{ type: "MORNING" \| "EVENING" }`) |
| `PUT` | `/api/v1/mission/:id/complete` | Complete a mission (`{ xpEarned, feynmanScore? }`) |
| `GET` | `/api/v1/mission/today` | Today's morning + evening sessions |
| `GET` | `/api/v1/content/sr-queue/today` | Due SR items (sorted: gaps → power pack → date) |
| `PATCH` | `/api/v1/content/sr-queue/:id` | Mark item reviewed (`{ correct: boolean }`, SM-2 update) |
| `GET` | `/api/v1/content/module/:level/:module` | Module content (sorted: power pack first) |
| `POST` | `/api/v1/feynman/evaluate` | AI-evaluate a Feynman response; saves to DB, queues gaps |
| `GET` | `/api/v1/feynman/archive` | All FeynmanResponse records for the learner (desc), joined with MissionSession |
| `POST` | `/api/v1/conversation/message` | Stateless conversation turn — send full `messageHistory`; empty array = opening message |
| `POST` | `/api/v1/learner/batman-skip` | Use the weekly skip day (requires batmanModeActive=true, batmanSkipUsedThisWeek=false) |
| `POST` | `/api/v1/content/sr-review` | Bulk batch review — `{ reviews: { itemId, wasCorrect }[] }` — processes SM-2 for all items, increments Brain Compound Meter, returns `{ updatedItems, newBrainCompoundPct, deepMissionUnlocked }` |

## Constants

`client/src/constants/scenarios.ts` — scenario map and Feynman prompt map keyed by module number (modules 1–6).

## Mission Flow API Wiring

- **WarmupFlash**: calls `missionStore.loadDailyQueue()` → reads `srStore.dailyQueue`; calls `srStore.markReviewed(id, correct)` on each card
- **CoreDrop**: calls `missionStore.loadModuleContent(level, module)` → reads `missionStore.moduleContent`; Roman Urdu toggle persisted in `uiStore.romanUrduEnabled`
- **ApplyIt**: reads scenario from `getScenario(currentModule)` (static map)
- **FeynmanMoment**: calls `missionStore.submitFeynmanResponse(text)` → `POST /api/v1/feynman/evaluate`; displays real scores/feedback/gaps; calls `completeMission()` → `PUT /api/v1/mission/:id/complete`

## Spaced Repetition Engine (`server/src/services/srEngine.ts`)

All SR logic lives in one service with four exported functions:

| Function | When called | What it does |
|---|---|---|
| `initializeSRQueue(learnerId, items)` | On onboarding complete, on module unlock, on gate pass | Creates `SRQueueItem` for each `ContentItem`; Power Pack items start with easeFactor=2.7, regular=2.5; nextReviewDate=tomorrow |
| `processReview(learnerId, itemId, wasCorrect)` | Inside `POST /api/v1/content/sr-review` | SM-2: correct → interval=min(180, round(interval×ease)), ease=min(3.5, ease+0.1), gap=false; incorrect → interval=1, ease=max(1.3, ease-0.2), gap unchanged |
| `markAsKnowledgeGap(learnerId, itemId)` | Called by Feynman evaluator when gap items detected | Sets isKnowledgeGap=true, nextReviewDate=tomorrow |
| `getDailyQueue(learnerId, limit=20)` | Backing service for `GET /api/v1/content/sr-queue/today` | Returns items due today, sorted: gaps → Power Pack → date |
| `calculateBrainCompoundDrain(learnerId)` | On demand / scheduled | If no SR review in 3+ days, drains brainCompoundPct by 5/day (min 0) |

**Brain Compound Meter** on bulk review: `increment = min(10, (correct/total) × 3)`. Capped at 100. When it first hits 100 the response includes `deepMissionUnlocked: true`.

**Auto-seeding**: `initializeSRQueue` is called automatically from three places:
- `completeOnboarding` → seeds module 1 of placement level
- `completeModule` → seeds next module when it unlocks
- `submitGate` → seeds module 1 of the next level on gate pass

## Batman Mode

A reward system for learners who maintain long streaks:

- **Activation**: triggered when `streak % 7 === 0` (7, 14, 21... days) on mission completion. Once active, stays active permanently.
- **Skip Day**: one streak-protecting skip per week. If `batmanSkipUsedThisWeek=true` and no yesterday completion but there IS a 2-days-ago completion, streak increments instead of resetting to 1.
- **Weekly Reset**: on Monday, `batmanSkipUsedThisWeek` resets to `false` and `batmanModeWeekStart` updates.
- **Cinematic**: full-screen `BatmanMode.tsx` animation fires on first activation (triggered in `DayClose.tsx`).
- **Dashboard**: `MasteryMap.tsx` DashboardPanel shows 🦇 badge + skip button when `batmanModeActive=true` in `progressStore`.
- **Client state**: `progressStore` holds `batmanModeActive` and `batmanSkipUsedThisWeek`; `setBatmanState` action updates both.
- **Color**: `brand-purple` = `#A855F7` in Tailwind config.

## Notification & Scheduler System

### emailService (`server/src/services/emailService.ts`)

Two functions built on Resend. Both silently no-op when `RESEND_API_KEY` is not set (Resend client is lazily instantiated via `getResend()`).

| Function | Recipient | Trigger |
|---|---|---|
| `sendMissedDaysAlert(learnerEmail, accountabilityEmail, learnerName, daysMissed, whyMotivation?)` | Accountability partner | Learner missed exactly 3 consecutive days |
| `sendDailyReminder(learnerEmail, learnerName, sessionType, sessionTime, streak?)` | Learner | Daily morning / evening cron |

### schedulerService (`server/src/services/schedulerService.ts`)

Uses `node-cron`. Three jobs, all expressed in UTC (PKT = UTC+5):

| Cron (UTC) | PKT time | Job |
|---|---|---|
| `59 18 * * *` | 11:59 PM PKT | Missed-day check — finds learners whose `lastActiveDt` was exactly 3 days ago AND have `accountabilityEmail` set; sends one alert per learner |
| `0 3 * * *` | 8:00 AM PKT | Morning reminders — finds all onboarded learners who have no COMPLETE MORNING session today; sends reminder email |
| `0 15 * * *` | 8:00 PM PKT | Evening reminders — same logic for EVENING sessions |

The scheduler is started in `server.ts` inside the `app.listen` callback via `startScheduler()`. All individual email send errors are caught and logged — one failure does not affect the rest.

### Resend lib (`server/src/lib/resend.ts`)

Lazily instantiated via `getResend()`. Returns `null` when `RESEND_API_KEY` is not set, allowing the server to start in development without email credentials.

## Client-Side Error Handling & UI Enhancements

### ErrorBoundary (`client/src/components/ui/ErrorBoundary.tsx`)
Class component that wraps the entire app (in `App.tsx`). On uncaught render errors it shows a full-screen fallback with "Try Again" (resets state) and "Back to Map" buttons. Accepts optional `fallback` prop for custom fallback UI.

### Toast System
- **Hook**: `client/src/hooks/useToast.ts` — Zustand-based store. `useToast()` returns `{ success, error, info, warning }` helpers. Toasts auto-dismiss after 4 seconds with a progress bar animation.
- **Container**: `client/src/components/ui/Toast.tsx` — `<ToastContainer />` renders in `AppRouter.tsx`. Top-right fixed position, `z-[9999]`. AnimatePresence handles enter/exit springs. Each toast has a color-coded left indicator bar, icon, message, and dismiss button.
- **Integrations**: Login, Register (errors), FeynmanMoment (evaluate errors + complete warnings), ConversationSim (AI timeout warnings).

### Skeleton Components (`client/src/components/ui/Skeleton.tsx`)
- `<Skeleton className h rounded />` — base pulsing block
- `<SkeletonText lines className />` — N rows of text, last line 2/3 width
- `<SkeletonCard />` — card with header + text rows
- `<SkeletonStatRow />` — 4-column stat card row (used in Progress page)

### Page-Level Loading States
- **MasteryMap**: local `isLoading` state; shows `<MapSkeleton>` (circular skeleton nodes at Z-pattern positions) on desktop, stacked circular skeletons on mobile, while `loadMasteryMap()` resolves.
- **Progress**: local `isLoading` state; shows `<SkeletonStatRow>` while `loadStats()` and `loadMasteryMap()` resolve.
- **FeynmanArchive**: loading spinner replaced with 3 animated skeleton cards matching the real card structure.

### Improved Empty States
- **FeynmanArchive**: "Your Feynman journey starts here. Complete your first morning mission to capture your very first explanation."
- **Leaderboard**: "No submissions this week yet. Be the first to share your explanation and claim the top spot!"

## Notes

- Vite runs on port **5000** (adjusted from 5173 for Replit preview pane compatibility); the dev server proxies `/api/*` to Express on port **3000**
- Tailwind custom color/font tokens are fully configured — see Design System section above
- Environment variables: JWT_SECRET, JWT_REFRESH_SECRET, DATABASE_URL, PORT, CLIENT_URL are set; OPENAI_API_KEY and RESEND_API_KEY are optional (Feynman returns a fallback score when OpenAI is absent)
- The OpenAI client is lazily instantiated — the server starts without OPENAI_API_KEY; add it to enable AI evaluation
- Auth bug fixed: all controllers now correctly read `req.learnerId` (set by auth middleware) instead of the non-existent `req.userId`
