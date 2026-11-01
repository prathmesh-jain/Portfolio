// Generates the 1200x630 link-preview images in public/og/ (what WhatsApp, LinkedIn, X and
// Google show when someone shares a page). Run after changing project titles/taglines:
//   node scripts/og-cards.mjs
// Needs Playwright (npx playwright install chromium if it is not already available).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import { build } from 'vite'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const out = path.join(root, 'public/og')
fs.mkdirSync(out, { recursive: true })

// read project data straight from the TypeScript source
const tmp = path.join(root, 'node_modules/.og-tmp')
await build({
  logLevel: 'silent',
  build: { ssr: path.join(root, 'src/data/content.ts'), outDir: tmp, emptyOutDir: true },
})
const { profile, projects } = await import(path.join(tmp, 'content.js'))

const font = (pkg, file) => 'data:font/woff2;base64,' + fs.readFileSync(path.join(root, 'node_modules/@fontsource-variable', pkg, 'files', file)).toString('base64')
const img = (p) => {
  const f = path.join(root, 'public', p)
  const ext = path.extname(f).slice(1).replace('jpg', 'jpeg')
  return `data:image/${ext};base64,` + fs.readFileSync(f).toString('base64')
}

const css = `
@font-face { font-family: Sans; src: url(${font('instrument-sans', 'instrument-sans-latin-wght-normal.woff2')}); font-weight: 100 900; }
@font-face { font-family: Hand; src: url(${font('caveat', 'caveat-latin-wght-normal.woff2')}); font-weight: 400 700; }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; background: #fdfdfb; color: #1c2230; font-family: Sans; position: relative; overflow: hidden; }
.pad { position: absolute; inset: 0; padding: 70px 76px; display: flex; gap: 56px; align-items: center; }
.text { flex: 1; min-width: 0; }
.hand { font-family: Hand; color: #d63b2a; font-size: 40px; }
h1 { font-size: 78px; line-height: 0.98; letter-spacing: -0.035em; font-weight: 600; margin-top: 6px; }
p { font-size: 32px; line-height: 1.3; margin-top: 22px; color: #1c2230; }
.mark { background: linear-gradient(100deg, transparent 1%, #ffe86b 2%, #ffe86b 98%, transparent 99%) 0 80% / 100% 55% no-repeat; }
.foot { position: absolute; left: 76px; bottom: 44px; font-size: 24px; color: #6a7183; display: flex; gap: 14px; align-items: center; }
.foot b { font-family: Hand; font-size: 34px; color: #1c2230; }
.squiggle { position: absolute; left: 76px; right: 76px; bottom: 96px; height: 14px; }
.print { background: #fff; padding: 12px 12px 18px; box-shadow: 0 2px 4px rgba(28,34,48,.08), 0 24px 50px -20px rgba(28,34,48,.35); position: relative; }
.print img { display: block; width: 100%; }
.tape { position: absolute; top: -14px; left: 40px; width: 110px; height: 30px; background: rgba(214,205,170,.6); transform: rotate(-5deg); }
`
const squiggle = `<svg class="squiggle" viewBox="0 0 300 14" preserveAspectRatio="none"><path d="M2 9c20 -8 34 6 54 -1s34 -7 54 0s36 6 56 -1s36 -6 56 0s30 4 76 -2" fill="none" stroke="#d63b2a" stroke-width="2.4" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>`
const foot = `<div class="foot"><b>prathmesh.</b> prathmeshjain.in</div>`

const card = (label, title, line, picture, pictureWidth = 470, tilt = 2) => `<!doctype html><html><head><style>${css}</style></head><body>
<div class="pad" style="padding-bottom: 130px">
  <div class="text"><div class="hand">${label}</div><h1>${title}</h1><p>${line}</p></div>
  ${picture ? `<div class="print" style="width:${pictureWidth}px; transform: rotate(${tilt}deg)"><span class="tape"></span><img src="${picture}"></div>` : ''}
</div>${squiggle}${foot}</body></html>`

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
const shoot = async (name, html) => {
  await page.setContent(html, { waitUntil: 'load' })
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: path.join(out, `${name}.jpg`), type: 'jpeg', quality: 86 })
  console.log('  og/' + name + '.jpg')
}

await shoot(
  'home',
  card('hey there, I’m', `${profile.name}.`, `${profile.role}. I build AI agents and the products around them that people <span class="mark">actually use</span>.`, img('/profile.webp'), 330, 2.5),
)
for (const p of projects) {
  const phone = p.coverFit === 'contain'
  await shoot(
    p.slug,
    card(
      p.team ? `team project · ${p.team.size} of us` : `project no. ${Number(p.index)}`,
      p.title,
      p.tagline,
      p.cover && !phone ? img(p.cover) : phone ? img(p.gallery[0].src) : null,
      phone ? 190 : 500,
      p.cover && !phone ? -1.5 : 2,
    ),
  )
}
await browser.close()
fs.rmSync(tmp, { recursive: true, force: true })
