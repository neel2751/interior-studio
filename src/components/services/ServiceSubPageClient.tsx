'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Project } from '@/types/project';

export interface ServiceSubPageData {
  title: string;
  description: string;
  detailedDescription: string;
  features: string[];
  process: string[];
  heroGradient: string;
  categoryLabel: string;
  categoryHref: string;
  projectsFilter: string;
  ctaHeading: string;
}

function useInView<T extends HTMLElement = HTMLDivElement>(threshold = 0.12) {
  const ref = useRef<T>(null);
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

function AnimatedSection({ children, delay = 0, style = {} }: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      suppressHydrationWarning
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(48px)',
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, inView } = useInView(0.1);
  const [hov, setHov] = useState(false);

  return (
    <div
      ref={ref}
      suppressHydrationWarning
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(48px) scale(0.98)',
        transition: `opacity 0.7s ease ${index * 120}ms, transform 0.7s ease ${index * 120}ms`,
      }}
    >
      <Link
        href={`/projects/${project.id}`}
        style={{ textDecoration: 'none', display: 'block' }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        <div
          style={{
            position: 'relative', overflow: 'hidden', aspectRatio: '4/3', background: '#111',
            transform: hov ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
            boxShadow: hov
              ? '0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,169,110,0.15)'
              : '0 4px 20px rgba(0,0,0,0.2)',
            transition: 'transform 0.4s ease, box-shadow 0.4s ease',
          }}
        >
          <img
            src={project.images[0]}
            alt={project.title}
            loading="lazy"
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transform: hov ? 'scale(1.08)' : 'scale(1)',
              transition: 'transform 0.6s ease', display: 'block',
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 55%)',
            opacity: hov ? 1 : 0.4, transition: 'opacity 0.4s ease',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: hov ? 1 : 0,
            transform: hov ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}>
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 600,
              letterSpacing: '2.5px', textTransform: 'uppercase', color: '#fff',
              border: '1px solid rgba(255,255,255,0.55)', padding: '9px 22px',
              backdropFilter: 'blur(4px)',
            }}>
              View Project
            </span>
          </div>
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 20px 18px',
            opacity: hov ? 1 : 0,
            transform: hov ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.35s ease, transform 0.35s ease',
          }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 5 }}>
              {project.location}
            </p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 300, color: '#fff', lineHeight: 1.2 }}>
              {project.title}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      suppressHydrationWarning
      style={{
        textAlign: 'center', padding: '36px 24px',
        border: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(255,255,255,0.02)',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        cursor: 'default',
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.3)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
    >
      <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 300, color: 'var(--gold)', lineHeight: 1, marginBottom: 10 }}>
        {value}
      </p>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
        {label}
      </p>
    </div>
  );
}

function FeatureItem({ text, index }: { text: string; index: number }) {
  const { ref, inView } = useInView<HTMLLIElement>(0.05);
  return (
    <li
      ref={ref}
      suppressHydrationWarning
      style={{
        display: 'flex', alignItems: 'flex-start', gap: 12,
        padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.06)',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateX(0)' : 'translateX(-20px)',
        transition: `opacity 0.6s ease ${index * 80}ms, transform 0.6s ease ${index * 80}ms`,
        listStyle: 'none',
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0, marginTop: 6 }} />
      <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(255,255,255,0.72)', lineHeight: 1.6 }}>
        {text}
      </span>
    </li>
  );
}

