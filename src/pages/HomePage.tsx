import Hero from '../components/Hero'
import Work from '../components/Work'
import Experience from '../components/Experience'
import Ticker from '../components/fx/Ticker'
import { toolbox } from '../data/content'

// real tools, interrupted by things every developer has said out loud
const jokes = ['works on my machine', 'it’s always DNS', 'LGTM 👍', 'just one more refactor', 'temporary fix (2 yrs old)']
const tools = toolbox.flatMap((t) => t.items).slice(0, 15)
const tickerItems = tools.flatMap((t, i) => (i % 3 === 2 ? [t, jokes[Math.floor(i / 3) % jokes.length]] : [t]))
import About from '../components/About'
import Contact from '../components/Contact'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Work />
      <div className='mb-24 overflow-hidden'>
        <Ticker items={tickerItems} />
      </div>
      <Experience />
      <About />
      <Contact />
    </>
  )
}
