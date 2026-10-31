import { useEffect } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import CaseStudy from './pages/CaseStudy'
import NotFound from './pages/NotFound'
import { usePath, useScrollOnRouteChange } from './lib/router'
import { profile, projects } from './data/content'

const DEFAULT_TITLE = `${profile.name} · ${profile.role}`

const App = () => {
  const path = usePath()
  useScrollOnRouteChange(path)

  const match = path.match(/^\/work\/([\w-]+)\/?$/)
  const projectIndex = match ? projects.findIndex((p) => p.slug === match[1]) : -1
  const project = projectIndex >= 0 ? projects[projectIndex] : null
  const isHome = path === '/' || path === ''

  useEffect(() => {
    document.title = project ? `${project.title} · ${profile.name}` : DEFAULT_TITLE
  }, [project])

  let page = <NotFound />
  if (isHome) page = <HomePage />
  else if (project)
    page = <CaseStudy key={project.slug} project={project} next={projects[(projectIndex + 1) % projects.length]} />

  return (
    <>
      <Nav />
      <main>{page}</main>
      <Footer />
    </>
  )
}

export default App
