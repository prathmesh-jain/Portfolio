import type { ReactNode } from 'react'

interface SectionHeaderProps {
  index: string
  label: string
  title: ReactNode
  intro?: ReactNode
}

export default function SectionHeader({ index, label, title, intro }: SectionHeaderProps) {
  return (
    <div className='grid gap-4 border-t border-line pt-6 md:grid-cols-[180px_1fr] md:gap-8'>
      <div className='label'>
        <span className='text-accent'>{index}</span> / {label}
      </div>
      <div className='max-w-3xl'>
        <h2 className='font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl'>{title}</h2>
        {intro && <p className='mt-4 text-base leading-7 text-muted sm:text-lg sm:leading-8'>{intro}</p>}
      </div>
    </div>
  )
}