function ProcessStep({ text, index }: { text: string; index: number }) {
  const { ref, inView } = useInView(0.05);
  return (
    <div
      ref={ref}
      suppressHydrationWarning
      style={{
        display: 'flex', alignItems: 'flex-start', gap: 20,
        padding: '22px 0', borderBottom: '1px solid rgba(255,255,255,0.06)',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.65s ease ${index * 90}ms, transform 0.65s ease ${index * 90}ms`,
      }}
    >
      <div
        style={{
          flexShrink: 0, width: 40, height: 40,
          border: '1px solid rgba(201,169,110,0.35)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'border-color 0.3s, background 0.3s',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--gold)';
          (e.currentTarget as HTMLDivElement).style.background = 'rgba(201,169,110,0.08)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(201,169,110,0.35)';
          (e.currentTarget as HTMLDivElement).style.background = 'transparent';
        }}
      >
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 300, color: 'var(--gold)' }}>
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginTop: 8 }}>
        {text}
      </p>
    </div>
  );
}

function AnimBtn({
  href,
  variant,
  size = 'md',
  fullWidth = false,
  children,
}: {
  href: string;
  variant: 'primary' | 'ghost' | 'luxury';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
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
      <span
        suppressHydrationWarning
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
          transform: shimmer && hov ? 'translateX(110%)' : 'translateX(-110%)',
          transition: shimmer ? 'transform 0.7s ease' : 'none',
          pointerEvents: 'none', zIndex: 1,
        }}
      />
      <span style={{ position: 'relative', zIndex: 2 }}>{children}</span>
      {(variant === 'ghost' || variant === 'luxury') && (
        <svg
          width="15" height="15" viewBox="0 0 16 16" fill="none"
          style={{
            position: 'relative', zIndex: 2, flexShrink: 0,
            transform: hov ? 'translateX(4px)' : 'translateX(0)',
            transition: 'transform 0.3s ease',
          }}
        >
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </Link>
  );
}

interface Props {
  service: ServiceSubPageData;
  related: Project[];
  breadcrumbLabel: string;
}

export default function ServiceSubPageClient({ service, related, breadcrumbLabel }: Props) {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const fade = (delay: number): React.CSSProperties => ({
    opacity: heroVisible ? 1 : 0,
    transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
    transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
  });

  return (
    <>
      <style>{`
        .ssp-divider { width: 48px; height: 1px; background: var(--gold); margin: 22px 0; }
        .ssp-scope-pill {
          display: inline-flex; align-items: center; padding: 8px 18px;
          border: 1px solid rgba(201,169,110,0.3);
          font-family: var(--font-body); font-size: 11px;
          letter-spacing: 1.5px; text-transform: uppercase; color: var(--gold);
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
          cursor: default;
        }
        .ssp-scope-pill:hover { background: rgba(201,169,110,0.08); border-color: var(--gold); transform: scale(1.03); }
        @media (max-width: 768px) {
          .ssp-two-col   { grid-template-columns: 1fr !important; gap: 48px !important; }
          .ssp-three-col { grid-template-columns: 1fr !important; }
          .ssp-stats     { grid-template-columns: 1fr !important; }
          section        { padding-left: 20px !important; padding-right: 20px !important; }
        }
      `}</style>

      <section style={{ position: 'relative', minHeight: '72vh', display: 'flex', alignItems: 'flex-end', background: service.heroGradient, paddingTop: 100, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")", opacity: 0.4, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', opacity: 0.55 }} />
        <div style={{ position: 'absolute', right: '3%', bottom: '8%', fontFamily: 'var(--font-display)', fontSize: 'clamp(80px,14vw,180px)', fontWeight: 300, color: 'rgba(255,255,255,0.025)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none', maxWidth: '60%', wordBreak: 'break-word' }}>
          {service.title.split(' ')[0]}
        </div>

        <div style={{ position: 'relative', width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 48px 80px' }}>
          <nav suppressHydrationWarning style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 32, ...fade(0) }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>›</span>
            <Link href={service.categoryHref} style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>{breadcrumbLabel}</Link>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>›</span>
            <span style={{ color: 'var(--gold)' }}>{service.title}</span>
          </nav>

          <p suppressHydrationWarning style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20, ...fade(100) }}>
            {service.categoryLabel}
          </p>
          <h1 suppressHydrationWarning style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,5.5vw,72px)', fontWeight: 600, color: '#fff', lineHeight: 1.05, marginBottom: 24, maxWidth: 800, ...fade(220) }}>
            {service.title}
          </h1>
          <p suppressHydrationWarning style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(16px,2vw,22px)', fontWeight: 300, fontStyle: 'italic', color: 'rgba(255,255,255,0.58)', maxWidth: 580, marginBottom: 48, ...fade(360) }}>
            {service.description}
          </p>

          <div suppressHydrationWarning style={{ display: 'flex', gap: 14, flexWrap: 'wrap', ...fade(480) }}>
            <AnimBtn href="/contact" variant="primary" size="lg">Book a Consultation</AnimBtn>
            <AnimBtn href="/projects" variant="ghost" size="lg">View Portfolio</AnimBtn>
          </div>
        </div>
      </section>

      <section style={{ background: '#0a0a0a', padding: '0 48px' }}>
        <div className="ssp-stats" style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <StatCard value="10+"  label="Years of Experience" delay={0}   />
          <StatCard value="200+" label="Projects Delivered"  delay={120} />
          <StatCard value="100%" label="Client Satisfaction" delay={240} />
        </div>
      </section>

      <section style={{ background: '#111111', padding: '96px 48px' }}>
        <div className="ssp-two-col" style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px 80px', alignItems: 'start' }}>
          <AnimatedSection delay={0}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>About This Service</p>
            <div className="ssp-divider" />
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.9, color: 'rgba(255,255,255,0.65)', marginBottom: 44 }}>
              {service.detailedDescription}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>Scope of Work</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 44 }}>
              {service.process.map((item, i) => (
                <span key={i} className="ssp-scope-pill">{item}</span>
              ))}
            </div>
            <AnimBtn href="/contact" variant="luxury" size="md">Discuss Your Project</AnimBtn>
          </AnimatedSection>

          <AnimatedSection delay={150}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>What We Deliver</p>
            <div className="ssp-divider" />
            <ul style={{ padding: 0, margin: 0, marginBottom: 44 }}>
              {service.features.map((feat, i) => (
                <FeatureItem key={i} text={feat} index={i} />
              ))}
            </ul>
            <AnimBtn href="/projects" variant="ghost" size="md">See Our Work</AnimBtn>
          </AnimatedSection>
        </div>
      </section>

      <section style={{ background: '#0d0d0d', padding: '96px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <AnimatedSection delay={0}>
            <div style={{ marginBottom: 56 }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>How We Work</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 300, color: '#fff', lineHeight: 1.15 }}>Our Process</h2>
            </div>
          </AnimatedSection>
          <div className="ssp-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 80px' }}>
            {service.process.map((step, i) => (
              <ProcessStep key={i} text={step} index={i} />
            ))}
          </div>
          <AnimatedSection delay={200}>
            <div style={{ marginTop: 56, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <AnimBtn href="/contact" variant="primary" size="lg">Start Your Project</AnimBtn>
              <AnimBtn href="/process" variant="luxury" size="lg">Our Full Process</AnimBtn>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {related.length > 0 && (
        <section style={{ background: '#111', padding: '96px 48px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <AnimatedSection delay={0}>
              <div style={{ marginBottom: 56 }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>Our Work</p>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 300, color: '#fff', lineHeight: 1.15 }}>Related Projects</h2>
              </div>
            </AnimatedSection>
            <div className="ssp-three-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
              {related.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
            <AnimatedSection delay={200}>
              <div style={{ marginTop: 48, textAlign: 'center' }}>
                <AnimBtn href={`/projects?category=${service.projectsFilter}`} variant="ghost" size="lg">
                  View All {service.categoryLabel} Projects
                </AnimBtn>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      <section style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2010 50%, #1a1a1a 100%)', padding: '96px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, border: '1px solid rgba(201,169,110,0.06)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 400, height: 400, border: '1px solid rgba(201,169,110,0.08)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 640, margin: '0 auto' }}>
          <AnimatedSection delay={0}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 24 }}>Begin Your Project</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 300, color: '#fff', lineHeight: 1.15, marginBottom: 20 }}>
              {service.ctaHeading}
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', marginBottom: 48 }}>
              Let&apos;s discuss your {service.title.toLowerCase()} project. Our team is ready to bring your vision to life.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <AnimBtn href="/contact" variant="primary" size="xl">Book a Consultation</AnimBtn>
              <AnimBtn href="/projects" variant="ghost" size="xl">View Our Portfolio</AnimBtn>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}