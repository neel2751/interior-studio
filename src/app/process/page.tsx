'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Button from '@/components/common/Button';
import { PROCESS_STEPS } from '@/lib/constants';

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

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(48px)', transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

const STAGE_IMAGES = [
  '/images/process/stage-1-consultation.jpg',
  '/images/process/stage-2-concept.jpg',
  '/images/process/stage-3-planning.jpg',
  '/images/process/stage-4-materials.jpg',
  '/images/process/stage-5-execution.jpg',
  '/images/process/stage-6-handover.jpg',
];

const STAGE_ICONS = ['◎', '◈', '◉', '◐', '◑', '◒'];

function ProcessStep({
  step,
  index,
  isLast,
  isActive,
  onClick,
}: {
  step: (typeof PROCESS_STEPS)[0];
  index: number;
  isLast: boolean;
  isActive: boolean;
  onClick: () => void;
}) {
  const { ref, inView } = useInView(0.1);
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      style={{
        opacity:    inView ? 1 : 0,
        transform:  inView ? 'translateY(0)' : 'translateY(56px)',
        transition: `opacity 0.8s ease ${index * 100}ms, transform 0.8s ease ${index * 100}ms`,
      }}
    >
      <div
        style={{
          display:   'grid',
          gridTemplateColumns: '1fr 80px 1fr',
          gap:       0,
          alignItems: 'start',
          marginBottom: isLast ? 0 : 0,
        }}
      >

        <div style={{ padding: '0 48px 0 0', textAlign: 'right', visibility: isEven ? 'visible' : 'hidden' }}>
          {isEven && (
            <StepContent step={step} index={index} isActive={isActive} onClick={onClick} align="right" />
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button
            onClick={onClick}
            style={{
              width:        56,
              height:       56,
              borderRadius: '50%',
              border:       `2px solid ${isActive ? 'var(--gold)' : 'rgba(255,255,255,0.15)'}`,
              background:   isActive ? 'var(--gold)' : '#0d0d0d',
              color:        isActive ? '#000' : 'rgba(255,255,255,0.5)',
              fontFamily:   'var(--font-display)',
              fontSize:     18,
              fontWeight:   300,
              cursor:       'pointer',
              display:      'flex',
              alignItems:   'center',
              justifyContent: 'center',
              flexShrink:   0,
              transition:   'all 0.3s ease',
              zIndex:       2,
              position:     'relative',
              boxShadow:    isActive ? '0 0 24px rgba(201,169,110,0.35)' : 'none',
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </button>

          {!isLast && (
            <div style={{
              width:      1,
              flexGrow:   1,
              minHeight:  80,
              background: `linear-gradient(to bottom, ${isActive ? 'var(--gold)' : 'rgba(255,255,255,0.1)'}, rgba(255,255,255,0.05))`,
              transition: 'background 0.4s ease',
              marginTop:  4,
            }} />
          )}
        </div>

        <div style={{ padding: '0 0 0 48px', visibility: isEven ? 'hidden' : 'visible' }}>
          {!isEven && (
            <StepContent step={step} index={index} isActive={isActive} onClick={onClick} align="left" />
          )}
        </div>
      </div>
    </div>
  );
}

function StepContent({
  step, index, isActive, onClick, align,
}: {
  step: (typeof PROCESS_STEPS)[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
  align: 'left' | 'right';
}) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        cursor:     'pointer',
        padding:    '28px 32px',
        border:     `1px solid ${isActive ? 'rgba(201,169,110,0.35)' : hov ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'}`,
        background: isActive ? 'rgba(201,169,110,0.05)' : hov ? 'rgba(255,255,255,0.02)' : 'transparent',
        transition: 'all 0.3s ease',
        textAlign:  align,
        marginBottom: 80,
      }}
    >

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: align === 'right' ? 'flex-end' : 'flex-start', marginBottom: 12 }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', color: isActive ? 'var(--gold)' : 'rgba(255,255,255,0.3)' }}>
          Stage {String(index + 1).padStart(2, '0')}
        </span>
        <span style={{ fontSize: 16, opacity: 0.5 }}>{STAGE_ICONS[index]}</span>
      </div>

      <h3 style={{
        fontFamily:   'var(--font-display)',
        fontSize:     'clamp(18px,2vw,26px)',
        fontWeight:   300,
        color:        isActive ? '#ffffff' : 'rgba(255,255,255,0.7)',
        lineHeight:   1.2,
        marginBottom: 12,
        transition:   'color 0.3s ease',
      }}>
        {step.title}
      </h3>

      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize:   13,
        lineHeight: 1.8,
        color:      isActive ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.35)',
        transition: 'color 0.3s ease',
      }}>
        {step.description}
      </p>

      {isActive && (
        <div style={{
          display:    'flex',
          alignItems: 'center',
          gap:        8,
          marginTop:  16,
          justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
        }}>
          <div style={{ width: 24, height: 1, background: 'var(--gold)' }} />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)' }}>
            Current Stage
          </span>
        </div>
      )}
    </div>
  );
}

