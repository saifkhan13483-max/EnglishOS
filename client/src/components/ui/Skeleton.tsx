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

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-bg-secondary border border-border-subtle rounded-2xl p-4 flex flex-col gap-3 ${className}`}>
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-6 w-12 rounded-full" />
      </div>
      <SkeletonText lines={2} />
    </div>
  )
}

export function SkeletonStatRow({ className = '' }: { className?: string }) {
  return (
    <div className={`flex gap-3 ${className}`}>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex-1 bg-bg-secondary border border-border-subtle rounded-2xl p-4 flex flex-col items-center gap-2">
          <Skeleton className="h-6 w-6" rounded="rounded-full" />
          <Skeleton className="h-6 w-12" />
          <Skeleton className="h-3 w-16" />
        </div>
      ))}
    </div>
  )
}
