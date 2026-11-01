import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

/** Reveals handwritten text left-to-right, as if it is being written. */
export default function HandWrite({
  children,
  className = '',
  delay = 0,
  duration = 0.9,
  onView = true,
}: {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  onView?: boolean
}) {
  const reduce = useReducedMotion()
  const shown = { clipPath: 'inset(-20% -5% -20% 0%)', opacity: 1 }
  const props = onView
    ? { whileInView: shown, viewport: { once: true, margin: '-30px' } }
    : { animate: shown }
  return (
    <motion.span
      className={`inline-block ${className}`}
      initial={reduce ? false : { clipPath: 'inset(-20% 100% -20% 0%)', opacity: 0.2 }}
      {...props}
      transition={{ duration, delay, ease: [0.45, 0, 0.25, 1] }}
    >
      {children}
    </motion.span>
  )
}
