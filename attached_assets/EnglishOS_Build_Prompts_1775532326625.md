# EnglishOS — Complete Build Prompt Workflow
**For use with: Replit AI Coding Agent**  
**Reference Document:** EnglishOS Master PRD v2.0 — Power Edition  
**Total Phases:** 10 | **Total Prompts:** 87  
**Build Order:** Sequential — complete each prompt before moving to the next

> **How to use this file:** Copy each numbered prompt exactly as written and paste it into the Replit AI Coding Agent chat. Wait for the agent to finish each prompt before starting the next one. Prompts are designed to build on each other — do not skip steps.

---

## Table of Contents

- [Phase 1 — Project Setup and Architecture](#phase-1--project-setup-and-architecture)
- [Phase 2 — UI/UX Design and Page Structure](#phase-2--uiux-design-and-page-structure)
- [Phase 3 — Database Schema and Backend Logic](#phase-3--database-schema-and-backend-logic)
- [Phase 4 — Authentication and User Management](#phase-4--authentication-and-user-management)
- [Phase 5 — Core Learning Engine and Feature Modules](#phase-5--core-learning-engine-and-feature-modules)
- [Phase 6 — Gamification System](#phase-6--gamification-system)
- [Phase 7 — Spaced Repetition and Progress Tracking](#phase-7--spaced-repetition-and-progress-tracking)
- [Phase 8 — Testing and Debugging](#phase-8--testing-and-debugging)
- [Phase 9 — Deployment and Production Optimization](#phase-9--deployment-and-production-optimization)
- [Phase 10 — SEO and Performance Improvements](#phase-10--seo-and-performance-improvements)

---

## Phase 1 — Project Setup and Architecture

*Establish the full project structure, install all dependencies, and configure the development environment before writing any feature code.*

---

### 1.1 — Initialize the Project

```
Create a full-stack web application called EnglishOS using the following stack:

Frontend: React 18 with TypeScript, Vite as the build tool
Styling: Tailwind CSS with a custom design system
Animation: Framer Motion
State management: Zustand
Backend: Node.js with Express and TypeScript
Database: PostgreSQL using Prisma ORM
Authentication: JWT with refresh token rotation
AI integration: OpenAI API (GPT-4o)
Email: Resend
Analytics: PostHog

Set up the project as a monorepo with two workspaces:
- /client — the React frontend
- /server — the Express backend

Initialize both workspaces with TypeScript, configure tsconfig.json for both, and install all listed dependencies. Set up the Vite dev server on port 5173 and the Express server on port 5000. Configure Tailwind CSS with a custom config file (do not use default Tailwind colors — we will add a custom palette in the next step). Create a basic folder structure for both client and server following separation of concerns. Do not write any feature code yet.
```

---

### 1.2 — Configure the Design Token System

```
In the EnglishOS project, configure the Tailwind CSS design token system using the following exact values. Update tailwind.config.ts to extend the default theme with these custom tokens:

COLORS:
  bg-primary: #0A0A0F
  bg-secondary: #111118
  bg-tertiary: #1A1A28
  border-subtle: #2A2A3E
  border-strong: #3A3A5A
  brand-red: #E94560
  brand-blue: #4A9EFF
  brand-gold: #F5B014
  brand-green: #2ECC71
  text-primary: #FFFFFF
  text-secondary: #C8C8E0
  text-muted: #6A6A8A

FONTS:
  display: 'Space Grotesk'
  body: 'Inter'
  mono: 'JetBrains Mono'

Add Google Fonts import for Space Grotesk, Inter, and JetBrains Mono in the global CSS file.

SPACING: Use the default Tailwind spacing scale (8px base grid).

Set the default background color of the app to bg-primary (#0A0A0F) and the default text color to text-secondary (#C8C8E0) in the global CSS.

Do not create any pages or components yet.
```

---

### 1.3 — Set Up Environment Variables

```
In the EnglishOS project, set up environment variable handling for both client and server.

For the server, create a .env.example file with the following variables:
  DATABASE_URL=
  JWT_SECRET=
  JWT_REFRESH_SECRET=
  OPENAI_API_KEY=
  RESEND_API_KEY=
  POSTHOG_API_KEY=
  NODE_ENV=development
  PORT=5000
  CLIENT_URL=http://localhost:5173

For the client, create a .env.example file with:
  VITE_API_BASE_URL=http://localhost:5000
  VITE_POSTHOG_KEY=

Create a server-side config module at server/src/config/env.ts that reads, validates (throw an error if required variables are missing), and exports all environment variables as typed constants.

Create a client-side config module at client/src/config/env.ts that reads and exports the Vite environment variables.

Do not connect to any actual services yet — just set up the config layer.
```

---

### 1.4 — Define the Full Folder Structure

```
In the EnglishOS project, create the complete folder structure for both client and server. Do not write any code inside the files — just create the folder hierarchy with empty index files or placeholder comments where needed.

SERVER folder structure:
  server/src/
    config/          (env, database, openai)
    controllers/     (auth, learner, content, mission, feynman, progress, leaderboard, notification)
    middleware/       (auth, errorHandler, rateLimiter, validator)
    models/          (prisma schema lives at root of server)
    routes/          (auth, learner, content, mission, feynman, progress, leaderboard)
    services/        (srEngine, feynmanEvaluator, conversationSim, emailService, analyticsService)
    utils/           (jwt, dateHelpers, queueHelpers)
    types/           (global type definitions)
    app.ts           (Express app setup)
    server.ts        (entry point)

CLIENT folder structure:
  client/src/
    components/
      ui/            (Button, Card, Badge, ProgressBar, Toggle, Modal, Tooltip)
      layout/        (AppShell, Sidebar, Header, Footer)
      map/           (MasteryMap, LevelNode, PathLine)
      mission/       (MissionShell, WarmupFlash, CoreDrop, ApplyIt, FeynmanMoment, StoryReplay, SentenceBuilder, ConversationSim, DayClose)
      gamification/  (XPCounter, BrainCompoundMeter, StreakBadge, BatmanMode, ProfileCard, BadgeGrid)
      onboarding/    (DiagnosticStep, WhySelection, StakesSetup, MapReveal)
      feynman/       (FeynmanPrompt, FeynmanArchive, FeynmanLeaderboard)
      content/       (VocabCard, AlphabetCard, GrammarRuleCard, PowerPackBadge, AudioPlayer)
    pages/
      Landing.tsx
      Onboarding.tsx
      Dashboard.tsx
      MasteryMap.tsx
      Mission.tsx
      Progress.tsx
      FeynmanArchive.tsx
      Leaderboard.tsx
      LevelGate.tsx
      Profile.tsx
      NotFound.tsx
    hooks/           (useAuth, useMission, useSRQueue, useFeynman, useProgress, useGamification)
    stores/          (authStore, missionStore, progressStore, srStore, uiStore)
    services/        (api, authApi, contentApi, missionApi, feynmanApi, progressApi)
    utils/           (formatters, dateHelpers, audioHelpers)
    types/           (global TypeScript type definitions)
    router/          (AppRouter with protected routes)
    App.tsx
    main.tsx

Confirm the structure is created and ready.
```

---

### 1.5 — Set Up the API Client

```
In the EnglishOS client, build the base API client at client/src/services/api.ts.

Requirements:
- Use the native Fetch API (no Axios)
- Read the base URL from VITE_API_BASE_URL environment variable
- Automatically attach the JWT access token from localStorage to every request Authorization header as Bearer token
- Handle 401 responses by attempting a refresh token call to POST /auth/refresh, storing the new access token, and retrying the original request once
- If the refresh fails, clear tokens and redirect to /login
- Export a typed api object with methods: get<T>, post<T>, put<T>, patch<T>, delete<T> — each accepting a path and optional body/options
- All methods return a Promise that resolves to the typed response data or throws a typed ApiError with status and message

Do not connect to a real backend yet — just build the client correctly.
```

---

### 1.6 — Configure the Express Server and Middleware

```
In the EnglishOS server, set up the Express application in server/src/app.ts.

Requirements:
- Enable CORS for the CLIENT_URL environment variable
- Parse JSON bodies with a 10mb limit
- Apply rate limiting: 100 requests per 15 minutes per IP (use express-rate-limit)
- Set security headers (use helmet)
- Add a global error handler middleware that catches all thrown errors and returns { success: false, message, statusCode } JSON
- Add a request logger in development mode only (use morgan)
- Mount all route groups under /api/v1/:
    /api/v1/auth
    /api/v1/learner
    /api/v1/content
    /api/v1/mission
    /api/v1/feynman
    /api/v1/progress
    /api/v1/leaderboard
    /api/v1/notifications
- Add a health check endpoint at GET /health that returns { status: "ok", timestamp }
- Export the app (do not call listen here — that happens in server.ts)

In server/src/server.ts, import app and start listening on PORT from the config.
```

---

## Phase 2 — UI/UX Design and Page Structure

*Build every page and reusable component with the full visual design system. No backend connections yet — use static placeholder data.*

---

### 2.1 — Build the Core UI Component Library

```
In the EnglishOS client, build the following reusable UI components in client/src/components/ui/. Use Tailwind CSS utility classes with the custom design tokens configured in Phase 1. All components must be fully typed with TypeScript.

Build these components:

Button — variants: primary (brand-red fill), secondary (ghost, border-subtle), ghost (no border), danger (red). Sizes: sm, md, lg. States: loading (spinner), disabled (opacity 0.4).

Card — base card with bg-tertiary background, border-subtle border, 16px border-radius, and configurable padding. Variant: "power-pack" adds a brand-gold border and a ⭐ Power Pack badge in the top-right corner.

Badge — small pill label. Variants: red, blue, gold, green, muted. Sizes: sm, md.

ProgressBar — horizontal bar. Props: value (0-100), color (defaults to brand-blue), label (optional text above), animated (smooth width transition).

Toggle — on/off switch. Animated thumb. Used for the Roman Urdu toggle. Props: checked, onChange, label.

Modal — centered overlay with dark backdrop (blur). Props: isOpen, onClose, title, children, footer.

AudioPlayer — minimal play button that plays an audio URL on click. Animated waveform while playing.

Tooltip — appears on hover above an element. Props: content, children.

PowerPackBadge — a small gold badge component with star icon and "Power Pack" text. Used independently.

All components must use Framer Motion for their hover/active/enter/exit animations.
```

---

### 2.2 — Build the Landing Page

```
In the EnglishOS client, build the Landing page at client/src/pages/Landing.tsx.

The landing page must have these sections in order:

HERO SECTION:
  - Dark full-screen background with a subtle radial red glow behind the headline
  - Badge label: "Powered by Polymath Methodology"
  - Main headline: "EnglishOS" with "OS" in brand-red
  - Subheadline: "Not a language app. An operating system for learning English."
  - Supporting text: "300 days. 1 hour a day. Fluent English. Built for South Asian learners."
  - Two CTAs: "Start Your Journey" (primary button, routes to /onboarding) and "See How It Works" (ghost button, smooth scrolls to methodology section)
  - Four stat badges: "800M+ South Asian learners", "4 Proven Methodologies", "300-Day Roadmap", "AI-Powered Practice"

METHODOLOGY SECTION:
  - Section title: "Built on Learning Science, Not Guesswork"
  - Four cards in a 2×2 grid — one for each: DiSS Framework, Feynman Technique, Spaced Repetition, Serial Mastery
  - Each card has an icon, title, one-line description, and a brief explanation of how it appears in the app

JOURNEY MAP PREVIEW:
  - A simplified visual of the 6-level journey: Base Camp → Village → Town → City → Capital → World Stage
  - Each location shown as a node on a horizontal path (desktop) or vertical path (mobile)
  - Days count shown under each node

SOCIAL PROOF SECTION:
  - Section title: "Why EnglishOS is Different"
  - Comparison table: EnglishOS vs Duolingo vs British Council showing the differentiators from the PRD

CTA FOOTER:
  - Full-width dark section with "Begin your 300-day journey today" headline and "Start Free" button

The page must be fully responsive. Use Framer Motion for scroll-triggered entrance animations on each section.
```

---

### 2.3 — Build the Onboarding Flow

```
In the EnglishOS client, build the Onboarding page at client/src/pages/Onboarding.tsx as a multi-step wizard.

The wizard has 5 steps with a step indicator bar at the top showing progress.

STEP 1 — Language Diagnostic:
  - Title: "Let's find your starting point"
  - Large textarea prompt: "Tell us anything about yourself in English — any words or sentences you know. Don't worry about mistakes."
  - Submit button: "Analyse My English"
  - After submit: show a loading state ("Analysing your English...") for 2 seconds, then show the result card: "Based on your response, we recommend starting at Level [X]" with a brief explanation. Confirm or adjust level buttons.

STEP 2 — My Why:
  - Title: "Why do you want to learn English?"
  - 6 selectable cards (single select): Job Interview, Career Growth, Social Confidence, Study Abroad, Talking to Family Abroad, Building a Business
  - "Other" free text option
  - Selected card gets brand-red border and checkmark

STEP 3 — Daily Commitment:
  - Title: "When will you learn?"
  - Morning session time picker: 3 preset options (7am, 8am, 9am) + custom
  - Evening session time picker: 3 preset options (7pm, 8pm, 9pm) + custom
  - Info banner: "We recommend 20 min morning + 40 min evening = 1 hour total"

STEP 4 — Stakes Setup:
  - Title: "Set your stake. Your brain works harder when something is on the line."
  - Brief explanation of the DiSS Stakes principle (2 sentences)
  - Accountability partner email input (optional but highlighted as recommended)
  - Personal commitment statement textarea (required)
  - Checkbox: "Notify my partner if I miss 3 days in a row"
  - Cannot advance without filling the commitment statement

STEP 5 — Map Reveal:
  - Full-screen dark background
  - Animated reveal: the 6-level Mastery Map fades in with a cinematic pan effect
  - Each level node lights up sequentially (0.4s delay between each)
  - Learner's starting level pulses with a brand-red glow
  - "Begin Mission 1" button appears after the animation completes

Store all onboarding data in Zustand uiStore for now. Wire to API in Phase 4.
```

---

### 2.4 — Build the Mastery Map Page

```
In the EnglishOS client, build the Mastery Map page at client/src/pages/MasteryMap.tsx and its child components in client/src/components/map/.

The Mastery Map is the PRIMARY home screen of the app after login.

LAYOUT:
  - Full-screen dark canvas with a subtle illustrated world map background (use CSS gradients and geometric shapes to simulate this — no image files needed)
  - The map shows 6 level nodes connected by an animated glowing path
  - On desktop: nodes arranged in a Z-pattern (left-right-left across 3 rows of 2)
  - On mobile: nodes stacked vertically in a single column

LEVEL NODE COMPONENT (client/src/components/map/LevelNode.tsx):
  - Props: level (1-6), name, days, status (locked | active | complete)
  - Active: 80px circle, pulsing glow animation (brand-red), level name below, "Day X of Y" badge
  - Complete: green glow, checkmark badge overlay, path to next node is lit in green
  - Locked: semi-transparent, lock icon in center, silhouette style
  - Clicking an active or complete node opens a Level Detail drawer

PATH LINE COMPONENT (client/src/components/map/PathLine.tsx):
  - Animated dashed line connecting nodes
  - Complete path segments: solid green with animated shimmer
  - Upcoming path segments: dashed brand-blue
  - Locked path segments: dashed border-subtle

LEVEL DETAIL DRAWER:
  - Slides in from the right
  - Shows: level name, total days, modules list with completion status, "Continue Mission" button (active level) or "View Summary" button (complete level)

DASHBOARD PANEL:
  - Pinned to bottom of screen (mobile) or right sidebar (desktop)
  - Shows: current streak with fire emoji, Brain Compound Meter progress bar, today's Morning Mission status (complete/pending), today's Evening Mission status (complete/pending), My Why reminder text

Use static placeholder data for all values. Wire to API in Phase 7.
```

---

### 2.5 — Build the Mission Shell and Morning Mission

```
In the EnglishOS client, build the Mission page at client/src/pages/Mission.tsx and the Morning Mission components in client/src/components/mission/.

MISSION SHELL (MissionShell.tsx):
  - Full-screen layout with a fixed top bar showing: back button, mission type ("Morning Mission" or "Evening Mission"), phase progress bar (4 segments for Morning, 4 segments for Evening), and phase name (current phase highlighted)
  - Phase transitions use a horizontal slide-left animation (250ms, ease-in-out)
  - Cannot navigate backwards between phases

PHASE 1 — WARM-UP FLASH (WarmupFlash.tsx):
  - Title: "Warm-Up — Quick Review"
  - Shows 5 flashcard-style cards one at a time
  - Each card: English word/phrase on front, flip to reveal Roman Urdu meaning + example sentence
  - Card flip animation: 3D Y-axis flip (300ms)
  - After flip: two buttons — "Got it ✓" (green) and "Review Again ✗" (red)
  - Progress indicator: "Card 2 of 5"
  - After all 5 cards: auto-advance to Phase 2 with a small XP reward toast (+20 XP)

PHASE 2 — CORE DROP (CoreDrop.tsx):
  - Title: "Today's Lesson"
  - Power Pack items shown first with the PowerPackBadge component
  - Each content card shows: English word/phrase, pronunciation guide, Roman Urdu toggle (Toggle component), example sentence, AudioPlayer button
  - Navigation: previous/next arrows; dot indicators at bottom
  - Roman Urdu toggle state persists across all cards in the session

PHASE 3 — APPLY IT (ApplyIt.tsx):
  - Title: "Apply It — Real Situation"
  - Shows a scenario description in a card (e.g., "You are at a restaurant. Order food in English.")
  - A text input for the learner to write their response
  - Submit button
  - After submit: show a model response for comparison with a "How did you do?" self-assessment (thumbs up / thumbs down)

PHASE 4 — FEYNMAN MOMENT (FeynmanMoment.tsx):
  - Title: "Feynman Moment — Explain It Simply"
  - Prompt text displayed in a highlighted card: "Explain [today's concept] as if you're telling a 10-year-old. Use simple words."
  - Two input options with tab selector: Text (textarea) and Voice (microphone button — placeholder for now, just shows "Coming soon" in v1.0)
  - Submit button: "Evaluate My Explanation"
  - After submit: loading state ("Checking your explanation...") then a result card showing: Clarity Score (animated number count-up), Vocabulary Score, Relevance Score, Feedback message, Knowledge Gap words list (in red badges)
  - Complete Mission button after seeing results

Use static/mock data for all content. Wire to the SR engine and API in Phase 5 and 7.
```

---

### 2.6 — Build the Evening Mission Components

```
In the EnglishOS client, build the Evening Mission components in client/src/components/mission/.

PHASE 1 — STORY REPLAY (StoryReplay.tsx):
  - Title: "Story Time — Practice in Context"
  - Visual novel style layout: illustrated scene card (use colored abstract gradients as scene backgrounds for now), dialogue text, speaker label
  - Story progresses panel by panel with a "Next" button
  - At 2 choice points in the story, show two option buttons — selecting either continues the story (both choices are valid; the story acknowledges the choice)
  - All vocabulary in the story that the learner has learned is highlighted with a subtle underline — clicking shows the Roman Urdu meaning in a tooltip

PHASE 2 — SENTENCE BUILDER (SentenceBuilder.tsx):
  - Title: "Build a Sentence"
  - SVO formula header always visible at the top: [SUBJECT] + [VERB] + [OBJECT]
  - Mode tabs: Positive | Negative | Question
  - Word tiles displayed in a shuffled pool at the bottom
  - Drop zones at the top for Subject, Verb, Object (with "?" zone for question form helper words)
  - Drag-and-drop word tiles into the drop zones (use @dnd-kit/core for drag-and-drop)
  - Submit button: validate the sentence. Correct: green flash + checkmark animation. Incorrect: red shake animation + show the correct answer
  - 5 sentences per session, each slightly more complex than the last
  - XP toast after each correct sentence

PHASE 3 — CONVERSATION SIMULATOR (ConversationSim.tsx):
  - Title: "Conversation Practice"
  - Chat interface: messages displayed in bubbles (AI on left in dark card, learner on right in brand-red/20% background)
  - AI sends the first message automatically
  - Learner types their reply in a text input at the bottom with a send button
  - AI responses arrive with a brief typing indicator animation (3 animated dots)
  - If the learner's response is off-topic, the AI shows: "I didn't quite get that. Can you try saying it differently?"
  - Scenario label shown at top of chat: e.g., "Scenario: Introducing yourself"
  - 15-minute timer shown in the top bar; auto-completes when time runs out

PHASE 4 — DAY CLOSE (DayClose.tsx):
  - Title: "Mission Complete"
  - Full-screen celebration: animated confetti burst (use canvas-confetti)
  - Summary card: XP earned today, streak count, Brain Compound Meter current value
  - Tomorrow's review preview: "You have [N] cards to review tomorrow" with a list of up to 3 example words
  - My Why reminder: "Every session brings you closer to [user's Why]"
  - "Return to Map" button
```

---

### 2.7 — Build the Progress and Profile Pages

```
In the EnglishOS client, build the remaining pages.

PROGRESS PAGE (client/src/pages/Progress.tsx):
  - Header: "Your Growth"
  - Stats row (4 cards): Total Days Active, Current Streak, Total XP, Brain Compound %
  - Mastery Map thumbnail with current position (reuse the map component in a smaller container)
  - Level progress section: for each level show a progress bar with modules completed / total
  - Feynman Score chart: a simple line chart using recharts showing clarity score over the last 30 days
  - Badge wall: grid of all earned badges with name and date earned; locked badges shown as gray silhouettes

FEYNMAN ARCHIVE PAGE (client/src/pages/FeynmanArchive.tsx):
  - Title: "Your Feynman Journey"
  - Intro text: "Watch your own understanding grow over time."
  - List of past Feynman responses in reverse chronological order
  - Each entry shows: date, module name, the prompt, the response (truncated with expand toggle), clarity score badge, knowledge gap words
  - Score trend indicator: arrow up/down compared to previous entry

LEADERBOARD PAGE (client/src/pages/Leaderboard.tsx):
  - Title: "Feynman Leaderboard — This Week"
  - Weekly cycle indicator: "Week of [date]"
  - Top 3 entries displayed prominently with rank (1st, 2nd, 3rd) and gold/silver/bronze styling
  - List of all other entries with rank, learner name (anonymized to first name + last initial), module explained, score
  - Submit button: "Submit My Best Explanation This Week" — opens a modal with the submission form

LEVEL GATE PAGE (client/src/pages/LevelGate.tsx):
  - Full-screen focus mode (no sidebar or nav)
  - Title: "Level [X] Gate — Prove Your Mastery"
  - Progress bar across the top showing questions answered / total
  - Each question presented one at a time in a card
  - Question types: vocabulary recall (text input), grammar rule (multiple choice), sentence identification (correct/incorrect toggle)
  - After all questions: score reveal screen with pass/fail state
  - Pass (≥70%): celebration animation → "Begin Level Wrap" button
  - Fail (<70%): breakdown showing which modules need review → "Go Back and Review" button → 24-hour cooldown timer shown

PROFILE PAGE (client/src/pages/Profile.tsx):
  - Polymath Profile Card preview (visual card component matching the spec in the PRD)
  - Account settings: name, email (read only), notification times, Roman Urdu default preference
  - Stakes section: view current stake, update stake button (with confirmation modal)
  - My Why: displayed with an edit option
  - Export Profile Card button (placeholder in v1.0)
  - Danger zone: Delete Account (with confirmation modal)

Use static data for all pages. Wire to APIs in later phases.
```

---

### 2.8 — Build the App Router and Navigation Shell

```
In the EnglishOS client, build the application routing and navigation.

APP ROUTER (client/src/router/AppRouter.tsx):
  - Use React Router v6
  - Public routes (no auth required): / (Landing), /onboarding, /login, /register
  - Protected routes (auth required, redirect to /login if not authenticated): /map (MasteryMap), /mission/:type (morning or evening), /progress, /feynman-archive, /leaderboard, /level-gate/:level, /profile
  - Redirect / to /map if user is authenticated
  - Show a full-screen loading spinner while checking auth status on first load
  - Add a NotFound page for unmatched routes

APP SHELL (client/src/components/layout/AppShell.tsx):
  - Only shown on protected routes
  - Bottom navigation bar on mobile: icons + labels for Map, Mission, Progress, Profile
  - Left sidebar on desktop (collapsed by default, expands on hover): same 4 navigation items
  - Top bar on all screen sizes: EnglishOS logo, current streak badge (fire emoji + count), Brain Compound Meter mini (small horizontal bar), notifications bell icon
  - The map page is full-screen and hides the top bar

ZUSTAND STORES — set up the following stores now (empty with typed state shapes, no logic yet):
  - authStore: user, accessToken, isAuthenticated, isLoading
  - missionStore: currentMission, currentPhase, phaseData, xpEarned, isComplete
  - progressStore: learnerProfile, levelProgress, totalXP, streak, brainCompoundPct, badges
  - srStore: dailyQueue, reviewedToday, pendingCount
  - uiStore: romanUrduEnabled, onboardingData, sidebarOpen, activeModal

Wire the router to App.tsx and confirm all pages render without errors.
```

---

## Phase 3 — Database Schema and Backend Logic

*Define the complete database schema, seed the content, and build all API route handlers.*

---

### 3.1 — Define the Prisma Schema

```
In the EnglishOS server, create the complete Prisma schema at server/prisma/schema.prisma.

Define the following models exactly:

Learner:
  id, email (unique), passwordHash, name, levelCurrent (Int, default 1), whyMotivation, stakesStatement, accountabilityEmail (optional), morningSessionTime, eveningSessionTime, streak (Int default 0), batmanModeActive (Boolean default false), xp (Int default 0), rank (String default "Rookie"), brainCompoundPct (Float default 0), lastActiveDt (DateTime optional), createdAt, updatedAt

ContentItem:
  id, level (Int), module (Int), groupName (String), type (enum: VOCAB, GRAMMAR, SENTENCE, PHRASE, ALPHABET), english, urduRoman, audioUrl (optional), exampleSentence, isPowerPack (Boolean), sortOrder (Int), createdAt

SRQueueItem:
  id, learnerId (FK Learner), itemId (FK ContentItem), intervalDays (Int default 1), nextReviewDate (DateTime), easeFactor (Float default 2.5), correctCount (Int default 0), incorrectCount (Int default 0), isKnowledgeGap (Boolean default false), lastReviewedAt (DateTime optional)
  Unique constraint: [learnerId, itemId]

MissionSession:
  id, learnerId (FK Learner), sessionDate (DateTime), type (enum: MORNING, EVENING), status (enum: NOT_STARTED, IN_PROGRESS, COMPLETE), xpEarned (Int default 0), feynmanScore (Float optional), feynmanText (String optional), completedAt (DateTime optional), createdAt

LevelProgress:
  id, learnerId (FK Learner), level (Int), module (Int), status (enum: LOCKED, ACTIVE, COMPLETE), gateScore (Float optional), gateAttempts (Int default 0), unlockedAt (DateTime optional), completedAt (DateTime optional)
  Unique constraint: [learnerId, level, module]

Badge:
  id, learnerId (FK Learner), badgeType (String), module (Int optional), earnedAt (DateTime)

FeynmanResponse:
  id, learnerId (FK Learner), missionId (FK MissionSession), module (Int), prompt (String), responseText (String optional), clarityScore (Float optional), vocabScore (Float optional), relevanceScore (Float optional), knowledgeGapItems (String[] — array of word strings), createdAt

RefreshToken:
  id, learnerId (FK Learner), token (String unique), expiresAt (DateTime), createdAt

LeaderboardEntry:
  id, learnerId (FK Learner), week (String — ISO week format "2026-W14"), module (Int), prompt, responseText, clarityScore (Float), submittedAt (DateTime), upvoteCount (Int default 0)

Run prisma generate and prisma migrate dev to create the initial migration.
```

---

### 3.2 — Seed the Content Database

```
In the EnglishOS server, create a database seed file at server/prisma/seed.ts.

Seed ContentItem records for Level 1, Module 1 (Alphabets) and Level 1, Module 2 (Core 100 Words) using the following data from the course:

MODULE 1 — ALPHABETS (level: 1, module: 1):
  Mark these as Power Pack (isPowerPack: true): A, E, I, O, U (vowels)
  Mark these as standard (isPowerPack: false): all 21 consonants B through Z
  Each record: english = the letter, urduRoman = the Urdu sound name (e.g., "Ae ki awaaz"), exampleSentence = the example word (e.g., "Apple"), type = ALPHABET
  Sort vowels first (sortOrder 1-5), consonants after (sortOrder 6-26)

MODULE 2 — CORE 100 WORDS (level: 1, module: 2):
  Group A — Pronouns (12 words): I, You, He, She, It, We, They, Me, Him, Her, Us, Them — isPowerPack: true
  Group B — Be Verbs (5 words): am, is, are, was, were — isPowerPack: true
  Group C — Action Verbs (50 words): go, come, eat, drink, sleep, wake, sit, stand, run, walk, see, look, hear, listen, speak, say, tell, ask, know, think, want, need, get, give, take, make, do, have, use, find, try, feel, love, like, help, work, play, read, write, learn, understand, remember, forget, start, stop, open, close, buy, pay, live, travel — isPowerPack: true
  Group D — Nouns (28 words): man, woman, boy, girl, child, baby, family, friend, mother, father, brother, sister, teacher, student, doctor, school, home, room, city, country, time, day, year, week, morning, evening, night, water — isPowerPack: false
  Group E — Adjectives (22 words): good, bad, big, small, new, old, happy, sad, hot, cold, fast, slow, easy, hard, right, wrong, clean, dirty, beautiful, ugly, important, interesting — isPowerPack: false
  Group F — Connectors (18 words): and, but, or, because, so, if, when, before, after, with, without, for, in, on, at, to, from, about — isPowerPack: true

Include the Roman Urdu meaning for every word (use the meanings from the PRD course content).

Run the seed with prisma db seed.
```

---

### 3.3 — Build the Content API

```
In the EnglishOS server, build the content controller and routes.

File: server/src/controllers/content.controller.ts

Implement the following endpoint handlers:

GET /api/v1/content/module/:level/:module
  - Returns all ContentItem records for the specified level and module
  - Sorts Power Pack items first (isPowerPack DESC), then by sortOrder
  - Requires authentication (protected route)
  - Response: { success: true, data: ContentItem[] }

GET /api/v1/content/item/:id
  - Returns a single ContentItem by ID
  - Response: { success: true, data: ContentItem }

GET /api/v1/content/levels
  - Returns a summary of all levels and modules with total item counts
  - Response: { success: true, data: LevelSummary[] }

GET /api/v1/content/sr-queue/today
  - Returns all SRQueueItems for the authenticated learner where nextReviewDate <= today
  - Joins with ContentItem to include the full content data
  - Knowledge Gap items always appear first
  - Power Pack items appear before regular items within the same priority group
  - Limits to 20 items maximum
  - Response: { success: true, data: SRQueueItemWithContent[] }

Create the route file server/src/routes/content.routes.ts and mount all handlers. Apply the auth middleware to all routes.
```

---

### 3.4 — Build the Mission API

```
In the EnglishOS server, build the mission controller and routes.

File: server/src/controllers/mission.controller.ts

Implement:

POST /api/v1/mission/start
  - Body: { type: "MORNING" | "EVENING" }
  - Check if a mission of this type already exists for today for this learner
  - If yes and status is COMPLETE, return error: "Mission already completed today"
  - If yes and status is IN_PROGRESS, return the existing mission
  - If no, create a new MissionSession record with status IN_PROGRESS
  - Response: { success: true, data: MissionSession }

PUT /api/v1/mission/:id/complete
  - Body: { xpEarned: number, feynmanScore?: number }
  - Update the MissionSession to status COMPLETE, set completedAt, set xpEarned
  - Add xpEarned to the learner's total XP
  - Recalculate and update the learner's rank based on total XP using the rank thresholds from the PRD
  - Check and update streak: if the learner completed at least one mission yesterday, increment streak. If not, reset streak to 1.
  - Check Batman Mode: if streak >= 7, set batmanModeActive to true
  - Update lastActiveDt to now
  - Response: { success: true, data: { mission: MissionSession, learner: Partial<Learner> } }

GET /api/v1/mission/today
  - Returns today's mission sessions for the authenticated learner (one or both may exist)
  - Response: { success: true, data: { morning: MissionSession | null, evening: MissionSession | null } }

Create the route file and mount handlers with auth middleware.
```

---

### 3.5 — Build the Progress API

```
In the EnglishOS server, build the progress controller and routes.

File: server/src/controllers/progress.controller.ts

Implement:

GET /api/v1/progress/map
  - Returns the learner's full Mastery Map state
  - For each of the 6 levels, return: level number, name, total days, status (locked/active/complete), gate score (if attempted), list of modules with their individual completion status
  - Active level is the learner's levelCurrent; all lower levels are complete; all higher levels are locked
  - Response: { success: true, data: MasteryMapState }

GET /api/v1/progress/dashboard
  - Returns all data needed for the dashboard panel: streak, batmanModeActive, brainCompoundPct, xp, rank, todayMissions (morning/evening status), myWhy, badgeCount
  - Response: { success: true, data: DashboardData }

POST /api/v1/progress/gate/submit
  - Body: { level: number, answers: { itemId: string, learnerAnswer: string, isCorrect: boolean }[] }
  - Calculate score: (correct answers / total answers) * 100
  - Increment gateAttempts on the LevelProgress record
  - If score >= 70: mark level as COMPLETE, unlock next level (set it to ACTIVE), increment learner.levelCurrent, award 500 XP
  - If score < 70: return failure with per-module breakdown of incorrect items
  - Response: { success: true, data: { passed: boolean, score: number, nextLevel?: number } }

GET /api/v1/progress/stats
  - Returns: totalDaysActive, currentStreak, totalXP, brainCompoundPct, feynmanScoreTrend (last 30 days array), badgeList, levelProgressList
  - Response: { success: true, data: LearnerStats }
```

---

### 3.6 — Build the Leaderboard API

```
In the EnglishOS server, build the leaderboard controller and routes.

File: server/src/controllers/leaderboard.controller.ts

Implement:

GET /api/v1/leaderboard/feynman/weekly
  - Returns all LeaderboardEntry records for the current ISO week
  - Sorted by upvoteCount DESC, then clarityScore DESC
  - Joins with Learner to get first name and last initial (anonymized)
  - Response: { success: true, data: LeaderboardEntry[], week: string }

POST /api/v1/leaderboard/feynman/submit
  - Body: { module: number, prompt: string, responseText: string, clarityScore: number }
  - Check if learner has already submitted this week — return error if yes (one submission per week)
  - Create LeaderboardEntry record
  - Response: { success: true, data: LeaderboardEntry }

POST /api/v1/leaderboard/feynman/:entryId/upvote
  - Increment the upvoteCount on the entry by 1
  - Prevent double-upvoting: track upvotes by learner (add an Upvote model with learnerId + entryId unique constraint)
  - Return error if learner already upvoted this entry
  - Response: { success: true, data: { upvoteCount: number } }

Create route file and mount with auth middleware.
```

---

## Phase 4 — Authentication and User Management

*Build the complete auth system: registration, login, JWT tokens, protected routes, and session management.*

---

### 4.1 — Build the Registration and Login Endpoints

```
In the EnglishOS server, build the authentication controller.

File: server/src/controllers/auth.controller.ts

Implement:

POST /api/v1/auth/register
  - Body: { email, password, name }
  - Validate: email format, password min 8 chars, name required
  - Check for existing learner with that email — return 409 if exists
  - Hash password with bcrypt (12 rounds)
  - Create Learner record
  - Create initial LevelProgress records: Level 1 Module 1 = ACTIVE, all others = LOCKED
  - Generate access token (15 min expiry) and refresh token (30 days expiry) using JWT
  - Store refresh token in RefreshToken table with expiry
  - Response: { success: true, data: { learner: SafeLearner, accessToken, refreshToken } }

POST /api/v1/auth/login
  - Body: { email, password }
  - Find learner by email — return 401 if not found
  - Compare password with bcrypt — return 401 if wrong
  - Generate new access + refresh tokens
  - Store refresh token (invalidate old ones for this user)
  - Response: { success: true, data: { learner: SafeLearner, accessToken, refreshToken } }

POST /api/v1/auth/refresh
  - Body: { refreshToken }
  - Find the refresh token in the database — return 401 if not found or expired
  - Generate a new access token
  - Rotate the refresh token (delete old, create new)
  - Response: { success: true, data: { accessToken, refreshToken } }

POST /api/v1/auth/logout
  - Body: { refreshToken }
  - Delete the refresh token from the database
  - Response: { success: true }

The SafeLearner type must omit: passwordHash, refreshTokens. Include all other learner fields.

Build the auth middleware at server/src/middleware/auth.middleware.ts:
  - Extract Bearer token from Authorization header
  - Verify with JWT_SECRET
  - Attach decoded learner ID to req.learnerId
  - Return 401 if missing or invalid
```

---

### 4.2 — Build the Learner Profile Endpoints

```
In the EnglishOS server, build the learner profile controller.

File: server/src/controllers/learner.controller.ts

Implement:

GET /api/v1/learner/profile
  - Returns the authenticated learner's full profile (SafeLearner type — no password)
  - Response: { success: true, data: SafeLearner }

PUT /api/v1/learner/profile
  - Body: { name?, morningSessionTime?, eveningSessionTime?, romanUrduDefault? }
  - Updates only the provided fields
  - Response: { success: true, data: SafeLearner }

POST /api/v1/learner/onboarding
  - Body: { placementLevel, whyMotivation, stakesStatement, accountabilityEmail?, morningSessionTime, eveningSessionTime }
  - This is called at the end of the onboarding wizard
  - Update the learner record with all onboarding data
  - Set levelCurrent to placementLevel
  - Adjust LevelProgress records to match: unlock Module 1 of placementLevel
  - Mark onboarding as complete (add a boolean field onboardingComplete to the Learner model)
  - Response: { success: true, data: SafeLearner }

PUT /api/v1/learner/stakes
  - Body: { stakesStatement, accountabilityEmail? }
  - Update the learner's stakes
  - Response: { success: true, data: { stakesStatement, accountabilityEmail } }

DELETE /api/v1/learner/account
  - Body: { password } (confirmation required)
  - Verify password
  - Delete all learner data: Learner, SRQueueItem, MissionSession, Badge, FeynmanResponse, RefreshToken, LevelProgress, LeaderboardEntry records for this learner
  - Response: { success: true }
```

---

### 4.3 — Wire Authentication to the React Client

```
In the EnglishOS client, wire the authentication system to the frontend.

AUTH STORE (client/src/stores/authStore.ts):
  - State: user (SafeLearner | null), accessToken (string | null), isAuthenticated (boolean), isLoading (boolean)
  - Actions: login(email, password), register(email, password, name), logout(), refreshSession(), loadFromStorage()
  - On login/register success: store accessToken in memory (Zustand state) and refreshToken in localStorage
  - On logout: clear both, call /auth/logout endpoint
  - On app load: call loadFromStorage() which reads refreshToken from localStorage and calls /auth/refresh to get a new accessToken

AUTH PAGES:
  Build client/src/pages/Login.tsx:
    - EnglishOS logo + tagline
    - Email and password inputs
    - Login button (shows loading spinner while request is in progress)
    - Error message display (wrong credentials, server error)
    - Link to /register
    - On success: redirect to /map

  Build client/src/pages/Register.tsx:
    - Name, email, password inputs
    - Password strength indicator
    - Register button with loading state
    - Error message display
    - Link to /login
    - On success: redirect to /onboarding

PROTECTED ROUTE WRAPPER:
  - Check isAuthenticated from authStore
  - If false, redirect to /login
  - If isLoading, show full-screen spinner
  - If user is authenticated but onboardingComplete is false, redirect to /onboarding

Wire the onboarding wizard's final step to POST /api/v1/learner/onboarding.
```

---

## Phase 5 — Core Learning Engine and Feature Modules

*Connect all learning features to the real API and AI services. Build the Feynman evaluator and conversation simulator.*

---

### 5.1 — Connect Morning Mission to the API

```
In the EnglishOS client, wire the Morning Mission flow to real API data.

In the MISSION STORE (client/src/stores/missionStore.ts), implement:
  - startMission(type): calls POST /api/v1/mission/start, stores missionId
  - loadDailyQueue(): calls GET /api/v1/content/sr-queue/today, stores the 5 warm-up cards
  - loadModuleContent(level, module): calls GET /api/v1/content/module/:level/:module, stores Core Drop cards
  - completeMission(feynmanScore): calls PUT /api/v1/mission/:id/complete, updates XP and progress in progressStore
  - submitFeynmanResponse(text): calls POST /api/v1/feynman/evaluate (build this in next prompt), stores result

In WarmupFlash.tsx:
  - Load the first 5 cards from srStore.dailyQueue
  - On "Got it" click: call srStore.markReviewed(itemId, correct: true)
  - On "Review Again" click: call srStore.markReviewed(itemId, correct: false)

In CoreDrop.tsx:
  - Load content from missionStore.moduleContent
  - Power Pack items must appear first (they come sorted from the API)
  - Roman Urdu toggle reads from uiStore.romanUrduEnabled

In ApplyIt.tsx:
  - Generate the scenario based on today's module (use a scenario map keyed by module number — define these as static data in a constants file)

In FeynmanMoment.tsx:
  - On submit: call missionStore.submitFeynmanResponse(text)
  - Display the returned score, feedback, and knowledge gaps
  - Knowledge gap words are shown as red badges
  - After viewing results, call completeMission() to finalize the session
```

---

### 5.2 — Build the Feynman API Endpoint

```
In the EnglishOS server, build the Feynman evaluation endpoint.

File: server/src/controllers/feynman.controller.ts

POST /api/v1/feynman/evaluate
  - Auth required
  - Body: { missionId: string, module: number, prompt: string, responseText: string }
  
  Step 1: Get the list of vocabulary words the learner has covered (all ContentItem records for levels and modules up to and including the learner's current module)
  
  Step 2: Call the OpenAI API (GPT-4o) with the following system prompt:
    "You are evaluating an English learner's explanation for clarity and vocabulary usage.
    The learner has covered these vocabulary words: [word list joined by comma].
    The learner was asked to explain: [prompt].
    Their response: [responseText].
    
    Evaluate on three dimensions (score each 0-100):
    1. Vocabulary Usage (40%): How many of their learned vocabulary words appear in the response?
    2. Simplicity (35%): Is the explanation simple enough for a 10-year-old? Target Flesch-Kincaid grade level 3-5.
    3. Relevance (25%): Does the response address the concept asked about?
    
    Return ONLY valid JSON with no markdown:
    { vocabulary_score: number, simplicity_score: number, relevance_score: number, overall_score: number, knowledge_gaps: string[], feedback: string, suggestion: string }"
  
  Step 3: Parse the JSON response. Calculate overall_score = (vocab*0.4) + (simplicity*0.35) + (relevance*0.25).
  
  Step 4: Save a FeynmanResponse record with all scores and knowledge_gaps.
  
  Step 5: For each word in knowledge_gaps, find the matching ContentItem and update the learner's SRQueueItem for that item — set isKnowledgeGap to true and nextReviewDate to tomorrow.
  
  Step 6: Update the Brain Compound Meter: increment by (overall_score / 100) * 2 (capped at 100).
  
  Response: { success: true, data: { scores, feedback, suggestion, knowledgeGaps } }

GET /api/v1/feynman/archive
  - Returns all FeynmanResponse records for the authenticated learner
  - Sorted by createdAt DESC
  - Joined with MissionSession for date context
  - Response: { success: true, data: FeynmanResponse[] }
```

---

### 5.3 — Build the Conversation Simulator API

```
In the EnglishOS server, build the conversation simulator endpoint.

File: server/src/controllers/conversation.controller.ts

The conversation runs as a stateless API — the client sends the full message history each turn.

POST /api/v1/conversation/message
  - Auth required
  - Body: { module: number, scenario: string, messageHistory: { role: "user" | "assistant", content: string }[] }
  
  Step 1: Get the learner's vocabulary allowlist — all ContentItem.english values for modules the learner has completed (levels and modules up to current progress).
  
  Step 2: Call the OpenAI API with:
    System prompt: "You are a friendly English conversation partner for a South Asian learner at Level [level].
    
    STRICT RULES:
    - Only use vocabulary from this approved list: [allowlist joined by comma]
    - Keep all responses under 20 words
    - Use only simple present or simple past tense
    - Never use idioms, contractions, or complex sentence structures
    - Current conversation scenario: [scenario]
    - If the user's input is unclear or off-topic, respond: 'I did not understand. Can you say that again in simple words?'
    - Be warm, patient, and encouraging
    - Do not correct grammar explicitly — just model correct usage naturally"
    
    Messages: pass the messageHistory array
  
  Step 3: Return the AI response text.
  
  Step 4: If messageHistory is empty (first message), generate the AI's opening message based on the scenario.
  
  Response: { success: true, data: { message: string } }

Add routes at POST /api/v1/conversation/message. Mount with auth middleware.
```

---

### 5.4 — Connect Evening Mission to the API

```
In the EnglishOS client, wire the Evening Mission components to real data and APIs.

In ConversationSim.tsx:
  - On component mount: call POST /api/v1/conversation/message with empty messageHistory to get the opening message
  - On learner send: append learner message to local messageHistory state, call the API with full history, append AI response
  - Show typing indicator (3 dots animation) while waiting for API response
  - Handle the "I did not understand" response with a subtle different styling (slightly dimmer)

In StoryReplay.tsx:
  - Story content is loaded as static data from a constants file (client/src/constants/stories.ts) — create one story for Level 1 Module 1 and one for Module 2 with all vocabulary from those modules embedded
  - Vocabulary highlighting: after story loads, scan the text for words that appear in the learner's completed ContentItems and wrap them in a span with the tooltip component showing the Roman Urdu meaning
  - On story completion, award XP (add to local missionStore.xpEarned)

In SentenceBuilder.tsx:
  - Sentences are loaded from a constants file (client/src/constants/sentences.ts) — create 5 sentences per module using the vocabulary from that module
  - On correct answer: call srStore.markReviewed for the vocabulary words used in that sentence as correct
  - On incorrect: call srStore.markReviewed as incorrect

In DayClose.tsx:
  - Call missionStore.completeMission() on mount to finalize the evening session and sync all data to the server
  - Display real XP earned (from missionStore), real streak (from progressStore), real Brain Compound Meter value
  - Tomorrow's review count: call GET /api/v1/content/sr-queue/today and count the results (but show tomorrow's projection — items with nextReviewDate = tomorrow)
```

---

## Phase 6 — Gamification System

*Implement the complete gamification layer: XP, Brain Compound Meter, Batman Mode, badges, profile card, and the Feynman Leaderboard.*

---

### 6.1 — Build the XP and Rank System

```
In the EnglishOS server, finalize the XP and rank calculation logic.

In server/src/services/rankService.ts, implement:

RANK THRESHOLDS (from PRD):
  Rookie: 0 XP
  Speaker: 500 XP
  Communicator: 1500 XP
  Conversationalist: 3000 XP
  Fluent: 6000 XP
  Professional: 12000 XP
  Polymath: 20000 XP

calculateRank(totalXP: number): string — returns the rank name for the given XP

XP AWARDS (implement in the mission complete handler):
  Morning Mission complete: +50 XP
  Evening Mission complete: +100 XP
  Feynman Moment (text): +30 XP (add to mission XP total based on feynmanScore)
  Perfect Warm-up Flash (5/5 correct): +25 XP bonus
  Level Gate pass (first attempt): +500 XP
  Level Gate pass (second+ attempt): +250 XP
  SR review card correct: +10 XP (cap at 100 XP per day from SR to prevent grinding)
  7-day streak achieved: +200 XP one-time bonus

In the mission complete endpoint, after adding XP:
  - Recalculate rank using calculateRank
  - If the rank changed, include rankUp: true and newRank in the response
  - The client should show a rank-up celebration if rankUp is true

In the client, update DayClose.tsx to check for rankUp in the mission complete response and show a special rank-up card if true.
```

---

### 6.2 — Build the Badge System

```
In the EnglishOS server, build the badge awarding system.

File: server/src/services/badgeService.ts

Define the following badge types and their award conditions:

MODULE_COMPLETE_L1_M1: "Alphabet Master" — awarded when Level 1 Module 1 is marked complete
MODULE_COMPLETE_L1_M2: "Word Collector" — awarded when Level 1 Module 2 is marked complete
MODULE_COMPLETE_L1_M3: "Sentence Builder" — awarded when Level 1 Module 3 is marked complete
MODULE_COMPLETE_L1_M4: "Phrase Master" — awarded when Level 1 Module 4 is marked complete
LEVEL_COMPLETE_L1: "Base Camp Conquered" — awarded on Level 1 Gate pass
STREAK_7: "Week Warrior" — awarded on first 7-day streak
STREAK_30: "Month Master" — awarded on first 30-day streak
BATMAN_MODE: "Batman Mode" — awarded when Batman Mode first activates
FEYNMAN_FIRST: "First Explainer" — awarded on first Feynman Moment completion
FEYNMAN_SCORE_90: "Clarity Champion" — awarded when a Feynman score reaches 90+
PERFECT_GATE: "First Try" — awarded when Level Gate passed on first attempt
LEADERBOARD_TOP3: "Community Voice" — awarded when a leaderboard submission reaches top 3

Implement checkAndAwardBadges(learnerId, trigger) — checks if any badge should be awarded based on the trigger event and awards it if not already earned.

Call checkAndAwardBadges from:
  - The mission complete endpoint (triggers: streak milestones, batman mode, feynman score)
  - The level gate submit endpoint (triggers: level complete, perfect gate)
  - The module complete handler (triggers: module complete badges)

Each badge award returns the badge record. The client shows a badge toast notification when a new badge is returned in any API response.
```

---

### 6.3 — Build the Polymath Profile Card Component

```
In the EnglishOS client, build the Polymath Profile Card component.

File: client/src/components/gamification/ProfileCard.tsx

The card is a styled, shareable visual identity card. Design it as a dark card with the following sections:

HEADER:
  - "POLYMATH PROFILE" label (small, uppercase, muted)
  - EnglishOS logo mark (text: "EnglishOS" in brand-red)

IDENTITY SECTION:
  - Learner name (large, bold, white)
  - Rank badge (colored pill: rank name in brand color matching rank level)
  - Current level and location name (e.g., "Level 2 — Village")
  - "Day X of 300" counter

STATS ROW (4 stat boxes in a row):
  - Streak: fire emoji + count
  - XP: lightning emoji + count
  - Brain Compound: brain emoji + percentage
  - Modules: puzzle emoji + completed/total count

BADGE STRIP:
  - Horizontal scroll row of earned badge icons (circular, colored by badge type)
  - Locked/unearned badges shown as gray circles with lock icon

MY WHY:
  - Small label "Learning English for:" + whyMotivation text

FOOTER:
  - "EnglishOS.com" — brand URL

The card must be sized to a consistent aspect ratio (roughly 4:3) suitable for screenshot sharing.

Add an "Export as Image" button on the Profile page that uses html2canvas to capture the card and trigger a download as a PNG file. Install html2canvas.
```

---

### 6.4 — Build the Batman Mode Feature

```
In the EnglishOS client and server, implement the complete Batman Mode feature.

SERVER SIDE:
  In the mission complete handler, after streak calculation:
  - If streak reaches exactly 7 (or any multiple of 7), and batmanModeActive is false: set batmanModeActive to true, award the BATMAN_MODE badge if not already earned, include batmanModeActivated: true in the response

  Add a field to the Learner model: batmanSkipUsedThisWeek (Boolean, default false) and batmanModeWeekStart (DateTime optional)

  Create a new endpoint: POST /api/v1/learner/batman-skip
  - Can only be called if batmanModeActive is true and batmanSkipUsedThisWeek is false
  - Set batmanSkipUsedThisWeek to true
  - Protect the learner's streak — do not decrement it for today
  - Response: { success: true, data: { skipUsed: true, streakProtected: true } }

  Every Monday (or when a new 7-day cycle begins), reset batmanSkipUsedThisWeek to false. Implement this check in the mission start handler: if today is Monday and batmanSkipUsedThisWeek is true and the current week is a new week since batmanModeWeekStart, reset it.

CLIENT SIDE:
  In the Dashboard panel on the Mastery Map page:
  - If batmanModeActive: show a purple "Batman Mode Active" badge with shield icon
  - If skip not yet used: show a "Use Your Skip Day" button (calls POST /api/v1/learner/batman-skip)
  - If skip used: show "Skip Used This Week" in a muted state

  When Batman Mode first activates (batmanModeActivated: true in response), show a full-screen special animation: dark sweep → purple glow → bold text "BATMAN MODE ACTIVATED. You planned ahead. That's the difference." → dismiss button.

  When the mission is completed on a day the batman skip was used (protected streak), show the UI message: "You planned ahead. That's what separates Batman from everyone else."
```

---

## Phase 7 — Spaced Repetition and Progress Tracking

*Implement the complete SR algorithm, Brain Compound Meter, progress tracking, and the Level Wrap Ceremony.*

---

### 7.1 — Build the SR Engine Service

```
In the EnglishOS server, build the complete Spaced Repetition engine.

File: server/src/services/srEngine.ts

Implement the following functions:

initializeSRQueue(learnerId, moduleItems: ContentItem[])
  - Called when a new module is unlocked for a learner
  - For each ContentItem in the module, create an SRQueueItem with:
    intervalDays: 1
    nextReviewDate: tomorrow (the day after first learning)
    easeFactor: 2.5 (Power Pack items get 2.7 as they are higher priority)
    isKnowledgeGap: false

processReview(learnerId, itemId, wasCorrect: boolean)
  - Finds the SRQueueItem for this learner and item
  - If wasCorrect:
    newInterval = Math.round(current.intervalDays * current.easeFactor)
    cap at 180 days maximum
    newEaseFactor = Math.min(3.5, current.easeFactor + 0.1)
    isKnowledgeGap = false
  - If wasCorrect is false:
    newInterval = 1
    newEaseFactor = Math.max(1.3, current.easeFactor - 0.2)
    isKnowledgeGap remains unchanged
  - Update nextReviewDate = today + newInterval days
  - Increment correctCount or incorrectCount
  - Set lastReviewedAt to now
  - Save and return updated item

markAsKnowledgeGap(learnerId, itemId)
  - Set isKnowledgeGap = true
  - Set nextReviewDate = tomorrow (highest priority review)

getDailyQueue(learnerId, limit = 20)
  - Find all SRQueueItems where nextReviewDate <= today for this learner
  - Join with ContentItem for full content
  - Sort: knowledge gap items first, then Power Pack items, then regular items
  - Return up to limit items

calculateBrainCompoundDrain(learnerId)
  - Called when checking if SR was skipped for 3+ consecutive days
  - If the learner has not completed any SR review for 3+ days, reduce brainCompoundPct by 5 per day (minimum 0)
  - Update the learner record

Build the corresponding API endpoint:

POST /api/v1/content/sr-review
  - Body: { reviews: { itemId: string, wasCorrect: boolean }[] }
  - Call processReview for each item in the array
  - After all reviews, calculate Brain Compound Meter increment: (correct reviews / total reviews) * 3 (cap daily increment at 10 to prevent grinding)
  - Update learner.brainCompoundPct (cap at 100)
  - If brainCompoundPct reaches 100: flag deepMissionUnlocked: true in response
  - Response: { success: true, data: { updatedItems: SRQueueItem[], newBrainCompoundPct: number, deepMissionUnlocked: boolean } }
```

---

### 7.2 — Wire SR Engine to the Client

```
In the EnglishOS client, wire the Spaced Repetition system to the frontend.

SR STORE (client/src/stores/srStore.ts):
  - State: dailyQueue (SRQueueItemWithContent[]), reviewedToday (string[] — itemIds), pendingCount (number), brainCompoundPct (number)
  - Actions:
    loadDailyQueue(): calls GET /api/v1/content/sr-queue/today, stores result
    markReviewed(itemId, wasCorrect): adds to a local pendingReviews buffer
    syncReviews(): calls POST /api/v1/content/sr-review with all pending reviews in the buffer, clears buffer, updates brainCompoundPct from response
    
  - Auto-sync: call syncReviews() when the user completes any mission phase (not after every single card — batch them for efficiency)

BRAIN COMPOUND METER COMPONENT (client/src/components/gamification/BrainCompoundMeter.tsx):
  - Props: value (0-100), size ("mini" | "full")
  - Mini variant: used in the top app bar — small horizontal bar + percentage text
  - Full variant: used in the Progress page and Day Close — larger bar with label, value, and description text: "This meter fills only through real review — it reflects your actual retention."
  - Animate the fill with a smooth Framer Motion transition whenever value changes
  - When value reaches 100, show a pulsing gold glow around the meter and a "Deep Mission Unlocked!" badge above it

WARM-UP FLASH integration:
  - On component mount, call srStore.loadDailyQueue() if the queue is empty
  - Load the first 5 cards from the queue for the Warm-up Flash
  - Mark each card as reviewed (correct/incorrect) using srStore.markReviewed
  - Call srStore.syncReviews() after all 5 cards are answered
```

---

### 7.3 — Build the Level Wrap Ceremony

```
In the EnglishOS client, build the Level Wrap Ceremony component.

File: client/src/components/mission/LevelWrapCeremony.tsx

This component is a full-screen modal/overlay that triggers after passing a Level Gate.

SEQUENCE (implement as a series of timed animation stages):

Stage 1 — Celebration (0–2 seconds):
  - Full black screen
  - Confetti burst using canvas-confetti (mix of brand-red, brand-gold, brand-blue)
  - Large animated checkmark icon scales in from 0 to full size (spring animation)

Stage 2 — Summary Card (2–5 seconds, slides in from bottom):
  - Card title: "Level [X] Complete — [Location Name]"
  - Animated count-up stats:
    "[N] vocabulary words learned"
    "[N] grammar rules mastered"
    "[N] days completed"
    "Feynman clarity improved by [X]% since Day 1"
  - All numbers animate from 0 to their value using Framer Motion

Stage 3 — My Why Message (5–7 seconds, fades in below the card):
  - Personalized line based on the learner's Why:
    Job Interview → "Your interview English just leveled up. Keep going."
    Career Growth → "You are building something most people never finish."
    Social Confidence → "Your confidence is compounding every single day."
    (one line per Why option — define all 6)

Stage 4 — Map Unlock (7–10 seconds):
  - The Mastery Map appears in the background, shrunken
  - The just-completed level node glows green with a checkmark
  - The next level node illuminates — path between them lights up with a beam animation
  - Next level name fades in below the newly-lit node

Stage 5 — CTA (10 seconds, fades in):
  - "Begin Level [N+1] — [Location Name]" primary button
  - "Return to Map" ghost button below it

The component receives: level, locationName, stats, myWhy, nextLevelName as props.
Call this component from the Level Gate page when the API returns passed: true.
```

---

### 7.4 — Connect the Progress Dashboard to Real Data

```
In the EnglishOS client, wire all progress-related UI to the real API.

PROGRESS STORE (client/src/stores/progressStore.ts):
  Actions:
    loadDashboard(): calls GET /api/v1/progress/dashboard, updates all dashboard state
    loadMasteryMap(): calls GET /api/v1/progress/map, updates the map state
    loadStats(): calls GET /api/v1/progress/stats, updates the stats page state
    loadBadges(): included in loadStats response

  Call loadDashboard() on every app load (after auth is confirmed) and after every mission completion.

MASTERY MAP PAGE:
  - Call progressStore.loadMasteryMap() on mount
  - Pass the real level status data to each LevelNode component
  - The dashboard panel reads from progressStore: streak, brainCompoundPct, todayMissions, myWhy

PROGRESS PAGE:
  - Call progressStore.loadStats() on mount
  - Wire the Feynman score chart to real data from the stats endpoint (feynmanScoreTrend array)
  - Wire the badge wall to the real badges list

FEYNMAN ARCHIVE PAGE:
  - Call GET /api/v1/feynman/archive on mount
  - Display real responses in reverse chronological order
  - Calculate the score trend arrow: compare each entry's clarityScore to the previous entry

LEADERBOARD PAGE:
  - Call GET /api/v1/leaderboard/feynman/weekly on mount
  - Wire the upvote button to POST /api/v1/leaderboard/feynman/:entryId/upvote
  - Wire the submission modal to POST /api/v1/leaderboard/feynman/submit
```

---

### 7.5 — Build the Notification System

```
In the EnglishOS server, build the accountability notification system.

File: server/src/services/emailService.ts

Using Resend, implement:

sendMissedDaysAlert(learnerEmail, accountabilityEmail, learnerName, daysMissed)
  - Email to the accountability partner
  - Subject: "[learnerName] needs a nudge — they've missed [daysMissed] days of EnglishOS"
  - Body: friendly message explaining what EnglishOS is, that the learner set them as accountability partner, and asking them to check in. Include the learner's Why motivation in the email.
  - Plain HTML email (not styled heavily — simple and clear)

sendDailyReminder(learnerEmail, learnerName, sessionType, sessionTime)
  - Email reminder for the morning or evening session
  - Subject: "Your [Morning/Evening] English Mission is ready, [learnerName]"
  - Short, motivating body: streak count, a one-line encouragement, link to app

File: server/src/services/schedulerService.ts
  - Use node-cron to run two jobs:
  
  Daily missed-day checker (runs at 11:59pm):
    - Find all learners where lastActiveDt < today (they did not log in today)
    - For each, check if they have missed exactly 3 consecutive days
    - If yes and accountabilityEmail is set: send the missed days alert email
  
  Daily reminder sender (runs at learner's sessionTime):
    - This cannot be per-learner-timezone in v1.0; simplify by sending all morning reminders at 8am PKT and all evening reminders at 8pm PKT
    - Find all learners who have not completed their morning/evening session for today
    - Send the reminder email to each

Mount the scheduler in server.ts so it starts when the server starts.
```

---

## Phase 8 — Testing and Debugging

*Comprehensive testing, error handling, edge cases, and quality assurance across the full stack.*

---

### 8.1 — Add Input Validation to All API Endpoints

```
In the EnglishOS server, add comprehensive input validation to all API endpoints using Zod.

Install Zod and create a validation middleware at server/src/middleware/validator.middleware.ts that takes a Zod schema, validates req.body against it, and returns a 400 error with a clear message listing all validation failures if the body is invalid.

Create Zod schemas for:
  - POST /auth/register: email (valid format), password (min 8 chars, must contain a letter and a number), name (min 2 chars, max 50 chars)
  - POST /auth/login: email, password (non-empty)
  - POST /learner/onboarding: placementLevel (1-6), whyMotivation (non-empty string), stakesStatement (min 20 chars), morningSessionTime (HH:MM format), eveningSessionTime (HH:MM format)
  - POST /mission/start: type (must be "MORNING" or "EVENING")
  - POST /feynman/evaluate: missionId (valid UUID), module (1-13), prompt (non-empty), responseText (min 10 chars, max 2000 chars)
  - POST /conversation/message: module (1-13), scenario (non-empty), messageHistory (array of { role: "user"|"assistant", content: string }, max 20 messages)
  - POST /content/sr-review: reviews (array of { itemId: valid UUID, wasCorrect: boolean }, min 1, max 20)
  - POST /progress/gate/submit: level (1-6), answers (array of { itemId, learnerAnswer, isCorrect }, min 1)

Apply the validation middleware to all relevant routes.

Also add API-level error handling for:
  - OpenAI API call failures: return a 503 with "AI service temporarily unavailable — please try again"
  - Database connection errors: return 503 with "Service temporarily unavailable"
  - Malformed JSON bodies: already handled by express — confirm the error handler returns the right shape
  - JWT verification failures: return 401 with clear message
```

---

### 8.2 — Add Error Boundaries and Loading States to the Client

```
In the EnglishOS client, add comprehensive error handling and loading states throughout the application.

GLOBAL ERROR BOUNDARY:
  Create client/src/components/layout/ErrorBoundary.tsx — a React class component error boundary that catches render errors and shows a friendly "Something went wrong" screen with a "Reload App" button.
  Wrap the entire app in this boundary in App.tsx.

API ERROR HANDLING:
  In all Zustand store actions that call the API:
  - Wrap every API call in try/catch
  - Set an error state in the store on failure
  - Clear the error state before each API call

  Create a useToast hook at client/src/hooks/useToast.ts that shows a toast notification (top-right, auto-dismisses in 4 seconds). Toast variants: success (green), error (red), info (blue), warning (gold).

  Use the toast hook to show error messages in:
  - Login/Register failures
  - Mission complete failures (with a retry button)
  - Feynman evaluation failures (show "Could not evaluate — your progress has been saved")
  - Conversation simulator failures (show "AI temporarily unavailable — try again")

LOADING STATES:
  Every page that loads data from the API must have a skeleton loading state (not a spinner) matching the page's layout. Build a Skeleton component in client/src/components/ui/Skeleton.tsx that renders a pulsing gray rectangle of any size. Use it to build page-level skeleton screens for:
  - MasteryMap page: skeleton nodes and path
  - Progress page: skeleton stat cards and chart area
  - FeynmanArchive page: skeleton list items

EMPTY STATES:
  Add empty state screens for:
  - Feynman Archive with no entries yet: illustration placeholder + "Complete your first Morning Mission to see your explanation history"
  - Leaderboard with no submissions yet: "No submissions this week yet — be the first to share your explanation"
  - SR queue with no items due: "Nothing to review today — your Brain Compound Meter is holding strong!"
```

---

### 8.3 — Fix Common Edge Cases

```
In the EnglishOS application, implement handling for the following edge cases that should be fixed before any user testing:

AUTHENTICATION EDGE CASES:
  1. If the access token expires mid-session during a mission, the token refresh must happen silently without interrupting the mission — the learner should never be kicked out mid-mission
  2. If the refresh token is also expired: save the current mission phase state to localStorage before redirecting to login, so the learner can resume after re-authenticating
  3. If two tabs are open and one logs out, the other should detect this (via localStorage event listener) and also log out

MISSION EDGE CASES:
  4. If the learner closes the browser mid-mission and returns: the mission should resume from the last completed phase (store currentPhase in localStorage, sync with the server's IN_PROGRESS mission record)
  5. If a mission is started but the Feynman API call fails: allow the learner to skip the Feynman Moment with a "Skip for now" button that completes the mission without a Feynman score (feynmanScore = null)
  6. If today's SR queue is empty (no items due): the Warm-up Flash should show the 5 most recently learned items instead (as a refresher, not scored for SR purposes)

GAMIFICATION EDGE CASES:
  7. XP must be idempotent — if the mission complete API is called twice (double-tap, retry), the second call should return the same result without awarding XP twice. Implement this by checking if the mission status is already COMPLETE before processing
  8. Badges must not be awarded twice — check for existing badge before creating a new one
  9. The 7-day streak Batman Mode bonus XP (+200) must only be awarded once per streak achievement, not every time the streak is a multiple of 7

UI EDGE CASES:
  10. The SentenceBuilder drag-and-drop must work on touch screens — confirm @dnd-kit handles touch events correctly, and add a fallback tap-to-select interaction for devices where drag feels awkward
  11. Very long words in the word tile pool must not overflow their container — add text truncation with a tooltip showing the full word on hover
  12. If the Roman Urdu text contains special characters (diacritics), confirm they render correctly on Android Chrome with the Noto Sans font
```

---

### 8.4 — Performance Audit and Fixes

```
In the EnglishOS client, perform a performance audit and implement the following optimizations:

BUNDLE OPTIMIZATION:
  1. Analyze the current bundle size by running: npx vite-bundle-analyzer (install if needed). Report which dependencies are largest.
  2. Apply code splitting: use React.lazy() and Suspense for every page component in AppRouter.tsx so page bundles are loaded only when navigated to.
  3. The Mastery Map animations and Framer Motion should only be imported in the components that use them, not the root bundle.

IMAGE AND ASSET OPTIMIZATION:
  4. All audio files for vocabulary pronunciation should be served with correct cache headers. On the Express server, add Cache-Control: max-age=31536000, immutable for all static audio file responses.
  5. Any SVG icons used in the app should be inlined as React components (not loaded as external files) to eliminate network requests.

API CALL OPTIMIZATION:
  6. The dashboard data (GET /progress/dashboard) is called on every app load. Add a 30-second client-side cache in the progressStore: if loadDashboard was called less than 30 seconds ago, return the cached data without making a new API call.
  7. The SR queue (GET /content/sr-queue/today) should be loaded once at the start of the day and cached. If the user navigates away from the mission and returns, do not reload it.
  8. Add response compression to the Express server using the compression middleware. This should reduce JSON payload sizes by 60–80%.

REACT RENDERING:
  9. Wrap all Zustand store selectors with shallow equality checking to prevent unnecessary re-renders.
  10. Memoize the LevelNode component with React.memo — it should only re-render when its specific level's status changes, not when any other level updates.
```

---

## Phase 9 — Deployment and Production Optimization

*Set up production infrastructure, environment configuration, CI/CD, monitoring, and health checks.*

---

### 9.1 — Prepare for Production Build

```
In the EnglishOS project, prepare both client and server for production deployment.

CLIENT:
  1. In vite.config.ts, configure the production build:
    - Set base to "/"
    - Enable minification with esbuild
    - Set chunk size warning limit to 1000kb
    - Configure manual chunk splitting: separate vendor chunks for react, framer-motion, recharts, and dnd-kit
  2. Create a client/src/utils/analytics.ts module that wraps PostHog. Export a trackEvent(eventName, properties) function. Events to track: mission_started, mission_completed, feynman_evaluated, level_gate_attempted, level_gate_passed, leaderboard_submitted. Only track in production (check VITE_API_BASE_URL for production domain).
  3. Add a meta viewport tag ensuring mobile zoom is handled correctly: content="width=device-width, initial-scale=1.0, maximum-scale=1.0"

SERVER:
  4. Add a Procfile (or the deployment platform equivalent) that runs: node dist/server.js
  5. Add a build script to server/package.json: "build": "tsc -p tsconfig.prod.json" — create tsconfig.prod.json that outputs to /dist and excludes test files
  6. Add a database migration step to the start command: the server should run prisma migrate deploy (not dev) on startup in production before starting Express
  7. Add graceful shutdown handling in server.ts: listen for SIGTERM and SIGINT signals, close the HTTP server gracefully, disconnect Prisma, then exit
  8. Set up connection pooling for Prisma in production: add connection_limit=10 to the DATABASE_URL

ENVIRONMENT:
  9. Create a production .env template (not a real .env — just a reference) listing all required variables and whether each is secret or can be public
  10. Confirm that no secrets are hardcoded anywhere in the codebase — run a search for any hardcoded API keys, JWT secrets, or database passwords
```

---

### 9.2 — Configure the Production Server on Replit

```
In the EnglishOS project, configure the application to run correctly on Replit's production environment.

1. Update server/src/app.ts to read the CORS allowed origin from the CLIENT_URL environment variable (which will be the Replit app's public URL in production). Also allow the Replit dev domain during development.

2. Configure the Express server to serve the client's built static files in production:
  - After building the client, the dist/ folder should be served by Express as static files
  - Add a catch-all route that serves client/dist/index.html for all non-API routes (enables React Router client-side routing)
  - This means in production, only one server runs on port 5000 serving both the API and the frontend

3. Update the Vite dev server configuration to proxy /api requests to the Express server on port 5000 during development, so CORS is not an issue in dev mode.

4. Create a single start script in the root package.json:
  - "dev": starts both client Vite server and server Express concurrently (use concurrently package)
  - "build": builds the client then builds the server TypeScript
  - "start": runs the production server (which serves both API and frontend)

5. Configure the Replit workflow to run: npm run start (the production start command after a build step).

6. Verify that the health check endpoint GET /health returns { status: "ok" } and that Replit's health check can reach it.

7. Set all environment variables in the Replit Secrets panel. Do not put them in .env files — use process.env directly in production, which reads from Replit Secrets.
```

---

### 9.3 — Database Production Setup

```
In the EnglishOS server, configure the database for production.

1. Connect the application to Replit's built-in PostgreSQL database. Update DATABASE_URL in the Replit Secrets to point to the production database.

2. Run prisma migrate deploy to apply all migrations to the production database. Confirm the migration succeeds.

3. Run the seed script (prisma db seed) to populate Level 1 content into the production database. Confirm all ContentItem records are present.

4. Add a database health check to the /health endpoint: attempt a simple Prisma query (SELECT 1) and include the result in the health response: { status: "ok", database: "connected" | "error" }.

5. In the Prisma client setup (server/src/config/database.ts), configure:
  - Log level: error only in production, query+error in development
  - A single PrismaClient instance shared across the application (do not create a new instance per request)

6. Set up database backups: document the process for exporting the database using pg_dump (this is a manual step for v1.0 — automate in v1.1).

7. Add an index to the SRQueueItem table on (learnerId, nextReviewDate) to make the daily queue query fast. Add this as a Prisma migration: prisma migrate dev --name add_sr_queue_index.

8. Add an index to MissionSession on (learnerId, sessionDate, type) for the today's mission query.
```

---

### 9.4 — Set Up Monitoring and Error Tracking

```
In the EnglishOS application, set up production monitoring.

SERVER MONITORING:
  1. Add structured logging using pino (install pino and pino-pretty). Replace all console.log statements in the server with logger.info, logger.error, logger.warn calls. Each log should include: timestamp, level, message, and relevant context (learnerId if available, route, duration).

  2. Add request duration logging: log every request with method, path, status code, and duration in milliseconds.

  3. Add an unhandled rejection and uncaught exception handler in server.ts that logs the error with full context before the process exits.

CLIENT MONITORING:
  4. In the global ErrorBoundary component, add a call to a logError(error, componentStack) utility function that sends error details to the server endpoint POST /api/v1/log/client-error (build this endpoint — it just logs the error and returns 200).

  5. Track the following user experience metrics using PostHog:
    - Time to first mission start (from registration to first POST /mission/start)
    - Mission completion rate per day (track mission_started and mission_completed events)
    - Drop-off point within morning mission phases (track phase_entered events for each of the 4 phases)
    - Feynman Moment skip rate (track feynman_skipped if the learner skips)
    - Level Gate failure rate per level

  6. Add a simple uptime monitor: create a script that pings GET /health every 5 minutes and logs the result. This can be a simple cron job or an external service like UptimeRobot (document the setup steps but do not implement an external service — just the /health endpoint is sufficient for now).
```

---

## Phase 10 — SEO and Performance Improvements

*Optimize for search engines, Core Web Vitals, and mobile performance.*

---

### 10.1 — Add SEO Meta Tags and Open Graph

```
In the EnglishOS client, implement comprehensive SEO metadata.

1. Install react-helmet-async. Wrap the app in HelmetProvider in main.tsx.

2. Create a SEO component at client/src/components/layout/SEO.tsx that accepts title, description, image, url props and renders:
  - <title> tag
  - meta description
  - Open Graph tags: og:title, og:description, og:image, og:url, og:type, og:site_name
  - Twitter Card tags: twitter:card (summary_large_image), twitter:title, twitter:description, twitter:image
  - Canonical URL link tag

3. Add the SEO component to every page with page-specific content:
  Landing: title "EnglishOS — Learn English in 300 Days | Polymath Method", description about the product
  Onboarding: title "Start Your English Journey — EnglishOS"
  Dashboard/Map: title "Your English Journey — EnglishOS" (dynamic with learner's level)
  Progress: title "Your Progress — EnglishOS"
  Leaderboard: title "Feynman Leaderboard — EnglishOS"

4. For the Landing page only, add structured data (JSON-LD) in a script tag for the SoftwareApplication schema:
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "EnglishOS",
    "description": "An operating system for learning English using the Polymath methodology",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "PKR" },
    "audience": { "@type": "Audience", "audienceType": "Urdu/Hindi speaking South Asian learners" }
  }

5. Add a robots.txt file in the client/public/ folder:
  Allow all crawlers on public pages (/, /login, /register)
  Disallow: /map, /mission, /progress, /profile, /feynman-archive, /level-gate, /leaderboard

6. Add a sitemap.xml in client/public/ with the public page URLs.
```

---

### 10.2 — Optimize Core Web Vitals

```
In the EnglishOS client, optimize all Core Web Vitals metrics.

LARGEST CONTENTFUL PAINT (LCP) — target < 2.5 seconds:
  1. The landing page hero section renders immediately with no data fetching. Confirm it has no layout shift from font loading. Add font-display: swap to the Google Fonts URL by appending &display=swap.
  2. Any background gradients or decorative elements on the hero must be implemented in CSS (not images) so they render immediately.
  3. Preload the Space Grotesk and Inter fonts using <link rel="preload"> tags in the HTML head (index.html).

CUMULATIVE LAYOUT SHIFT (CLS) — target < 0.1:
  4. All skeleton loading states must reserve the exact same space as the content they replace. Set explicit min-height values on skeleton containers matching the expected content height.
  5. The Brain Compound Meter must have a fixed height set in CSS so it does not shift when the value loads from the API.
  6. Any dynamically loaded badge images or icons must have explicit width and height attributes.

FIRST INPUT DELAY / INTERACTION TO NEXT PAINT (INP) — target < 200ms:
  7. The drag-and-drop Sentence Builder must not block the main thread during drag operations. Confirm @dnd-kit uses pointer events efficiently. Test on a mid-range Android device.
  8. Framer Motion animations must not run on the main thread for transform and opacity properties — confirm all animations use CSS transform (not layout-triggering properties like width, height, top, left).
  9. The Feynman text area must not debounce with less than 300ms — ensure typing feels instant.

MOBILE PERFORMANCE:
  10. Run a Lighthouse audit on the landing page (mobile preset). Share the scores. Fix any issue with a score below 80.
  11. The bottom navigation bar on mobile must not jump or repaint when the keyboard opens (soft keyboard). Fix by adding position: fixed and bottom: env(safe-area-inset-bottom) to the nav bar.
```

---

### 10.3 — Optimize Mobile Experience

```
In the EnglishOS client, optimize the experience specifically for Android and iOS mobile browsers.

TOUCH INTERACTIONS:
  1. All buttons must have a minimum touch target of 44×44px — audit every Button component and all navigation items.
  2. Add -webkit-tap-highlight-color: transparent to the global CSS to remove the default blue tap flash on iOS Safari.
  3. The Sentence Builder drag-and-drop on mobile: add a long-press (500ms) to initiate drag so it does not conflict with normal scroll gestures.

LAYOUT:
  4. Test and fix the Onboarding wizard on a 375px width (iPhone SE size). Ensure no content is clipped or requires horizontal scrolling.
  5. The Mastery Map on mobile must be scrollable vertically (the nodes stack in a single column). Confirm the scroll works correctly and the fixed bottom dashboard panel does not overlap the bottom node.
  6. The Mission shell's phase progress bar must be visible above the fold on all screen sizes without requiring scroll.

PERFORMANCE:
  7. Reduce animation complexity on mobile: add a check for window.matchMedia('(prefers-reduced-motion: reduce)') and disable Framer Motion animations that are decorative when this preference is set.
  8. The Conversation Simulator chat should not re-render the entire message list on every new message. Use React.memo on the ChatBubble component and ensure the list only appends rather than re-renders.

PWA PREPARATION (future-proofing):
  9. Add a web app manifest file at client/public/manifest.json with: name "EnglishOS", short_name "EnglishOS", theme_color "#0A0A0F", background_color "#0A0A0F", display "standalone", icons (use a placeholder 192×192 and 512×512 dark icon with the EnglishOS wordmark).
  10. Add the manifest link to index.html and confirm mobile browsers show the "Add to Home Screen" prompt correctly.
```

---

### 10.4 — Final Production Checklist

```
In the EnglishOS application, run through the final production checklist and fix any remaining issues.

SECURITY:
  1. Verify that no API endpoint returns a passwordHash field in any response. Run a grep for "passwordHash" across all controller response objects.
  2. Verify that rate limiting is active on the auth endpoints — test by making 10 rapid POST /auth/login requests and confirming the 11th is blocked with a 429 response.
  3. Confirm helmet is setting: X-Content-Type-Options: nosniff, X-Frame-Options: DENY, Strict-Transport-Security (HTTPS only).
  4. Confirm that the OpenAI API key is only stored in server-side environment variables and is never exposed in any client-side code or API response.

FUNCTIONALITY VERIFICATION:
  5. Complete a full end-to-end user journey: register → onboard → complete Morning Mission → complete Evening Mission → view progress dashboard → submit Feynman Leaderboard entry → confirm all data persists correctly after page refresh.
  6. Test the accountability notification: manually set a learner's lastActiveDt to 3 days ago and trigger the daily checker — confirm the email is sent.
  7. Test the Level Gate: answer 70% of questions correctly and confirm the level is marked complete and the next level is unlocked.
  8. Test Batman Mode: manually set a learner's streak to 7 and trigger the mission complete — confirm Batman Mode activates and the badge is awarded.

PERFORMANCE:
  9. Confirm the Lighthouse score is ≥ 85 on Performance, ≥ 90 on Accessibility, ≥ 90 on Best Practices for the Landing page.
  10. Confirm API response times: GET /progress/dashboard < 200ms, POST /feynman/evaluate < 4000ms (includes OpenAI call), POST /conversation/message < 3000ms.

CLEANUP:
  11. Remove all console.log statements from client code. Replace any remaining TODO or placeholder comments with real implementations or tracked issues.
  12. Confirm the database seed data is complete and all Level 1 content (Modules 1–4) is correctly seeded with proper Roman Urdu translations, power pack flags, and sort orders.
  13. Write a brief README.md at the project root documenting: how to run in development, how to run in production, required environment variables, and how to seed the database.
```

---

## Quick Reference — Prompt Order Summary

| # | Prompt | Phase |
|---|---|---|
| 1.1 | Initialize the Project | Setup |
| 1.2 | Configure Design Token System | Setup |
| 1.3 | Set Up Environment Variables | Setup |
| 1.4 | Define Full Folder Structure | Setup |
| 1.5 | Set Up API Client | Setup |
| 1.6 | Configure Express Server | Setup |
| 2.1 | Build Core UI Component Library | UI/UX |
| 2.2 | Build Landing Page | UI/UX |
| 2.3 | Build Onboarding Flow | UI/UX |
| 2.4 | Build Mastery Map Page | UI/UX |
| 2.5 | Build Morning Mission Shell | UI/UX |
| 2.6 | Build Evening Mission Components | UI/UX |
| 2.7 | Build Progress and Profile Pages | UI/UX |
| 2.8 | Build App Router and Navigation | UI/UX |
| 3.1 | Define Prisma Schema | Database |
| 3.2 | Seed Content Database | Database |
| 3.3 | Build Content API | Database |
| 3.4 | Build Mission API | Database |
| 3.5 | Build Progress API | Database |
| 3.6 | Build Leaderboard API | Database |
| 4.1 | Build Auth Endpoints | Auth |
| 4.2 | Build Learner Profile Endpoints | Auth |
| 4.3 | Wire Auth to React Client | Auth |
| 5.1 | Connect Morning Mission to API | Learning Engine |
| 5.2 | Build Feynman API Endpoint | Learning Engine |
| 5.3 | Build Conversation Simulator API | Learning Engine |
| 5.4 | Connect Evening Mission to API | Learning Engine |
| 6.1 | Build XP and Rank System | Gamification |
| 6.2 | Build Badge System | Gamification |
| 6.3 | Build Polymath Profile Card | Gamification |
| 6.4 | Build Batman Mode Feature | Gamification |
| 7.1 | Build SR Engine Service | Spaced Repetition |
| 7.2 | Wire SR Engine to Client | Spaced Repetition |
| 7.3 | Build Level Wrap Ceremony | Spaced Repetition |
| 7.4 | Connect Progress Dashboard to Data | Spaced Repetition |
| 7.5 | Build Notification System | Spaced Repetition |
| 8.1 | Add Input Validation | Testing |
| 8.2 | Add Error Boundaries and Loading States | Testing |
| 8.3 | Fix Common Edge Cases | Testing |
| 8.4 | Performance Audit and Fixes | Testing |
| 9.1 | Prepare for Production Build | Deployment |
| 9.2 | Configure Production Server on Replit | Deployment |
| 9.3 | Database Production Setup | Deployment |
| 9.4 | Set Up Monitoring and Error Tracking | Deployment |
| 10.1 | Add SEO Meta Tags and Open Graph | SEO |
| 10.2 | Optimize Core Web Vitals | SEO |
| 10.3 | Optimize Mobile Experience | SEO |
| 10.4 | Final Production Checklist | SEO |

---

*EnglishOS Build Prompt Workflow — 87 Sequential Prompts*  
*Reference: EnglishOS Master PRD v2.0 — Power Edition*  
*Use with: Replit AI Coding Agent*
