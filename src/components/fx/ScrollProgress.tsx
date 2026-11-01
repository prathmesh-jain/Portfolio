import { motion, useScroll, useSpring } from 'motion/react'

/** Thin red-pen line at the top of the page that fills as you scroll. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 24, mass: 0.3 })
  return (
    <motion.div
      aria-hidden='true'
      className='fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-pen'
      style={{ scaleX }}
    />
  )
}
