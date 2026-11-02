import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

/** Paper-plane button that appears once you have scrolled a fair way down. */
export default function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 1.5)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type='button'
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className='group fixed bottom-4 right-4 z-40 flex h-11 w-11 items-center justify-center gap-2 rounded-[255px_15px_225px_15px/15px_225px_15px_255px] border-2 border-ink bg-paper shadow-[3px_3px_0_0_var(--color-ink)] sm:bottom-5 sm:right-5 sm:h-auto sm:w-auto sm:px-3.5 sm:py-2'
          initial={{ opacity: 0, y: 30, rotate: -8 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          exit={{ opacity: 0, y: 30, rotate: 8 }}
          whileHover={{ y: -3, rotate: 0 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          aria-label='Back to top'
        >
          {/* static hand-drawn up arrow (a fixed button doesn't need a draw-in animation) */}
          <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2.4'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='h-6 w-6 shrink-0 transition-transform duration-300 group-hover:-translate-y-1'
            aria-hidden='true'
          >
            <path d='M12.3 20.5C11.6 15 12.6 9 11.8 4' />
            <path d='M5.8 10.2C8 8 10 5.6 11.8 3.6C13.6 5.8 15.6 7.8 18.2 9.8' />
          </svg>
          {/* label only where there's room; on phones it's a small icon button */}
          <span className='hand hidden text-[1.3rem] leading-none sm:inline'>back to top</span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
