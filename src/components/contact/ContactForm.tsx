'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AlertCircle, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { CONTACT_INFO, BUSINESS_HOURS } from '@/lib/constants';

const inquirySchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^[+]?[\d\s\-\(\)]+$/, 'Please enter a valid phone number'),
  projectLocation: z.string().min(3, 'Location must be at least 3 characters').max(200),
  projectType: z.string().min(1, 'Please select a project type'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

const baseInput: React.CSSProperties = {
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

const errorInput: React.CSSProperties = {
  ...baseInput,
  borderBottomColor: '#c0392b',
};

const ErrorMsg = ({ msg }: { msg?: string }) =>
  msg ? (
    <p
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: 11,
        color: '#c0392b',
        marginTop: 4,
        display: 'flex',
        alignItems: 'center',
        gap: 4,
      }}
    >
      <AlertCircle size={12} />
      {msg}
    </p>
  ) : null;

const ContactForm = () => {
  const [serverError, setServerError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      projectLocation: '',
      projectType: '',
      message: '',
    },
  });

  const onSubmit = async (data: InquiryFormData) => {
    setServerError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        setSubmitted(true);
        reset();
      } else {
        setServerError(result.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setServerError('Network error. Please try again.');
    }
  };

  return (
    <>
      <style>{`
        .cf-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media (max-width: 640px) { .cf-row { grid-template-columns: 1fr; } }
        .cf-wrap { display: flex; gap: 80px; flex-wrap: wrap; max-width: 1100px; margin: 0 auto; }
        @media (max-width: 768px) { .cf-wrap { flex-direction: column; gap: 48px; } }
        .cf-social-link { font-family: var(--font-body); font-size: 10px; font-weight: 600;
          letter-spacing: 1.5px; color: var(--grey-text); text-transform: uppercase;
          text-decoration: none; transition: color 0.2s; }
        .cf-social-link:hover { color: var(--gold); }
      `}</style>

      <div className="cf-wrap">

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
            <div style={{ padding: 40, background: 'var(--gold)', textAlign: 'center' }}>
              <p style={{ fontSize: 32, marginBottom: 12 }}>✓</p>
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
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(255,255,255,0.85)', marginBottom: 24 }}>
                We&apos;ve received your enquiry and will be in touch shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  background: '#fff',
                  border: 'none',
                  padding: '12px 28px',
                  cursor: 'pointer',
                }}
              >
                Send Another →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              <div className="cf-row">
                <div>
                  <input
                    {...register('fullName')}
                    placeholder="Full Name *"
                    style={errors.fullName ? errorInput : baseInput}
                    onFocus={(e) => (e.target.style.borderBottomColor = 'var(--gold)')}
                    onBlur={(e) => (e.target.style.borderBottomColor = errors.fullName ? '#c0392b' : 'var(--grey-mid)')}
                  />
                  <ErrorMsg msg={errors.fullName?.message} />
                </div>
                <div>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="Email Address *"
                    style={errors.email ? errorInput : baseInput}
                    onFocus={(e) => (e.target.style.borderBottomColor = 'var(--gold)')}
                    onBlur={(e) => (e.target.style.borderBottomColor = errors.email ? '#c0392b' : 'var(--grey-mid)')}
                  />
                  <ErrorMsg msg={errors.email?.message} />
                </div>
              </div>

              <div className="cf-row">
                <div>
                  <input
                    {...register('phone')}
                    type="tel"
                    placeholder="Phone Number *"
                    style={errors.phone ? errorInput : baseInput}
                    onFocus={(e) => (e.target.style.borderBottomColor = 'var(--gold)')}
                    onBlur={(e) => (e.target.style.borderBottomColor = errors.phone ? '#c0392b' : 'var(--grey-mid)')}
                  />
                  <ErrorMsg msg={errors.phone?.message} />
                </div>
                <div>
                  <input
                    {...register('projectLocation')}
                    placeholder="Project Location *"
                    style={errors.projectLocation ? errorInput : baseInput}
                    onFocus={(e) => (e.target.style.borderBottomColor = 'var(--gold)')}
                    onBlur={(e) => (e.target.style.borderBottomColor = errors.projectLocation ? '#c0392b' : 'var(--grey-mid)')}
                  />
                  <ErrorMsg msg={errors.projectLocation?.message} />
                </div>
              </div>

              <div>
                <select
                  {...register('projectType')}
                  style={{
                    ...(errors.projectType ? errorInput : baseInput),
                    appearance: 'none',
                    cursor: 'pointer',
                  }}
                  onFocus={(e) => (e.target.style.borderBottomColor = 'var(--gold)')}
                  onBlur={(e) => (e.target.style.borderBottomColor = errors.projectType ? '#c0392b' : 'var(--grey-mid)')}
                >
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
                <textarea
                  {...register('message')}
                  placeholder="Message / Project Description *"
                  rows={5}
                  style={{ ...(errors.message ? errorInput : baseInput), resize: 'vertical' }}
                  onFocus={(e) => (e.target.style.borderBottomColor = 'var(--gold)')}
                  onBlur={(e) => (e.target.style.borderBottomColor = errors.message ? '#c0392b' : 'var(--grey-mid)')}
                />
                <ErrorMsg msg={errors.message?.message} />
              </div>

              {serverError && (
                <div
                  style={{
                    padding: '12px 16px',
                    background: 'rgba(192,57,43,0.08)',
                    border: '1px solid rgba(192,57,43,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <AlertCircle size={14} color="#c0392b" />
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#c0392b' }}>
                    {serverError}
                  </p>
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', marginTop: 8 }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    color: '#fff',
                    background: isSubmitting ? 'var(--gold-dark)' : 'var(--gold)',
                    border: 'none',
                    padding: '15px 32px',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    transition: 'background var(--transition)',
                  }}
                  onMouseEnter={(e) => { if (!isSubmitting) (e.currentTarget).style.background = 'var(--gold-dark)'; }}
                  onMouseLeave={(e) => { if (!isSubmitting) (e.currentTarget).style.background = 'var(--gold)'; }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Enquiry →'}
                </button>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--grey-text)' }}>
                  We respond within 24 hours
                </p>
              </div>

            </form>
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
            {[
              {
                icon: <Phone size={18} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: 2 }} />,
                label: 'Phone / WhatsApp',
                content: <a href={`tel:${CONTACT_INFO.phone}`} style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--black)', textDecoration: 'none' }}>{CONTACT_INFO.phone}</a>,
              },
              {
                icon: <Mail size={18} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: 2 }} />,
                label: 'Email',
                content: <a href={`mailto:${CONTACT_INFO.email}`} style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--black)', textDecoration: 'none' }}>{CONTACT_INFO.email}</a>,
              },
              {
                icon: <MapPin size={18} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: 2 }} />,
                label: 'Studio Address',
                content: <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--black)', lineHeight: 1.6, margin: 0 }}>{CONTACT_INFO.address}</p>,
              },
              {
                icon: <Clock size={18} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: 2 }} />,
                label: 'Business Hours',
                content: (
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--black)', lineHeight: 1.9, margin: 0 }}>
                    Mon – Fri: {BUSINESS_HOURS.weekdays}<br />
                    Saturday: {BUSINESS_HOURS.saturday}<br />
                    Sunday: {BUSINESS_HOURS.sunday}
                  </p>
                ),
              },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', gap: 16 }}>
                {item.icon}
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--grey-text)', marginBottom: 6, margin: '0 0 6px' }}>
                    {item.label}
                  </p>
                  {item.content}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 40, paddingTop: 32, borderTop: '1px solid var(--grey-mid)' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--grey-text)', marginBottom: 16 }}>
              Follow Us
            </p>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {[
                { label: 'Instagram', href: `https://instagram.com/${CONTACT_INFO.social?.instagram}` },
                { label: 'Facebook',  href: `https://facebook.com/${CONTACT_INFO.social?.facebook}` },
                { label: 'LinkedIn',  href: `https://linkedin.com/company/${CONTACT_INFO.social?.linkedin}` },
                { label: 'YouTube',   href: '#' },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="cf-social-link">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default ContactForm;
