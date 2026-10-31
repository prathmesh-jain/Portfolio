import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'

type Line = { who: string; text: string; tone?: 'ok' | 'accent' | 'muted' }

// A replay of a typical Transcribe job, from upload to PDF.
const lines: Line[] = [
  { who: 'api', text: 'job 4f2a queued · lang=hi · 1h 34m audio', tone: 'muted' },
  { who: 'cpu', text: 'ffmpeg → 16 kHz mono' },
  { who: 'cpu', text: 'split on silence → 4 chunks (22m 24m 25m 23m)' },
  { who: 'io', text: 'chunk 1/4 → gemini', tone: 'ok' },
  { who: 'io', text: 'chunk 2/4 → gemini', tone: 'ok' },
  { who: 'io', text: 'chunk 3/4 → gemini', tone: 'ok' },
  { who: 'io', text: 'chunk 4/4 → gemini', tone: 'ok' },
  { who: 'io', text: 'aggregate → structured html' },
  { who: 'io', text: 'render → transcript.pdf' },
  { who: 'done', text: 'ready for download · cost ≈ $0.12', tone: 'accent' },
]

const whoColor: Record<string, string> = {
  api: 'var(--soft)',
  cpu: '#8fb3ff',
  io: '#c79bff',
  done: 'var(--accent)',
}

export default function PipelineLog() {
  const reduce = useReducedMotion()
  const [count, setCount] = useState(reduce ? lines.length : 0)

  useEffect(() => {
    if (reduce) return
    const delay = count >= lines.length ? 3200 : count === 0 ? 700 : 520
    const id = setTimeout(() => setCount((c) => (c >= lines.length ? 0 : c + 1)), delay)
    return () => clearTimeout(id)
  }, [count, reduce])

  return (
    <figure className='overflow-hidden rounded-xl border border-line bg-surface shadow-[0_30px_80px_-40px_rgba(0,0,0,0.5)]'>
      <div className='flex items-center justify-between border-b border-line px-4 py-2.5'>
        <div className='flex items-center gap-1.5' aria-hidden='true'>
          <span className='h-2.5 w-2.5 rounded-full bg-line-strong' />
          <span className='h-2.5 w-2.5 rounded-full bg-line-strong' />
          <span className='h-2.5 w-2.5 rounded-full bg-line-strong' />
        </div>
        <span className='font-mono text-[0.7rem] text-soft'>transcribe · worker logs</span>
      </div>
      <div className='h-[300px] px-4 py-4 font-mono text-[0.74rem] leading-[1.9] sm:text-[0.78rem]' aria-hidden='true'>
        <div className='text-muted'>
          <span className='text-accent'>$</span> upload pravachan_2026-10-12.mp3
        </div>
        {lines.slice(0, count).map((line, i) => (
          <div key={i} className='flex min-w-0 gap-3 whitespace-nowrap'>
            <span className='w-9 shrink-0 text-right' style={{ color: whoColor[line.who] }}>
              {line.who}
            </span>
            <span
              className='min-w-0 truncate'
              style={{
                color: line.tone === 'accent' ? 'var(--accent)' : line.tone === 'muted' ? 'var(--muted)' : 'var(--ink)',
              }}
            >
              {line.text}
              {line.tone === 'ok' && <span style={{ color: 'var(--ok)' }}> ✓</span>}
            </span>
          </div>
        ))}
        {count < lines.length && <span className='caret inline-block h-3.5 w-1.5 translate-y-0.5 bg-accent' />}
      </div>
      <figcaption className='border-t border-line px-4 py-2.5 text-[0.75rem] text-soft'>
        Replay of a typical job in <span className='text-muted'>Transcribe</span>, my lecture transcription service.
      </figcaption>
    </figure>
  )
}
