import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { setAccessToken } from '@/services/api'
import { useProgressStore } from '@/stores/progressStore'
import AppShell from '@/components/layout/AppShell'
import BadgeToast from '@/components/ui/BadgeToast'
import ToastContainer from '@/components/ui/Toast'

/* ── Lazy page imports — each page becomes its own JS chunk ─────────── */
const Landing        = lazy(() => import('@/pages/Landing'))
const Login          = lazy(() => import('@/pages/Login'))
const Register       = lazy(() => import('@/pages/Register'))
const Onboarding     = lazy(() => import('@/pages/Onboarding'))
const MasteryMap     = lazy(() => import('@/pages/MasteryMap'))
const Mission        = lazy(() => import('@/pages/Mission'))
const Progress       = lazy(() => import('@/pages/Progress'))
const FeynmanArchive = lazy(() => import('@/pages/FeynmanArchive'))
const Leaderboard    = lazy(() => import('@/pages/Leaderboard'))
const LevelGate      = lazy(() => import('@/pages/LevelGate'))
const Profile        = lazy(() => import('@/pages/Profile'))
const NotFound       = lazy(() => import('@/pages/NotFound'))

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

/* ── Session bootstrap + cross-tab logout detection ────────────────── */
function SessionLoader() {
  const loadFromStorage = useAuthStore((s) => s.loadFromStorage)

  useEffect(() => { loadFromStorage() }, [loadFromStorage])

  useEffect(() => {
    function handleStorageChange(e: StorageEvent) {
      // Another tab removed the refresh token — log this tab out silently
      if (e.key === 'eos_refresh_token' && e.newValue === null) {
        setAccessToken(null)
        useAuthStore.setState({ user: null, accessToken: null, isAuthenticated: false })
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return null
}

/* ── Public route ───────────────────────────────────────────────────── */
function PublicRoute() {
  const { isAuthenticated, isLoading } = useAuthStore()
  if (isLoading) return <LoadingScreen />
  if (isAuthenticated) return <Navigate to="/map" replace />
  return <Outlet />
}

/* ── Protected route ────────────────────────────────────────────────── */
function ProtectedRoute() {
  const { isAuthenticated, isLoading, user } = useAuthStore()
  const loadDashboard = useProgressStore((s) => s.loadDashboard)

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboard()
    }
  }, [isAuthenticated, loadDashboard])

  if (isLoading) return <LoadingScreen />
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (user && !user.onboardingComplete) return <Navigate to="/onboarding" replace />
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  )
}

/* ── Onboarding route ───────────────────────────────────────────────── */
function OnboardingRoute() {
  const { isAuthenticated, isLoading, user } = useAuthStore()
  if (isLoading) return <LoadingScreen />
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (user?.onboardingComplete) return <Navigate to="/map" replace />
  return <Outlet />
}

/* ── Router ─────────────────────────────────────────────────────────── */
export default function AppRouter() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <SessionLoader />
      <BadgeToast />
      <ToastContainer />
      <Suspense fallback={<LoadingScreen />}>
        <Routes>

          {/* Public routes — redirect to /map when already logged in */}
          <Route element={<PublicRoute />}>
            <Route path="/"         element={<Landing />} />
            <Route path="/login"    element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Onboarding — auth required, redirect to /map if already done */}
          <Route element={<OnboardingRoute />}>
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
      </Suspense>
    </BrowserRouter>
  )
}
