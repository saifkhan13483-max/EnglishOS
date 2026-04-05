import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen flex items-center justify-center bg-bg-primary">
              <span className="font-display text-2xl font-bold text-text-primary">
                EnglishOS
              </span>
            </div>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
