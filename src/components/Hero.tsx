import Link from './Link'
import { profile } from '../data/content'

export default function Hero() {
  return (
    <section className='wrap pb-16 pt-10 md:pb-24 md:pt-14'>
      <h1 className='display text-[19vw] md:text-[13.2vw] xl:text-[11.5rem]'>
        Prathmesh
        <br />
        Jain<span className='text-blue'>.</span>
      </h1>

      <div className='mt-10 grid grid-cols-1 gap-y-10 border-t border-rule pt-6 md:mt-14 md:grid-cols-12'>
        <p className='text-[1.55rem] leading-[1.2] tracking-[-0.01em] sm:text-[2.1rem] md:col-span-7'>
          I build AI agents for banks at TCS, and software that people{' '}
          <span className='text-blue'>actually use</span>, like{' '}
          <Link to='/work/transcribe' className='u-link'>
            Transcribe
          </Link>
          , which turns two-hour lectures into readable transcripts.
        </p>

        <dl className='grid grid-cols-2 content-start gap-x-6 gap-y-5 text-[0.95rem] md:col-span-4 md:col-start-9'>
          <div>
            <dt className='text-grey'>Now</dt>
            <dd>{profile.role}, TCS</dd>
          </div>
          <div>
            <dt className='text-grey'>Based in</dt>
            <dd>{profile.location}</dd>
          </div>
          <div>
            <dt className='text-grey'>Works with</dt>
            <dd>Python, TypeScript, LangGraph, React</dd>
          </div>
          <div className='col-span-2'>
            <dt className='text-grey'>Write to</dt>
            <dd>
              <a href={`mailto:${profile.email}`} className='u-link'>
                {profile.email}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
