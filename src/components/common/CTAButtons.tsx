'use client';

import Button from '@/components/common/Button';
import Link from 'next/link';

const CTAButtons = () => {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Button 
        href="/contact" 
        variant="default" 
        size="lg" 
        showArrow
      >
        Book a Consultation
      </Button>

      <Button href="/projects" variant="ghost" size="lg">
        View Projects
      </Button>
    </div>
  );
};

export default CTAButtons;
