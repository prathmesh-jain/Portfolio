import ChatMock from './ChatMock'
import type { Project } from '../data/content'

export default function ProjectCover({ project, className = '' }: { project: Project; className?: string }) {
  if (!project.cover) {
    return (
      <div className={`flex items-center justify-center bg-[#eef0f3] p-6 sm:p-10 ${className}`}>
        <div className='w-full max-w-md overflow-hidden'>
          <ChatMock />
        </div>
      </div>
    )
  }
  const contain = project.coverFit === 'contain'
  return (
    <div className={`overflow-hidden ${contain ? 'bg-[#0b0f1a]' : 'bg-[#eef0f3]'} ${className}`}>
      <img
        src={project.cover}
        alt={`${project.title} screenshot`}
        loading='lazy'
        decoding='async'
        className={`h-full w-full ${contain ? 'object-contain' : 'object-cover object-left-top'}`}
      />
    </div>
  )
}
