import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import AppShell from '@/components/layout/AppShell'

import Landing        from '@/pages/Landing'
import Login          from '@/pages/Login'
import Register       from '@/pages/Register'
import Onboarding     from '@/pages/Onboarding'
import MasteryMap     from '@/pages/MasteryMap'
import Mission        from '@/pages/Mission'
import Progress       from '@/pages/Progress'
import FeynmanArchive from '@/pages/FeynmanArchive'
import Leaderboard    from '@/pages/Leaderboard'
import LevelGate      from '@/pages/LevelGate'
import Profile        from '@/pages/Profile'
import NotFound       from '@/pages/NotFound'

/* ── Full-screen loading spinner ────────────────────────────────────── */
function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-bg-primary flex flex-col items-center justify-center gap-4 font-body z-50">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-border-subtle" />
        <div
          className="absolute inset-0 rounded-full border-2 border-brand-red border-t-transparent animate-spin"
          style={{ animationDuration: '700ms' }}
        />
      </div>
      <span className="text-xs font-mono text-text-muted uppercase tracking-widest">
        Loading…
      </span>
    </div>
  )
}

/* ── Public route ───────────────────────────────────────────────────── */
// Redirects authenticated users to /map
function PublicRoute() {
  const { isAuthenticated, isLoading } = useAuthStore()
  if (isLoading) return <LoadingScreen />
  if (isAuthenticated) return <Navigate to="/map" replace />
  return <Outlet />
}

/* ── Protected route ────────────────────────────────────────────────── */
// Redirects unauthenticated users to /login
function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuthStore()
  if (isLoading) return <LoadingScreen />
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  )
}

/* ── Router ─────────────────────────────────────────────────────────── */
export default function AppRouter() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>

        {/* Public routes */}
        <Route element={<PublicRoute />}>
          <Route path="/"           element={<Landing />} />
          <Route path="/login"      element={<Login />} />
          <Route path="/register"   element={<Register />} />
          <Route path="/onboarding" element={<Onboarding />} />
        </Route>

        {/* Protected routes — wrapped in AppShell */}
        <Route element={<ProtectedRoute />}>
          <Route path="/map"                    element={<MasteryMap />} />
          <Route path="/mission/:type"          element={<Mission />} />
          <Route path="/progress"               element={<Progress />} />
          <Route path="/feynman-archive"        element={<FeynmanArchive />} />
          <Route path="/leaderboard"            element={<Leaderboard />} />
          <Route path="/level-gate/:level"      element={<LevelGate />} />
          <Route path="/profile"                element={<Profile />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  )
}
