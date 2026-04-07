'use client';

import { useState } from 'react';
import Link from 'next/link';

function AnimBtn({
  href,
  variant,
  size = 'md',
  showArrow = false,
  children,
}: {
  href: string;
  variant: 'primary' | 'ghost' | 'luxury';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showArrow?: boolean;
  children: React.ReactNode;
}) {
  const [hov, setHov] = useState(false);
  const [shimmer, setShimmer] = useState(false);

  const sizeMap = {
    sm: { padding: '11px 26px', fontSize: 9,  letterSpacing: '0.18em' },
    md: { padding: '15px 36px', fontSize: 10, letterSpacing: '0.22em' },
    lg: { padding: '18px 48px', fontSize: 11, letterSpacing: '0.24em' },
    xl: { padding: '21px 60px', fontSize: 12, letterSpacing: '0.26em' },
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: hov ? 'transparent' : 'var(--gold)',
      color: hov ? 'var(--gold)' : '#0a0a0a',
      border: '1.5px solid var(--gold)',
      boxShadow: hov
        ? '0 0 0 1px rgba(201,169,110,0.5), 0 8px 28px rgba(201,169,110,0.22)'
        : 'inset 0 1px 0 rgba(255,255,255,0.22), 0 4px 20px rgba(201,169,110,0.32)',
    },
    ghost: {
      background: hov ? 'var(--gold)' : 'transparent',
      color: hov ? '#0a0a0a' : 'rgba(255,255,255,0.78)',
      border: hov ? '1.5px solid var(--gold)' : '1.5px solid rgba(255,255,255,0.22)',
      boxShadow: hov
        ? 'inset 0 1px 0 rgba(255,255,255,0.18), 0 8px 28px rgba(201,169,110,0.35)'
        : 'none',
    },
    luxury: {
      background: hov ? '#141414' : '#0d0d0d',
      color: 'var(--gold)',
      border: '1.5px solid transparent',
      boxShadow: hov
        ? '0 0 0 1px rgba(201,169,110,1), 0 0 28px rgba(201,169,110,0.26), inset 0 1px 0 rgba(201,169,110,0.14)'
        : '0 0 0 1px rgba(201,169,110,0.42), inset 0 1px 0 rgba(201,169,110,0.07)',
    },
  };

  return (
    <Link
      href={href}
      suppressHydrationWarning
      onMouseEnter={() => { setHov(true); setShimmer(true); }}
      onMouseLeave={() => { setHov(false); setTimeout(() => setShimmer(false), 700); }}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        overflow: 'hidden',
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        textTransform: 'uppercase',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        transform: hov ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'all 0.45s cubic-bezier(0.23,1,0.32,1)',
        ...sizeMap[size],
        ...variantStyles[variant],
      }}
    >
      <span suppressHydrationWarning style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)', transform: shimmer && hov ? 'translateX(110%)' : 'translateX(-110%)', transition: shimmer ? 'transform 0.7s ease' : 'none', pointerEvents: 'none', zIndex: 1 }} />
      <span style={{ position: 'relative', zIndex: 2 }}>{children}</span>
      {(showArrow || variant === 'ghost' || variant === 'luxury') && (
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" style={{ position: 'relative', zIndex: 2, flexShrink: 0, transform: hov ? 'translateX(4px)' : 'translateX(0)', transition: 'transform 0.3s ease' }}>
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </Link>
  );
}

const CTA = () => {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: '#0f0f0f', padding: 'var(--section-pad-y) var(--section-pad-x)' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src="/images/projects/modern-villa-ahmedabad/cover.png"
          alt=""
          aria-hidden
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)' }} />
      </div>

      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 80, height: 1, background: 'var(--gold)', opacity: 0.8, zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 720, margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20 }}>
          Begin Your Journey
        </p>

        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 4.5vw, 56px)', fontWeight: 300, color: '#ffffff', letterSpacing: 1, lineHeight: 1.2, marginBottom: 24 }}>
          Ready to Transform<br />Your Space?
        </h2>

        <div style={{ width: 48, height: 1, background: 'var(--gold)', opacity: 0.7, marginBottom: 28 }} />

        <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.9, maxWidth: 520, marginBottom: 48 }}>
          Let&#39;s collaborate to create an interior that reflects your style and enhances your lifestyle. Schedule a consultation with our design team today.
        </p>

        <div className="cta-buttons" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 48 }}>
          <AnimBtn href="/contact" variant="primary" size="lg" showArrow>Book Consultation</AnimBtn>
          <AnimBtn href="tel:+919876543210" variant="ghost" size="lg">Call Us Now</AnimBtn>
        </div>

        <div className="cta-badges" style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
          {[
            { dot: '#C9A96E', label: 'Free Initial Consultation' },
            { dot: '#C9A96E', label: 'Response Within 24 Hours' },
            { dot: '#C9A96E', label: 'Pan-India Service' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: item.dot, opacity: 0.8, flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: 1, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 540px) {
          .cta-buttons { flex-direction: column; align-items: stretch; }
          .cta-buttons a { text-align: center; }
          .cta-badges { gap: 16px !important; }
        }
      `}</style>
    </section>
  );
};

export default CTA;