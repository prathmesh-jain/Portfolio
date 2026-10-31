import Link from './Link'
import ProjectCover from './ProjectCover'
import SectionHead from './SectionHead'
import { otherWork, profile, projects } from '../data/content'

export default function Work() {
  return (
    <section id='work' className='wrap scroll-mt-12 pb-24'>
      <SectionHead title='Selected work' aside={`${projects.length} projects`} />

      <ol>
        {projects.map((p) => (
          <li key={p.slug} className='border-b border-rule'>
            <Link to={`/work/${p.slug}`} className='group grid grid-cols-1 gap-x-6 gap-y-6 py-8 md:grid-cols-12 md:py-10'>
              <div className='flex min-w-0 flex-col md:col-span-5'>
                <div className='flex items-baseline gap-4'>
                  <span className='text-[0.95rem] text-grey'>{p.index}</span>
                  <h3 className='display min-w-0 break-words text-[2.3rem] transition-colors group-hover:text-blue sm:text-[3.6rem]'>
                    {p.title}
                  </h3>
                </div>
                <p className='mt-4 max-w-md text-[1.15rem] leading-snug'>{p.tagline}</p>

                <dl className='mt-6 grid max-w-md grid-cols-2 gap-x-6 gap-y-4 border-t border-hair pt-4 text-[0.9rem]'>
                  {p.stats.slice(0, 2).map((s) => (
                    <div key={s.label}>
                      <dd className='text-[1.4rem] font-semibold tracking-tight'>{s.value}</dd>
                      <dt className='text-grey'>{s.label}</dt>
                    </div>
                  ))}
                </dl>

                <div className='mt-auto flex items-center justify-between pt-8 text-[0.9rem]'>
                  <span className='text-grey'>{p.status}</span>
                  <span className='text-blue'>Case study →</span>
                </div>
              </div>

              <ProjectCover
                project={p}
                className='aspect-[16/10] border border-hair md:col-span-7'
              />
            </Link>
          </li>
        ))}
      </ol>

      <div className='mt-6 flex flex-col justify-between gap-2 text-[0.95rem] sm:flex-row'>
        <p>
          <span className='text-grey'>Also: </span>
          {otherWork.map((o) => (
            <a key={o.title} href={o.href} target='_blank' rel='noreferrer' className='u-link'>
              {o.title}
            </a>
          ))}
          <span className='text-grey'>, a small React stepper component on npm.</span>
        </p>
        <a href={`${profile.links.github}?tab=repositories`} target='_blank' rel='noreferrer' className='u-link'>
          Everything else on GitHub ↗
        </a>
      </div>
    </section>
  )
}
