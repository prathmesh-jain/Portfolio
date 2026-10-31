import Link from '../components/Link'

export default function NotFound() {
  return (
    <section className='wrap py-24'>
      <h1 className='display text-[6rem] sm:text-[10rem]'>404</h1>
      <p className='mt-6 text-[1.3rem]'>That page doesn’t exist.</p>
      <Link to='/' className='u-link mt-4 inline-block text-blue'>Back to the homepage</Link>
    </section>
  )
}
