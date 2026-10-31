import Link from './Link'
import { profile } from '../data/content'

export default function Nav() {
  return (
    <header className='wrap flex h-16 items-center justify-between'>
      <Link to='/' className='hand text-[1.9rem] font-bold leading-none'>
        prathmesh<span className='text-pen'>.</span>
      </Link>
      <nav>
        <ul className='flex items-center gap-4 text-[0.95rem] sm:gap-7'>
          <li>
            <Link to='/#work' className='hover:text-pen'>work</Link>
          </li>
          <li>
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
