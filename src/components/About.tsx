import Marker from './fx/Marker'
import { motion } from 'motion/react'
import SectionHead from './SectionHead'
import { toolbox } from '../data/content'

export default function About() {
  return (
    <section id='about' className='wrap scroll-mt-6 pb-24'>
      <SectionHead title='About me' />

      <div className='mt-12 grid grid-cols-1 gap-14 md:grid-cols-[1.2fr_0.8fr]'>
        <div className='min-w-0 max-w-2xl space-y-5 text-[1.15rem] leading-[1.7]'>
          <p>
            I started as a full stack developer and slowly fell into AI. These days I spend most of my time building
            agents that have to be <Marker>right, not just impressive</Marker>, and the apps around them
            that real people can use without a manual.
          </p>
          <p>
            When I’m not at work I’m usually building something on the side, which is where most of the projects above
            came from. I’d rather ship a small tool people rely on than a flashy demo.
          </p>
        </div>

        <motion.aside
          className='relative h-fit min-w-0 bg-[#fff9c9] p-6 shadow-[0_10px_24px_-14px_rgba(28,34,48,0.35)]'
          initial={{ opacity: 0, y: -30, rotate: 6 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0.8 }}
          whileHover={{ rotate: -0.6, y: -4, transition: { type: 'spring', stiffness: 260, damping: 10 } }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ type: 'spring', stiffness: 110, damping: 12 }}
          style={{ originY: 0 }}
        >
          <span className='tape -top-3 left-1/2 -translate-x-1/2 rotate-2' />
          <h3 className='hand text-[1.9rem] leading-none'>stuff I use a lot</h3>
          <dl className='mt-4 space-y-3 text-[0.95rem] leading-relaxed'>
            {toolbox.map((row) => (
              <div key={row.group}>
                <dt className='font-semibold'>{row.group}</dt>
                <dd className='text-pencil'>{row.items.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </motion.aside>
      </div>
    </section>
  )
}
