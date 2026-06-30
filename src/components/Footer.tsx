import React from 'react'
import { motion } from 'motion/react'

const Footer: React.FC = () => {
  return (
    <footer className='relative px-5 pb-8 pt-6 md:px-10 xl:px-20'>
      <div className='mx-auto max-w-7xl'>
        <div className='glass-panel rounded-[2rem] px-6 py-6 sm:px-8'>
          <div className='flex flex-col gap-5 text-left sm:flex-row sm:items-center sm:justify-between'>
            <div>
              <p className='font-poppins text-lg font-semibold' style={{ color: 'var(--text-primary)' }}>
                Prathmesh Jain
              </p>
              <p className='mt-2 text-sm leading-7' style={{ color: 'var(--text-muted)' }}>
                Built with React, Tailwind, Motion, and a cleaner visual system.
              </p>
            </div>

            <div className='flex items-center gap-3'>
              <motion.div
                whileHover={{ y: -2, rotate: 6 }}
                transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                className='icon-shell icon-shell--md'
              >
                <img src='/icons/react-icon.png' alt='React' className='h-8 w-8 object-contain' />
              </motion.div>
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                className='icon-shell icon-shell--md'
              >
                <img src='/icons/tailwind.png' alt='Tailwind CSS' className='h-5 w-8 object-contain' />
              </motion.div>
            </div>
          </div>

          <div
            className='mt-6 flex flex-col gap-3 border-t pt-5 text-sm sm:flex-row sm:items-center sm:justify-between'
            style={{ borderColor: 'var(--border)' }}
          >
            <p style={{ color: 'var(--text-soft)' }}>© 2026 Prathmesh Jain. All rights reserved.</p>
            <a
              href='https://storyset.com/coding'
              target='_blank'
              rel='noopener noreferrer'
              className='text-sm'
              style={{ color: 'var(--text-soft)' }}
            >
              Coding illustrations by Storyset
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
