import { motion } from 'motion/react'
import { FaArrowDown, FaGithub, FaLinkedin } from 'react-icons/fa'
import PipelineLog from './PipelineLog'
import Link from './Link'
import { profile } from '../data/content'

const ease = [0.22, 1, 0.36, 1] as const

export default function Hero() {
  return (
    <section id='top' className='relative'>
      <div className='ruled pointer-events-none absolute inset-0 -top-16' aria-hidden='true' />
      <div className='relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-12 md:px-8 md:pt-20 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14 lg:pb-28'>
        <motion.div className='min-w-0' initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
          <div className='flex items-center gap-3'>
            <img
              src='/profile.webp'
              alt='Prathmesh Jain'
              width={44}
              height={44}
              className='h-11 w-11 rounded-full object-cover object-top ring-1 ring-line-strong'
            />
            <div className='text-sm leading-5'>
              <div className='font-medium'>{profile.name}</div>
              <div className='flex items-center gap-2 text-muted'>
                <span className='status-dot h-1.5 w-1.5 rounded-full bg-ok' aria-hidden='true' />
                {profile.role} at {profile.company} · {profile.location}
              </div>
            </div>
          </div>

          <h1 className='mt-8 font-display text-[2.35rem] font-semibold leading-[1.04] tracking-[-0.025em] sm:text-5xl lg:text-[3.3rem]'>
            I build AI agents that do real work, <span className='text-muted'>and the products around them.</span>
          </h1>

          <p className='mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8'>
            At TCS I build multi-agent systems for US banks. One of them cut compliance investigations from{' '}
            <span className='text-ink'>1–2 days to under 5 minutes</span>. On the side I run{' '}
            <Link to='/work/transcribe' className='link-underline text-ink'>Transcribe</Link>, which turns
            1.5-hour multilingual lectures into searchable PDFs for <span className='text-ink'>50+ people</span>.
          </p>

          <div className='mt-8 flex flex-wrap items-center gap-3'>
            <Link to='/#work' className='btn btn-primary'>
              See the work <FaArrowDown size={11} />
            </Link>
            <a href={`mailto:${profile.email}`} className='btn btn-ghost'>
              Email me
            </a>
            <div className='ml-1 flex items-center gap-1'>
              <a
                href={profile.links.github}
                target='_blank'
                rel='noreferrer'
                aria-label='GitHub'
                className='grid h-10 w-10 place-items-center rounded-md text-muted hover:text-ink'
              >
                <FaGithub size={18} />
              </a>
              <a
                href={profile.links.linkedin}
                target='_blank'
                rel='noreferrer'
                aria-label='LinkedIn'
                className='grid h-10 w-10 place-items-center rounded-md text-muted hover:text-ink'
              >
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          className='min-w-0'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
        >
          <PipelineLog />
        </motion.div>
      </div>
    </section>
  )
}
