export default function SectionHead({ title, aside }: { title: string; aside?: string }) {
  return (
    <div className='flex items-end justify-between border-b-2 border-rule pb-3'>
      <h2 className='display text-[2.6rem] sm:text-[4rem]'>{title}</h2>
      {aside && <span className='pb-1 text-[0.9rem] text-grey'>{aside}</span>}
    </div>
  )
}
