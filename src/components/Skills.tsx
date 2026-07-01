import React, { useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'motion/react'

interface Skill {
  name: string
  icon?: string
}

interface SkillGroup {
  title: string
  description: string
  items: Skill[]
}

const coreStack: Skill[] = [
  { name: 'React', icon: '/icons/React-Dark.svg' },
  { name: 'Tailwind', icon: '/icons/TailwindCSS-Dark.svg' },
  { name: 'Node.js', icon: '/icons/NodeJS-Dark.svg' },
  { name: 'FastAPI', icon: '/icons/FastAPI.svg' },
  { name: 'MongoDB', icon: '/icons/MongoDB.svg' },
]

const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    description: 'React-first interfaces, responsive layouts, and state management that stay maintainable as features grow.',
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
    description: 'Backend services, clean API contracts, and application structure built for reliability.',
    items: [
      { name: 'Node.js', icon: '/icons/NodeJS-Dark.svg' },
      { name: 'Express', icon: '/icons/ExpressJS-Dark.svg' },
      { name: 'FastAPI', icon: '/icons/FastAPI.svg' },
      { name: 'Flask', icon: '/icons/Flask-Dark.svg' },
    ],
  },
  {
    title: 'AI & LLM Systems',
    description: 'Agentic workflows, RAG pipelines, and the tooling I use to build practical AI features.',
    items: [
      { name: 'LangChain', icon: '/icons/langchain.png' },
      { name: 'LangGraph', icon: '/icons/langgraph.png' },
      { name: 'CrewAI', icon: '/icons/crewai.png' },
      { name: 'RAG' },
      { name: 'MCP' },
    ],
  },
  {
    title: 'Data Layer',
    description: 'Persistence, schema design, and database choices that support product scale and clarity.',
    items: [
      { name: 'MongoDB', icon: '/icons/MongoDB.svg' },
      { name: 'PostgreSQL', icon: '/icons/PostgreSQL-Dark.svg' },
    ],
  },
  {
    title: 'Languages',
    description: 'The languages I rely on across frontend work, backend services, and AI-heavy implementations.',
    items: [
      { name: 'Java', icon: '/icons/Java-Dark.svg' },
      { name: 'Python', icon: '/icons/Python-Dark.svg' },
      { name: 'JavaScript', icon: '/icons/JavaScript.svg' },
      { name: 'TypeScript', icon: '/icons/TypeScript.svg' },
    ],
  },
  {
    title: 'Workflow',
    description: 'Everyday tools for shipping, reviewing, iterating, and keeping development fast.',
    items: [
      { name: 'GitHub', icon: '/icons/Github-Dark.svg' },
      { name: 'VS Code', icon: '/icons/VSCode-Dark.svg' },
    ],
  },
]

const SkillChip: React.FC<{ skill: Skill }> = ({ skill }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      type='button'
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 360, damping: 24 }}
      className='relative inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-left'
      style={{
        background: 'var(--chip-bg)',
        border: '1px solid var(--border)',
        color: 'var(--text-secondary)',
      }}
    >
      {skill.icon && (
        <span className='icon-shell icon-shell--sm'>
          <img src={skill.icon} alt={skill.name} className='h-[18px] w-[18px] object-contain' />
        </span>
      )}
      <span className='text-xs font-semibold'>{skill.name}</span>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className='pointer-events-none absolute bottom-[calc(100%+12px)] left-1/2 z-20 w-max -translate-x-1/2 rounded-2xl px-3 py-2'
            style={{
              background: 'var(--surface-strong)',
              border: '1px solid var(--border-strong)',
              boxShadow: '0 16px 42px var(--shadow-color)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <div className='flex items-center gap-2 whitespace-nowrap'>
              {skill.icon && (
                <span className='icon-shell icon-shell--sm'>
                  <img src={skill.icon} alt='' className='h-[18px] w-[18px] object-contain' />
                </span>
              )}
              <span className='text-sm font-semibold' style={{ color: 'var(--text-primary)' }}>
                {skill.name}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

const TiltCard: React.FC<SkillGroup> = ({ title, description, items }) => {
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const mouseXSpring = useSpring(x, { stiffness: 140, damping: 18 })
  const mouseYSpring = useSpring(y, { stiffness: 140, damping: 18 })
  const rotateX = useTransform(mouseYSpring, [0, 1], [5, -5])
  const rotateY = useTransform(mouseXSpring, [0, 1], [-6, 6])
  const backgroundX = useTransform(mouseXSpring, [0, 1], ['0%', '100%'])
  const backgroundY = useTransform(mouseYSpring, [0, 1], ['0%', '100%'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width)
    y.set((e.clientY - rect.top) / rect.height)
  }

  const handleMouseLeave = () => {
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className='glass-panel relative rounded-[2rem] p-6 text-left'
      transition={{ type: 'spring', stiffness: 180, damping: 22 }}
    >
      <motion.div
        className='pointer-events-none absolute inset-0 rounded-[2rem]'
        style={{
          background: useTransform(
            [backgroundX, backgroundY],
            ([xValue, yValue]) =>
              `radial-gradient(480px circle at ${xValue} ${yValue}, rgba(255,255,255,0.12), transparent 42%)`
          ),
        }}
      />

      <div className='relative' style={{ transform: 'translateZ(14px)' }}>
        <div className='section-kicker'>Specialty</div>
        <h3 className='mt-3 font-poppins text-2xl font-semibold section-title'>{title}</h3>
        <p className='section-copy mt-3 text-sm leading-7'>{description}</p>
      </div>

      <div className='relative mt-6 flex flex-wrap gap-2' style={{ transform: 'translateZ(10px)' }}>
        {items.map((skill) => (
          <SkillChip key={skill.name} skill={skill} />
        ))}
      </div>
    </motion.div>
  )
}

const Skills: React.FC = () => {
  return (
    <section id='skills' className='relative px-5 pb-12 pt-18 md:px-10 xl:px-20'>
      <div className='mx-auto max-w-7xl'>
        <div className='max-w-3xl text-left'>
          <div className='section-kicker'>Skill Stack</div>
          <h2 className='section-title mt-4 font-poppins text-4xl font-semibold tracking-[-0.03em] sm:text-5xl'>
            The tools I use most, grouped by how I actually work.
          </h2>
          <p className='section-copy mt-5 text-base leading-8 sm:text-lg'>
            Hover over a skill to preview it. This section is organized around real delivery work instead of becoming
            one long wall of logos.
          </p>
        </div>

        <div className='glass-panel mt-10 rounded-[2rem] p-5 text-left sm:p-6'>
          <div className='section-kicker'>Core Stack</div>
          <div className='mt-4 flex flex-wrap gap-3'>
            {coreStack.map((skill) => (
              <SkillChip key={skill.name} skill={skill} />
            ))}
          </div>
        </div>

        <div className='mt-8 grid grid-cols-1 gap-6 md:grid-cols-2'>
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
            >
              <TiltCard title={group.title} description={group.description} items={group.items} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
