'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { PROJECTS } from '@/lib/constants';

type FilterType = 'all' | 'residential' | 'commercial';

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
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

function AnimatedSection({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} suppressHydrationWarning className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(50px)', transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

function ProjectCard({ project, index }: { project: (typeof PROJECTS)[0]; index: number }) {
  const { ref, inView } = useInView(0.1);
  const [hovered, setHovered] = useState(false);
  return (
    <div ref={ref} suppressHydrationWarning style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(50px)', transition: `opacity 0.7s ease ${index * 120}ms, transform 0.7s ease ${index * 120}ms` }}>
      <Link href={`/projects/${project.id}`} style={{ textDecoration: 'none', display: 'block' }}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <div style={{ transform: hovered ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)', boxShadow: hovered ? '0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,169,110,0.15)' : '0 4px 20px rgba(0,0,0,0.25)', transition: 'transform 0.4s ease, box-shadow 0.4s ease', background: '#111', overflow: 'hidden' }}>
          <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
            <img src={project.images[0]} alt={project.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hovered ? 'scale(1.08)' : 'scale(1)', transition: 'transform 0.6s ease', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)', opacity: hovered ? 1 : 0.5, transition: 'opacity 0.4s ease' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(10px)', transition: 'opacity 0.35s ease, transform 0.35s ease' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#fff', border: '1px solid rgba(255,255,255,0.6)', padding: '10px 24px', backdropFilter: 'blur(4px)' }}>View Project</span>
            </div>
            <div style={{ position: 'absolute', top: 16, left: 16 }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 9, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: project.category === 'residential' ? '#4ade80' : '#60a5fa', background: project.category === 'residential' ? 'rgba(34,197,94,0.15)' : 'rgba(59,130,246,0.15)', border: `1px solid ${project.category === 'residential' ? 'rgba(74,222,128,0.3)' : 'rgba(96,165,250,0.3)'}`, padding: '4px 10px' }}>{project.category}</span>
            </div>
            {project.featured && (
              <div style={{ position: 'absolute', top: 16, right: 16 }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--gold)', background: 'rgba(201,169,110,0.15)', border: '1px solid rgba(201,169,110,0.3)', padding: '4px 10px' }}>Featured</span>
              </div>
            )}
          </div>
          <div style={{ padding: '24px 24px 28px', background: '#111' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>{project.location} · {project.completionDate}</p>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 300, color: hovered ? 'var(--gold-light)' : '#ffffff', lineHeight: 1.2, marginBottom: 10, transition: 'color 0.3s ease' }}>{project.title}</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.7, color: 'rgba(255,255,255,0.45)', marginBottom: 20, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{project.description}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {project.scopeOfWork?.slice(0, 3).map((s) => (
                <span key={s} style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '1px', color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.1)', padding: '3px 10px' }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', padding: '10px 24px', border: `1px solid ${active ? 'var(--gold)' : 'rgba(255,255,255,0.15)'}`, background: active ? 'var(--gold)' : (hovered ? 'rgba(255,255,255,0.05)' : 'transparent'), color: active ? '#000' : (hovered ? 'var(--gold)' : 'rgba(255,255,255,0.6)'), cursor: 'pointer', transition: 'all 0.25s ease', transform: hovered && !active ? 'scale(1.04)' : 'scale(1)' }}>
      {label}
    </button>
  );
}

function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} suppressHydrationWarning style={{ textAlign: 'center', padding: '40px 24px', border: '1px solid rgba(255,255,255,0.07)', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(40px)', transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 300, color: 'var(--gold)', lineHeight: 1, marginBottom: 12 }}>{value}</p>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>{label}</p>
    </div>
  );
}

function CategoryStrip() {
  const cats = [
    { label: 'Residential Projects', count: PROJECTS.filter(p => p.category === 'residential').length, href: '/projects?category=residential', color: 'rgba(74,222,128,0.15)', border: 'rgba(74,222,128,0.2)', text: '#4ade80' },
    { label: 'Commercial Projects',  count: PROJECTS.filter(p => p.category === 'commercial').length,  href: '/projects?category=commercial',  color: 'rgba(96,165,250,0.15)', border: 'rgba(96,165,250,0.2)', text: '#60a5fa' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      {cats.map((cat, i) => (
        <AnimatedSection key={cat.label} delay={i * 150}>
          <Link href={cat.href} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '40px 48px', borderRight: i === 0 ? '1px solid rgba(255,255,255,0.06)' : 'none', textDecoration: 'none' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '2px', textTransform: 'uppercase', color: cat.text, marginBottom: 8, background: cat.color, border: `1px solid ${cat.border}`, display: 'inline-block', padding: '3px 10px' }}>{cat.label}</p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 300, color: '#fff' }}>{cat.count} Projects</p>
            </div>
            <svg width="24" height="24" viewBox="0 0 16 16" fill="none" style={{ color: 'rgba(255,255,255,0.2)', flexShrink: 0 }}><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </AnimatedSection>
      ))}
    </div>
  );
}

