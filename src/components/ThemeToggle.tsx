import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

type Theme = 'light' | 'dark'
const KEY = 'theme'

const current = (): Theme =>
  typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'

const apply = (theme: Theme) => {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#15171c' : '#fdfdfb')
}

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

/** Hand-drawn sun / moon that switches the notebook between day and night. */
export default function ThemeToggle() {
  // The real theme is set by an inline script in index.html before the first paint;
  // start as 'light' so the prerendered HTML and the first client render match.
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const id = requestAnimationFrame(() => setTheme(current()))
    return () => cancelAnimationFrame(id)
  }, [])

  const toggle = () => {
    const next = current() === 'dark' ? 'light' : 'dark'
    apply(next)
    setTheme(next)
    try {
      localStorage.setItem(KEY, next)
    } catch {
      /* storage blocked: still works for this visit */
    }
  }

  const dark = theme === 'dark'
  return (
    <button
      type='button'
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'lights on' : 'lights off'}
      className='grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink transition-colors hover:text-pen'
    >
      <AnimatePresence mode='wait' initial={false}>
        <motion.svg
          key={theme}
          viewBox='0 0 24 24'
          className='h-[22px] w-[22px]'
          initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          aria-hidden='true'
        >
          {dark ? (
            // sun: wobbly circle and rays
            <>
              <path {...stroke} d='M12 7.2c2.8-.1 4.9 2 4.8 4.9-.1 2.7-2.2 4.7-4.9 4.6-2.6 0-4.6-2.2-4.5-4.9.1-2.6 2-4.5 4.6-4.6' />
              <path {...stroke} d='M12 2.6v2M12 19.4v2M2.6 12h2M19.4 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4' />
            </>
          ) : (
            // crescent moon, slightly uneven like a pen sketch
            <path {...stroke} d='M19.6 14.6c-1 .4-2.1.6-3.2.6-4.6 0-8.1-3.6-8.1-8.1 0-1.2.3-2.3.7-3.3C5.6 4.9 3.2 8 3.3 11.7c.1 4.8 4 8.6 8.8 8.6 3.4 0 6.3-2 7.5-5.7z' />
          )}
        </motion.svg>
      </AnimatePresence>
    </button>
  )
}
