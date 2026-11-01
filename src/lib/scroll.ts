import { useEffect } from 'react'
import { useLocation } from 'react-router'

const NAV_OFFSET = 72

export const scrollToHash = (hash: string, behavior: ScrollBehavior = 'smooth') => {
  const id = decodeURIComponent(hash.replace(/^#/, ''))
  const el = id ? document.getElementById(id) : null
  if (!el) return false
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET, behavior })
  return true
}

/** New page: start at the top, or at the #section in the URL. */
export function useScrollOnNavigate() {
  const { pathname, hash, key } = useLocation()
  useEffect(() => {
    if (hash) {
      // wait a frame so the new page has rendered
      const id = requestAnimationFrame(() => {
        if (!scrollToHash(hash)) window.scrollTo({ top: 0 })
      })
      return () => cancelAnimationFrame(id)
    }
    window.scrollTo({ top: 0 })
  }, [pathname, hash, key])
}
