import React from 'react'
import { FaArrowRight, FaGithub } from 'react-icons/fa'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'

const Home: React.FC = () => {
    const x = useMotionValue(0.5);
    const y = useMotionValue(0.5);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })

    const rotateX = useTransform(mouseYSpring, [0, 1], [14, -14])
    const rotateY = useTransform(mouseXSpring, [0, 1], [-16, 16])
    const backgroundX = useTransform(mouseXSpring, [0, 1], ['0%', '100%'])
    const backgroundY = useTransform(mouseYSpring, [0, 1], ['0%', '100%'])

    const handleMouseMove = (e: React.MouseEvent | React.PointerEvent) => {
        const rect = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - rect.left) / rect.width)
        y.set((e.clientY - rect.top) / rect.height)
    }

    const handleMouseLeave = () => {
        x.set(0.5)
        y.set(0.5)
    }

    return (
        <section
            id='home'
            className='relative overflow-hidden px-5 pb-6 pt-8 md:px-10 xl:px-20'
            onPointerMove={handleMouseMove}
            onPointerLeave={handleMouseLeave}
        >
            <div className='mx-auto flex min-h-[calc(100svh-var(--nav-height))] max-w-7xl items-center'>
                <div className='grid w-full items-center gap-8 py-6 lg:grid-cols-[1.02fr_0.98fr] lg:py-8'>
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className='order-2 lg:order-1 text-left'
                    >
                        <div className='section-kicker'>Full Stack Developer · AI Engineer</div>
                        <h1 className='section-title mt-4 max-w-3xl font-poppins font-semibold leading-[0.98] tracking-[-0.04em] text-[1.8rem] sm:text-[3.2rem] md:text-[3.6rem] lg:text-[3.5rem]'>
                            Hi, I&apos;m Prathmesh Jain.
                            <span className='block' style={{ color: 'var(--text-secondary)' }}>
                                I build full-stack products
                            </span>
                            <span className='block' style={{ color: 'var(--accent-strong)' }}>
                                with polished, practical UX.
                            </span>
                        </h1>

                        <p className='section-copy mt-5 max-w-2xl md:max-w-4xl text-sm leading-7 sm:text-base sm:leading-8 md:text-lg md:leading-9 lg:text-lg lg:leading-8 xl:leading-9'>
                            I work across React, FastAPI, Python, and applied AI to ship products that feel smooth to use
                            and solid under the hood. I care about clean interfaces, reliable backend systems, and motion
                            that adds clarity instead of noise.
                        </p>

                        <div className='mt-7 flex flex-col gap-3 sm:flex-row sm:items-center'>
                            <motion.a
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                href='/Prathmesh_Jain_Resume.pdf'
                                download='Prathmesh_Jain_Resume.pdf'
                                className='accent-button inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold'
                            >
                                Download Resume
                                <FaArrowRight size={12} />
                            </motion.a>

                            <motion.a
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                href='https://github.com/prathmesh-jain'
                                target='_blank'
                                rel='noreferrer'
                                className='secondary-button inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold'
                            >
                                GitHub
                                <FaGithub size={16} />
                            </motion.a>
                        </div>

                        <div className='mt-8 flex flex-wrap sm:gap-3 gap-2 text-[11px] sm:text-sm'>
                            {['React + TypeScript', 'FastAPI + Python', 'AI workflows'].map((item) => (
                                <span key={item} className='tag-chip rounded-full sm:px-4 px-3 py-2 font-medium'>
                                    {item}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.75, delay: 0.1 }}
                        className='relative order-1 lg:order-2 mx-auto w-10/11 max-w-md lg:w-full lg:max-w-120'
                    >
                        <motion.div
                            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                            className='glass-panel relative rounded-4xl p-4 sm:p-5'
                        >
                            <div
                                className='pointer-events-none absolute -inset-10 rounded-[2.75rem] opacity-70 blur-3xl'
                                style={{
                                    background:
                                        'conic-gradient(from 160deg at 50% 50%, transparent 0deg, var(--accent-glow) 80deg, transparent 180deg, rgba(255,255,255,0.05) 240deg, transparent 360deg)',
                                }}
                            />

                            <motion.div
                                className='pointer-events-none absolute inset-0 rounded-4xl'
                                style={{
                                    background: useTransform(
                                        [backgroundX, backgroundY],
                                        ([xValue, yValue]) =>
                                            `radial-gradient(520px circle at ${xValue} ${yValue}, rgba(255,255,255,0.16), transparent 46%)`
                                    ),
                                    mixBlendMode: 'overlay',
                                }}
                            />

                            <div className='relative aspect-10/11 overflow-hidden rounded-[1.6rem]' style={{ transform: 'translateZ(26px)' }}>
                                <img
                                    src='/profile.jpg'
                                    alt='Prathmesh Jain portrait'
                                    className='absolute inset-0 h-full w-full object-cover object-top'
                                />

                                <div
                                    className='glass-panel absolute left-3 top-3 rounded-2xl sm:px-4 px-3 sm:py-3 py-2 text-left sm:left-6 sm:top-6'
                                    style={{ transform: 'translateZ(34px)' }}
                                >
                                    <div className='sm:text-[11px] text-[9px] uppercase tracking-[0.22em]' style={{ color: 'var(--text-soft)' }}>
                                        Current Role
                                    </div>
                                    <div className='mt-1 font-poppins text-xs font-semibold sm:text-base' style={{ color: 'var(--text-primary)' }}>
                                        Full Stack AI Engineer @ TCS
                                    </div>
                                </div>

                                <div
                                    className='glass-panel absolute bottom-4 right-4 rounded-2xl sm:px-4 px-3 sm:py-3 py-2 text-left sm:bottom-6 sm:right-6'
                                    style={{ transform: 'translateZ(30px)' }}
                                >
                                    <div className='sm:text-[11px] text-[9px] uppercase tracking-[0.22em]' style={{ color: 'var(--text-soft)' }}>
                                        Shipping With
                                    </div>
                                    <div className='mt-1 font-poppins text-xs font-semibold sm:text-base' style={{ color: 'var(--text-primary)' }}>
                                        React, FastAPI, LangGraph
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Home
