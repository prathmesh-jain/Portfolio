import { Fragment } from 'react'
import { motion } from 'motion/react'
import { ArrowDownCurvy, ArrowRightCurvy } from './Doodles'
import type { FlowStep } from '../data/content'

const tilts = [-1.4, 1.1, -0.7, 1.5, -1.1]

/**
 * "How it works" as ruled index cards taped down in order,
 * joined by hand-drawn arrows. Staggered up/down on wide screens so it reads like a desk, not a grid.
 */
export default function FlowCards({ steps }: { steps: FlowStep[] }) {
  return (
    <ol className='flex flex-col items-stretch lg:flex-row lg:items-start' aria-label='How it works, step by step'>
      {steps.map((step, i) => (
        <Fragment key={step.title}>
          <motion.li
            className={`on-light index-card min-w-0 lg:flex-1 ${i % 2 ? 'lg:mt-10' : ''}`}
            initial={{ opacity: 0, y: 30, rotate: tilts[i % tilts.length] * 4 }}
            whileInView={{ opacity: 1, y: 0, rotate: tilts[i % tilts.length] }}
            whileHover={{ y: -6, rotate: 0, transition: { type: 'spring', stiffness: 300, damping: 18 } }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ type: 'spring', stiffness: 150, damping: 15, delay: i * 0.16 }}
          >
            <span className={`tape -top-3 ${i % 2 ? 'right-4 rotate-6' : 'left-4 -rotate-6'} !h-[22px] !w-[64px]`} />
            <div className='index-card-head flex items-baseline justify-between gap-2'>
              <span className='font-semibold leading-tight text-ink'>{step.title}</span>
              <span className='hand shrink-0 text-[1.6rem] leading-none text-[#d63b2a]'>{i + 1}</span>
            </div>
            <div className='index-card-body'>
              <p className='pt-[0.35rem] text-[0.92rem] text-pencil'>{step.detail}</p>
              {step.tag && <p className='hand text-[1.15rem] text-[#2f55d4]'>#{step.tag}</p>}
            </div>
          </motion.li>
          {i < steps.length - 1 && (
            <li aria-hidden='true' className='flex shrink-0 justify-center py-2 text-pen lg:w-11 lg:self-center lg:px-1 lg:py-0'>
              <ArrowDownCurvy delay={i * 0.16 + 0.3} className='h-10 w-7 lg:hidden' />
              <ArrowRightCurvy delay={i * 0.16 + 0.3} className='hidden h-7 w-10 lg:block' />
            </li>
          )}
        </Fragment>
      ))}
    </ol>
  )
}
