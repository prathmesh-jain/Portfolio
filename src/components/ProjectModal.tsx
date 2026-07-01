import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { FaArrowLeft, FaArrowRight, FaExpand, FaExternalLinkAlt, FaGithub, FaTimes } from 'react-icons/fa'
import type { Project } from './Projects'

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [imgIdx, setImgIdx] = useState(0)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [isDescExpanded, setIsDescExpanded] = useState(false)
  const [dragStartX, setDragStartX] = useState<number | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const totalImgs = project.gallery.length

  const descriptionLimit = 360
  const shouldShowDescToggle = project.description.length > descriptionLimit
  const displayedDescription =
    !isDescExpanded && shouldShowDescToggle
      ? `${project.description.slice(0, descriptionLimit).trimEnd()}...`
      : project.description

  const nextImg = () => setImgIdx((currentIdx) => (currentIdx + 1) % totalImgs)
  const prevImg = () => setImgIdx((currentIdx) => (currentIdx - 1 + totalImgs) % totalImgs)

  useEffect(() => {
    setImgIdx(0)
    setIsDescExpanded(false)
  }, [project])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    modalRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isImageModalOpen) {
          setIsImageModalOpen(false)
          return
        }

        onClose()
      }

      if (event.key === 'ArrowRight' && totalImgs > 1) {
        nextImg()
      }

      if (event.key === 'ArrowLeft' && totalImgs > 1) {
        prevImg()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isImageModalOpen, onClose, totalImgs])

  const handleTouchStart = (event: React.TouchEvent) => {
    setDragStartX(event.touches[0].clientX)
  }

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (dragStartX === null) {
      return
    }

    const dragEndX = event.changedTouches[0].clientX

    if (dragEndX - dragStartX > 50) {
      prevImg()
    } else if (dragStartX - dragEndX > 50) {
      nextImg()
    }

    setDragStartX(null)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        className='fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6'
        style={{ background: 'var(--overlay)', backdropFilter: 'blur(16px)' }}
        onClick={onClose}
      >
        <motion.div
          ref={modalRef}
          tabIndex={-1}
          role='dialog'
          aria-modal='true'
          layoutId={`project-card-${project.title}`}
          transition={{ layout: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }}
          onClick={(event) => event.stopPropagation()}
          className='glass-panel animate-modal-pop relative max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-[2rem] outline-none'
        >
          <button
            type='button'
            onClick={onClose}
            aria-label='Close modal'
            className='absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full'
            style={{
              background: 'var(--surface-strong)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
            }}
          >
            <FaTimes size={15} />
          </button>

          <div className='grid max-h-[92vh] grid-cols-1 overflow-y-auto lg:grid-cols-[0.95fr_1.05fr]'>
            <div className='order-2 flex flex-col p-5 text-left sm:p-8 lg:order-1 lg:p-10'>
              <motion.div layoutId={`project-title-block-${project.title}`}>
                <div className='section-kicker'>Project Details</div>
                <h2 className='mt-4 font-poppins text-3xl font-semibold sm:text-4xl' style={{ color: 'var(--text-primary)' }}>
                  {project.title}
                </h2>
                <p className='mt-3 text-base font-medium sm:text-lg' style={{ color: 'var(--text-muted)' }}>
                  {project.subtitle}
                </p>
              </motion.div>

              <div className='mt-6'>
                <p className='text-sm leading-8 sm:text-base' style={{ color: 'var(--text-secondary)' }}>
                  {displayedDescription}
                </p>

                {shouldShowDescToggle && (
                  <button
                    type='button'
                    onClick={() => setIsDescExpanded((currentState) => !currentState)}
                    className='mt-3 text-sm font-semibold'
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {isDescExpanded ? 'Read less' : 'Read more'}
                  </button>
                )}
              </div>

              <motion.div
                layoutId={`project-tags-${project.title}`}
                transition={{ layout: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }}
                className='mt-6 flex flex-wrap gap-2'
              >
                {project.tech.map((tech) => (
                  <span key={tech} className='tag-chip rounded-full px-3 py-1 text-xs font-medium sm:text-sm'>
                    {tech}
                  </span>
                ))}
              </motion.div>

              <motion.div
                layoutId={`project-cta-${project.title}`}
                transition={{ layout: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }}
                className='mt-8 flex flex-wrap gap-3'
              >
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='accent-button inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold'
                  >
                    Live Demo
                    <FaExternalLinkAlt size={12} />
                  </a>
                )}

                {project.links.github && (
                  <a
                    href={project.links.github}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='secondary-button inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold'
                  >
                    GitHub
                    <FaGithub size={14} />
                  </a>
                )}
              </motion.div>

              <div className='soft-panel mt-8 rounded-[1.6rem] p-5'>
                <div className='section-kicker'>Highlights</div>
                <div className='mt-4 space-y-3'>
                  {project.highlights.map((highlight) => (
                    <div key={highlight} className='flex gap-3 text-sm leading-7 sm:text-base'>
                      <span
                        className='mt-[0.72rem] h-2 w-2 shrink-0 rounded-full'
                        style={{ background: 'var(--text-primary)' }}
                        aria-hidden='true'
                      />
                      <span style={{ color: 'var(--text-muted)' }}>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className='order-1 p-4 sm:p-6 lg:order-2 lg:p-6'>
              <motion.div
                layoutId={`project-image-${project.title}`}
                className='relative overflow-hidden rounded-[1.7rem]'
                style={{ background: 'var(--surface-soft)' }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <AnimatePresence mode='wait'>
                  <motion.img
                    key={project.gallery[imgIdx]}
                    src={project.gallery[imgIdx]}
                    alt={`${project.title} screenshot ${imgIdx + 1}`}
                    initial={{ opacity: 0, scale: 1.01 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    className='h-[240px] w-full object-contain lg:object-fill sm:h-[320px] lg:h-[min(52vh,440px)]'
                  />
                </AnimatePresence>

                <button
                  type='button'
                  onClick={() => setIsImageModalOpen(true)}
                  className='absolute left-1 top-1 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold sm:text-sm'
                  style={{
                    background: 'rgba(0, 0, 0, 0.36)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.16)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <FaExpand size={11} />
                  Expand
                </button>
              </motion.div>

              <div className='mt-4 flex items-center justify-between gap-3'>
                <button
                  type='button'
                  onClick={prevImg}
                  disabled={totalImgs <= 1}
                  className='secondary-button inline-flex h-11 w-11 items-center justify-center rounded-full disabled:cursor-not-allowed disabled:opacity-50'
                  aria-label='Previous image'
                >
                  <FaArrowLeft size={13} />
                </button>

                <div className='text-sm font-semibold' style={{ color: 'var(--text-secondary)' }}>
                  {imgIdx + 1} / {totalImgs}
                </div>

                <button
                  type='button'
                  onClick={nextImg}
                  disabled={totalImgs <= 1}
                  className='secondary-button inline-flex h-11 w-11 items-center justify-center rounded-full disabled:cursor-not-allowed disabled:opacity-50'
                  aria-label='Next image'
                >
                  <FaArrowRight size={13} />
                </button>
              </div>

              {totalImgs > 1 && (
                <div className='mt-4 flex gap-3 overflow-x-auto pb-1'>
                  {project.gallery.map((imgSrc, index) => (
                    <button
                      key={`${imgSrc}-${index}`}
                      type='button'
                      onClick={() => setImgIdx(index)}
                      className='overflow-hidden rounded-2xl border'
                      style={{
                        borderColor: imgIdx === index ? 'var(--border-strong)' : 'var(--border)',
                        boxShadow: imgIdx === index ? '0 0 0 2px var(--accent-soft)' : 'none',
                      }}
                      aria-label={`Open image ${index + 1}`}
                    >
                      <img src={imgSrc} alt={`${project.title} thumbnail ${index + 1}`} className='h-18 w-26 object-cover' />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isImageModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-[60] flex items-center justify-center p-4'
            style={{ background: 'rgba(0, 0, 0, 0.88)', backdropFilter: 'blur(10px)' }}
            onClick={() => setIsImageModalOpen(false)}
          >
            <button
              type='button'
              onClick={() => setIsImageModalOpen(false)}
              aria-label='Close image preview'
              className='fixed right-4 top-4 z-[70] inline-flex h-11 w-11 items-center justify-center rounded-full'
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                color: '#ffffff',
              }}
            >
              <FaTimes size={15} />
            </button>
            <div className='relative flex max-h-[92vh] w-full max-w-6xl flex-col items-center gap-4' onClick={(event) => event.stopPropagation()}>


              <img
                src={project.gallery[imgIdx]}
                alt={`${project.title} preview ${imgIdx + 1}`}
                className='max-h-[80vh] w-full rounded-[1.6rem] object-contain'
              />

              {totalImgs > 1 && (
                <div className='flex items-center gap-3'>
                  <button
                    type='button'
                    onClick={prevImg}
                    className='inline-flex h-11 w-11 items-center justify-center rounded-full'
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.18)',
                      color: '#ffffff',
                    }}
                    aria-label='Previous preview image'
                  >
                    <FaArrowLeft size={13} />
                  </button>

                  <div className='text-sm font-semibold text-white'>
                    {imgIdx + 1} / {totalImgs}
                  </div>

                  <button
                    type='button'
                    onClick={nextImg}
                    className='inline-flex h-11 w-11 items-center justify-center rounded-full'
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.18)',
                      color: '#ffffff',
                    }}
                    aria-label='Next preview image'
                  >
                    <FaArrowRight size={13} />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ProjectModal
