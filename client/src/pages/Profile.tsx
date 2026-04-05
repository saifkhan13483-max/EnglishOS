import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import ProgressBar from '@/components/ui/ProgressBar'

// ── Static mock data ──────────────────────────────────────────────────────────

const USER = {
  name: 'Bilal Ahmed',
  email: 'bilal@example.com',
  dayNumber: 42,
  level: 1,
  levelName: 'Base Camp',
  streak: 7,
  xp: 4250,
  brainCompound: 42,
  why: 'Speaking English confidently in job interviews and at work.',
  stake: 'I have committed this to my cousin Asad. He will ask me every Sunday for my progress update.',
  notificationMorning: '07:00',
  notificationEvening: '19:30',
  romanUrduDefault: true,
  joinedDate: 'March 24, 2026',
  badges: ['First Mission', '7-Day Streak', 'Word Wizard', 'Feynman Initiate', 'Speed Run'],
}

// ── Polymath Profile Card ─────────────────────────────────────────────────────
function PolymathProfileCard() {
  return (
    <div
      className="relative rounded-2xl overflow-hidden border border-border-subtle"
      style={{
        background: 'linear-gradient(135deg, #0F0F1A 0%, #1A0A14 50%, #0A0F1A 100%)',
      }}
    >
      {/* Top accent line */}
      <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, #E94560, #4A9EFF, #F5B014)' }} />

      <div className="p-6">
        {/* Header row */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-display font-bold text-lg text-text-primary">
                English<span className="text-brand-red">OS</span>
              </span>
              <span className="text-xs font-mono text-text-muted">·</span>
              <span className="text-xs font-mono text-text-muted">Polymath Edition</span>
            </div>
            <h2 className="font-display font-bold text-2xl text-text-primary">{USER.name}</h2>
            <p className="text-xs font-mono text-text-muted mt-0.5">Member since {USER.joinedDate}</p>
          </div>

          {/* Avatar placeholder */}
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-display font-bold border border-border-subtle shrink-0"
            style={{ background: 'linear-gradient(135deg, #E94560/20, #4A9EFF/20)', backgroundColor: '#1E1E2E' }}
          >
            {USER.name.charAt(0)}
          </div>
        </div>

        {/* Level & day */}
        <div className="flex gap-3 mb-4">
          <div className="bg-bg-primary/60 border border-border-subtle rounded-xl px-3 py-2 flex-1 text-center">
            <p className="font-display font-bold text-brand-red text-lg">L{USER.level}</p>
            <p className="text-xs font-mono text-text-muted">{USER.levelName}</p>
          </div>
          <div className="bg-bg-primary/60 border border-border-subtle rounded-xl px-3 py-2 flex-1 text-center">
            <p className="font-display font-bold text-brand-gold text-lg">Day {USER.dayNumber}</p>
            <p className="text-xs font-mono text-text-muted">of 300</p>
          </div>
          <div className="bg-bg-primary/60 border border-border-subtle rounded-xl px-3 py-2 flex-1 text-center">
            <p className="font-display font-bold text-brand-blue text-lg">{USER.streak}d</p>
            <p className="text-xs font-mono text-text-muted">streak 🔥</p>
          </div>
        </div>

        {/* XP & Brain Compound */}
        <div className="flex flex-col gap-2.5 mb-4">
          <div>
            <div className="flex justify-between text-xs font-mono text-text-muted mb-1">
              <span>Total XP</span>
              <span className="text-brand-gold">{USER.xp.toLocaleString()} XP</span>
            </div>
            <ProgressBar value={Math.min(100, (USER.xp / 10000) * 100)} color="#F5B014" animated={false} />
          </div>
          <div>
            <div className="flex justify-between text-xs font-mono text-text-muted mb-1">
              <span>Brain Compound</span>
              <span className="text-brand-green">{USER.brainCompound}%</span>
            </div>
            <ProgressBar value={USER.brainCompound} color="#2ECC71" animated={false} />
          </div>
        </div>

        {/* Badges row */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {USER.badges.slice(0, 4).map(b => (
            <span
              key={b}
              className="px-2 py-0.5 rounded-full bg-bg-primary/60 border border-border-subtle text-[10px] font-mono text-text-muted"
            >
              {b}
            </span>
          ))}
          {USER.badges.length > 4 && (
            <span className="text-[10px] font-mono text-text-muted">+{USER.badges.length - 4}</span>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Section wrapper ───────────────────────────────────────────────────────────
function Section({ title, children, delay = 0 }: {
  title: string; children: React.ReactNode; delay?: number
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-3">{title}</p>
      <div className="bg-bg-secondary border border-border-subtle rounded-2xl overflow-hidden">
        {children}
      </div>
    </motion.section>
  )
}

function FieldRow({ label, value, readOnly = false, toggle = false, checked = false, onToggle }: {
  label: string; value?: string; readOnly?: boolean; toggle?: boolean; checked?: boolean; onToggle?: () => void
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle last:border-b-0">
      <span className="text-sm font-body text-text-secondary">{label}</span>
      {toggle ? (
        <button
          onClick={onToggle}
          className={[
            'relative w-10 h-5.5 rounded-full border transition-colors shrink-0',
            checked ? 'bg-brand-green/20 border-brand-green/40' : 'bg-bg-tertiary border-border-subtle',
          ].join(' ')}
          style={{ height: '22px', width: '40px' }}
        >
          <motion.span
            className="absolute top-0.5 w-4 h-4 rounded-full shadow"
            style={{ backgroundColor: checked ? '#2ECC71' : '#6A6A8A' }}
            animate={{ left: checked ? '20px' : '2px' }}
            transition={{ type: 'spring', stiffness: 600, damping: 32 }}
          />
        </button>
      ) : (
        <span className={`text-sm font-mono ${readOnly ? 'text-text-muted' : 'text-text-primary'}`}>
          {value}
        </span>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Profile() {
  const navigate = useNavigate()

  const [romanUrdu, setRomanUrdu] = useState(USER.romanUrduDefault)
  const [editingWhy, setEditingWhy] = useState(false)
  const [why, setWhy] = useState(USER.why)
  const [whyDraft, setWhyDraft] = useState(USER.why)

  const [showStakeModal, setShowStakeModal] = useState(false)
  const [stakeDraft, setStakeDraft] = useState(USER.stake)

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState('')

  return (
    <div className="min-h-screen bg-bg-primary font-body">
      {/* Nav */}
      <header className="sticky top-0 z-20 bg-bg-primary/80 backdrop-blur-sm border-b border-border-subtle flex items-center justify-between px-4 py-3.5">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span className="text-sm">Map</span>
        </button>
        <h1 className="font-display font-bold text-text-primary text-lg">Profile</h1>
        <div className="w-14" />
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-7">

        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-3">Polymath Profile Card</p>
          <PolymathProfileCard />
          <Button
            variant="secondary"
            size="sm"
            className="mt-3 w-full"
            onClick={() => {}}
          >
            Export Profile Card (coming soon)
          </Button>
        </motion.div>

        {/* Account settings */}
        <Section title="Account Settings" delay={0.1}>
          <FieldRow label="Name"  value={USER.name}  />
          <FieldRow label="Email" value={USER.email} readOnly />
          <FieldRow label="Morning reminder" value={USER.notificationMorning} />
          <FieldRow label="Evening reminder" value={USER.notificationEvening} />
          <FieldRow
            label="Roman Urdu tooltips"
            toggle
            checked={romanUrdu}
            onToggle={() => setRomanUrdu(!romanUrdu)}
          />
        </Section>

        {/* My Why */}
        <Section title="My Why" delay={0.18}>
          <div className="px-4 py-4">
            {editingWhy ? (
              <div className="flex flex-col gap-3">
                <textarea
                  rows={3}
                  value={whyDraft}
                  onChange={e => setWhyDraft(e.target.value)}
                  className="w-full bg-bg-tertiary border border-brand-blue rounded-xl px-3 py-2.5 text-sm font-body text-text-primary focus:outline-none resize-none"
                />
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" className="flex-1" onClick={() => { setWhyDraft(why); setEditingWhy(false) }}>Cancel</Button>
                  <Button variant="primary" size="sm" className="flex-1" onClick={() => { setWhy(whyDraft); setEditingWhy(false) }}>Save</Button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <span className="text-lg shrink-0">💛</span>
                  <p className="text-sm font-body text-text-secondary leading-relaxed">{why}</p>
                </div>
                <button
                  onClick={() => { setWhyDraft(why); setEditingWhy(true) }}
                  className="text-xs text-brand-blue hover:underline font-mono shrink-0"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </Section>

        {/* Stakes */}
        <Section title="My Stake" delay={0.25}>
          <div className="px-4 py-4 flex flex-col gap-3">
            <div className="bg-bg-tertiary border border-border-subtle rounded-xl px-3 py-3">
              <p className="text-sm font-body text-text-secondary leading-relaxed">{USER.stake}</p>
            </div>
            <Button variant="secondary" size="sm" onClick={() => setShowStakeModal(true)}>
              Update Stake
            </Button>
          </div>
        </Section>

        {/* Danger zone */}
        <Section title="Danger Zone" delay={0.32}>
          <div className="px-4 py-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-body font-medium text-brand-red">Delete Account</p>
              <p className="text-xs text-text-muted font-body mt-0.5">This action cannot be undone.</p>
            </div>
            <Button variant="danger" size="sm" onClick={() => setShowDeleteModal(true)}>
              Delete
            </Button>
          </div>
        </Section>

      </div>

      {/* Stake update modal */}
      <Modal
        isOpen={showStakeModal}
        onClose={() => setShowStakeModal(false)}
        title="Update Your Stake"
        footer={
          <div className="flex gap-3">
            <Button variant="secondary" size="md" className="flex-1" onClick={() => setShowStakeModal(false)}>Cancel</Button>
            <Button variant="primary" size="md" className="flex-1" onClick={() => setShowStakeModal(false)}>Save Stake</Button>
          </div>
        }
      >
        <div className="flex flex-col gap-4">
          <p className="text-sm font-body text-text-secondary leading-relaxed">
            Your stake is your accountability engine. What do you stand to lose — or gain — if you complete this?
          </p>
          <textarea
            rows={4}
            value={stakeDraft}
            onChange={e => setStakeDraft(e.target.value)}
            className="w-full bg-bg-tertiary border border-border-subtle rounded-xl px-3 py-2.5 text-sm font-body text-text-primary focus:outline-none focus:border-brand-blue transition-colors resize-none"
          />
        </div>
      </Modal>

      {/* Delete account modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => { setShowDeleteModal(false); setDeleteConfirm('') }}
        title="Delete Account"
        footer={
          <div className="flex gap-3">
            <Button
              variant="secondary" size="md" className="flex-1"
              onClick={() => { setShowDeleteModal(false); setDeleteConfirm('') }}
            >
              Cancel
            </Button>
            <Button
              variant="danger" size="md" className="flex-1"
              disabled={deleteConfirm !== 'DELETE'}
              onClick={() => {}}
            >
              Delete Forever
            </Button>
          </div>
        }
      >
        <div className="flex flex-col gap-4">
          <div className="bg-brand-red/5 border border-brand-red/30 rounded-xl px-4 py-3">
            <p className="text-sm font-body text-brand-red leading-relaxed">
              This will permanently delete your account, all {USER.dayNumber} days of progress,
              your {USER.xp.toLocaleString()} XP, and your {USER.badges.length} badges. This cannot be undone.
            </p>
          </div>
          <div>
            <label className="block text-xs font-mono text-text-muted uppercase tracking-wider mb-2">
              Type <span className="text-brand-red">DELETE</span> to confirm
            </label>
            <input
              value={deleteConfirm}
              onChange={e => setDeleteConfirm(e.target.value)}
              placeholder="DELETE"
              className="w-full bg-bg-tertiary border border-border-subtle rounded-xl px-3 py-2.5 text-sm font-mono text-brand-red placeholder:text-text-muted focus:outline-none focus:border-brand-red transition-colors"
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}
