import { FaChevronDown } from 'react-icons/fa'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'
import { tcs } from '../data/content'

export default function Experience() {
  return (
    <section id='experience' className='mx-auto max-w-6xl scroll-mt-20 px-5 py-24 md:px-8'>
      <SectionHeader
        index='02'
        label='Experience'
        title='Agents for banks, built to survive an audit.'
        intro={tcs.intro}
      />

      <div className='mt-12 md:ml-[212px]'>
        <Reveal className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex items-center gap-4'>
            <img src='/images/tcs.webp' alt='' className='h-11 w-11 rounded-lg border border-line object-cover' />
            <div>
              <div className='font-display text-xl font-semibold'>{tcs.role}</div>
              <div className='text-sm text-muted'>
                {tcs.company} · <span className='text-soft'>{tcs.team}</span>
              </div>
            </div>
          </div>
          <div className='font-mono text-xs text-soft'>{tcs.period}</div>
        </Reveal>

        <div className='mt-8 divide-y divide-line border-y border-line'>
          {tcs.streams.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.05}>
              <details className='group py-6' open={i === 0}>
                <summary className='flex cursor-pointer list-none items-start justify-between gap-6 [&::-webkit-details-marker]:hidden'>
                  <div>
                    <h3 className='font-display text-lg font-semibold sm:text-xl'>{s.name}</h3>
                    <p className='mt-2 max-w-2xl text-[0.95rem] leading-7 text-muted'>{s.problem}</p>
                    <p className='mt-3 flex gap-2 text-[0.95rem] font-medium leading-7 text-ink'>
                      <span className='text-accent' aria-hidden='true'>→</span>
                      {s.result}
                    </p>
                  </div>
                  <span className='mt-1.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-soft transition-transform group-open:rotate-180'>
                    <FaChevronDown size={10} />
                    <span className='sr-only'>Toggle details</span>
                  </span>
                </summary>
                <div className='mt-5 rounded-lg border border-line bg-surface p-5'>
                  <div className='label'>How it works</div>
                  <ul className='mt-3 space-y-2.5'>
                    {s.built.map((b) => (
                      <li key={b} className='flex gap-3 text-[0.92rem] leading-7 text-muted'>
                        <span className='mt-[0.7rem] h-1 w-1 shrink-0 rounded-full bg-soft' aria-hidden='true' />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className='mt-4 font-mono text-[0.72rem] text-soft'>{s.stack.join(' · ')}</div>
                </div>
              </details>
            </Reveal>
          ))}
        </div>

        <Reveal className='mt-10 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between'>
          <div>
            <div className='label'>Education</div>
            <div className='mt-2 text-[0.95rem]'>
              B.E. Computer Engineering · Vidyalankar Institute of Technology, Mumbai
            </div>
          </div>
          <div className='font-mono text-xs text-soft'>2024 · GPA 9.2 / 10</div>
        </Reveal>
      </div>
    </section>
  )
}
