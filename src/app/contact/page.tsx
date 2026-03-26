'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { CONTACT_INFO, BUSINESS_HOURS } from '@/lib/constants';

const ContactPage = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    projectType: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.fullName || !form.email || !form.phone) return;
    setLoading(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } catch (_) { 
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  const inputStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body)',
    fontSize: 13,
    color: 'var(--black)',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid var(--grey-mid)',
    padding: '13px 4px',
    outline: 'none',
    width: '100%',
    transition: 'border-color var(--transition)',
  };

  return (
    <main style={{ paddingTop: 'var(--navbar-height)' }}>

      <section
        style={{
          background: 'var(--black)',
          padding: '72px var(--section-pad-x) 64px',
          textAlign: 'center',
        }}
      >
        <p className="gold-label" style={{ marginBottom: 16 }}>Get In Touch</p>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 5vw, 60px)',
            fontWeight: 400,
            color: '#fff',
            marginBottom: 20,
          }}
        >
          Contact Us
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            color: 'rgba(255,255,255,0.55)',
            maxWidth: 480,
            margin: '0 auto',
            lineHeight: 1.8,
          }}
        >
          Ready to transform your space? Book a free consultation and
          let&apos;s bring your vision to life.
        </p>
      </section>

      <section
        style={{
          padding: 'var(--section-pad-y) var(--section-pad-x)',
          background: 'var(--white)',
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'flex',
            gap: 80,
            flexWrap: 'wrap',
          }}
          className="contact-page-flex"
        >

          <div style={{ flex: 2, minWidth: 300 }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(24px, 3vw, 36px)',
                fontWeight: 400,
                color: 'var(--black)',
                marginBottom: 8,
              }}
            >
              Book a Free Consultation
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                color: 'var(--grey-text)',
                marginBottom: 36,
              }}
            >
              Fill in your details and our team will get back to you within 24 hours.
            </p>

            {submitted ? (
              <div
                style={{
                  padding: '36px',
                  background: 'var(--gold)',
                  textAlign: 'center',
                }}
              >
                <p style={{ fontSize: 28, marginBottom: 12 }}>✓</p>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 22,
                    color: '#fff',
                    marginBottom: 8,
                  }}
                >
                  Thank You!
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.85)',
                  }}
                >
                  We&apos;ve received your enquiry and will be in touch shortly.
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                <div
                  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}
                  className="form-row-responsive"
                >
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name *"
                    value={form.fullName}
                    onChange={handleChange}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderBottomColor = 'var(--gold)')}
                    onBlur={(e) => (e.target.style.borderBottomColor = 'var(--grey-mid)')}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    value={form.email}
                    onChange={handleChange}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderBottomColor = 'var(--gold)')}
                    onBlur={(e) => (e.target.style.borderBottomColor = 'var(--grey-mid)')}
                  />
                </div>

                <div
                  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}
                  className="form-row-responsive"
                >
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number *"
                    value={form.phone}
                    onChange={handleChange}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderBottomColor = 'var(--gold)')}
                    onBlur={(e) => (e.target.style.borderBottomColor = 'var(--grey-mid)')}
                  />
                  <input
                    type="text"
                    name="location"
                    placeholder="Project Location"
                    value={form.location}
                    onChange={handleChange}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderBottomColor = 'var(--gold)')}
                    onBlur={(e) => (e.target.style.borderBottomColor = 'var(--grey-mid)')}
                  />
                </div>

                <select
                  name="projectType"
                  value={form.projectType}
                  onChange={handleChange}
                  style={{
                    ...inputStyle,
                    appearance: 'none',
                    cursor: 'pointer',
                    color: form.projectType ? 'var(--black)' : 'var(--grey-text)',
                  }}
                  onFocus={(e) => (e.target.style.borderBottomColor = 'var(--gold)')}
                  onBlur={(e) => (e.target.style.borderBottomColor = 'var(--grey-mid)')}
                >
                  <option value="" disabled>Type of Project</option>
                  <option value="residential">Residential Interior Design</option>
                  <option value="commercial">Commercial Interior Design</option>
                  <option value="office">Office Interior</option>
                  <option value="hospitality">Hospitality Space</option>
                  <option value="other">Other</option>
                </select>

                <textarea
                  name="message"
                  placeholder="Message / Project Description"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  style={{ ...inputStyle, resize: 'vertical' }}
                  onFocus={(e) => (e.target.style.borderBottomColor = 'var(--gold)')}
                  onBlur={(e) => (e.target.style.borderBottomColor = 'var(--grey-mid)')}
                />

                <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: 2,
                      textTransform: 'uppercase',
                      color: '#fff',
                      background: loading ? 'var(--gold-dark)' : 'var(--gold)',
                      border: 'none',
                      padding: '15px 32px',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      transition: 'background var(--transition)',
                    }}
                    onMouseEnter={(e) => {
                      if (!loading)
                        (e.currentTarget as HTMLButtonElement).style.background = 'var(--gold-dark)';
                    }}
                    onMouseLeave={(e) => {
                      if (!loading)
                        (e.currentTarget as HTMLButtonElement).style.background = 'var(--gold)';
                    }}
                  >
                    {loading ? 'Sending...' : 'SEND ENQUIRY →'}
                  </button>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--grey-text)' }}>
                    We respond within 24 hours
                  </p>
                </div>
              </div>
            )}
          </div>
          
          <div style={{ flex: 1, minWidth: 240 }}>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 24,
                fontWeight: 400,
                color: 'var(--black)',
                marginBottom: 32,
              }}
            >
              Studio Information
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              <div style={{ display: 'flex', gap: 16 }}>
                <Phone size={18} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: 2 }} />
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--grey-text)', marginBottom: 6 }}>
                    Phone / WhatsApp
                  </p>
                  <a href={`tel:${CONTACT_INFO.phone}`}
                    style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--black)' }}>
                    {CONTACT_INFO.phone}
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16 }}>
                <Mail size={18} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: 2 }} />
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--grey-text)', marginBottom: 6 }}>
                    Email
                  </p>
                  <a href={`mailto:${CONTACT_INFO.email}`}
                    style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--black)' }}>
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16 }}>
                <MapPin size={18} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: 2 }} />
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--grey-text)', marginBottom: 6 }}>
                    Studio Address
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--black)', lineHeight: 1.6 }}>
                    {CONTACT_INFO.address}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16 }}>
                <Clock size={18} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: 2 }} />
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--grey-text)', marginBottom: 6 }}>
                    Business Hours
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--black)', lineHeight: 1.8 }}>
                    Mon – Fri: {BUSINESS_HOURS.weekdays}<br />
                    Saturday: {BUSINESS_HOURS.saturday}<br />
                    Sunday: {BUSINESS_HOURS.sunday}
                  </p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 40, paddingTop: 32, borderTop: '1px solid var(--grey-mid)' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--grey-text)', marginBottom: 16 }}>
                Follow Us
              </p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {[
                  { label: 'Instagram', href: `https://instagram.com/${CONTACT_INFO.social?.instagram}` },
                  { label: 'Facebook',  href: `https://facebook.com/${CONTACT_INFO.social?.facebook}` },
                  { label: 'LinkedIn',  href: `https://linkedin.com/company/${CONTACT_INFO.social?.linkedin}` },
                  { label: 'YouTube',   href: '#' },
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 600, letterSpacing: 1.5, color: 'var(--grey-text)', textTransform: 'uppercase' }}>
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .contact-page-flex { flex-direction: column !important; gap: 48px !important; }
          .form-row-responsive { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
};

export default ContactPage;