import type { ReactNode } from 'react'
import Link from '../components/Link'
import ProjectCover from '../components/ProjectCover'
import type { Project } from '../data/content'

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className='grid grid-cols-1 gap-x-6 gap-y-4 border-t border-rule pt-5 md:grid-cols-12'>
      <h2 className='text-[0.95rem] font-semibold md:col-span-3'>{label}</h2>
      <div className='md:col-span-9'>{children}</div>
    </section>
  )
}

export default function CaseStudy({ project: p, next }: { project: Project; next: Project }) {
  return (
    <article className='wrap pb-20'>
      <div className='flex items-center justify-between py-5 text-[0.9rem]'>
        <Link to='/#work' className='hover:text-blue'>
          ← All work
        </Link>
        <span className='text-grey'>Case study {p.index} / 04</span>
      </div>

      <h1 className='display break-words text-[12vw] md:text-[10vw] xl:text-[9rem]'>{p.title}</h1>

      <div className='mt-8 grid grid-cols-1 gap-x-6 gap-y-8 border-t border-rule pt-6 md:grid-cols-12'>
        <p className='text-[1.5rem] leading-[1.2] sm:text-[2rem] md:col-span-7'>{p.tagline}</p>
        <dl className='grid grid-cols-1 content-start gap-y-4 text-[0.95rem] md:col-span-4 md:col-start-9'>
          <div>
            <dt className='text-grey'>Status</dt>
            <dd>{p.status}</dd>
          </div>
          <div>
            <dt className='text-grey'>Built with</dt>
            <dd>{p.stack.join(', ')}</dd>
          </div>
          <div className='flex flex-wrap gap-x-5 gap-y-1'>
            {p.links.live && (
              <a href={p.links.live} target='_blank' rel='noreferrer' className='u-link text-blue'>
                {p.links.liveLabel ?? 'Open the app'} ↗
              </a>
            )}
            {p.links.github && (
              <a href={p.links.github} target='_blank' rel='noreferrer' className='u-link'>
                Source code ↗
              </a>
            )}
          </div>
        </dl>
      </div>

      <dl className='mt-12 grid grid-cols-2 border-t border-rule sm:grid-cols-3 lg:grid-cols-5'>
        {p.stats.map((s) => (
          <div key={s.label} className='flex min-w-0 flex-col border-b border-hair py-5 pr-4'>
            <dd className='break-words text-[1.4rem] font-semibold leading-none tracking-tight sm:text-[1.9rem]' style={{ fontStretch: '85%' }}>
              {s.value}
            </dd>
            <dt className='order-last mt-2 text-[0.88rem] text-grey'>{s.label}</dt>
          </div>
        ))}
      </dl>

      <ProjectCover project={p} className={`mt-12 border border-hair ${p.coverFit === 'contain' ? 'aspect-[16/9]' : ''}`} />

      <div className='mt-16 space-y-16'>
        <Row label='The problem'>
          <div className='max-w-3xl space-y-4 text-[1.15rem] leading-relaxed'>
            {p.problem.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
        </Row>

        <Row label='How it works'>
          <p className='text-[1.15rem]'>{p.flowTitle}</p>
          <ol className='mt-6 grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2 lg:grid-cols-5'>
            {p.flow.map((step, i) => (
              <li key={step.title} className='border-t-2 border-blue pt-3'>
                <div className='text-[0.85rem] text-blue'>Step {i + 1}</div>
                <div className='mt-1 text-[1.05rem] font-semibold'>{step.title}</div>
                <p className='mt-1 text-[0.92rem] leading-relaxed text-grey'>{step.detail}</p>
              </li>
            ))}
          </ol>
          {p.flowNotes && (
            <ul className='mt-8 max-w-3xl list-disc space-y-1 pl-5 text-[0.98rem] leading-relaxed'>
              {p.flowNotes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          )}
        </Row>

        <Row label='Decisions'>
          <div className='grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2'>
            {p.decisions.map((d) => (
              <div key={d.title}>
                <h3 className='text-[1.15rem] font-semibold'>{d.title}</h3>
                <p className='mt-2 text-[1rem] leading-relaxed text-grey'>{d.body}</p>
              </div>
            ))}
          </div>
        </Row>

        {p.gallery.length > 0 && (
          <Row label='Screens'>
            <div className={`grid gap-4 ${p.galleryLayout === 'phone' ? 'grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2'}`}>
              {p.gallery.map((g) => (
                <a key={g.src} href={g.src} target='_blank' rel='noreferrer' className='block border border-hair'>
                  <img src={g.src} alt={g.alt} loading='lazy' decoding='async' className='w-full' />
                </a>
              ))}
            </div>
          </Row>
        )}
      </div>

      <Link to={`/work/${next.slug}`} className='group mt-20 block border-t-2 border-rule pt-4'>
        <div className='text-[0.9rem] text-grey'>Next project</div>
        <div className='display mt-2 break-words text-[11vw] group-hover:text-blue sm:text-[4.5rem]'>{next.title} →</div>
      </Link>
    </article>
  )
}
