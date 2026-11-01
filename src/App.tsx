import { useEffect } from 'react'
import { MotionConfig, motion } from 'motion/react'
import ScrollProgress from './components/fx/ScrollProgress'
import BackToTop from './components/fx/BackToTop'
import Nav from './components/Nav'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import CaseStudy from './pages/CaseStudy'
import NotFound from './pages/NotFound'
import { Route, Routes, useLocation, useParams } from 'react-router'
import { useScrollOnNavigate } from './lib/scroll'
import useSeo from './lib/useSeo'
import { profile, projects } from './data/content'

function CaseStudyRoute() {
  const { slug } = useParams()
  const index = projects.findIndex((p) => p.slug === slug)
  if (index < 0) return <NotFound />
  const project = projects[index]
  return <CaseStudy key={project.slug} project={project} next={projects[(index + 1) % projects.length]} />
}

// small jokes for people who switch tabs or open devtools
const AWAY_TITLE = 'come back, the agents miss you 👀'
let greeted = false
// the first page arrives prerendered and visible; only later navigations fade in
let navigated = false

const App = () => {
  const { pathname } = useLocation()
  useScrollOnNavigate()
  useSeo(pathname)
  const firstPage = !navigated
  useEffect(() => {
    navigated = true
  }, [pathname])

  useEffect(() => {
    if (!greeted) {
      greeted = true
      console.log(
        '%chey, you opened devtools.%c\nSkip the inspecting and just email me: ' + profile.email,
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

  return (
    <MotionConfig reducedMotion='user'>
      <ScrollProgress />
      <Nav />
      {/* clip sideways spill from tilted/dropping prints so phones never scroll horizontally */}
      <motion.main
        key={pathname}
        className='overflow-x-clip'
        initial={firstPage ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/work/:slug' element={<CaseStudyRoute />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </motion.main>
      <Footer />
      <BackToTop />
    </MotionConfig>
  )
}

export default App
