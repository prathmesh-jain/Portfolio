import { useEffect, useSyncExternalStore } from 'react'

const subscribe = (callback: () => void) => {
  window.addEventListener('popstate', callback)
  return () => window.removeEventListener('popstate', callback)
}

const getPath = () => window.location.pathname

export const usePath = () => useSyncExternalStore(subscribe, getPath, () => '/')

export const scrollToHash = (hash: string, behavior: ScrollBehavior = 'smooth') => {
  const id = hash.replace(/^#/, '')
  if (!id) {
    window.scrollTo({ top: 0, behavior })
    return
  }
  const el = document.getElementById(id)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 72
    window.scrollTo({ top, behavior })
  }
}

export const navigate = (to: string) => {
  const url = new URL(to, window.location.origin)
  const samePath = url.pathname === window.location.pathname

  if (samePath && url.hash) {
    window.history.pushState(null, '', url.pathname + url.hash)
    scrollToHash(url.hash)
    return
  }

  window.history.pushState(null, '', url.pathname + url.hash)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

/** After a route change, jump to the hash target (if any) or the top of the page. */
export const useScrollOnRouteChange = (path: string) => {
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      requestAnimationFrame(() => scrollToHash(hash, 'auto'))
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [path])
}
