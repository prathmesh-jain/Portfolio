import { useState, useEffect, useRef, type RefObject } from 'react';

interface Section {
  id: string;
  href: string;
}

const useScrollNavigation = (isProgrammaticScroll?: RefObject<boolean>) => {
  const [activeSection, setActiveSection] = useState<number>(0);
  const activeSectionRef = useRef<number>(0);

  const sections: Section[] = [
    { id: 'home', href: '/' },
    { id: 'skills', href: '#skills' },
    { id: 'experience', href: '#experience' },
    { id: 'projects', href: '#projects' },
    { id: 'contact', href: '#contact' }
  ];

  useEffect(() => {
    // Function to determine which section is currently in view
    const getCurrentSection = (): number => {
      const scrollPosition = window.scrollY + window.innerHeight - 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element) {
          const elementTop = element.offsetTop;
          if (scrollPosition >= elementTop) {
            return i;
          }
        }
      }
      if (window.scrollY < 100) {
        return 0;
      }
      return activeSectionRef.current;
    };

    // Throttle function to limit scroll event frequency
    let ticking = false;
    const handleScroll = () => {
      if (isProgrammaticScroll && isProgrammaticScroll.current) return;
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentSection = getCurrentSection();
          activeSectionRef.current = currentSection;
          setActiveSection(prevSection => {
            if (currentSection !== prevSection) {
              return currentSection;
            }
            return prevSection;
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check after a short delay to ensure all elements are rendered
    setTimeout(handleScroll, 50);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isProgrammaticScroll]);

  const updateActiveSection = (index: number) => {
    activeSectionRef.current = index;
    setActiveSection(index);
  };

  return {
    activeSection,
    updateActiveSection,
    sections
  };
};

export default useScrollNavigation; 