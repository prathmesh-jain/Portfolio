import Link from './Link'
import { Star } from './Doodles'
import { profile } from '../data/content'

export default function Hero() {
  return (
    <section className='wrap grid grid-cols-1 items-center gap-14 pb-24 pt-10 md:grid-cols-[1.25fr_0.75fr] md:pt-16'>
      <div className='min-w-0'>
        <p className='hand text-[1.9rem] text-pen'>hey there, I’m</p>
        <h1 className='mt-1 text-[3.1rem] font-semibold leading-[0.98] tracking-[-0.035em] sm:text-[4.6rem]'>
          Prathmesh Jain.
        </h1>
        <p className='mt-7 max-w-xl text-[1.25rem] leading-[1.55] sm:text-[1.4rem]'>
          I build AI agents for banks at TCS, and outside work I keep shipping side projects that people{' '}
          <span className='marker'>actually use</span>.
        </p>
        <p className='mt-5 max-w-xl text-[1.05rem] leading-relaxed text-pencil'>
          {profile.role} in {profile.location}. Mostly Python, TypeScript, LangGraph and React.
        </p>

        <div className='mt-9 flex flex-wrap items-center gap-x-6 gap-y-4'>
          <Link
            to='/#work'
            className='rounded-[255px_15px_225px_15px/15px_225px_15px_255px] border-2 border-ink px-5 py-2.5 font-semibold transition-transform hover:-rotate-1 hover:bg-ink hover:text-paper'
          >
            see what I’ve built
          </Link>
          <a href={`mailto:${profile.email}`} className='ink-link'>
            {profile.email}
          </a>
        </div>
      </div>

      <div className='relative mx-auto w-[78%] max-w-[330px] md:w-full'>
        <figure className='print relative rotate-[2.5deg]'>
          <span className='tape -top-3 left-1/2 -translate-x-1/2 -rotate-3' />
          <img
            src='/profile.webp'
            alt='Prathmesh in the mountains'
            className='aspect-[4/5] w-full object-cover object-top'
            fetchPriority='high'
          />
          <figcaption className='hand pt-2 text-center text-[1.45rem]'>me, up in the hills</figcaption>
        </figure>
        <Star className='absolute -right-5 -top-6 h-9 w-9 rotate-12 text-sky' />
      </div>
    </section>
  )
}
