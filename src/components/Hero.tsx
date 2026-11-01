import { motion } from 'motion/react'
import Marker from './fx/Marker'
import Magnetic from './fx/Magnetic'
import HandWrite from './fx/HandWrite'
import Words from './fx/Words'
import Print from './fx/Print'
import Link from './Link'
import { Star } from './Doodles'
import { profile } from '../data/content'

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { type: 'spring' as const, stiffness: 120, damping: 20, delay },
})

export default function Hero() {
  return (
    <section className='wrap grid grid-cols-1 items-center gap-14 pb-24 pt-10 md:grid-cols-[1.25fr_0.75fr] md:pt-16'>
      <div className='min-w-0'>
        <p className='hand text-[1.9rem] text-pen'>
          <HandWrite onView={false} duration={0.8}>
            hey there, I’m
          </HandWrite>
        </p>
        <h1 className='mt-1 text-[3.1rem] font-semibold leading-[0.98] tracking-[-0.035em] sm:text-[4.6rem]'>
          <Words text='Prathmesh Jain.' delay={0.45} stagger={0.12} />
        </h1>
        <motion.p {...rise(0.8)} className='mt-7 max-w-xl text-[1.25rem] leading-[1.55] sm:text-[1.4rem]'>
          I build AI agents for banks at TCS, and outside work I keep shipping side projects that people{' '}
          <Marker delay={1.4}>actually use</Marker>.
        </motion.p>
        <motion.p {...rise(0.95)} className='mt-5 max-w-xl text-[1.05rem] leading-relaxed text-pencil'>
          {profile.role} in {profile.location}. Mostly Python, TypeScript, LangGraph and React.
        </motion.p>

        <motion.div {...rise(1.1)} className='mt-9 flex flex-wrap items-center gap-x-6 gap-y-4'>
          <Magnetic>
            <Link
              to='/#work'
              className='group/btn relative inline-block overflow-hidden rounded-[255px_15px_225px_15px/15px_225px_15px_255px] border-2 border-ink px-5 py-2.5 font-semibold'
            >
              {/* ink fills the button from below on hover */}
              <span
                aria-hidden='true'
                className='absolute inset-0 translate-y-full bg-ink transition-transform duration-300 ease-out group-hover/btn:translate-y-0'
              />
              <span className='relative transition-colors duration-300 group-hover/btn:text-paper'>see what I’ve built ↓</span>
            </Link>
          </Magnetic>
          <a href={`mailto:${profile.email}`} className='ink-link'>
            {profile.email}
          </a>
        </motion.div>
      </div>

      <div className='relative mx-auto w-[78%] max-w-[330px] md:w-full'>
        <Print tilt={2.5} delay={0.35}>
          <motion.span
            className='tape z-10 -top-3 left-1/2 -translate-x-1/2 -rotate-3'
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.35, ease: 'easeOut' }}
            style={{ originX: 0 }}
          />
          <img
            src='/profile.webp'
            alt='Prathmesh in the mountains'
            className='aspect-[4/5] w-full object-cover object-top'
            fetchPriority='high'
          />
          <figcaption className='hand pt-2 text-center text-[1.45rem]'>
            <HandWrite delay={1.3}>me, up in the hills</HandWrite>
          </figcaption>
        </Print>
        <motion.div
          className='absolute -right-5 -top-6 h-9 w-9 text-sky'
          initial={{ rotate: 12 }}
          animate={{ rotate: [12, 372] }}
          transition={{ duration: 18, ease: 'linear', repeat: Infinity, delay: 2 }}
          whileHover={{ scale: 1.3 }}
        >
          <Star className='h-full w-full' delay={1.6} />
        </motion.div>
      </div>
    </section>
  )
}
