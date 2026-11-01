// Build step 3 of 3: turn the single-page app into real HTML files, one per route.
// Search engines and link previews (WhatsApp, LinkedIn, X) then see full content and
// the right title/description/image for every page, without running JavaScript.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const serverDir = path.join(root, 'dist-server')

const { render, routes } = await import(pathToFileURL(path.join(serverDir, 'entry-server.js')).href)
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const SITE = 'https://prathmeshjain.in'

const page = (url) => {
  const { html, head } = render(url)
  return template.replace('<!--app-head-->', head).replace('<!--app-html-->', html)
}

const write = (file, contents) => {
  const out = path.join(dist, file)
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, contents)
  console.log('  prerendered', file)
}

for (const url of routes) {
  // "/work/transcribe" -> dist/work/transcribe.html (served at the clean URL by vercel.json)
  write(url === '/' ? 'index.html' : `${url.slice(1)}.html`, page(url))
}
// Vercel serves 404.html (with a real 404 status) for anything else
write('404.html', page('/404'))

const today = new Date().toISOString().slice(0, 10)
write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (url) => `  <url>
    <loc>${SITE}${url}</loc>
    <lastmod>${today}</lastmod>
    <priority>${url === '/' ? '1.0' : '0.8'}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`,
)
write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`)

fs.rmSync(serverDir, { recursive: true, force: true })
