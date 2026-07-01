import { useRef } from 'react'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { FaBars, FaMoon, FaSun, FaTimes } from 'react-icons/fa'
import { AnimatePresence, motion } from 'motion/react'
import useScrollNavigation from '../hooks/useScrollNavigation'
import type { ThemeMode } from '../App'

interface NavigationItem {
  name: string
  href: string
}

interface NavbarProps {
  theme: ThemeMode
  onToggleTheme: () => void
}

const navigation: NavigationItem[] = [
  { name: 'Home', href: '#home' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: "Let's Connect", href: '#contact' },
]

export default function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const isProgrammaticScroll = useRef<boolean>(false)
  const { activeSection, updateActiveSection, sections } = useScrollNavigation(isProgrammaticScroll)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

  const handleNavClick = (index: number) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    isProgrammaticScroll.current = true

    const navbarOffset = navRef.current?.getBoundingClientRect().height ?? 0

    if (index === 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const element = document.getElementById(sections[index].id)
      if (element) {
        const isMobile = window.matchMedia('(max-width: 640px)').matches
        const buffer = isMobile ? 20 : 18
        const elementTop = element.getBoundingClientRect().top + window.scrollY
        const offsetPosition = elementTop - navbarOffset - buffer

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
      }
    }

    updateActiveSection(index)

    timerRef.current = setTimeout(() => {
      isProgrammaticScroll.current = false
      timerRef.current = null
    }, 720)
  }

  const themeLabel = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'

  return (
    <Popover
      as="nav"
      className="sticky top-0 z-40 px-3 pt-3 sm:px-5"
    >
      {({ open, close }) => (
        <div className="relative">
          <div
            ref={navRef}
            className='mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full border px-4 py-3 sm:px-6'
            style={{
              background: 'var(--nav-bg)',
              borderColor: 'var(--border)',
              backdropFilter: 'blur(18px)',
              boxShadow: '0 18px 50px var(--shadow-color)',
            }}
          >
            <button
              type='button'
              onClick={() => handleNavClick(0)}
              className='flex items-center text-left'
              style={{ color: 'var(--text-primary)' }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className='font-poppins text-xl font-semibold tracking-[0.06em] sm:text-2xl'
              >
                Prathmesh Jain
              </motion.div>
            </button>

            <div className='hidden items-center gap-2 md:flex'>
              <div className='flex items-center gap-1 rounded-full p-1' style={{ background: 'var(--chip-bg)' }}>
                {navigation.map((item, index) => (
                  <button
                    key={item.name}
                    type='button'
                    aria-current={index === activeSection ? 'page' : undefined}
                    onClick={() => handleNavClick(index)}
                    className='relative rounded-full px-4 py-2 text-sm font-medium'
                    style={{ color: index === activeSection ? 'var(--accent-strong)' : 'var(--text-muted)' }}
                  >
                    {index === activeSection && (
                      <motion.div
                        layoutId='activeNav'
                        className='absolute inset-0 rounded-full'
                        style={{ background: 'var(--accent-soft)' }}
                        transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                      />
                    )}
                    <span className='relative z-10'>{item.name}</span>
                  </button>
                ))}
              </div>

              <button
                type='button'
                onClick={onToggleTheme}
                aria-label={themeLabel}
                className='inline-flex h-11 w-11 items-center justify-center rounded-full border'
                style={{
                  background: 'var(--chip-bg)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)',
                }}
              >
                {theme === 'dark' ? <FaSun size={15} /> : <FaMoon size={15} />}
              </button>
            </div>

            <div className='flex items-center gap-2 md:hidden'>
              <button
                type='button'
                onClick={onToggleTheme}
                aria-label={themeLabel}
                className='inline-flex h-10 w-10 items-center justify-center rounded-full border'
                style={{
                  background: 'var(--chip-bg)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)',
                }}
              >
                {theme === 'dark' ? <FaSun size={14} /> : <FaMoon size={14} />}
              </button>

              <PopoverButton
                className='inline-flex h-10 w-10 items-center justify-center rounded-full border'
                style={{
                  background: 'var(--chip-bg)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)',
                }}
              >
                <span className='sr-only'>Open menu</span>
                {open ? <FaTimes size={18} /> : <FaBars size={18} />}
              </PopoverButton>
            </div>
          </div>

          <AnimatePresence>
            {open && (
              <PopoverPanel
                static
                className="absolute left-0 right-0 top-full z-50 mt-3 md:hidden"
              >
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-3xl border p-3"
                  style={{
                    background: 'var(--nav-bg)',
                    borderColor: 'var(--border)',
                    backdropFilter: 'blur(18px)',
                    boxShadow: '0 18px 50px var(--shadow-color)',
                  }}
                >
                  {navigation.map((item, index) => (
                    <button
                      key={item.name}
                      type="button"
                      aria-current={index === activeSection ? 'page' : undefined}
                      onClick={() => {
                        close()
                        handleNavClick(index)
                      }}
                      className="mb-1 block w-full rounded-2xl px-4 py-3 text-left text-sm font-medium last:mb-0"
                      style={{
                        background:
                          index === activeSection
                            ? 'var(--accent-soft)'
                            : 'transparent',
                        color:
                          index === activeSection
                            ? 'var(--text-primary)'
                            : 'var(--text-muted)',
                      }}
                    >
                      {item.name}
                    </button>
                  ))}
                </motion.div>
              </PopoverPanel>
            )}
          </AnimatePresence>
        </div>
      )}
    </Popover>
  )
}
