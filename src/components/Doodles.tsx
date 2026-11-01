import { motion, useReducedMotion, type TargetAndTransition, type Transition } from 'motion/react'

// Hand-drawn SVG bits. Each one draws itself (stroke by stroke) when it scrolls into view.

interface DoodleProps {
  className?: string
  style?: React.CSSProperties
  /** seconds to wait before drawing */
  delay?: number
}

const draw = (
  delay = 0,
  duration = 0.7,
  reduce: boolean | null = false,
): { initial: TargetAndTransition | false; whileInView: TargetAndTransition; viewport: { once: boolean; margin: string }; transition: Transition } => ({
  initial: reduce ? false : { pathLength: 0, opacity: 0 },
  whileInView: { pathLength: 1, opacity: 1 },
  viewport: { once: true, margin: '-40px' },
  transition: {
    pathLength: { duration, delay, ease: [0.65, 0, 0.35, 1] },
    opacity: { duration: 0.01, delay },
  },
})

const stroke = { stroke: 'currentColor', strokeWidth: 2.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

/** Curved arrow whose head points up and to the left. Mirror with -scale-x-100 for up-right. */
export function ArrowUpLeft({ className, style, delay = 0 }: DoodleProps) {
  const r = useReducedMotion()
  return (
    <svg viewBox='0 0 80 60' fill='none' className={className} style={style} aria-hidden='true'>
      <motion.path d='M76 54C56 50 26 40 12 10' {...stroke} {...draw(delay, 0.55, r)} />
      <motion.path d='M11 22L12 10L22 17' {...stroke} {...draw(delay + 0.5, 0.2, r)} />
    </svg>
  )
}

/** Wavy arrow whose head points left. */
export function ArrowLeft({ className, style, delay = 0 }: DoodleProps) {
  const r = useReducedMotion()
  return (
    <svg viewBox='0 0 76 30' fill='none' className={className} style={style} aria-hidden='true'>
      <motion.path d='M72 20C50 30 32 6 8 18' {...stroke} {...draw(delay, 0.5, r)} />
      <motion.path d='M19 19L8 18L14 9' {...stroke} {...draw(delay + 0.45, 0.2, r)} />
    </svg>
  )
}

export function Squiggle({ className, style, delay = 0.15 }: DoodleProps) {
  const r = useReducedMotion()
  return (
    <svg viewBox='0 0 300 14' preserveAspectRatio='none' fill='none' className={className} style={style} aria-hidden='true'>
      <motion.path
        d='M2 9c20 -8 34 6 54 -1s34 -7 54 0s36 6 56 -1s36 -6 56 0s30 4 76 -2'
        {...stroke}
        strokeWidth={2.6}
        {...draw(delay, 0.9, r)}
      />
    </svg>
  )
}

/** small hand-drawn ring used as a timeline marker */
export function Ring({ className, style, delay = 0 }: DoodleProps) {
  const r = useReducedMotion()
  return (
    <svg viewBox='0 0 24 24' fill='none' className={className} style={style} aria-hidden='true'>
      <motion.path
        d='M12 3c5 0 9 3.5 8.6 8.7C20.2 17 16 21 11.5 20.6C6.4 20.2 3 16.5 3.4 11.6C3.8 6.7 7.5 3.4 13 3.6'
        {...stroke}
        strokeWidth={2.2}
        {...draw(delay, 0.5, r)}
      />
    </svg>
  )
}

export function Star({ className, style, delay = 0 }: DoodleProps) {
  const r = useReducedMotion()
  return (
    <svg viewBox='0 0 40 40' fill='none' className={className} style={style} aria-hidden='true'>
      <motion.path
        d='M20 4l4 11l12 1l-9 7l3 12l-10 -7l-10 7l3 -12l-9 -7l12 -1z'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinejoin='round'
        {...draw(delay, 0.8, r)}
      />
    </svg>
  )
}
