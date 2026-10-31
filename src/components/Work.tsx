import Link from './Link'
import ProjectCover from './ProjectCover'
import SectionHead from './SectionHead'
import { SwoopArrow } from './Doodles'
import { otherWork, profile, projects } from '../data/content'

const tilts = ['-rotate-[1.5deg]', 'rotate-[1.2deg]', '-rotate-[0.8deg]', 'rotate-[1.6deg]']

export default function Work() {
  return (
    <section id='work' className='wrap scroll-mt-6 pb-24'>
      <SectionHead title='Things I’ve built' note='(and actually shipped)' />

      <div className='mt-16 space-y-24 md:space-y-28'>
        {projects.map((p, i) => {
          const flip = i % 2 === 1
          return (
            <article key={p.slug} className='grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14'>
              <Link
                to={`/work/${p.slug}`}
                className={`print group relative block transition-transform duration-300 hover:rotate-0 ${tilts[i % tilts.length]} ${flip ? 'md:order-2' : ''}`}
                aria-label={`${p.title} case study`}
              >
                <span className={`tape -top-3 ${flip ? 'right-8 rotate-6' : 'left-8 -rotate-6'}`} />
                <ProjectCover project={p} />
              </Link>

              <div className={`relative min-w-0 ${flip ? 'md:order-1' : ''}`}>
                <div className='hand text-[1.5rem] text-pencil'>no. {i + 1}</div>
                <h3 className='text-[2rem] font-semibold tracking-[-0.02em] sm:text-[2.4rem]'>{p.title}</h3>
                <p className='mt-2 text-[1.15rem] leading-snug'>{p.tagline}</p>
                <p className='mt-4 leading-relaxed text-pencil'>{p.summary}</p>

                <p className='mt-5 text-[0.92rem] text-pencil'>{p.stack.slice(0, 5).join(' · ')}</p>

                <div className='mt-6 flex flex-wrap items-center gap-x-6 gap-y-3'>
                  <Link to={`/work/${p.slug}`} className='font-semibold underline decoration-2 underline-offset-4 hover:text-pen'>
                    how I built it →
                  </Link>
                  {p.links.live && (
                    <a href={p.links.live} target='_blank' rel='noreferrer' className='text-pencil hover:text-ink'>
                      {p.links.liveLabel?.toLowerCase() ?? 'try it'} ↗
                    </a>
                  )}
                </div>

                <div className={`mt-8 flex items-start gap-2 text-pen ${flip ? 'md:justify-end' : ''}`}>
                  {!flip && <SwoopArrow className='hidden h-10 w-14 shrink-0 md:block' />}
                  <span className='hand max-w-[16rem] -rotate-2 text-[1.6rem]'>{p.note}</span>
                  {flip && <SwoopArrow className='hidden h-10 w-14 shrink-0 -scale-x-100 md:block' />}
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <p className='mt-24 text-[1.05rem] leading-relaxed text-pencil'>
        Smaller things: I also published{' '}
        {otherWork.map((o) => (
          <a key={o.title} href={o.href} target='_blank' rel='noreferrer' className='ink-link text-ink'>
            {o.title}
          </a>
        ))}{' '}
        on npm, and the rest lives on{' '}
        <a href={`${profile.links.github}?tab=repositories`} target='_blank' rel='noreferrer' className='ink-link text-ink'>
          my GitHub
        </a>
        .
      </p>
    </section>
  )
}
