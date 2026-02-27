import { useEffect, useMemo, useState } from 'react'
import { FaLightbulb, FaTimes } from 'react-icons/fa'

const tips = [
  'Tip: Use filters to narrow down location, price, and property type fast.',
  'Tip: Save searches to track new listings that match your criteria.',
  'Tip: Compare properties side by side before booking a viewing.',
  'Tip: Verified agents respond faster when you include a preferred date.'
]

export default function GlobalTips() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  const dismissedKey = useMemo(() => 'profind_tip_dismissed', [])

  useEffect(() => {
    const dismissed = sessionStorage.getItem(dismissedKey)
    if (dismissed === '1') {
      setVisible(false)
    }
  }, [dismissedKey])

  useEffect(() => {
    if (!visible) return
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % tips.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [visible])

  if (!visible) return null

  return (
    <div className="fixed top-24 right-6 z-40 max-w-xs">
      <div className="rounded-2xl border border-emerald-100 bg-white/95 shadow-lg px-4 py-3 backdrop-blur flex items-start gap-3">
        <span className="mt-1 text-green-600">
          <FaLightbulb />
        </span>
        <p className="text-sm text-gray-700 flex-1">{tips[index]}</p>
        <button
          type="button"
          onClick={() => {
            sessionStorage.setItem(dismissedKey, '1')
            setVisible(false)
          }}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Dismiss tip"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  )
}
