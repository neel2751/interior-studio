'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FURNITURE_CATEGORIES } from '@/lib/constants';
import HydrationSuppressor from '@/components/common/HydrationSuppressor';

const FurnitureSlider = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 2;

  const prev = () => setStartIndex((i) => Math.max(0, i - 1));
  const next = () => setStartIndex((i) => Math.min(FURNITURE_CATEGORIES.length - visibleCount, i + 1));

  const visible = FURNITURE_CATEGORIES.slice(startIndex, startIndex + visibleCount);

  const isPrevDisabled = startIndex === 0;
  const isNextDisabled = startIndex >= FURNITURE_CATEGORIES.length - visibleCount;

  return (
    <section
      style={{
        padding: 'var(--section-pad-y) var(--section-pad-x)',
        background: 'var(--white)',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: 40,
            gap: 24,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 3.5vw, 42px)',
                fontWeight: 400,
                color: 'var(--black)',
                marginBottom: 10,
              }}
            >
              Furniture
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                color: 'var(--grey-text)',
                maxWidth: 380,
                lineHeight: 1.8,
              }}
            >
              We provide door-to-door service anywhere in India for furniture,
              carpets, curtains, flooring, and many more.
            </p>
          </div>

          <HydrationSuppressor>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={prev}
                disabled={isPrevDisabled}
                aria-label="Previous"
                style={{
                  width: 40,
                  height: 40,
                  border: `1px solid ${isPrevDisabled ? 'var(--grey-mid)' : 'var(--gold)'}`,
                  background: 'transparent',
                  color: isPrevDisabled ? 'var(--grey-mid)' : 'var(--gold)',
                  cursor: isPrevDisabled ? 'not-allowed' : 'pointer',
                  fontSize: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all var(--transition)',
                  opacity: isPrevDisabled ? 0.35 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!isPrevDisabled) {
                    (e.currentTarget as HTMLButtonElement).style.background = 'var(--gold)';
                    (e.currentTarget as HTMLButtonElement).style.color = '#fff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isPrevDisabled) {
                    (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                    (e.currentTarget as HTMLButtonElement).style.color = 'var(--gold)';
                  }
                }}
              >
                ←
              </button>
              <button
                onClick={next}
                disabled={isNextDisabled}
                aria-label="Next"
                style={{
                  width: 40,
                  height: 40,
                  border: `1px solid ${isNextDisabled ? 'var(--grey-mid)' : 'var(--gold)'}`,
                  background: 'transparent',
                  color: isNextDisabled ? 'var(--grey-mid)' : 'var(--gold)',
                  cursor: isNextDisabled ? 'not-allowed' : 'pointer',
                  fontSize: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all var(--transition)',
                  opacity: isNextDisabled ? 0.35 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!isNextDisabled) {
                    (e.currentTarget as HTMLButtonElement).style.background = 'var(--gold)';
                    (e.currentTarget as HTMLButtonElement).style.color = '#fff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isNextDisabled) {
                    (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                    (e.currentTarget as HTMLButtonElement).style.color = 'var(--gold)';
                  }
                }}
              >
                →
              </button>
            </div>
          </HydrationSuppressor>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 20,
          }}
          className="furniture-grid-responsive"
        >
          {visible.map((item, i) => (
            <Link
              key={`${startIndex}-${i}`}
              href={item.href}
              className="group"
              style={{
                position: 'relative',
                display: 'block',
                overflow: 'hidden',
                borderRadius: 4,
                aspectRatio: '4 / 3',
                textDecoration: 'none',
              }}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.08) 50%, transparent 100%)',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '16px 18px 13px',
                  borderBottom: '2px solid rgba(201,169,110,0.75)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'rgba(0,0,0,0.30)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: 2,
                    color: '#fff',
                    textTransform: 'uppercase',
                  }}
                >
                  {item.title}
                </span>
                <span
                  style={{
                    color: 'var(--gold)',
                    fontSize: 16,
                    flexShrink: 0,
                  }}
                >
                  ↗
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 640px) {
          .furniture-grid-responsive {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default FurnitureSlider;
