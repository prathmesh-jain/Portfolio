import Hero from '../components/Hero'
import Work from '../components/Work'
import Experience from '../components/Experience'
import Ticker from '../components/fx/Ticker'
import { toolbox } from '../data/content'
import About from '../components/About'
import Contact from '../components/Contact'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Work />
      <div className='mb-24 overflow-hidden'>
        <Ticker items={toolbox.flatMap((t) => t.items).slice(0, 18)} />
      </div>
      <Experience />
      <About />
      <Contact />
    </>
  )
}
