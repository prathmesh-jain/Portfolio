const workExperience = [
    {
        company: "Tata Consultancy Services (TCS)",
        role: "Full Stack GenAI Engineer",
        team: "BFSI Americas · Research & Innovation",
        duration: "Oct 2024 - Present",
        description:
            "Building production-grade GenAI systems and full-stack applications within the BFSI Americas CTO team. I design stateful, multi-step agentic workflows with LangChain, LangGraph, and CrewAI, integrate real-time search and web automation exposed through MCP, and ship RAG-backed FastAPI services behind React frontends with strong reliability, monitoring, and cost controls.",
        techStack: [
            "React.js",
            "TypeScript",
            "Python",
            "FastAPI",
            "LangChain",
            "LangGraph",
            "CrewAI",
            "RAG",
            "MCP",
            "Playwright",
            "Server-Sent Events (SSE)",
        ],
        logo: "/images/tcs.webp",
    },
    // Add more experiences here in the future
];

export default function Work() {
    return (
        <section className="relative py-12 sm:scroll-mt-0 scroll-mt-60 overflow-hidden" id="experience">
            <div className='absolute inset-0 pointer-events-none'>
                <div className='absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-3xl ' />
                <div className='absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-fuchsia-600/10 blur-3xl ' />
                <div className='absolute inset-0 bg-gradient-to-b from-indigo-950/10 via-transparent to-transparent' />
            </div>

            <div className="relative mx-auto xl:px-20 lg:px-15 md:px-10 px-5">
                <h1 className="md:text-5xl text-4xl font-bold text-indigo-100 my-16 text-left w-full font-poppins pl-10">Experience</h1>
                <div className="relative xl:px-10 lg:px-5 md:px-2 w-full lg:w-2/3 py-5 mx-auto">
                    {/* Timeline vertical line with gradient */}
                    <div className="absolute xl:left-[26px] lg:left-[14px] md:left-[10px] left-[2px] top-0 h-full w-1 bg-gradient-to-b from-indigo-700 via-indigo-900 to-gray-800 rounded-full z-0" />
                    {workExperience.map((exp, idx) => (
                        <div key={idx} className="mb-16 relative group">
                            {/* Animated Timeline dot */}
                            <span className="absolute xl:-left-6 lg:-left-4 md:-left-2 -left-2 top-8 w-6 h-6 bg-gray-950 border-4 border-indigo-500 group-hover:border-indigo-700 transition-all duration-300 rounded-full shadow-lg flex items-center justify-center z-[9]">
                                <span className={`block w-2.5 h-2.5 bg-indigo-500 group-hover:bg-indigo-700 rounded-full ${idx === 0 ? 'animate-pulse' : ''}`}></span>
                            </span>
                            <div className="ml-8 bg-gray-900 rounded-2xl shadow-xl border-t-4 border-indigo-500 group-hover:border-indigo-700 transition-all duration-300 p-8 hover:scale-[1.025] hover:shadow-2xl relative">
                                {/* Company logo placeholder */}
                                <div className="absolute -top-8 left-8 w-16 h-16  bg-indigo-950 rounded-full flex items-center justify-center shadow-md border-2 border-indigo-800 overflow-hidden">
                                    {exp.logo && <img src={exp.logo} alt={exp.company} className="object-contain" />}
                                    {/* <span className=" text-indigo-300 font-bold text-lg">{exp.company.split(' ')[0]}</span> */}
                                </div>
                                <div className="pt-8">
                                    <h2 className="md:text-2xl text-xl font-bold  text-indigo-300 mb-1 flex items-center gap-2">
                                        {exp.company}
                                    </h2>
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-2">
                                        <span className="md:text-lg text-base font-semibold  text-gray-200 whitespace-nowrap">{exp.role}</span>
                                        <span className="md:text-sm text-xs  text-gray-400">{exp.team}</span>
                                        <span className="md:text-sm text-xs text-gray-500">{exp.duration}</span>
                                    </div>
                                    <p className="text-gray-300 mb-4 leading-relaxed text-sm  text-justify">{exp.description}</p>
                                    <div className="flex flex-wrap gap-3 mt-2">
                                        {exp.techStack.map((tech) => (
                                            <span key={tech} className=" bg-indigo-900 text-indigo-200 px-4 py-1 rounded-full text-xs font-semibold shadow-sm border  border-indigo-800">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
} 