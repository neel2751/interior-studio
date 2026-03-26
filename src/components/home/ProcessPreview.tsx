import Link from 'next/link';
import { PROCESS_STEPS } from '@/lib/constants';

const ProcessPreview = () => {
  const previewSteps = PROCESS_STEPS.slice(0, 3);

  return (
    <section
      style={{
        padding:    'var(--section-pad-y) var(--section-pad-x)',
        background: 'var(--white)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <div
          style={{
            display:        'flex',
            alignItems:     'flex-end',
            justifyContent: 'space-between',
            flexWrap:       'wrap',
            gap:            24,
            marginBottom:   72,
          }}
        >
          <div>
            <p
              style={{
                fontFamily:    'var(--font-body)',
                fontSize:      10,
                fontWeight:    600,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color:         'var(--gold)',
                marginBottom:  12,
              }}
            >
              How We Work
            </p>
            <h2
              style={{
                fontFamily:    'var(--font-display)',
                fontSize:      'clamp(28px, 3.5vw, 48px)',
                fontWeight:    300,
                color:         'var(--black)',
                letterSpacing: 1,
              }}
            >
              Our Design Process
            </h2>
          </div>

          <Link
            href="/process"
            style={{
              fontFamily:    'var(--font-body)',
              fontSize:      10,
              fontWeight:    600,
              letterSpacing: 2.5,
              textTransform: 'uppercase',
              color:         'var(--gold)',
              borderBottom:  '1px solid var(--gold)',
              paddingBottom: 3,
              whiteSpace:    'nowrap',
              transition:    'color 0.3s ease, border-color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold-dark)';
              (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'var(--gold-dark)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold)';
              (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'var(--gold)';
            }}
          >
            See Full Process →
          </Link>
        </div>

        <div
          className="pp-grid"
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap:                 2,
          }}
        >
          {previewSteps.map((step, index) => (
            <div
              key={step.id}
              className="pp-card"
              style={{
                position:  'relative',
                padding:   '48px 40px 44px',
                background: index % 2 === 1 ? '#0f0f0f' : 'var(--white)',
                border:    '1px solid rgba(0,0,0,0.07)',
                transition: 'background 0.4s ease',
                overflow:  'hidden',
              }}
            >
              <span
                style={{
                  position:   'absolute',
                  top:        -8,
                  right:      20,
                  fontFamily: 'var(--font-display)',
                  fontSize:   120,
                  fontWeight: 300,
                  lineHeight: 1,
                  color:      index % 2 === 1
                    ? 'rgba(255,255,255,0.04)'
                    : 'rgba(0,0,0,0.04)',
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              <p
                style={{
                  fontFamily:    'var(--font-body)',
                  fontSize:      10,
                  fontWeight:    600,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                  color:         'var(--gold)',
                  marginBottom:  24,
                }}
              >
                Step {String(index + 1).padStart(2, '0')}
              </p>

              <h3
                style={{
                  fontFamily:    'var(--font-display)',
                  fontSize:      'clamp(18px, 2vw, 24px)',
                  fontWeight:    300,
                  color:         index % 2 === 1 ? '#ffffff' : 'var(--black)',
                  letterSpacing: 0.5,
                  lineHeight:    1.3,
                  marginBottom:  20,
                }}
              >
                {step.title}
              </h3>

              <div
                style={{
                  width:        36,
                  height:       1,
                  background:   'var(--gold)',
                  marginBottom: 20,
                  opacity:      0.7,
                }}
              />

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize:   13,
                  color:      index % 2 === 1
                    ? 'rgba(255,255,255,0.55)'
                    : 'var(--grey-text)',
                  lineHeight: 1.9,
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop:      40,
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            gap:            16,
          }}
        >
          {PROCESS_STEPS.slice(3).map((_, i) => (
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
                  width:        6,
                  height:       6,
                  borderRadius: '50%',
                  background:   'var(--gold)',
                  opacity:      0.4,
                }}
              />
            </div>
          ))}
          <p
            style={{
              fontFamily:    'var(--font-body)',
              fontSize:      11,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              color:         'var(--grey-text)',
            }}
          >
            +{PROCESS_STEPS.length - 3} more stages
          </p>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .pp-grid {
            grid-template-columns: 1fr !important;
            gap: 2px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ProcessPreview;