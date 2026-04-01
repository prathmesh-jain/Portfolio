import { useState } from 'react';
import ProjectModal from './ProjectModal';

const projectsData = [
  {
    title: 'Patronix',
    subtitle: 'Ecommerce Website',
    description: 'Developed a feature-rich full-stack E-commerce platform from scratch using React.js for frontend, Node.js and Express.js for backend APIs, and MongoDB for database management. Used Redux toolkit for state management and ensured seamless user experience through responsive design and optimized performance.',
    image: '/images/patronix.png',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Redux'],
    links: { live: 'https://patronix-ecommerce-website.onrender.com', github: 'https://github.com/prathmesh-jain/Patronix-Ecommerce-Website' },
    gallery: ['/images/patronix.png', '/images/patronix1.png','/images/patronix2.png','/images/patronix3.png','/images/patronix4.png','/images/patronix5.png'],
  },
  {
    title: 'BizAssist',
    subtitle: 'AI Business Operations Assistant',
    description: `Developed BizAssist as an AI-driven business operations assistant, handling end-to-end development including backend, frontend, and AI orchestration. The system uses a multi-agent architecture with LangGraph, where user queries are validated, planned, and routed to specialized agents for financial analysis, document Q&A (RAG), spreadsheet automation, and general tasks.I developed the backend using FastAPI and integrated LangChain with ChromaDB for a RAG pipeline, enabling intelligent querying over uploaded documents. I also implemented a multimodal pipeline to process PDFs, DOCX, and images using OCR. On the frontend, I built a React interface with Zustand for state management and used Server-Sent Events (SSE) to stream real-time responses.`,
    image: '/images/bizassist.png',
    tech: ['React.js', 'FastAPI', 'Python', 'Langchain','Langgraph'],
    links: { live: 'https://bizassist.prathmeshjain.online', github: 'https://github.com/prathmesh-jain/BizAssist' },
    gallery: ['/images/bizassist.png', '/images/bizassist1.png','/images/bizassist2.png','/images/bizassist3.png'],
  },
  {
    title: 'ExpenseGauge',
    subtitle: 'Expense Tracker App',
    description: 'Developed a full-stack offline-first Expense Tracker app with Expo (React Native), Node.js, Express, and MongoDB for seamless data flow and secure user management. Implemented global state handling using Zustand and crafted a responsive UI with NativeWind. Added full CRUD functionality for expenses and visualized financial trends through a dynamic line chart.',
    image: '/images/expensegauge.jpg',
    tech: ['React Native', 'Expo', 'Node.js', 'MongoDB', 'Express', 'Zustand', 'NativeWind'],
    links: { live: 'https://expensegauge.vercel.app', github: 'https://github.com/prathmesh-jain/expensegauge-app' },
    gallery: ['/images/expensegauge1.jpg', '/images/expensegauge2.jpg', '/images/expensegauge3.jpg', '/images/expensegauge4.jpg'],
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section className='relative flex w-full pt-5 md:pb-16 pb-10 sm:scroll-mt-0 scroll-mt-60 @min-2xl:min-h-screen h-fit overflow-hidden' id='projects'>
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-3xl ' />
        <div className='absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-fuchsia-600/10 blur-3xl ' />
        <div className='absolute inset-0 bg-gradient-to-b from-indigo-950/10 via-transparent to-transparent' />
      </div>

      <div className='relative flex items-center w-full mt-16 flex-col box-border xl:px-20 md:px-10 px-5'>
        <h1 className='md:text-5xl text-4xl font-bold text-indigo-100 tracking-wide md:pb-5 pb-2 pt-10 mb-10 text-left w-full pl-10 font-poppins'>Projects</h1>
        <div className='flex w-full md:w-11/12 h-fit xl:p-5 md:p-0 sm:p-5 gap-8 md:gap-0 justify-between flex-wrap'>
          {projectsData.map((project, idx) => (
            <div
              key={project.title}
              className='group rounded-3xl shadow-md relative hover:text-indigo-200 border-2 border-custom-bg text-gray-300 hover:border-indigo-700 hover:shadow-[0_0_55px_rgba(99,102,241,0.22)] transition-all ease-in duration-300 cursor-pointer bg-custom-bg overflow-hidden xl:h-[20rem] lg:h-[17rem] md:h-[14rem] h-[18rem] xl:w-[20rem] lg:w-[17rem] md:w-[14rem] w-[18rem] mx-auto hover:scale-[1.02]'
              onClick={() => openModal(project)}
            >
              <img src={project.image} alt='' className='h-full w-full opacity rounded-3xl' />
              <div className='absolute inset-0 sm:bg-black/30 bg-black/10 group-hover:bg-transparent transition-all ease-in duration-300'></div>
              <div className='lg:text-sm text-xs font-semibold text-left bg-black/60 group-hover:bg-indigo-900/90 border border-none group-hover:border-solid group-hover:border-indigo-700 rounded-full p-2 lg:px-6 px-4 absolute bottom-5 left-5'>
                {project.title}
                <div>{project.subtitle}</div>
              </div>
            </div>
          ))}
        </div>

        {modalOpen && selectedProject && (
          <ProjectModal project={selectedProject} onClose={closeModal} />
        )}
      </div>
    </section>
  );
};

export default Projects;