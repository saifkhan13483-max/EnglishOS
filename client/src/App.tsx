import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from '@/pages/Landing'

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </Router>
  )
}

export default App
