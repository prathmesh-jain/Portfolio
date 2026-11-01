import { motion } from 'motion/react'

/** A strip of masking tape with words scrolling along it forever. */
export default function Ticker({ items, reverse = false, tilt = -1.5 }: { items: string[]; reverse?: boolean; tilt?: number }) {
  const row = [...items, ...items]
  return (
    <div className='relative -mx-4 overflow-hidden py-6' style={{ transform: `rotate(${tilt}deg)` }} aria-hidden='true'>
      <div className='border-y-2 border-dashed border-ink/15 bg-strip py-3'>
        <motion.div
          className='flex w-max gap-8 whitespace-nowrap'
          animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
          transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
        >
          {row.map((item, i) => (
            <span key={i} className='hand flex items-center gap-8 text-[1.7rem] leading-none text-ink'>
              {item}
              <span className='h-1.5 w-1.5 rounded-full bg-pen' />
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
