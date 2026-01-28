import { useEffect, useRef, useState } from 'react'
import { FaArrowUp } from 'react-icons/fa'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  const [direction, setDirection] = useState('up')
  const [bottomOffset, setBottomOffset] = useState(24)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setVisible(currentY > 120)
      setDirection(currentY > lastScrollY.current ? 'down' : 'up')
      lastScrollY.current = currentY

      const footer = document.querySelector('.site-footer')
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top
        const overlap = footerTop < window.innerHeight ? window.innerHeight - footerTop : 0
        const safeOffset = overlap > 0 ? overlap + 24 : 24
        setBottomOffset(safeOffset)
      }
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      onClick={() => {
        if (direction === 'down') {
          const footer = document.querySelector('.site-footer')
          if (footer) {
            const footerTop = footer.getBoundingClientRect().top + window.scrollY
            const target = Math.max(0, footerTop - 24)
            window.scrollTo({ top: target, behavior: 'smooth' })
            return
          }
        }
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }}
      className="fixed right-24 z-40 h-11 w-11 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 transition-colors flex items-center justify-center"
      style={{ bottom: `${bottomOffset}px` }}
      aria-label="Back to top"
    >
      <FaArrowUp
        className={`text-sm transition-transform ${direction === 'down' ? 'rotate-180' : 'rotate-0'}`}
      />
    </button>
  )
}
