import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'
import { routes, seoFor, seoHeadHtml } from './seo'

/** Renders one route to HTML at build time (see scripts/prerender.mjs). */
export function render(url: string) {
  const html = renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </React.StrictMode>,
  )
  return { html, head: seoHeadHtml(seoFor(url)) }
}

export { routes }
