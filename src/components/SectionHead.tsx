import { motion } from 'motion/react'
import { Squiggle } from './Doodles'
import HandWrite from './fx/HandWrite'

export default function SectionHead({ title, note }: { title: string; note?: string }) {
  return (
    <div className='flex flex-wrap items-end gap-x-5 gap-y-1'>
      <motion.h2
        className='relative text-[2.2rem] font-semibold tracking-[-0.02em] sm:text-[2.8rem]'
        initial={{ opacity: 0, y: 20, rotate: -1.5 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ type: 'spring', stiffness: 140, damping: 16 }}
      >
        {title}
        <Squiggle className='absolute -bottom-2 left-0 h-3 w-full text-pen' />
      </motion.h2>
      {note && (
        <span className='hand pb-1 text-[1.45rem] text-pencil'>
          <HandWrite delay={0.7}>{note}</HandWrite>
        </span>
      )}
    </div>
  )
}
