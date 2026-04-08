'use client';
import Image from 'next/image';
import Link from 'next/link';
import FadeInSection from '@/components/common/FadeInSection';
import HydrationSuppressor from '@/components/common/HydrationSuppressor';

const posts = [
  {
    title: 'Modern Villa Ahmedabad — A Masterpiece of Minimalist Luxury',
    date: '25.03.26',
    excerpt: 'Custom Interior Design, Precision Construction, and Bespoke Living Spaces Crafted to Perfection.',
    href: '/blog/modern-villa-ahmedabad',
    image: '/images/projects/modern-villa-ahmedabad/cover.png',
  },
  {
    title: 'The Highest Standard in Turnkey Interior Design by Interior Studio',
    date: '25.03.26',
    excerpt: 'Complete Villa Design, Renovation, and Fit-Out Delivered with Precision and Elegance.',
    href: '/blog/turnkey-interior-design',
    image: '/images/projects/sky-penthouse-mumbai/cover.png',
  },
  {
    title: 'Mastering Luxury Commercial Interiors with Iconic Design',
    date: '25.03.26',
    excerpt: 'Delivering Complete Outdoor Elegance Through Expert Execution and Bespoke Design.',
    href: '/blog/luxury-commercial-interiors',
    image: '/images/projects/heritage-bungalow-pune/cover.png',
  },
  {
    title: 'Interior Studio: Redefining Excellence as the Top Design Firm',
    date: '25.03.26',
    excerpt: 'Delivering Bespoke Luxury, Precision Engineering, and Full-Service Turnkey Solutions.',
    href: '/blog/top-design-firm',
    image: '/images/projects/boutique-hotel-goa/cover.png',
  },
];

const videos = [
  {
    title: 'Modern Villa Ahmedabad — Before & After | Ultra-Luxury Living',
    thumbnail: '/images/projects/modern-villa-ahmedabad/cover.png',
    href: '#',
  },
  {
    title: 'World Class Penthouse Interiors | Full Renovation & Fit-Out',
    thumbnail: '/images/projects/sky-penthouse-mumbai/cover.png',
    href: '#',
  },
  {
    title: 'Full Luxury Villa Renovation & Project Showcase — Pune',
    thumbnail: '/images/projects/heritage-bungalow-pune/cover.png',
    href: '#',
  },
  {
    title: 'Boutique Hotel Goa — Interior Design Reveal',
    thumbnail: '/images/projects/boutique-hotel-goa/cover.png',
    href: '#',
  },
];

const ArrowBtn = ({ children }: { children: string }) => (
  <button
    suppressHydrationWarning={true}
    style={{
      width: 36,
      height: 36,
      border: '1px solid var(--grey-mid)',
      background: 'transparent',
      color: 'var(--grey-text)',
      cursor: 'pointer',
      fontSize: 14,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all var(--transition)',
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--gold)';
      (e.currentTarget as HTMLButtonElement).style.color = 'var(--gold)';
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--grey-mid)';
      (e.currentTarget as HTMLButtonElement).style.color = 'var(--grey-text)';
    }}
  >
    {children}
  </button>
);

const LatestPosts = () => {
  return (
    <section
      id="media"
      style={{
        padding: 'var(--section-pad-y) var(--section-pad-x)',
        background: 'var(--white)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 72,
        }}
      >

        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 36,
              gap: 16,
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(24px, 3vw, 38px)',
                fontWeight: 500,
                color: 'var(--black)',
              }}
            >
              Latest Posts
            </h2>
            <div style={{ display: 'flex', gap: 8 }}>
              <ArrowBtn>←</ArrowBtn>
              <ArrowBtn>→</ArrowBtn>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 24,
            }}
            className="posts-grid-responsive"
          >
            {posts.map((post, i) => (
              <FadeInSection key={i} direction="up" delay={i * 0.08} duration={0.6}>
                <Link
                  href={post.href}
                  className="group"
                  style={{ display: 'block', textDecoration: 'none' }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '4/3',
                      overflow: 'hidden',
                      borderRadius: 4,
                      marginBottom: 14,
                    }}
                  >
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 11,
                      color: 'var(--grey-text)',
                      marginBottom: 8,
                    }}
                  >
                    {post.date}
                  </p>

                  <h3
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 13,
                      fontWeight: 500,
                      color: 'var(--black)',
                      lineHeight: 1.55,
                      marginBottom: 8,
                      transition: 'color var(--transition)',
                    }}
                    className="group-hover:text-gold-hover"
                  >
                    {post.title}
                  </h3>

                  <p
                    className="line-clamp-2"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 12,
                      color: 'var(--grey-text)',
                      lineHeight: 1.7,
                      marginBottom: 12,
                    }}
                  >
                    {post.excerpt}
                  </p>

                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: 2,
                      textTransform: 'uppercase',
                      color: 'var(--gold)',
                      borderBottom: '1px solid var(--gold)',
                      paddingBottom: 2,
                    }}
                  >
                    Read More →
                  </span>
                </Link>
              </FadeInSection>
            ))}
          </div>
        </div>

        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 36,
              gap: 16,
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(24px, 3vw, 38px)',
                fontWeight: 500,
                color: 'var(--black)',
              }}
            >
              Latest Videos
            </h2>
            <div style={{ display: 'flex', gap: 8 }}>
              <ArrowBtn>←</ArrowBtn>
              <ArrowBtn>→</ArrowBtn>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 24,
            }}
            className="posts-grid-responsive"
          >
            {videos.map((video, i) => (
              <FadeInSection key={i} direction="up" delay={i * 0.08} duration={0.6}>
                <Link
                  href={video.href}
                  className="group"
                  style={{ display: 'block', textDecoration: 'none' }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '16/9',
                      overflow: 'hidden',
                      borderRadius: 4,
                      marginBottom: 12,
                    }}
                  >
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0,0,0,0.30)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background var(--transition)',
                      }}
                      className="group-hover:bg-overlay-dark"
                    >

                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          background: 'rgba(255,255,255,0.18)',
                          backdropFilter: 'blur(4px)',
                          border: '1.5px solid rgba(255,255,255,0.5)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'background var(--transition)',
                        }}
                      >
                        <div
                          style={{
                            width: 0,
                            height: 0,
                            borderTop: '8px solid transparent',
                            borderBottom: '8px solid transparent',
                            borderLeft: '14px solid #fff',
                            marginLeft: 3,
                          }}
                        />
                      </div>
                    </div>

                    <div
                      style={{
                        position: 'absolute',
                        top: 10,
                        left: 12,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: 2,
                          color: 'rgba(255,255,255,0.8)',
                          textTransform: 'uppercase',
                        }}
                      >
                        INTERIOR STUDIO
                      </span>
                    </div>
                  </div>

                  <p
                    className="line-clamp-2"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 12,
                      color: 'var(--grey-dark)',
                      lineHeight: 1.6,
                      transition: 'color var(--transition)',
                    }}
                  >
                    {video.title}
                  </p>
                </Link>
              </FadeInSection>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .posts-grid-responsive {
          grid-template-columns: repeat(4, 1fr);
        }
        @media (max-width: 1024px) {
          .posts-grid-responsive {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 480px) {
          .posts-grid-responsive {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default LatestPosts;
