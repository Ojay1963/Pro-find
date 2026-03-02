export const resolveApiBase = () => {
  const configured = (import.meta.env.VITE_API_BASE || import.meta.env.VITE_API_URL || '').trim()
  if (configured) return configured.replace(/\/$/, '')

  if (typeof window !== 'undefined' && window.location.hostname === 'pro-find-5iwl.vercel.app') {
    return 'https://pro-find-sgbp.vercel.app'
  }

  return ''
}
