import Reveal from './Reveal'
import { impact } from '../data/content'

export default function Impact() {
  return (
    <section aria-label='Impact in numbers' className='mx-auto max-w-6xl px-5 md:px-8'>
      <div className='grid grid-cols-1 border-y border-line sm:grid-cols-2 lg:grid-cols-4'>
        {impact.map((m, i) => (
          <Reveal
            key={m.label}
            delay={i * 0.06}
            className={`border-line py-7 sm:px-6 ${i > 0 ? 'border-t sm:border-t-0' : ''} ${i % 2 === 1 ? 'sm:border-l' : ''} ${i >= 2 ? 'sm:border-t lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l' : ''} ${i === 0 ? 'sm:pl-0' : ''}`}
          >
            <div className='label'>{m.label}</div>
            <div className='mt-3 flex items-baseline gap-2.5'>
              {m.from && <span className='font-mono text-sm text-soft line-through decoration-1'>{m.from}</span>}
              <span className='font-display text-4xl font-semibold tracking-tight text-ink'>{m.value}</span>
            </div>
            <p className='mt-3 text-sm leading-6 text-muted'>{m.context}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
