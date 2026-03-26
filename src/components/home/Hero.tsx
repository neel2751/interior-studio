'use client';

import { useState, useEffect, useCallback } from 'react';

const SLIDES = [
  {
    src: '/images/hero/hero-bg.jpg',
    fallback: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80',
    alt: 'Luxury Living Room',
  },
  {
    src: '/images/projects/modern-villa-ahmedabad/cover.jpg',
    fallback: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1600&q=80',
    alt: 'Modern Villa Ahmedabad',
  },
  {
    src: '/images/projects/sky-penthouse-mumbai/cover.jpg',
    fallback: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80',
    alt: 'Sky Penthouse Mumbai',
  },
  {
    src: '/images/projects/boutique-hotel-goa/cover.jpg',
    fallback: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=80',
    alt: 'Boutique Hotel Goa',
  },
];

const AUTOPLAY_INTERVAL = 5000;

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback((index: number) => {
    if (animating) return;
    setAnimating(true);
    setCurrent(index);
    setTimeout(() => setAnimating(false), 800);
  }, [animating]);

  const prev = useCallback(() => {
    goTo((current - 1 + SLIDES.length) % SLIDES.length);
  }, [current, goTo]);

  const next = useCallback(() => {
    goTo((current + 1) % SLIDES.length);
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next]);

  return (
    <section
      style={{
        position:   'relative',
        height:     '100vh',
        minHeight:  600,
        overflow:   'hidden',
      }}
    >
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          style={{
            position:   'absolute',
            inset:      0,
            zIndex:     i === current ? 2 : 1,
            opacity:    i === current ? 1 : 0,
            transition: 'opacity 0.9s ease',
          }}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            style={{
              width:          '100%',
              height:         '100%',
              objectFit:      'cover',
              objectPosition: 'center',
              transform:      i === current ? 'scale(1.03)' : 'scale(1)',
              transition:     'transform 6s ease',
            }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = slide.fallback;
            }}
          />
          <div
            style={{
              position:   'absolute',
              inset:      0,
              background: 'rgba(0,0,0,0.25)',
            }}
          />
        </div>
      ))}

      <button
        onClick={prev}
        aria-label="Previous slide"
        style={{
          position:        'absolute',
          left:            24,
          top:             '50%',
          transform:       'translateY(-50%)',
          zIndex:          10,
          background:      'transparent',
          border:          'none',
          cursor:          'pointer',
          padding:         '12px 8px',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          opacity:         0.7,
          transition:      'opacity 0.2s ease',
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = '1')}
        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = '0.7')}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <polyline points="18,4 8,14 18,24" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <button
        onClick={next}
        aria-label="Next slide"
        style={{
          position:        'absolute',
          right:           24,
          top:             '50%',
          transform:       'translateY(-50%)',
          zIndex:          10,
          background:      'transparent',
          border:          'none',
          cursor:          'pointer',
          padding:         '12px 8px',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          opacity:         0.7,
          transition:      'opacity 0.2s ease',
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = '1')}
        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = '0.7')}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <polyline points="10,4 20,14 10,24" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <div
        style={{
          position:       'absolute',
          bottom:         32,
          left:           '50%',
          transform:      'translateX(-50%)',
          zIndex:         10,
          display:        'flex',
          gap:            10,
          alignItems:     'center',
        }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width:        i === current ? 28 : 8,
              height:       2,
              background:   '#ffffff',
              border:       'none',
              cursor:       'pointer',
              padding:      0,
              opacity:      i === current ? 1 : 0.45,
              transition:   'width 0.4s ease, opacity 0.4s ease',
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;