export const resolveApiBase = () => {
  const configured = (import.meta.env.VITE_API_BASE || import.meta.env.VITE_API_URL || '').trim()
  if (configured) return configured.replace(/\/$/, '')

  if (typeof window === 'undefined') return ''

  const { hostname, origin, port } = window.location

  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    if (port === '3000') return ''
    return 'http://localhost:3001'
  }

  return origin.replace(/\/$/, '')
}
