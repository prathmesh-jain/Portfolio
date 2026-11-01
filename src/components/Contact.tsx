import { useRef, useState, type FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import SectionHead from './SectionHead'
import Magnetic from './fx/Magnetic'
import HandWrite from './fx/HandWrite'
import { Squiggle } from './Doodles'
import { profile } from '../data/content'

type Errors = Partial<Record<'firstName' | 'user_email' | 'message', string>>
type Status = 'idle' | 'sending' | 'sent' | 'error'

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const validate = (form: HTMLFormElement): Errors => {
  const data = new FormData(form)
  const errors: Errors = {}
  if (!String(data.get('firstName') ?? '').trim()) errors.firstName = 'a name would be nice. even a fake one.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.get('user_email') ?? '').trim()))
    errors.user_email = 'that email looks… creative. try again?'
  if (String(data.get('message') ?? '').trim().length < 4) errors.message = 'a few more words, please. I can’t read minds (yet).'
  return errors
}

export default function Contact() {
  const form = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!form.current) return
    const next = validate(form.current)
    setErrors(next)
    if (Object.keys(next).length) return
    setStatus('sending')
    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form.current, EMAILJS_PUBLIC_KEY)
      .then(() => {
        form.current?.reset()
        setStatus('sent')
      })
      .catch((err) => {
        console.error('Email sending failed:', err)
        setStatus('error')
      })
  }

  return (
    <section id='contact' className='wrap scroll-mt-20 pb-24'>
      <SectionHead title='Say hi' note='I read everything. yes, even the long ones.' />

      <div className='mt-12 grid grid-cols-1 gap-14 md:grid-cols-[1.1fr_0.9fr]'>
        <div className='min-w-0'>
          <p className='max-w-lg text-[1.15rem] leading-[1.7]'>
            I’m open to full-time roles and interesting freelance work in applied AI and full stack. Email is the
            fastest way to reach me. Carrier pigeons are slower, but I’ll still reply.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className='relative mt-8 inline-block break-all text-[1.35rem] font-semibold hover:text-pen sm:text-[1.9rem]'
          >
            {profile.email}
            <Squiggle className='absolute -bottom-3 left-0 h-3 w-full text-pen' />
          </a>
          <div className='mt-10 flex gap-6'>
            <a href={profile.links.linkedin} target='_blank' rel='noreferrer' className='ink-link'>LinkedIn</a>
            <a href={profile.links.github} target='_blank' rel='noreferrer' className='ink-link'>GitHub</a>
            <a href={profile.resume} target='_blank' rel='noreferrer' className='ink-link'>Resume</a>
          </div>
        </div>

        <div className='min-w-0'>
          {status === 'sent' ? (
            <p className='hand text-[2rem] text-pen'>
              <HandWrite onView={false} duration={1.2}>
                got it! I’ll write back soon. probably before you refresh.
              </HandWrite>
            </p>
          ) : (
            <form ref={form} onSubmit={onSubmit} noValidate className='space-y-6'>
              <p className='hand text-[1.6rem] text-pencil'>or leave a note here…</p>
              {(
                [
                  { name: 'firstName', label: 'your name (the real one)', type: 'text', auto: 'name' },
                  { name: 'user_email', label: 'your email (I actually reply)', type: 'email', auto: 'email' },
                ] as const
              ).map((f) => (
                <div key={f.name}>
                  <label htmlFor={f.name} className='sr-only'>
                    {f.label}
                  </label>
                  <input
                    id={f.name}
                    name={f.name}
                    type={f.type}
                    autoComplete={f.auto}
                    placeholder={f.label}
                    aria-invalid={Boolean(errors[f.name])}
                    className='field'
                  />
                  {errors[f.name] && <p className='hand mt-1 text-[1.2rem] text-pen'>{errors[f.name]}</p>}
                </div>
              ))}
              <div>
                <label htmlFor='message' className='sr-only'>
                  Message
                </label>
                <textarea
                  id='message'
                  name='message'
                  rows={3}
                  placeholder='what’s on your mind? job offers go to the top of the pile'
                  aria-invalid={Boolean(errors.message)}
                  className='field resize-none'
                />
                {errors.message && <p className='hand mt-1 text-[1.2rem] text-pen'>{errors.message}</p>}
              </div>
              <Magnetic>
                <button
                  type='submit'
                  disabled={status === 'sending'}
                  className='group/btn relative overflow-hidden rounded-[255px_15px_225px_15px/15px_225px_15px_255px] border-2 border-ink px-5 py-2.5 font-semibold disabled:opacity-60'
                >
                  <span
                    aria-hidden='true'
                    className='absolute inset-0 translate-y-full bg-ink transition-transform duration-300 ease-out group-hover/btn:translate-y-0'
                  />
                  <span className='relative transition-colors duration-300 group-hover/btn:text-paper'>
                    {status === 'sending' ? 'sending…' : 'send it ✈'}
                  </span>
                </button>
              </Magnetic>
              {status === 'error' && (
                <p className='hand text-[1.3rem] text-pen' role='alert'>
                  well, that broke. ironic, for a developer’s site. please email me directly.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
