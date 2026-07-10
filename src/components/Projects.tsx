import React, { useState } from 'react'
import ProjectModal from './ProjectModal'
import { AnimatePresence, motion } from 'motion/react'

export interface Project {
  title: string
  subtitle: string
  description: string
  highlights: string[]
  image: string
  tech: string[]
  links: {
    live: string
    github: string
  }
  gallery: string[]
}

const projectsData: Project[] = [
  {
    title: 'Transcribe',
    subtitle: 'AI Lecture Transcription Workspace',
    description:
      'Developed an AI-powered lecture transcription platform that converts long-form spiritual discourses into structured, searchable, and downloadable PDF transcripts. Built the complete application with a React.js frontend, FastAPI backend, Redis-powered asynchronous processing, and PostgreSQL for persistent storage. Implemented scalable audio processing, AI-powered transcript generation, and automated PDF creation while optimizing transcription quality for multilingual lectures and Sanskrit shlokas.',
    highlights: [
      'Built responsive interfaces for authentication, file uploads, transcription history, live processing status, and PDF downloads.',
      'Designed an asynchronous transcription pipeline using Redis queues, FFmpeg media conversion, silence detection, and chunked processing for efficient long-form audio processing.',
      'Improved transcription accuracy for multilingual pravachans and Sanskrit shlokas using Gemini, then generated structured HTML transcripts and downloadable PDFs for 50+ active users.',
    ],
    image: '/images/transcribe.png',
    tech: ['React.js', 'FastAPI', 'Redis', 'PostgreSQL', 'Gemini AI', 'FFmpeg'],
    links: {
      live: 'https://transcribe.contextcrafter.in',
      github: '',
    },
    gallery: [
      '/images/transcribe.png',
      '/images/transcribe1.png',
      '/images/transcribe2.png',
      '/images/transcribe3.png',
    ],
  },
  {
    title: 'BizAssist',
    subtitle: 'AI Business Operations Assistant',
    description:
      'Developed BizAssist as an AI-driven business operations assistant, handling end-to-end development including backend, frontend, and AI orchestration. The system uses a multi-agent architecture with LangGraph, where user queries are validated, planned, and routed to specialized agents for financial analysis, document Q&A, spreadsheet automation, and general tasks. I built the backend with FastAPI, integrated LangChain with ChromaDB for RAG, added multimodal processing for PDFs, DOCX, and images, and built a React frontend with Zustand and SSE for real-time responses.',
    highlights: [
      'Designed a multi-agent workflow with LangGraph for task routing and orchestration.',
      'Combined FastAPI, RAG, and multimodal document handling into a production-ready backend.',
      'Built a React frontend with real-time streaming so complex responses still feel fast.',
    ],
    image: '/images/bizassist.png',
    tech: ['React.js', 'FastAPI', 'Python', 'LangChain', 'LangGraph'],
    links: {
      live: 'https://bizassist.prathmeshjain.in',
      github: 'https://github.com/prathmesh-jain/BizAssist',
    },
    gallery: ['/images/bizassist.png', '/images/bizassist1.png', '/images/bizassist2.png', '/images/bizassist3.png'],
  },
  {
    title: 'ExpenseGauge',
    subtitle: 'Expense Tracker App',
    description:
      'Developed a full-stack offline-first expense tracker app with Expo, Node.js, Express, and MongoDB for smooth data flow and secure user management. Implemented global state handling using Zustand, crafted a responsive UI with NativeWind, added full CRUD functionality for expenses, and visualized financial trends through a dynamic line chart.',
    highlights: [
      'Built an offline-first mobile experience with Expo and React Native.',
      'Handled secure auth, expense CRUD flows, and synced data across the stack.',
      'Added chart-driven insights to make spending trends easier to understand.',
    ],
    image: '/images/expensegauge.jpg',
    tech: ['React Native', 'Expo', 'Node.js', 'MongoDB', 'Express', 'Zustand', 'NativeWind'],
    links: {
      live: 'https://expensegauge.vercel.app',
      github: 'https://github.com/prathmesh-jain/expensegauge-app',
    },
    gallery: ['/images/expensegauge1.jpg', '/images/expensegauge2.jpg', '/images/expensegauge3.jpg', '/images/expensegauge4.jpg'],
  },
]

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section id='projects' className='relative px-5 pb-14 pt-18 md:px-10 xl:px-20'>
      <div className='mx-auto max-w-7xl'>
        <div className='max-w-3xl text-left'>
          <div className='section-kicker'>Selected Work</div>
          <h2 className='section-title mt-4 font-poppins text-4xl font-semibold tracking-[-0.03em] sm:text-5xl'>
            Projects that balance product thinking, engineering, and UX polish.
          </h2>
          <p className='section-copy mt-5 text-base leading-8 sm:text-lg'>
            These are the projects that best show how I approach frontend quality, backend reliability, and applied AI
            in real products.
          </p>
        </div>

        <div className='mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3'>
          {projectsData.map((project, index) => (
            <motion.button
              key={project.title}
              type='button'
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setSelectedProject(project)}
              className='text-left'
            >
              <motion.article
                layoutId={`project-card-${project.title}`}
                transition={{ layout: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }}
                className='glass-panel project-card group h-full overflow-hidden rounded-4xl'
              >
                <motion.div layoutId={`project-image-${project.title}`} className='relative h-56 overflow-hidden sm:h-60 lg:h-52 xl:h-56'>
                  <img src={project.image} alt={project.title} className='project-thumb h-full w-full object-cover' />
                  <div
                    className='absolute inset-0'
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.08) 55%, rgba(0,0,0,0.48) 100%)',
                    }}
                  />
                </motion.div>

                <div className='space-y-4 p-5'>
                  <motion.div >
                    <h3 className='font-poppins text-2xl font-semibold' style={{ color: 'var(--text-primary)' }}>
                      {project.title}
                    </h3>
                    <p className='mt-2 text-sm font-medium' style={{ color: 'var(--text-muted)' }}>
                      {project.subtitle}
                    </p>
                  </motion.div>

                  <p className='line-clamp-3 text-sm leading-7' style={{ color: 'var(--text-muted)' }}>
                    {project.description}
                  </p>

                  <motion.div className='flex flex-wrap gap-2'>
                    {project.tech.slice(0, 4).map((tech) => (
                      <span key={tech} className='tag-chip rounded-full px-3 py-1 text-xs font-medium'>
                        {tech}
                      </span>
                    ))}
                  </motion.div>

                  <motion.div
                    className='inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold'
                    transition={{ layout: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }}
                    style={{
                      background: 'var(--accent-soft)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    See Details
                  </motion.div>
                </div>
              </motion.article>
            </motion.button>
          ))}
        </div>

        <motion.a
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ x: 4 }}
          href='https://github.com/prathmesh-jain?tab=repositories'
          target='_blank'
          rel='noreferrer'
          className='mt-8 inline-flex items-center gap-2 font-poppins text-sm font-semibold'
          style={{ color: 'var(--text-primary)' }}
        >
          View all repositories
          <span aria-hidden='true'>→</span>
        </motion.a>

        <AnimatePresence>
          {selectedProject && (
            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Projects
