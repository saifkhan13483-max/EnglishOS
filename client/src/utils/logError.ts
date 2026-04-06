export function logError(error: Error, componentStack?: string | null): void {
  try {
    const body = {
      message: error.message,
      componentStack: componentStack ?? undefined,
      url: window.location.href,
      userAgent: navigator.userAgent,
    }

    fetch('/api/v1/log/client-error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      keepalive: true,
    }).catch(() => {
      // Silently swallow — never let logging break the app
    })
  } catch {
    // Silently swallow
  }
}
