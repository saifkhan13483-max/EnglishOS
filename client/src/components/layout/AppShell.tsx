import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useShallow } from 'zustand/react/shallow'
import { useProgressStore } from '@/stores/progressStore'
import BrainCompoundMeter from '@/components/gamification/BrainCompoundMeter'

interface NavItem {
  to: string
  label: string
  icon: (active: boolean) => React.ReactNode
}

const NAV_ITEMS: NavItem[] = [
  {
    to: '/map',
    label: 'Map',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke={active ? '#E94560' : 'currentColor'} strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"
      >
        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
        <line x1="9" y1="3" x2="9" y2="18" />
        <line x1="15" y1="6" x2="15" y2="21" />
      </svg>
    ),
  },
  {
    to: '/mission/morning',
    label: 'Mission',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke={active ? '#E94560' : 'currentColor'} strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"
      >
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    to: '/progress',
    label: 'Progress',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke={active ? '#E94560' : 'currentColor'} strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    to: '/profile',
    label: 'Profile',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke={active ? '#E94560' : 'currentColor'} strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
]

function isNavItemActive(item: NavItem, pathname: string): boolean {
  if (item.to === '/mission/morning') {
    return pathname.startsWith('/mission')
  }
  return pathname === item.to
}

/* ── Top Bar ─────────────────────────────────────────────────────────── */
function TopBar() {
  const { streak, brainCompoundPct } = useProgressStore(
    useShallow((s) => ({ streak: s.streak, brainCompoundPct: s.brainCompoundPct }))
  )

  return (
    <header className="shrink-0 h-14 flex items-center justify-between px-4 border-b border-border-subtle bg-bg-primary z-20">
      <span className="font-display font-bold text-lg text-text-primary">
        English<span className="text-brand-red">OS</span>
      </span>

      <div className="flex items-center gap-3">
        {/* Streak badge */}
        <div className="flex items-center gap-1.5 bg-bg-secondary border border-border-subtle rounded-full px-2.5 py-1">
          <span className="text-sm leading-none">🔥</span>
          <span className="font-display font-bold text-xs text-text-primary">{streak}</span>
        </div>

        {/* Brain Compound mini bar — fixed-width container prevents CLS when value loads */}
        <div className="hidden sm:block w-[140px]">
          <BrainCompoundMeter size="mini" value={brainCompoundPct} />
        </div>

        {/* Notifications bell */}
        <button
          className="w-8 h-8 flex items-center justify-center rounded-xl text-text-muted hover:text-text-primary hover:bg-bg-secondary transition-colors"
          aria-label="Notifications"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
      </div>
    </header>
  )
}

/* ── Desktop Left Sidebar ─────────────────────────────────────────────── */
function DesktopSidebar() {
  const [expanded, setExpanded] = useState(false)
  const { pathname } = useLocation()

  return (
    <aside
      className={[
        'hidden md:flex flex-col shrink-0 h-full border-r border-border-subtle bg-bg-secondary',
        'transition-all duration-200 ease-out overflow-hidden',
        expanded ? 'w-52' : 'w-16',
      ].join(' ')}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {/* Logo area */}
      <div className="h-14 flex items-center px-4 border-b border-border-subtle shrink-0 overflow-hidden">
        <span className="font-display font-bold text-lg text-text-primary whitespace-nowrap">
          {expanded ? (
            <>English<span className="text-brand-red">OS</span></>
          ) : (
            <span className="text-brand-red font-bold">E</span>
          )}
        </span>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-1 p-2 flex-1">
        {NAV_ITEMS.map((item) => {
          const active = isNavItemActive(item, pathname)
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={[
                'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors whitespace-nowrap overflow-hidden',
                active
                  ? 'bg-brand-red/10 text-brand-red'
                  : 'text-text-muted hover:text-text-primary hover:bg-bg-tertiary',
              ].join(' ')}
            >
              <span className="shrink-0">{item.icon(active)}</span>
              {expanded && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.15 }}
                  className="text-sm font-body font-medium"
                >
                  {item.label}
                </motion.span>
              )}
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}

/* ── Mobile Bottom Nav ───────────────────────────────────────────────── */
/*
  position: fixed + bottom: env(safe-area-inset-bottom) prevents the nav
  from jumping or repainting when the soft keyboard opens on Android/iOS.
  The keyboard shrinks the visual viewport but a fixed element stays
  anchored to the layout viewport, so it never moves.
  The content area receives matching bottom padding so nothing is obscured.
*/
function MobileBottomNav() {
  const { pathname } = useLocation()

  return (
    <nav
      className="md:hidden fixed left-0 right-0 bottom-0 z-30 flex items-center justify-around border-t border-border-subtle bg-bg-secondary px-2"
      style={{
        height: 'calc(64px + env(safe-area-inset-bottom, 0px))',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      {NAV_ITEMS.map((item) => {
        const active = isNavItemActive(item, pathname)
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className="flex flex-col items-center justify-center gap-1 flex-1 min-h-[44px] py-1"
          >
            <span className={active ? 'text-brand-red' : 'text-text-muted'}>
              {item.icon(active)}
            </span>
            <span className={[
              'text-[10px] font-mono',
              active ? 'text-brand-red' : 'text-text-muted',
            ].join(' ')}>
              {item.label}
            </span>
          </NavLink>
        )
      })}
    </nav>
  )
}

/* ── App Shell ───────────────────────────────────────────────────────── */
interface AppShellProps {
  children: React.ReactNode
}

export default function AppShell({ children }: AppShellProps) {
  const { pathname } = useLocation()
  const isMapPage = pathname === '/map'

  return (
    <div className="flex h-screen bg-bg-primary overflow-hidden">
      {/* Desktop sidebar — always present on protected routes */}
      <DesktopSidebar />

      {/* Right-side column */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top bar — hidden on map */}
        {!isMapPage && <TopBar />}

        {/* Page content
            On mobile (non-map), we add bottom padding equal to the fixed nav
            height so content is never obscured behind it. */}
        <div className={[
          'flex-1 min-h-0',
          isMapPage ? 'overflow-hidden' : 'overflow-y-auto',
          !isMapPage ? 'md:pb-0 pb-16' : '',
        ].join(' ')}>
          {children}
        </div>

        {/* Mobile bottom nav — hidden on map (map has its own bottom panel) */}
        {!isMapPage && <MobileBottomNav />}
      </div>
    </div>
  )
}
