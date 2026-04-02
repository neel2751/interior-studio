'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { CONTACT_INFO } from '@/lib/constants';

function useInView(threshold = 0.12) {
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

function AnimatedSection({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(48px)', transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

const TEAM = [
  { name: 'Arjun Mehta',     role: 'Founder & Principal Designer',   bio: 'With over 15 years of experience, Arjun leads with a philosophy of restrained luxury — creating spaces that feel both timeless and deeply personal.',         initials: 'AM' },
  { name: 'Priya Sharma',    role: 'Senior Interior Designer',        bio: 'Priya specialises in residential design, bringing a meticulous eye for detail and a talent for translating clients\' lifestyles into beautiful environments.',    initials: 'PS' },
  { name: 'Rohan Desai',     role: 'Commercial Design Lead',          bio: 'Rohan\'s background in architecture gives him a unique structural perspective on commercial interiors, delivering spaces that perform as well as they look.',     initials: 'RD' },
  { name: 'Kavya Nair',      role: 'Hospitality Design Specialist',   bio: 'Kavya has designed hospitality spaces from boutique hotels in Goa to fine dining restaurants in Delhi, always with the guest experience at the centre.',       initials: 'KN' },
  { name: 'Siddharth Rao',   role: 'Project Manager',                 bio: 'Siddharth ensures every project is delivered on time and to budget, coordinating between clients, contractors, and the design team with calm precision.',         initials: 'SR' },
  { name: 'Ananya Iyer',     role: 'Junior Designer & Visualiser',    bio: 'Ananya brings creative energy and technical precision to every 3D visualisation and concept board, helping clients see their future spaces before work begins.',  initials: 'AI' },
];

const AWARDS = [
  { year: '2024', title: 'Best Residential Interior', body: 'India Design Awards', project: 'Modern Villa Ahmedabad' },
  { year: '2024', title: 'Excellence in Hospitality Design', body: 'Hospitality Design India', project: 'Boutique Hotel Goa' },
  { year: '2023', title: 'Commercial Interior of the Year', body: 'Interior & Design Awards', project: 'Tech Office Bangalore' },
  { year: '2023', title: 'Heritage Restoration Award', body: 'Architecture & Design India', project: 'Heritage Bungalow Pune' },
  { year: '2022', title: 'Emerging Studio of the Year', body: 'Design Thinking India', project: 'Interior Studio Ltd' },
  { year: '2022', title: 'Best Use of Local Materials', body: 'Sustainable Design Awards', project: 'Heritage Bungalow Pune' },
];

const AFFILIATIONS = [
  'Institute of Indian Interior Designers (IIID)',
  'Confederation of Real Estate Developers (CREDAI)',
  'Indian Green Building Council (IGBC)',
  'Design Society of India',
  'CII Design Excellence Initiative',
];

const REVIEWS = [
  { name: 'Vikram Patel',    location: 'Ahmedabad',  rating: 5, text: 'Interior Studio transformed our villa beyond what we imagined. The attention to detail, the quality of materials, and the professionalism of the team was exceptional throughout.' },
  { name: 'Sunita Kapoor',   location: 'Mumbai',     rating: 5, text: 'Our penthouse renovation was handled with such care and creativity. Every room feels curated yet completely liveable. Worth every rupee.' },
  { name: 'Rahul Verma',     location: 'Bangalore',  rating: 5, text: 'The office redesign completely changed how our team works. Productivity is up, morale is higher, and every client who visits is impressed immediately.' },
  { name: 'Meera Nambiar',   location: 'Goa',        rating: 5, text: 'As a hotel owner, I needed designers who understood hospitality from the inside. Interior Studio delivered a property our guests photograph obsessively.' },
  { name: 'Arjit Banerjee',  location: 'Pune',       rating: 5, text: 'Restoring our heritage bungalow while adding modern comforts was a complex brief. The team handled it with intelligence and sensitivity.' },
  { name: 'Nisha Reddy',     location: 'Delhi',      rating: 5, text: 'The restaurant design created exactly the atmosphere we envisioned — warm, intimate, and unmistakably ours. Guests always comment on how the space feels.' },
];

const CLIENTS = [
  'Tata Group', 'Godrej Properties', 'Mahindra Lifespaces', 'ITC Hotels',
  'Brigade Group', 'Prestige Estates', 'Embassy Group', 'Sobha Developers',
  'Kohinoor Group', 'Puravankara', 'Oberoi Realty', 'DLF Limited',
];

const CAREERS = [
  { role: 'Senior Interior Designer', type: 'Full-time', location: 'Ahmedabad', desc: 'Lead residential and commercial design projects from concept to completion. 5+ years experience required.' },
  { role: '3D Visualiser', type: 'Full-time', location: 'Ahmedabad / Remote', desc: 'Create photorealistic renders and walkthroughs. Proficiency in 3ds Max, V-Ray, and Lumion required.' },
  { role: 'Junior Designer', type: 'Full-time', location: 'Ahmedabad', desc: 'Support senior designers across all project phases. Architecture or interior design degree required.' },
  { role: 'Project Coordinator', type: 'Full-time', location: 'Ahmedabad', desc: 'Manage timelines, vendor coordination, and client communication across active projects.' },
];

const BLOG_POSTS = [
  { title: 'The Art of Layered Lighting in Residential Spaces', date: 'March 2026', category: 'Residential', excerpt: 'Lighting is the single most transformative element in any interior. We explore how layering ambient, task, and accent light creates depth and atmosphere.' },
  { title: 'Biophilic Design: Why Bringing Nature Indoors Works', date: 'February 2026', category: 'Trends', excerpt: 'The evidence for biophilic design is compelling — from reduced stress to increased productivity. Here\'s how we integrate it across every project type.' },
  { title: 'Designing for Hospitality: Beyond Beautiful Rooms', date: 'January 2026', category: 'Hospitality', excerpt: 'Great hospitality design is invisible — guests feel it without seeing it. We explain the operational logic behind our hospitality projects.' },
  { title: 'The Case for Investing in Custom Furniture', date: 'December 2025', category: 'Materials', excerpt: 'Off-the-shelf furniture rarely fits a space perfectly. We make the case for custom pieces — and explain how the economics work better than you might think.' },
];

const GALLERY_IMAGES = [
  '/images/projects/modern-villa-ahmedabad/ChatGPT Image Mar 26, 2026, 09_14_47 PM.png',
  '/images/projects/tech-office-bangalore/ChatGPT Image Mar 26, 2026, 09_14_47 PM.png',
  '/images/projects/sky-penthouse-mumbai/ChatGPT Image Mar 26, 2026, 09_14_47 PM.png',
  '/images/projects/boutique-hotel-goa/ChatGPT Image Mar 26, 2026, 09_14_47 PM.png',
  '/images/projects/heritage-bungalow-pune/ChatGPT Image Mar 26, 2026, 09_14_47 PM.png',
  '/images/projects/restaurant-delhi/ChatGPT Image Mar 26, 2026, 09_14_47 PM.png',
  '/images/projects/modern-villa-ahmedabad/ChatGPT Image Mar 26, 2026, 09_22_39 PM.png',
  '/images/projects/tech-office-bangalore/ChatGPT Image Mar 26, 2026, 09_22_39 PM.png',
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>{children}</p>;
}

function Divider() {
  return <div style={{ width: 48, height: 1, background: 'var(--gold)', margin: '20px 0' }} />;
}

function StarRating({ n }: { n: number }) {
  return (
    <div style={{ display: 'flex', gap: 3, marginBottom: 14 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill={i < n ? 'var(--gold)' : 'none'} stroke="var(--gold)" strokeWidth="0.8">
          <polygon points="6,1 7.5,4.5 11,4.8 8.5,7 9.3,10.5 6,8.5 2.7,10.5 3.5,7 1,4.8 4.5,4.5" />
        </svg>
      ))}
    </div>
  );
}
function StatCard({ v, l, i }: { v: string; l: string; i: number }) {
  const { ref, inView } = useInView();
  return (
    <div key={l} ref={ref} style={{ textAlign: 'center', padding: '40px 24px', border: '1px solid rgba(255,255,255,0.04)', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(40px)', transition: `opacity 0.7s ease ${i * 100}ms, transform 0.7s ease ${i * 100}ms` }}>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 300, color: 'var(--gold)', lineHeight: 1, marginBottom: 10 }}>{v}</p>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>{l}</p>
    </div>
  );
}

function TeamCard({ member, i }: { member: (typeof TEAM)[0]; i: number }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div key={member.name} ref={ref} className="abt-card" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(48px)', transition: `opacity 0.7s ease ${i * 100}ms, transform 0.7s ease ${i * 100}ms` }}>
      <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(201,169,110,0.15)', border: '1px solid rgba(201,169,110,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 300, color: 'var(--gold)' }}>{member.initials}</span>
      </div>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>{member.role}</p>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 300, color: '#fff', marginBottom: 14, lineHeight: 1.2 }}>{member.name}</h3>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.8, color: 'rgba(255,255,255,0.5)' }}>{member.bio}</p>
    </div>
  );
}

