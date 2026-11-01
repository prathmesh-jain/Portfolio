import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import Link from './Link'
import { usePath } from '../lib/router'
import { profile } from '../data/content'

const sections = [
  { id: 'work', label: 'work' },
  { id: 'experience', label: 'experience' },
  { id: 'about', label: 'about', hideOnMobile: true },
  { id: 'contact', label: 'say hi', hideOnMobile: true },
]

/** Which home-page section is currently under the top third of the screen. */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    if (!enabled) return
    const onScroll = () => {
      const line = window.innerHeight * 0.35
      let current: string | null = null
      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= line) current = s.id
      }
      setActive(current)
    }
    const raf = requestAnimationFrame(onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [enabled])
  return enabled ? active : null
}

export default function Nav() {
  const path = usePath()
  const active = useActiveSection(path === '/')

  return (
    <header className='sticky top-0 z-40 bg-paper/85 backdrop-blur-sm'>
      <div className='wrap flex h-16 items-center justify-between'>
        <Link to='/' className='hand text-[1.5rem] font-bold leading-none sm:text-[1.9rem]' aria-label='Home'>
          <motion.span className='inline-block' whileHover={{ rotate: -4, scale: 1.05 }}>
            prathmesh<span className='text-pen'>.</span>
          </motion.span>
        </Link>
        <nav aria-label='Main'>
          <ul className='flex items-center gap-0.5 text-[0.88rem] sm:gap-3 sm:text-[0.95rem]'>
            {sections.map((s) => (
              <li key={s.id} className={s.hideOnMobile ? 'hidden sm:block' : ''}>
                <Link
                  to={`/#${s.id}`}
                  aria-current={active === s.id ? 'true' : undefined}
                  className='relative block px-1.5 py-1 hover:text-pen sm:px-2'
                >
                  {active === s.id && (
                    // hand-drawn loop that slides to whichever section you're reading
                    <motion.svg
                      layoutId='nav-circle'
                      viewBox='0 0 100 40'
                      preserveAspectRatio='none'
                      className='pointer-events-none absolute -inset-x-1 -inset-y-1 h-[calc(100%+8px)] w-[calc(100%+8px)] text-pen'
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      aria-hidden='true'
                    >
                      <path
                        d='M14 8C40 1 86 2 95 16c8 13 -20 22 -50 21C17 36 3 28 6 18C9 9 30 5 60 6'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        vectorEffect='non-scaling-stroke'
                      />
                    </motion.svg>
                  )}
                  <span className='relative'>{s.label}</span>
                </Link>
              </li>
            ))}
            <li>
              <a href={profile.resume} target='_blank' rel='noreferrer' className='ink-link ml-0.5 block px-1 py-1 sm:ml-1'>
                resume
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
