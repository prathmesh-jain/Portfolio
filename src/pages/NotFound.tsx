import Link from '../components/Link'

export default function NotFound() {
  return (
    <section className='mx-auto max-w-6xl px-5 py-32 md:px-8'>
      <div className='label'>404</div>
      <h1 className='mt-4 font-display text-4xl font-semibold tracking-tight'>Nothing here.</h1>
      <p className='mt-3 text-muted'>That page doesn’t exist, or it moved.</p>
      <Link to='/' className='btn btn-primary mt-8'>Back home</Link>
    </section>
  )
}
