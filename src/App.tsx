import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Experience from './components/Experience'
import Footer from './components/Footer'
const App = () => {
  return (
    <div className='App'>
      <Navbar/>
      <Home/>
      <Skills/>
      <Experience/>
      <Projects/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default App