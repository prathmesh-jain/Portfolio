import SectionHead from './SectionHead'
import { ArrowLeft, Ring } from './Doodles'
import { education, experience, profile } from '../data/content'

function Entry({
  when,
  current,
  children,
}: {
  when: string
  current?: boolean
  children: React.ReactNode
}) {
  return (
    <li className='relative grid grid-cols-1 gap-x-10 gap-y-2 pb-14 pl-9 last:pb-0 md:grid-cols-[170px_1fr] md:pl-0'>
      {/* marker sits on the dashed line */}
      <Ring
        className={`absolute left-0 top-1 h-5 w-5 md:left-[178px] ${current ? 'text-pen' : 'text-pencil'}`}
      />
      <div className='hand text-[1.45rem] leading-tight text-pencil md:pt-0.5 md:text-right'>
        {when}
        {current && <span className='ml-2 text-pen md:ml-0 md:block'>(current)</span>}
      </div>
      <div className='min-w-0 md:pl-14'>{children}</div>
    </li>
  )
}

export default function Experience() {
  return (
    <section id='experience' className='wrap scroll-mt-6 pb-24'>
      <SectionHead title='Work experience' />

      <ol className='relative mt-14'>
        <span
          aria-hidden='true'
          className='absolute bottom-2 left-[9px] top-3 border-l-2 border-dashed border-faint md:left-[187px]'
        />

        {experience.map((job) => (
          <Entry key={job.company + job.start} when={`${job.start} – ${job.end ?? 'now'}`} current={!job.end}>
            <div className='flex items-center gap-3'>
              {job.logo && <img src={job.logo} alt='' className='h-9 w-9 rounded-md object-cover ring-1 ring-faint' />}
              <div>
                <h3 className='text-[1.3rem] font-semibold leading-tight'>{job.role}</h3>
                <p className='text-pencil'>
                  {job.company} · {job.location}
                </p>
              </div>
            </div>
            {job.team && <p className='mt-2 text-[0.92rem] text-pencil'>{job.team}</p>}
            <p className='mt-4 max-w-2xl text-[1.08rem] leading-[1.7]'>{job.summary}</p>
            {job.highlights.length > 0 && (
              <ul className='mt-4 space-y-1.5 text-[1rem]'>
                {job.highlights.map((h) => (
                  <li key={h.what}>
                    {h.what}: <span className='marker font-semibold'>{h.result}</span>
                  </li>
                ))}
              </ul>
            )}
          </Entry>
        ))}

        <Entry when={education.year}>
          <h3 className='text-[1.15rem] font-semibold leading-tight'>{education.degree}</h3>
          <p className='text-pencil'>
            {education.school} · {education.note}
          </p>
        </Entry>
      </ol>

      <div className='mt-14 flex items-center gap-2 md:pl-[242px]'>
        <a href={profile.resume} target='_blank' rel='noreferrer' className='ink-link font-semibold'>
          full details in my resume (PDF)
        </a>
        <ArrowLeft className='h-6 w-14 shrink-0 text-pen' />
        <span className='hand hidden text-[1.35rem] text-pen sm:inline'>projects, numbers, all of it</span>
      </div>
    </section>
  )
}
