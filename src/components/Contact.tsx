import React, { useRef, useState } from 'react';
import { FaHome } from "react-icons/fa";
import emailjs from '@emailjs/browser';
import { motion } from 'motion/react';

type ContactFormErrors = Partial<Record<'firstName' | 'user_email' | 'phone' | 'message', string>>;
type SubmissionResult = 'success' | 'error' | null;

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult>(null);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [loading, setLoading] = useState(false);

  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const validateForm = (formElement: HTMLFormElement): ContactFormErrors => {
    const formData = new FormData(formElement);
    const firstName = String(formData.get('firstName') ?? '').trim();
    const email = String(formData.get('user_email') ?? '').trim();
    const phone = String(formData.get('phone') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();
    const nextErrors: ContactFormErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneCharactersPattern = /^\+?\d+$/;
    const phoneDigits = phone.replace(/^\+/, '');

    if (!firstName) {
      nextErrors.firstName = 'Please enter your first name.';
    }

    if (!emailPattern.test(email)) {
      nextErrors.user_email = 'Please enter a valid email address.';
    }

    if (phone && !phoneCharactersPattern.test(phone)) {
      nextErrors.phone = 'Use digits only, with an optional + at the start.';
    } else if (phone && phoneDigits.length < 7) {
      nextErrors.phone = 'Phone number should have at least 7 digits.';
    } else if (phone && phoneDigits.length > 15) {
      nextErrors.phone = 'Phone number should not be longer than 15 digits.';
    }

    if (message.length <= 3) {
      nextErrors.message = 'Message should be longer than 3 characters.';
    }

    return nextErrors;
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    const validationErrors = validateForm(form.current);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setLoading(true);
    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form.current, EMAILJS_PUBLIC_KEY)
      .then(() => {
        if (form.current) form.current.reset();
        setErrors({});
        setSubmissionResult('success');
      })
      .catch((error) => {
        console.error('Email sending failed:', error);
        setSubmissionResult('error');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="relative h-fit w-full flex justify-center bg-custom-bg py-12 pt-16 px-2 scroll-mt-72 sm:scroll-mt-16 overflow-hidden" id="contact">
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute -top-40 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-indigo-600/10 blur-3xl ' />
        <div className='absolute -bottom-40 -right-40 h-130 w-130 rounded-full bg-fuchsia-600/10 blur-3xl ' />
        <div className='absolute inset-0 bg-linear-to-b from-indigo-950/10 via-transparent to-transparent' />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="lg:w-3/4 w-full bg-custom-bg rounded-xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
      >
        {/* Left: Info */}
        <div className="relative flex flex-col justify-between p-10 bg-linear-to-br from-[#181534] to-[#291c36]">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full opacity-10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                  <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#fff" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          <div className="relative z-9">
            <motion.h2
              initial={{ opacity: 0.5, scale: 2 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-3xl font-semibold text-white mb-4 font-poppins">Let's Connect!</motion.h2>
            <p className="text-gray-300 mb-8 max-w-md text-base text-justify font-inter">I'm always open to new opportunities, collaborations, or a friendly chat about tech. Drop me a message and I'll get back to you soon!</p>
            <ul className="space-y-6 text-gray-200">
              <li className="flex items-center gap-3">
                {/* Address Icon */}
                <FaHome className='text-indigo-300' />
                <span>
                  Mumbai, Maharashtra, India
                </span>
              </li>
              <motion.li
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3">
                {/* Social Links */}
                <span className='text-indigo-300 font-bold'>Socials:</span>
                <a href="https://www.linkedin.com/in/prathmeshjain22" target="_blank" rel="noopener noreferrer" className="hover:scale-115 underline">
                  <img src="/icons/LinkedIn.svg" alt="LinkedIn" className='w-6 h-6' />
                </a>
                <a href="https://github.com/prathmesh-jain" target="_blank" rel="noopener noreferrer" className="hover:scale-115 underline">
                  <img src="/icons/Github-Dark.svg" alt="GitHub" className='w-6 h-6' />
                </a>
                <a href="https://leetcode.com/spider_22/" target="_blank" rel="noopener noreferrer" className="hover:scale-115 underline">
                  <div className='bg-gray-950 rounded p-1 w-6 h-6'>
                    <img src="/icons/leetcode.png" alt="LeetCode" className='rounded w-full h-full' />
                  </div>
                </a>
              </motion.li>
            </ul>
          </div>
        </div>
        {/* Right: Form */}
        <form ref={form} onSubmit={sendEmail} noValidate className="relative flex flex-col justify-center text-left p-10 bg-linear-to-tr from-[#291b3c] to-[#191432]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <label htmlFor="firstName" className="block text-sm font-semibold text-gray-200 mb-1 pl-1">First name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                autoComplete='given-name'
                aria-invalid={Boolean(errors.firstName)}
                aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                className="w-full rounded-md border border-none bg-linear-to-tr from-[#241d49] to-[#281b47] text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              {errors.firstName && <p id="firstName-error" className="mt-1 text-xs text-red-300">{errors.firstName}</p>}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <label htmlFor="lastName" className="block text-sm font-semibold text-gray-200 mb-1 pl-1">Last name</label>
              <input type="text" id="lastName" name="lastName" autoComplete='family-name' className="w-full rounded-md border border-none bg-linear-to-tr from-[#241d49] to-[#281b47] text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-6"
          >
            <label htmlFor="user_email" className="block text-sm font-semibold text-gray-200 mb-1 pl-1">Email</label>
            <input
              type="email"
              id="user_email"
              name="user_email"
              autoComplete='email'
              aria-invalid={Boolean(errors.user_email)}
              aria-describedby={errors.user_email ? 'user_email-error' : undefined}
              className="w-full rounded-md border border-none bg-linear-to-tr from-[#241d49] to-[#281b47] text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.user_email && <p id="user_email-error" className="mt-1 text-xs text-red-300">{errors.user_email}</p>}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-6"
          >
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-200 mb-1 pl-1">Phone number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              autoComplete='tel'
              inputMode="tel"
              placeholder="+919876543210"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              className="w-full rounded-md border border-none bg-linear-to-tr from-[#241d49] to-[#281b47] text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.phone && <p id="phone-error" className="mt-1 text-xs text-red-300">{errors.phone}</p>}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-6"
          >
            <label htmlFor="message" className="block text-sm font-semibold text-gray-200 mb-1 pl-1">Message</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              autoComplete='off'
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'message-error' : undefined}
              className="w-full resize-none rounded-md border border-none bg-linear-to-tr from-[#241d49] to-[#281b47] text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.message && <p id="message-error" className="mt-1 text-xs text-red-300">{errors.message}</p>}
          </motion.div>
          <div className="flex justify-end mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="bg-violet-900 hover:bg-violet-600 text-white font-semibold px-6 py-2 rounded-md transition focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send message'}
            </motion.button>
          </div>
        </form>
      </motion.div>
      {submissionResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm" role="presentation">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-md rounded-xl border border-indigo-400/40 bg-[#17122f] p-6 text-center shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-result-title"
          >
            <h3 id="contact-result-title" className="text-2xl font-semibold text-white font-poppins">
              {submissionResult === 'success' ? 'Message received' : 'Message not sent'}
            </h3>
            <p className="mt-3 text-sm leading-6 text-gray-200 font-inter">
              {submissionResult === 'success'
                ? 'Thank you for reaching out. I have received your message and will get back to you soon.'
                : 'Something went wrong while sending your message. Please try again in a moment.'}
            </p>
            <button
              type="button"
              onClick={() => setSubmissionResult(null)}
              className="mt-6 rounded-md bg-indigo-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Contact; 