function ReviewCard({ review, i }: { review: (typeof REVIEWS)[0]; i: number }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div key={review.name} ref={ref} className="abt-card" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(48px)', transition: `opacity 0.7s ease ${i * 90}ms, transform 0.7s ease ${i * 90}ms` }}>
      <StarRating n={review.rating} />
      <p style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontStyle: 'italic', lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', marginBottom: 24 }}>
        &ldquo;{review.text}&rdquo;
      </p>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 16 }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: '#fff', marginBottom: 4 }}>{review.name}</p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>{review.location}</p>
      </div>
    </div>
  );
}

function CareerCard({ job, i }: { job: (typeof CAREERS)[0]; i: number }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div key={job.role} ref={ref} className="abt-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)', transition: `opacity 0.7s ease ${i * 80}ms, transform 0.7s ease ${i * 80}ms` }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--gold)', background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.25)', padding: '3px 10px' }}>{job.type}</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.1)', padding: '3px 10px' }}>{job.location}</span>
        </div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 300, color: '#fff', marginBottom: 8, lineHeight: 1.2 }}>{job.role}</h3>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.7, color: 'rgba(255,255,255,0.5)' }}>{job.desc}</p>
      </div>
      <Link href={`/contact?role=${encodeURIComponent(job.role)}`} className="abt-btn-ghost" style={{ flexShrink: 0 }}>
        Apply Now
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </Link>
    </div>
  );
}

