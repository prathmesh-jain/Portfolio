import SectionHead from './SectionHead'
import { CurlyArrow } from './Doodles'
import { education, profile, tcs, toolbox } from '../data/content'

export default function About() {
  return (
    <section id='about' className='wrap scroll-mt-6 pb-24'>
      <SectionHead title='About me' />

      <div className='mt-12 grid grid-cols-1 gap-14 md:grid-cols-[1.2fr_0.8fr]'>
        <div className='min-w-0 max-w-2xl space-y-5 text-[1.15rem] leading-[1.7]'>
          <p>
            I started as a full stack developer and slowly fell into AI. These days I spend most of my time building
            agents that have to be <span className='marker'>right, not just impressive</span>, and the apps around them
            that real people can use without a manual.
          </p>
          <p>
            At <strong className='font-semibold'>{tcs.company}</strong> I’m a {tcs.role} in the {tcs.team} team, since{' '}
            {tcs.period.replace(' – now', '')}. {tcs.summary}
          </p>

          <ul className='space-y-2 border-l-2 border-dashed border-faint pl-5 text-[1.05rem]'>
            {tcs.highlights.map((h) => (
              <li key={h.what}>
                {h.what}: <span className='marker font-semibold'>{h.result}</span>
              </li>
            ))}
          </ul>

          <div className='relative flex items-center gap-3 pt-2'>
            <a href={profile.resume} target='_blank' rel='noreferrer' className='ink-link font-semibold'>
              the full story is in my resume (PDF)
            </a>
            <CurlyArrow className='hidden h-8 w-14 rotate-[200deg] text-pen sm:block' />
          </div>

          <p className='text-[1rem] text-pencil'>
            Before that: {education.degree} at {education.school}, {education.year} ({education.note}).
          </p>
        </div>

        <aside className='relative h-fit min-w-0 rotate-[0.8deg] bg-[#fff9c9] p-6 shadow-[0_10px_24px_-14px_rgba(28,34,48,0.35)]'>
          <span className='tape -top-3 left-1/2 -translate-x-1/2 rotate-2' />
          <h3 className='hand text-[1.9rem] leading-none'>stuff I use a lot</h3>
          <dl className='mt-4 space-y-3 text-[0.95rem] leading-relaxed'>
            {toolbox.map((row) => (
              <div key={row.group}>
                <dt className='font-semibold'>{row.group}</dt>
                <dd className='text-pencil'>{row.items.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  )
}
