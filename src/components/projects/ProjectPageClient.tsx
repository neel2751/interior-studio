'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Project } from '@/types/project';

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function AnimBtn({
  href,
  variant,
  size = 'md',
  fullWidth = false,
  showArrow = false,
  children,
}: {
  href: string;
  variant: 'primary' | 'ghost' | 'luxury';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
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
        width: fullWidth ? '100%' : undefined,
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

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} suppressHydrationWarning style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(48px)', transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

function Lightbox({ images, startIndex, onClose }: { images: string[]; startIndex: number; onClose: () => void }) {
  const [idx, setIdx] = useState(startIndex);
  const prev = useCallback(() => setIdx(i => (i === 0 ? images.length - 1 : i - 1)), [images.length]);
  const next = useCallback(() => setIdx(i => (i === images.length - 1 ? 0 : i + 1)), [images.length]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose, prev, next]);

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={onClose}>
      <button onClick={onClose} style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', width: 44, height: 44, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.2s' }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
      </button>
      {images.length > 1 && (
        <button onClick={e => { e.stopPropagation(); prev(); }} style={{ position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)', background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', width: 48, height: 48, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      )}
      <div style={{ maxWidth: '85vw', maxHeight: '85vh' }} onClick={e => e.stopPropagation()}>
        <img src={images[idx]} alt={`Image ${idx + 1}`} style={{ maxWidth: '100%', maxHeight: '85vh', objectFit: 'contain', display: 'block' }} />
      </div>
      {images.length > 1 && (
        <button onClick={e => { e.stopPropagation(); next(); }} style={{ position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)', background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', width: 48, height: 48, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      )}
      <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '2px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>
        {idx + 1} / {images.length}
      </div>
      {images.length > 1 && (
        <div style={{ position: 'absolute', bottom: 56, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8 }}>
          {images.map((_, i) => (
            <button key={i} onClick={e => { e.stopPropagation(); setIdx(i); }} style={{ width: i === idx ? 24 : 6, height: 6, borderRadius: 3, background: i === idx ? 'var(--gold)' : 'rgba(255,255,255,0.3)', border: 'none', cursor: 'pointer', padding: 0, transition: 'width 0.3s, background 0.3s' }} />
          ))}
        </div>
      )}
    </div>
  );
}

function RelatedCard({ project, index }: { project: Project; index: number }) {
  const { ref, inView } = useInView(0.1);
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref} suppressHydrationWarning style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(48px)', transition: `opacity 0.7s ease ${index * 130}ms, transform 0.7s ease ${index * 130}ms` }}>
      <Link href={`/projects/${project.id}`} style={{ textDecoration: 'none', display: 'block' }}
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
        <div style={{ transform: hov ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)', boxShadow: hov ? '0 20px 50px rgba(0,0,0,0.4)' : '0 4px 16px rgba(0,0,0,0.2)', transition: 'transform 0.4s ease, box-shadow 0.4s ease', overflow: 'hidden', background: '#111' }}>
          <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
            <img src={project.images[0]} alt={project.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hov ? 'scale(1.08)' : 'scale(1)', transition: 'transform 0.6s ease' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 55%)', opacity: hov ? 1 : 0.4, transition: 'opacity 0.4s ease' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: hov ? 1 : 0, transition: 'opacity 0.3s ease' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#fff', border: '1px solid rgba(255,255,255,0.5)', padding: '8px 20px' }}>View Project</span>
            </div>
          </div>
          <div style={{ padding: '20px 20px 24px', background: '#111' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>{project.location}</p>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 300, color: hov ? 'var(--gold-light)' : '#fff', transition: 'color 0.3s ease', lineHeight: 1.2 }}>{project.title}</h4>
          </div>
        </div>
      </Link>
    </div>
  );
}

interface Props { project: Project; related: Project[]; }

