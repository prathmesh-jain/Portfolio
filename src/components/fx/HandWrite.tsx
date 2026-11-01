import type { ReactNode } from 'react'
import { motion, useReducedMotion, type Variants } from 'motion/react'

const ink: Variants = {
  hidden: { clipPath: 'inset(-20% 100% -20% 0%)', opacity: 0.2 },
  shown: { clipPath: 'inset(-20% -5% -20% 0%)', opacity: 1 },
}

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
  // The visibility trigger sits on an unclipped wrapper. Watching the clipped text itself
  // fails on phones: while hidden it is a zero-width sliver that can sit outside the viewport margin.
  const trigger = onView
    ? { whileInView: 'shown', viewport: { once: true, amount: 0.3 } }
    : { animate: 'shown' }
  return (
    <motion.span className={`inline-block ${className}`} initial={reduce ? false : 'hidden'} {...trigger}>
      <motion.span className='inline-block' variants={ink} transition={{ duration, delay, ease: [0.45, 0, 0.25, 1] }}>
        {children}
      </motion.span>
    </motion.span>
  )
}
