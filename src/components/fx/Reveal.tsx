import type { ReactNode } from 'react'
import { motion, type Variants } from 'motion/react'

const parent: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  shown: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 140, damping: 20 } },
}

/**
 * Staggers its direct children in when scrolled into view.
 * Children are wrapped automatically, so plain elements work.
 */
export default function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const kids = Array.isArray(children) ? children : [children]
  return (
    <motion.div className={className} variants={parent} initial='hidden' whileInView='shown' viewport={{ once: true, margin: '-60px' }}>
      {kids.map((child, i) =>
        child ? (
          <motion.div key={i} variants={item}>
            {child}
          </motion.div>
        ) : null,
      )}
    </motion.div>
  )
}
