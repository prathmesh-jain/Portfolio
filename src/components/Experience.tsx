import React from 'react'
import { motion } from 'motion/react'

interface ExperienceItem {
  company: string
  role: string
  team: string
  duration: string
  description: string
  techStack: string[]
  logo?: string
}

const workExperience: ExperienceItem[] = [
  {
    company: 'Tata Consultancy Services (TCS)',
    role: 'Full Stack AI Engineer',
    team: 'BFSI Americas · Research & Innovation',
    duration: 'Oct 2024 - Present',
    description:
      'Building production-grade AI systems and full-stack applications within the BFSI Americas CTO team. I design stateful, multi-step agentic workflows with LangChain, LangGraph, and CrewAI, integrate real-time search and web automation exposed through MCP, and ship RAG-backed FastAPI services behind React frontends with strong reliability, monitoring, and cost controls.',
    techStack: [
      'React.js',
      'TypeScript',
      'Python',
      'FastAPI',
      'LangChain',
      'LangGraph',
      'CrewAI',
      'RAG',
      'MCP',
      'Playwright',
      'SSE',
    ],
    logo: '/images/tcs.webp',
  },
]

const Experience: React.FC = () => {
  return (
    <section id='experience' className='relative px-5 pb-12 pt-18 md:px-10 xl:px-20'>
      <div className='mx-auto max-w-7xl'>
        <div className='max-w-3xl text-left'>
          <div className='section-kicker'>Experience</div>
          <h2 className='section-title mt-4 font-poppins text-4xl font-semibold tracking-[-0.03em] sm:text-5xl'>
            Experience grounded in shipping usable systems.
          </h2>
          <p className='section-copy mt-5 text-base leading-8 sm:text-lg'>
            My current role combines full-stack product development, applied AI systems, and the UX details that make
            complex tools easier to use.
          </p>
        </div>

        <div className='relative mt-10'>
          <div
            className='absolute left-4 top-0 hidden h-full w-px sm:block'
            style={{ background: 'linear-gradient(180deg, transparent, var(--border-strong), transparent)' }}
          />

          {workExperience.map((experience, index) => (
            <motion.article
              key={experience.company}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className='relative mb-8 sm:pl-14'
            >
              <div
                className='absolute left-[0.38rem] top-8 hidden h-5 w-5 rounded-full sm:block'
                style={{
                  background: 'var(--bg)',
                  border: '4px solid var(--accent)',
                  boxShadow: '0 0 0 8px var(--accent-soft)',
                }}
              />

              <div className='glass-panel rounded-4xl p-6 text-left sm:p-8'>
                <div className='flex flex-col gap-5 md:flex-row md:items-start md:justify-between'>
                  <div className='flex items-center gap-4'>
                    {experience.logo && (
                      <div
                        className='flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl'
                        style={{ background: 'var(--surface-soft)', border: '1px solid var(--border)' }}
                      >
                        <img src={experience.logo} alt={experience.company} className='h-full w-full object-cover' />
                      </div>
                    )}

                    <div>
                      <h3 className='font-poppins text-2xl font-semibold' style={{ color: 'var(--text-primary)' }}>
                        {experience.role}
                      </h3>
                      <p className='mt-1 text-sm font-medium sm:text-base' style={{ color: 'var(--text-secondary)' }}>
                        {experience.company}
                      </p>
                      <p className='mt-1 text-xs uppercase tracking-[0.2em] sm:text-sm' style={{ color: 'var(--text-soft)' }}>
                        {experience.team}
                      </p>
                    </div>
                  </div>

                  <div className='tag-chip w-fit rounded-full px-4 py-2 text-xs font-semibold sm:text-sm'>
                    {experience.duration}
                  </div>
                </div>

                <p className='mt-6 text-sm leading-8 sm:text-base' style={{ color: 'var(--text-muted)' }}>
                  {experience.description}
                </p>

                <div className='mt-6 flex flex-wrap gap-2'>
                  {experience.techStack.map((tech) => (
                    <span key={tech} className='tag-chip rounded-full px-3 py-1 text-xs font-medium sm:text-sm'>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
