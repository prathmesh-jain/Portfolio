import { useEffect } from 'react'
import { seoFor } from '../seo'

const setMeta = (attr: 'name' | 'property', key: string, value: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = value
}

/**
 * Keeps <head> in sync while navigating in the browser.
 * The first load already has the right tags baked in by the prerender.
 */
export default function useSeo(pathname: string) {
  useEffect(() => {
    const seo = seoFor(pathname)
    document.title = seo.title
    setMeta('name', 'description', seo.description)
    setMeta('name', 'robots', seo.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large')
    setMeta('property', 'og:type', seo.type)
    setMeta('property', 'og:title', seo.title)
    setMeta('property', 'og:description', seo.description)
    setMeta('property', 'og:url', seo.canonical)
    setMeta('property', 'og:image', seo.image)
    setMeta('property', 'og:image:alt', seo.imageAlt)
    setMeta('name', 'twitter:title', seo.title)
    setMeta('name', 'twitter:description', seo.description)
    setMeta('name', 'twitter:image', seo.image)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = seo.canonical

    document.head.querySelectorAll('script[data-seo]').forEach((el) => el.remove())
    for (const data of seo.jsonLd) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.dataset.seo = ''
      script.textContent = JSON.stringify(data)
      document.head.appendChild(script)
    }
  }, [pathname])
}
