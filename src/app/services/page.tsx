'use client';
import Link from 'next/link';
import { SERVICES } from '@/lib/constants';
import ServiceCard from '@/components/services/ServiceCard';
import FadeInSection from '@/components/common/FadeInSection';
import Button from '@/components/common/Button';
import Image from 'next/image';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <section
        className="relative py-24 px-6 md:px-12"
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2010 50%, #1a1a1a 100%)',
        }}
      >
        <div className="max-w-6xl mx-auto">
          <FadeInSection direction="up" delay={0}>
            <div className="relative w-full h-100 md:h-125 rounded-sm overflow-hidden">
              <Image
                src="/images/hero/hero-slide-1.png.png"
                alt="Our Services"
                fill
                className="object-cover"
                priority
              />
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.3) 50%, transparent 100%)',
                }}
              />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES.map((service, index) => (
              <FadeInSection key={service.id} direction="up" delay={index * 0.1} duration={0.7}>
                <ServiceCard service={service} />
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 px-6 md:px-12"
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2010 50%, #1a1a1a 100%)',
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <FadeInSection direction="up" delay={0}>
            <p
              className="text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: '#c9a96e', fontFamily: 'var(--font-body)' }}
            >
              Ready to Start
            </p>
          </FadeInSection>
          
          <FadeInSection direction="up" delay={0.1}>
            <h2
              className="text-3xl md:text-4xl font-light mb-6"
              style={{ fontFamily: 'var(--font-display)', color: '#fff' }}
            >
              Not Sure Which Service You Need?
            </h2>
          </FadeInSection>
          
          <FadeInSection direction="up" delay={0.2}>
            <p
              className="text-base mb-8"
              style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)' }}
            >
              Our team is here to help you determine the best approach for your project.
              Schedule a free consultation to discuss your requirements.
            </p>
          </FadeInSection>
          
          <FadeInSection direction="up" delay={0.3}>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button href="/contact" size="lg" showArrow>
                Free Consultation
              </Button>
              <Button href="tel:+919876543210" variant="secondary" size="lg" showArrow>
                Call Us
              </Button>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}
