import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: 'white' | 'gray' | 'dark';
}

const Section = ({ children, className = '', id, background = 'white' }: SectionProps) => {
  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    dark: 'bg-gray-900 text-white'
  };

  return (
    <section id={id} className={`${backgroundClasses[background]} section-padding ${className}`}>
      <div className="container-custom">
        {children}
      </div>
    </section>
  );
};

export default Section;