export default function ProjectsPage() {
  const [filter, setFilter]             = useState<FilterType>('all');
  const [showFeatured, setShowFeatured] = useState(false);
  const [heroVisible, setHeroVisible]   = useState(false);
  const [searchQuery, setSearchQuery]   = useState('');

  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 80); return () => clearTimeout(t); }, []);

  const filtered = PROJECTS.filter((p) => {
    const matchCat    = filter === 'all' || p.category === filter;
    const matchFeat   = !showFeatured || p.featured;
    const matchSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchFeat && matchSearch;
  });

  return (
    <>
      <style>{`
        html { scroll-behavior: smooth; }
        .prj-toggle-track { width:44px;height:24px;border-radius:12px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);position:relative;cursor:pointer;transition:background 0.25s,border-color 0.25s;flex-shrink:0; }
        .prj-toggle-track.on { background:rgba(201,169,110,0.3);border-color:var(--gold); }
        .prj-toggle-thumb { position:absolute;top:3px;left:3px;width:16px;height:16px;border-radius:50%;background:rgba(255,255,255,0.4);transition:transform 0.25s ease,background 0.25s; }
        .prj-toggle-track.on .prj-toggle-thumb { transform:translateX(20px);background:var(--gold); }
        .prj-search { background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:#fff;font-family:var(--font-body);font-size:12px;letter-spacing:1px;padding:10px 16px 10px 40px;outline:none;width:220px;transition:border-color 0.25s,background 0.25s; }
        .prj-search::placeholder { color:rgba(255,255,255,0.3); }
        .prj-search:focus { border-color:var(--gold);background:rgba(255,255,255,0.07); }
        @media (max-width:900px) { .prj-grid{grid-template-columns:repeat(2,1fr)!important;} }
        @media (max-width:600px) { .prj-grid{grid-template-columns:1fr!important;} .prj-controls{flex-direction:column!important;align-items:flex-start!important;} .prj-stats{grid-template-columns:repeat(2,1fr)!important;} }
      `}</style>

      <section style={{ position:'relative', minHeight:'70vh', display:'flex', alignItems:'flex-end', background:'linear-gradient(135deg, #0d0d1a 0%, #1a1a2e 40%, #0a0a0a 100%)', paddingTop:100, overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")", opacity:0.5, pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'linear-gradient(90deg, transparent, var(--gold), transparent)', opacity:0.6 }} />
        <div style={{ position:'absolute', right:'5%', top:'50%', transform:'translateY(-50%)', fontFamily:'var(--font-display)', fontSize:'clamp(120px,20vw,260px)', fontWeight:300, color:'rgba(255,255,255,0.025)', lineHeight:1, userSelect:'none', pointerEvents:'none' }}>{PROJECTS.length}</div>

        <div style={{ position:'relative', width:'100%', maxWidth:1200, margin:'0 auto', padding:'0 48px 80px' }}>
          <nav suppressHydrationWarning style={{ display:'flex', alignItems:'center', gap:8, fontFamily:'var(--font-body)', fontSize:11, letterSpacing:1.5, textTransform:'uppercase', marginBottom:32, opacity:heroVisible?1:0, transform:heroVisible?'translateY(0)':'translateY(20px)', transition:'opacity 0.7s ease 0ms,transform 0.7s ease 0ms' }}>
            <Link href="/" style={{ color:'rgba(255,255,255,0.4)', textDecoration:'none' }}>Home</Link>
            <span style={{ color:'rgba(255,255,255,0.2)' }}>›</span>
            <span style={{ color:'var(--gold)' }}>Projects</span>
          </nav>
          <p suppressHydrationWarning style={{ fontFamily:'var(--font-body)', fontSize:10, letterSpacing:4, textTransform:'uppercase', color:'var(--gold)', marginBottom:20, opacity:heroVisible?1:0, transform:heroVisible?'translateY(0)':'translateY(25px)', transition:'opacity 0.7s ease 100ms,transform 0.7s ease 100ms' }}>Our Portfolio</p>
          <h1 suppressHydrationWarning style={{ fontFamily:'var(--font-display)', fontSize:'clamp(44px,6vw,84px)', fontWeight:600, color:'#ffffff', lineHeight:1.05, marginBottom:24, maxWidth:800, opacity:heroVisible?1:0, transform:heroVisible?'translateY(0)':'translateY(32px)', transition:'opacity 0.8s ease 200ms,transform 0.8s ease 200ms' }}>
            Spaces That Tell<br /><em style={{ fontStyle:'italic', color:'var(--gold-light)' }}>Extraordinary</em> Stories
          </h1>
          <p suppressHydrationWarning style={{ fontFamily:'var(--font-display)', fontSize:'clamp(16px,2vw,22px)', fontWeight:300, fontStyle:'italic', color:'rgba(255,255,255,0.55)', maxWidth:540, marginBottom:48, opacity:heroVisible?1:0, transform:heroVisible?'translateY(0)':'translateY(32px)', transition:'opacity 0.8s ease 340ms,transform 0.8s ease 340ms' }}>
            From modern villas to boutique hotels — {PROJECTS.length} projects across India.
          </p>
          <div suppressHydrationWarning style={{ display:'flex', gap:16, flexWrap:'wrap', opacity:heroVisible?1:0, transform:heroVisible?'translateY(0)':'translateY(32px)', transition:'opacity 0.8s ease 460ms,transform 0.8s ease 460ms' }}>
            <AnimBtn href="#projects" variant="ghost" size="lg" showArrow>Explore Projects</AnimBtn>
            <AnimBtn href="/contact" variant="primary" size="lg">Book a Consultation</AnimBtn>
          </div>
        </div>
      </section>

      <section style={{ background:'#0a0a0a', padding:'0 48px' }}>
        <div className="prj-stats" style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
          <StatCard value={`${PROJECTS.length}+`} label="Projects Completed" delay={0} />
          <StatCard value={`${PROJECTS.filter(p=>p.category==='residential').length}`} label="Residential" delay={100} />
          <StatCard value={`${PROJECTS.filter(p=>p.category==='commercial').length}`} label="Commercial" delay={200} />
          <StatCard value="100%" label="Client Satisfaction" delay={300} />
        </div>
      </section>

      <section id="projects" style={{ background:'#0d0d0d', padding:'96px 48px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <AnimatedSection delay={0}>
            <div style={{ marginBottom:56 }}>
              <p style={{ fontFamily:'var(--font-body)', fontSize:10, letterSpacing:4, textTransform:'uppercase', color:'var(--gold)', marginBottom:16 }}>All Work</p>
              <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,3.5vw,44px)', fontWeight:300, color:'#ffffff', lineHeight:1.15 }}>Featured Projects</h2>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="prj-controls" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:20, marginBottom:48, flexWrap:'wrap' }}>
              <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                {(['all','residential','commercial'] as FilterType[]).map((val) => (
                  <FilterPill key={val} label={val==='all'?'All Projects':val.charAt(0).toUpperCase()+val.slice(1)} active={filter===val} onClick={() => setFilter(val)} />
                ))}
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:20, flexWrap:'wrap' }}>
                <div style={{ position:'relative' }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'rgba(255,255,255,0.3)' }}>
                    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  <input type="text" placeholder="Search projects..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="prj-search" />
                </div>
                <label style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer' }}>
                  <div className={`prj-toggle-track ${showFeatured?'on':''}`} onClick={() => setShowFeatured(v=>!v)}>
                    <div className="prj-toggle-thumb" />
                  </div>
                  <span style={{ fontFamily:'var(--font-body)', fontSize:11, letterSpacing:'1.5px', textTransform:'uppercase', color:'rgba(255,255,255,0.5)' }}>Featured only</span>
                </label>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={150}>
            <p style={{ fontFamily:'var(--font-body)', fontSize:11, letterSpacing:'1.5px', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:32 }}>
              Showing {filtered.length} of {PROJECTS.length} projects
            </p>
          </AnimatedSection>

          {filtered.length === 0 ? (
            <div style={{ textAlign:'center', padding:'80px 0' }}>
              <p style={{ fontFamily:'var(--font-display)', fontSize:28, fontWeight:300, color:'rgba(255,255,255,0.3)' }}>No projects found.</p>
            </div>
          ) : (
            <div className="prj-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:2 }}>
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section style={{ background:'#111' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 48px' }}>
          <CategoryStrip />
        </div>
      </section>

      <section style={{ background:'linear-gradient(135deg, #1a1a1a 0%, #2a2010 50%, #1a1a1a 100%)', padding:'96px 48px', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:600, height:600, border:'1px solid rgba(201,169,110,0.06)', borderRadius:'50%', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:400, height:400, border:'1px solid rgba(201,169,110,0.08)', borderRadius:'50%', pointerEvents:'none' }} />
        <div style={{ position:'relative', maxWidth:640, margin:'0 auto' }}>
          <AnimatedSection delay={0}>
            <p style={{ fontFamily:'var(--font-body)', fontSize:10, letterSpacing:4, textTransform:'uppercase', color:'var(--gold)', marginBottom:24 }}>Begin Your Project</p>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(32px,4vw,52px)', fontWeight:300, color:'#ffffff', lineHeight:1.15, marginBottom:20 }}>Have a Project in Mind?</h2>
            <p style={{ fontFamily:'var(--font-body)', fontSize:14, lineHeight:1.8, color:'rgba(255,255,255,0.5)', marginBottom:48 }}>
              Let&apos;s collaborate to create a space that reflects your vision and exceeds every expectation.
            </p>
            <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
              <AnimBtn href="/contact" variant="primary" size="xl">Book a Consultation</AnimBtn>
              <AnimBtn href="/services" variant="ghost" size="xl">Our Services</AnimBtn>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}