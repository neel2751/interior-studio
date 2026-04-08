'use client';
import Link from 'next/link';
import FadeInSection from '@/components/common/FadeInSection';

const services = [
  {
    slug:        'residential-interior-design',
    title:       'Residential Interior Design',
    number:      '01',
    image:       '/images/projects/modern-villa-ahmedabad/cover.png',
    description: 'From heritage bungalows to modern villas, we create timeless spaces that reflect elegance, individuality, and impeccable taste.',
  },
  {
    slug:        'commercial-interior-design',
    title:       'Commercial Interior Design',
    number:      '02',
    image:       '/images/projects/tech-office-bangalore/cover.png',
    description: 'Expert commercial solutions with exceptional quality and seamless project execution that distinguishes us in the luxury design industry.',
  },
  {
    slug:        'office-interior',
    title:       'Office Interior',
    number:      '03',
    image:       '/images/projects/sky-penthouse-mumbai/cover.png',
    description: 'Full-scale office interior design — from concept to final delivery, executed with precision and in alignment with design standards.',
  },
  {
    slug:        'hospitality-space',
    title:       'Hospitality Space',
    number:      '04',
    image:       '/images/projects/boutique-hotel-goa/cover.png',
    description: 'End-to-end hospitality design — from boutique hotels to restaurants, creating harmonious environments that elevate guest experience.',
  },
];

const ServicesPreview = () => {
  return (
    <section style={{ padding: 'var(--section-pad-y) var(--section-pad-x)', background: '#0f0f0f' }}>
      <FadeInSection direction="up" delay={0}>
        <div style={{ maxWidth: 1200, margin: '0 auto', marginBottom: 56, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>
              What We Do
            </p>
            <h2 style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 500, color: '#ffffff', letterSpacing: 1 }}>
              Our Services
            </h2>
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(255,255,255,0.45)', maxWidth: 380, lineHeight: 1.8, textAlign: 'right' }}>
            Full-service interior design for residential &amp; commercial projects — providing design, planning and fit-out solutions across India.
          </p>
        </div>
      </FadeInSection>

      <div className="sp-grid" style={{ maxWidth: 1200, margin: '0 auto' }}>
        {services.map((service, index) => (
          <FadeInSection key={service.slug} direction="up" delay={index * 0.12} duration={0.7}>
            <ServiceTile service={service} />
          </FadeInSection>
        ))}
      </div>

      <FadeInSection direction="up" delay={0.3} duration={0.6}>
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <Link
            href="/services"
            className="view-services-btn"
          >
            View Services
            <span>→</span>
          </Link>
        </div>
      </FadeInSection>
    </section>
  );
};

const ServiceTile = ({ service }: { service: typeof services[number] }) => {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="sp-tile"
      style={{ position: 'relative', display: 'block', height: 480, overflow: 'hidden', textDecoration: 'none', background: '#1a1a1a' }}
    >
      <img
        src={service.image}
        alt={service.title}
        className="sp-bg"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55, transition: 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.5s ease' }}
      />

      <div className="sp-dim" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)', transition: 'background 0.5s ease' }} />

      <div style={{ position: 'absolute', inset: 0, padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', zIndex: 2 }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500, letterSpacing: 2, color: 'var(--gold)', marginBottom: 12 }}>
          {service.number}
        </p>
        <h3 className="sp-title" style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(17px, 1.8vw, 22px)', fontWeight: 500, color: 'rgba(255,255,255,0.9)', letterSpacing: 0.5, lineHeight: 1.3, marginBottom: 14, transition: 'color 0.3s ease' }}>
          {service.title}
        </h3>
        <div style={{ width: 40, height: 1, background: 'var(--gold)', marginBottom: 16, opacity: 0.7 }} />
        <p className="sp-desc" style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: 20, opacity: 0, transform: 'translateY(8px)', transition: 'opacity 0.4s ease 0.05s, transform 0.4s ease 0.05s' }}>
          {service.description}
        </p>
        <span className="sp-arrow" style={{ fontFamily: 'var(--font-body)', fontSize: 9, fontWeight: 600, letterSpacing: 2.5, textTransform: 'uppercase', color: 'var(--gold)', opacity: 0, transform: 'translateX(-6px)', transition: 'opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s' }}>
          Explore →
        </span>
      </div>
    </Link>
  );
};

export default ServicesPreview;