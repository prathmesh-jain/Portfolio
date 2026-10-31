import { FaArrowLeft, FaArrowRight, FaArrowUp, FaGithub } from 'react-icons/fa'
import { motion } from 'motion/react'
import FlowDiagram from '../components/FlowDiagram'
import ProjectCover from '../components/ProjectCover'
import Reveal from '../components/Reveal'
import Link from '../components/Link'
import type { Project } from '../data/content'

const ease = [0.22, 1, 0.36, 1] as const

function Block({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <section className='grid gap-4 border-t border-line pt-6 md:grid-cols-[180px_1fr] md:gap-8'>
      <div className='label'>{label}</div>
      <div>
        <h2 className='font-display text-2xl font-semibold tracking-tight sm:text-3xl'>{title}</h2>
        <div className='mt-6'>{children}</div>
      </div>
    </section>
  )
}

export default function CaseStudy({ project, next }: { project: Project; next: Project }) {
  const p = project
  return (
    <article className='mx-auto max-w-6xl px-5 pb-24 md:px-8'>
      <motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease }}>
        <Link to='/#work' className='mt-8 inline-flex items-center gap-2 text-sm text-muted hover:text-ink'>
          <FaArrowLeft size={11} /> All work
        </Link>

        <div className='mt-10 label'>
          <span className='text-accent'>Case study {p.index}</span> · {p.status}
        </div>
        <h1 className='mt-4 break-words font-display text-[2.6rem] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-6xl'>{p.title}</h1>
        <p className='mt-4 max-w-3xl text-xl leading-8 text-muted sm:text-2xl sm:leading-9'>{p.tagline}</p>

        <div className='mt-8 flex flex-wrap gap-3'>
          {p.links.live && (
            <a href={p.links.live} target='_blank' rel='noreferrer' className='btn btn-primary'>
              {p.links.liveLabel ?? 'Visit live app'} <FaArrowUp size={10} className='rotate-45' />
            </a>
          )}
          {p.links.github && (
            <a href={p.links.github} target='_blank' rel='noreferrer' className='btn btn-ghost'>
              <FaGithub size={14} /> Source code
            </a>
          )}
        </div>

        <dl className='mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-y border-line py-6 sm:grid-cols-3 lg:grid-cols-5'>
          {p.stats.map((s) => (
            <div key={s.label} className='flex flex-col'>
              <dt className='order-2 mt-1 text-xs leading-5 text-soft'>{s.label}</dt>
              <dd className='order-1 font-display text-xl font-semibold tracking-tight sm:text-2xl'>{s.value}</dd>
            </div>
          ))}
        </dl>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease }}
        className='mt-10'
      >
        <ProjectCover project={p} className='aspect-[16/9] rounded-xl border border-line sm:aspect-[16/8]' />
      </motion.div>

      <div className='mt-20 space-y-20'>
        <Reveal>
          <Block label='01 / Problem' title='Why it exists'>
            <div className='max-w-3xl space-y-4 text-[1.02rem] leading-8 text-muted'>
              {p.problem.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </Block>
        </Reveal>

        <Reveal>
          <Block label='02 / Architecture' title={p.flowTitle}>
            <FlowDiagram steps={p.flow} />
            {p.flowNotes && (
              <ul className='mt-6 space-y-2'>
                {p.flowNotes.map((n) => (
                  <li key={n} className='flex gap-3 text-[0.93rem] leading-7 text-muted'>
                    <span className='text-accent' aria-hidden='true'>+</span>
                    {n}
                  </li>
                ))}
              </ul>
            )}
            <div className='mt-6 font-mono text-[0.72rem] text-soft'>{p.stack.join(' · ')}</div>
          </Block>
        </Reveal>

        <Reveal>
          <Block label='03 / Decisions' title='Choices that shaped it'>
            <div className='grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2'>
              {p.decisions.map((d, i) => (
                <div key={d.title} className='bg-bg p-6'>
                  <div className='font-mono text-[0.7rem] text-accent'>{String(i + 1).padStart(2, '0')}</div>
                  <h3 className='mt-3 font-display text-lg font-semibold'>{d.title}</h3>
                  <p className='mt-2 text-[0.93rem] leading-7 text-muted'>{d.body}</p>
                </div>
              ))}
            </div>
          </Block>
        </Reveal>

        {p.gallery.length > 0 && (
          <Reveal>
            <Block label='04 / Screens' title='What it looks like'>
              <div className={`grid gap-4 ${p.galleryLayout === 'phone' ? 'grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2'}`}>
                {p.gallery.map((g) => (
                  <a
                    key={g.src}
                    href={g.src}
                    target='_blank'
                    rel='noreferrer'
                    className='group block overflow-hidden rounded-lg border border-line'
                  >
                    <img
                      src={g.src}
                      alt={g.alt}
                      loading='lazy'
                      decoding='async'
                      className='w-full transition-transform duration-500 group-hover:scale-[1.02]'
                    />
                  </a>
                ))}
              </div>
            </Block>
          </Reveal>
        )}
      </div>

      <Link
        to={`/work/${next.slug}`}
        className='group mt-24 flex items-center justify-between gap-6 border-t border-line pt-8'
      >
        <div>
          <div className='label'>Next case study</div>
          <div className='mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl'>{next.title}</div>
          <div className='mt-1 text-muted'>{next.tagline}</div>
        </div>
        <FaArrowRight className='shrink-0 text-accent transition-transform group-hover:translate-x-1' />
      </Link>
    </article>
  )
}
