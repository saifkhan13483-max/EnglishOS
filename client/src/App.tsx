import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing        from '@/pages/Landing'
import Onboarding     from '@/pages/Onboarding'
import MasteryMap     from '@/pages/MasteryMap'
import Mission        from '@/pages/Mission'
import Progress       from '@/pages/Progress'
import FeynmanArchive from '@/pages/FeynmanArchive'
import Leaderboard    from '@/pages/Leaderboard'
import LevelGate      from '@/pages/LevelGate'
import Profile        from '@/pages/Profile'

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/"              element={<Landing />} />
        <Route path="/onboarding"    element={<Onboarding />} />
        <Route path="/dashboard"     element={<MasteryMap />} />
        <Route path="/mission"       element={<Mission />} />
        <Route path="/progress"      element={<Progress />} />
        <Route path="/feynman"       element={<FeynmanArchive />} />
        <Route path="/leaderboard"   element={<Leaderboard />} />
        <Route path="/level-gate"    element={<LevelGate />} />
        <Route path="/profile"       element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default App
