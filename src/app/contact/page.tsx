'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import Button from '@/components/common/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CONTACT_INFO, BUSINESS_HOURS } from '@/lib/constants';

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

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} suppressHydrationWarning style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(50px)', transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

const inquirySchema = z.object({
  fullName:        z.string().min(2, 'Name must be at least 2 characters').max(100),
  email:           z.string().email('Please enter a valid email address'),
  phone:           z.string().min(10, 'Phone number must be at least 10 digits').regex(/^[+]?[\d\s\-\(\)]+$/, 'Please enter a valid phone number'),
  projectLocation: z.string().min(3, 'Location must be at least 3 characters').max(200),
  projectType:     z.string().min(1, 'Please select a project type'),
  message:         z.string().min(10, 'Message must be at least 10 characters').max(1000),
});
type InquiryFormData = z.infer<typeof inquirySchema>;

const baseInput: React.CSSProperties = {
  fontFamily: 'var(--font-body)', fontSize: 13, color: '#fff',
  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
  borderBottom: '1px solid rgba(255,255,255,0.15)', padding: '13px 16px',
  outline: 'none', width: '100%', transition: 'border-color 0.25s, background 0.25s',
};

const errorInput: React.CSSProperties = { ...baseInput, borderColor: '#c0392b' };

const ErrorMsg = ({ msg }: { msg?: string }) =>
  msg ? (
    <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#e74c3c', marginTop: 5, display: 'flex', alignItems: 'center', gap: 4 }}>
      <AlertCircle size={11} /> {msg}
    </p>
  ) : null;

function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} suppressHydrationWarning style={{ textAlign: 'center', padding: '40px 24px', border: '1px solid rgba(255,255,255,0.07)', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(40px)', transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 300, color: 'var(--gold)', lineHeight: 1, marginBottom: 12 }}>{value}</p>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>{label}</p>
    </div>
  );
}

