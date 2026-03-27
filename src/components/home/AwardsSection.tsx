'use client';
const AwardsSection = () => {
  return (
    <section
      style={{
        padding: 'var(--section-pad-y) var(--section-pad-x)',
        background: 'var(--off-white)',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 96 }}>

        <div
          style={{ display: 'flex', alignItems: 'center', gap: 80, flexWrap: 'wrap' }}
          className="awards-flex"
        >
          <div style={{ flex: 1, minWidth: 260 }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 10,
                letterSpacing: 4,
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: 14,
              }}
            >
              Awards
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(26px, 3vw, 38px)',
                fontWeight: 400,
                color: 'var(--black)',
                marginBottom: 20,
              }}
            >
              Design Excellence Award
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                color: 'var(--grey-dark)',
                lineHeight: 1.9,
                maxWidth: 420,
              }}
            >
              Interior Studio Ltd has been recognized as a leading interior design practice
              in India, known for its commitment to quality, innovation, and outstanding
              client satisfaction across residential and commercial projects.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
            {[
              { year: '2022', scale: false },
              { year: '2023', scale: true  },
              { year: '2024', scale: false },
            ].map(({ year, scale }) => (
              <div
                key={year}
                className="award-badge"
                style={{
                  background: 'var(--black)',
                  color: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '24px 20px 32px',
                  width: 110,
                  clipPath: 'polygon(0 0, 100% 0, 100% 86%, 50% 100%, 0 86%)',
                  transform: scale ? 'scale(1.10)' : 'scale(1)',
                  opacity: scale ? 1 : 0.75,
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.15)';
                  e.currentTarget.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = scale ? 'scale(1.10)' : 'scale(1)';
                  e.currentTarget.style.opacity = scale ? '1' : '0.75';
                }}
              >
                <div style={{ display: 'flex', gap: 2, marginBottom: 8 }}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{ color: 'var(--gold)', fontSize: 9 }}>★</span>
                  ))}
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 8,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    color: 'var(--gold-light)',
                    lineHeight: 1.6,
                    marginBottom: 6,
                  }}
                >
                  Luxury<br />Interior<br />Design
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 26,
                    fontWeight: 700,
                    color: 'var(--gold)',
                    lineHeight: 1,
                    marginBottom: 4,
                  }}
                >
                  No.1
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 8,
                    fontWeight: 700,
                    letterSpacing: 1.5,
                    color: '#fff',
                    marginBottom: 4,
                  }}
                >
                  BEST STUDIO
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 9,
                    letterSpacing: 1,
                    textAlign: 'center',
                    color: 'rgba(255,255,255,0.5)',
                    lineHeight: 1.5,
                  }}
                >
                  {year}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', gap: 80, flexWrap: 'wrap' }}
          className="awards-flex-reverse"
        >
          {/* Text */}
          <div style={{ flex: 1, minWidth: 260 }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 10,
                letterSpacing: 4,
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: 14,
              }}
            >
              Certificate
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(26px, 3vw, 38px)',
                fontWeight: 400,
                color: 'var(--black)',
                marginBottom: 20,
              }}
            >
              ISO 9001:2015
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                color: 'var(--grey-dark)',
                lineHeight: 1.9,
                maxWidth: 420,
              }}
            >
              Interior Studio Ltd holds a Quality Management System certificate that proves
              our high level of services and compliance with modern standards of quality —
              ensuring every project is delivered with consistency and excellence.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 16 }}>
            {['Interior Studio Ltd', 'IS Construction LLC'].map((name) => (
              <div
                key={name}
                className="certificate-card"
                style={{
                  width: 168,
                  height: 224,
                  background: 'var(--white)',
                  border: '1px solid var(--grey-mid)',
                  boxShadow: 'var(--shadow-md)',
                  borderRadius: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '20px 16px',
                  gap: 10,
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: '#b91c1c',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      color: '#fff',
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: 1,
                    }}
                  >
                    ISO
                  </span>
                </div>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 10,
                    fontWeight: 600,
                    color: 'var(--black)',
                    textAlign: 'center',
                    letterSpacing: 0.5,
                    lineHeight: 1.4,
                  }}
                >
                  Certificate of<br />Registration
                </p>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 10,
                    color: 'var(--grey-text)',
                    textAlign: 'center',
                  }}
                >
                  {name}
                </p>

                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'var(--black)',
                  }}
                >
                  ISO 9001:2015
                </p>

                <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: '#1e3a5f',
                    }}
                  />
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: 'var(--grey-mid)',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .awards-flex,
          .awards-flex-reverse {
            flex-direction: column !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default AwardsSection;