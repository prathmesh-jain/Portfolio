import { useRef, useState } from 'react'
import SVGComponent from './SvgComponent'

const Skills = () => {

  const coreStack = [
    { name: 'React', icon: '/icons/React-Dark.svg' },
    { name: 'Tailwind', icon: '/icons/TailwindCSS-Dark.svg' },
    { name: 'Node.js', icon: '/icons/NodeJS-Dark.svg' },
    { name: 'FastAPI', icon: '/icons/FastAPI.svg' },
    { name: 'MongoDB', icon: '/icons/MongoDB.svg' },
  ];

  const skillGroups = [
    {
      title: 'Frontend',
      description: 'UI engineering, components, state, and responsive design.',
      items: [
        { name: 'React', icon: '/icons/React-Dark.svg' },
        { name: 'Redux', icon: '/icons/Redux.svg' },
        { name: 'Tailwind', icon: '/icons/TailwindCSS-Dark.svg' },
        { name: 'HTML', icon: '/icons/HTML.svg' },
        { name: 'CSS', icon: '/icons/CSS.svg' },
        { name: 'JavaScript', icon: '/icons/JavaScript.svg' },
        { name: 'TypeScript', icon: '/icons/TypeScript.svg' },
        { name: 'React Native', icon: '/icons/React-Dark.svg' },
      ],
    },
    {
      title: 'Backend & APIs',
      description: 'APIs, auth, data flow, and production-ready services.',
      items: [
        { name: 'Node.js', icon: '/icons/NodeJS-Dark.svg' },
        { name: 'Express', icon: '/icons/ExpressJS-Dark.svg' },
        { name: 'FastAPI', icon: '/icons/FastAPI.svg' },
        { name: 'Flask', icon: '/icons/Flask-Dark.svg' },
      ],
    },
    {
      title: 'AI/LLM',
      description: 'Agentic AI workflows, RAG pipelines, and production LLM integration.',
      items: [
        { name: 'Langchain', icon: '/icons/langchain.png' },
        { name: 'Langgraph', icon: '/icons/langgraph.png' },
        { name: 'CrewAI', icon: '/icons/crewai.png' },
        { name: 'RAG' },
        { name: 'MCP' },
      ],
    },
    {
      title: 'Databases',
      description: 'Schema design, queries, and persistence layers.',
      items: [
        { name: 'MongoDB', icon: '/icons/MongoDB.svg' },
        { name: 'MySQL', icon: '/icons/MySQL-Dark.svg' },
      ],
    },
    {
      title: 'Languages',
      description: 'Core problem solving and backend fundamentals.',
      items: [
        { name: 'Java', icon: '/icons/Java-Dark.svg' },
        { name: 'Python', icon: '/icons/Python-Dark.svg' },
        { name: 'JavaScript', icon: '/icons/JavaScript.svg' },
      ],
    },
    {
      title: 'Tooling',
      description: 'Version control, collaboration, and daily workflow.',
      items: [
        { name: 'GitHub', icon: '/icons/Github-Dark.svg' },
        { name: 'VS Code', icon: '/icons/VSCode-Dark.svg' },
      ],
    }
  ];

  const SkillChip = ({ skill }) => (
    <div className='group/chip inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-left transition-colors hover:bg-black/35'>
      {skill.icon && <img src={skill.icon} alt={skill.name} className='h-6 w-6' />}
      <span className='text-xs font-semibold text-indigo-100 font-inter'>{skill.name}</span>
    </div>
  );

  const TiltCard = ({ title, description, items }) => {
    const raf = useRef(null);
    const [tilt3d, setTilt3d] = useState({ rx: 0, ry: 0, gx: 50, gy: 35 });

    const onMove = (e) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const dx = (x - 0.5) * 2;
      const dy = (y - 0.5) * 2;

      const next = {
        rx: -dy * 7,
        ry: dx * 9,
        gx: Math.max(0, Math.min(100, x * 100)),
        gy: Math.max(0, Math.min(100, y * 100)),
      };

      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => setTilt3d(next));
    };

    const onLeave = () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      setTilt3d({ rx: 0, ry: 0, gx: 50, gy: 35 });
    };

    return (
      <div
        className='group relative rounded-3xl border border-indigo-400/15 bg-gradient-to-b from-white/5 to-transparent p-6 shadow-[0_0_34px_rgba(99,102,241,0.08)] transition-transform duration-150 hover:border-indigo-400/30'
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          transform: `rotateX(${tilt3d.rx}deg) rotateY(${tilt3d.ry}deg)`,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          perspective: 1000,
        }}
      >
        <div className='absolute -top-10 -right-10 h-28 w-28 rounded-full bg-indigo-600/10 blur-3xl anim-float pointer-events-none' />
        <div
          className='absolute inset-0 rounded-3xl pointer-events-none'
          style={{
            background: `radial-gradient(650px circle at ${tilt3d.gx}% ${tilt3d.gy}%, rgba(255,255,255,0.16), transparent 45%)`,
            mixBlendMode: 'overlay',
          }}
        />

        <div className='relative flex items-start justify-between gap-4' style={{ transform: 'translateZ(14px)' }}>
          <div className='text-left'>
            <div className='text-lg font-semibold text-indigo-100 font-poppins'>{title}</div>
            <div className='mt-1 text-xs text-gray-400 font-inter'>{description}</div>
          </div>
        </div>

        <div className='relative mt-5 flex flex-wrap gap-2' style={{ transform: 'translateZ(10px)' }}>
          {items.map((skill) => (
            <SkillChip key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className='relative w-full pt-10 sm:scroll-mt-0 scroll-mt-60 overflow-hidden pb-10' style={{ minHeight: "calc(100vh -90px)" }} id='skills'>
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-3xl anim-float' />
        <div className='absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-fuchsia-600/10 blur-3xl anim-float-rev' />
        <div className='absolute inset-0 bg-gradient-to-b from-indigo-950/10 via-transparent to-transparent' />
      </div>

      <div className='relative flex items-center w-full mt-16 flex-col xl:px-20 md:px-10 px-5 py-1'>
        <div className='w-full pl-2 sm:pl-10 text-left'>
          <h1 className='mt-5 md:text-5xl text-4xl font-bold text-indigo-100 box-border font-poppins tracking-wide'>Skills</h1>
          <p className='mt-3 max-w-2xl text-sm sm:text-base text-gray-300 font-inter leading-relaxed'>
            Frontend, backend, databases, and tooling - grouped the way projects are actually built.
          </p>

          <div className='mt-6'>
            <div className='text-xs font-semibold text-gray-400 font-inter'>Core stack</div>
            <div className='mt-3 flex flex-wrap gap-2'>
              {coreStack.map((skill) => (
                <SkillChip key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        </div>

        <div className='mt-10 flex w-full items-start gap-8'>
          <div className='lg:flex-[0.45] hidden lg:block'>
            <SVGComponent />
          </div>

          <div className='flex-1'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {skillGroups.map((group) => (
                <TiltCard key={group.title} title={group.title} description={group.description} items={group.items} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills