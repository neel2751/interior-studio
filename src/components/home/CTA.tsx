import Link from 'next/link';

const CTA = () => {
  return (
    <section
      style={{
        position:   'relative',
        overflow:   'hidden',
        background: '#0f0f0f',
        padding:    'var(--section-pad-y) var(--section-pad-x)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset:    0,
          zIndex:   0,
        }}
      >
        <img
          src="/images/hero/hero-bg.jpg"
          alt=""
          aria-hidden
          style={{
            width:      '100%',
            height:     '100%',
            objectFit:  'cover',
            opacity:    0.18,
          }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80';
          }}
        />
        <div
          style={{
            position:   'absolute',
            inset:      0,
            background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)',
          }}
        />
      </div>

      <div
        style={{
          position:   'absolute',
          top:        0,
          left:       '50%',
          transform:  'translateX(-50%)',
          width:      80,
          height:     1,
          background: 'var(--gold)',
          opacity:    0.8,
          zIndex:     1,
        }}
      />

      <div
        style={{
          position:       'relative',
          zIndex:         2,
          maxWidth:       720,
          margin:         '0 auto',
          textAlign:      'center',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          gap:            0,
        }}
      >
        <p
          style={{
            fontFamily:    'var(--font-body)',
            fontSize:      10,
            fontWeight:    600,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color:         'var(--gold)',
            marginBottom:  20,
          }}
        >
          Begin Your Journey
        </p>

        <h2
          style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(30px, 4.5vw, 56px)',
            fontWeight:    300,
            color:         '#ffffff',
            letterSpacing: 1,
            lineHeight:    1.2,
            marginBottom:  24,
          }}
        >
          Ready to Transform
          <br />
          Your Space?
        </h2>

        <div
          style={{
            width:        48,
            height:       1,
            background:   'var(--gold)',
            opacity:      0.7,
            marginBottom: 28,
          }}
        />

        <p
          style={{
            fontFamily:   'var(--font-body)',
            fontSize:     14,
            color:        'rgba(255,255,255,0.55)',
            lineHeight:   1.9,
            maxWidth:     520,
            marginBottom: 48,
          }}
        >
          Let&#39;s collaborate to create an interior that reflects your style and
          enhances your lifestyle. Schedule a consultation with our design team today.
        </p>

        <div
          className="cta-buttons"
          style={{
            display:    'flex',
            gap:        16,
            flexWrap:   'wrap',
            justifyContent: 'center',
            marginBottom: 48,
          }}
        >
          <Link
            href="/contact"
            style={{
              fontFamily:    'var(--font-body)',
              fontSize:      11,
              fontWeight:    600,
              letterSpacing: 2.5,
              textTransform: 'uppercase',
              color:         '#0f0f0f',
              background:    'var(--gold)',
              padding:       '16px 36px',
              textDecoration: 'none',
              transition:    'background 0.3s ease, color 0.3s ease',
              whiteSpace:    'nowrap',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'var(--gold-dark)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'var(--gold)';
            }}
          >
            Book Consultation
          </Link>

          <a
            href="tel:+919876543210"
            style={{
              fontFamily:    'var(--font-body)',
              fontSize:      11,
              fontWeight:    600,
              letterSpacing: 2.5,
              textTransform: 'uppercase',
              color:         '#ffffff',
              background:    'transparent',
              border:        '1px solid rgba(255,255,255,0.35)',
              padding:       '16px 36px',
              textDecoration: 'none',
              transition:    'border-color 0.3s ease, background 0.3s ease',
              whiteSpace:    'nowrap',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = '#ffffff';
              (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.06)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.35)';
              (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
            }}
          >
            Call Us Now
          </a>
        </div>

        <div
          className="cta-badges"
          style={{
            display:    'flex',
            gap:        32,
            flexWrap:   'wrap',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {[
            { dot: '#C9A96E', label: 'Free Initial Consultation' },
            { dot: '#C9A96E', label: 'Response Within 24 Hours' },
            { dot: '#C9A96E', label: 'Pan-India Service' },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display:    'flex',
                alignItems: 'center',
                gap:        8,
              }}
            >
              <div
                style={{
                  width:        5,
                  height:       5,
                  borderRadius: '50%',
                  background:   item.dot,
                  opacity:      0.8,
                  flexShrink:   0,
                }}
              />
              <span
                style={{
                  fontFamily:    'var(--font-body)',
                  fontSize:      11,
                  letterSpacing: 1,
                  color:         'rgba(255,255,255,0.4)',
                  textTransform: 'uppercase',
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 540px) {
          .cta-buttons { flex-direction: column; align-items: stretch; }
          .cta-buttons a { text-align: center; }
          .cta-badges { gap: 16px !important; }
        }
      `}</style>
    </section>
  );
};

export default CTA;