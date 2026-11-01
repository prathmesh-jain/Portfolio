import Marker from '../components/fx/Marker'
import Words from '../components/fx/Words'
import HandWrite from '../components/fx/HandWrite'
import Print from '../components/fx/Print'
import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import Link from '../components/Link'
import ProjectCover from '../components/ProjectCover'
import SectionHead from '../components/SectionHead'
import { ArrowUpLeft } from '../components/Doodles'
import type { Project } from '../data/content'

function Part({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <section>
      <SectionHead title={title} note={note} />
      <div className='mt-10'>{children}</div>
    </section>
  )
}

export default function CaseStudy({ project: p, next }: { project: Project; next: Project }) {
  return (
    <article className='wrap pb-24'>
      <Link to='/#work' className='hand mt-4 inline-block text-[1.5rem] text-pencil hover:text-ink'>
        ← back to all projects
      </Link>

      <header className='mt-8 grid grid-cols-1 items-center gap-12 md:grid-cols-[1fr_1fr]'>
        <div className='min-w-0'>
          <div className='hand text-[1.6rem] text-pen'>
            <HandWrite onView={false} duration={0.6}>project no. {Number(p.index)}</HandWrite>
          </div>
          <h1 className='break-words text-[2.5rem] font-semibold leading-none tracking-[-0.035em] sm:text-[4.4rem]'>
            <Words text={p.title} delay={0.2} stagger={0.1} />
          </h1>
          <p className='mt-5 text-[1.3rem] leading-snug sm:text-[1.5rem]'>{p.tagline}</p>
          <p className='mt-4 text-pencil'>{p.status}</p>
          {p.team && (
            <p className='hand mt-3 text-[1.45rem] text-sky'>a team project, built by {p.team.size} of us</p>
          )}
          <div className='mt-7 flex flex-wrap gap-x-6 gap-y-3'>
            {p.links.live && (
              <a
                href={p.links.live}
                target='_blank'
                rel='noreferrer'
                className='rounded-[255px_15px_225px_15px/15px_225px_15px_255px] border-2 border-ink px-5 py-2 font-semibold hover:bg-ink hover:text-paper'
              >
                {p.links.liveLabel?.toLowerCase() ?? 'try it live'} ↗
              </a>
            )}
            {p.links.github && (
              <a href={p.links.github} target='_blank' rel='noreferrer' className='ink-link self-center'>
                read the code
              </a>
            )}
          </div>
        </div>
        <div className='relative min-w-0'>
          <Print tilt={1.5} delay={0.3}>
            <span className='tape z-10 -top-3 left-10 -rotate-6' />
            <ProjectCover project={p} />
          </Print>
          <div className='absolute -bottom-12 right-2 flex items-start gap-1 text-pen'>
            <ArrowUpLeft delay={1} className='mt-[-14px] h-9 w-12 shrink-0' />
            <span className='hand -rotate-2 text-[1.5rem]'>
              <HandWrite delay={1.4}>{p.note}</HandWrite>
            </span>
          </div>
        </div>
      </header>

      <ul className='mt-24 flex flex-wrap gap-x-10 gap-y-6'>
        {p.stats.map((s, i) => (
          <li key={s.label} className='min-w-0'>
            <div className='text-[1.6rem] font-semibold tracking-tight sm:text-[2rem]'>
              <Marker delay={0.15 + i * 0.15}>{s.value}</Marker>
            </div>
            <div className='text-[0.92rem] text-pencil'>{s.label}</div>
          </li>
        ))}
      </ul>

      <div className='mt-24 space-y-24'>
        <Part title={p.team ? 'Why we built it' : 'Why I built it'}>
          <div className='max-w-2xl space-y-5 text-[1.15rem] leading-[1.7]'>
            {p.problem.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
        </Part>

        <Part title='How it works' note={p.flowTitle.toLowerCase()}>
          <ol className='flex flex-col items-stretch gap-3 lg:flex-row lg:items-start'>
            {p.flow.map((step, i) => (
              <li key={step.title} className='flex flex-col items-center gap-3 lg:flex-1 lg:flex-row lg:items-start'>
                <motion.div
                  className='w-full border-2 border-ink bg-paper p-4 hover:shadow-[4px_4px_0_0_var(--color-ink)]'
                  style={{ borderRadius: i % 2 ? '14px 6px 16px 5px' : '6px 15px 5px 14px' }}
                  initial={{ opacity: 0, y: 24, rotate: i % 2 ? 5 : -5 }}
                  whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 0.6 : -0.6 }}
                  whileHover={{ y: -4, rotate: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ type: 'spring', stiffness: 160, damping: 14, delay: i * 0.18 }}
                >
                  <div className='hand text-[1.4rem] leading-none text-pen'>{i + 1}.</div>
                  <div className='mt-1 font-semibold'>{step.title}</div>
                  <p className='mt-1 text-[0.92rem] leading-relaxed text-pencil'>{step.detail}</p>
                </motion.div>
                {i < p.flow.length - 1 && (
                  <motion.span
                    className='hand shrink-0 text-[1.8rem] leading-none text-pen lg:mt-10'
                    aria-hidden='true'
                    initial={{ opacity: 0, scale: 0.3 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 12, delay: i * 0.18 + 0.15 }}
                  >
                    <span className='lg:hidden'>↓</span>
                    <span className='hidden lg:inline'>→</span>
                  </motion.span>
                )}
              </li>
            ))}
          </ol>
          {p.flowNotes && (
            <ul className='mt-10 max-w-2xl space-y-2 text-[1.02rem] leading-relaxed'>
              {p.flowNotes.map((n) => (
                <li key={n} className='flex gap-3'>
                  <span className='hand text-[1.3rem] leading-none text-pen'>+</span>
                  {n}
                </li>
              ))}
            </ul>
          )}
          <p className='mt-8 text-[0.92rem] text-pencil'>Built with {p.stack.join(', ')}.</p>
        </Part>

        <Part title={p.team ? 'Decisions we made' : 'Decisions I made'} note='and why'>
          <ol className='grid grid-cols-1 gap-x-14 gap-y-10 md:grid-cols-2'>
            {p.decisions.map((d, i) => (
              <motion.li
                key={d.title}
                className='min-w-0'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ type: 'spring', stiffness: 140, damping: 20, delay: (i % 2) * 0.12 }}
              >
                <h3 className='text-[1.2rem] font-semibold'>
                  <span className='hand mr-2 text-[1.6rem] text-pen'>{i + 1}.</span>
                  {d.title}
                </h3>
                <p className='mt-2 leading-[1.7] text-pencil'>{d.body}</p>
              </motion.li>
            ))}
          </ol>
        </Part>

        {p.gallery.length > 0 && (
          <Part title='Screens'>
            <div className={`grid gap-8 ${p.galleryLayout === 'phone' ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2'}`}>
              {p.gallery.map((g, i) => (
                <Print key={g.src} tilt={i % 2 ? 1 : -1} delay={i * 0.08}>
                  <a href={g.src} target='_blank' rel='noreferrer' className='block'>
                    <img src={g.src} alt={g.alt} loading='lazy' decoding='async' className='w-full' />
                  </a>
                </Print>
              ))}
            </div>
          </Part>
        )}
      </div>

      <Link to={`/work/${next.slug}`} className='group mt-28 block border-t border-dashed border-faint pt-8'>
        <div className='hand text-[1.5rem] text-pencil'>next up</div>
        <div className='break-words text-[2.2rem] font-semibold tracking-[-0.02em] group-hover:text-pen sm:text-[3rem]'>
          {next.title} →
        </div>
        <div className='text-pencil'>{next.tagline}</div>
      </Link>
    </article>
  )
}
