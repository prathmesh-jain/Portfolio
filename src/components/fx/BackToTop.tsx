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
          <span className='inline-block transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-[-20deg]'>✈</span>
          {/* label only where there's room; on phones it's a small icon button */}
          <span className='hand hidden text-[1.25rem] leading-none sm:inline'>beam me up</span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
