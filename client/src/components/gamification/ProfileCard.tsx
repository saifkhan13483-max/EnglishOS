import { forwardRef } from 'react'

// ── Badge metadata ─────────────────────────────────────────────────────────────

const BADGE_META: Record<string, { name: string; icon: string; color: string }> = {
  MODULE_COMPLETE_L1_M1: { name: 'Alphabet Master',      icon: '🔤', color: '#4A9EFF' },
  MODULE_COMPLETE_L1_M2: { name: 'Word Collector',       icon: '📚', color: '#2ECC71' },
  MODULE_COMPLETE_L1_M3: { name: 'Sentence Builder',     icon: '🔧', color: '#F5B014' },
  MODULE_COMPLETE_L1_M4: { name: 'Phrase Master',        icon: '💬', color: '#E94560' },
  LEVEL_COMPLETE_L1:     { name: 'Base Camp Conquered',  icon: '🏔️', color: '#F97316' },
  STREAK_7:              { name: 'Week Warrior',         icon: '🔥', color: '#E94560' },
  STREAK_30:             { name: 'Month Master',         icon: '⚡', color: '#F5B014' },
  BATMAN_MODE:           { name: 'Batman Mode',          icon: '🦇', color: '#9B59B6' },
  FEYNMAN_FIRST:         { name: 'First Explainer',      icon: '🧠', color: '#4A9EFF' },
  FEYNMAN_SCORE_90:      { name: 'Clarity Champion',     icon: '💡', color: '#F5B014' },
  PERFECT_GATE:          { name: 'First Try',            icon: '✨', color: '#2ECC71' },
  LEADERBOARD_TOP3:      { name: 'Community Voice',      icon: '🎤', color: '#E94560' },
}

const ALL_BADGE_TYPES = Object.keys(BADGE_META)

// ── Rank → accent color ────────────────────────────────────────────────────────

const RANK_COLORS: Record<string, string> = {
  Rookie:           '#6A6A8A',
  Speaker:          '#2ECC71',
  Communicator:     '#4A9EFF',
  Conversationalist:'#F5B014',
  Fluent:           '#E94560',
  Professional:     '#9B59B6',
  Polymath:         '#F97316',
}

// ── Level → location name ─────────────────────────────────────────────────────

const LEVEL_LOCATIONS: Record<number, string> = {
  1: 'Base Camp',
  2: 'Village',
  3: 'Town',
  4: 'City',
  5: 'Metropolis',
  6: 'Capital',
}

// ── Props ─────────────────────────────────────────────────────────────────────

export interface ProfileCardProps {
  name: string
  rank: string
  level: number
  dayNumber: number
  streak: number
  xp: number
  brainCompoundPct: number
  completedModules: number
  totalModules: number
  earnedBadgeTypes: string[]
  whyMotivation: string
}

// ── Component ─────────────────────────────────────────────────────────────────
// All critical visual properties use inline styles so html2canvas can
// capture them reliably regardless of CSS-variable / Tailwind configuration.

