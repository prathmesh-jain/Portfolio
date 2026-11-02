import Marker from '../components/fx/Marker'
import Words from '../components/fx/Words'
import HandWrite from '../components/fx/HandWrite'
import Print from '../components/fx/Print'
import FlowCards from '../components/FlowCards'
import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import Link from '../components/Link'
import ProjectCover from '../components/ProjectCover'
import SectionHead from '../components/SectionHead'
import { ArrowUpLeft } from '../components/Doodles'
import type { Project } from '../data/content'

function Part({ id, title, note, children }: { id: string; title: string; note?: string; children: ReactNode }) {
  return (
    <section id={id} className='scroll-mt-24'>
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

      {/* for skimmers: the whole page in three lines, plus shortcuts */}
      <motion.aside
        className='on-light sticky-note relative mt-20 max-w-2xl p-6 pt-8 sm:p-8 sm:pt-9'
        initial={{ opacity: 0, y: -24, rotate: 4 }}
        whileInView={{ opacity: 1, y: 0, rotate: -0.8 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ type: 'spring', stiffness: 140, damping: 18 }}
      >
        <span className='tape -top-3 left-1/2 -translate-x-1/2 rotate-2' />
        <div className='hand mb-3 text-[1.7rem] leading-none text-[#d63b2a]'>
          tl;dr <span className='text-pencil'>(for the 6-second skim)</span>
        </div>
        <ul className='space-y-2 text-[1.02rem] leading-relaxed'>
          <li>
            <span className='font-semibold'>What:</span> {p.tagline}
          </li>
          <li>
            <span className='font-semibold'>Hard part:</span> {p.decisions[0].title.toLowerCase()}.
          </li>
          <li>
            <span className='font-semibold'>Built with:</span> {p.stack.slice(0, 5).join(', ')}.
          </li>
        </ul>
        <nav aria-label='On this page' className='mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.95rem]'>
          <span className='hand text-[1.3rem] text-pencil'>jump to:</span>
          {[
            ['why', 'why'],
            ['how', 'how it works'],
            ['decisions', 'decisions'],
            ...(p.gallery.length ? [['screens', 'screens']] : []),
          ].map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className='ink-link'
            >
              {label}
            </a>
          ))}
        </nav>
      </motion.aside>

      <div className='mt-20 space-y-24'>
        <Part id='why' title={p.team ? 'Why we built it' : 'Why I built it'} note='the problem, minus the buzzwords'>
          <div className='max-w-2xl space-y-5 text-[1.15rem] leading-[1.7]'>
            {p.problem.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
        </Part>

        <Part id='how' title='How it works' note={p.flowTitle.toLowerCase()}>
          <FlowCards steps={p.flow} />
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

        <Part id='decisions' title={p.team ? 'Decisions we made' : 'Decisions I made'} note='and why. mostly why.'>
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
          <Part id='screens' title='Screens' note='proof it exists'>
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
        <div className='hand text-[1.5rem] text-pencil'>next up <span className='text-pen'>(you’ve come this far)</span></div>
        <div className='break-words text-[2.2rem] font-semibold tracking-[-0.02em] group-hover:text-pen sm:text-[3rem]'>
          {next.title} →
        </div>
        <div className='text-pencil'>{next.tagline}</div>
      </Link>
    </article>
  )
}
