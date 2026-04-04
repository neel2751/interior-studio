'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const FloatingElements = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        suppressHydrationWarning={true}
        className="fixed left-6 bottom-6 z-40 flex items-center justify-center transition-all duration-300"
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'var(--gold)',
          color: 'var(--white)',
          border: 'none',
          cursor: 'pointer',
          opacity: showScrollTop ? 1 : 0,
          transform: showScrollTop ? 'translateY(0)' : 'translateY(16px)',
          pointerEvents: showScrollTop ? 'auto' : 'none',
          boxShadow: 'var(--shadow-gold)',
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.background = 'var(--gold-dark)')
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.background = 'var(--gold)')
        }
      >
        <ChevronUp size={18} />
      </button>
    </>
  );
};

export default FloatingElements;
