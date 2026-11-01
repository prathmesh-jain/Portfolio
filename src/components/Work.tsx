import Link from './Link'
import ProjectCover from './ProjectCover'
import SectionHead from './SectionHead'
import { ArrowUpLeft } from './Doodles'
import Print from './fx/Print'
import HandWrite from './fx/HandWrite'
import Reveal from './fx/Reveal'
import { otherWork, profile, projects } from '../data/content'

const tilts = [-1.5, 1.2, -0.8, 1.6]
const cursorLabels = ['click, it’s worth it →', 'read the story →', 'go on, peek inside →', 'yes, it’s clickable →', 'one more? sure →']

export default function Work() {
  return (
    <section id='work' className='wrap scroll-mt-20 pb-24'>
      <SectionHead title='Things I’ve built' note='(shipped, not just another todo app)' />

      <div className='mt-16'>
        {projects.map((p, i) => {
          const flip = i % 2 === 1
          return (
            <article key={p.slug} className={`project ${flip ? 'flip' : ''}`} aria-labelledby={`project-${p.slug}`}>
              {/* title first, so on phones it sits above its own screenshot */}
              <Reveal className='project-head min-w-0'>
                <div className='hand text-[1.5rem] text-pencil'>
                  no. {i + 1}
                  {p.team && <span className='ml-3 text-sky'>· team project, {p.team.size} of us</span>}
                </div>
                <h3 id={`project-${p.slug}`} className='text-[2rem] font-semibold tracking-[-0.02em] sm:text-[2.4rem]'>
                  {p.title}
                </h3>
              </Reveal>

              <div className='project-media relative pb-14 md:pb-16'>
                <Print tilt={tilts[i % tilts.length]} cursorLabel={cursorLabels[i % cursorLabels.length]}>
                  <Link to={`/work/${p.slug}`} className='block' aria-label={`${p.title} case study`}>
                    <span className={`tape z-10 -top-3 ${flip ? 'right-8 rotate-6' : 'left-8 -rotate-6'}`} />
                    <ProjectCover project={p} />
                  </Link>
                </Print>
                {/* margin note under the print; the arrow points back up into the screenshot */}
                <div
                  className={`absolute bottom-0 flex max-w-[calc(100%-1rem)] items-start gap-1 text-pen ${
                    flip ? 'left-2 flex-row-reverse' : 'right-2'
                  }`}
                >
                  <ArrowUpLeft delay={0.5} className={`mt-[-14px] h-9 w-12 shrink-0 ${flip ? '-scale-x-100' : ''}`} />
                  <span className={`hand min-w-0 text-[1.45rem] leading-tight sm:text-[1.6rem] ${flip ? '-rotate-1' : 'rotate-[-2deg]'}`}>
                    <HandWrite delay={0.9}>{p.note}</HandWrite>
                  </span>
                </div>
              </div>

              <Reveal className='project-body relative min-w-0'>
                <p className='text-[1.15rem] leading-snug md:mt-2'>{p.tagline}</p>
                <p className='mt-4 leading-relaxed text-pencil'>{p.summary}</p>

                <p className='mt-5 text-[0.92rem] text-pencil'>{p.stack.slice(0, 5).join(' · ')}</p>

                <div className='mt-6 flex flex-wrap items-center gap-x-6 gap-y-3'>
                  <Link
                    to={`/work/${p.slug}`}
                    className='group/cta inline-flex items-center gap-1.5 font-semibold underline decoration-2 underline-offset-4 hover:text-pen'
                  >
                    {p.team ? 'how we built it' : 'how I built it'}
                    <span className='inline-block transition-transform duration-300 group-hover/cta:translate-x-1.5'>→</span>
                  </Link>
                  {p.links.live && (
                    <a href={p.links.live} target='_blank' rel='noreferrer' className='text-pencil hover:text-ink'>
                      {p.links.liveLabel?.toLowerCase() ?? 'try it'} ↗
                    </a>
                  )}
                </div>
              </Reveal>
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
