'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const SLIDES = [
  {
    src: '/images/hero/hero-slide-1.png',
    fallback: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80',
    alt: 'Luxury Living Room',
  },
  {
    src: '/images/hero/Use-AI-Image-Mar-26-2026-21_05_37.png',
    fallback: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1600&q=80',
    alt: 'Modern Interior Design',
  },
  {
    src: '/images/projects/modern-villa-ahmedabad/cover.png',
    fallback: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80',
    alt: 'Modern Villa Ahmedabad',
  },
  {
    src: '/images/projects/boutique-hotel-goa/cover.png',
    fallback: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=80',
    alt: 'Boutique Hotel Goa',
  },
];

const STATS = [
  { value: '15+',       label: 'YEARS IN BUSINESS' },
  { value: '500+',      label: 'PROJECTS DONE' },
  { value: 'PAN India', label: 'SERVICE AREA' },
  { value: '100%',      label: 'FULL TURNKEY' },
];

const AUTOPLAY_INTERVAL = 5000;

export default function Hero() {
  const [mounted, setMounted]     = useState(false);
  const [current, setCurrent]     = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const goTo = useCallback((index: number) => {
    if (animating) return;
    setAnimating(true);
    setCurrent(index);
    setTimeout(() => setAnimating(false), 900);
  }, [animating]);

  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length), [current, goTo]);

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % SLIDES.length), AUTOPLAY_INTERVAL);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next]);

  // Server renders a dark placeholder — no dynamic content, no mismatch
  if (!mounted) {
    return (
      <section style={{ position: 'relative', height: '100vh', minHeight: 700, overflow: 'hidden', background: '#0a0805' }}>
        <img
          src={SLIDES[0].fallback}
          alt={SLIDES[0].alt}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.5 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,8,5,0.9) 0%, rgba(10,8,5,0.5) 100%)' }} />
      </section>
    );
  }

  return (
    <section style={{ position: 'relative', height: '100vh', minHeight: 700, overflow: 'hidden' }}>

      {/* ── Background slides ── */}
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: i === current ? 2 : 1,
            opacity: i === current ? 1 : 0,
            transition: 'opacity 1.2s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              transform: i === current ? 'scale(1)' : 'scale(1.06)',
              transition: 'transform 10s ease-out',
            }}
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = slide.fallback; }}
          />
        </div>
      ))}

      {/* ── Gradient overlays ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
        background: 'linear-gradient(to right, rgba(10,8,5,0.88) 0%, rgba(10,8,5,0.55) 55%, rgba(10,8,5,0.2) 100%)',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 180,
        zIndex: 3, pointerEvents: 'none',
        background: 'linear-gradient(to top, rgba(10,8,5,0.75) 0%, transparent 100%)',
      }} />

      {/* ── Main content ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 4,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '0 8vw', maxWidth: 900,
      }}>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '11px', letterSpacing: '3px',
          textTransform: 'uppercase',
          color: 'var(--gold, #c9a96e)',
          marginBottom: '20px',
          opacity: 0,
          animation: 'heroFadeUp 0.8s ease-out 0.2s forwards',
        }}>
          INTERIOR DESIGN · FIT-OUT · INDIA
        </p>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px, 5vw, 62px)',
          fontWeight: 700, lineHeight: 1.12,
          color: '#ffffff', marginBottom: '24px',
          opacity: 0,
          animation: 'heroFadeUp 0.8s ease-out 0.4s forwards',
        }}>
          Design, Build, Fit-Out<br />
          Villas &amp; Apartments<br />
          Across India
        </h1>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '15px', lineHeight: 1.7,
          color: 'rgba(255,255,255,0.75)',
          maxWidth: 420, marginBottom: '36px',
          opacity: 0,
          animation: 'heroFadeUp 0.8s ease-out 0.6s forwards',
        }}>
          Full turnkey services for residential and commercial projects across India.
        </p>

        <div style={{
          display: 'flex', gap: '16px', flexWrap: 'wrap',
          opacity: 0,
          animation: 'heroFadeUp 0.8s ease-out 0.8s forwards',
        }}>
          <Link
            href="/contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '16px 28px',
              fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600,
              letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none',
              background: 'var(--gold, #c9a96e)', color: '#0a0a0a',
              border: '1.5px solid var(--gold, #c9a96e)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--gold, #c9a96e)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--gold, #c9a96e)'; e.currentTarget.style.color = '#0a0a0a'; }}
          >
            GET FREE CONSULTATION
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

          <a
            href="https://wa.me/919876543210"
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '16px 28px',
              fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600,
              letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none',
              background: 'transparent', color: 'rgba(255,255,255,0.9)',
              border: '1.5px solid rgba(255,255,255,0.3)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gold, #c9a96e)'; e.currentTarget.style.color = 'var(--gold, #c9a96e)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = 'rgba(255,255,255,0.9)'; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp Us
          </a>
        </div>
      </div>

      {/* ── Phone card ── */}
      <div style={{
        position: 'absolute', bottom: 100, right: 'clamp(24px, 5vw, 56px)',
        zIndex: 6,
        background: 'rgba(10,8,5,0.75)', backdropFilter: 'blur(10px)',
        border: '1px solid rgba(201,169,110,0.3)',
        padding: '18px 28px',
        display: 'flex', flexDirection: 'column', gap: 4,
        opacity: 0,
        animation: 'heroFadeUp 0.8s ease-out 1.0s forwards',
      }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
          CALL OR WHATSAPP
        </span>
        <a href="tel:+919876543210" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px, 2vw, 24px)', fontWeight: 700, color: '#ffffff', textDecoration: 'none' }}>
          +91 98765 43210
        </a>
      </div>

      {/* ── Stats bar ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 5,
        display: 'flex',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(10,8,5,0.55)',
        backdropFilter: 'blur(10px)',
      }}>
        {STATS.map((stat, i) => (
          <div key={i} style={{
            flex: 1, padding: '24px 16px',
            borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
            textAlign: 'center',
            opacity: 0,
            animation: `heroFadeUp 0.8s ease-out ${1.1 + i * 0.1}s forwards`,
          }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 600, color: 'var(--gold, #c9a96e)', marginBottom: '6px' }}>
              {stat.value}
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Arrows ── */}
      {([
        { label: 'Previous', side: 'left'  as const, onClick: prev, points: '18,4 8,14 18,24' },
        { label: 'Next',     side: 'right' as const, onClick: next, points: '10,4 20,14 10,24' },
      ]).map(({ label, side, onClick, points }) => (
        <button
          key={label}
          onClick={onClick}
          aria-label={`${label} slide`}
          style={{
            position: 'absolute', [side]: 20, top: '50%', transform: 'translateY(-50%)',
            zIndex: 10, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.2)',
            cursor: 'pointer', padding: '14px 10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: 0.7, transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.background = 'rgba(0,0,0,0.6)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.7'; e.currentTarget.style.background = 'rgba(0,0,0,0.3)'; }}
        >
          <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
            <polyline points={points} stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ))}

      {/* ── Dots ── */}
      <div style={{
        position: 'absolute', bottom: 80, left: '50%', transform: 'translateX(-50%)',
        zIndex: 10, display: 'flex', gap: 10, alignItems: 'center',
      }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === current ? 40 : 10, height: 3,
              background: i === current ? 'var(--gold, #c9a96e)' : 'rgba(255,255,255,0.35)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'width 0.4s ease, background 0.4s ease',
            }}
          />
        ))}
      </div>

    </section>
  );
}