export default function ContactPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [submitted, setSubmitted]     = useState(false);
  const [serverError, setServerError] = useState('');

  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 80); return () => clearTimeout(t); }, []);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { fullName: '', email: '', phone: '', projectLocation: '', projectType: '', message: '' },
  });

  const onSubmit = async (data: InquiryFormData) => {
    setServerError('');
    try {
      const res    = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const result = await res.json();
      if (result.success) { setSubmitted(true); reset(); }
      else setServerError(result.message || 'Something went wrong. Please try again.');
    } catch { setServerError('Network error. Please try again.'); }
  };

  const infoItems = [
    { icon: <Phone size={18} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: 2 }} />, label: 'Phone / WhatsApp', content: <a href={`tel:${CONTACT_INFO.phone}`} style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>{CONTACT_INFO.phone}</a> },
    { icon: <Mail    size={18} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: 2 }} />, label: 'Email',            content: <a href={`mailto:${CONTACT_INFO.email}`} style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>{CONTACT_INFO.email}</a> },
    { icon: <MapPin  size={18} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: 2 }} />, label: 'Studio Address',   content: <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, margin: 0 }}>{CONTACT_INFO.address}</p> },
    { icon: <Clock   size={18} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: 2 }} />, label: 'Business Hours',   content: <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.9, margin: 0 }}>Mon – Fri: {BUSINESS_HOURS.weekdays}<br />Saturday: {BUSINESS_HOURS.saturday}<br />Sunday: {BUSINESS_HOURS.sunday}</p> },
  ];

  const fade = (delay: number): React.CSSProperties => ({
    opacity: heroVisible ? 1 : 0,
    transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
    transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
  });

  return (
    <>
      <style>{`
        html { scroll-behavior: smooth; }
        .ct-input::placeholder { color: rgba(255,255,255,0.3); }
        .ct-input:focus { border-color: var(--gold) !important; background: rgba(255,255,255,0.07) !important; }
        .ct-input option { background: #1a1a1a; color: #fff; }
        .ct-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .ct-layout  { display: flex; gap: 80px; flex-wrap: wrap; }
        .ct-stats { display:grid;grid-template-columns:repeat(4,1fr); }
        .ct-social-link { font-family:var(--font-body);font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,0.5);text-decoration:none;transition:color 0.2s; }
        .ct-social-link:hover { color:var(--gold); }
        @media (max-width: 900px) { .ct-layout { flex-direction: column; gap: 56px; } .ct-stats { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 600px) { .ct-form-grid { grid-template-columns: 1fr; } .ct-stats { grid-template-columns: repeat(2,1fr); } }
      `}</style>

      <section style={{ position: 'relative', minHeight: '60vh', display: 'flex', alignItems: 'flex-end', background: 'linear-gradient(135deg, #0d0d1a 0%, #1a1a2e 40%, #0a0a0a 100%)', paddingTop: 100, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")", opacity: 0.5, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', opacity: 0.6 }} />
        <div style={{ position: 'absolute', right: '5%', top: '50%', transform: 'translateY(-50%)', fontFamily: 'var(--font-display)', fontSize: 'clamp(100px,18vw,220px)', fontWeight: 300, color: 'rgba(255,255,255,0.025)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>
          Contact
        </div>

        <div style={{ position: 'relative', width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 48px 80px' }}>
          <nav suppressHydrationWarning style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 32, ...fade(0) }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>›</span>
            <span style={{ color: 'var(--gold)' }}>Contact</span>
          </nav>

          <p suppressHydrationWarning style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20, ...fade(100) }}>
            Get In Touch
          </p>
          <h1 suppressHydrationWarning style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,6vw,80px)', fontWeight: 600, color: '#ffffff', lineHeight: 1.05, marginBottom: 24, maxWidth: 700, ...fade(200) }}>
            Let&apos;s Create Something <em style={{ fontStyle: 'italic', color: 'var(--gold-light)' }}>Extraordinary</em>
          </h1>
          <p suppressHydrationWarning style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(15px,2vw,20px)', fontWeight: 300, fontStyle: 'italic', color: 'rgba(255,255,255,0.55)', maxWidth: 500, marginBottom: 48, ...fade(340) }}>
            Book a free consultation and let&apos;s bring your vision to life.
          </p>
          <div suppressHydrationWarning style={{ display: 'flex', gap: 16, flexWrap: 'wrap', ...fade(460) }}>
            <Button href="#contact-form" variant="default" size="lg" showArrow>Book a Consultation</Button>
            <Button href="/projects" variant="secondary" size="lg">View Projects</Button>
          </div>
        </div>
      </section>

      <section style={{ background: '#0a0a0a', padding: '0 48px' }}>
        <div className="ct-stats" style={{ maxWidth: 1200, margin: '0 auto', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <StatCard value="150+"  label="Projects Completed" delay={0}   />
          <StatCard value="8+"    label="Years of Excellence" delay={100} />
          <StatCard value="24hrs" label="Response Time"       delay={200} />
          <StatCard value="100%"  label="Client Satisfaction" delay={300} />
        </div>
      </section>

      <section id="contact-form" style={{ background: '#0d0d0d', padding: '96px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <AnimatedSection delay={0}>
            <div style={{ marginBottom: 64 }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>Reach Out</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 300, color: '#ffffff', lineHeight: 1.15 }}>Book a Free Consultation</h2>
            </div>
          </AnimatedSection>

          <div className="ct-layout">
            <AnimatedSection delay={100}>
              <div style={{ flex: 2, minWidth: 300 }}>
                {submitted ? (
                  <div style={{ padding: '56px 40px', background: 'linear-gradient(135deg, rgba(201,169,110,0.12), rgba(201,169,110,0.04))', border: '1px solid rgba(201,169,110,0.2)', textAlign: 'center' }}>
                    <p style={{ fontSize: 40, marginBottom: 16 }}>✓</p>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 300, color: 'var(--gold)', marginBottom: 12 }}>Thank You!</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 32, lineHeight: 1.7 }}>We&apos;ve received your enquiry and will be in touch within 24 hours.</p>
                    <Button onClick={() => setSubmitted(false)} variant="secondary" size="sm">Send Another</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div className="ct-form-grid">
                      <div>
                        <input {...register('fullName')} placeholder="Full Name *" className="ct-input" style={errors.fullName ? errorInput : baseInput} />
                        <ErrorMsg msg={errors.fullName?.message} />
                      </div>
                      <div>
                        <input {...register('email')} type="email" placeholder="Email Address *" className="ct-input" style={errors.email ? errorInput : baseInput} />
                        <ErrorMsg msg={errors.email?.message} />
                      </div>
                    </div>

                    <div className="ct-form-grid">
                      <div>
                        <input {...register('phone')} type="tel" placeholder="Phone Number *" className="ct-input" style={errors.phone ? errorInput : baseInput} />
                        <ErrorMsg msg={errors.phone?.message} />
                      </div>
                      <div>
                        <input {...register('projectLocation')} placeholder="Project Location *" className="ct-input" style={errors.projectLocation ? errorInput : baseInput} />
                        <ErrorMsg msg={errors.projectLocation?.message} />
                      </div>
                    </div>

                    <div>
                      <select {...register('projectType')} className="ct-input" style={{ ...(errors.projectType ? errorInput : baseInput), appearance: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.8)' }}>
                        <option value="" disabled>Type of Project *</option>
                        <option value="residential">Residential Interior Design</option>
                        <option value="commercial">Commercial Interior Design</option>
                        <option value="office">Office Interior</option>
                        <option value="hospitality">Hospitality Space</option>
                        <option value="other">Other</option>
                      </select>
                      <ErrorMsg msg={errors.projectType?.message} />
                    </div>

                    <div>
                      <textarea {...register('message')} placeholder="Message / Project Description *" rows={5} className="ct-input" style={{ ...(errors.message ? errorInput : baseInput), resize: 'vertical' }} />
                      <ErrorMsg msg={errors.message?.message} />
                    </div>

                    {serverError && (
                      <div style={{ padding: '12px 16px', background: 'rgba(192,57,43,0.1)', border: '1px solid rgba(192,57,43,0.3)', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <AlertCircle size={14} color="#e74c3c" />
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#e74c3c' }}>{serverError}</p>
                      </div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', marginTop: 8 }}>
                      <Button type="submit" variant="default" size="lg" isLoading={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Send Enquiry'}
                      </Button>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: 1 }}>We respond within 24 hours</p>
                    </div>
                  </form>
                )}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div style={{ flex: 1, minWidth: 240 }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 300, color: '#ffffff', marginBottom: 36 }}>Studio Information</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                  {infoItems.map((item) => (
                    <div key={item.label} style={{ display: 'flex', gap: 16 }}>
                      {item.icon}
                      <div>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 6 }}>{item.label}</p>
                        {item.content}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 44, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>Follow Us</p>
                  <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                    {[
                      { label: 'Instagram', href: `https://instagram.com/${CONTACT_INFO.social?.instagram}` },
                      { label: 'Facebook',  href: `https://facebook.com/${CONTACT_INFO.social?.facebook}` },
                      { label: 'LinkedIn',  href: `https://linkedin.com/company/${CONTACT_INFO.social?.linkedin}` },
                      { label: 'YouTube',   href: '#' },
                    ].map((s) => (
                      <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="ct-social-link">{s.label}</a>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: 44, padding: '28px 24px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20 }}>Explore More</p>
                  {[
                    { label: 'View Our Projects', href: '/projects' },
                    { label: 'Our Services',       href: '/services' },
                    { label: 'Design Process',     href: '/process'  },
                  ].map((link) => (
                    <Link key={link.href} href={link.href} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontFamily: 'var(--font-body)', fontSize: 12, letterSpacing: 1, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}>
                      {link.label}
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </Link>
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
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 24 }}>Our Portfolio</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 300, color: '#ffffff', lineHeight: 1.15, marginBottom: 20 }}>Explore Our Work</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', marginBottom: 48 }}>
              Discover the spaces we&apos;ve crafted — from modern villas to boutique hotels across India.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button href="/projects" variant="default" size="xl" showArrow>View Projects</Button>
              <Button href="/services" variant="secondary" size="xl">Our Services</Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}