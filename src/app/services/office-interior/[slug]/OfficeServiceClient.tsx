"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/constants";
import type { OfficeService } from "@/types/service";

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null);
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
    <div ref={ref as React.Ref<HTMLDivElement>} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(48px)", transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

interface OfficeServiceClientProps {
  service: OfficeService;
  related: typeof PROJECTS;
}

export default function OfficeServiceClient({ service, related }: OfficeServiceClientProps) {
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 80); return () => clearTimeout(t); }, []);
  const fade = (delay: number): React.CSSProperties => ({
    opacity: heroVisible ? 1 : 0,
    transform: heroVisible ? "translateY(0)" : "translateY(30px)",
    transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
  });

  const { ref: statRef1, inView: statInView1 } = useInView();
  const { ref: statRef2, inView: statInView2 } = useInView();
  const { ref: statRef3, inView: statInView3 } = useInView();

  return (
    <>
      <style>{`
        .osp-scope-pill {
          display: inline-flex; align-items: center;
          padding: 8px 18px;
          border: 1px solid rgba(201,169,110,0.3);
          font-family: var(--font-body); font-size: 11px;
          letter-spacing: 1.5px; text-transform: uppercase; color: var(--gold);
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
          cursor: default;
        }
        .osp-scope-pill:hover { background: rgba(201,169,110,0.08); border-color: var(--gold); transform: scale(1.03); }

        .osp-project-card {
          position: relative; overflow: hidden; aspect-ratio: 4/3;
          background: #111; display: block; text-decoration: none;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .osp-project-card:hover { transform: translateY(-8px) scale(1.02); box-shadow: 0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,169,110,0.15); }
        .osp-project-card img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
        .osp-project-card:hover img { transform: scale(1.08); }
        .osp-project-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 55%);
          opacity: 0; transition: opacity 0.3s ease;
          display: flex; align-items: flex-end; padding: 24px;
        }
        .osp-project-card:hover .osp-project-overlay { opacity: 1; }

        .osp-feature-item {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .osp-feature-item:last-child { border-bottom: none; }

        .osp-cta-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 16px 36px; font-family: var(--font-body); font-size: 11px;
          font-weight: 600; letter-spacing: 2.5px; text-transform: uppercase;
          text-decoration: none; transition: background 0.25s, color 0.25s, border-color 0.25s, transform 0.2s;
        }
        .osp-cta-primary { background: var(--gold); color: #fff; border: 1.5px solid var(--gold); }
        .osp-cta-primary:hover { background: var(--gold-dark); border-color: var(--gold-dark); transform: scale(1.04); }
        .osp-cta-ghost { background: transparent; color: rgba(255,255,255,0.8); border: 1.5px solid rgba(255,255,255,0.25); }
        .osp-cta-ghost:hover { border-color: var(--gold); color: var(--gold); transform: scale(1.04); }

        .osp-divider { width: 48px; height: 1px; background: var(--gold); margin: 24px 0; }

        .osp-step { display: flex; align-items: flex-start; gap: 20px; padding: 22px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .osp-step:last-child { border-bottom: none; }
        .osp-step-num { flex-shrink: 0; width: 40px; height: 40px; border: 1px solid rgba(201,169,110,0.35); display: flex; align-items: center; justify-content: center; transition: border-color 0.3s, background 0.3s; }
        .osp-step-num:hover { border-color: var(--gold); background: rgba(201,169,110,0.08); }

        .osp-stat-card { padding: 36px 24px; text-align: center; border: 1px solid rgba(255,255,255,0.07); background: rgba(255,255,255,0.02); transition: border-color 0.3s; }
        .osp-stat-card:hover { border-color: rgba(201,169,110,0.3); }

        @media (max-width: 768px) {
          section { padding-left: 20px !important; padding-right: 20px !important; }
          .osp-two-col { grid-template-columns: 1fr !important; gap: 48px !important; }
          .osp-three-col { grid-template-columns: 1fr !important; }
          .osp-stats { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <section style={{ position: "relative", minHeight: "72vh", display: "flex", alignItems: "flex-end", background: service.heroGradient, paddingTop: 100, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")", opacity: 0.4, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, var(--gold), transparent)", opacity: 0.5 }} />
        <div style={{ position: "absolute", right: "3%", bottom: "8%", fontFamily: "var(--font-display)", fontSize: "clamp(80px,14vw,180px)", fontWeight: 300, color: "rgba(255,255,255,0.025)", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>
          {service.title.split(" ")[0]}
        </div>

        <div style={{ position: "relative", width: "100%", maxWidth: 1200, margin: "0 auto", padding: "0 48px 80px" }}>
          <nav style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 32, ...fade(0) }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Home</Link>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>›</span>
            <Link href="/services/office-interior" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Office</Link>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>›</span>
            <span style={{ color: "var(--gold)" }}>{service.title}</span>
          </nav>

          <p style={{ fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "var(--gold)", marginBottom: 20, ...fade(120) }}>
            Office Interior Design
          </p>

          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 5.5vw, 72px)", fontWeight: 300, color: "#ffffff", lineHeight: 1.1, marginBottom: 24, maxWidth: 800, ...fade(240) }}>
            {service.title}
          </h1>

          <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(16px, 2vw, 22px)", fontWeight: 300, fontStyle: "italic", color: "rgba(255,255,255,0.6)", maxWidth: 560, marginBottom: 44, ...fade(360) }}>
            {service.description}
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", ...fade(480) }}>
            <Link href="/contact" className="osp-cta-btn osp-cta-primary">
              Book a Consultation
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
            <Link href="/projects" className="osp-cta-btn osp-cta-ghost">View Projects</Link>
          </div>
        </div>
      </section>

      <section style={{ background: "#0a0a0a", padding: "0 48px" }}>
        <div className="osp-stats" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          {[
            { value: "10+", label: "Years of Experience", delay: 0 },
            { value: "200+", label: "Projects Delivered", delay: 120 },
            { value: "100%", label: "Client Satisfaction", delay: 240 },
          ].map(({ value, label, delay }, index) => {
            const refs = [statRef1, statRef2, statRef3];
            const inViews = [statInView1, statInView2, statInView3];
            return (
              <div key={label} ref={refs[index] as React.Ref<HTMLDivElement>} className="osp-stat-card" style={{ opacity: inViews[index] ? 1 : 0, transform: inViews[index] ? "translateY(0)" : "translateY(32px)", transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,4vw,44px)", fontWeight: 300, color: "var(--gold)", lineHeight: 1, marginBottom: 10 }}>{value}</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>{label}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section style={{ background: "#111111", padding: "96px 48px" }}>
        <div className="osp-two-col" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px 80px", alignItems: "start" }}>

          <AnimatedSection delay={0}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "var(--gold)", marginBottom: 20 }}>About This Service</p>
            <div className="osp-divider" />
            <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.9, color: "rgba(255,255,255,0.65)", marginBottom: 40 }}>{service.description}</p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 16 }}>Scope of Work</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {service.process.map((item) => (
                <span key={item} className="osp-scope-pill">{item}</span>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={150}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "var(--gold)", marginBottom: 20 }}>What We Deliver</p>
            <div className="osp-divider" />
            <div style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {service.features.map((feat, i) => (
                <motion.div key={feat} className="osp-feature-item" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: i * 0.08 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", flexShrink: 0, marginTop: 6 }} />
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "rgba(255,255,255,0.72)", lineHeight: 1.6 }}>{feat}</span>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section style={{ background: "#0d0d0d", padding: "96px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimatedSection delay={0}>
            <div style={{ marginBottom: 56 }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>How We Work</p>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 300, color: "#fff", lineHeight: 1.15 }}>Our Process</h2>
            </div>
          </AnimatedSection>
          <div className="osp-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 80px" }}>
            {service.process.map((step, i) => (
              <motion.div key={i} className="osp-step" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: i * 0.09 }}>
                <div className="osp-step-num">
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 300, color: "var(--gold)" }}>{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginTop: 8 }}>{step}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section style={{ background: "#111", padding: "96px 48px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <AnimatedSection delay={0}>
              <div style={{ marginBottom: 56 }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>Our Work</p>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 300, color: "#ffffff", lineHeight: 1.15 }}>Related Projects</h2>
              </div>
            </AnimatedSection>

            <div className="osp-three-col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
              {related.map((project, i) => (
                <motion.div key={project.id} initial={{ opacity: 0, y: 48 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: i * 0.12 }}>
                  <Link href={`/projects/${project.id}`} className="osp-project-card">
                    <img src={project.images[0]} alt={project.title} loading="lazy" />
                    <div className="osp-project-overlay">
                      <div>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "var(--gold)", marginBottom: 6 }}>{project.location}</p>
                        <p style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 300, color: "#ffffff" }}>{project.title}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <AnimatedSection delay={200}>
              <div style={{ marginTop: 40, textAlign: "center" }}>
                <Link href="/projects?category=commercial" className="osp-cta-btn osp-cta-ghost">
                  View All Office Projects
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      <section style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2a2010 50%, #1a1a1a 100%)", padding: "96px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 600, height: 600, border: "1px solid rgba(201,169,110,0.06)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, height: 400, border: "1px solid rgba(201,169,110,0.08)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 640, margin: "0 auto" }}>
          <AnimatedSection delay={0}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "var(--gold)", marginBottom: 24 }}>Begin Your Project</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 300, color: "#ffffff", lineHeight: 1.15, marginBottom: 20 }}>Ready to Transform Your Space?</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.8, color: "rgba(255,255,255,0.5)", marginBottom: 48 }}>
              Let&apos;s discuss your {service.title.toLowerCase()} project. Our team is ready to bring your vision to life.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" className="osp-cta-btn osp-cta-primary">
                Book a Consultation
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <Link href="/projects" className="osp-cta-btn osp-cta-ghost">View Our Portfolio</Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}