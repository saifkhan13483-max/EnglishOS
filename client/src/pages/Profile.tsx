import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useShallow } from 'zustand/react/shallow'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import ProgressBar from '@/components/ui/ProgressBar'
import ProfileCard from '@/components/gamification/ProfileCard'
import { useAuthStore } from '@/stores/authStore'
import { useProgressStore } from '@/stores/progressStore'
import { useToast } from '@/hooks/useToast'

function formatJoinedDate(iso: string | undefined): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

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

export default function Profile() {
  const navigate = useNavigate()
  const toast    = useToast()
  const cardRef  = useRef<HTMLDivElement>(null)
  const [exporting, setExporting] = useState(false)

  const { user } = useAuthStore()

  const {
    totalXP,
    streak,
    brainCompoundPct,
    myWhy,
    serverBadges,
    learnerProfile,
    loadDashboard,
    loadStats,
  } = useProgressStore(
    useShallow((s) => ({
      totalXP:         s.totalXP,
      streak:          s.streak,
      brainCompoundPct: s.brainCompoundPct,
      myWhy:           s.myWhy,
      serverBadges:    s.serverBadges,
      learnerProfile:  s.learnerProfile,
      loadDashboard:   s.loadDashboard,
      loadStats:       s.loadStats,
    }))
  )

  useEffect(() => {
    loadDashboard()
    loadStats()
  }, [loadDashboard, loadStats])

  const displayName      = user?.name ?? '—'
  const displayEmail     = user?.email ?? '—'
  const dayNumber        = learnerProfile?.dayNumber ?? 0
  const level            = user?.levelCurrent ?? 1
  const rank             = user?.rank ?? 'Learner'
  const xp               = totalXP || user?.xp || 0
  const pct              = brainCompoundPct || user?.brainCompoundPct || 0
  const earnedBadgeTypes = serverBadges.map((b) => b.badgeType)
  const completedModules = serverBadges.filter((b) => b.badgeType.startsWith('MODULE_COMPLETE')).length
  const joinedDate       = formatJoinedDate(user?.createdAt)
  const morning          = user?.morningSessionTime ?? '—'
  const evening          = user?.eveningSessionTime ?? '—'

  const initialWhy   = myWhy ?? user?.whyMotivation ?? ''
  const initialStake = user?.stakesStatement ?? ''

  const [romanUrdu,      setRomanUrdu]      = useState(true)
  const [editingWhy,     setEditingWhy]     = useState(false)
  const [why,            setWhy]            = useState(initialWhy)
  const [whyDraft,       setWhyDraft]       = useState(initialWhy)
  const [showStakeModal, setShowStakeModal] = useState(false)
  const [stakeDraft,     setStakeDraft]     = useState(initialStake)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteConfirm,  setDeleteConfirm]  = useState('')

  // Sync why/stake once store loads (covers cold-start where store is empty initially)
  useEffect(() => {
    const resolved = myWhy ?? user?.whyMotivation ?? ''
    setWhy(resolved)
    setWhyDraft(resolved)
  }, [myWhy, user?.whyMotivation])

  useEffect(() => {
    setStakeDraft(user?.stakesStatement ?? '')
  }, [user?.stakesStatement])

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
      link.download = `${displayName.replace(/\s+/g, '-')}-polymath-profile.png`
      link.click()
    } catch {
      toast.error('Could not export profile card. Please try again.')
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
              name={displayName}
              rank={rank}
              level={level}
              dayNumber={dayNumber}
              streak={streak || user?.streak || 0}
              xp={xp}
              brainCompoundPct={pct}
              completedModules={completedModules}
              totalModules={4}
              earnedBadgeTypes={earnedBadgeTypes}
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
                <span className="text-brand-gold">{xp.toLocaleString()} XP</span>
              </div>
              <ProgressBar value={Math.min(100, (xp / 20000) * 100)} color="#F5B014" animated={false} />
            </div>
            <div>
              <div className="flex justify-between text-xs font-mono text-text-muted mb-1.5">
                <span>Brain Compound</span>
                <span className="text-brand-green">{Math.round(pct)}%</span>
              </div>
              <ProgressBar value={pct} color="#2ECC71" animated={false} />
            </div>
          </div>
        </motion.div>

        {/* ── Account Settings ─────────────────────────────────────────── */}
        <Section title="Account Settings" delay={0.12}>
          <FieldRow label="Name"  value={displayName} />
          <FieldRow label="Email" value={displayEmail} readOnly />
          <FieldRow label="Joined" value={joinedDate} readOnly />
          <FieldRow label="Morning reminder" value={morning} />
          <FieldRow label="Evening reminder" value={evening} />
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
                  <p className="text-sm font-body text-text-secondary leading-relaxed">
                    {why || <span className="text-text-muted italic">No why set yet.</span>}
                  </p>
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
              <p className="text-sm font-body text-text-secondary leading-relaxed">
                {stakeDraft || <span className="text-text-muted italic">No stake set yet.</span>}
              </p>
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
              This will permanently delete your account
              {dayNumber > 0 ? `, all ${dayNumber} days of progress` : ''},
              your {xp.toLocaleString()} XP, and your {earnedBadgeTypes.length} badges.
              This cannot be undone.
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
