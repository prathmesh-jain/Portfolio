import ChatMock from './ChatMock'
import type { Project } from '../data/content'

interface ProjectCoverProps {
  project: Project
  className?: string
  /** Show the screenshot inside a padded frame so it is never cropped. */
  framed?: boolean
}

export default function ProjectCover({ project, className = '', framed = false }: ProjectCoverProps) {
  if (!project.cover) {
    // The chat mock sets its own height; drop any fixed aspect ratio so it never gets clipped.
    return (
      <div className={`flex overflow-hidden bg-[#17212b] ${className.replace(/\S*aspect-\S+/g, '')}`}>
        <ChatMock />
      </div>
    )
  }

  const contain = project.coverFit === 'contain'

  if (framed && !contain) {
    return (
      <div className={`flex items-center overflow-hidden bg-accent-wash p-5 sm:p-7 ${className}`}>
        <img
          src={project.cover}
          alt={`${project.title} screenshot`}
          loading='lazy'
          decoding='async'
          className='w-full rounded-md border border-line shadow-[0_20px_50px_-25px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:-translate-y-1'
        />
      </div>
    )
  }

  return (
    <div className={`overflow-hidden ${contain ? 'bg-[#0b0f1a]' : ''} ${className}`}>
      <img
        src={project.cover}
        alt={`${project.title} screenshot`}
        loading='lazy'
        decoding='async'
        className={`h-full w-full transition-transform duration-500 group-hover:scale-[1.02] ${
          contain ? 'object-contain' : 'object-cover object-top'
        }`}
      />
    </div>
  )
}
