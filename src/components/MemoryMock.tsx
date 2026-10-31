// Illustration of a Memory Dump search: a relationship question answered from the user's own records.
export default function MemoryMock() {
  return (
    <div className='flex w-full flex-col gap-3 bg-[#f4f1ec] px-5 py-8 text-[#22262f] sm:p-8' aria-hidden='true'>
      <div className='flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[0.8rem] shadow-sm ring-1 ring-black/5 sm:text-[0.86rem]'>
        <span className='text-[#8a8f99]'>⌕</span> who is my bhai?
      </div>

      <div className='rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5'>
        <div className='flex items-center gap-3'>
          <div className='grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#d9e4ff] text-[0.8rem] font-semibold text-[#2f55d4]'>
            R
          </div>
          <div className='min-w-0'>
            <div className='text-[0.9rem] font-semibold'>Rohan</div>
            <div className='text-[0.74rem] text-[#6a7183]'>elder brother · confirmed by you</div>
          </div>
          <span className='ml-auto shrink-0 rounded-full bg-[#e3f6ea] px-2 py-0.5 text-[0.66rem] font-medium text-[#1f8a4c]'>
            from your records
          </span>
        </div>
        <div className='mt-3 grid grid-cols-4 gap-1.5'>
          {['#c9d6e8', '#e8d6c9', '#d6e8c9', '#e0d0e6'].map((c) => (
            <div key={c} className='aspect-square rounded-md' style={{ background: c }} />
          ))}
        </div>
        <div className='mt-2 text-[0.72rem] text-[#6a7183]'>photos together · 2019 – 2026</div>
      </div>

      <div className='flex items-center gap-3 rounded-xl border border-dashed border-[#c9ccd3] bg-white/60 p-3 text-[0.78rem]'>
        <div className='h-9 w-9 shrink-0 rounded-md bg-[#e8d6c9]' />
        <div className='min-w-0'>
          Is this <b>Mummy</b>?
          <div className='text-[0.7rem] text-[#6a7183]'>suggestion, not a fact yet</div>
        </div>
        <div className='ml-auto flex shrink-0 gap-1.5'>
          <span className='rounded-md bg-[#22262f] px-2 py-1 text-[0.68rem] text-white'>Yes</span>
          <span className='rounded-md px-2 py-1 text-[0.68rem] ring-1 ring-[#c9ccd3]'>No</span>
          <span className='rounded-md px-2 py-1 text-[0.68rem] text-[#6a7183]'>Skip</span>
        </div>
      </div>
    </div>
  )
}
