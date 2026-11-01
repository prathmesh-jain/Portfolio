import { useEffect } from 'react'
import { MotionConfig, motion } from 'motion/react'
import ScrollProgress from './components/fx/ScrollProgress'
import BackToTop from './components/fx/BackToTop'
import Nav from './components/Nav'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import CaseStudy from './pages/CaseStudy'
import NotFound from './pages/NotFound'
import { usePath, useScrollOnRouteChange } from './lib/router'
import { profile, projects } from './data/content'

const DEFAULT_TITLE = `${profile.name} · ${profile.role}`

// small jokes for people who switch tabs or open devtools
const AWAY_TITLE = 'come back, the agents miss you 👀'
let greeted = false

const App = () => {
  const path = usePath()
  useScrollOnRouteChange(path)

  const match = path.match(/^\/work\/([\w-]+)\/?$/)
  const projectIndex = match ? projects.findIndex((p) => p.slug === match[1]) : -1
  const project = projectIndex >= 0 ? projects[projectIndex] : null
  const isHome = path === '/' || path === ''

  useEffect(() => {
    if (!greeted) {
      greeted = true
      console.log(
        '%chey, you opened devtools.%c\nThe source is on GitHub: https://github.com/prathmesh-jain/Portfolio\nOr skip the inspecting and just email me: ' + profile.email,
        'font: 600 16px sans-serif; color: #d63b2a',
        'font: 13px sans-serif',
      )
    }
  }, [])

  useEffect(() => {
    let saved = document.title
    const onVis = () => {
      if (document.hidden) {
        saved = document.title
        document.title = AWAY_TITLE
      } else if (document.title === AWAY_TITLE) {
        document.title = saved
      }
    }
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  useEffect(() => {
    document.title = project ? `${project.title} · ${profile.name}` : DEFAULT_TITLE
  }, [project])

  let page = <NotFound />
  if (isHome) page = <HomePage />
  else if (project)
    page = <CaseStudy key={project.slug} project={project} next={projects[(projectIndex + 1) % projects.length]} />

  return (
    <MotionConfig reducedMotion='user'>
      <ScrollProgress />
      <Nav />
      {/* clip sideways spill from tilted/dropping prints so phones never scroll horizontally */}
      <motion.main
        key={path}
        className='overflow-x-clip'
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {page}
      </motion.main>
      <Footer />
      <BackToTop />
    </MotionConfig>
  )
}

export default App
