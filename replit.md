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

## Notes

- Vite runs on port **5000** (adjusted from 5173 for Replit preview pane compatibility); the dev server proxies `/api/*` to Express on port **5001**
- Tailwind is configured with an empty `extend.colors` object — custom palette to be added next step
- Prisma schema is minimal; models will be added when features are implemented
- Environment variables: copy `server/.env.example` to `server/.env` and fill in values