function StatCard({ value, label, sub, delay }: { value: string; label: string; sub: string; delay: number }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} style={{ textAlign: 'center', padding: '48px 24px', border: '1px solid rgba(255,255,255,0.07)', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(40px)', transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,5vw,56px)', fontWeight: 300, color: 'var(--gold)', lineHeight: 1, marginBottom: 12 }}>{value}</p>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#fff', marginBottom: 10 }}>{label}</p>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, lineHeight: 1.7, color: 'rgba(255,255,255,0.4)' }}>{sub}</p>
    </div>
  );
}

export default function ProcessPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeStep, setActiveStep]   = useState(0);

  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 80); return () => clearTimeout(t); }, []);

  const fade = (delay: number) => ({
    opacity:    heroVisible ? 1 : 0,
    transform:  heroVisible ? 'translateY(0)' : 'translateY(30px)',
    transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
  });

  return (
    <>
      <style>{`
        html { scroll-behavior: smooth; }
        .prc-btn-primary { display:inline-flex;align-items:center;gap:10px;padding:16px 36px;font-family:var(--font-body);font-size:11px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;text-decoration:none;background:#c9a96e;color:#0a0a0a;border:1.5px solid #c9a96e;transition:all 0.3s ease; }
        .prc-btn-primary:hover { background:transparent;color:#c9a96e; }
        .prc-btn-ghost { display:inline-flex;align-items:center;gap:10px;padding:16px 36px;font-family:var(--font-body);font-size:11px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;text-decoration:none;background:transparent;color:#c9a96e;border:1.5px solid #c9a96e;transition:all 0.3s ease; }
        .prc-btn-ghost:hover { background:#c9a96e;color:#0a0a0a; }
        .prc-divider { width:48px;height:1px;background:var(--gold);margin:20px 0; }

        /* Mobile: stack timeline vertically */
        @media (max-width: 768px) {
          .prc-timeline-item { grid-template-columns: 48px 1fr !important; }
          .prc-timeline-left { display: none !important; }
          .prc-timeline-center { order: -1; }
          section { padding-left: 20px !important; padding-right: 20px !important; }
          .prc-stats { grid-template-columns: 1fr !important; }
          .prc-preview { display: none !important; }
        }
      `}</style>
      
      <section style={{ position: 'relative', minHeight: '68vh', display: 'flex', alignItems: 'flex-end', background: 'linear-gradient(135deg, #0d0d1a 0%, #1a1520 40%, #0a0a0a 100%)', paddingTop: 100, overflow: 'hidden' }}>

        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")", opacity: 0.5, pointerEvents: 'none' }} />
  
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', opacity: 0.6 }} />
    
        <div style={{ position: 'absolute', right: '3%', bottom: '10%', fontFamily: 'var(--font-display)', fontSize: 'clamp(100px,18vw,220px)', fontWeight: 300, color: 'rgba(255,255,255,0.025)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none', letterSpacing: '-4px' }}>
          PROCESS
        </div>

        <div style={{ position: 'relative', width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 48px 80px' }}>
     
          <nav style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 32, ...fade(0) }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>›</span>
            <span style={{ color: 'var(--gold)' }}>Our Process</span>
          </nav>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20, ...fade(100) }}>
            How We Work
          </p>

          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(44px,6vw,84px)', fontWeight: 300, color: '#ffffff', lineHeight: 1.05, marginBottom: 24, maxWidth: 700, ...fade(200) }}>
            The Design<br />
            <em style={{ fontStyle: 'italic', color: 'var(--gold-light)' }}>Journey</em>
          </h1>

          <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(15px,2vw,20px)', fontWeight: 300, fontStyle: 'italic', color: 'rgba(255,255,255,0.55)', maxWidth: 540, marginBottom: 48, ...fade(340) }}>
            A structured six-stage process that guides your project from first conversation to final reveal — with clarity, craft, and care at every step.
          </p>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', ...fade(460) }}>
            {PROCESS_STEPS.map((_, i) => (
              <Button
                key={i}
                onClick={() => setActiveStep(i)}
                variant={activeStep === i ? 'default' : 'ghost'}
                size="sm"
              >
                {String(i + 1).padStart(2, '0')}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#0a0a0a', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 32, padding: '28px 0', minHeight: 80 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
            <div style={{ width: 40, height: 40, border: '1px solid var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 300, color: 'var(--gold)' }}>
              {String(activeStep + 1).padStart(2, '0')}
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>Current Stage</p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 300, color: '#fff' }}>{PROCESS_STEPS[activeStep]?.title}</p>
            </div>
          </div>
          <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.1)', flexShrink: 0 }} />
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.7, color: 'rgba(255,255,255,0.45)', maxWidth: 600 }}>
            {PROCESS_STEPS[activeStep]?.description}
          </p>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <div style={{ width: 120, height: 2, background: 'rgba(255,255,255,0.1)', position: 'relative' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', background: 'var(--gold)', width: `${((activeStep + 1) / PROCESS_STEPS.length) * 100}%`, transition: 'width 0.4s ease' }} />
            </div>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '1.5px', color: 'var(--gold)' }}>
              {activeStep + 1}/{PROCESS_STEPS.length}
            </span>
          </div>
        </div>
      </section>

      <section style={{ background: '#0d0d0d', padding: '96px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <AnimatedSection delay={0}>
            <div style={{ textAlign: 'center', marginBottom: 80 }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>Six Stages</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 300, color: '#fff', lineHeight: 1.15, marginBottom: 16 }}>From Vision to Reality</h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.9, color: 'rgba(255,255,255,0.4)', maxWidth: 480, margin: '0 auto' }}>
                Click any stage to explore it in detail. Each step builds naturally on the last.
              </p>
            </div>
          </AnimatedSection>

          <div style={{ position: 'relative' }}>
            {PROCESS_STEPS.map((step, index) => (
              <ProcessStep
                key={step.id}
                step={step}
                index={index}
                isLast={index === PROCESS_STEPS.length - 1}
                isActive={activeStep === index}
                onClick={() => setActiveStep(index)}
              />
            ))}
          </div>
        </div>
      </section>
      <section style={{ background: '#111', padding: '80px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <AnimatedSection delay={0}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }} className="prc-preview">
              <div style={{ aspectRatio: '4/3', overflow: 'hidden', position: 'relative', background: '#0d0d0d' }}>
                <img
                  src={STAGE_IMAGES[activeStep]}
                  alt={PROCESS_STEPS[activeStep]?.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.4s ease' }}
                  onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0'; }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />
                <div style={{ position: 'absolute', bottom: 24, left: 24 }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 6 }}>Stage {String(activeStep + 1).padStart(2, '0')}</p>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 300, color: '#fff' }}>{PROCESS_STEPS[activeStep]?.title}</p>
                </div>
              </div>

              <div style={{ background: '#0d0d0d', padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20 }}>What to Expect</p>
                <div style={{ width: 48, height: 1, background: 'var(--gold)', marginBottom: 28 }} />
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.9, color: 'rgba(255,255,255,0.65)', marginBottom: 40 }}>
                  {PROCESS_STEPS[activeStep]?.description}
                </p>

                <div style={{ display: 'flex', gap: 12 }}>
                  <Button
                    onClick={() => setActiveStep(s => Math.max(0, s - 1))}
                    variant="ghost"
                    size="sm"
                    disabled={activeStep === 0}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </Button>
                  <Button
                    onClick={() => setActiveStep(s => Math.min(PROCESS_STEPS.length - 1, s + 1))}
                    variant="default"
                    size="sm"
                    disabled={activeStep === PROCESS_STEPS.length - 1}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </Button>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '2px', color: 'var(--gold)', display: 'flex', alignItems: 'center', marginLeft: 8 }}>
                    {String(activeStep + 1).padStart(2, '0')} / {String(PROCESS_STEPS.length).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section style={{ background: '#0a0a0a', padding: '0 48px' }}>
        <div className="prc-stats" style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <StatCard value="10+" label="Years Experience" sub="Proven expertise across residential and commercial projects" delay={0} />
          <StatCard value="200+" label="Projects Completed" sub="Successfully delivered with satisfied clients across India" delay={120} />
          <StatCard value="98%" label="Client Satisfaction" sub="Exceptional service quality and attention to detail" delay={240} />
        </div>
      </section>

      <section style={{ background: '#111', padding: '96px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <AnimatedSection delay={0}>
            <div style={{ marginBottom: 64, textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>Why It Works</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 300, color: '#fff', lineHeight: 1.15 }}>Built for Confidence at Every Stage</h2>
            </div>
          </AnimatedSection>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
            {[
              { title: 'Full Transparency',    body: 'You are informed and involved at every decision point. No surprises — just clarity.' },
              { title: 'Single Point of Contact', body: 'One dedicated designer manages your project from start to finish.' },
              { title: 'On-Time Delivery',     body: 'We set realistic timelines and honour them with structured project management.' },
              { title: 'Budget Discipline',    body: 'Every spending decision is communicated in advance and signed off by you.' },
              { title: 'Premium Sourcing',     body: 'Our supplier network ensures the best materials at the most competitive prices.' },
              { title: 'Post-Handover Support',body: 'We remain available after handover to address any queries or adjustments.' },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 80}>
                <div style={{ padding: '36px 32px', border: '1px solid rgba(255,255,255,0.06)', height: '100%' }}>
                  <div style={{ width: 32, height: 1, background: 'var(--gold)', marginBottom: 20 }} />
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 300, color: '#fff', marginBottom: 12, lineHeight: 1.2 }}>{item.title}</h4>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.8, color: 'rgba(255,255,255,0.45)' }}>{item.body}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2010 50%, #1a1a1a 100%)', padding: '96px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, border: '1px solid rgba(201,169,110,0.06)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 400, height: 400, border: '1px solid rgba(201,169,110,0.08)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 640, margin: '0 auto' }}>
          <AnimatedSection delay={0}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 24 }}>Begin Your Journey</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 300, color: '#fff', lineHeight: 1.15, marginBottom: 20 }}>
              Ready to Begin Your Design Journey?
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', marginBottom: 48 }}>
              Let&apos;s start with a consultation to understand your vision and create a roadmap for your dream space.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button href="/contact" size="lg" showArrow>
                Schedule Consultation
              </Button>
              <Button href="/projects" variant="ghost" size="lg">
                View Our Work
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}