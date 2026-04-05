import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing     from '@/pages/Landing'
import Onboarding  from '@/pages/Onboarding'
import MasteryMap  from '@/pages/MasteryMap'

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/"           element={<Landing />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard"  element={<MasteryMap />} />
      </Routes>
    </Router>
  )
}

export default App
