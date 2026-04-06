interface SkeletonProps {
  className?: string
  rounded?: string
}

export function Skeleton({ className = '', rounded = 'rounded-lg' }: SkeletonProps) {
  return (
    <div className={`animate-pulse bg-bg-tertiary ${rounded} ${className}`} />
  )
}

export function SkeletonText({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-4 ${i === lines - 1 ? 'w-2/3' : 'w-full'}`}
        />
      ))}
    </div>
  )
}

/*
  SkeletonCard — min-height matches the real card (~108px):
  border + padding (16px*2) + header row (24px) + gap (12px) + 2 text rows (16px * 2 + gap 8px)
  = 32 + 24 + 12 + 40 = 108px. Reserve that space explicitly to prevent CLS.
*/
export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div
      className={`bg-bg-secondary border border-border-subtle rounded-2xl p-4 flex flex-col gap-3 ${className}`}
      style={{ minHeight: '108px' }}
    >
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-6 w-12 rounded-full" />
      </div>
      <SkeletonText lines={2} />
    </div>
  )
}

/*
  SkeletonStatRow — min-height matches StatCard (~110px):
  padding (16px*2) + icon (24px) + gap (8px) + value (24px) + gap (8px) + label (12px) = 108px.
  Reserve it on the row container as well so nothing shifts on load.
*/
export function SkeletonStatRow({ className = '' }: { className?: string }) {
  return (
    <div className={`flex gap-3 ${className}`} style={{ minHeight: '110px' }}>
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="flex-1 bg-bg-secondary border border-border-subtle rounded-2xl p-4 flex flex-col items-center gap-2"
          style={{ minHeight: '110px' }}
        >
          <Skeleton className="h-6 w-6" rounded="rounded-full" />
          <Skeleton className="h-6 w-12" />
          <Skeleton className="h-3 w-16" />
        </div>
      ))}
    </div>
  )
}
