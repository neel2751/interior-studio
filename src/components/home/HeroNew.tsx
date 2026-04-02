'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';

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

const TextReveal = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {children}
    </div>
  );
};

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
}) => {
  return (
    <div
      style={{
        animation: `float ${duration}s ease-in-out ${delay}s infinite`,
        transform: `translate(${xOffset}px, ${yOffset}px)`,
      }}
    >
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(${xOffset}px, ${yOffset}px) translateY(0px); }
          50% { transform: translate(${xOffset}px, ${yOffset}px) translateY(-15px); }
        }
      `}</style>
      {children}
    </div>
  );
};
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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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
        position: 'relative',
        height: '100vh',
        minHeight: 600,
        overflow: 'hidden',
      }}
    >
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: i === current ? 2 : 1,
            opacity: i === current ? 1 : 0,
            transition: 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: -20,
              animation: i === current ? 'kenBurns 8s ease-out forwards' : 'none',
            }}
          >
            <style>{`
              @keyframes kenBurns {
                0% { transform: scale(1.1) translate(0, 0); }
                100% { transform: scale(1) translate(-1%, -1%); }
              }
            `}</style>
            <img
              src={slide.src}
              alt={slide.alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = slide.fallback;
              }}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.6) 100%)',
            }}
          />
        </div>
      ))}

      <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}>
        <ParallaxLayer intensity={0.5}>
          <FloatingElement delay={0} duration={5} xOffset={50} yOffset={100}>
            <div
              style={{
                position: 'absolute',
                top: '15%',
                left: '8%',
                width: 80,
                height: 80,
                border: '1px solid rgba(201,169,110,0.3)',
                borderRadius: '50%',
              }}
            />
          </FloatingElement>
        </ParallaxLayer>

        <ParallaxLayer intensity={0.8}>
          <FloatingElement delay={0.5} duration={6} xOffset={0} yOffset={0}>
            <div
              style={{
                position: 'absolute',
                top: '25%',
                right: '12%',
                width: 60,
                height: 60,
                border: '1px solid rgba(201,169,110,0.2)',
              }}
            />
          </FloatingElement>
        </ParallaxLayer>

        <ParallaxLayer intensity={0.3}>
          <FloatingElement delay={1} duration={7} xOffset={0} yOffset={50}>
            <div
              style={{
                position: 'absolute',
                bottom: '30%',
                left: '5%',
                width: 40,
                height: 40,
                background: 'rgba(201,169,110,0.1)',
                borderRadius: '50%',
              }}
            />
          </FloatingElement>
        </ParallaxLayer>

        <ParallaxLayer intensity={0.6}>
          <FloatingElement delay={1.5} duration={5.5} xOffset={0} yOffset={30}>
            <div
              style={{
                position: 'absolute',
                bottom: '20%',
                right: '8%',
                width: 100,
                height: 1,
                background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.3), transparent)',
              }}
            />
          </FloatingElement>
        </ParallaxLayer>
      </div>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 24px',
        }}
      >
        <TextReveal delay={isLoaded ? 300 : 0}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.8)',
              marginBottom: 16,
            }}
          >
            Luxury Interior Design Studio
          </p>
        </TextReveal>

        <TextReveal delay={isLoaded ? 500 : 0}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 6vw, 72px)',
              fontWeight: 300,
              color: '#ffffff',
              letterSpacing: 2,
              lineHeight: 1.1,
              marginBottom: 24,
              maxWidth: 900,
            }}
          >
            Transform Your Space
            <br />
            Into Art
          </h1>
        </TextReveal>

        <TextReveal delay={isLoaded ? 700 : 0}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              color: 'rgba(255,255,255,0.85)',
              maxWidth: 500,
              lineHeight: 1.7,
              marginBottom: 40,
            }}
          >
            Award-winning interior design for residential, commercial, and hospitality spaces across India
          </p>
        </TextReveal>

        <TextReveal delay={isLoaded ? 900 : 0}>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link
              href="/projects"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '14px 32px',
                background: 'var(--gold)',
                color: '#1a1a1a',
                fontFamily: 'var(--font-body)',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 2,
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: 0,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--gold)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              View Projects
            </Link>
            <Link
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '14px 32px',
                background: 'transparent',
                color: '#ffffff',
                fontFamily: 'var(--font-body)',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 2,
                textTransform: 'uppercase',
                textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.5)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.borderColor = '#ffffff';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Get in Touch
            </Link>
          </div>
        </TextReveal>
        <TextReveal delay={isLoaded ? 1200 : 0}>
          <div
            style={{
              position: 'absolute',
              bottom: 100,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 9,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              Scroll
            </span>
            <div
              style={{
                width: 1,
                height: 40,
                background: 'rgba(255,255,255,0.3)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '50%',
                  background: 'var(--gold)',
                  animation: 'scrollLine 2s ease-in-out infinite',
                }}
              />
              <style>{`
                @keyframes scrollLine {
                  0% { transform: translateY(-100%); }
                  50% { transform: translateY(0%); }
                  100% { transform: translateY(200%); }
                }
              `}</style>
            </div>
          </div>
        </TextReveal>
      </div>

      <button
        onClick={prev}
        aria-label="Previous slide"
        style={{
          position: 'absolute',
          left: 24,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '12px 8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.7,
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '1';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '0.7';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
        }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <polyline points="18,4 8,14 18,24" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        onClick={next}
        aria-label="Next slide"
        style={{
          position: 'absolute',
          right: 24,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '12px 8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.7,
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '1';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '0.7';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
        }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <polyline points="10,4 20,14 10,24" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          gap: 12,
          alignItems: 'center',
        }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              position: 'relative',
              width: i === current ? 40 : 12,
              height: 3,
              background: 'rgba(255,255,255,0.3)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              overflow: 'hidden',
              transition: 'width 0.4s ease',
            }}
          >
            {i === current && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  background: 'var(--gold)',
                  animation: 'progressBar 5s linear',
                  width: '100%',
                }}
              />
            )}
            <style>{`
              @keyframes progressBar {
                from { width: 0%; }
                to { width: 100%; }
              }
            `}</style>
          </button>
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 32,
          right: 32,
          zIndex: 10,
          fontFamily: 'var(--font-display)',
          fontSize: 12,
          letterSpacing: 2,
          color: 'rgba(255,255,255,0.7)',
        }}
      >
        <span style={{ color: 'var(--gold)' }}>{String(current + 1).padStart(2, '0')}</span>
        <span style={{ margin: '0 4px' }}>/</span>
        <span>{String(SLIDES.length).padStart(2, '0')}</span>
      </div>
    </section>
  );
};

export default Hero;
