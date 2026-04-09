'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const VIDEO_SRC = '/videos/hero/hero-bg.mp4';
const FALLBACK_IMAGE = 'Use-AI-Image-Mar-26-2026-21_05_37.png';

const STATS = [
  { value: '15+',       label: 'YEARS IN BUSINESS' },
  { value: '500+',      label: 'PROJECTS DONE' },
  { value: 'PAN India', label: 'SERVICE AREA' },
  { value: '100%',      label: 'FULL TURNKEY' },
];

// CSS injected once on mount — keeps animations out of inline styles
// so server HTML and client first-render are always identical.
const ANIMATION_CSS = `
@keyframes heroFadeUp {
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
}
.hero-fade-1 { animation: heroFadeUp 0.8s ease-out 0.2s forwards; }
.hero-fade-2 { animation: heroFadeUp 0.8s ease-out 0.4s forwards; }
.hero-fade-3 { animation: heroFadeUp 0.8s ease-out 0.6s forwards; }
.hero-fade-4 { animation: heroFadeUp 0.8s ease-out 0.8s forwards; }
.hero-stat-0 { animation: heroFadeUp 0.8s ease-out 1.1s  forwards; }
.hero-stat-1 { animation: heroFadeUp 0.8s ease-out 1.2s  forwards; }
.hero-stat-2 { animation: heroFadeUp 0.8s ease-out 1.3s  forwards; }
.hero-stat-3 { animation: heroFadeUp 0.8s ease-out 1.4s  forwards; }
`;

export default function Hero() {
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Inject keyframe CSS once
    if (!document.getElementById('hero-anim-css')) {
      const style = document.createElement('style');
      style.id = 'hero-anim-css';
      style.textContent = ANIMATION_CSS;
      document.head.appendChild(style);
    }

    const video = videoRef.current;
    if (video) {
      video.play().catch(() => setVideoError(true));
    }
  }, []);

  return (
    <section style={{
      position: 'relative',
      height: '100vh',
      minHeight: 700,
      overflow: 'hidden',
      background: '#0a0805',
    }}>

      {/* ── Background video / fallback image ── */}
      <div suppressHydrationWarning style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        {videoError ? (
          <img
            src={FALLBACK_IMAGE}
            alt="Interior Design"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            poster={FALLBACK_IMAGE}
            onError={() => setVideoError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>
        )}
      </div>

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

      {/* ── Hero copy ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 4,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '0 8vw', maxWidth: 900,
      }}>

        {/* opacity:0 is the static starting state — same on server & client.
            The CSS class adds the animation after hydration. */}
        <p className="hero-fade-1" style={{
          fontFamily: 'var(--font-body)',
          fontSize: '11px', letterSpacing: '3px',
          textTransform: 'uppercase',
          color: 'var(--gold, #c9a96e)',
          marginBottom: '20px',
          opacity: 0,
        }}>
          INTERIOR DESIGN · FIT-OUT · INDIA
        </p>

        <h1 className="hero-fade-2" style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px, 5vw, 62px)',
          fontWeight: 700, lineHeight: 1.12,
          color: '#ffffff', marginBottom: '24px',
          opacity: 0,
        }}>
          Design, Build, Fit-Out<br />
          Villas &amp; Apartments<br />
          Across India
        </h1>

        <p className="hero-fade-3" style={{
          fontFamily: 'var(--font-body)',
          fontSize: '15px', lineHeight: 1.7,
          color: 'rgba(255,255,255,0.75)',
          maxWidth: 420, marginBottom: '36px',
          opacity: 0,
        }}>
          Full turnkey services for residential and commercial projects across India.
        </p>

        <div className="hero-fade-4" style={{
          display: 'flex', gap: '16px', flexWrap: 'wrap',
          opacity: 0,
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

      {/* ── Stats bar ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 5,
        display: 'flex',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(10,8,5,0.55)',
        backdropFilter: 'blur(10px)',
      }}>
        {STATS.map((stat, i) => (
          <div
            key={i}
            className={`hero-stat-${i}`}
            style={{
              flex: 1, padding: '24px 16px',
              borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
              textAlign: 'center',
              opacity: 0,
            }}
          >
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '26px', fontWeight: 600, color: 'var(--gold, #c9a96e)', marginBottom: '6px' }}>
              {stat.value}
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}