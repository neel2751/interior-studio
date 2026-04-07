import Link from 'next/link';
import { Service } from '@/types/service';
import { PROJECTS } from '@/lib/constants';

interface ServiceDetailProps {
  service: Service;
}

const ServiceDetail = ({ service }: ServiceDetailProps) => {
  const related = PROJECTS.filter((p) =>
    service.projectExamples.some((ex) =>
      p.id.toLowerCase().includes(ex.toLowerCase()) ||
      ex.toLowerCase().includes(p.id.toLowerCase())
    )
  ).slice(0, 3);

  const fallbackProjects = PROJECTS.slice(0, 3);
  const displayProjects = related.length > 0 ? related : fallbackProjects;

  const heroGradientMap: Record<string, string> = {
    'residential-interior-design': 'linear-gradient(135deg, #1a1a2e 0%, #2d1b4e 50%, #1a1a1a 100%)',
    'commercial-interior-design':  'linear-gradient(135deg, #0d1520 0%, #1a2030 40%, #0d0d0d 100%)',
    'office-interior':             'linear-gradient(135deg, #0d150d 0%, #1a2a1a 40%, #0d0d0d 100%)',
    'hospitality-space':           'linear-gradient(135deg, #1a1008 0%, #2d1e10 40%, #0d0d0d 100%)',
    'call-center':                 'linear-gradient(135deg, #0d0d20 0%, #151530 40%, #0d0d0d 100%)',
  };

  const heroGradient =
    heroGradientMap[service.slug] ??
    'linear-gradient(135deg, #1a1a1a 0%, #2a2020 50%, #0d0d0d 100%)';

  const categoryLabel: Record<string, string> = {
    'residential-interior-design': 'Residential Design',
    'commercial-interior-design':  'Commercial Design',
    'office-interior':             'Office Design',
    'hospitality-space':           'Hospitality Design',
    'call-center':                 'Commercial Design',
  };

  const parentHref: Record<string, string> = {
    'residential-interior-design': '/services/residential-interior-design',
    'commercial-interior-design':  '/services/commercial-interior-design',
    'office-interior':             '/services/office-interior',
    'hospitality-space':           '/services/hospitality-space',
    'call-center':                 '/services/commercial-interior-design',
  };

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

        .sd-btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 16px 36px;
          font-family: var(--font-body); font-size: 11px; font-weight: 600;
          letter-spacing: 2.5px; text-transform: uppercase; text-decoration: none;
          background: var(--gold); color: #fff; border: 1.5px solid var(--gold);
          transition: background 0.25s, border-color 0.25s;
        }
        .sd-btn-primary:hover { background: var(--gold-dark); border-color: var(--gold-dark); }

        .sd-btn-ghost {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 16px 36px;
          font-family: var(--font-body); font-size: 11px; font-weight: 600;
          letter-spacing: 2.5px; text-transform: uppercase; text-decoration: none;
          background: transparent; color: rgba(255,255,255,0.8);
          border: 1.5px solid rgba(255,255,255,0.25);
          transition: border-color 0.25s, color 0.25s;
        }
        .sd-btn-ghost:hover { border-color: var(--gold); color: var(--gold); }

        .sd-divider { width: 48px; height: 1px; background: var(--gold); margin: 24px 0; }

        .sd-stat-card {
          padding: 32px 24px; text-align: center;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.02);
          transition: border-color 0.3s;
        }
        .sd-stat-card:hover { border-color: rgba(201,169,110,0.3); }

        .sd-cta-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 18px 42px; font-family: var(--font-body); font-size: 12px;
          font-weight: 600; letter-spacing: 2.5px; text-transform: uppercase;
          text-decoration: none; transition: background 0.25s, color 0.25s, border-color 0.25s, transform 0.2s;
        }
        .sd-cta-primary { background: var(--gold); color: #0a0a0a; border: 1.5px solid var(--gold); }
        .sd-cta-primary:hover { background: var(--gold-dark); border-color: var(--gold-dark); transform: scale(1.04); }
        .sd-cta-ghost { background: transparent; color: rgba(255,255,255,0.8); border: 1.5px solid rgba(255,255,255,0.25); }
        .sd-cta-ghost:hover { border-color: var(--gold); color: var(--gold); transform: scale(1.04); }

        @media (max-width: 768px) {
          .sd-two-col   { grid-template-columns: 1fr !important; gap: 48px !important; }
          .sd-three-col { grid-template-columns: 1fr !important; }
          .sd-stats     { grid-template-columns: 1fr !important; }
          section, .sd-section { padding-left: 20px !important; padding-right: 20px !important; }
        }
      `}</style>

      <section
        style={{
          position: 'relative', minHeight: '72vh',
          display: 'flex', alignItems: 'flex-end',
          background: heroGradient, paddingTop: 100,
        }}
      >
        <div style={{ position:'absolute', inset:0, backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")", opacity:0.4, pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'linear-gradient(90deg, transparent, var(--gold), transparent)', opacity:0.5 }} />

        <div style={{ position:'relative', width:'100%', maxWidth:1200, margin:'0 auto', padding:'0 48px 80px' }}>
          <nav className="sd-f1" style={{ display:'flex', alignItems:'center', gap:8, fontFamily:'var(--font-body)', fontSize:11, letterSpacing:1.5, textTransform:'uppercase', marginBottom:32 }}>
            <Link href="/" style={{ color:'rgba(255,255,255,0.4)', textDecoration:'none' }}>Home</Link>
            <span style={{ color:'rgba(255,255,255,0.2)' }}>›</span>
            <Link href={parentHref[service.slug] ?? '/services'} style={{ color:'rgba(255,255,255,0.4)', textDecoration:'none' }}>
              {categoryLabel[service.slug] ?? 'Services'}
            </Link>
            <span style={{ color:'rgba(255,255,255,0.2)' }}>›</span>
            <span style={{ color:'var(--gold)' }}>{service.title}</span>
          </nav>

          <p className="sd-f2" style={{ fontFamily:'var(--font-body)', fontSize:10, letterSpacing:4, textTransform:'uppercase', color:'var(--gold)', marginBottom:20 }}>
            {categoryLabel[service.slug] ?? 'Interior Design'}
          </p>

          <h1 className="sd-f3" style={{ fontFamily:'var(--font-display)', fontSize:'clamp(36px, 5.5vw, 72px)', fontWeight:300, color:'#ffffff', lineHeight:1.1, marginBottom:24, maxWidth:800 }}>
            {service.title}
          </h1>

          <p className="sd-f4" style={{ fontFamily:'var(--font-display)', fontSize:'clamp(16px, 2vw, 22px)', fontWeight:300, fontStyle:'italic', color:'rgba(255,255,255,0.6)', maxWidth:580 }}>
            {service.description}
          </p>
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
        <div className="sd-two-col" style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'64px 80px', alignItems:'start' }}>

          <div>
            <p style={{ fontFamily:'var(--font-body)', fontSize:10, letterSpacing:4, textTransform:'uppercase', color:'var(--gold)', marginBottom:20 }}>Service Overview</p>
            <div className="sd-divider" />
            <p style={{ fontFamily:'var(--font-body)', fontSize:15, lineHeight:1.9, color:'rgba(255,255,255,0.65)', marginBottom:48 }}>
              {service.detailedDescription}
            </p>
            <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
              <Link href="/contact" className="sd-btn-primary">
                Book a Consultation
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <Link href="/projects" className="sd-btn-ghost">View Projects</Link>
            </div>
          </div>

          <div>
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
        </div>
      </section>

      <section className="sd-section" style={{ background:'#0d0d0d', padding:'96px 48px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ marginBottom:56 }}>
            <p style={{ fontFamily:'var(--font-body)', fontSize:10, letterSpacing:4, textTransform:'uppercase', color:'var(--gold)', marginBottom:16 }}>How We Work</p>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,3.5vw,44px)', fontWeight:300, color:'#ffffff', lineHeight:1.15 }}>Our Process</h2>
          </div>

          <div className="sd-two-col" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 80px' }}>
            {service.process.map((step, i) => (
              <div key={i} className="sd-step">
                <div style={{ flexShrink:0, width:40, height:40, border:'1px solid rgba(201,169,110,0.4)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <span style={{ fontFamily:'var(--font-display)', fontSize:16, fontWeight:300, color:'var(--gold)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:14, color:'rgba(255,255,255,0.7)', lineHeight:1.7 }}>{step}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop:56, paddingTop:48, borderTop:'1px solid rgba(255,255,255,0.06)' }}>
            <p style={{ fontFamily:'var(--font-body)', fontSize:10, letterSpacing:3, textTransform:'uppercase', color:'rgba(255,255,255,0.35)', marginBottom:20 }}>Scope of Work</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
              {service.process.map((item, i) => (
                <span key={i} className="sd-scope-pill">{item.split(' ').slice(0, 3).join(' ')}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sd-section" style={{ background:'#111111', padding:'96px 48px' }}>
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

          <div style={{ marginTop:40, textAlign:'center' }}>
            <Link href="/projects" className="sd-cta-btn sd-cta-ghost">
              View All Projects
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
            <Link href="/projects" className="sd-cta-btn sd-cta-primary">
              View Our Portfolio
            </Link>
            <Link href="/contact" className="sd-cta-btn sd-cta-ghost">
              Book a Consultation
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceDetail;