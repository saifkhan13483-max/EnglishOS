import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import ProgressBar from '@/components/ui/ProgressBar'
import ProfileCard from '@/components/gamification/ProfileCard'

// ── Static mock data ──────────────────────────────────────────────────────────

const USER = {
  name: 'Bilal Ahmed',
  email: 'bilal@example.com',
  dayNumber: 42,
  level: 1,
  rank: 'Conversationalist',
  streak: 7,
  xp: 4250,
  brainCompoundPct: 42,
  completedModules: 2,
  totalModules: 4,
  earnedBadgeTypes: ['STREAK_7', 'FEYNMAN_FIRST', 'MODULE_COMPLETE_L1_M1', 'MODULE_COMPLETE_L1_M2'],
  why: 'Speaking English confidently in job interviews and at work.',
  stake: 'I have committed this to my cousin Asad. He will ask me every Sunday for my progress update.',
  notificationMorning: '07:00',
  notificationEvening: '19:30',
  romanUrduDefault: true,
  joinedDate: 'March 24, 2026',
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
  const navigate   = useNavigate()
  const cardRef    = useRef<HTMLDivElement>(null)
  const [exporting, setExporting] = useState(false)

  const [romanUrdu, setRomanUrdu] = useState(USER.romanUrduDefault)
  const [editingWhy, setEditingWhy] = useState(false)
  const [why, setWhy] = useState(USER.why)
  const [whyDraft, setWhyDraft] = useState(USER.why)

  const [showStakeModal, setShowStakeModal] = useState(false)
  const [stakeDraft, setStakeDraft] = useState(USER.stake)

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState('')

  async function handleExport() {
    if (!cardRef.current || exporting) return
    setExporting(true)
    try {
      const html2canvas = (await import('html2canvas')).default
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        allowTaint: true,
        scale: 2,
        backgroundColor: null,
        logging: false,
      })
      const url  = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href     = url
      link.download = `${USER.name.replace(/\s+/g, '-')}-polymath-profile.png`
      link.click()
    } catch (err) {
      console.error('Export failed', err)
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg-primary font-body">
      {/* Nav */}
      <header className="sticky top-0 z-20 bg-bg-primary/80 backdrop-blur-sm border-b border-border-subtle flex items-center justify-between px-4 py-3.5">
        <button
          onClick={() => navigate('/map')}
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

        {/* ── Polymath Profile Card ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-3">
            Polymath Profile Card
          </p>

          {/* Horizontal scroll wrapper so fixed-width card doesn't overflow on mobile */}
          <div className="overflow-x-auto rounded-2xl">
            <ProfileCard
              ref={cardRef}
              name={USER.name}
              rank={USER.rank}
              level={USER.level}
              dayNumber={USER.dayNumber}
              streak={USER.streak}
              xp={USER.xp}
              brainCompoundPct={USER.brainCompoundPct}
              completedModules={USER.completedModules}
              totalModules={USER.totalModules}
              earnedBadgeTypes={USER.earnedBadgeTypes}
              whyMotivation={why}
            />
          </div>

          <Button
            variant="secondary"
            size="sm"
            className="mt-3 w-full"
            onClick={handleExport}
            disabled={exporting}
          >
            {exporting ? 'Exporting…' : 'Export as Image'}
          </Button>
        </motion.div>

        {/* ── XP & Brain Compound ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.07, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-3">Progress</p>
          <div className="bg-bg-secondary border border-border-subtle rounded-2xl p-4 flex flex-col gap-3">
            <div>
              <div className="flex justify-between text-xs font-mono text-text-muted mb-1.5">
                <span>Total XP</span>
                <span className="text-brand-gold">{USER.xp.toLocaleString()} XP</span>
              </div>
              <ProgressBar value={Math.min(100, (USER.xp / 20000) * 100)} color="#F5B014" animated={false} />
            </div>
            <div>
              <div className="flex justify-between text-xs font-mono text-text-muted mb-1.5">
                <span>Brain Compound</span>
                <span className="text-brand-green">{USER.brainCompoundPct}%</span>
              </div>
              <ProgressBar value={USER.brainCompoundPct} color="#2ECC71" animated={false} />
            </div>
          </div>
        </motion.div>

        {/* ── Account Settings ─────────────────────────────────────────── */}
        <Section title="Account Settings" delay={0.12}>
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

        {/* ── My Why ───────────────────────────────────────────────────── */}
        <Section title="My Why" delay={0.19}>
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

        {/* ── My Stake ─────────────────────────────────────────────────── */}
        <Section title="My Stake" delay={0.26}>
          <div className="px-4 py-4 flex flex-col gap-3">
            <div className="bg-bg-tertiary border border-border-subtle rounded-xl px-3 py-3">
              <p className="text-sm font-body text-text-secondary leading-relaxed">{USER.stake}</p>
            </div>
            <Button variant="secondary" size="sm" onClick={() => setShowStakeModal(true)}>
              Update Stake
            </Button>
          </div>
        </Section>

        {/* ── Danger Zone ──────────────────────────────────────────────── */}
        <Section title="Danger Zone" delay={0.33}>
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
              your {USER.xp.toLocaleString()} XP, and your {USER.earnedBadgeTypes.length} badges. This cannot be undone.
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
