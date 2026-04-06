import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div className="min-h-screen bg-bg-primary font-body flex flex-col items-center justify-center px-6 text-center gap-5">
          <span className="text-5xl">⚡</span>
          <h1 className="font-display font-bold text-xl text-text-primary">Something went wrong</h1>
          <p className="text-sm text-text-muted max-w-xs leading-relaxed">
            An unexpected error occurred. Refresh the page to try again, or go back to the map.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-5 py-2.5 bg-transparent text-text-secondary text-sm font-body font-medium rounded-xl border border-border-subtle hover:border-border-strong transition-all"
            >
              Try Again
            </button>
            <button
              onClick={() => { window.location.href = '/map' }}
              className="px-5 py-2.5 bg-brand-red text-text-primary text-sm font-body font-medium rounded-xl border border-brand-red hover:brightness-110 transition-all"
            >
              Back to Map
            </button>
          </div>
          {this.state.error && (
            <p className="text-xs font-mono text-text-muted/50 max-w-xs truncate">
              {this.state.error.message}
            </p>
          )}
        </div>
      )
    }

    return this.props.children
  }
}
