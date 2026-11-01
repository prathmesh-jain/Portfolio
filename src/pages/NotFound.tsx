import Link from '../components/Link'

export default function NotFound() {
  return (
    <section className='wrap py-28'>
      <p className='hand text-[2rem] text-pen'>404, obviously</p>
      <h1 className='text-[3rem] font-semibold tracking-tight'>This page went out for chai and never came back.</h1>
      <p className='mt-4 max-w-lg text-pencil'>Either the link is broken or you’re poking around URLs. Respect, either way.</p>
      <Link to='/' className='ink-link mt-6 inline-block'>take me home</Link>
    </section>
  )
}
