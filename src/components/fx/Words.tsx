import { motion, useReducedMotion } from 'motion/react'

/** Splits a line into words that rise and settle one after another. */
export default function Words({ text, className = '', delay = 0, stagger = 0.06 }: { text: string; className?: string; delay?: number; stagger?: number }) {
  const reduce = useReducedMotion()
  const words = text.split(' ')
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className='inline-block overflow-hidden pb-[0.08em] align-bottom' aria-hidden='true'>
          <motion.span
            className='inline-block'
            initial={reduce ? false : { y: '105%', rotate: i % 2 ? 4 : -4 }}
            animate={{ y: '0%', rotate: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 18, delay: delay + i * stagger }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </span>
  )
}
