import { useEffect, useRef, useState } from 'react'
import { FaGithub } from "react-icons/fa";

const Home = () => {
    const idleTimerRef = useRef(null);
    const lastMoveRef = useRef(0);
    const targetTiltRef = useRef({ rx: 0, ry: 0, gx: 50, gy: 35 });
    const [tilt3d, setTilt3d] = useState({ rx: 0, ry: 0, gx: 50, gy: 35 });

    useEffect(() => {
        const lerp = (a, b, t) => a + (b - a) * t;
        let animId = 0;

        const tick = () => {
            setTilt3d((prev) => {
                const target = targetTiltRef.current;
                const next = {
                    rx: lerp(prev.rx, target.rx, 0.12),
                    ry: lerp(prev.ry, target.ry, 0.12),
                    gx: lerp(prev.gx, target.gx, 0.18),
                    gy: lerp(prev.gy, target.gy, 0.18),
                };

                if (
                    Math.abs(next.rx - prev.rx) < 0.001 &&
                    Math.abs(next.ry - prev.ry) < 0.001 &&
                    Math.abs(next.gx - prev.gx) < 0.01 &&
                    Math.abs(next.gy - prev.gy) < 0.01
                ) {
                    return prev;
                }

                return next;
            });

            animId = requestAnimationFrame(tick);
        };

        animId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(animId);
    }, []);

    useEffect(() => {
        idleTimerRef.current = setInterval(() => {
            const now = Date.now();
            if (now - lastMoveRef.current < 400) return;

            const t = now / 1000;
            targetTiltRef.current = {
                rx: Math.sin(t * 0.9) * 1.6,
                ry: Math.cos(t * 0.7) * 2.2,
                gx: 50 + Math.sin(t * 0.6) * 8,
                gy: 35 + Math.cos(t * 0.6) * 6,
            };
        }, 80);

        return () => {
            if (idleTimerRef.current) clearInterval(idleTimerRef.current);
        };
    }, []);

    const handleCardMove = (e) => {
        if (e.pointerType === 'touch') return;
        lastMoveRef.current = Date.now();
        const el = e.currentTarget;

        const rect = el.getBoundingClientRect();

        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const dx = (x - 0.5) * 2;
        const dy = (y - 0.5) * 2;

        const next = {
            rx: -dy * 25,
            ry: dx * 34,
            gx: Math.max(0, Math.min(100, x * 100)),
            gy: Math.max(0, Math.min(100, y * 100)),
        };

        targetTiltRef.current = next;
    };

    const handleCardLeave = () => {
        lastMoveRef.current = 0;
        targetTiltRef.current = { rx: 0, ry: 0, gx: 50, gy: 35 };
    };

    const cardRotateX = tilt3d.rx;
    const cardRotateY = tilt3d.ry;

    return (
        <section
            className='relative overflow-hidden pb-5 min-h-[calc(100svh-90px)] md:h-[calc(100vh-90px)]'
            onPointerMove={handleCardMove}
            onPointerLeave={handleCardLeave}
        >
            <div className='absolute inset-0 bg-custom-bg' />

            <div
                className='absolute inset-0 opacity-35 anim-gradient'
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
            <div className='absolute -top-28 -left-28 h-[360px] w-[360px] rounded-full bg-indigo-600/20 blur-3xl anim-float' />
            <div className='absolute -bottom-28 -right-28 h-[420px] w-[420px] rounded-full bg-fuchsia-600/10 blur-3xl anim-float-rev' />

            <div className='relative mx-auto w-full xl:px-20 md:px-10 px-5 py-6 flex items-center min-h-[calc(100svh-90px)] md:h-[calc(100vh-90px)]'>
                <div className='flex flex-col-reverse items-center gap-10 md:flex-row'>
                    <div className='text-left'>

                        <h1 className='mt-5 font-poppins font-extrabold tracking-tight text-[clamp(2.2rem,4vw,3.3rem)] leading-[1.05]'>
                            Hi, I'm <span className='text-indigo-400'>Prathmesh Jain</span>.
                            <span className='block text-indigo-100'>I build fast, modern web apps.</span>
                        </h1>

                        <p className='mt-4 max-w-xl text-sm sm:text-base text-gray-300 font-inter leading-relaxed'>
                            I'm a developer who loves shipping clean UI, reliable APIs, and polished user experiences. Explore my work and let's build something impactful.
                        </p>

                        <div className='mt-6 flex flex-col sm:flex-row sm:items-center gap-4'>

                            <a
                                href='/Prathmesh_Jain_Resume.pdf'
                                download='Prathmesh_Jain_Resume.pdf'
                                className='inline-flex justify-center items-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors'
                            >
                                Download Resume
                            </a>

                            {/* <a
                                href='#projects'
                                className='inline-flex justify-center items-center rounded-xl border border-indigo-400/30 bg-black/20 px-5 py-3 text-sm font-semibold text-indigo-100 hover:bg-indigo-500/10 transition-colors'
                            >
                                View Projects
                            </a> */}

                            <a
                                href='https://github.com/prathmesh-jain'
                                target='_blank'
                                rel='noreferrer'
                                className='inline-flex justify-center items-center gap-2 rounded-xl border border-indigo-400/30 bg-black/20 px-5 py-3 text-sm font-semibold text-indigo-100 hover:bg-indigo-500/10 transition-colors'
                            >
                                GitHub <FaGithub size={18} />
                            </a>
                        </div>

                    </div>

                    <div className='relative mx-auto w-full max-w-[clamp(340px,33vw,620px)]'>
                        <div className='absolute -top-8 -left-6 h-16 w-16 rounded-3xl bg-indigo-500/10 blur-xl anim-float' />
                        <div className='absolute -bottom-10 -right-6 h-20 w-20 rounded-3xl bg-fuchsia-500/10 blur-xl anim-float-rev' />

                        <div
                            className='relative rounded-3xl border border-indigo-400/20 bg-gradient-to-b from-white/5 to-transparent p-5 shadow-[0_0_70px_rgba(99,102,241,0.22)] transition-transform duration-300 ease-out'
                            style={{
                                transform: `rotateX(${cardRotateX}deg) rotateY(${cardRotateY}deg)`,
                                transformStyle: 'preserve-3d',
                                willChange: 'transform',
                                perspective: 1000,
                            }}
                        >
                            <div
                                className='absolute -inset-10 rounded-[40px] opacity-55 blur-2xl anim-spin-slow'
                                style={{
                                    background:
                                        'conic-gradient(from 180deg at 50% 50%, rgba(99,102,241,0.38), rgba(236,72,153,0.22), rgba(168,85,247,0.26), rgba(99,102,241,0.38))',
                                }}
                            />
                            <div className='absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-600/10 via-transparent to-fuchsia-600/10' />
                            <div
                                className='absolute inset-0 rounded-3xl pointer-events-none'
                                style={{
                                    background: `radial-gradient(600px circle at ${tilt3d.gx}% ${tilt3d.gy}%, rgba(255,255,255,0.22), transparent 45%)`,
                                    mixBlendMode: 'overlay',
                                }}
                            />
                            <div
                                className='absolute inset-0 rounded-3xl pointer-events-none opacity-70 anim-holo'
                                style={{
                                    backgroundImage:
                                        'linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.14) 18%, transparent 38%, rgba(255,255,255,0.10) 55%, transparent 78%)',
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
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home