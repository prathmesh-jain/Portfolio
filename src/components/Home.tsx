import React from 'react'
import { FaGithub } from "react-icons/fa";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

const Home: React.FC = () => {
    const x = useMotionValue(0.5);
    const y = useMotionValue(0.5);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [0, 1], [25, -25]);
    const rotateY = useTransform(mouseXSpring, [0, 1], [-34, 34]);

    const handleMouseMove = (e: React.MouseEvent | React.PointerEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        x.set(mouseX / width);
        y.set(mouseY / height);
    };

    const handleMouseLeave = () => {
        x.set(0.5);
        y.set(0.5);
    };

    const backgroundX = useTransform(mouseXSpring, [0, 1], ["0%", "100%"]);
    const backgroundY = useTransform(mouseYSpring, [0, 1], ["0%", "100%"]);

    return (
        <section
            className='relative overflow-hidden pb-5 min-h-[calc(100svh-90px)] md:h-[calc(100vh-90px)]'
            onPointerMove={handleMouseMove}
            onPointerLeave={handleMouseLeave}
        >
            <div className='absolute inset-0 bg-custom-bg' />

            <div
                className='absolute inset-0 opacity-35'
                style={{ backgroundImage: 'linear-gradient(120deg, rgba(99,102,241,0.18), rgba(168,85,247,0.10), rgba(236,72,153,0.10))' }}
            />
            <div className='absolute inset-0 bg-gradient-to-b from-indigo-950/40 via-transparent to-transparent' />
            <div
                className='absolute inset-0 opacity-[0.14] pointer-events-none'
                style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)',
                    backgroundSize: '26px 26px',
                }}
            />
            <div className='absolute -top-28 -left-28 h-[360px] w-[360px] rounded-full bg-indigo-600/20 blur-3xl' />
            <div className='absolute -bottom-28 -right-28 h-[420px] w-[420px] rounded-full bg-fuchsia-600/10 blur-3xl' />

            <div className='relative mx-auto w-full xl:px-20 md:px-10 px-5 py-6 flex items-center min-h-[calc(100svh-90px)] md:h-[calc(100vh-90px)]'>
                <div className='flex flex-col-reverse items-center gap-10 md:flex-row'>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className='text-left'
                    >
                        <h1 className='mt-5 font-poppins font-extrabold tracking-tight text-[clamp(2.2rem,4vw,3.3rem)] leading-[1.05]'>
                            Hi, I'm <span className='text-indigo-400'>Prathmesh Jain</span>.
                            <span className='block text-indigo-100'>I build fast, modern web apps.</span>
                        </h1>

                        <p className='mt-4 max-w-xl text-sm sm:text-base text-gray-300 font-inter leading-relaxed'>
                            I'm a developer who loves shipping clean UI, reliable APIs, and polished user experiences. Explore my work and let's build something impactful.
                        </p>

                        <div className='mt-6 flex flex-col sm:flex-row sm:items-center gap-4'>
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href='/Prathmesh_Jain_Resume.pdf'
                                download='Prathmesh_Jain_Resume.pdf'
                                className='inline-flex justify-center items-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors'
                            >
                                Download Resume
                            </motion.a>

                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href='https://github.com/prathmesh-jain'
                                target='_blank'
                                rel='noreferrer'
                                className='inline-flex justify-center items-center gap-2 rounded-xl border border-indigo-400/30 bg-black/20 px-5 py-3 text-sm font-semibold text-indigo-100 hover:bg-indigo-500/10 transition-colors'
                            >
                                GitHub <FaGithub size={18} />
                            </motion.a>
                        </div>
                    </motion.div>

                    <div className='relative mx-auto w-full max-w-[clamp(340px,33vw,620px)]'>
                        <motion.div
                            style={{
                                rotateX,
                                rotateY,
                                transformStyle: 'preserve-3d',
                            }}
                            className='relative rounded-3xl border border-indigo-400/20 bg-gradient-to-b from-white/5 to-transparent p-5 shadow-[0_0_70px_rgba(99,102,241,0.22)]'
                        >
                            <div
                                className='absolute -inset-10 rounded-[40px] opacity-55 blur-2xl anim-spin-slow'
                                style={{
                                    background:
                                        'conic-gradient(from 180deg at 50% 50%, rgba(99,102,241,0.38), rgba(236,72,153,0.22), rgba(168,85,247,0.26), rgba(99,102,241,0.38))',
                                }}
                            />
                            <motion.div
                                className='absolute inset-0 rounded-3xl pointer-events-none'
                                style={{
                                    background: useTransform(
                                        [backgroundX, backgroundY],
                                        ([xVal, yVal]) => `radial-gradient(600px circle at ${xVal} ${yVal}, rgba(255,255,255,0.22), transparent 45%)`
                                    ),
                                    mixBlendMode: 'overlay',
                                }}
                            />

                            <div className='relative rounded-2xl overflow-hidden bg-black/30' style={{ transform: 'translateZ(22px)' }}>
                                <img
                                    src='/profile.jpg'
                                    alt='Profile'
                                    className='w-full sm:h-[clamp(340px,60vh,620px)] h-[clamp(340px,50vh,520px)] object-cover object-top'
                                />

                                <div className='absolute left-4 top-4 rounded-2xl border border-white/10 bg-black/45 px-3 py-2' style={{ transform: 'translateZ(36px)' }}>
                                    <div className='text-[11px] text-gray-300 font-inter'>Currently</div>
                                    <div className='text-sm font-semibold text-indigo-100 font-poppins'>Full Stack GenAI Engineer @ TCS</div>
                                </div>

                                <div className='absolute right-4 bottom-4 rounded-2xl border border-white/10 bg-black/45 px-3 py-2' style={{ transform: 'translateZ(30px)' }}>
                                    <div className='text-[11px] text-gray-300 font-inter'>Building with</div>
                                    <div className='text-sm font-semibold text-indigo-100 font-poppins'>React • FastAPI • Python</div>
                                </div>
                            </div>

                            <div className='sm:flex hidden relative mt-4 flex-wrap gap-2 text-left' style={{ transform: 'translateZ(18px)' }}>
                                <span className='rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-semibold text-gray-200 font-inter'>Full-stack</span>
                                <span className='rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-semibold text-gray-200 font-inter'>UI polish</span>
                                <span className='rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-semibold text-gray-200 font-inter'>APIs</span>
                                <span className='rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-semibold text-gray-200 font-inter'>Performance</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home