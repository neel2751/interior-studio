'use client';

import Link from 'next/link';
import Button from './Button';

interface LuxuryCTASectionProps {
  label?: string;
  heading?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

export default function LuxuryCTASection({
  label = 'Begin Your Project',
  heading = 'Ready to Transform Your Space?',
  description = "Let's discuss your project. Our team is ready to bring your vision to life.",
  primaryButtonText = 'Book a Consultation',
  primaryButtonHref = '/contact',
  secondaryButtonText = 'View Our Portfolio',
  secondaryButtonHref = '/projects',
}: LuxuryCTASectionProps) {
  return (
    <section 
      className="relative w-full py-24 px-6 md:px-12 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2010 50%, #1a1a1a 100%)' }}
    >
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ 
          width: '600px', 
          height: '600px', 
          border: '1px solid rgba(201,169,110,0.06)', 
          borderRadius: '50%' 
        }}
        aria-hidden="true"
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ 
          width: '400px', 
          height: '400px', 
          border: '1px solid rgba(201,169,110,0.08)', 
          borderRadius: '50%' 
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p 
          className="text-xs tracking-[0.3em] uppercase mb-4"
          style={{ color: 'var(--gold)', fontFamily: 'var(--font-body)' }}
        >
          {label}
        </p>
        <h2 
          className="text-3xl md:text-4xl font-light mb-6"
          style={{ fontFamily: 'var(--font-display)', color: '#fff' }}
        >
          {heading}
        </h2>
        <p 
          className="text-base mb-8"
          style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}
        >
          {description}
        </p>
        <div className="flex flex-wrap gap-4 justify-center items-center">
          <Button href={primaryButtonHref} size="lg" showArrow>
            {primaryButtonText}
          </Button>
          <Button href={secondaryButtonHref} variant="ghost" size="lg">
            {secondaryButtonText}
          </Button>
        </div>
      </div>
    </section>
  );
}