function ClientCard({ client, i }: { client: string; i: number }) {
  const { ref, inView } = useInView(0.05);
  return (
    <div key={client} ref={ref} style={{ padding: '28px 20px', border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)', transition: `opacity 0.6s ease ${i * 60}ms, transform 0.6s ease ${i * 60}ms` }}>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 300, color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}>{client}</p>
    </div>
  );
}

function BlogCard({ post, i }: { post: (typeof BLOG_POSTS)[0]; i: number }) {
  const { ref, inView } = useInView(0.1);
  const [hov, setHov] = useState(false);
  return (
    <div key={post.title} ref={ref} className="abt-card" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(48px)', transition: `opacity 0.7s ease ${i * 100}ms, transform 0.7s ease ${i * 100}ms`, cursor: 'pointer' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--gold)', background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.25)', padding: '3px 10px' }}>{post.category}</span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', padding: '3px 0' }}>{post.date}</span>
      </div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px,2vw,24px)', fontWeight: 300, color: hov ? 'var(--gold-light)' : '#fff', lineHeight: 1.3, marginBottom: 14, transition: 'color 0.3s ease' }}>{post.title}</h3>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>{post.excerpt}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--gold)', fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '2px', textTransform: 'uppercase' }}>
        Read More
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
    </div>
  );
}

