import Link from './Link'
import { profile } from '../data/content'

export default function Nav() {
  return (
    <header className='wrap flex h-16 items-center justify-between'>
      <Link to='/' className='hand text-[1.7rem] font-bold leading-none sm:text-[1.9rem]'>
        prathmesh<span className='text-pen'>.</span>
      </Link>
      <nav>
        <ul className='flex items-center gap-3 text-[0.92rem] sm:gap-7 sm:text-[0.95rem]'>
          <li>
            <Link to='/#work' className='hover:text-pen'>work</Link>
          </li>
          <li>
            <Link to='/#experience' className='hover:text-pen'>experience</Link>
          </li>
          <li className='hidden sm:block'>
            <Link to='/#about' className='hover:text-pen'>about</Link>
          </li>
          <li className='hidden sm:block'>
            <Link to='/#contact' className='hover:text-pen'>say hi</Link>
          </li>
          <li>
            <a href={profile.resume} target='_blank' rel='noreferrer' className='ink-link'>
              resume
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
