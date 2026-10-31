import { useRef, useState, type FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { profile } from '../data/content'

type Errors = Partial<Record<'firstName' | 'user_email' | 'message', string>>
type Status = 'idle' | 'sending' | 'sent' | 'error'

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const validate = (form: HTMLFormElement): Errors => {
  const data = new FormData(form)
  const errors: Errors = {}
  if (!String(data.get('firstName') ?? '').trim()) errors.firstName = 'Please add your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.get('user_email') ?? '').trim()))
    errors.user_email = 'That email doesn’t look right.'
  if (String(data.get('message') ?? '').trim().length < 4) errors.message = 'A few more words, please.'
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
    <section id='contact' className='scroll-mt-12 bg-blue text-white'>
      <div className='wrap grid grid-cols-1 gap-x-6 gap-y-12 py-16 md:grid-cols-12 md:py-24'>
        <div className='md:col-span-7'>
          <h2 className='display text-[3.4rem] sm:text-[5.5rem]'>Let’s talk.</h2>
          <p className='mt-6 max-w-md text-[1.15rem] leading-snug'>
            Open to full-time roles and interesting freelance work in applied AI and full stack.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className='mt-8 inline-block break-all text-[1.5rem] font-semibold underline decoration-2 underline-offset-[0.2em] hover:no-underline sm:text-[2.2rem]'
          >
            {profile.email}
          </a>
          <div className='mt-8 flex gap-6 text-[0.95rem]'>
            <a href={profile.links.linkedin} target='_blank' rel='noreferrer' className='underline underline-offset-4'>
              LinkedIn
            </a>
            <a href={profile.links.github} target='_blank' rel='noreferrer' className='underline underline-offset-4'>
              GitHub
            </a>
            <a href={profile.resume} target='_blank' rel='noreferrer' className='underline underline-offset-4'>
              Resume
            </a>
          </div>
        </div>

        <div className='md:col-span-4 md:col-start-9'>
          {status === 'sent' ? (
            <p className='text-[1.3rem]'>Thanks, message received. I’ll reply soon.</p>
          ) : (
            <form ref={form} onSubmit={onSubmit} noValidate className='space-y-6'>
              <p className='text-[0.9rem] opacity-80'>Or send a note from here</p>
              {(
                [
                  { name: 'firstName', label: 'Name', type: 'text', auto: 'name' },
                  { name: 'user_email', label: 'Email', type: 'email', auto: 'email' },
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
                  {errors[f.name] && <p className='mt-1 text-[0.85rem]'>{errors[f.name]}</p>}
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
                  placeholder='Message'
                  aria-invalid={Boolean(errors.message)}
                  className='field resize-none'
                />
                {errors.message && <p className='mt-1 text-[0.85rem]'>{errors.message}</p>}
              </div>
              <button
                type='submit'
                disabled={status === 'sending'}
                className='bg-white px-5 py-3 text-[0.95rem] font-semibold text-blue hover:bg-ink hover:text-white disabled:opacity-60'
              >
                {status === 'sending' ? 'Sending…' : 'Send'}
              </button>
              {status === 'error' && (
                <p className='text-[0.9rem]' role='alert'>
                  Couldn’t send. Please email me directly.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