function GalleryImage({ img, i }: { img: string; i: number }) {
  const { ref, inView } = useInView(0.05);
  const [hov, setHov] = useState(false);
  return (
    <div key={i} ref={ref} style={{ aspectRatio: i === 0 || i === 5 ? '1/1' : '4/3', overflow: 'hidden', position: 'relative', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)', transition: `opacity 0.6s ease ${i * 70}ms, transform 0.6s ease ${i * 70}ms`, gridColumn: i === 0 ? 'span 2' : 'span 1' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hov ? 'scale(1.06)' : 'scale(1)', transition: 'transform 0.6s ease' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', opacity: hov ? 1 : 0, transition: 'opacity 0.35s ease' }} />
    </div>
  );
}
export default function AboutPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTab, setActiveTab]     = useState('team');

  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 80); return () => clearTimeout(t); }, []);

  const fade = (delay: number): React.CSSProperties => ({
    opacity:    heroVisible ? 1 : 0,
    transform:  heroVisible ? 'translateY(0)' : 'translateY(30px)',
    transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
  });

  const TABS = [
    { id: 'team',     label: 'Meet the Team' },
    { id: 'reviews',  label: 'Reviews' },
    { id: 'awards',   label: 'Awards' },
    { id: 'careers',  label: 'Careers' },
    { id: 'clients',  label: 'Our Clients' },
    { id: 'gallery',  label: 'Gallery' },
    { id: 'blog',     label: 'Blog' },
    { id: 'location', label: 'Location' },
  ];

  return (
    <>
      <style>{`
        html { scroll-behavior: smooth; }
        .abt-btn-primary { display:inline-flex;align-items:center;gap:10px;padding:16px 36px;font-family:var(--font-body);font-size:11px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;text-decoration:none;background:var(--gold);color:#000;border:1.5px solid var(--gold);transition:background 0.25s,border-color 0.25s,transform 0.2s; }
        .abt-btn-primary:hover { background:var(--gold-dark);border-color:var(--gold-dark);transform:scale(1.03); }
        .abt-btn-ghost { display:inline-flex;align-items:center;gap:10px;padding:16px 36px;font-family:var(--font-body);font-size:11px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;text-decoration:none;background:transparent;color:rgba(255,255,255,0.8);border:1.5px solid rgba(255,255,255,0.25);transition:border-color 0.25s,color 0.25s,transform 0.2s; }
        .abt-btn-ghost:hover { border-color:var(--gold);color:var(--gold);transform:scale(1.03); }
        .abt-tab { font-family:var(--font-body);font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;padding:12px 20px;border:none;background:transparent;cursor:pointer;transition:color 0.2s,border-color 0.2s;white-space:nowrap;border-bottom:2px solid transparent; }
        .abt-tab.active { color:var(--gold);border-bottom-color:var(--gold); }
        .abt-tab:not(.active) { color:rgba(255,255,255,0.4); }
        .abt-tab:not(.active):hover { color:rgba(255,255,255,0.7); }
        .abt-card { background:#111;border:1px solid rgba(255,255,255,0.07);padding:32px;transition:border-color 0.3s; }
        .abt-card:hover { border-color:rgba(201,169,110,0.25); }
        @media (max-width:768px) {
          .abt-grid-2 { grid-template-columns:1fr !important; }
          .abt-grid-3 { grid-template-columns:1fr !important; }
          .abt-grid-4 { grid-template-columns:repeat(2,1fr) !important; }
          section, .abt-sec { padding-left:20px !important;padding-right:20px !important; }
          .abt-tabs { overflow-x:auto; }
        }
      `}</style>

      <section style={{ position: 'relative', minHeight: '70vh', display: 'flex', alignItems: 'flex-end', background: 'linear-gradient(135deg, #0d0d0d 0%, #1a1510 40%, #0a0a0a 100%)', paddingTop: 100, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")", opacity: 0.5, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', opacity: 0.6 }} />
        <div style={{ position: 'absolute', right: '3%', bottom: '5%', fontFamily: 'var(--font-display)', fontSize: 'clamp(100px,16vw,200px)', fontWeight: 300, color: 'rgba(255,255,255,0.02)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>ABOUT</div>

        <div style={{ position: 'relative', width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 48px 80px' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 32, ...fade(0) }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>›</span>
            <span style={{ color: 'var(--gold)' }}>About Us</span>
          </nav>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20, ...fade(100) }}>Our Story</p>

          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(44px,6vw,84px)', fontWeight: 300, color: '#fff', lineHeight: 1.05, marginBottom: 24, maxWidth: 800, ...fade(200) }}>
            Designing Spaces That<br />
            <em style={{ fontStyle: 'italic', color: 'var(--gold-light)' }}>Define Lives</em>
          </h1>

          <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(15px,2vw,20px)', fontWeight: 300, fontStyle: 'italic', color: 'rgba(255,255,255,0.55)', maxWidth: 580, marginBottom: 48, ...fade(340) }}>
            Founded in Ahmedabad, Interior Studio Ltd has spent over a decade transforming residential and commercial spaces across India — with a commitment to craftsmanship, authenticity, and the belief that great design changes how people live.
          </p>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', ...fade(460) }}>
            <a href="#team" className="abt-btn-primary">
              Meet the Team
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <Link href="/contact" className="abt-btn-ghost">Work With Us</Link>
          </div>
        </div>
      </section>

      <section style={{ background: '#0a0a0a', padding: '0 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {[
            { v: '10+',  l: 'Years in Design' },
            { v: '200+', l: 'Projects Completed' },
            { v: '6',    l: 'Team Members' },
            { v: '100%', l: 'Client Satisfaction' },
          ].map(({ v, l }, i) => (
            <StatCard key={l} v={v} l={l} i={i} />
          ))}
        </div>
      </section>

      <div style={{ position: 'sticky', top: 0, zIndex: 100, background: '#0d0d0d', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px' }}>
          <div className="abt-tabs" style={{ display: 'flex', gap: 0, overflowX: 'auto' }}>
            {TABS.map(tab => (
              <button
                key={tab.id}
                className={`abt-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(tab.id);
                  document.getElementById(tab.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="abt-sec" style={{ background: '#0d0d0d', padding: '96px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="abt-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px 80px', alignItems: 'center' }}>
            <AnimatedSection delay={0}>
              <SectionLabel>Who We Are</SectionLabel>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 300, color: '#fff', lineHeight: 1.15, marginBottom: 20 }}>
                A Studio Built on Craft and Conviction
              </h2>
              <Divider />
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.9, color: 'rgba(255,255,255,0.6)', marginBottom: 24 }}>
                Interior Studio Ltd was founded with a simple conviction: that well-designed spaces change how people feel, work, and live. Over a decade later, that conviction drives every project we take on — from the smallest apartment to the grandest hotel.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.9, color: 'rgba(255,255,255,0.6)', marginBottom: 40 }}>
                Based in Ahmedabad with projects across India, we are a team of designers, architects, and project managers united by a passion for exceptional interiors and a commitment to delivering them without compromise.
              </p>
              <Link href="/process" className="abt-btn-ghost">
                Our Process
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </AnimatedSection>
            <AnimatedSection delay={150}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                {GALLERY_IMAGES.slice(0, 4).map((img, i) => (
                  <div key={i} style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')} onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section id="team" className="abt-sec" style={{ background: '#111', padding: '96px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <AnimatedSection delay={0}>
            <div style={{ marginBottom: 64 }}>
              <SectionLabel>Meet the Team</SectionLabel>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 300, color: '#fff', lineHeight: 1.15 }}>
                The People Behind the Work
              </h2>
            </div>
          </AnimatedSection>
          <div className="abt-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
            {TEAM.map((member, i) => (
              <TeamCard key={member.name} member={member} i={i} />
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="abt-sec" style={{ background: '#0d0d0d', padding: '96px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <AnimatedSection delay={0}>
            <div style={{ marginBottom: 64 }}>
              <SectionLabel>Client Reviews</SectionLabel>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 300, color: '#fff', lineHeight: 1.15 }}>What Our Clients Say</h2>
            </div>
          </AnimatedSection>
          <div className="abt-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
            {REVIEWS.map((review, i) => (
              <ReviewCard key={review.name} review={review} i={i} />
            ))}
          </div>
        </div>
      </section>

      <section id="awards" className="abt-sec" style={{ background: '#111', padding: '96px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="abt-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px 80px' }}>
            {/* Awards */}
            <AnimatedSection delay={0}>
              <SectionLabel>Recognition</SectionLabel>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,3vw,38px)', fontWeight: 300, color: '#fff', lineHeight: 1.15, marginBottom: 40 }}>Awards & Achievements</h2>
              <div>
                {AWARDS.map((award, i) => (
                  <div key={i} style={{ display: 'flex', gap: 24, padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, color: 'var(--gold)', flexShrink: 0, marginTop: 2 }}>{award.year}</span>
                    <div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 4 }}>{award.title}</p>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>{award.body}</p>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(201,169,110,0.6)' }}>{award.project}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Affiliations */}
            <AnimatedSection delay={150}>
              <SectionLabel>Affiliations</SectionLabel>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,3vw,38px)', fontWeight: 300, color: '#fff', lineHeight: 1.15, marginBottom: 40 }}>Industry Memberships</h2>
              <div style={{ marginBottom: 48 }}>
                {AFFILIATIONS.map((aff, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>{aff}</span>
                  </div>
                ))}
              </div>
              {/* Completed jobs */}
              <div id="completed-jobs" style={{ background: 'rgba(201,169,110,0.05)', border: '1px solid rgba(201,169,110,0.2)', padding: '28px' }}>
                <SectionLabel>Completed Jobs</SectionLabel>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
                  {[
                    { v: '200+', l: 'Total Projects' },
                    { v: '120+', l: 'Residential' },
                    { v: '80+',  l: 'Commercial' },
                  ].map(({ v, l }) => (
                    <div key={l} style={{ textAlign: 'center' }}>
                      <p style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 300, color: 'var(--gold)', lineHeight: 1, marginBottom: 6 }}>{v}</p>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>{l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section id="careers" className="abt-sec" style={{ background: '#0d0d0d', padding: '96px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <AnimatedSection delay={0}>
            <div style={{ marginBottom: 64 }}>
              <SectionLabel>Join Us</SectionLabel>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 300, color: '#fff', lineHeight: 1.15 }}>Current Openings</h2>
            </div>
          </AnimatedSection>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {CAREERS.map((job, i) => (
              <CareerCard key={job.role} job={job} i={i} />
            ))}
          </div>
          <AnimatedSection delay={200}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 32, textAlign: 'center' }}>
              Don&apos;t see a role that fits? Send your portfolio to{' '}
              <a href={`mailto:${CONTACT_INFO.email}`} style={{ color: 'var(--gold)', textDecoration: 'none' }}>{CONTACT_INFO.email}</a>
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section id="clients" className="abt-sec" style={{ background: '#111', padding: '96px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <AnimatedSection delay={0}>
            <div style={{ marginBottom: 64, textAlign: 'center' }}>
              <SectionLabel>Our Clients</SectionLabel>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 300, color: '#fff', lineHeight: 1.15 }}>Trusted By India&apos;s Best</h2>
            </div>
          </AnimatedSection>
          <div className="abt-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2 }}>
            {CLIENTS.map((client, i) => (
              <ClientCard key={client} client={client} i={i} />
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="abt-sec" style={{ background: '#0d0d0d', padding: '96px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <AnimatedSection delay={0}>
            <div style={{ marginBottom: 56, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
              <div>
                <SectionLabel>Design Gallery</SectionLabel>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 300, color: '#fff', lineHeight: 1.15 }}>A Glimpse of Our Work</h2>
              </div>
              <Link href="/projects" className="abt-btn-ghost">
                Full Portfolio
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
          </AnimatedSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2 }}>
            {GALLERY_IMAGES.map((img, i) => (
              <GalleryImage key={i} img={img} i={i} />
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="abt-sec" style={{ background: '#111', padding: '96px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <AnimatedSection delay={0}>
            <div style={{ marginBottom: 64 }}>
              <SectionLabel>Insights</SectionLabel>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 300, color: '#fff', lineHeight: 1.15 }}>From the Studio</h2>
            </div>
          </AnimatedSection>
          <div className="abt-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 2 }}>
            {BLOG_POSTS.map((post, i) => (
              <BlogCard key={post.title} post={post} i={i} />
            ))}
          </div>
        </div>
      </section>

      <section id="location" className="abt-sec" style={{ background: '#0d0d0d', padding: '96px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="abt-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px 80px' }}>
            <AnimatedSection delay={0}>
              <SectionLabel>Find Us</SectionLabel>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 300, color: '#fff', lineHeight: 1.15, marginBottom: 40 }}>Hours & Location</h2>

              {/* Address */}
              <div style={{ marginBottom: 40 }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 12 }}>Studio Address</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.8 }}>{CONTACT_INFO.address}</p>
              </div>

              {/* Hours */}
              <div style={{ marginBottom: 40 }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>Opening Hours</p>
                {[
                  { day: 'Monday – Friday', hours: '10:00 AM – 7:00 PM' },
                  { day: 'Saturday',        hours: '10:00 AM – 5:00 PM' },
                  { day: 'Sunday',          hours: 'Closed' },
                ].map(({ day, hours }) => (
                  <div key={day} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>{day}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: hours === 'Closed' ? 'rgba(255,255,255,0.3)' : 'var(--gold)' }}>{hours}</span>
                  </div>
                ))}
              </div>

              {/* Contact details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { label: 'Phone', value: CONTACT_INFO.phone, href: `tel:${CONTACT_INFO.phone}` },
                  { label: 'Email', value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
                  { label: 'WhatsApp', value: `+${CONTACT_INFO.whatsapp}`, href: `https://wa.me/${CONTACT_INFO.whatsapp}` },
                ].map(({ label, value, href }) => (
                  <div key={label} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', minWidth: 70 }}>{label}</span>
                    <a href={href} style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}>{value}</a>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={150}>
              {/* Map placeholder */}
              <div style={{ aspectRatio: '4/3', background: '#111', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', marginBottom: 24 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: 48, height: 48, border: '1px solid rgba(201,169,110,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>Ahmedabad, Gujarat</p>
                  <a href={`https://maps.google.com/?q=${encodeURIComponent(CONTACT_INFO.address)}`} target="_blank" rel="noopener noreferrer" className="abt-btn-ghost" style={{ fontSize: 10, padding: '10px 20px' }}>
                    Open in Maps
                  </a>
                </div>
              </div>

              {/* Social */}
              <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', padding: '28px' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 20 }}>Follow Us</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {[
                    { label: 'Instagram', href: `https://instagram.com/${CONTACT_INFO.social.instagram}` },
                    { label: 'LinkedIn',  href: `https://linkedin.com/company/${CONTACT_INFO.social.linkedin}` },
                    { label: 'Facebook',  href: `https://facebook.com/${CONTACT_INFO.social.facebook}` },
                    { label: 'YouTube',   href: `https://youtube.com/${CONTACT_INFO.social.youtube}` },
                  ].map(({ label, href }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)', padding: '8px 16px', textDecoration: 'none', transition: 'color 0.2s, border-color 0.2s' }} onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.borderColor = 'rgba(201,169,110,0.4)'; }} onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}>
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2010 50%, #1a1a1a 100%)', padding: '96px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, border: '1px solid rgba(201,169,110,0.06)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 400, height: 400, border: '1px solid rgba(201,169,110,0.08)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 640, margin: '0 auto' }}>
          <AnimatedSection delay={0}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 24 }}>Get In Touch</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 300, color: '#fff', lineHeight: 1.15, marginBottom: 20 }}>
              Let&apos;s Create Something Extraordinary
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', marginBottom: 48 }}>
              Whether you have a project in mind or simply want to learn more about how we work, we&apos;d love to hear from you.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" className="abt-btn-primary">
                Contact Us
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <Link href="/projects" className="abt-btn-ghost">View Our Work</Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}