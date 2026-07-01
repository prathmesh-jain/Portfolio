import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Experience from './components/Experience'
import Footer from './components/Footer'

export type ThemeMode = 'dark' | 'light'

const STORAGE_KEY = 'portfolio-theme'

const getInitialTheme = (): ThemeMode => {
  if (typeof window === 'undefined') {
    return 'dark'
  }

  const savedTheme = window.localStorage.getItem(STORAGE_KEY)
  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const App = () => {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  return (
    <div className='page-shell'>
      <div className='page-backdrop' aria-hidden='true' />

      <div className='relative z-10'>
        <Navbar
          theme={theme}
          onToggleTheme={() => setTheme((currentTheme) => currentTheme === 'dark' ? 'light' : 'dark')}
        />
        <Home />
        <Skills theme={theme}/>
        <Experience />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </div>
  )
}

export default App
