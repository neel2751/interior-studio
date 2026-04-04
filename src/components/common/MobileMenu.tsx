'use client';

import Link from 'next/link';
import { X, Phone, Mail, MapPin } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/constants';
import { RESIDENTIAL_SERVICES } from '@/data/residentialServices';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: 'Home',     href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Process',  href: '/process' },
  { name: 'About Us', href: '/#about' },
  { name: 'Contact',  href: '/contact' },
];

const residentialServices = RESIDENTIAL_SERVICES.map((service) => ({
  name: service.title,
  href: `/services/residential/${service.slug}`,
  icon: service.icon,
}));

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? 'opacity-60' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed right-0 top-0 h-full w-full max-w-sm shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ background: 'var(--black)' }}
      >

        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        >
          <Link href="/" onClick={onClose} className="flex items-center gap-3">
            <div
              className="flex items-center justify-center"
              style={{ width: 36, height: 36, background: 'var(--gold)' }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 13,
                  fontWeight: 700,
                  color: 'var(--white)',
                  letterSpacing: 1,
                }}
              >
                IS
              </span>
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: 3,
                  color: 'var(--white)',
                  textTransform: 'uppercase',
                }}
              >
                INTERIOR STUDIO
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 8,
                  letterSpacing: 4,
                  color: 'var(--gold)',
                  textTransform: 'uppercase',
                  marginTop: 2,
                }}
              >
                LTD
              </div>
            </div>
          </Link>

          <button
            onClick={onClose}
            className="transition-colors duration-200 p-1"
            suppressHydrationWarning={true}
            style={{ color: 'var(--grey-text)' }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color = 'var(--gold)')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color = 'var(--grey-text)')
            }
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 px-6 py-8 overflow-y-auto">
          <ul className="space-y-1">
            {navigation.map((item, i) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center justify-between py-4 group transition-colors duration-200"
                  style={{
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: 3,
                    color: 'rgba(255,255,255,0.7)',
                    textTransform: 'uppercase',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold)')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.7)')
                  }
                >
                  <span>{item.name}</span>
                  <span
                    style={{ color: 'var(--gold)', fontSize: 16, opacity: 0.6 }}
                    className="group-hover:opacity-100 transition-opacity duration-200"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: 2,
                color: 'var(--gold)',
                textTransform: 'uppercase',
                marginBottom: 12,
              }}
            >
              Residential Services
            </p>
            <ul className="space-y-0">
              {residentialServices.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center gap-3 py-2.5 transition-colors duration-200"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 10,
                      fontWeight: 400,
                      letterSpacing: 1,
                      color: 'rgba(255,255,255,0.55)',
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold)')
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.55)')
                    }
                  >
                    {item.icon && (
                      <img
                        src={item.icon}
                        alt=""
                        style={{
                          width: '14px',
                          height: '14px',
                          flexShrink: 0,
                          opacity: 0.7,
                        }}
                      />
                    )}
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <Link
              href="/contact"
              onClick={onClose}
              className="flex items-center justify-center w-full py-4 transition-all duration-300"
              style={{
                background: 'var(--gold)',
                color: 'var(--white)',
                fontFamily: 'var(--font-body)',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 3,
                textTransform: 'uppercase',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.background = 'var(--gold-dark)')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.background = 'var(--gold)')
              }
            >
              Book Free Consultation
            </Link>
          </div>

          <div
            className="mt-8 pt-8 space-y-5"
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
          >
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="flex items-center gap-3 transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,0.55)' }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold)')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.55)')
              }
            >
              <Phone size={14} style={{ color: 'var(--gold)', flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 13 }}>
                {CONTACT_INFO.phone}
              </span>
            </a>

            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="flex items-center gap-3 transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,0.55)' }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold)')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.55)')
              }
            >
              <Mail size={14} style={{ color: 'var(--gold)', flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 13 }}>
                {CONTACT_INFO.email}
              </span>
            </a>

            <div className="flex items-start gap-3" style={{ color: 'rgba(255,255,255,0.55)' }}>
              <MapPin size={14} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: 2 }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.6 }}>
                {CONTACT_INFO.address}
              </span>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            {[
              { label: 'IG', href: `https://instagram.com/${CONTACT_INFO.social?.instagram}` },
              { label: 'FB', href: `https://facebook.com/${CONTACT_INFO.social?.facebook}` },
              { label: 'LI', href: `https://linkedin.com/company/${CONTACT_INFO.social?.linkedin}` },
              { label: 'YT', href: '#' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: 2,
                  color: 'rgba(255,255,255,0.35)',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.35)')
                }
              >
                {s.label}
              </a>
            ))}
          </div>
        </nav>

        <div
          className="px-6 py-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 10,
              color: 'rgba(255,255,255,0.25)',
              letterSpacing: 1,
            }}
          >
            © 2024–2026 Interior Studio Ltd. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  );
};

export default MobileMenu;
