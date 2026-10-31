import { useEffect, useState } from 'react'
import { MotionConfig } from 'motion/react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import CaseStudy from './pages/CaseStudy'
import NotFound from './pages/NotFound'
import { usePath, useScrollOnRouteChange } from './lib/router'
import { profile, projects } from './data/content'

export type ThemeMode = 'dark' | 'light'

const STORAGE_KEY = 'portfolio-theme'
const DEFAULT_TITLE = `${profile.name} · ${profile.role}`

const getInitialTheme = (): ThemeMode => {
  const current = document.documentElement.dataset.theme
  if (current === 'dark' || current === 'light') return current
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

const App = () => {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme)
  const path = usePath()
  useScrollOnRouteChange(path)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const match = path.match(/^\/work\/([\w-]+)\/?$/)
  const projectIndex = match ? projects.findIndex((p) => p.slug === match[1]) : -1
  const project = projectIndex >= 0 ? projects[projectIndex] : null
  const isHome = path === '/' || path === ''

  useEffect(() => {
    document.title = project ? `${project.title}: case study · ${profile.name}` : DEFAULT_TITLE
  }, [project])

  let page = <NotFound />
  if (isHome) page = <HomePage />
  else if (project) page = <CaseStudy key={project.slug} project={project} next={projects[(projectIndex + 1) % projects.length]} />

  return (
    <MotionConfig reducedMotion='user'>
      <Nav theme={theme} onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} />
      <main>{page}</main>
      <Footer />
    </MotionConfig>
  )
}

export default App
