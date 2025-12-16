import { useEffect, useState } from 'react'
import { FaGithub } from "react-icons/fa";
const Home = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scroll = window.scrollY;
            setScrollY(scroll);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Clamp values between desired ranges

    const scale = Math.max(0, (scrollY / 1000) * 60); // down to 0.8
    const opacity = Math.min(0.3, 1 - scrollY / 600); // down to 0.3
    return (
        <div className='relative [perspective:1000px] overflow-hidden'>
            <div className='[transform-style:preserve-3d]' style={{ transform: `rotateX(-${scale * 1.25}deg)`, borderBottomRightRadius: 60, borderBottomLeftRadius: 60, boxShadow: `0px 0px ${scale * 5}px oklch(48.8% 0.243 264.376)` }}>
                <div>
                    <img src="/images/home_bg.jpeg" alt="" className='w-screen mt-1 mask-home-image h-[650px]' style={{ opacity, borderBottomRightRadius: 60, borderBottomLeftRadius: 60 }} />
                </div>
                <div className='absolute sm:top-[10%] top-32 flex w-full items-center justify-center flex-col gap-4 sm:px-5 sm:mt-10'>
                    <div className="flex flex-col md:text-5xl sm:text-3xl text-[1.7rem] sm:font-sans font-poppins tracking-wide !leading-normal text-indigo-500 text-center mx-auto font-extrabold my-10">
                        <div className=' sm:block animate-enter'>Hi👋, myself <span className='span'>Prathmesh,</span></div>
                        <span className=' sm:block animate-enter opacity-0 [animation-delay:_0.5s]'>I'm a Software Developer.</span>
                    </div>
                    <div className='flex gap-10 animate-enter opacity-0 [animation-delay:_1.5s]'>
                        <a
                            href="/Prathmesh_Jain_Resume.pdf"
                            download="Prathmesh_Jain_Resume.pdf"
                            className="flex items-center rounded-md border-indigo-600 border-2 text-sm px-3.5 py-2.5 font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-black/30"
                        >
                            Download Resume
                        </a>
                        <a
                            href="https://github.com/pratsj22"
                            target='blank'
                            className="flex gap-1 items-center rounded-md border-indigo-600 border-2 text-sm px-3.5 py-2.5 font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-black/30"
                        >
                            Visit GitHub <FaGithub size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Home