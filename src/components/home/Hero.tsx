'use client';

import { useState, useEffect, useCallback } from 'react';

const SLIDES = [
  {
    src: '/images/hero/ChatGPT Image Mar 26, 2026, 09_27_00 PM.png',
    fallback: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80',
    alt: 'Luxury Living Room',
  },
  {
    src: '/images/hero/Use AI Image Mar 26, 2026, 21_05_37.png',
    fallback: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1600&q=80',
    alt: 'Modern Interior Design',
  },
  {
    src: '/images/projects/modern-villa-ahmedabad/ChatGPT Image Mar 26, 2026, 09_14_47 PM.png',
    fallback: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80',
    alt: 'Modern Villa Ahmedabad',
  },
  {
    src: '/images/projects/sky-penthouse-mumbai/ChatGPT Image Mar 26, 2026, 09_14_47 PM.png',
    fallback: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=80',
    alt: 'Sky Penthouse Mumbai',
  },
];

const AUTOPLAY_INTERVAL = 5000;

const FloatingElement = ({
  children,
  delay = 0,
  duration = 4,
  xOffset = 0,
  yOffset = 0,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  xOffset?: number;
  yOffset?: number;
}) => (
  <div
    style={{
      animationName: 'heroFloat',
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
      animationTimingFunction: 'ease-in-out',
      animationIterationCount: 'infinite',
      transform: `translate(${xOffset}px, ${yOffset}px)`,
    }}
  >
    {children}
  </div>
);

const ParallaxLayer = ({
  children,
  intensity = 1,
}: {
  children: React.ReactNode;
  intensity?: number;
}) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) * 0.02 * intensity;
      const y = (e.clientY - window.innerHeight / 2) * 0.02 * intensity;
      setOffset({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [intensity]);

  return (
    <div
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: 'transform 0.3s ease-out',
      }}
    >
      {children}
    </div>
  );
};

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (animating) return;
      setAnimating(true);
      setCurrent(index);
      setTimeout(() => setAnimating(false), 800);
    },
    [animating],
  );

  const prev = useCallback(
    () => goTo((current - 1 + SLIDES.length) % SLIDES.length),
    [current, goTo],
  );

  const next = useCallback(
    () => goTo((current + 1) % SLIDES.length),
    [current, goTo],
  );

  useEffect(() => {
    if (!mounted) return;
    const timer = setInterval(
      () => setCurrent((c) => (c + 1) % SLIDES.length),
      AUTOPLAY_INTERVAL,
    );
    return () => clearInterval(timer);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next, mounted]);

  return (
    <section style={{ position: 'relative', height: '100vh', minHeight: 600, overflow: 'hidden' }}>

      {SLIDES.map((slide, i) => {
        const isActive = i === current;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: isActive ? 2 : 1,
              opacity: mounted ? (isActive ? 1 : 0) : i === 0 ? 1 : 0,
              transition: mounted ? 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: -20,
                animation: mounted && isActive ? 'kenBurns 8s ease-out forwards' : 'none',
              }}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = slide.fallback;
                }}
              />
            </div>

            <div style={{ position: 'absolute', inset: 0 }}>
              <ParallaxLayer intensity={0.5}>
                <FloatingElement delay={0} duration={5} xOffset={50} yOffset={100}>
                  <div style={{ position: 'absolute', top: '15%', left: '8%', width: 80, height: 80, border: '1px solid rgba(201,169,110,0.3)', borderRadius: '50%' }} />
                </FloatingElement>
              </ParallaxLayer>
              <ParallaxLayer intensity={0.8}>
                <FloatingElement delay={0.5} duration={6}>
                  <div style={{ position: 'absolute', top: '25%', right: '12%', width: 60, height: 60, border: '1px solid rgba(201,169,110,0.2)' }} />
                </FloatingElement>
              </ParallaxLayer>
              <ParallaxLayer intensity={0.3}>
                <FloatingElement delay={1} duration={7} yOffset={50}>
                  <div style={{ position: 'absolute', bottom: '30%', left: '5%', width: 40, height: 40, background: 'rgba(201,169,110,0.1)', borderRadius: '50%' }} />
                </FloatingElement>
              </ParallaxLayer>
              <ParallaxLayer intensity={0.6}>
                <FloatingElement delay={1.5} duration={5.5} yOffset={30}>
                  <div style={{ position: 'absolute', bottom: '20%', right: '8%', width: 100, height: 1, background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.3), transparent)' }} />
                </FloatingElement>
              </ParallaxLayer>
            </div>
          </div>
        );
      })}

      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          background: 'linear-gradient(to right, rgba(10,8,5,0.72) 0%, rgba(10,8,5,0.45) 55%, rgba(10,8,5,0.15) 100%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 6vw',
          maxWidth: 820,
        }}
      >
      </div>

      <button
        onClick={prev}
        aria-label="Previous slide"
        style={{
          position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)',
          zIndex: 10, background: 'transparent', border: 'none', cursor: 'pointer',
          padding: '16px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: 0.7, transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.15)'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.7'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.background = 'transparent'; }}
      >
        <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
          <polyline points="18,4 8,14 18,24" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        onClick={next}
        aria-label="Next slide"
        style={{
          position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)',
          zIndex: 10, background: 'transparent', border: 'none', cursor: 'pointer',
          padding: '16px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: 0.7, transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.15)'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.7'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.background = 'transparent'; }}
      >
        <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
          <polyline points="10,4 20,14 10,24" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        style={{
          position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          zIndex: 10, display: 'flex', gap: 12, alignItems: 'center',
        }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              position: 'relative',
              width: mounted && i === current ? 40 : 12,
              height: 3,
              background: 'rgba(255,255,255,0.3)',
              border: 'none', cursor: 'pointer', padding: 0, overflow: 'hidden',
              transition: 'width 0.4s ease',
            }}
          >
            {mounted && i === current && (
              <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', background: 'var(--gold, #C9A96E)', animation: 'progressBar 5s linear', width: '100%' }} />
            )}
          </button>
        ))}
      </div>

      <div
        style={{
          position: 'absolute', bottom: 32, right: 32, zIndex: 10,
          fontFamily: 'var(--font-display, serif)', fontSize: 12,
          letterSpacing: 2, color: 'rgba(255,255,255,0.7)',
        }}
      >
        <span style={{ color: 'var(--gold, #C9A96E)' }}>{String(current + 1).padStart(2, '0')}</span>
        <span style={{ margin: '0 4px' }}>/</span>
        <span>{String(SLIDES.length).padStart(2, '0')}</span>
      </div>
    </section>
  );
};

export default Hero;