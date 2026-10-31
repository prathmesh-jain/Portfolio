import Link from './Link'
import { profile } from '../data/content'

export default function Nav() {
  return (
    <header className='sticky top-0 z-40 border-b border-rule bg-paper'>
      <nav className='wrap grid h-12 grid-cols-2 items-center text-[0.9rem] md:grid-cols-12'>
        <Link to='/' className='font-semibold md:col-span-3'>
          {profile.name}
        </Link>
        <span className='hidden text-grey md:col-span-5 md:block'>
          {profile.role}, {profile.location}
        </span>
        <ul className='flex justify-end gap-4 md:col-span-4 md:gap-6'>
          <li>
            <Link to='/#work' className='hover:text-blue'>Work</Link>
          </li>
          <li>
            <Link to='/#about' className='hover:text-blue'>About</Link>
          </li>
          <li className='hidden sm:block'>
            <Link to='/#contact' className='hover:text-blue'>Contact</Link>
          </li>
          <li>
            <a href={profile.resume} target='_blank' rel='noreferrer' className='text-blue hover:underline'>
              Resume ↓
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
