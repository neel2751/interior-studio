'use client';
import Image from 'next/image';
import Link from 'next/link';
import FadeInSection from '@/components/common/FadeInSection';

const AboutSection = () => {
  return (
    <section
      id="about"
      style={{
        padding: 'var(--section-pad-y) var(--section-pad-x)',
        background: 'var(--off-white)',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 80,
            flexWrap: 'wrap',
          }}
          className="about-flex"
        >

          <div style={{ flex: 1, minWidth: 280 }}>
            <FadeInSection direction="right" delay={0}>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 3.5vw, 42px)',
                  fontWeight: 400,
                  color: 'var(--black)',
                  marginBottom: 28,
                }}
              >
                About us
              </h2>
            </FadeInSection>

            <FadeInSection direction="right" delay={0.1}>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  color: 'var(--grey-dark)',
                  lineHeight: 1.9,
                  marginBottom: 20,
                }}
              >
                Interior Studio Ltd is a premier interior design firm headquartered in Ahmedabad,
                specializing in architecture, interior design, and full-scope fit-out services for
                both residential and commercial properties. We deliver exclusive turnkey solutions
                across India, including private villas, high-end residences, boutiques, offices,
                and hospitality spaces.
              </p>
            </FadeInSection>

            <FadeInSection direction="right" delay={0.2}>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  color: 'var(--grey-dark)',
                  lineHeight: 1.9,
                  marginBottom: 20,
                }}
              >
                Our name is synonymous with refined taste, technical excellence, and exceptional
                quality. From concept development and architectural planning to bespoke furniture
                production and complete interior furnishing — we manage every detail with precision
                and artistry.
              </p>
            </FadeInSection>

            <FadeInSection direction="right" delay={0.3}>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  color: 'var(--grey-dark)',
                  lineHeight: 1.9,
                  marginBottom: 32,
                }}
              >
                With years of expertise and our flagship studio in Ahmedabad, we bring the most
                ambitious visions to life. Recognized as one of the top interior design firms in
                India, we proudly serve a distinguished clientele.
              </p>
            </FadeInSection>

            <FadeInSection direction="right" delay={0.4}>
              <div style={{ marginBottom: 32 }}>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 15,
                    fontStyle: 'italic',
                    color: 'var(--gold)',
                    marginBottom: 4,
                  }}
                >
                  The Design Team
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 11,
                    letterSpacing: 1,
                    color: 'var(--grey-text)',
                    textTransform: 'uppercase',
                  }}
                >
                  Founders &amp; Creative Visionaries — Interior Studio Ltd
                </p>
              </div>
            </FadeInSection>

            <FadeInSection direction="right" delay={0.5}>
              <Link
                href="/process"
                className="group"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  fontFamily: 'var(--font-body)',
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: 2.5,
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  borderBottom: '1px solid var(--gold)',
                  paddingBottom: 3,
                  transition: 'color var(--transition), border-color var(--transition), gap var(--transition)',
                }}
              >
                <span>Read More</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </FadeInSection>
          </div>

          <div style={{ flex: 1, minWidth: 280, width: '100%' }}>
            <FadeInSection direction="left" delay={0.2}>
              <div
                className="group overflow-hidden"
                style={{
                  position: 'relative',
                  width: '100%',
                  height: 520,
                  overflow: 'hidden',
                  borderRadius: 2,
                }}
              >
                <Image
                  src="/images/hero/ChatGPT Image Mar 26, 2026, 09_27_00 PM.png"
                  alt="Interior Studio Ltd — Design Team"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      '/images/projects/modern-villa-ahmedabad/ChatGPT Image Mar 26, 2026, 09_14_47 PM.png';
                  }}
                />
              </div>
            </FadeInSection>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-flex {
            flex-direction: column !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;