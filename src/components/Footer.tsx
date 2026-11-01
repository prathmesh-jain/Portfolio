import { profile } from '../data/content'

export default function Footer() {
  return (
    <footer className='wrap flex flex-col gap-3 border-t border-dashed border-faint py-8 text-[0.9rem] text-pencil sm:flex-row sm:items-center sm:justify-between'>
      <p>
        © {new Date().getFullYear()} {profile.name} · <span className='hand text-[1.25rem] text-ink'>made in Mumbai</span>
      </p>
      <div className='flex gap-5'>
        <a href={profile.links.github} target='_blank' rel='noreferrer' className='hover:text-ink'>GitHub</a>
        <a href={profile.links.linkedin} target='_blank' rel='noreferrer' className='hover:text-ink'>LinkedIn</a>
      </div>
    </footer>
  )
}
