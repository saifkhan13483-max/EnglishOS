# EnglishOS

An English learning platform for South Asian learners built around the Polymath methodology (DiSS + Feynman Technique + Spaced Repetition + Serial Mastery).

## Architecture

**Monorepo** using pnpm workspaces with two packages:

| Package | Location | Port | Description |
|---------|----------|------|-------------|
| `client` | `/client` | 5000 | React 18 + Vite frontend |
| `server` | `/server` | 5001 | Express + Node.js API |

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
pnpm dev:server   # Express on port 5001
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

## Notes

- Vite runs on port **5000** (adjusted from 5173 for Replit preview pane compatibility); the dev server proxies `/api/*` to Express on port **5001**
- Tailwind custom color/font tokens are fully configured — see Design System section above
- Prisma schema is minimal; models will be added when features are implemented
- Environment variables: copy `server/.env.example` to `server/.env` and fill in values
