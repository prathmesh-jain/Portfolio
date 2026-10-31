import { FaArrowRight, FaGithub } from 'react-icons/fa'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'
import ProjectCover from './ProjectCover'
import Link from './Link'
import { otherWork, profile, projects } from '../data/content'

export default function Work() {
  return (
    <section id='work' className='mx-auto max-w-6xl scroll-mt-20 px-5 pt-24 md:px-8'>
      <SectionHeader
        index='01'
        label='Selected work'
        title='Things I built that people use.'
        intro='Side projects I designed, built and deployed myself. Each has a write-up covering the problem, the architecture and the decisions behind it.'
      />

      <div className='mt-12 space-y-5'>
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={0.04 * i}>
            <Link
              to={`/work/${p.slug}`}
              className='group grid overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-line-strong md:grid-cols-[1fr_1.05fr]'
            >
              <div className='flex flex-col p-6 sm:p-8'>
                <div className='flex items-center justify-between gap-4'>
                  <span className='font-mono text-xs text-accent'>{p.index}</span>
                  <span className='font-mono text-[0.7rem] text-soft'>{p.status}</span>
                </div>
                <h3 className='mt-5 font-display text-2xl font-semibold tracking-tight sm:text-[1.7rem]'>{p.title}</h3>
                <p className='mt-2 text-[1.02rem] leading-7 text-ink'>{p.tagline}</p>
                <p className='mt-3 text-[0.93rem] leading-7 text-muted'>{p.summary}</p>

                <div className='mt-6 flex flex-wrap gap-x-6 gap-y-3'>
                  {p.stats.slice(0, 2).map((s) => (
                    <div key={s.label}>
                      <div className='font-display text-lg font-semibold'>{s.value}</div>
                      <div className='text-xs text-soft'>{s.label}</div>
                    </div>
                  ))}
                </div>

                <div className='mt-auto pt-7'>
                  <div className='font-mono text-[0.7rem] text-soft'>{p.stack.slice(0, 5).join(' · ')}</div>
                  <div className='mt-4 inline-flex items-center gap-2 text-sm font-medium text-ink'>
                    Read the case study
                    <FaArrowRight size={11} className='text-accent transition-transform group-hover:translate-x-1' />
                  </div>
                </div>
              </div>
              <ProjectCover
                project={p}
                framed
                className='order-first border-b border-line md:order-none md:border-b-0 md:border-l'
              />
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal className='mt-8 flex flex-col gap-3 border-t border-line pt-6 text-sm sm:flex-row sm:items-center sm:justify-between'>
        <div className='text-muted'>
          Also:{' '}
          {otherWork.map((o) => (
            <a key={o.title} href={o.href} target='_blank' rel='noreferrer' className='link-underline font-mono text-ink'>
              {o.title}
            </a>
          ))}
          <span className='text-soft'>, {otherWork[0].detail.charAt(0).toLowerCase() + otherWork[0].detail.slice(1)}</span>
        </div>
        <a
          href={`${profile.links.github}?tab=repositories`}
          target='_blank'
          rel='noreferrer'
          className='inline-flex items-center gap-2 text-muted hover:text-ink'
        >
          <FaGithub size={14} /> All repositories
        </a>
      </Reveal>
    </section>
  )
}
