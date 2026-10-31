import Reveal from './Reveal'
import SectionHeader from './SectionHeader'
import { toolbox } from '../data/content'

export default function Toolbox() {
  return (
    <section id='toolbox' className='mx-auto max-w-6xl scroll-mt-20 px-5 pb-24 md:px-8'>
      <SectionHeader index='03' label='Toolbox' title='What I reach for.' />
      <dl className='mt-10 divide-y divide-line border-y border-line md:ml-[212px]'>
        {toolbox.map((row, i) => (
          <Reveal key={row.group} delay={i * 0.04} className='grid grid-cols-1 gap-2 py-4 sm:grid-cols-[140px_1fr] sm:gap-6'>
            <dt className='label pt-0.5'>{row.group}</dt>
            <dd className='min-w-0 text-[0.95rem] leading-7 text-ink'>
              {row.items.map((item, j) => (
                <span key={item}>
                  {item}
                  {j < row.items.length - 1 && <span className='mx-1.5 text-soft'> / </span>}
                </span>
              ))}
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  )
}
