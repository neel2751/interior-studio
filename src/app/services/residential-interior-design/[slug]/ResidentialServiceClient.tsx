"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PROJECTS } from "@/lib/constants";
import type { ResidentialService } from "@/types/service";

interface ResidentialServiceClientProps {
  service: ResidentialService;
  related: typeof PROJECTS;
}

export default function ResidentialServiceClient({
  service,
  related,
}: ResidentialServiceClientProps) {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const relatedProjects = related
    .filter((p) => service.projectExamples?.includes(p.id))
    .slice(0, 3);

  const fallbackProjects = PROJECTS.slice(0, 3);
  const displayProjects = relatedProjects.length > 0 ? relatedProjects : fallbackProjects;

  return (
    <>
      <style>{`
        @keyframes sdFadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .sd-f1 { animation: sdFadeUp 0.8s ease both 0.1s; }
        .sd-f2 { animation: sdFadeUp 0.8s ease both 0.25s; }
        .sd-f3 { animation: sdFadeUp 0.8s ease both 0.4s; }
        .sd-f4 { animation: sdFadeUp 0.8s ease both 0.55s; }

        .sd-feature-item {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 14px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .sd-feature-item:last-child { border-bottom: none; }

        .sd-scope-pill {
          display: inline-flex; align-items: center;
          padding: 8px 18px;
          border: 1px solid rgba(201,169,110,0.3);
          font-family: var(--font-body); font-size: 11px;
          letter-spacing: 1.5px; text-transform: uppercase; color: var(--gold);
          transition: background 0.2s, border-color 0.2s;
        }
        .sd-scope-pill:hover { background: rgba(201,169,110,0.08); border-color: var(--gold); }

        .sd-step {
          display: flex; align-items: flex-start; gap: 20px;
          padding: 24px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .sd-step:last-child { border-bottom: none; }

        .sd-project-card {
          position: relative; overflow: hidden;
          aspect-ratio: 4/3; background: #111;
          display: block; text-decoration: none;
        }
        .sd-project-card img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.6s ease;
        }
        .sd-project-card:hover img { transform: scale(1.06); }
        .sd-project-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%);
          opacity: 0; transition: opacity 0.3s ease;
          display: flex; align-items: flex-end; padding: 24px;
        }
        .sd-project-card:hover .sd-project-overlay { opacity: 1; }

        .sd-divider { width: 48px; height: 1px; background: var(--gold); margin: 24px 0; }

        .sd-stat-card {
          padding: 32px 24px; text-align: center;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.02);
          transition: border-color 0.3s;
        }
        .sd-stat-card:hover { border-color: rgba(201,169,110,0.3); }

        /* ─── LUXURY BUTTON BASE ─── */
        .sd-cta-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px 40px;
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          text-decoration: none;
          overflow: hidden;
          cursor: pointer;
          /* Shimmer pseudo-element */
          transition:
            background 0.45s cubic-bezier(0.23,1,0.32,1),
            color 0.45s cubic-bezier(0.23,1,0.32,1),
            border-color 0.45s cubic-bezier(0.23,1,0.32,1),
            box-shadow 0.45s cubic-bezier(0.23,1,0.32,1),
            transform 0.45s cubic-bezier(0.23,1,0.32,1);
        }

        /* Shimmer sweep on hover */
        .sd-cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          transform: translateX(-110%);
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: transform 0.7s ease;
          pointer-events: none;
          z-index: 1;
        }
        .sd-cta-btn:hover::before { transform: translateX(110%); }

        /* Arrow nudge */
        .sd-cta-btn svg {
          position: relative;
          z-index: 2;
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }
        .sd-cta-btn:hover svg { transform: translateX(4px); }

        /* Button text above shimmer */
        .sd-cta-btn span {
          position: relative;
          z-index: 2;
        }

        /* ─── PRIMARY: Gold filled → transparent on hover ─── */
        .sd-cta-primary {
          background: var(--gold);
          color: #0a0a0a;
          border: 1.5px solid var(--gold);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.25),
            0 4px 20px rgba(201,169,110,0.35);
        }
        .sd-cta-primary:hover {
          background: transparent;
          color: var(--gold);
          border-color: var(--gold);
          box-shadow:
            0 0 0 1px rgba(201,169,110,0.6),
            0 8px 32px rgba(201,169,110,0.25);
          transform: translateY(-2px);
        }
        .sd-cta-primary:active { transform: translateY(0); }

        /* ─── GHOST: Transparent → gold filled on hover ─── */
        .sd-cta-ghost {
          background: transparent;
          color: rgba(255,255,255,0.75);
          border: 1.5px solid rgba(255,255,255,0.2);
          box-shadow: none;
        }
        .sd-cta-ghost:hover {
          background: var(--gold);
          color: #0a0a0a;
          border-color: var(--gold);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.2),
            0 8px 28px rgba(201,169,110,0.4);
          transform: translateY(-2px);
        }
        .sd-cta-ghost:active { transform: translateY(0); }

        /* ─── LUXURY: Dark bg with glowing gold border ─── */
        .sd-cta-luxury {
          background: #0d0d0d;
          color: var(--gold);
          border: 1.5px solid transparent;
          box-shadow:
            0 0 0 1px rgba(201,169,110,0.45),
            inset 0 1px 0 rgba(201,169,110,0.08);
        }
        .sd-cta-luxury:hover {
          background: #141414;
          box-shadow:
            0 0 0 1px rgba(201,169,110,1),
            0 0 28px rgba(201,169,110,0.28),
            inset 0 1px 0 rgba(201,169,110,0.15);
          transform: translateY(-2px);
        }
        .sd-cta-luxury:active { transform: translateY(0); }

        /* ─── SIZES ─── */
        .sd-cta-sm  { padding: 12px 28px; font-size: 9px; letter-spacing: 0.18em; }
        .sd-cta-lg  { padding: 20px 52px; font-size: 11px; letter-spacing: 0.25em; }
        .sd-cta-xl  { padding: 22px 64px; font-size: 12px; letter-spacing: 0.28em; }
        .sd-cta-full { width: 100%; }

        @media (max-width: 768px) {
          .sd-two-col   { grid-template-columns: 1fr !important; gap: 48px !important; }
          .sd-three-col { grid-template-columns: 1fr !important; }
          .sd-stats     { grid-template-columns: 1fr !important; }
          section, .sd-section { padding-left: 20px !important; padding-right: 20px !important; }
          .sd-main-layout { grid-template-columns: 1fr !important; }
          .sd-cta-lg { padding: 16px 36px !important; }
        }
      `}</style>

      <section
        style={{
          position: 'relative', minHeight: '72vh',
          display: 'flex', alignItems: 'flex-end',
          background: service.heroGradient, paddingTop: 100,
        }}
      >
        <div style={{ position:'absolute', inset:0, backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")", opacity:0.4, pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'linear-gradient(90deg, transparent, var(--gold), transparent)', opacity:0.5 }} />

        <div style={{ position:'relative', width:'100%', maxWidth:1200, margin:'0 auto', padding:'0 48px 80px' }}>
          <nav className="sd-f1" style={{ display:'flex', alignItems:'center', gap:8, fontFamily:'var(--font-body)', fontSize:11, letterSpacing:1.5, textTransform:'uppercase', marginBottom:32 }}>
            <Link href="/" style={{ color:'rgba(255,255,255,0.4)', textDecoration:'none' }}>Home</Link>
            <span style={{ color:'rgba(255,255,255,0.2)' }}>›</span>
            <Link href="/services/residential-interior-design" style={{ color:'rgba(255,255,255,0.4)', textDecoration:'none' }}>
              Residential Design
            </Link>
            <span style={{ color:'rgba(255,255,255,0.2)' }}>›</span>
            <span style={{ color:'var(--gold)' }}>{service.title}</span>
          </nav>

          <p className="sd-f2" style={{ fontFamily:'var(--font-body)', fontSize:10, letterSpacing:4, textTransform:'uppercase', color:'var(--gold)', marginBottom:20 }}>
            Residential Design
          </p>

          <h1 className="sd-f3" style={{ fontFamily:'var(--font-display)', fontSize:'clamp(36px, 5.5vw, 72px)', fontWeight:300, color:'#ffffff', lineHeight:1.1, marginBottom:24, maxWidth:800 }}>
            {service.title}
          </h1>

          <p className="sd-f4" style={{ fontFamily:'var(--font-display)', fontSize:'clamp(16px, 2vw, 22px)', fontWeight:300, fontStyle:'italic', color:'rgba(255,255,255,0.6)', maxWidth:580, marginBottom: 48 }}>
            {service.description}
          </p>

          <div className="sd-f4" style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
            <Link href="/contact" className="sd-cta-btn sd-cta-primary sd-cta-lg">
              <span>Book a Consultation</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
            <Link href="/projects" className="sd-cta-btn sd-cta-ghost sd-cta-lg">
              <span>View Portfolio</span>
            </Link>
          </div>
        </div>
      </section>

      <section style={{ background:'#0a0a0a', padding:'0 48px' }}>
        <div className="sd-stats" style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(3,1fr)', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
          {[
            { value:'10+',  label:'Years of Experience' },
            { value:'200+', label:'Projects Delivered' },
            { value:'100%', label:'Client Satisfaction' },
          ].map((stat) => (
            <div key={stat.label} className="sd-stat-card">
              <p style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,4vw,44px)', fontWeight:300, color:'var(--gold)', lineHeight:1, marginBottom:10 }}>{stat.value}</p>
              <p style={{ fontFamily:'var(--font-body)', fontSize:10, letterSpacing:2.5, textTransform:'uppercase', color:'rgba(255,255,255,0.4)' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="sd-section" style={{ background:'#111111', padding:'96px 48px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div className="sd-main-layout" style={{ display:'grid', gridTemplateColumns:'1fr 320px', gap:'64px' }}>

            <div>
              <div style={{ marginBottom:80 }}>
                <p style={{ fontFamily:'var(--font-body)', fontSize:10, letterSpacing:4, textTransform:'uppercase', color:'var(--gold)', marginBottom:20 }}>Service Overview</p>
                <div className="sd-divider" />
                <p style={{ fontFamily:'var(--font-body)', fontSize:15, lineHeight:1.9, color:'rgba(255,255,255,0.65)' }}>
                  {service.detailedDescription}
                </p>
              </div>

              <div style={{ marginBottom:80 }}>
                <p style={{ fontFamily:'var(--font-body)', fontSize:10, letterSpacing:4, textTransform:'uppercase', color:'var(--gold)', marginBottom:20 }}>What We Deliver</p>
                <div className="sd-divider" />
                <ul style={{ listStyle:'none', padding:0, margin:0 }}>
                  {service.features.map((feat, i) => (
                    <li key={i} className="sd-feature-item">
                      <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--gold)', flexShrink:0, marginTop:6 }} />
                      <span style={{ fontFamily:'var(--font-body)', fontSize:14, color:'rgba(255,255,255,0.72)', lineHeight:1.6 }}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ marginBottom:64 }}>
                <p style={{ fontFamily:'var(--font-body)', fontSize:10, letterSpacing:4, textTransform:'uppercase', color:'var(--gold)', marginBottom:20 }}>How We Work</p>
                <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(24px,3vw,36px)', fontWeight:300, color:'#ffffff', lineHeight:1.15, marginBottom:40 }}>Our Process</h2>
                <div className="sd-two-col" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 40px' }}>
                  {service.process.map((step, i) => (
                    <div key={i} className="sd-step">
                      <div style={{ flexShrink:0, width:36, height:36, border:'1px solid rgba(201,169,110,0.4)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <span style={{ fontFamily:'var(--font-display)', fontSize:14, fontWeight:300, color:'var(--gold)' }}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <div>
                        <p style={{ fontFamily:'var(--font-body)', fontSize:13, color:'rgba(255,255,255,0.7)', lineHeight:1.7 }}>{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
                <Link href="/contact" className="sd-cta-btn sd-cta-primary">
                  <span>Start Your Project</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
                <Link href="/process" className="sd-cta-btn sd-cta-luxury">
                  <span>Our Full Process</span>
                </Link>
              </div>
            </div>

            <div style={{ position:'sticky', top:100, height:'fit-content' }}>
              <div style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)', padding:32, marginBottom:24 }}>
                <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:24, paddingBottom:24, borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ width:48, height:48, border:'1px solid rgba(201,169,110,0.3)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <span style={{ fontFamily:'var(--font-display)', fontSize:20, color:'var(--gold)' }}>10+</span>
                  </div>
                  <div>
                    <p style={{ fontFamily:'var(--font-body)', fontSize:11, letterSpacing:2, textTransform:'uppercase', color:'rgba(255,255,255,0.4)', marginBottom:4 }}>Experience</p>
                    <p style={{ fontFamily:'var(--font-body)', fontSize:14, color:'rgba(255,255,255,0.8)' }}>Years of Excellence</p>
                  </div>
                </div>

                <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:24, paddingBottom:24, borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ minWidth:80, padding:'0 8px', height:48, border:'1px solid rgba(201,169,110,0.3)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <span style={{ fontFamily:'var(--font-display)', fontSize:13, color:'var(--gold)', whiteSpace:'nowrap' }}>{service.duration || '4-8 wks'}</span>
                  </div>
                  <div>
                    <p style={{ fontFamily:'var(--font-body)', fontSize:11, letterSpacing:2, textTransform:'uppercase', color:'rgba(255,255,255,0.4)', marginBottom:4 }}>Duration</p>
                    <p style={{ fontFamily:'var(--font-body)', fontSize:14, color:'rgba(255,255,255,0.8)' }}>Project Timeline</p>
                  </div>
                </div>

                <div style={{ display:'flex', alignItems:'center', gap:16 }}>
                  <div style={{ width:48, height:48, border:'1px solid rgba(201,169,110,0.3)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <span style={{ fontFamily:'var(--font-display)', fontSize:16, color:'var(--gold)' }}>★</span>
                  </div>
                  <div>
                    <p style={{ fontFamily:'var(--font-body)', fontSize:11, letterSpacing:2, textTransform:'uppercase', color:'rgba(255,255,255,0.4)', marginBottom:4 }}>Quality</p>
                    <p style={{ fontFamily:'var(--font-body)', fontSize:14, color:'rgba(255,255,255,0.8)' }}>Premium Materials</p>
                  </div>
                </div>
              </div>

              <div style={{ background:'linear-gradient(135deg, #1a1a1a 0%, #2a2010 100%)', border:'1px solid rgba(201,169,110,0.15)', padding:32, textAlign:'center' }}>
                <p style={{ fontFamily:'var(--font-body)', fontSize:10, letterSpacing:3, textTransform:'uppercase', color:'var(--gold)', marginBottom:16 }}>Get Started</p>
                <h3 style={{ fontFamily:'var(--font-display)', fontSize:20, fontWeight:300, color:'#ffffff', marginBottom:24 }}>
                  Ready to transform your space?
                </h3>
                <Link href="/projects" className="sd-cta-btn sd-cta-primary sd-cta-full" style={{ marginBottom:12 }}>
                  <span>View Our Portfolio</span>
                </Link>
                <Link href="/contact" className="sd-cta-btn sd-cta-ghost sd-cta-full" style={{ marginBottom:16 }}>
                  <span>Book a Consultation</span>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
                <p style={{ fontFamily:'var(--font-body)', fontSize:11, color:'rgba(255,255,255,0.3)', letterSpacing:1 }}>
                  Free initial consultation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {service.gallery && service.gallery.length > 0 && (
        <section className="sd-section" style={{ background:'#111111', padding:'96px 48px' }}>
          <div style={{ maxWidth:1200, margin:'0 auto' }}>
            <div style={{ marginBottom:56 }}>
              <p style={{ fontFamily:'var(--font-body)', fontSize:10, letterSpacing:4, textTransform:'uppercase', color:'var(--gold)', marginBottom:16 }}>Portfolio</p>
              <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,3.5vw,44px)', fontWeight:300, color:'#ffffff', lineHeight:1.15 }}>Gallery</h2>
            </div>
            <div className="sd-three-col" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:2 }}>
              {service.gallery.map((img, i) => (
                <div key={i} className="sd-project-card">
                  <img src={img} alt={`${service.title} gallery ${i + 1}`} loading="lazy" />
                  <div className="sd-project-overlay">
                    <div>
                      <p style={{ fontFamily:'var(--font-display)', fontSize:20, fontWeight:300, color:'#ffffff' }}>Image {i + 1}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="sd-section" style={{ background:'#0a0a0a', padding:'96px 48px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ marginBottom:56 }}>
            <p style={{ fontFamily:'var(--font-body)', fontSize:10, letterSpacing:4, textTransform:'uppercase', color:'var(--gold)', marginBottom:16 }}>Our Work</p>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,3.5vw,44px)', fontWeight:300, color:'#ffffff', lineHeight:1.15 }}>Related Projects</h2>
          </div>

          <div className="sd-three-col" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:2 }}>
            {displayProjects.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`} className="sd-project-card">
                <img src={project.images[0]} alt={project.title} loading="lazy" />
                <div className="sd-project-overlay">
                  <div>
                    <p style={{ fontFamily:'var(--font-body)', fontSize:10, letterSpacing:2, textTransform:'uppercase', color:'var(--gold)', marginBottom:6 }}>{project.location}</p>
                    <p style={{ fontFamily:'var(--font-display)', fontSize:20, fontWeight:300, color:'#ffffff' }}>{project.title}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ marginTop:48, textAlign:'center' }}>
            <Link href="/projects" className="sd-cta-btn sd-cta-ghost sd-cta-lg">
              <span>View All Projects</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="sd-section" style={{ background:'linear-gradient(135deg, #1a1a1a 0%, #2a2010 50%, #1a1a1a 100%)', padding:'96px 48px', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:600, height:600, border:'1px solid rgba(201,169,110,0.06)', borderRadius:'50%', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:400, height:400, border:'1px solid rgba(201,169,110,0.08)', borderRadius:'50%', pointerEvents:'none' }} />
        <div style={{ position:'relative', maxWidth:640, margin:'0 auto' }}>
          <p style={{ fontFamily:'var(--font-body)', fontSize:10, letterSpacing:4, textTransform:'uppercase', color:'var(--gold)', marginBottom:24 }}>Begin Your Project</p>
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(32px,4vw,52px)', fontWeight:300, color:'#ffffff', lineHeight:1.15, marginBottom:20 }}>
            Ready to Transform Your Space?
          </h2>
          <p style={{ fontFamily:'var(--font-body)', fontSize:14, lineHeight:1.8, color:'rgba(255,255,255,0.5)', marginBottom:48 }}>
            Let&apos;s discuss your {service.title.toLowerCase()} project. Our team is ready to bring your vision to life.
          </p>
          <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/contact" className="sd-cta-btn sd-cta-primary sd-cta-xl">
              <span>Book a Consultation</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
            <Link href="/projects" className="sd-cta-btn sd-cta-ghost sd-cta-xl">
              <span>View Our Portfolio</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}