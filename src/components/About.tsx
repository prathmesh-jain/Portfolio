import SectionHead from './SectionHead'
import { education, profile, tcs, toolbox } from '../data/content'

export default function About() {
  return (
    <section id='about' className='wrap scroll-mt-12 pb-24'>
      <SectionHead title='About' />

      <div className='grid grid-cols-1 gap-x-6 gap-y-10 pt-8 md:grid-cols-12'>
        <figure className='md:col-span-4'>
          <img
            src='/profile.webp'
            alt='Prathmesh Jain in the mountains'
            loading='lazy'
            className='aspect-[4/5] w-full object-cover object-top grayscale'
          />
          <figcaption className='mt-2 text-[0.85rem] text-grey'>Somewhere in the hills, away from a keyboard.</figcaption>
        </figure>

        <div className='md:col-span-7 md:col-start-6'>
          <p className='text-[1.35rem] leading-[1.35] tracking-[-0.005em] sm:text-[1.6rem]'>
            I’m a full stack engineer who ended up in AI. Most of what I build is agents that need to be right, not just
            impressive, wrapped in apps that real people can use without a manual.
          </p>

          <div className='mt-12'>
            <h3 className='border-b border-rule pb-2 text-[0.9rem] text-grey'>Experience</h3>
            <div className='grid grid-cols-1 gap-x-6 gap-y-3 border-b border-hair py-5 sm:grid-cols-[150px_1fr]'>
              <div className='text-[0.95rem] text-grey'>{tcs.period}</div>
              <div>
                <div className='text-[1.15rem] font-semibold'>
                  {tcs.role}, {tcs.company}
                </div>
                <div className='text-[0.9rem] text-grey'>{tcs.team}</div>
                <p className='mt-3 text-[1rem] leading-relaxed'>{tcs.summary}</p>
                <ul className='mt-4 text-[0.95rem]'>
                  {tcs.highlights.map((h) => (
                    <li key={h.what} className='flex justify-between gap-4 border-t border-hair py-2'>
                      <span>{h.what}</span>
                      <span className='text-right font-semibold'>{h.result}</span>
                    </li>
                  ))}
                </ul>
                <a href={profile.resume} target='_blank' rel='noreferrer' className='u-link mt-4 inline-block text-[0.95rem] text-blue'>
                  Full details in my resume (PDF) ↓
                </a>
              </div>
            </div>
            <div className='grid grid-cols-1 gap-x-6 gap-y-1 py-5 sm:grid-cols-[150px_1fr]'>
              <div className='text-[0.95rem] text-grey'>{education.year}</div>
              <div>
                <div className='text-[1.15rem] font-semibold'>{education.degree}</div>
                <div className='text-[0.9rem] text-grey'>
                  {education.school} · {education.note}
                </div>
              </div>
            </div>
          </div>

          <div className='mt-10'>
            <h3 className='border-b border-rule pb-2 text-[0.9rem] text-grey'>Tools</h3>
            <dl className='grid grid-cols-2 gap-x-6 gap-y-6 pt-5 text-[0.95rem] sm:grid-cols-3'>
              {toolbox.map((row) => (
                <div key={row.group}>
                  <dt className='font-semibold'>{row.group}</dt>
                  <dd className='mt-1 leading-relaxed text-grey'>{row.items.join(', ')}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
