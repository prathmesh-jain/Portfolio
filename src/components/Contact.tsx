import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { motion } from 'motion/react'
import { FaGithub, FaHome, FaLinkedin } from 'react-icons/fa'

type ContactFormErrors = Partial<Record<'firstName' | 'user_email' | 'phone' | 'message', string>>
type SubmissionResult = 'success' | 'error' | null

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/prathmeshjain22',
    icon: <FaLinkedin size={16} />,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/prathmesh-jain',
    icon: <FaGithub size={16} />,
  },
  {
    label: 'LeetCode',
    href: 'https://leetcode.com/spider_22/',
    icon: <img src='/icons/leetcode.png' alt='' className='h-4 w-4 rounded-sm object-cover' />,
  },
]

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null)
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult>(null)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [loading, setLoading] = useState(false)

  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  const validateForm = (formElement: HTMLFormElement): ContactFormErrors => {
    const formData = new FormData(formElement)
    const firstName = String(formData.get('firstName') ?? '').trim()
    const email = String(formData.get('user_email') ?? '').trim()
    const phone = String(formData.get('phone') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()
    const nextErrors: ContactFormErrors = {}
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneCharactersPattern = /^\+?\d+$/
    const phoneDigits = phone.replace(/^\+/, '')

    if (!firstName) {
      nextErrors.firstName = 'Please enter your first name.'
    }

    if (!emailPattern.test(email)) {
      nextErrors.user_email = 'Please enter a valid email address.'
    }

    if (phone && !phoneCharactersPattern.test(phone)) {
      nextErrors.phone = 'Use digits only, with an optional + at the start.'
    } else if (phone && phoneDigits.length < 7) {
      nextErrors.phone = 'Phone number should have at least 7 digits.'
    } else if (phone && phoneDigits.length > 15) {
      nextErrors.phone = 'Phone number should not be longer than 15 digits.'
    }

    if (message.length <= 3) {
      nextErrors.message = 'Message should be longer than 3 characters.'
    }

    return nextErrors
  }

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!form.current) return

    const validationErrors = validateForm(form.current)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setLoading(true)
    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form.current, EMAILJS_PUBLIC_KEY)
      .then(() => {
        if (form.current) form.current.reset()
        setErrors({})
        setSubmissionResult('success')
      })
      .catch((error) => {
        console.error('Email sending failed:', error)
        setSubmissionResult('error')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <section id='contact' className='relative px-5 pb-16 pt-18 md:px-10 xl:px-20'>
      <div className='mx-auto max-w-7xl'>
        <div className='max-w-3xl text-left'>
          <div className='section-kicker'>Contact</div>
          <h2 className='section-title mt-4 font-poppins text-4xl font-semibold tracking-[-0.03em] sm:text-5xl'>
            Let&apos;s build something useful together.
          </h2>
          <p className='section-copy mt-5 text-base leading-8 sm:text-lg'>
            I&apos;m open to full-time opportunities, freelance work, and conversations around product, frontend, and
            applied AI.
          </p>
        </div>

        <div className='mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]'>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45 }}
            className='glass-panel rounded-4xl p-6 text-left sm:p-8'
          >
            <div className='section-kicker'>Availability</div>
            <h3 className='mt-4 font-poppins text-2xl font-semibold' style={{ color: 'var(--text-primary)' }}>
              Based in Mumbai, working across full-stack and AI projects.
            </h3>
            <p className='mt-4 text-sm leading-8 sm:text-base' style={{ color: 'var(--text-muted)' }}>
              If you have a role, collaboration, or product idea in mind, send me a message. I enjoy building
              interfaces that feel polished and backend systems that stay dependable in production.
            </p>

            <div className='soft-panel mt-6 rounded-[1.6rem] p-5'>
              <div className='flex items-start gap-3'>
                <div
                  className='inline-flex h-11 w-11 items-center justify-center rounded-2xl'
                  style={{ background: 'var(--chip-bg)', color: 'var(--text-primary)' }}
                >
                  <FaHome size={16} />
                </div>
                <div>
                  <div className='text-sm font-semibold' style={{ color: 'var(--text-primary)' }}>
                    Location
                  </div>
                  <div className='mt-1 text-sm leading-7' style={{ color: 'var(--text-muted)' }}>
                    Mumbai, Maharashtra, India
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-6'>
              <div className='section-kicker'>Socials</div>
              <div className='mt-4 flex flex-wrap gap-3'>
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                    className='secondary-button inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium'
                  >
                    <span className='icon-shell icon-shell--sm'>{social.icon}</span>
                    {social.label}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.form
            ref={form}
            onSubmit={sendEmail}
            noValidate
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, delay: 0.06 }}
            className='glass-panel rounded-4xl p-6 text-left sm:p-8'
          >
            <div className='grid gap-6 md:grid-cols-2'>
              <div>
                <label htmlFor='firstName' className='mb-2 block pl-1 text-sm font-semibold' style={{ color: 'var(--text-secondary)' }}>
                  First name
                </label>
                <input
                  type='text'
                  id='firstName'
                  name='firstName'
                  autoComplete='given-name'
                  aria-invalid={Boolean(errors.firstName)}
                  aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                  className='field-input w-full rounded-2xl px-4 py-3'
                />
                {errors.firstName && (
                  <p id='firstName-error' className='mt-2 pl-1 text-xs' style={{ color: '#f87171' }}>
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor='lastName' className='mb-2 block pl-1 text-sm font-semibold' style={{ color: 'var(--text-secondary)' }}>
                  Last name
                </label>
                <input
                  type='text'
                  id='lastName'
                  name='lastName'
                  autoComplete='family-name'
                  className='field-input w-full rounded-2xl px-4 py-3'
                />
              </div>
            </div>

            <div className='mt-6'>
              <label htmlFor='user_email' className='mb-2 block pl-1 text-sm font-semibold' style={{ color: 'var(--text-secondary)' }}>
                Email
              </label>
              <input
                type='email'
                id='user_email'
                name='user_email'
                autoComplete='email'
                aria-invalid={Boolean(errors.user_email)}
                aria-describedby={errors.user_email ? 'user_email-error' : undefined}
                className='field-input w-full rounded-2xl px-4 py-3'
              />
              {errors.user_email && (
                <p id='user_email-error' className='mt-2 pl-1 text-xs' style={{ color: '#f87171' }}>
                  {errors.user_email}
                </p>
              )}
            </div>

            <div className='mt-6'>
              <label htmlFor='phone' className='mb-2 block pl-1 text-sm font-semibold' style={{ color: 'var(--text-secondary)' }}>
                Phone number
              </label>
              <input
                type='tel'
                id='phone'
                name='phone'
                autoComplete='tel'
                inputMode='tel'
                placeholder='+919876543210'
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                className='field-input w-full rounded-2xl px-4 py-3'
              />
              {errors.phone && (
                <p id='phone-error' className='mt-2 pl-1 text-xs' style={{ color: '#f87171' }}>
                  {errors.phone}
                </p>
              )}
            </div>

            <div className='mt-6'>
              <label htmlFor='message' className='mb-2 block pl-1 text-sm font-semibold' style={{ color: 'var(--text-secondary)' }}>
                Message
              </label>
              <textarea
                id='message'
                name='message'
                rows={5}
                autoComplete='off'
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className='field-input w-full resize-none rounded-2xl px-4 py-3'
              />
              {errors.message && (
                <p id='message-error' className='mt-2 pl-1 text-xs' style={{ color: '#f87171' }}>
                  {errors.message}
                </p>
              )}
            </div>

            <div className='mt-8 flex justify-end'>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                type='submit'
                disabled={loading}
                className='accent-button rounded-2xl px-6 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60'
              >
                {loading ? 'Sending...' : 'Send message'}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>

      {submissionResult && (
        <div className='fixed inset-0 z-50 flex items-center justify-center px-4' role='presentation'>
          <div className='absolute inset-0' style={{ background: 'var(--overlay)', backdropFilter: 'blur(14px)' }} />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className='glass-panel relative w-full max-w-md rounded-[1.8rem] p-6 text-center sm:p-7'
            role='dialog'
            aria-modal='true'
            aria-labelledby='contact-result-title'
          >
            <h3 id='contact-result-title' className='font-poppins text-2xl font-semibold' style={{ color: 'var(--text-primary)' }}>
              {submissionResult === 'success' ? 'Message received' : 'Message not sent'}
            </h3>
            <p className='mt-3 text-sm leading-7' style={{ color: 'var(--text-muted)' }}>
              {submissionResult === 'success'
                ? 'Thanks for reaching out. I have your message and will get back to you soon.'
                : 'Something went wrong while sending your message. Please try again in a moment.'}
            </p>
            <button
              type='button'
              onClick={() => setSubmissionResult(null)}
              className='accent-button mt-6 rounded-2xl px-5 py-3 text-sm font-semibold'
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </section>
  )
}

export default Contact
