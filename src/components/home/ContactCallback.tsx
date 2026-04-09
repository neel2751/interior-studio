'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HydrationSuppressor from '@/components/common/HydrationSuppressor';

const ContactCallback = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.phone) return;
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

  return (
    <section
      style={{
        padding: 'var(--section-pad-y) var(--section-pad-x)',
        background: 'var(--off-white)',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 72, flexWrap: 'wrap' }}
          className="contact-flex"
        >

          <div style={{ flex: 1, minWidth: 280 }}>
            <h2
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(26px, 3vw, 38px)',
                fontWeight: 500,
                color: 'var(--black)',
                lineHeight: 1.25,
                marginBottom: 10,
              }}
            >
              Any questions?<br />We will call you back!
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                color: 'var(--grey-text)',
                marginBottom: 32,
              }}
            >
              Enter your contact details and our manager will contact you.
            </p>

            {submitted ? (
              <div
                style={{
                  padding: '28px 32px',
                  background: 'var(--gold)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span style={{ fontSize: 24 }}>✓</span>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    fontWeight: 500,
                    color: '#fff',
                    letterSpacing: 1,
                  }}
                >
                  Thank you! We&apos;ll be in touch shortly.
                </p>
              </div>
            ) : (
              <HydrationSuppressor>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: 12,
                      marginBottom: 12,
                    }}
                    className="form-grid-responsive"
                  >
                    {[
                      { name: 'name',  type: 'text',  placeholder: 'Name'  },
                      { name: 'phone', type: 'tel',   placeholder: '+91'   },
                      { name: 'email', type: 'email', placeholder: 'Email' },
                    ].map((field) => (
                      <input
                        key={field.name}
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={form[field.name as keyof typeof form]}
                        onChange={handleChange}
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 13,
                          color: 'var(--black)',
                          background: 'transparent',
                          border: 'none',
                          borderBottom: '1px solid var(--grey-mid)',
                          padding: '12px 4px',
                          outline: 'none',
                          transition: 'border-color var(--transition)',
                          width: '100%',
                        }}
                        onFocus={(e) =>
                          ((e.target as HTMLInputElement).style.borderBottomColor = 'var(--gold)')
                        }
                        onBlur={(e) =>
                          ((e.target as HTMLInputElement).style.borderBottomColor = 'var(--grey-mid)')
                        }
                      />
                    ))}
                  </div>

                  <textarea
                    name="message"
                    placeholder="Message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 13,
                      color: 'var(--black)',
                      background: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid var(--grey-mid)',
                      padding: '12px 4px',
                      outline: 'none',
                      resize: 'vertical',
                      width: '100%',
                      marginBottom: 20,
                      transition: 'border-color var(--transition)',
                    }}
                    onFocus={(e) =>
                      ((e.target as HTMLTextAreaElement).style.borderBottomColor = 'var(--gold)')
                    }
                    onBlur={(e) =>
                      ((e.target as HTMLTextAreaElement).style.borderBottomColor = 'var(--grey-mid)')
                    }
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
                        padding: '14px 28px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
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
                      {loading ? 'Sending...' : 'SUBMIT →'}
                    </button>

                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 11,
                        color: 'var(--grey-text)',
                      }}
                    >
                      By clicking &quot;Submit&quot; you agree to our{' '}
                      <Link
                        href="/privacy"
                        style={{
                          color: 'var(--gold)',
                          textDecoration: 'underline',
                          textUnderlineOffset: 3,
                        }}
                      >
                        Privacy Policy
                      </Link>
                    </p>
                  </div>
                </div>
              </HydrationSuppressor>
            )}
          </div>

          <div
            style={{ flex: 1, minWidth: 280, width: '100%' }}
            className="contact-image-hide"
          >
            <div style={{ position: 'relative', width: '100%', height: 360 }}>
              <Image
                src="/images/hero/hero-slide-1.png.png"
                alt="Interior Studio — Design Studio"
                fill
                className="object-contain object-center"
                sizes="(max-width: 768px) 0vw, 50vw"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    '/images/projects/modern-villa-ahmedabad/cover.png';
                }}
              />
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-flex {
            flex-direction: column !important;
            gap: 40px !important;
          }
          .contact-image-hide {
            display: none;
          }
          .form-grid-responsive {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ContactCallback;