const ProfileCard = forwardRef<HTMLDivElement, ProfileCardProps>(
  function ProfileCard(
    {
      name,
      rank,
      level,
      dayNumber,
      streak,
      xp,
      brainCompoundPct,
      completedModules,
      totalModules,
      earnedBadgeTypes,
      whyMotivation,
    },
    ref,
  ) {
    const locationName = LEVEL_LOCATIONS[level] ?? `Level ${level}`
    const rankColor    = RANK_COLORS[rank] ?? '#6A6A8A'
    const earnedSet    = new Set(earnedBadgeTypes)

    const stats = [
      { emoji: '🔥', label: 'Streak',  value: `${streak}d` },
      { emoji: '⚡', label: 'XP',      value: xp.toLocaleString() },
      { emoji: '🧠', label: 'Brain',   value: `${Math.round(brainCompoundPct)}%` },
      { emoji: '🧩', label: 'Modules', value: `${completedModules}/${totalModules}` },
    ]

    return (
      <div
        ref={ref}
        style={{
          width: '480px',
          background: 'linear-gradient(135deg, #0F0F1A 0%, #1A0A14 50%, #0A0F1A 100%)',
          borderRadius: '20px',
          overflow: 'hidden',
          border: '1px solid #2A2A3E',
          fontFamily: 'Inter, sans-serif',
          color: '#FFFFFF',
          boxSizing: 'border-box',
        }}
      >
        {/* ── Accent line ─────────────────────────────────────────────────── */}
        <div
          style={{
            height: '3px',
            background: 'linear-gradient(90deg, #E94560 0%, #4A9EFF 50%, #F5B014 100%)',
          }}
        />

        <div style={{ padding: '24px' }}>

          {/* ── HEADER ────────────────────────────────────────────────────── */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
            <span
              style={{
                fontSize: '10px',
                fontFamily: 'JetBrains Mono, monospace',
                color: '#6A6A8A',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
              }}
            >
              Polymath Profile
            </span>
            <span
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 700,
                fontSize: '15px',
                color: '#FFFFFF',
              }}
            >
              English<span style={{ color: '#E94560' }}>OS</span>
            </span>
          </div>

          {/* ── IDENTITY ──────────────────────────────────────────────────── */}
          <div style={{ marginBottom: '22px' }}>
            {/* Name */}
            <div
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 700,
                fontSize: '26px',
                color: '#FFFFFF',
                lineHeight: 1.15,
                marginBottom: '12px',
              }}
            >
              {name}
            </div>

            {/* Rank badge + level/location row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '8px' }}>
              <span
                style={{
                  padding: '3px 12px',
                  borderRadius: '100px',
                  fontSize: '12px',
                  fontWeight: 600,
                  fontFamily: 'Space Grotesk, sans-serif',
                  color: rankColor,
                  border: `1px solid ${rankColor}55`,
                  background: `${rankColor}1A`,
                }}
              >
                {rank}
              </span>
              <span
                style={{
                  fontSize: '13px',
                  fontFamily: 'JetBrains Mono, monospace',
                  color: '#C8C8E0',
                }}
              >
                Level {level} — {locationName}
              </span>
            </div>

            {/* Day counter */}
            <span
              style={{
                fontSize: '12px',
                fontFamily: 'JetBrains Mono, monospace',
                color: '#6A6A8A',
              }}
            >
              Day {dayNumber} of 300
            </span>
          </div>

          {/* ── STATS ROW ─────────────────────────────────────────────────── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr',
              gap: '8px',
              marginBottom: '22px',
            }}
          >
            {stats.map((s) => (
              <div
                key={s.label}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid #2A2A3E',
                  borderRadius: '12px',
                  padding: '12px 8px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '20px', lineHeight: 1, marginBottom: '6px' }}>{s.emoji}</div>
                <div
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 700,
                    fontSize: '15px',
                    color: '#FFFFFF',
                    lineHeight: 1,
                    marginBottom: '4px',
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: '10px',
                    fontFamily: 'JetBrains Mono, monospace',
                    color: '#6A6A8A',
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* ── BADGE STRIP ───────────────────────────────────────────────── */}
          <div style={{ marginBottom: '22px' }}>
            <div
              style={{
                fontSize: '10px',
                fontFamily: 'JetBrains Mono, monospace',
                color: '#6A6A8A',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: '10px',
              }}
            >
              Badges
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {ALL_BADGE_TYPES.map((type) => {
                const meta   = BADGE_META[type]
                const earned = earnedSet.has(type)
                return (
                  <div
                    key={type}
                    title={meta.name}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px',
                      background: earned ? `${meta.color}22` : 'rgba(255,255,255,0.04)',
                      border: `1.5px solid ${earned ? meta.color + '55' : '#2A2A3E'}`,
                    }}
                  >
                    {earned ? (
                      meta.icon
                    ) : (
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#3A3A5A"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* ── MY WHY ────────────────────────────────────────────────────── */}
          {whyMotivation ? (
            <div
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid #2A2A3E',
                borderRadius: '12px',
                padding: '12px 14px',
                marginBottom: '20px',
              }}
            >
              <div
                style={{
                  fontSize: '10px',
                  fontFamily: 'JetBrains Mono, monospace',
                  color: '#6A6A8A',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '6px',
                }}
              >
                Learning English for:
              </div>
              <div
                style={{
                  fontSize: '13px',
                  fontFamily: 'Inter, sans-serif',
                  color: '#C8C8E0',
                  lineHeight: 1.55,
                }}
              >
                {whyMotivation}
              </div>
            </div>
          ) : (
            <div style={{ marginBottom: '20px' }} />
          )}

          {/* ── FOOTER ────────────────────────────────────────────────────── */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <span
              style={{
                fontSize: '11px',
                fontFamily: 'JetBrains Mono, monospace',
                color: '#3A3A5A',
                letterSpacing: '0.05em',
              }}
            >
              EnglishOS.com
            </span>
          </div>

        </div>
      </div>
    )
  },
)

export default ProfileCard