export default function ProjectPageClient({ project, related }: Props) {
  const [heroVisible, setHeroVisible] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [activeImg, setActiveImg] = useState(0);
  const [thumbHov, setThumbHov] = useState<number | null>(null);
  const [mainHov, setMainHov] = useState(false);

  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 80); return () => clearTimeout(t); }, []);

  const fade = (delay: number) => ({
    opacity: heroVisible ? 1 : 0,
    transform: heroVisible ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
  });

  return (
    <>
      <style>{`
        .ppg-divider { width:48px;height:1px;background:var(--gold);margin:20px 0; }
        .ppg-meta-item { display:flex;align-items:flex-start;gap:14px;padding:18px 0;border-bottom:1px solid rgba(255,255,255,0.06); }
        .ppg-meta-item:last-child { border-bottom:none; }
        .ppg-scope-item { display:flex;align-items:flex-start;gap:12px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.05); }
        .ppg-scope-item:last-child { border-bottom:none; }
        @media (max-width:1024px) { .ppg-layout { grid-template-columns:1fr !important; } }
        @media (max-width:768px) { .ppg-related { grid-template-columns:1fr !important; } section { padding-left:20px !important;padding-right:20px !important; } }
      `}</style>

      <section style={{ position: 'relative', minHeight: '60vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', paddingTop: 80 }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src={project.images[0]} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: heroVisible ? 'scale(1)' : 'scale(1.06)', transition: 'transform 1.4s ease' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.25) 100%)' }} />
        </div>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', opacity: 0.6 }} />

        <div style={{ position: 'relative', width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 48px 72px' }}>
          <nav suppressHydrationWarning style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 28, ...fade(0) }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>›</span>
            <Link href="/projects" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Projects</Link>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>›</span>
            <span style={{ color: 'var(--gold)' }}>{project.title}</span>
          </nav>

          <div suppressHydrationWarning style={{ display: 'flex', gap: 10, marginBottom: 20, ...fade(100) }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 9, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: project.category === 'residential' ? '#4ade80' : '#60a5fa', background: project.category === 'residential' ? 'rgba(34,197,94,0.15)' : 'rgba(59,130,246,0.15)', border: `1px solid ${project.category === 'residential' ? 'rgba(74,222,128,0.3)' : 'rgba(96,165,250,0.3)'}`, padding: '4px 12px' }}>{project.category}</span>
            {project.featured && <span style={{ fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', background: 'rgba(201,169,110,0.15)', border: '1px solid rgba(201,169,110,0.3)', padding: '4px 12px' }}>Featured</span>}
          </div>

          <h1 suppressHydrationWarning style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,5.5vw,72px)', fontWeight: 300, color: '#fff', lineHeight: 1.05, marginBottom: 20, maxWidth: 800, ...fade(200) }}>
            {project.title}
          </h1>

          <div suppressHydrationWarning style={{ display: 'flex', flexWrap: 'wrap', gap: 28, ...fade(340) }}>
            {[
              { icon: '📍', label: project.location },
              { icon: '📅', label: project.completionDate },
              { icon: '👤', label: project.client },
            ].map(m => (
              <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.5px' }}>
                <span style={{ fontSize: 13 }}>{m.icon}</span>
                {m.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#0d0d0d', padding: '80px 48px' }}>
        <div className="ppg-layout" style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 380px', gap: '64px 56px', alignItems: 'start' }}>

          <div>
            <AnimatedSection delay={0}>
              <div
                style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden', cursor: 'pointer', marginBottom: 12 }}
                onMouseEnter={() => setMainHov(true)}
                onMouseLeave={() => setMainHov(false)}
                onClick={() => setLightboxIdx(activeImg)}
              >
                <img src={project.images[activeImg]} alt={`${project.title} main`} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: mainHov ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.6s ease', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', opacity: mainHov ? 1 : 0, transition: 'opacity 0.35s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AnimBtn href="#" variant="luxury" size="md">Open Gallery</AnimBtn>
                </div>
                <div style={{ position: 'absolute', bottom: 16, right: 16, fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '1.5px', color: 'rgba(255,255,255,0.7)', background: 'rgba(0,0,0,0.6)', padding: '4px 12px', backdropFilter: 'blur(4px)' }}>
                  {activeImg + 1} / {project.images.length}
                </div>
              </div>

              {project.images.length > 1 && (
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(project.images.length, 4)}, 1fr)`, gap: 8 }}>
                  {project.images.map((img, i) => (
                    <div key={i} onClick={() => setActiveImg(i)} onMouseEnter={() => setThumbHov(i)} onMouseLeave={() => setThumbHov(null)}
                      style={{ aspectRatio: '4/3', overflow: 'hidden', cursor: 'pointer', border: `2px solid ${activeImg === i ? 'var(--gold)' : 'transparent'}`, transition: 'border-color 0.25s', transform: thumbHov === i ? 'scale(1.03)' : 'scale(1)' } as React.CSSProperties}>
                      <img src={img} alt={`thumb ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: activeImg === i ? 1 : thumbHov === i ? 0.85 : 0.55, transition: 'opacity 0.25s' }} />
                    </div>
                  ))}
                </div>
              )}
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <div style={{ marginTop: 64 }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>Project Overview</p>
                <div className="ppg-divider" />
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.9, color: 'rgba(255,255,255,0.65)', marginBottom: 40 }}>{project.description}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>Design Concept</p>
                <div className="ppg-divider" />
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.9, color: 'rgba(255,255,255,0.65)' }}>{project.designConcept}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={150}>
              <div style={{ marginTop: 64 }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>Scope of Work</p>
                <div className="ppg-divider" />
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {project.scopeOfWork.map((item, i) => (
                    <li key={i} className="ppg-scope-item">
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0, marginTop: 6 }} />
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div style={{ marginTop: 64 }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>Materials & Finishes</p>
                <div className="ppg-divider" />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {project.materials.map((m, i) => (
                    <span key={i} style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '1.5px', color: 'rgba(255,255,255,0.65)', border: '1px solid rgba(201,169,110,0.3)', padding: '7px 16px', textTransform: 'uppercase' }}>{m}</span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
=
          <AnimatedSection delay={250}>
            <div style={{ position: 'sticky', top: 96 }}>
              <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', padding: '32px', marginBottom: 24 }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 24 }}>Project Details</p>
                <div>
                  {[
                    { label: 'Category', value: project.category.charAt(0).toUpperCase() + project.category.slice(1) },
                    { label: 'Location', value: project.location },
                    { label: 'Client', value: project.client },
                    { label: 'Completed', value: project.completionDate },
                  ].map(({ label, value }) => (
                    <div key={label} className="ppg-meta-item">
                      <div>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 6 }}>{label}</p>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.5px' }}>{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: 'linear-gradient(135deg, #1a1508 0%, #2a2010 100%)', border: '1px solid rgba(201,169,110,0.2)', padding: '32px', textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>Inspired?</p>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 300, color: '#fff', lineHeight: 1.3, marginBottom: 12 }}>Transform Your Space</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.7, color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>
                  Let&apos;s create something extraordinary together.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <AnimBtn href="/contact" variant="primary" size="lg" fullWidth showArrow>Book a Consultation</AnimBtn>
                  <AnimBtn href="/projects" variant="luxury" size="lg" fullWidth>View Projects</AnimBtn>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {related.length > 0 && (
        <section style={{ background: '#111', padding: '96px 48px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <AnimatedSection delay={0}>
              <div style={{ marginBottom: 56 }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>Continue Exploring</p>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 300, color: '#fff', lineHeight: 1.15 }}>Related Projects</h2>
              </div>
            </AnimatedSection>
            <div className="ppg-related" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
              {related.map((p, i) => <RelatedCard key={p.id} project={p} index={i} />)}
            </div>
            <AnimatedSection delay={200}>
              <div style={{ marginTop: 48, textAlign: 'center' }}>
                <AnimBtn href="/projects" variant="ghost" size="lg" showArrow>View All Projects</AnimBtn>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      <section style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2010 50%, #1a1a1a 100%)', padding: '96px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, border: '1px solid rgba(201,169,110,0.06)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 400, height: 400, border: '1px solid rgba(201,169,110,0.08)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 600, margin: '0 auto' }}>
          <AnimatedSection delay={0}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 24 }}>Begin Your Project</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 300, color: '#fff', lineHeight: 1.15, marginBottom: 20 }}>
              Transform Your Space Like This
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', marginBottom: 48 }}>
              Let&apos;s create something extraordinary together. Schedule a consultation to discuss your vision.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <AnimBtn href="/contact" variant="primary" size="xl" showArrow>Book a Consultation</AnimBtn>
              <AnimBtn href="/projects" variant="ghost" size="xl">View All Projects</AnimBtn>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {lightboxIdx !== null && (
        <Lightbox images={project.images} startIndex={lightboxIdx} onClose={() => setLightboxIdx(null)} />
      )}
    </>
  );
}