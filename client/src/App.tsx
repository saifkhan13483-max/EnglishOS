import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import ProgressBar from '@/components/ui/ProgressBar'
import Toggle from '@/components/ui/Toggle'
import Modal from '@/components/ui/Modal'
import AudioPlayer from '@/components/ui/AudioPlayer'
import Tooltip from '@/components/ui/Tooltip'
import PowerPackBadge from '@/components/ui/PowerPackBadge'

function ComponentShowcase() {
  const [toggleOn, setToggleOn] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-bg-primary p-8 font-body">
      <h1 className="font-display text-3xl font-bold text-text-primary mb-8">
        EnglishOS — UI Components
      </h1>

      <div className="grid gap-6 max-w-3xl">
        <section>
          <p className="text-text-muted text-xs uppercase tracking-widest mb-3 font-mono">Buttons</p>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Start Mission</Button>
            <Button variant="secondary">Cancel</Button>
            <Button variant="ghost">Skip</Button>
            <Button variant="danger">Reset</Button>
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="lg">Large</Button>
            <Button variant="primary" loading>Loading</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </div>
        </section>

        <section>
          <p className="text-text-muted text-xs uppercase tracking-widest mb-3 font-mono">Badges</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="red">Level 1</Badge>
            <Badge variant="blue">Grammar</Badge>
            <Badge variant="gold">Streak 7</Badge>
            <Badge variant="green">Completed</Badge>
            <Badge variant="muted">Optional</Badge>
            <Badge variant="red" size="sm">sm</Badge>
          </div>
        </section>

        <section>
          <p className="text-text-muted text-xs uppercase tracking-widest mb-3 font-mono">Cards</p>
          <div className="grid grid-cols-2 gap-4">
            <Card padding="md">
              <p className="text-text-secondary text-sm">Default card</p>
            </Card>
            <Card variant="power-pack" padding="md">
              <p className="text-text-secondary text-sm mt-6">Power Pack card</p>
            </Card>
          </div>
        </section>

        <section>
          <p className="text-text-muted text-xs uppercase tracking-widest mb-3 font-mono">Progress</p>
          <div className="flex flex-col gap-3">
            <ProgressBar value={72} label="Daily Mission" />
            <ProgressBar value={45} color="#E94560" label="Level Progress" />
            <ProgressBar value={100} color="#2ECC71" label="Module Complete" />
          </div>
        </section>

        <section>
          <p className="text-text-muted text-xs uppercase tracking-widest mb-3 font-mono">Toggle · Power Pack Badge · Audio</p>
          <div className="flex flex-wrap items-center gap-5">
            <Toggle checked={toggleOn} onChange={setToggleOn} label="Roman Urdu" />
            <PowerPackBadge />
            <AudioPlayer src="" />
          </div>
        </section>

        <section>
          <p className="text-text-muted text-xs uppercase tracking-widest mb-3 font-mono">Tooltip · Modal</p>
          <div className="flex items-center gap-4">
            <Tooltip content="This is a tooltip">
              <Button variant="secondary" size="sm">Hover me</Button>
            </Tooltip>
            <Button variant="primary" onClick={() => setModalOpen(true)}>Open Modal</Button>
          </div>
        </section>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Level Gate — Level 1"
        footer={
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm">Take the Test</Button>
          </div>
        }
      >
        <p>Complete all modules in Level 1 before unlocking Level 2. This ensures deep mastery at every stage of your journey.</p>
      </Modal>
    </div>
  )
}

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<ComponentShowcase />} />
      </Routes>
    </Router>
  )
}

export default App
