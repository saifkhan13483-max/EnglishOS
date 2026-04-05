import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<div className="min-h-screen flex items-center justify-center bg-black text-white text-2xl font-bold">EnglishOS</div>} />
      </Routes>
    </Router>
  )
}

export default App
