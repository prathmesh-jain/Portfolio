import { Fragment } from 'react'
import { motion } from 'motion/react'
import type { FlowStep } from '../data/content'

export default function FlowDiagram({ steps }: { steps: FlowStep[] }) {
  return (
    <ol
      className='flex flex-col items-stretch lg:flex-row'
      aria-label='System flow, in order'
    >
      {steps.map((step, i) => (
        <Fragment key={step.title}>
          <motion.li
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className='relative flex-1 rounded-lg border border-line bg-surface p-4'
          >
            <div className='flex items-center justify-between gap-2'>
              <span className='font-mono text-[0.68rem] text-accent'>{String(i + 1).padStart(2, '0')}</span>
              {step.tag && (
                <span className='rounded border border-line px-1.5 py-0.5 font-mono text-[0.62rem] text-soft'>{step.tag}</span>
              )}
            </div>
            <div className='mt-3 font-display text-[1.02rem] font-semibold'>{step.title}</div>
            <p className='mt-1.5 text-[0.84rem] leading-6 text-muted'>{step.detail}</p>
          </motion.li>
          {i < steps.length - 1 && (
            <li aria-hidden='true' className='flex items-center justify-center py-1.5 text-soft lg:px-1.5 lg:py-0'>
              <span className='font-mono text-sm lg:hidden'>↓</span>
              <span className='hidden font-mono text-sm lg:inline'>→</span>
            </li>
          )}
        </Fragment>
      ))}
    </ol>
  )
}
