import { useEffect, useRef, useState } from 'react';

const ProjectModal = ({ project, onClose }) => {
  const [imgIdx, setImgIdx] = useState(0);
  const modalRef = useRef(null);
  const totalImgs = project.gallery.length;

  // Focus trap and prevent background scroll
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    const handleTab = (e) => {
      const focusableEls = modalRef.current.querySelectorAll(
        'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
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
    setTimeout(() => {
      if (modalRef.current) {
        modalRef.current.focus();
      }
    }, 0);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
      window.removeEventListener('keydown', handleTab);
    };
  }, [onClose]);

  if (!project) return null;

  const nextImg = () => setImgIdx((idx) => (idx + 1) % totalImgs);
  const prevImg = () => setImgIdx((idx) => (idx - 1 + totalImgs) % totalImgs);

  const [dragStartX, setDragStartX] = useState(null);

  const handleTouchStart = (e) => {
    setDragStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
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
        <div className="flex-1 flex flex-col md:p-14 p-4 min-w-[320px] max-w-[600px] justify-start">
          <h2 className="md:text-3xl text-2xl font-bold text-indigo-200 sm:mb-2 mb-1 font-poppins drop-shadow text-left">{project.title}</h2>
          <h3 className="text-lg text-indigo-300 sm:mb-4 mb-2 font-inter text-left">{project.subtitle}</h3>
          <p className="text-white/90 sm:mb-6 mb-4 font-inter text-xs sm:text-base leading-relaxed text-left" style={{ textShadow: '0 1px 2px #1e1b4b' }}>{project.description}</p>
          {/* Tech Stack */}
          <div className="mb-6 flex flex-wrap gap-2">
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
                className="bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-400 hover:to-indigo-600 text-white sm:px-5 px-3 py-2 rounded-xl font-semibold shadow-lg transition focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
              >
                Live Demo
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-gray-800 to-indigo-900 hover:from-gray-700 hover:to-indigo-800 text-white sm:px-5 px-3 py-2 rounded-xl font-semibold shadow-lg transition focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
        {/* Right: Image Slideshow */}
        <div className=" bg-black/20 md:w-[420px] w-full md:py-14 md:h-full h-1/2 pb-10 py-4 px-8 relative">
          <div className="relative md:w-full md:h-full h-9/12 w-9/12 m-auto" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <img
              src={project.gallery[imgIdx]}
              alt={project.title + ' screenshot ' + (imgIdx + 1)}
              className={`rounded-2xl md:w-full ${project.title === 'ExpenseGauge' ? 'w-[60%] h-full' : 'w-full  h-[90%]'} m-auto md:max-h-max max-h-84 md:min-h-72 shadow-lg border-2 border-indigo-700 bg-black/30 transition-all duration-300`}
              style={{ background: 'rgba(30,27,75,0.2)' }}
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
    </div>
  );
};

export default ProjectModal; 