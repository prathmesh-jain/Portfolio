import { FaHome} from "react-icons/fa";
import { useRef, useState } from 'react';
import { sendForm } from '@emailjs/browser/es/methods/sendForm/sendForm.js';


const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  
  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when email sending starts
    sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form.current, EMAILJS_PUBLIC_KEY)
      .then(() => {
        alert('Email Sent!');
        e.target.reset();
        setStatus('success'); // Set status to success
        setTimeout(() => {
          setStatus(null)
        }, 3000);
      })
      .catch((error) => {
        console.error('Email sending failed:', error);
        alert('Failed to send email. Please try again later.');
        setStatus('error'); // Set status to error
      })
      .finally(() => {
        setLoading(false); // Set loading to false when email sending finishes (success or error)
      });
  };

  return (
    <section className="relative h-fit w-full flex justify-center bg-custom-bg py-12 pt-16 px-2 scroll-mt-72 sm:scroll-mt-16 overflow-hidden" id="contact">
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-3xl anim-float' />
        <div className='absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-fuchsia-600/10 blur-3xl anim-float-rev' />
        <div className='absolute inset-0 bg-gradient-to-b from-indigo-950/10 via-transparent to-transparent' />
      </div>
      <div className="lg:w-3/4 w-full bg-custom-bg rounded-xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left: Info */}
        <div className="relative flex flex-col justify-between p-10 bg-gradient-to-br from-[#181534] to-[#291c36]">
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
          <div className="relative z-[9]">
            <h2 className="text-3xl md:text-3xl font-semibold text-white mb-4 font-poppins">Let's Connect!</h2>
            <p className="text-gray-300 mb-8 max-w-md text-base text-justify font-inter">I'm always open to new opportunities, collaborations, or a friendly chat about tech. Drop me a message and I'll get back to you soon!</p>
            <ul className="space-y-6 text-gray-200">
              <li className="flex items-center gap-3">
                {/* Address Icon */}
                <FaHome className='text-indigo-300' />
                <span>
                  Mumbai, Maharashtra, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                {/* Social Links */}
                <span className='text-indigo-300 font-bold'>Socials:</span>
                <a href="https://www.linkedin.com/in/prathmeshjain22" target="_blank" className="text-indigo-400 hover:text-indigo-200 underline">
                  <img src="/icons/LinkedIn.svg" alt="" className='w-6 h-6' />
                </a>
                <a href="https://github.com/pratsj22" target="_blank" className="text-indigo-400 hover:text-indigo-200 underline">
                  <img src="/icons/Github-Dark.svg" alt="" className='w-6 h-6' />
                </a>
                <a href="https://leetcode.com/spider_22/" target="_blank" className="text-indigo-400 hover:text-indigo-200 underline">
                  <div className='bg-gray-950 rounded p-1 w-6 h-6'>
                    <img src="/icons/leetcode.png" alt="" className=' rounded w-full h-full' />
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* Right: Form */}
        <form ref={form} onSubmit={sendEmail} className="relative flex flex-col justify-center text-left p-10 bg-gradient-to-tr from-[#291b3c] to-[#191432]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-semibold text-gray-200 mb-1 pl-1">First name</label>
              <input type="text" id="firstName" name="firstName" autoComplete='given-name' required className="w-full rounded-md border border-none bg-gradient-to-tr from-[#241d49] to-[#281b47] text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-semibold text-gray-200 mb-1 pl-1">Last name</label>
              <input type="text" id="lastName" name="lastName" autoComplete='family-name' className="w-full rounded-md border border-none bg-gradient-to-tr from-[#241d49] to-[#281b47] text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="user_email" className="block text-sm font-semibold text-gray-200 mb-1 pl-1">Email</label>
            <input type="email" id="user_email" name="user_email" autoComplete='email' required className="w-full rounded-md border border-none bg-gradient-to-tr from-[#241d49] to-[#281b47] text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
          </div>
          <div className="mt-6">
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-200 mb-1 pl-1">Phone number</label>
            <input type="tel" id="phone" name="phone" autoComplete='tel' className="w-full rounded-md border border-none bg-gradient-to-tr from-[#241d49] to-[#281b47] text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
          </div>
          <div className="mt-6">
            <label htmlFor="message" className="block text-sm font-semibold text-gray-200 mb-1 pl-1">Message</label>
            <textarea id="message" name="message" rows="4" autoComplete='off' required className="w-full resize-none rounded-md border border-none bg-gradient-to-tr from-[#241d49] to-[#281b47] text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
          </div>
          <div className="flex justify-end mt-8">
            <button type="submit" disabled={loading} className="bg-violet-900 hover:bg-violet-600 text-white font-semibold px-6 py-2 rounded-md transition focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? 'Sending...' : 'Send message'}
            </button>
          </div>
          {status === 'success' && <p className="text-green-400 mt-2">Message sent successfully!</p>}
          {status === 'error' && <p className="text-red-400 mt-2">Something went wrong. Please try again.</p>}
        </form>
      </div>
    </section>
  );
};

export default Contact; 