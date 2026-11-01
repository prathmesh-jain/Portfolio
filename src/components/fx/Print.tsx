import { type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'

interface PrintProps {
  children: ReactNode
  /** resting tilt in degrees */
  tilt: number
  className?: string
  /** drop-in delay */
  delay?: number
}

/**
 * A photo print that drops onto the page and settles at its tilt,
 * then leans in 3D towards the cursor while hovered.
 */
export default function Print({ children, tilt, className = '', delay = 0 }: PrintProps) {
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const sx = useSpring(mx, { stiffness: 160, damping: 18 })
  const sy = useSpring(my, { stiffness: 160, damping: 18 })
  const rotateY = useTransform(sx, [0, 1], [-7, 7])
  const rotateX = useTransform(sy, [0, 1], [6, -6])
  const glareX = useTransform(sx, [0, 1], ['0%', '100%'])
  const glareY = useTransform(sy, [0, 1], ['0%', '100%'])
  const glare = useTransform([glareX, glareY], ([gx, gy]) => `radial-gradient(420px circle at ${gx} ${gy}, rgba(255,255,255,0.35), transparent 45%)`)

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const reset = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <div style={{ perspective: 1100 }} onPointerMove={onMove} onPointerLeave={reset}>
      <motion.div
        className={`print group relative ${className}`}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        initial={{ opacity: 0, y: -50, rotate: tilt * 5, scale: 1.04 }}
        whileInView={{ opacity: 1, y: 0, rotate: tilt, scale: 1 }}
        whileHover={{ rotate: 0, scale: 1.015, y: -4 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ type: 'spring', stiffness: 120, damping: 14, delay }}
      >
        {children}
        <motion.div
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100'
          style={{ background: glare, mixBlendMode: 'soft-light' }}
        />
      </motion.div>
    </div>
  )
}
