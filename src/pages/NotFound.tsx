import Link from '../components/Link'

export default function NotFound() {
  return (
    <section className='wrap py-28'>
      <p className='hand text-[2rem] text-pen'>oops</p>
      <h1 className='text-[3rem] font-semibold tracking-tight'>This page doesn’t exist.</h1>
      <Link to='/' className='ink-link mt-6 inline-block'>take me home</Link>
    </section>
  )
}
