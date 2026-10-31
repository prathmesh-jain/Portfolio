import { profile } from '../data/content'

export default function Footer() {
  return (
    <footer className='wrap grid grid-cols-2 gap-y-2 border-t border-rule py-5 text-[0.85rem] md:grid-cols-12'>
      <div className='md:col-span-3'>© {new Date().getFullYear()} {profile.name}</div>
      <div className='hidden text-grey md:col-span-5 md:block'>Designed and built in Mumbai.</div>
      <div className='flex justify-end gap-5 md:col-span-4'>
        <a href={profile.links.github} target='_blank' rel='noreferrer' className='hover:text-blue'>GitHub</a>
        <a href={profile.links.linkedin} target='_blank' rel='noreferrer' className='hover:text-blue'>LinkedIn</a>
        <a href='https://github.com/prathmesh-jain/Portfolio' target='_blank' rel='noreferrer' className='hover:text-blue'>
          Source
        </a>
      </div>
    </footer>
  )
}
