'use client';

import Link from 'next/link';
import Image from 'next/image';
import { SERVICES_GRID } from '@/lib/constants';

const ServicesGrid = () => {
  return (
    <section
      style={{
        paddingBottom: 'var(--section-pad-y)',
        background: 'var(--white)',
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '0 8px',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 6,
        }}
        className="services-grid-responsive"
      >
        {SERVICES_GRID.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="group"
            style={{
              position: 'relative',
              display: 'block',
              overflow: 'hidden',
              borderRadius: 8,
              aspectRatio: '1 / 1',
              textDecoration: 'none',
            }}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-106"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />

            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.10) 55%, transparent 100%)',
              }}
            />

            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '13px 14px 11px',
                borderBottom: '2px solid rgba(201,169,110,0.75)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: 1.5,
                  color: '#fff',
                  textTransform: 'uppercase',
                  lineHeight: 1.4,
                  paddingRight: 8,
                }}
              >
                {item.title}
              </span>

              <span
                className="shrink-0 transition-colors duration-300"
                style={{
                  width: 22,
                  height: 22,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(255,255,255,0.5)',
                  color: '#fff',
                  fontSize: 13,
                  borderRadius: 0,
                  flexShrink: 0,
                }}
              >
                ↗
              </span>
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        .services-grid-responsive {
          grid-template-columns: repeat(4, 1fr);
        }
        @media (max-width: 1024px) {
          .services-grid-responsive {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 640px) {
          .services-grid-responsive {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .group:hover .services-grid-responsive img {
          transform: scale(1.06);
        }
      `}</style>
    </section>
  );
};

export default ServicesGrid;