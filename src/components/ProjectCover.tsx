import ChatMock from './ChatMock'
import MemoryMock from './MemoryMock'
import type { Project } from '../data/content'

export default function ProjectCover({ project, className = '' }: { project: Project; className?: string }) {
  if (!project.cover) {
    return (
      <div className={`overflow-hidden ${className}`}>
        {project.mock === 'memory' ? <MemoryMock /> : <ChatMock />}
      </div>
    )
  }
  const contain = project.coverFit === 'contain'
  return (
    <div className={`overflow-hidden ${contain ? 'aspect-[16/10] bg-[#0b0f1a]' : ''} ${className}`}>
      <img
        src={project.cover}
        alt={`${project.title} screenshot`}
        loading='lazy'
        decoding='async'
        className={`w-full ${contain ? 'h-full object-contain' : 'h-auto'}`}
      />
    </div>
  )
}
