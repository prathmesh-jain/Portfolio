import { profile } from '../data/content'

export default function Footer() {
  return (
    <footer className='border-t border-line'>
      <div className='mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-soft sm:flex-row sm:items-center sm:justify-between md:px-8'>
        <div>© {new Date().getFullYear()} {profile.name} · {profile.location}</div>
        <div className='flex gap-5'>
          <a href={profile.links.github} target='_blank' rel='noreferrer' className='hover:text-ink'>GitHub</a>
          <a href={profile.links.linkedin} target='_blank' rel='noreferrer' className='hover:text-ink'>LinkedIn</a>
          <a href={profile.links.leetcode} target='_blank' rel='noreferrer' className='hover:text-ink'>LeetCode</a>
          <a href='https://github.com/prathmesh-jain/Portfolio' target='_blank' rel='noreferrer' className='hover:text-ink'>
            Source
          </a>
        </div>
      </div>
    </footer>
  )
}
