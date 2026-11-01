import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

/** Highlighter stroke that swipes across the text when it scrolls into view. */
export default function Marker({ children, delay = 0.2, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.span
      className={`marker ${className}`}
      initial={reduce ? false : { backgroundSize: '0% 62%' }}
      whileInView={{ backgroundSize: '100% 62%' }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.7, delay, ease: [0.65, 0, 0.35, 1] }}
    >
      {children}
    </motion.span>
  )
}
