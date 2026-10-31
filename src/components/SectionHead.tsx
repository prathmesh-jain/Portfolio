import { Squiggle } from './Doodles'

export default function SectionHead({ title, note }: { title: string; note?: string }) {
  return (
    <div className='flex flex-wrap items-end gap-x-5 gap-y-1'>
      <h2 className='relative text-[2.2rem] font-semibold tracking-[-0.02em] sm:text-[2.8rem]'>
        {title}
        <Squiggle className='absolute -bottom-2 left-0 h-3 w-full text-pen' />
      </h2>
      {note && <span className='hand pb-1 text-[1.45rem] text-pencil'>{note}</span>}
    </div>
  )
}
