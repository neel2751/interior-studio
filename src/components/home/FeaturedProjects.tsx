'use client';
import Link from 'next/link';
import Image from 'next/image';
import { PROJECTS } from '@/lib/constants';
import FadeInSection from '@/components/common/FadeInSection';

const FeaturedProjects = () => {
  const featuredProjects = PROJECTS.filter((p) => p.featured).slice(0, 9);

  return (
    <section
      style={{
        padding: 'var(--section-pad-y) var(--section-pad-x)',
        background: 'var(--white)',
      }}
    >
      <FadeInSection direction="up" delay={0}>
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            marginBottom: 40,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 24,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize:   'clamp(28px, 3.5vw, 42px)',
                fontWeight: 300,
                color:      'var(--black)',
                marginBottom: 8,
                letterSpacing: 0.5,
              }}
            >
              Our projects
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize:   13,
                color:      'var(--grey-text)',
                maxWidth:   420,
                lineHeight: 1.6,
              }}
            >
              No project is too grand. Whether residential, commercial, or hospitality, our design company delivers unparalleled interior solutions.
            </p>
          </div>

          <Link
            href="/projects"
            className="group"
            style={{
              fontFamily:    'var(--font-body)',
              fontSize:      10,
              fontWeight:    500,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              color:         'var(--gold)',
              borderBottom:  '1px solid var(--gold)',
              paddingBottom: 2,
              whiteSpace:    'nowrap',
              transition:    'color var(--transition), border-color var(--transition)',
              marginTop: 8,
            }}
          >
            <span className="transition-transform duration-300 inline-block group-hover:translate-x-1">
              View All Projects →
            </span>
          </Link>
        </div>
      </FadeInSection>

      <div
        className="fp-grid"
        style={{ maxWidth: 1200, margin: '0 auto' }}
      >
        {featuredProjects.map((project, i) => (
          <FadeInSection key={project.id} direction="up" delay={i * 0.05} duration={0.5}>
            <ProjectCard project={project} index={i} />
          </FadeInSection>
        ))}
      </div>

      <style>{`
        .fp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .fp-card {
          aspect-ratio: 4/5;
          border-radius: 12px;
        }

        /* Hover zoom on inner image */
        .fp-card:hover .fp-img {
          transform: scale(1.05);
        }

        @media (max-width: 900px) {
          .fp-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }

        @media (max-width: 540px) {
          .fp-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }
      `}</style>
    </section>
  );
};

const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
}) => {
  const imageSrc = project.images?.[0] || '';

  const fallbacks = [
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
    'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80',
    'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&q=80',
    'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80',
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
            transition: 'transform 0.5s ease',
          }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = fallbacks[index] || fallbacks[0];
          }}
        />
      </div>

      <div
        style={{
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 40%, transparent 60%)',
          zIndex:     1,
        }}
      />

      <div
        style={{
          position:   'absolute',
          bottom:     0,
          left:       0,
          right:      0,
          zIndex:     2,
          padding:    '20px',
          display:    'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}
      >
        <p
          style={{
            fontFamily:    'var(--font-display)',
            fontSize:      14,
            fontWeight:    400,
            letterSpacing: 0.3,
            color:         '#ffffff',
            lineHeight:    1.4,
            textTransform: 'uppercase',
          }}
        >
          {project.title}
        </p>
        <span
          style={{
            color:      '#ffffff',
            fontSize:   16,
            flexShrink: 0,
            marginLeft: 8,
          }}
        >
          ↗
        </span>
      </div>
    </Link>
  );
};

export default FeaturedProjects;
