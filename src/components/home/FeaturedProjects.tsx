'use client';
import Link from 'next/link';
import Image from 'next/image';
import { PROJECTS } from '@/lib/constants';

const FeaturedProjects = () => {
  const featuredProjects = PROJECTS.filter((p) => p.featured).slice(0, 6);

  return (
    <section
      style={{
        padding: 'var(--section-pad-y) var(--section-pad-x)',
        background: 'var(--white)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          marginBottom: 48,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 24,
          flexWrap: 'wrap',
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
            Portfolio
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize:   'clamp(28px, 3.5vw, 48px)',
              fontWeight: 300,
              color:      'var(--black)',
              marginBottom: 12,
              letterSpacing: 1,
            }}
          >
            Our Projects
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize:   14,
              color:      'var(--grey-text)',
              maxWidth:   440,
              lineHeight: 1.8,
            }}
          >
            No project is too grand. Whether residential, commercial, or hospitality,
            our studio delivers unparalleled interior solutions.
          </p>
        </div>

        <Link
          href="/projects"
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
            transition:    'color var(--transition), border-color var(--transition)',
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
          View All Projects →
        </Link>
      </div>

      <div
        className="fp-grid"
        style={{ maxWidth: 1200, margin: '0 auto' }}
      >
        {featuredProjects.slice(0, 6).map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      <style>{`
        .fp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: 320px 320px;
          gap: 12px;
        }

        /* Row 1: item 0 spans 2 cols, item 1 spans 1 col */
        .fp-grid .fp-card:nth-child(1) { grid-column: span 2; }
        .fp-grid .fp-card:nth-child(2) { grid-column: span 1; }

        /* Row 2: item 2 spans 1 col, item 3 spans 2 cols */
        .fp-grid .fp-card:nth-child(3) { grid-column: span 1; }
        .fp-grid .fp-card:nth-child(4) { grid-column: span 2; }

        /* items 5 & 6 fall into a 3rd row equally */
        .fp-grid .fp-card:nth-child(5) { grid-column: span 1; }
        .fp-grid .fp-card:nth-child(6) { grid-column: span 2; }

        /* Hover zoom on inner image */
        .fp-card:hover .fp-img {
          transform: scale(1.06);
        }

        /* Hover — reveal title bar */
        .fp-card:hover .fp-overlay {
          opacity: 1 !important;
        }
        .fp-card:hover .fp-label {
          transform: translateY(0) !important;
          opacity: 1 !important;
        }

        @media (max-width: 900px) {
          .fp-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: auto;
          }
          .fp-grid .fp-card:nth-child(n) {
            grid-column: span 1 !important;
            min-height: 240px;
          }
        }

        @media (max-width: 540px) {
          .fp-grid {
            grid-template-columns: 1fr;
          }
          .fp-grid .fp-card:nth-child(n) {
            min-height: 220px;
          }
        }
      `}</style>
    </section>
  );
};

/* ── Individual card ── */
const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
}) => {
  const imageSrc =
    project.images?.[0] || `/images/projects/${project.id}/cover.jpg`;

  const fallbacks = [
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
    'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80',
    'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80',
  ];

  return (
    <Link
      href={`/projects/${project.id}`}
      className="fp-card"
      style={{
        position:       'relative',
        display:        'block',
        overflow:       'hidden',
        textDecoration: 'none',
        background:     '#1a1a1a',
      }}
    >
      {/* Image */}
      <div
        style={{
          position: 'absolute',
          inset:    0,
          overflow: 'hidden',
        }}
      >
        <img
          src={imageSrc}
          alt={project.title}
          className="fp-img"
          style={{
            width:      '100%',
            height:     '100%',
            objectFit:  'cover',
            transition: 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)',
          }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = fallbacks[index] || fallbacks[0];
          }}
        />
      </div>

      {/* Always-on bottom gradient */}
      <div
        style={{
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)',
          zIndex:     1,
        }}
      />

      {/* Hover overlay */}
      <div
        className="fp-overlay"
        style={{
          position:   'absolute',
          inset:      0,
          background: 'rgba(0,0,0,0.18)',
          zIndex:     2,
          opacity:    0,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Label */}
      <div
        className="fp-label"
        style={{
          position:   'absolute',
          bottom:     0,
          left:       0,
          right:      0,
          zIndex:     3,
          padding:    '16px 20px',
          display:    'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop:  '1px solid rgba(201,169,110,0.5)',
          transform:  'translateY(6px)',
          opacity:    0.85,
          transition: 'transform 0.4s ease, opacity 0.4s ease',
        }}
      >
        <div>
          <p
            style={{
              fontFamily:    'var(--font-body)',
              fontSize:      9,
              fontWeight:    600,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color:         'var(--gold)',
              marginBottom:  4,
            }}
          >
            {project.category || 'Residential'}
          </p>
          <p
            style={{
              fontFamily:    'var(--font-display)',
              fontSize:      14,
              fontWeight:    400,
              letterSpacing: 0.5,
              color:         '#ffffff',
              lineHeight:    1.3,
            }}
          >
            {project.title}
          </p>
        </div>
        <span
          style={{
            color:      'var(--gold)',
            fontSize:   18,
            flexShrink: 0,
            marginLeft: 12,
            transition: 'transform 0.3s ease',
          }}
        >
          ↗
        </span>
      </div>
    </Link>
  );
};

export default FeaturedProjects;