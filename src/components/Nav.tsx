import { useEffect, useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import Link from './Link'
import { profile } from '../data/content'
import type { ThemeMode } from '../App'

const items = [
  { name: 'Work', to: '/#work' },
  { name: 'Experience', to: '/#experience' },
  { name: 'Toolbox', to: '/#toolbox' },
  { name: 'Contact', to: '/#contact' },
]

interface NavProps {
  theme: ThemeMode
  onToggleTheme: () => void
}

export default function Nav({ theme, onToggleTheme }: NavProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className='sticky top-0 z-40 border-b transition-colors duration-300'
      style={{
        borderColor: scrolled ? 'var(--line)' : 'transparent',
        background: scrolled ? 'color-mix(in srgb, var(--bg) 85%, transparent)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : undefined,
      }}
    >
      <nav className='mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-5 md:px-8'>
        <Link to='/' className='flex items-center gap-2.5 font-display text-[1.05rem] font-semibold tracking-tight'>
          <span
            aria-hidden='true'
            className='grid h-7 w-7 place-items-center rounded-md bg-ink font-mono text-[0.7rem] font-bold text-bg'
          >
            PJ
          </span>
          <span className='hidden sm:inline'>{profile.name}</span>
        </Link>

        <div className='flex items-center gap-1 sm:gap-2'>
          <ul className='hidden items-center gap-1 md:flex'>
            {items.map((item) => (
              <li key={item.name}>
                <Link to={item.to} className='rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-ink'>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link to='/#work' className='rounded-md px-2 py-2 text-sm text-muted hover:text-ink md:hidden'>
            Work
          </Link>
          <Link to='/#contact' className='rounded-md px-2 py-2 text-sm text-muted hover:text-ink md:hidden'>
            Contact
          </Link>
          <button
            type='button'
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className='grid h-9 w-9 place-items-center rounded-md text-muted transition-colors hover:text-ink'
          >
            {theme === 'dark' ? <FaSun size={14} /> : <FaMoon size={13} />}
          </button>
          <a href={profile.resume} target='_blank' rel='noreferrer' className='btn btn-ghost !px-3.5 !py-1.5 text-sm'>
            Resume
          </a>
        </div>
      </nav>
    </header>
  )
}
