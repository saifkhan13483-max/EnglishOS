# EnglishOS — Master Product Requirements Document
**Version:** 2.0 — POWER EDITION  
**Status:** Active  
**Classification:** Full Product Requirements Document  
**Product Name:** EnglishOS  
**Tagline:** *"Not a language app. An operating system for learning English."*  
**Ambition Level:** World-class EdTech — the Notion + Duolingo + Linear of language learning

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement and Market Opportunity](#2-problem-statement-and-market-opportunity)
3. [Vision, Strategy, and Differentiators](#3-vision-strategy-and-differentiators)
4. [Target Users and Personas](#4-target-users-and-personas)
5. [Core Methodology Framework](#5-core-methodology-framework)
6. [Product Scope — Full Version Map](#6-product-scope--full-version-map)
7. [User Journey and Learning Architecture](#7-user-journey-and-learning-architecture)
8. [Feature Requirements — Complete Specification](#8-feature-requirements--complete-specification)
9. [Content Architecture — Full Course Map](#9-content-architecture--full-course-map)
10. [Gamification and Motivation Engine](#10-gamification-and-motivation-engine)
11. [AI and Intelligence Layer](#11-ai-and-intelligence-layer)
12. [Design System — World-Class Visual Language](#12-design-system--world-class-visual-language)
13. [Interaction Design and Animation Specification](#13-interaction-design-and-animation-specification)
14. [Technical Architecture](#14-technical-architecture)
15. [Localization and Bilingual Requirements](#15-localization-and-bilingual-requirements)
16. [Monetization Strategy](#16-monetization-strategy)
17. [Non-Functional Requirements](#17-non-functional-requirements)
18. [Success Metrics and KPIs](#18-success-metrics-and-kpis)
19. [Competitive Landscape](#19-competitive-landscape)
20. [Risks and Mitigations](#20-risks-and-mitigations)
21. [Roadmap — Full Version Timeline](#21-roadmap--full-version-timeline)
22. [Appendix — Complete Course-to-Feature Mapping](#22-appendix--complete-course-to-feature-mapping)

---

## 1. Executive Summary

**EnglishOS** is the world's most methodologically rigorous English learning platform built for South Asian learners. It is not a content library, not a quiz app, and not a gamified flashcard tool. It is a complete **operating system for acquiring English fluency** — engineered around the neuroscience of language retention and the Polymath learning methodology.

Where Duolingo teaches vocabulary, EnglishOS builds fluency. Where YouTube courses provide content, EnglishOS builds systems. Where tutors provide feedback, EnglishOS builds independence.

The product is powered by four proven learning frameworks applied simultaneously:

| Framework | Purpose | App Expression |
|---|---|---|
| **DiSS** | Optimal learning structure | Sequential level system, Power Pack content, Level Gates |
| **Feynman Technique** | Deep comprehension vs. illusion of knowledge | Feynman Moments with AI evaluation after every module |
| **Spaced Repetition** | Long-term retention | Adaptive review engine surfacing cards at optimal intervals |
| **Serial Mastery** | Depth before breadth | One level at a time; completed levels enter Maintenance Mode |

The source content is a 300-day, 6-level English curriculum written bilingually in English and Roman Urdu. EnglishOS transforms this content into an interactive, mission-driven, AI-powered learning experience.

**The vision:** In 300 focused days, any Urdu/Hindi speaker can reach professional English fluency using EnglishOS — spending just 1 hour per day, with no tutor, no expensive course, and no willpower required.

---

## 2. Problem Statement and Market Opportunity

### 2.1 The Learner's Reality

| Problem | Root Cause | Scale |
|---|---|---|
| Start and quit within 3 weeks | No accountability, no stakes, no visible path forward | Affects 80%+ of self-learners |
| Understand but cannot speak | Content is passive; no speaking practice early enough | Affects virtually all app-based learners |
| Forget learned content rapidly | No spaced repetition; no retrieval practice | Proven by Ebbinghaus Forgetting Curve — 70% forgotten in 48 hours |
| Overwhelmed by the volume | No deconstruction; full syllabus shown upfront | Creates learned helplessness |
| Apps feel irrelevant | Designed for Western learners; no Roman Urdu support | 100% of South Asian learners |
| No sense of daily progress | No mission structure, no visible momentum | Major contributor to churn after Week 2 |

### 2.2 Market Opportunity

| Market | Size |
|---|---|
| English learners in Pakistan alone | 200M+ aspiring speakers |
| South Asia total addressable market | 800M+ Urdu/Hindi speakers seeking English fluency |
| Global EdTech market | $404 billion by 2025 (HolonIQ) |
| Mobile language learning | $8.7 billion and growing at 18.7% CAGR |

**The gap:** No single product combines methodological rigor, cultural relevance (Roman Urdu), gamification depth, and AI-powered personalization for this specific audience. EnglishOS owns this white space entirely.

### 2.3 Why Now

- AI is now cheap and capable enough to power real-time conversation partners
- South Asian smartphone penetration crossed 65% and is growing
- Post-COVID learning behavior shift — online learning is normalized
- The creator-course economy has proven that South Asian audiences will pay for structured learning when it feels relevant

---

## 3. Vision, Strategy, and Differentiators

### 3.1 Product Vision

> *"Every Urdu/Hindi speaker who wants to speak English confidently should have access to a system that guarantees fluency — in 300 focused days, with no tutor, no expensive course, and no willpower."*

### 3.2 Strategic Pillars

**Pillar 1 — Science Over Gimmicks**  
Every feature traces back to learning science. XP, streaks, and badges exist because they reinforce DiSS Stakes or Spaced Repetition — not because they are trendy.

**Pillar 2 — Culture First**  
Roman Urdu is a first-class language in the interface, not a translation afterthought. Every example sentence, every story, every scenario is drawn from South Asian life — chai not coffee, Lahore not London, bhai not brother when used as cultural framing.

**Pillar 3 — AI That Serves Learning**  
AI in EnglishOS exists for three jobs only: evaluate Feynman explanations, power the conversation simulator, and adapt the spaced repetition schedule. AI is a tutor, not a crutch.

**Pillar 4 — Design That Respects the Learner**  
The interface must feel like a premium product — the kind that makes learners proud to use it. Not childish. Not corporate. Bold, dark, cinematic, and purposeful.

**Pillar 5 — Systems Beat Willpower**  
Stakes, Level Gates, accountability partners, and Mission framing are all systems designed to remove reliance on motivation. The product works even when the learner does not feel like it.

### 3.3 Core Differentiators

| Differentiator | EnglishOS | Duolingo | British Council | YouTube Courses |
|---|---|---|---|---|
| Polymath methodology | ✅ Full | ❌ | ❌ | ❌ |
| Roman Urdu native support | ✅ First-class | ❌ | ❌ | Partial |
| AI conversation simulator | ✅ Level-gated vocab | ❌ | ❌ | ❌ |
| Feynman gap detection | ✅ | ❌ | ❌ | ❌ |
| Adaptive spaced repetition | ✅ Science-based | Partial | ❌ | ❌ |
| Stakes and accountability system | ✅ | Streak only | ❌ | ❌ |
| Sequential level locking | ✅ Enforced | ❌ Open | ❌ Open | ❌ Open |
| Mission framing (not lessons) | ✅ | ❌ | ❌ | ❌ |
| Shareable progress identity | ✅ Profile card | Basic | ❌ | ❌ |

---

## 4. Target Users and Personas

### 4.1 Primary Persona — "Bilal"

> *"I have tried to learn English three times. I always quit after three weeks. I don't know why."*

| Attribute | Detail |
|---|---|
| Age | 19–30 |
| Location | Pakistan, India, Bangladesh — urban and semi-urban |
| Native Language | Urdu or Hindi |
| Current English Level | Absolute beginner to lower-intermediate |
| Primary Motivation | Job interviews, career growth, first impressions |
| Device | Android mobile (primary), desktop (secondary) |
| Available Time | 45–90 minutes daily |
| Core Pain | Starts strong, loses momentum, quits by Week 3 |
| Core Need | A system that does not let him quit — with visible daily proof of progress |
| Willing to Pay | ₨500–₨1500/month if results are clear |

### 4.2 Secondary Persona — "Ayesha"

> *"My English reading is okay but when I have to speak I freeze completely."*

| Attribute | Detail |
|---|---|
| Age | 24–38 |
| Context | Working professional or educated homemaker |
| Current Level | Lower-intermediate — reads and writes acceptably, speaking confidence is zero |
| Available Time | 30–60 minutes in fragmented sessions |
| Core Need | Speaking practice without judgment, structured confidence building |
| Device | Mix of mobile and desktop |

### 4.3 Tertiary Persona — "Ahmed Sir"

> *"I teach this course and want my students to have a structured digital companion."*

| Attribute | Detail |
|---|---|
| Role | Course instructor or tuition teacher |
| Need | Assign the platform to students; track their progress; use as homework system |
| Feature Interest | Cohort dashboard, student progress reports, class-level analytics |
| Version | v2.0 feature |

### 4.4 Anti-Personas (Out of Scope v1.0)

- Advanced English speakers seeking IELTS/TOEFL prep only
- Learners who want unstructured self-paced content browsing
- Non-South Asian learners
- Children under 14 (content is adult-framed)

---

## 5. Core Methodology Framework

All product decisions must be traceable to one or more of the following frameworks. This is non-negotiable.

### 5.1 DiSS Framework — Deconstructed for Product

#### D — Deconstruct
- English fluency is deconstructed into 6 levels, each level into 4–6 modules, each module into daily missions
- The app never shows the learner the full mountain — only the current base camp and a glowing preview of the next city
- The psychological effect: the problem feels solvable at every point in the journey

#### i — Selection (20/80)
- Every module opens with its **Power Pack** — the 20% of content that produces 80% of practical results
- Power Pack items are visually marked, presented first, and weighted higher in the Spaced Repetition algorithm
- Examples from the course: 5 vowels before 21 consonants; 100 core words before 2500; 1 SVO formula before 12 tenses

#### S — Sequencing
- Module 2 is locked until Module 1 is complete. Level 2 is locked until Level 1 Gate is passed. No exceptions.
- The sequence follows the course exactly: Letters → Words → Sentences → Grammar → Tenses → Advanced
- Rationale: Learning in wrong sequence is not slower — it is actually counterproductive

#### S — Stakes
- On Day 1, at least one personal stake must be set before the first mission launches
- Stakes options: accountability partner notification, personal commitment statement, daily reminder that references the learner's "Why"
- Level Gates are non-bypassable stakes built into the system — they enforce Serial Mastery at scale
- The UI explicitly surfaces the loss aversion psychology: *"Your brain protects what it stands to lose. Set your stake."*

### 5.2 Feynman Technique — Built Into Every Module

**The core principle:** If you cannot explain it simply, you do not understand it.

**Application:**
1. Every Morning Mission ends with a Feynman Moment — an open prompt to explain the day's concept simply
2. The AI evaluates for vocabulary usage and clarity, not grammar at early levels
3. Words the learner could not use in their explanation become Knowledge Gap items, automatically scheduled for review
4. Past Feynman responses are archived and shown on a growth timeline — watching your own explanations improve is one of the most motivating features in the product

**The psychological effect:** Feynman Moments are the single most effective anti-cheat mechanism in the product. You cannot fake understanding when you have to explain it in your own words.

### 5.3 Spaced Repetition — The Retention Engine

**The science:** The Ebbinghaus Forgetting Curve shows 50% of new information is lost within 24 hours and 70% within 48 hours. The only proven counter is reviewing content at exponentially increasing intervals.

**EnglishOS Implementation:**
- Base intervals from the course: **Day 1 → Day 3 → Day 7 → Day 21**
- Adaptive: incorrect responses collapse the interval back to Day 1; correct responses extend the next interval by 1.5×
- Every vocabulary word, grammar rule, and sentence pattern has its own interval tracker
- The Warm-up Flash each morning pulls from the Spaced Repetition queue — not from random content

**The Brain Compound Meter:** The visual representation of the learner's real retention health. It fills only through completed SR reviews. This is the product's most important metric — not XP, not streaks.

### 5.4 Serial Mastery — One Level, Full Depth

**The principle:** Polymaths are not people who learn everything at once. They are people who master one thing at a time and then compound.

**EnglishOS Implementation:**
- Only one level is visible at full detail at any time
- Completed levels enter Maintenance Mode — kept alive through 5–10 minutes of daily SR, no active re-study required
- The Level Wrap Ceremony marks the formal transition between levels — celebrating before moving forward
- Learners who complete Level 1 are explicitly told: *"You have just done what most people never do — you finished something. Now Level 2 is yours."*

---

## 6. Product Scope — Full Version Map

### 6.1 v1.0 — Launch (Months 1–3)

| Area | Features Included |
|---|---|
| Onboarding | Diagnostic placement, My Why, Stakes setup, Map reveal |
| Learning | Morning Mission + Evening Mission for Level 1 (30 days full content) |
| AI | Text-based Conversation Simulator (Level 1 vocabulary-constrained) |
| AI | Feynman Evaluator (vocabulary usage + clarity scoring) |
| Spaced Repetition | Full SR engine with 1→3→7→21 base intervals |
| Gamification | XP, Brain Compound Meter, Badges, Mastery Map, Batman Mode |
| Accountability | Stakes system, accountability partner email |
| Community | Feynman Leaderboard (weekly) |
| Progress | Dashboard, Day Close summary, Feynman Archive |
| Content | Level 1 fully built (30 days × 2 missions); Level 2–3 framework ready |
| Design | Full dark cinematic design system implemented |

### 6.2 v1.1 — Growth (Months 4–6)

| Area | New Features |
|---|---|
| Content | Levels 2 and 3 fully built (45 days each) |
| AI | Voice input for Conversation Simulator |
| AI | Voice Feynman Moment (speak your explanation) |
| Gamification | Deep Mission unlocks via Brain Compound Meter |
| Social | Shareable Polymath Profile Card (image export) |
| Notifications | Smart notification system (optimal learning time detection) |
| Analytics | Personal growth dashboard with charts |

### 6.3 v2.0 — Scale (Months 7–12)

| Area | New Features |
|---|---|
| Content | Levels 4, 5, 6 fully built (60 days each) |
| Platform | Native iOS and Android apps |
| AI | Adaptive difficulty — AI adjusts content pacing based on learner performance |
| Educator | Instructor dashboard — cohort management, student progress, class analytics |
| Monetization | Freemium paywall, subscription billing, family plans |
| Exam Prep | IELTS and CSS English exam preparation modules |
| Offline | Offline mode for all core mission content |
| Community | Learner communities by level and cohort |

---

## 7. User Journey and Learning Architecture

### 7.1 The Mastery Map — Visual Journey

The journey is presented as a **cinematic geographic map** that the learner physically travels through. Each location is a level. The art direction should evoke a sense of epic journey — like setting off across a world map in an RPG — not a classroom.

```
╔══════════════════════════════════════════════════════════════════╗
║                        THE MASTERY MAP                          ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  [BASE CAMP] ──────► [VILLAGE] ──────► [TOWN]                   ║
║   Level 1              Level 2           Level 3                 ║
║   30 Days              45 Days           45 Days                 ║
║   ───────────          ──────────        ──────────              ║
║   Alphabets            Grammar           All Tenses              ║
║   100 Core Words       Conversation      500 Words               ║
║   Basic Sentences      Daily Topics      Stories & Reading       ║
║       ▼                    ▼                  ▼                  ║
║  [CITY] ◄────────── [CAPITAL] ◄───────── [WORLD STAGE]          ║
║   Level 4              Level 5           Level 6                 ║
║   60 Days              60 Days           60 Days                 ║
║   ───────────          ──────────        ──────────              ║
║   Reading/Writing      Advanced Grammar  Professional English    ║
║   Complex Sentences    Idioms/Phrasal    Job & Exam Prep         ║
║   Speaking Practice    Fluency           Confidence & Delivery   ║
║                                                                  ║
║  Total: ~300 Days   |   Daily: 1 Hour   |   Result: Fluency      ║
╚══════════════════════════════════════════════════════════════════╝
```

**Map Design Rules:**
- Current location: fully illuminated, animated, pulsing — learner can see their exact position
- Next location: visible but slightly obscured — shows what is coming, creates aspiration
- Locked locations (2+ ahead): visible as silhouettes on the horizon — the destination is always visible
- Completed locations: glowing with a completion badge, path between them lit up
- The map is the home screen — not a menu, not a dashboard, the MAP

### 7.2 Onboarding Flow — "The Sorting" (Day 1, under 10 minutes)

```
STEP 1: Language Diagnostic (5 min)
  → Conversational input prompt: "Tell us anything about yourself in English"
  → AI evaluates vocabulary range, sentence construction, confidence markers
  → Output: placement at Level 1, 2, or 3

STEP 2: My Why Selection (1 min)
  → Job Interview / Career Growth / Social Confidence / Study Abroad /
    Talking to Family Abroad / Building a Business / Other
  → "Why" is displayed on dashboard and woven into mission copy throughout journey

STEP 3: Daily Commitment (1 min)
  → Morning session time selection (7am / 8am / 9am / custom)
  → Evening session time selection (7pm / 8pm / 9pm / custom)
  → System recommends: 20 min morning + 40 min evening = 1 hour total

STEP 4: Stakes Setup (2 min)
  → Accountability partner email (optional but recommended)
  → Personal commitment statement (required)
  → Trigger: "Notify my partner if I miss 3 days in a row"
  → UI shows DiSS Stakes principle with one sentence explanation

STEP 5: Map Reveal (30 seconds)
  → Cinematic animation reveals the full Mastery Map
  → Learner's starting position glows
  → World Stage is visible on the horizon
  → First mission launches immediately with a "Begin Mission 1" CTA
```

### 7.3 Daily Session Architecture

#### Morning Mission — "Learn Mode" (20 minutes)

| Phase | Time | Activity | Methodology |
|---|---|---|---|
| Warm-up Flash | 2 min | 5 review cards from the SR queue — rapid fire | Spaced Repetition |
| Core Drop | 10 min | New content via interactive cards (Power Pack first) | DiSS Selection + Sequencing |
| Apply It | 5 min | Use today's content in a micro-scenario (real life situation) | Active retrieval |
| Feynman Moment | 3 min | Explain today's concept in simple words (text or voice) | Feynman Technique |

#### Evening Mission — "Practice Mode" (40 minutes)

| Phase | Time | Activity | Methodology |
|---|---|---|---|
| Story Replay | 10 min | Today's vocabulary inside an interactive visual novel story | Contextual encoding |
| Build a Sentence | 10 min | Drag-and-drop SVO sentence constructor — positive, negative, question | Active construction |
| Conversation Sim | 15 min | AI chat partner using only learned vocabulary | Speaking confidence |
| Day Close | 5 min | Tomorrow's SR schedule preview + Day summary card | Spaced Repetition prep |

### 7.4 Level Gate System

Every level ends with a Level Gate Challenge — a comprehensive assessment covering all modules of that level.

```
LEVEL GATE RULES:
  → Cannot be skipped under any circumstances
  → Minimum passing threshold: 70%
  → Unlimited retries allowed with 24-hour cooldown between attempts
  → Covers all Power Pack items from all modules in the level
  → On pass: Level Wrap Ceremony → Next level unlock animation
  → On fail: Targeted review — shows exactly which modules need more work
```

---

## 8. Feature Requirements — Complete Specification

### 8.1 FR-001 — Onboarding and Diagnostic

| ID | Requirement | Priority | Notes |
|---|---|---|---|
| FR-001-01 | Diagnostic via conversational input, not multiple-choice | P0 | Natural language assessment |
| FR-001-02 | Complete in under 10 minutes | P0 | Drop-off risk above 10 min |
| FR-001-03 | Place learner at Level 1, 2, or 3 | P0 | Levels 4–6 require prior completion |
| FR-001-04 | My Why must be selected from a list with free-text option | P0 | Drives mission copy throughout |
| FR-001-05 | At least one stake required before mission launches | P0 | DiSS Stakes enforced |
| FR-001-06 | Stakes must include accountability partner email option | P1 | Core retention mechanic |
| FR-001-07 | Map Reveal animation must play on first launch | P1 | Cinematic onboarding moment |
| FR-001-08 | Session time preferences saved and used for notifications | P1 | Smart reminders |

### 8.2 FR-002 — Morning Mission

| ID | Requirement | Priority |
|---|---|---|
| FR-002-01 | Warm-up Flash: exactly 5 cards pulled from SR queue | P0 |
| FR-002-02 | Core Drop: Power Pack items appear before supplementary content | P0 |
| FR-002-03 | Roman Urdu toggle available on every content card | P0 |
| FR-002-04 | Apply It: micro-scenario must use vocabulary from today's Core Drop only | P0 |
| FR-002-05 | Feynman Moment: voice OR text input option | P0 |
| FR-002-06 | Feynman AI evaluator must respond within 3 seconds | P1 |
| FR-002-07 | Feynman Knowledge Gap items must auto-queue into next SR session | P0 |
| FR-002-08 | Mission progress bar visible at all times | P1 |
| FR-002-09 | Pause and resume within the same calendar day | P1 |

### 8.3 FR-003 — Evening Mission

| ID | Requirement | Priority |
|---|---|---|
| FR-003-01 | Story Replay: vocabulary from current module embedded in narrative | P0 |
| FR-003-02 | Story must have at least 2 choice points that affect direction | P1 |
| FR-003-03 | Sentence Builder: drag-and-drop with SVO formula header visible | P0 |
| FR-003-04 | Sentence Builder: supports Positive, Negative, Question modes | P0 |
| FR-003-05 | Sentence Builder: immediate feedback with correct answer shown on error | P0 |
| FR-003-06 | Conversation Sim: AI uses only vocabulary from covered modules | P0 |
| FR-003-07 | Conversation Sim: AI prompts re-try on unclear or off-topic input | P1 |
| FR-003-08 | Day Close: tomorrow's SR card count shown | P1 |
| FR-003-09 | Day Close: Day summary card shareable as image | P2 |

### 8.4 FR-004 — Spaced Repetition Engine

| ID | Requirement | Priority |
|---|---|---|
| FR-004-01 | Every vocabulary word, grammar rule, and sentence pattern tracked individually | P0 |
| FR-004-02 | Default intervals: 1 → 3 → 7 → 21 days | P0 |
| FR-004-03 | Incorrect response: interval resets to 1 day | P0 |
| FR-004-04 | Correct response: next interval ×1.5 | P0 |
| FR-004-05 | Feynman Knowledge Gap items: next day regardless of current interval | P0 |
| FR-004-06 | Daily Warm-up Flash: pulled from SR queue only | P0 |
| FR-004-07 | Brain Compound Meter increments only on completed SR sessions | P0 |
| FR-004-08 | Brain Compound Meter drains if SR sessions are skipped for 3+ days | P1 |
| FR-004-09 | Completed Levels enter Maintenance Mode: SR-only, 5–10 min/day | P0 |
| FR-004-10 | Learner can view full SR backlog in progress dashboard | P2 |

### 8.5 FR-005 — Feynman Evaluation System

| ID | Requirement | Priority |
|---|---|---|
| FR-005-01 | Text and voice input options on all Feynman Moments | P0 |
| FR-005-02 | AI evaluates: vocabulary usage (40%), simplicity (35%), relevance (25%) | P0 |
| FR-005-03 | Score displayed immediately with constructive feedback | P0 |
| FR-005-04 | Words from covered modules absent from the explanation → Knowledge Gap | P0 |
| FR-005-05 | Feynman Archive: all past responses stored with date and score | P1 |
| FR-005-06 | Archive shows a clarity score trend line over time | P1 |
| FR-005-07 | No grammar penalization at Levels 1–2; grammar scoring activates at Level 3 | P0 |
| FR-005-08 | Weekly Feynman submissions for Community Leaderboard (opt-in) | P1 |

### 8.6 FR-006 — Content Delivery

| ID | Requirement | Priority |
|---|---|---|
| FR-006-01 | Alphabet cards: tap letter → hear sound → see example word | P0 |
| FR-006-02 | Vowels visually differentiated from consonants on all displays | P0 |
| FR-006-03 | Vocabulary cards: English word + Roman Urdu + audio + example sentence | P0 |
| FR-006-04 | Grammar rules as visual formula cards with color-coded components | P0 |
| FR-006-05 | Be Verbs rule card: animated subject → verb color matching | P0 |
| FR-006-06 | Power Pack badge visible on all high-priority content items | P0 |
| FR-006-07 | Each module opens with a DiSS Framework card — contextualizing the learning | P1 |
| FR-006-08 | All audio content recorded by a native English speaker with South Asian accent clarity | P0 |

### 8.7 FR-007 — Gamification System

| ID | Requirement | Priority |
|---|---|---|
| FR-007-01 | XP awarded per activity per the XP table | P0 |
| FR-007-02 | Brain Compound Meter: separate from XP, SR-only | P0 |
| FR-007-03 | Full Brain Compound Meter unlocks Deep Mission | P1 |
| FR-007-04 | Skill badge per completed module | P0 |
| FR-007-05 | Polymath Profile Card with all badges, level, streak, Compound Meter | P1 |
| FR-007-06 | Profile Card exportable as image | P2 |
| FR-007-07 | Batman Mode: 7-day streak → 1 skip day per week protected | P0 |
| FR-007-08 | Batman Mode UI copy: *"You planned ahead. That's the difference."* | P0 |
| FR-007-09 | Level Wrap Ceremony: animated celebration + skill summary + map unlock | P0 |
| FR-007-10 | Feynman Community Leaderboard: weekly, opt-in, voted by community | P1 |

### 8.8 FR-008 — Level Gate System

| ID | Requirement | Priority |
|---|---|---|
| FR-008-01 | Level Gate: cannot be bypassed | P0 |
| FR-008-02 | Minimum passing threshold: 70% | P0 |
| FR-008-03 | Unlimited retries with 24-hour cooldown | P0 |
| FR-008-04 | Gate covers all Power Pack items from all level modules | P0 |
| FR-008-05 | On fail: show specific module breakdown of incorrect items | P0 |
| FR-008-06 | On pass: Level Wrap Ceremony triggers immediately | P0 |
| FR-008-07 | Next level is completely inaccessible until Gate is passed | P0 |

### 8.9 FR-009 — Accountability and Stakes

| ID | Requirement | Priority |
|---|---|---|
| FR-009-01 | Accountability partner email notification after 3 missed days | P0 |
| FR-009-02 | Personal commitment statement stored and displayed on dashboard | P0 |
| FR-009-03 | Stakes visible on every dashboard session | P1 |
| FR-009-04 | Learner can update stakes with a confirmation step | P2 |
| FR-009-05 | Smart notification at learner's selected session time if mission not started | P1 |

### 8.10 FR-010 — Mastery Map and Progress

| ID | Requirement | Priority |
|---|---|---|
| FR-010-01 | Map is the primary home screen — not a menu | P0 |
| FR-010-02 | Current level: animated, illuminated, pulsing | P0 |
| FR-010-03 | Next level: visible but partially obscured | P0 |
| FR-010-04 | Locked levels: visible as silhouettes on the horizon | P0 |
| FR-010-05 | Completed levels: glowing with badge, path lit up | P0 |
| FR-010-06 | Dashboard accessible from map (secondary screen, not primary) | P0 |
| FR-010-07 | Dashboard shows: streak, Brain Compound Meter, today's missions, My Why | P0 |

---

## 9. Content Architecture — Full Course Map

### 9.1 Level 1 — Base Camp (30 Days, Full Build for Launch)

#### Module 1: Alphabets and Sounds (Days 1–5)

| Component | Content |
|---|---|
| Power Pack | 5 Vowels (A, E, I, O, U) — these 5 unlock 40% of English sounds |
| Full Content | 26 letters with audio, Urdu sound, example word, example sentence |
| Interactive Elements | Tap-to-hear letter board; animated vowel spotlight; vowel vs. consonant sorting game |
| Feynman Prompt | "Explain what vowels are and why they are special — as if to a 10-year-old" |
| SR Schedule | Day 6 (5 min), Day 8 (5 min), Day 15 (5 min) |
| Apply It Scenario | "You are spelling your name to a new friend. Go." |

#### Module 2: Core 100 Words (Days 6–12)

| Group | Words | Power Pack Status |
|---|---|---|
| Group A — Pronouns | I, You, He, She, It, We, They, Me, Him, Her, Us, Them | ⭐ Power Pack |
| Group B — Be Verbs | am, is, are, was, were + Golden Rule | ⭐ Power Pack |
| Group C — Action Verbs | 50 core action verbs (go, come, eat, drink, sleep, work...) | ⭐ Power Pack |
| Group D — Nouns | 28 essential nouns (family, home, time, work, food...) | Standard |
| Group E — Adjectives | 22 core adjectives (good, bad, big, small, happy, sad...) | Standard |
| Group F — Connectors | 18 connectors (and, but, or, because, so, if, when...) | ⭐ Power Pack |

| Feynman Prompt | "Pick 5 action verbs. Tell me a tiny story using all 5 — simple words only." |
|---|---|
| SR Schedule | Day 13 (A+B), Day 16 (C+D), Day 20 (E+F), Day 30 (20 random) |

#### Module 3: Basic Sentences (Days 13–20)

| Component | Content |
|---|---|
| Power Pack | The SVO Master Formula: Subject + Verb + Object |
| Sentence Types | Positive (S+V+O), Negative (S + do not/does not + V), Question (Do/Does/Is/Are + S + V + ?) |
| NOT Rules | I/You/We/They → don't; He/She/It → doesn't; visual rule card |
| Be Verb Sentences | I am, She is, We are — animated color-coded card |
| Feynman Prompt | "Explain the sentence formula to a 10-year-old using 3 example sentences" |
| Sentence Builder | Drag-and-drop all three sentence types using words from Modules 1–2 |

#### Module 4: Daily Life Phrases (Days 21–27)

| Area | Phrases |
|---|---|
| Greetings | Hello, Good morning, How are you?, Nice to meet you, Goodbye |
| Requests | Can you help me?, Please, Thank you, I need... |
| Daily Life | I am hungry, I am tired, Let's go, What time is it? |
| Introductions | My name is..., I am from..., I work at..., I study at... |

#### Level 1 Gate (Days 28–30)
- Covers: all Power Pack items from Modules 1–4
- Format: mixed — listening, reading, sentence building, vocabulary recall
- Threshold: 70% to unlock Level 2

### 9.2 Level 2 — Village (45 Days)

| Module | Focus | Key Content |
|---|---|---|
| Module 5 | Articles and Plurals | a, an, the — rules and exceptions; singular/plural forms |
| Module 6 | Present Simple Tense | Full conjugation, positive/negative/question; habitual actions |
| Module 7 | Basic Conversation Patterns | Questions and answers; conversation turn-taking; listening cues |
| Module 8 | Daily Topics | Family, food, weather, school, work, health — vocabulary and sentences |
| Module 9 | Prepositions and Location | in, on, at, under, above, between, next to — visual spatial practice |
| Level 2 Gate | Full Level 2 assessment | Minimum 70% required |

### 9.3 Level 3 — Town (45 Days)

| Module | Focus | Key Content |
|---|---|---|
| Module 10 | All 12 Tenses — Overview | Present Simple, Continuous, Perfect, Perfect Continuous × 3 time frames |
| Module 11 | 500 Core Vocabulary Expansion | Thematic word groups (travel, technology, health, work, relationships) |
| Module 12 | Reading Short Stories | 5 progressive stories with comprehension questions |
| Module 13 | Listening and Context | Audio scenarios with comprehension — accent and speed variation |
| Level 3 Gate | Full Level 3 assessment | Minimum 70% required |

### 9.4 Levels 4–6 — City, Capital, World Stage (60 Days Each)

Full module specification to be developed in Content Design phase. Framework:

| Level | Core Skills |
|---|---|
| Level 4 | Complex Sentences, Paragraphs, Formal Writing, Speaking Practice |
| Level 5 | Advanced Grammar, Idioms, Phrasal Verbs, Fluency Training |
| Level 6 | Professional English, Presentations, Interview Preparation, Exam Strategies |

### 9.5 Content Card Taxonomy

| Card Type | Description | Module Usage |
|---|---|---|
| Alphabet Card | Letter + sound + example word + audio | Module 1 |
| Vocabulary Flash Card | Word + Roman Urdu + example sentence + audio | All modules |
| Grammar Rule Card | Visual formula with color-coded SVO components | Modules 3+ |
| Story Panel | Visual novel panel with dialogue and choices | Evening Missions |
| Sentence Builder | Drag-and-drop word tile constructor | Evening Missions |
| Feynman Prompt Card | Open-ended explanation challenge | End of Morning Mission |
| SR Review Card | Recall card from previous sessions | Warm-up Flash |
| Deep Mission Card | Advanced cross-module challenge | Unlocked by Brain Compound Meter |

### 9.6 Power Pack Labeling Standard

Every module must identify its Power Pack before content build begins.

**Criteria for Power Pack designation:**
- Item is used in more than 60% of everyday conversations at this level
- Item appears in 3 or more subsequent modules
- Item is a prerequisite for understanding other Power Pack items

**Visual treatment:**
- Gold border + ⭐ Power Pack badge in top-right corner
- Shown first in the module sequence
- Weighted 2× in the Spaced Repetition algorithm
- Always included in Level Gate

---

## 10. Gamification and Motivation Engine

### 10.1 XP Economy

| Activity | XP |
|---|---|
| Complete Morning Mission | 50 XP |
| Complete Evening Mission | 100 XP |
| Feynman Moment (text) | 30 XP |
| Feynman Moment (voice) | 50 XP |
| Perfect Warm-up Flash (5/5 correct) | 25 XP bonus |
| Full Conversation Sim session | 75 XP |
| Level Gate pass — first attempt | 500 XP bonus |
| Level Gate pass — second attempt | 250 XP |
| Spaced Repetition review (per card) | 10 XP |
| Feynman Leaderboard submission | 40 XP |
| 7-day streak achieved | 200 XP bonus |

**Important:** XP earns Rank but does **not** unlock content. Only Level Gate passage unlocks levels.

### 10.2 Learner Ranks

| Rank Name | XP Required | Identity |
|---|---|---|
| Rookie | 0 | Just starting |
| Speaker | 500 | Can form basic sentences |
| Communicator | 1,500 | Can hold simple conversations |
| Conversationalist | 3,000 | Comfortable in daily English |
| Fluent | 6,000 | Level 4 territory |
| Professional | 12,000 | Level 5 territory |
| Polymath | 20,000 | Level 6 complete |

### 10.3 Brain Compound Meter

- Completely separate from XP
- Fills through SR session completions only — 1% per review card correctly answered
- Represents **genuine retention**, not activity
- When at 100%: Deep Mission unlocked (resets meter to 0)
- Drains at 5% per day if SR reviews are skipped for 3+ consecutive days
- Displayed prominently on dashboard — the learner's real learning health score

### 10.4 Batman Mode — Streak Insurance

```
Activation: 7 consecutive days of both missions completed
Benefit: 1 protected skip day per week — streak survives
Reset: Skip day used → Batman Mode deactivates → earn again in 7 days
UI Message on skip day: "You planned ahead. That's what separates Batman from everyone else."
UI Message during Batman Mode: "Batman Mode Active — You've earned one skip."
```

### 10.5 Polymath Profile Card

A shareable identity card showing the learner's full progress state:

```
┌─────────────────────────────────────────────┐
│  POLYMATH PROFILE                           │
│  Name: Bilal Ahmed                          │
│  Rank: Communicator                         │
│  Level: 2 — Village                        │
│  Day: 47 of 300                             │
│  Streak: 23 days  🔥                        │
│  Brain Compound: ████████░░ 82%             │
│  Modules: [M1✓][M2✓][M3✓][M4✓][M5✓][M6...]│
│  My Why: Career Growth                      │
│  EnglishOS.com                              │
└─────────────────────────────────────────────┘
```

Exportable as a styled image for sharing on WhatsApp, LinkedIn, Instagram.

### 10.6 Feynman Community Leaderboard

- Weekly cycle (Monday to Sunday)
- Learners optionally submit their best Feynman Moment from the week
- Community upvotes based on clarity and simplicity (not fluency or grammar at beginner levels)
- Top 3 featured on the home dashboard the following week with their explanation highlighted
- Moderator-reviewed to prevent spam

### 10.7 Level Wrap Ceremony

Triggered immediately on Level Gate pass:

```
SEQUENCE:
1. Full-screen celebration animation (3 seconds)
2. Summary card: "In [X] days you learned:"
   → N vocabulary words
   → N grammar rules
   → N sentence patterns
   → Clarity score improvement: +X% since Day 1
3. Motivational line tied to My Why (e.g., "Your job interview English is ready. Keep going.")
4. Map animation: current location badge lights up; path to next location illuminates
5. Next level location revealed with a "Begin Level [X]" CTA
```

---

## 11. AI and Intelligence Layer

### 11.1 Conversation Simulator

**Purpose:** Speaking confidence in a judgment-free, level-gated environment from Day 7.

**Architecture:**
- AI partner prompt is constructed with a strict vocabulary allowlist — only words from modules completed by the learner
- Conversation topics map to the current module's Apply It scenario
- AI responses are calibrated to the learner's level: short sentences, simple vocabulary, slow implied pacing
- AI detects unclear input and prompts rephrasing: *"I didn't quite understand. Try saying that differently."*

**Conversation Topic Library by Level:**

| Level | Topics |
|---|---|
| 1 | Introducing yourself, describing your home, talking about your family, ordering food, asking for directions |
| 2 | Describing your daily routine, talking about work or school, discussing the weather, making simple plans |
| 3 | Sharing opinions, describing past events, talking about future plans, telling a simple story |
| 4–6 | Professional scenarios, presentations, debates, job interviews |

**v1.0:** Text-based input and output  
**v1.1:** Voice input — learner speaks, AI responds in text  
**v2.0:** Full voice conversation with pronunciation feedback

### 11.2 Feynman AI Evaluator

**Evaluation Model:**

| Dimension | Weight | What It Measures |
|---|---|---|
| Vocabulary Usage | 40% | Did the learner use words from covered modules? How many? |
| Simplicity Score | 35% | Readability grade — is the explanation accessible to a 10-year-old? |
| Relevance | 25% | Does the explanation address the actual concept asked about? |

**Output for Learner:**
- Clarity Score: 0–100
- Encouragement message (always positive framing)
- Knowledge Gap list: "These words from your lessons did not appear in your explanation — we'll review them tomorrow"
- For v1.1+: Spoken explanation analysis with pronunciation notes

### 11.3 Diagnostic Placement Engine

**Input:** Learner's free-text response during onboarding  
**Processing:**
- Vocabulary breadth check (words used vs. known words database)
- Sentence structure identification (SVO correctness, tense usage)
- Average sentence complexity score

**Output:**
- Level 1: Minimal vocabulary, no sentence construction visible
- Level 2: 50–100 known words, basic sentence patterns present
- Level 3: 200+ words, multiple tense usage, some complex sentences

### 11.4 Adaptive Spaced Repetition Algorithm

**Core logic:**

```
For each content item i:
  interval(i, 0) = 1 day
  interval(i, n) = interval(i, n-1) × 1.5   [if correct]
  interval(i, n) = 1 day                     [if incorrect]
  interval(i, n) = 1 day                     [if Knowledge Gap flagged by Feynman]

Priority queue:
  Items due today first
  Knowledge Gap items override all queue positions
  Power Pack items get ×2 frequency weighting in early intervals
```

**v2.0 Enhancement:** Full SM-2 algorithm implementation with ease factor per item, adjusting for individual learner memory patterns.

---

## 12. Design System — World-Class Visual Language

This section defines the complete design language for EnglishOS. The aesthetic must feel like the intersection of **Notion's clarity**, **Linear's craftsmanship**, and **a cinematic dark RPG UI**. Bold. Sophisticated. Purposeful. Nothing childish. Nothing corporate.

### 12.1 Color System

```
FOUNDATION
  Background Primary:    #0A0A0F   (near black — deep space)
  Background Secondary:  #111118   (elevated surfaces)
  Background Tertiary:   #1A1A28   (cards and panels)
  Border Subtle:         #2A2A3E   (card borders)
  Border Strong:         #3A3A5A   (interactive borders)

BRAND COLORS
  Brand Red (primary accent):   #E94560   (CTA, progress, alerts)
  Brand Blue (secondary):       #4A9EFF   (info, links, formula highlights)
  Brand Gold (power pack):      #F5B014   (power pack badge, achievements)
  Brand Green (success):        #2ECC71   (completion, correct answers)

TEXT
  Text Primary:    #FFFFFF   (headings, important labels)
  Text Secondary:  #C8C8E0   (body content, descriptions)
  Text Muted:      #6A6A8A   (placeholders, timestamps, subtitles)
  Text Accent:     #E94560   (section headers, key labels)

SEMANTIC
  XP Gold:         #F5B014
  Brain Meter:     #4A9EFF   (fills left to right in blue)
  Streak Fire:     #FF6B35
  Batman Mode:     #7B68EE   (purple — special state)
  Level Complete:  #2ECC71
  Level Locked:    #3A3A5A
  Power Pack:      #F5B014
```

### 12.2 Typography System

```
TYPEFACES
  Display:    'Space Grotesk' — bold, modern, slightly geometric
  Body:       'Inter' — maximum readability at all sizes
  Mono/Code:  'JetBrains Mono' — grammar formulas, code-like rules
  Urdu/Roman: 'Noto Sans' — correct Roman Urdu rendering

TYPE SCALE
  Display XL:   72px / 800 weight — hero moments, Level Wrap
  Display L:    48px / 800 weight — section heroes, map location names
  Heading 1:    32px / 700 weight — screen titles
  Heading 2:    24px / 700 weight — section headers
  Heading 3:    18px / 600 weight — card titles
  Body Large:   16px / 400 weight — primary reading content
  Body:         14px / 400 weight — cards, descriptions
  Body Small:   12px / 400 weight — metadata, timestamps
  Label:        11px / 600 weight / uppercase / 0.5px tracking — tags, badges

LINE HEIGHT
  Display: 1.1
  Headings: 1.2
  Body: 1.6
  Cards: 1.5
```

### 12.3 Spacing System

8px base grid. All spacing values are multiples of 8.

```
4px   — micro (between related inline elements)
8px   — xs (internal card padding minimum)
12px  — sm (compact elements)
16px  — md (standard internal padding)
24px  — lg (between card elements)
32px  — xl (between sections)
48px  — 2xl (major section breaks)
64px  — 3xl (hero padding)
96px  — 4xl (page-level padding)
```

### 12.4 Component Specifications

#### Content Card
```
Background:    #1A1A28
Border:        1px solid #2A2A3E
Border-radius: 16px
Padding:       24px
Shadow:        0 4px 24px rgba(0,0,0,0.4)
Hover state:   Border color → #4A9EFF, shadow expands
Active state:  Scale 0.98, border color → #E94560
```

#### Power Pack Card
```
Inherits Content Card +
Border:        1px solid #F5B014
Badge:         Top-right corner, gold background, "⭐ POWER PACK" label
Glow:          0 0 20px rgba(245,176,20,0.15) background glow
```

#### Primary CTA Button
```
Background:     #E94560
Color:          #FFFFFF
Font:           14px / 700 weight
Border-radius:  12px
Padding:        14px 28px
Hover:          Background lightens 10%, scale 1.02
Active:         Scale 0.97
Disabled:       Opacity 0.4, cursor not-allowed
```

#### Brain Compound Meter
```
Height:         8px
Background:     #1A1A28
Fill:           Linear gradient left→right: #4A9EFF → #7B68EE
Border-radius:  100px
Animation:      Smooth fill with easing on update
Label:          Percentage + "Brain Compound" label above
```

#### Mastery Map Location Node
```
Unlocked+Active:
  Circle size:    80px
  Background:     Radial gradient (brand color → transparent)
  Border:         2px solid brand color
  Animation:      Slow pulse (2s), subtle glow orbit ring
  
Unlocked+Complete:
  Border:         2px solid #2ECC71
  Badge:          Completion checkmark overlay
  Glow:           Green ambient glow
  
Locked:
  Opacity:        0.4
  Border:         1px dashed #3A3A5A
  Lock icon:      Center, muted color
```

### 12.5 Iconography

- Icon library: **Phosphor Icons** — weight: Regular for body, Bold for emphasis
- All icons paired with text labels (never icon-only for primary navigation)
- Icon color matches surrounding text color unless used as a status indicator

### 12.6 Illustration Style

- Style: Semi-flat with subtle depth — not 3D, not pure flat
- Color palette: Dark backgrounds with brand color accents
- Character design: South Asian representation — Bilal and Ayesha as recurring illustrated characters in mission and onboarding screens
- Map art: Top-down illustrated world map with South Asian-inspired architecture for early levels (Base Camp, Village, Town), transitioning to modern cityscape for advanced levels

---

## 13. Interaction Design and Animation Specification

### 13.1 Core Animation Principles

1. **Purposeful** — every animation communicates state, not decoration
2. **Fast** — micro-interactions under 200ms; celebrations under 600ms
3. **Eased** — use cubic-bezier easing, never linear
4. **Responsive** — animations must work at 60fps on mid-range Android

### 13.2 Animation Library

| Interaction | Duration | Easing | Effect |
|---|---|---|---|
| Card tap | 120ms | ease-out | Scale 0.96 → 1.0 + ripple |
| Card flip (vocab reveal) | 300ms | ease-in-out | 3D Y-axis flip |
| Correct answer | 400ms | spring | Green flash + checkmark scale-in + XP float |
| Wrong answer | 300ms | ease-out | Red flash + shake (3px horizontal) |
| Mission complete | 600ms | ease-out | Full-screen gradient sweep + score card slide-up |
| Level Gate pass | 2000ms | multi-stage | Particle burst → map animation → next level reveal |
| Streak milestone | 800ms | spring | Fire emoji scale up + XP counter roll |
| Batman Mode unlock | 1200ms | ease-out | Dark sweep → purple glow → Batman silhouette flash |
| Brain Compound fill | 500ms | ease-in-out | Smooth left-to-right meter fill with color shift |
| Map reveal (onboarding) | 3000ms | cinematic | Pan across dark map → locations light up sequentially |
| Feynman score reveal | 600ms | spring | Score number count-up animation |

### 13.3 Page Transitions

- Mission start: slide-up from bottom (300ms, ease-out)
- Mission complete to dashboard: fade through black (400ms)
- Level to Level: custom map camera pan animation (1500ms)
- Between mission phases: horizontal slide-left (250ms, ease-in-out)

### 13.4 Micro-Interactions

- Roman Urdu toggle: smooth cross-fade (150ms)
- Drag-and-drop word tiles: magnetic snapping + haptic feedback pattern on mobile
- Audio play button: waveform animation while playing
- Progress bar fill: animated width transition (200ms, ease-out)
- Badge earned: scale from 0 → 1.2 → 1.0 (spring, 400ms)

---

## 14. Technical Architecture

### 14.1 Technology Stack

| Layer | Technology | Rationale |
|---|---|---|
| Frontend Framework | React 18 + TypeScript | Component architecture, type safety, ecosystem |
| Styling | Tailwind CSS + Framer Motion | Utility-first + production-quality animation |
| State Management | Zustand | Lightweight, perfect for mission state and SR queue |
| Database (Client) | IndexedDB via Dexie.js | Offline SR queue caching, mission state persistence |
| Backend Framework | Node.js + Express (or FastAPI) | REST API for user data, progress, AI calls |
| Database (Server) | PostgreSQL | Relational — learner progress, SR items, XP, badges |
| AI Layer | OpenAI API (GPT-4o) | Conversation Simulator + Feynman Evaluator |
| Audio | Web Audio API + pre-recorded MP3s | Letter and word pronunciation |
| Authentication | JWT + refresh token rotation | Secure, stateless |
| Deployment | Vercel (frontend) + Railway (backend) | Fast global CDN, simple deployment |
| Analytics | PostHog (self-hostable) | Privacy-respecting, granular event tracking |
| Email | Resend | Accountability partner notifications |

### 14.2 Database Schema (Core Tables)

```sql
-- Learners
learners (id, email, name, level_current, why, stakes_statement,
          accountability_email, streak, batman_mode, xp, rank,
          brain_compound_pct, created_at, last_active_at)

-- Content Items (seeded from course)
content_items (id, level, module, group_name, type, english, urdu_roman,
               audio_url, example_sentence, is_power_pack, created_at)

-- SR Queue (per learner, per item)
sr_queue (id, learner_id, item_id, interval_days, next_review_date,
          ease_factor, correct_count, incorrect_count, is_knowledge_gap,
          last_reviewed_at)

-- Mission Sessions
missions (id, learner_id, date, type [morning/evening], status,
          xp_earned, feynman_score, feynman_text, feynman_audio_url,
          completed_at)

-- Level Progress
level_progress (id, learner_id, level, module, status [locked/active/complete],
                gate_score, gate_attempts, unlocked_at, completed_at)

-- Badges
learner_badges (id, learner_id, badge_type, module, earned_at)

-- Feynman Archive
feynman_responses (id, learner_id, mission_id, module, prompt,
                   response_text, response_audio_url, clarity_score,
                   vocab_score, relevance_score, knowledge_gap_items,
                   created_at)
```

### 14.3 API Architecture

```
POST /auth/register
POST /auth/login
POST /auth/refresh

GET  /learner/profile
PUT  /learner/profile
GET  /learner/dashboard

GET  /content/module/:id
GET  /content/sr-queue/today

POST /mission/start
PUT  /mission/:id/complete
POST /feynman/evaluate
GET  /feynman/archive

GET  /progress/map
GET  /progress/level/:level
POST /progress/gate/attempt
POST /progress/gate/submit

GET  /leaderboard/feynman/weekly
POST /leaderboard/feynman/submit

POST /notifications/stakes-trigger
```

### 14.4 SR Engine — Technical Specification

```typescript
interface SRItem {
  itemId: string;
  intervalDays: number;
  easeFactor: number;         // starts at 2.5
  nextReviewDate: Date;
  correctCount: number;
  incorrectCount: number;
  isKnowledgeGap: boolean;
  isPowerPack: boolean;
}

function calculateNextInterval(item: SRItem, wasCorrect: boolean): SRItem {
  if (item.isKnowledgeGap || !wasCorrect) {
    return { ...item, intervalDays: 1, nextReviewDate: tomorrow() };
  }
  
  const newInterval = Math.round(item.intervalDays * item.easeFactor);
  const clampedInterval = Math.min(newInterval, 180); // max 6 months
  
  return {
    ...item,
    intervalDays: clampedInterval,
    nextReviewDate: daysFromNow(clampedInterval),
    easeFactor: Math.max(1.3, item.easeFactor + 0.1),
  };
}

// Daily queue generation
function generateDailyQueue(items: SRItem[], limit = 20): SRItem[] {
  const due = items.filter(i => i.nextReviewDate <= today());
  const gaps = due.filter(i => i.isKnowledgeGap);
  const powerPack = due.filter(i => i.isPowerPack && !i.isKnowledgeGap);
  const regular = due.filter(i => !i.isPowerPack && !i.isKnowledgeGap);
  
  return [...gaps, ...powerPack, ...regular].slice(0, limit);
}
```

### 14.5 AI Integration Specification

**Feynman Evaluator Prompt Template:**

```
You are evaluating an English learner's explanation for clarity and vocabulary.

The learner is at Level {level} and has covered these vocabulary words: {word_list}

The learner was asked to explain: "{feynman_prompt}"

Their response: "{learner_response}"

Evaluate on three dimensions (score each 0–100):
1. Vocabulary Usage: How many of their learned vocabulary words appear in the explanation?
2. Simplicity: Could a 10-year-old understand this? (Flesch-Kincaid grade level target: 3–5)
3. Relevance: Does the explanation address the actual concept?

Return JSON: {
  "vocabulary_score": number,
  "simplicity_score": number,
  "relevance_score": number,
  "overall_score": number (weighted: 40/35/25),
  "knowledge_gaps": ["word1", "word2"],
  "feedback": "One encouraging sentence about what they did well.",
  "suggestion": "One simple, actionable improvement tip."
}
```

**Conversation Simulator System Prompt:**

```
You are a friendly English conversation partner for a South Asian learner.

STRICT RULES:
- Only use vocabulary from this approved list: {approved_words}
- Keep sentences short (max 10 words)
- Never use idioms, slang, or complex grammar above Level {level}
- If the learner's input is unclear, say: "I didn't quite understand. Try saying that differently."
- Topic for this session: {scenario}
- Be warm, patient, and encouraging

Start the conversation naturally.
```

---

## 15. Localization and Bilingual Requirements

| Requirement | Specification |
|---|---|
| Interface language | English (primary) |
| Content language | English + Roman Urdu (toggle) |
| Roman Urdu toggle default | ON for Levels 1–2; OFF by default from Level 3 |
| Toggle behavior | Per-card override; learner preference saved |
| Roman Urdu rendering | Noto Sans font family; correct diacritic support |
| Audio content | English pronunciation by a speaker with South Asian English clarity |
| Feynman prompts | English prompt + Roman Urdu explanation below |
| Error messages | English + Roman Urdu |
| Story content | South Asian settings, names, and contexts throughout |
| Example sentences | South Asian contexts: chai, roti, Lahore, dost, ammi, abbu |
| Level 3+ | Roman Urdu toggle remains available but learner encouraged to use English-only mode |
| Future: Urdu script | Right-to-left rendering planned for v1.2; architecture must support RTL from launch |

---

## 16. Monetization Strategy

### 16.1 v1.0 — Fully Free (Launch Phase)

- Complete access to Level 1 (30 days of content)
- All gamification features
- AI Conversation Simulator (text-based, limited to 3 sessions per day)
- Community Feynman Leaderboard
- Goal: Prove retention and Level Gate pass rates before monetizing

### 16.2 v1.2 — Freemium Model

| Tier | Price | Features |
|---|---|---|
| Free | ₨0/month | Level 1 + 3 AI sessions/day + basic progress tracking |
| EnglishOS Pro | ₨899/month (~$3.20) | All 6 levels + unlimited AI sessions + voice input + analytics |
| EnglishOS Max | ₨1,499/month (~$5.40) | Pro + priority AI + IELTS prep module + 1:1 tutor session/month |
| Annual Pro | ₨7,499/year (30% discount) | 12 months of Pro |
| Family Plan | ₨2,499/month | Pro for up to 4 learners |

### 16.3 Revenue Projections (Conservative)

| Month | Active Users | Paid Conversion | MRR |
|---|---|---|---|
| Month 3 | 5,000 | 3% (150) | ₨134,850 |
| Month 6 | 20,000 | 5% (1,000) | ₨899,000 |
| Month 12 | 80,000 | 8% (6,400) | ₨5,753,600 |

### 16.4 Unit Economics Target

- Customer Acquisition Cost (CAC): < ₨1,500 (organic + social first)
- Lifetime Value (LTV): ₨10,000+ (12-month journey × Pro pricing)
- LTV:CAC ratio target: > 6:1

---

## 17. Non-Functional Requirements

### 17.1 Performance

| Metric | Target |
|---|---|
| First Contentful Paint (3G) | < 2.5 seconds |
| Largest Contentful Paint | < 3.5 seconds |
| Time to Interactive | < 4 seconds |
| Mission session load | < 1.5 seconds |
| Audio playback latency | < 300ms |
| AI Feynman response | < 3 seconds |
| AI Conversation reply | < 2.5 seconds |
| Drag-and-drop interaction | 60fps consistent |
| Lighthouse score | > 85 (Performance, Accessibility, Best Practices) |

### 17.2 Availability and Reliability

| Metric | Target |
|---|---|
| Uptime SLA | 99.5% monthly |
| Scheduled maintenance | Off-peak (2am–4am PKT) with advance notice |
| SR engine: offline capability | Queue cached locally; syncs on reconnect |
| Mission state persistence | Auto-save every 30 seconds; resume from exact point |

### 17.3 Accessibility

- WCAG 2.1 AA compliance minimum
- All audio content has text alternatives
- All drag-and-drop interactions have keyboard alternatives
- Color is never the sole differentiator of information
- Minimum 4.5:1 contrast ratio for all text
- Touch targets minimum 44×44px on mobile
- Screen reader compatible for all core mission content

### 17.4 Security and Privacy

- All user data encrypted at rest (AES-256) and in transit (TLS 1.3)
- Voice recording data stored only with explicit learner consent; deletable on demand
- Accountability partner email used only for defined notification purposes
- GDPR-compliant data handling; users can request export or deletion
- AI content filtered: all AI responses checked against a safety layer before display
- No third-party advertising trackers in v1.0

### 17.5 Browser and Device Support

| Platform | Minimum Version |
|---|---|
| Chrome (Android + Desktop) | v100+ |
| Safari (iOS + macOS) | v15+ |
| Firefox (Desktop) | v100+ |
| Samsung Internet | v15+ |
| Edge | v100+ |
| Screen sizes | 320px minimum width through 2560px |

---

## 18. Success Metrics and KPIs

### 18.1 North Star Metric

> **Percentage of learners who pass Level 1 Gate within 35 days of signup**

This single metric captures: daily retention, content quality, pacing accuracy, and gamification effectiveness simultaneously.

**Target:** > 55% of all signups pass Level 1 Gate within 35 days.

### 18.2 Learning Effectiveness

| Metric | Definition | Target |
|---|---|---|
| Level 1 Gate Pass Rate | % of learners who pass Level 1 Gate | > 55% within 35 days |
| SR Retention Rate | % correct on SR cards at 21-day interval | > 75% |
| Feynman Score Growth | Average clarity score at Day 30 vs Day 1 | > 35% improvement |
| Vocabulary Retention | % of Level 1 Power Pack words recalled correctly at Day 60 | > 78% |
| Knowledge Gap Reduction | Reduction in Feynman Knowledge Gap items over 30 days | > 50% reduction |

### 18.3 Engagement Metrics

| Metric | Target |
|---|---|
| D1 Retention | > 75% |
| D7 Retention | > 55% |
| D14 Retention | > 42% |
| D30 Retention | > 35% |
| D60 Retention | > 25% |
| Daily Mission Completion (both) | > 55% of active users |
| Morning Mission Completion | > 70% of active users |
| Evening Mission Completion | > 60% of active users |
| Average Daily Session Time | > 50 minutes |
| Batman Mode Activation | > 40% of active users (7-day streak) |
| Feynman Leaderboard Participation | > 15% weekly active submission rate |

### 18.4 Product Quality

| Metric | Target |
|---|---|
| AI Conversation CSAT | > 4.2 / 5.0 |
| Feynman Moment Completion Rate | > 82% of morning missions |
| Level Gate First-Attempt Pass | > 48% |
| Diagnostic Placement Accuracy | > 87% self-reported "felt right" |
| App Store Rating (v2.0) | > 4.6 / 5.0 |

### 18.5 Business Metrics (v1.2+)

| Metric | Target (Month 6) |
|---|---|
| Monthly Active Users | 20,000+ |
| Paid Subscribers | 1,000+ |
| Monthly Revenue | ₨899,000+ |
| Churn Rate (monthly) | < 8% |
| Net Promoter Score | > 45 |

---

## 19. Competitive Landscape

| Dimension | EnglishOS | Duolingo | Babbel | British Council | Preply |
|---|---|---|---|---|---|
| Learning Methodology | ✅ DiSS + Feynman + SR + Serial Mastery | Behavioral reward loops | Structured lessons | Content library | Human tutors |
| South Asian Cultural Fit | ✅ Native Roman Urdu | ❌ | ❌ | Partial | Varies by tutor |
| AI Conversation Partner | ✅ Vocabulary-gated | ✅ (not level-gated) | ❌ | ❌ | Human only |
| Spaced Repetition Depth | ✅ Adaptive + Feynman-linked | Basic | Basic | ❌ | ❌ |
| Sequential Level Locking | ✅ Enforced | ❌ Open | Partial | ❌ | ❌ |
| Accountability System | ✅ Stakes + partner | Streak only | ❌ | ❌ | ❌ |
| Mission Framing | ✅ Daily missions | Lessons | Lessons | Lessons | Sessions |
| Price (monthly, USD) | Free → $3.20 | Free → $6.99 | $13.95 | Free | $15–40/hr |
| Mobile App | v2.0 | ✅ Native | ✅ Native | ✅ | ✅ |
| Offline Mode | v1.2 | ✅ | ✅ | Partial | ❌ |

**EnglishOS Defensible Moat:** The combination of culturally-native Roman Urdu support + rigorous Polymath methodology + AI vocabulary-gating creates a learning experience that cannot be replicated by incumbents without fundamentally redesigning their content architecture.

---

## 20. Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation Strategy |
|---|---|---|---|
| AI conversation quality feels unnatural | Medium | High | Strict vocabulary allowlist; pre-built fallback conversation trees; human review of AI outputs |
| Voice recording resistance (privacy concern) | Medium | Medium | Make text Feynman default; voice is optional bonus; explicit consent + easy deletion |
| Level Gate too hard → churn spike | Medium | High | 70% threshold (not 100%); unlimited retries; detailed per-module failure breakdown |
| SR queue volume overwhelming learners | Low | High | Hard cap of 5 cards in Warm-up Flash; background SR never surfaces more than 20 in Day Close |
| Levels 2–6 content not ready for launch | High | Medium | Launch with Level 1 complete; Levels 2–3 "coming soon" clearly visible on locked map nodes |
| South Asian payment friction (card penetration low) | Medium | High | JazzCash, Easypaisa, EasyLoad integration in v1.2 alongside cards |
| Roman Urdu rendering on low-end Android | Low | Medium | Test on Android 6+ with Noto Sans; fallback to system fonts with correct Unicode support |
| AI cost at scale (OpenAI bills) | Medium | Medium | Rate limit AI sessions per user; cache common Feynman evaluations; explore fine-tuned smaller model in v2.0 |
| Low community Feynman Leaderboard participation | Medium | Low | Opt-in; non-participation does not affect any metric; feature is bonus not core |
| Competitor copies the concept | Low (short-term) | Medium | Speed of execution + cultural depth + community moat are durable advantages |

---

## 21. Roadmap — Full Version Timeline

### Q1 — Foundation (Months 1–3)

```
Month 1:
  ✅ Design System complete (all components, tokens, motion specs)
  ✅ Core backend: auth, learner profile, content API, SR engine
  ✅ Level 1 content fully built (all 4 modules × 30 days × 2 missions)
  ✅ Morning Mission flow (Warm-up, Core Drop, Apply It, Feynman text)

Month 2:
  ✅ Evening Mission flow (Story, Sentence Builder, Conversation Sim, Day Close)
  ✅ AI Feynman Evaluator integration
  ✅ AI Conversation Simulator (text, Level 1 vocabulary-gated)
  ✅ Gamification: XP, Brain Compound Meter, badges, Batman Mode
  ✅ Mastery Map (Level 1 active, Levels 2–6 locked silhouettes)

Month 3:
  ✅ Onboarding: diagnostic, My Why, Stakes, Map Reveal
  ✅ Level Gate system
  ✅ Level Wrap Ceremony
  ✅ Feynman Archive
  ✅ Community Leaderboard (weekly)
  ✅ Accountability partner email notification
  ✅ Beta launch with 500 learners
```

### Q2 — Growth (Months 4–6)

```
Month 4:
  → Level 2 content fully built (45 days)
  → Voice input for Feynman Moments
  → Shareable Polymath Profile Card (image export)

Month 5:
  → Level 3 content fully built (45 days)
  → Voice input for Conversation Simulator
  → Deep Mission unlocks (Brain Compound Meter rewards)

Month 6:
  → Personal growth analytics dashboard
  → Smart notification system (optimal time detection)
  → Freemium paywall and Pro subscription (JazzCash + Easypaisa + card)
  → Public launch
```

### Q3–Q4 — Scale (Months 7–12)

```
Month 7–9:
  → Levels 4 and 5 content built
  → Instructor dashboard (cohort management)
  → iOS and Android native app (React Native)

Month 10–12:
  → Level 6 content built (complete 300-day journey)
  → IELTS/CSS English exam prep module
  → Offline mode
  → Adaptive difficulty (AI adjusts pacing)
  → Family plans
  → Partnership with Pakistani and Indian universities
```

---

## 22. Appendix — Complete Course-to-Feature Mapping

Every element from the source Polymath Edition English Course is mapped to its exact product feature below. Zero content loss.

| Course Element | Source Location | App Feature | Priority |
|---|---|---|---|
| DiSS Framework overview table | Course intro | Framework cards at start of each level | P1 |
| 6-level Serial Mastery map | Course Map section | Mastery Map visual journey (home screen) | P0 |
| "Level Gate" concept | Course Map section | Level Gate Challenge — non-bypassable | P0 |
| 300-day timeline | Course Map section | Progress tracking + Mastery Map days counter | P0 |
| 1-hour daily split (20+40 min) | Course Map section | Morning + Evening Mission structure | P0 |
| Module 1: Alphabets + Vowels | Level 1, Module 1 | Interactive alphabet board with tap-to-hear + vowel spotlight | P0 |
| Vowel sound table (5 vowels) | Module 1 | Vowel Flash Cards — Power Pack, shown first | P0 |
| Consonant guide (21 letters) | Module 1 | Consonant Flash Cards — shown after vowels | P0 |
| Subah + Shaam practice plan | Module 1 | Morning Mission + Evening Mission | P0 |
| Feynman Check — Module 1 | Module 1 end | Feynman Moment: "Explain vowels to a 10-year-old" | P0 |
| SR schedule (Day 6, 8, 15) | Module 1 | Automated SR engine with those exact intervals | P0 |
| 100 Core Words — Groups A–F | Module 2 | 6 flashcard decks organized by group, SR-tracked | P0 |
| Group A — Pronouns | Module 2 | Power Pack Group A — shown first | P0 |
| Group B — Be Verbs | Module 2 | Power Pack Group B with Golden Rule animated card | P0 |
| Golden Rule (I→am, He→is, We→are) | Module 2 | Animated color-coded grammar rule card | P0 |
| Group C — 50 Action Verbs | Module 2 | Power Pack Group C | P0 |
| Groups D, E, F | Module 2 | Standard flashcard decks with SR tracking | P0 |
| 20/80 Rule callouts | All modules | Power Pack badge on all high-impact items | P0 |
| Feynman Check — Module 2 | Module 2 end | Feynman Moment: "Explain 5 words using a tiny story" | P0 |
| SR schedule (Day 13, 16, 20, 30) | Module 2 | Automated SR intervals | P0 |
| SVO Master Formula | Module 3 | Sentence Builder visual formula header | P0 |
| 3 Sentence Types (Pos/Neg/Q) | Module 3 | Sentence Builder — three construction modes | P0 |
| NOT Rules reference box | Module 3 | Grammar Rule Card with contraction display | P0 |
| Sentence examples (all types) | Module 3 | Pre-loaded sentence builder practice sets | P0 |
| Feynman Check — Module 3 | Module 3 end | Feynman Moment: "Explain the sentence formula" | P0 |
| Batman Polymath metaphor | Polymath notes | Batman Mode naming + UI copy throughout | P0 |
| Serial Mastery "maintenance mode" | Polymath notes | Maintenance Mode — completed levels in background SR | P0 |
| Compounding of skills concept | Polymath notes | Brain Compound Meter naming and framing | P0 |
| DiSS Stakes — loss aversion | Polymath notes | Stakes system — required in onboarding | P0 |
| Feynman "knowledge gap" concept | Polymath notes | Gap detection in Feynman evaluator → SR queue | P0 |
| SR 1→3→7→21 schedule | Polymath notes | Spaced Repetition engine base intervals | P0 |
| Meta Learning concept | Polymath notes | Framing of Feynman Archive + Level Wrap Ceremony copy | P1 |
| DiSS Deconstruct | Polymath notes | Progressive level reveal on Mastery Map | P0 |
| DiSS Selection (20/80) | Polymath notes | Power Pack system + Core Drop ordering | P0 |
| DiSS Sequencing | Polymath notes | Sequential module and level locking | P0 |
| DiSS Stakes | Polymath notes | Stakes setup + Level Gates + accountability partner | P0 |
| Feynman "10-year-old" standard | Polymath notes | Feynman Evaluator simplicity scoring (grade 3–5 target) | P0 |
| Forgetting Curve (50% in 24hr) | Polymath notes | SR engine rationale shown in onboarding | P1 |
| Serial Mastery (one field at a time) | Polymath notes | Single level visible at full detail at any time | P0 |

---

*EnglishOS Master PRD v2.0 — Power Edition*  
*Based on: Complete English Language Course — Polymath Edition*  
*Methodology: The Secret Power of a Polymath Brain — Vaibhav Kadnar*  
*Document Owner: Product Team*  
*Last Updated: April 2026*
