import React, { useEffect, useRef, useState } from 'react';

interface Project {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tech: string[];
  links: {
    live: string;
    github: string;
  };
  gallery: string[];
}

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [imgIdx, setImgIdx] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const totalImgs = project.gallery.length;
  const descriptionText = project.description || '';
  const descPreviewLimit = 400;
  const shouldShowDescToggle = descriptionText.length > descPreviewLimit;
  const displayedDescription =
    !isDescExpanded && shouldShowDescToggle
      ? `${descriptionText.slice(0, descPreviewLimit).trimEnd()}...`
      : descriptionText;

  useEffect(() => {
    setIsDescExpanded(false);
  }, [project]);

  // Focus trap and prevent background scroll
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isImageModalOpen) {
          setIsImageModalOpen(false);
          return;
        }
        onClose();
      }
    };
    const handleImageNavKeys = (e: KeyboardEvent) => {
      if (!isImageModalOpen || totalImgs <= 1) return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setImgIdx((idx) => (idx + 1) % totalImgs);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setImgIdx((idx) => (idx - 1 + totalImgs) % totalImgs);
      }
    };
    const handleTab = (e: KeyboardEvent) => {
      if (!modalRef.current) return;
      const focusableEls = modalRef.current.querySelectorAll<HTMLElement>(
        'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableEls.length === 0) return;
      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEsc);
    window.addEventListener('keydown', handleTab);
    window.addEventListener('keydown', handleImageNavKeys);
    setTimeout(() => {
      if (modalRef.current) {
        modalRef.current.focus();
      }
    }, 0);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
      window.removeEventListener('keydown', handleTab);
      window.removeEventListener('keydown', handleImageNavKeys);
    };
  }, [onClose, isImageModalOpen, totalImgs]);

  if (!project) return null;

  const nextImg = () => setImgIdx((idx) => (idx + 1) % totalImgs);
  const prevImg = () => setImgIdx((idx) => (idx - 1 + totalImgs) % totalImgs);

  const [dragStartX, setDragStartX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (dragStartX === null) return;
    const dragEndX = e.changedTouches[0].clientX;
    if (dragEndX - dragStartX > 50) prevImg(); // swipe right
    else if (dragStartX - dragEndX > 50) nextImg(); // swipe left
    setDragStartX(null);
  };

  return (
    <div className="fixed sm:inset-0 inset-1 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xl animate-fadeIn">
      {/* Overlay click to close */}
      <div className="absolute md:inset-0 inset-1 z-40" onClick={onClose} />
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative z-50 bg-white/10 backdrop-blur-2xl border border-indigo-400 shadow-2xl rounded-3xl w-[98vw] max-w-5xl max-h-[95vh] flex flex-col md:flex-row outline-none animate-modalPop overflow-hidden font-inter sm:h-full h-[95%]"
        aria-modal="true"
        role="dialog"
      >
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-indigo-200 hover:text-white text-2xl font-bold cursor-pointer bg-indigo-700/40 rounded-full w-9 h-9 flex items-center justify-center transition hover:bg-indigo-500/80 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 z-50"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        {/* Left: Text Content */}
        <div className="flex-1 flex flex-col md:p-14 p-4 pb-3 min-w-[320px] max-w-150 justify-start">
          <h2 className="md:text-3xl text-2xl font-bold text-indigo-200 sm:mb-2 mb-1 font-poppins drop-shadow text-left">{project.title}</h2>
          <h3 className="text-lg text-indigo-300 sm:mb-4 mb-2 font-inter text-left">{project.subtitle}</h3>
          <div className={`sm:mb-6 mb-4 ${isDescExpanded ? 'max-h-56 overflow-y-auto pr-1' : ''}`}>
            <p
              className="text-white/90 font-inter text-xs sm:text-base leading-relaxed text-left"
              style={{ textShadow: '0 1px 2px #1e1b4b' }}
            >
              {displayedDescription}

              {shouldShowDescToggle && (
                <span
                  onClick={() => setIsDescExpanded(prev => !prev)}
                  className="ml-1 text-indigo-200 hover:text-white cursor-pointer font-semibold transition focus:outline-none rounded"
                  role="button"
                  tabIndex={0}
                >
                  {isDescExpanded ? ' Read less' : 'Read more'}
                </span>
              )}
            </p>
          </div>
          {/* Tech Stack */}
          <div className="mb-5 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span key={tech} className="bg-indigo-700/70 text-indigo-100 px-3 py-1 rounded-full text-xs sm:font-semibold font-medium shadow-sm font-inter border border-indigo-900/40">
                {tech}
              </span>
            ))}
          </div>
          {/* Links */}
          <div className="flex gap-4 mt-auto">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-linear-to-r from-indigo-500 to-indigo-700 hover:from-indigo-400 hover:to-indigo-600 text-white sm:px-5 px-3 py-2 rounded-xl font-semibold shadow-lg transition focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
              >
                Live Demo
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-linear-to-r from-gray-800 to-indigo-900 hover:from-gray-700 hover:to-indigo-800 text-white sm:px-5 px-3 py-2 rounded-xl font-semibold shadow-lg transition focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
        {/* Right: Image Slideshow */}
        <div className=" bg-black/20 md:w-105 w-full md:py-14 md:h-full h-1/2 pb-10 py-4 px-8 relative">
          <div className="relative md:w-full md:h-full h-9/12 w-9/12 m-auto" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <img
              src={project.gallery[imgIdx]}
              alt={project.title + ' screenshot ' + (imgIdx + 1)}
              className={`rounded-2xl md:w-full ${project.title === 'ExpenseGauge' ? 'w-[60%] h-full' : 'w-full  h-[90%]'} m-auto md:max-h-max max-h-84 md:min-h-72 shadow-lg border-2 border-indigo-700 bg-black/30 transition-all duration-300 cursor-zoom-in`}
              style={{ background: 'rgba(30,27,75,0.2)' }}
              onClick={() => setIsImageModalOpen(true)}
            />
            {/* Pagination Controls */}
            {totalImgs > 1 && (
              <div className="flex justify-between items-center w-full mt-2">
                <button
                  onClick={prevImg}
                  className="bg-indigo-700/70 hover:bg-indigo-500/80 text-white rounded-full w-10 h-10 flex items-center justify-center shadow focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  aria-label="Previous image"
                >
                  &#8592;
                </button>
                <span className="text-indigo-200 font-semibold text-sm">
                  {imgIdx + 1} / {totalImgs}
                </span>
                <button
                  onClick={nextImg}
                  className="bg-indigo-700/70 hover:bg-indigo-500/80 text-white rounded-full w-10 h-10 flex items-center justify-center shadow focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  aria-label="Next image"
                >
                  &#8594;
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {isImageModalOpen && (
        <div
          className="fixed inset-0 z-70 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsImageModalOpen(false)}
        >
          <button
            className="absolute top-4 right-4 text-white text-3xl font-bold cursor-pointer bg-black/50 rounded-full w-10 h-10 flex items-center justify-center transition hover:bg-black/70 shadow-lg focus:outline-none focus:ring-2 focus:ring-white/70 z-80"
            onClick={() => setIsImageModalOpen(false)}
            aria-label="Close image preview"
          >
            &times;
          </button>
          <div
            className="relative max-w-[95vw] max-h-[92vh] flex flex-col items-center justify-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex items-center justify-center w-full">
              {totalImgs > 1 && (
                <button
                  onClick={prevImg}
                  className="absolute left-2 md:left-4 z-80 bg-black/55 hover:bg-black/75 text-white rounded-full w-10 h-10 hidden sm:flex items-center justify-center shadow focus:outline-none focus:ring-2 focus:ring-white/70"
                  aria-label="Previous preview image"
                >
                  &#8592;
                </button>
              )}
              <img
                src={project.gallery[imgIdx]}
                alt={project.title + ' preview ' + (imgIdx + 1)}
                className="max-w-full max-h-[72vh] object-contain rounded-2xl shadow-2xl border border-white/20"
              />
              {totalImgs > 1 && (
                <button
                  onClick={nextImg}
                  className="absolute right-2 md:right-4 z-80 bg-black/55 hover:bg-black/75 text-white rounded-full w-10 h-10 hidden sm:flex items-center justify-center shadow focus:outline-none focus:ring-2 focus:ring-white/70"
                  aria-label="Next preview image"
                >
                  &#8594;
                </button>
              )}
            </div>
            {totalImgs > 1 && (
              <div className="flex items-center gap-2 max-w-[92vw] overflow-x-auto py-1 px-1">
                {project.gallery.map((imgSrc, index) => (
                  <button
                    key={imgSrc + index}
                    onClick={() => setImgIdx(index)}
                    className={`shrink-0 rounded-lg border-2 transition ${imgIdx === index
                        ? 'border-indigo-300 ring-2 ring-indigo-300/70'
                        : 'border-white/25 hover:border-white/55'
                      }`}
                    aria-label={`Open preview image ${index + 1}`}
                  >
                    <img
                      src={imgSrc}
                      alt={project.title + ' thumbnail ' + (index + 1)}
                      className="w-16 h-12 md:w-20 md:h-14 object-cover rounded-md"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectModal; 
