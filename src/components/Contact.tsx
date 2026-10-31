import { useRef, useState, type FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { FaCheck, FaRegCopy } from 'react-icons/fa'
import Reveal from './Reveal'
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
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

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
    <section id='contact' className='scroll-mt-20 border-t border-line bg-surface'>
      <div className='mx-auto grid max-w-6xl gap-14 px-5 py-24 md:px-8 lg:grid-cols-[1.1fr_0.9fr]'>
        <Reveal>
          <div className='label'>
            <span className='text-accent'>04</span> / Contact
          </div>
          <h2 className='mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl'>
            Got a workflow that should be an agent?
          </h2>
          <p className='mt-5 max-w-lg text-base leading-7 text-muted sm:text-lg sm:leading-8'>
            I’m open to full-time roles and interesting freelance work in applied AI and full-stack. The fastest way to
            reach me is email. I usually reply within a day or two.
          </p>

          <div className='mt-8 flex flex-wrap items-center gap-3'>
            <a href={`mailto:${profile.email}`} className='btn btn-primary'>
              {profile.email}
            </a>
            <button type='button' onClick={copyEmail} className='btn btn-ghost' aria-live='polite'>
              {copied ? <FaCheck size={12} className='text-ok' /> : <FaRegCopy size={12} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          <div className='mt-10 flex gap-6 text-sm'>
            <a href={profile.links.linkedin} target='_blank' rel='noreferrer' className='link-underline text-muted hover:text-ink'>
              LinkedIn ↗
            </a>
            <a href={profile.links.github} target='_blank' rel='noreferrer' className='link-underline text-muted hover:text-ink'>
              GitHub ↗
            </a>
            <a href={profile.resume} target='_blank' rel='noreferrer' className='link-underline text-muted hover:text-ink'>
              Resume ↗
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          {status === 'sent' ? (
            <div className='rounded-xl border border-line p-8'>
              <FaCheck className='text-ok' />
              <h3 className='mt-4 font-display text-2xl font-semibold'>Message sent.</h3>
              <p className='mt-2 text-muted'>Thanks, I’ll get back to you soon.</p>
              <button type='button' onClick={() => setStatus('idle')} className='btn btn-ghost mt-6'>
                Send another
              </button>
            </div>
          ) : (
            <form ref={form} onSubmit={onSubmit} noValidate className='space-y-7'>
              <div className='label'>Or leave a note</div>
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
                    aria-describedby={errors[f.name] ? `${f.name}-err` : undefined}
                    className='field'
                  />
                  {errors[f.name] && (
                    <p id={`${f.name}-err`} className='mt-2 text-xs text-accent'>
                      {errors[f.name]}
                    </p>
                  )}
                </div>
              ))}
              <div>
                <label htmlFor='message' className='sr-only'>
                  Message
                </label>
                <textarea
                  id='message'
                  name='message'
                  rows={4}
                  placeholder='What are you working on?'
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-err' : undefined}
                  className='field resize-none'
                />
                {errors.message && (
                  <p id='message-err' className='mt-2 text-xs text-accent'>
                    {errors.message}
                  </p>
                )}
              </div>
              <div className='flex items-center gap-4'>
                <button type='submit' disabled={status === 'sending'} className='btn btn-ghost disabled:opacity-60'>
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                </button>
                {status === 'error' && (
                  <p className='text-sm text-accent' role='alert'>
                    Couldn’t send. Please email me directly.
                  </p>
                )}
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
