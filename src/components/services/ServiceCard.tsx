'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Service } from '@/types/service';
import OptimizedImage from '@/components/common/OptimizedImage';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group block overflow-hidden transition-all duration-500"
      style={{
        background: '#111',
        border: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div className="aspect-16/10 overflow-hidden relative">
        <OptimizedImage
          src={service.image}
          alt={service.title}
          fill
          className="transition-transform duration-700 group-hover:scale-110"
        />

        <div 
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
          }}
        />
        
        <div 
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0"
        >
          <span
            style={{
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#c9a96e',
              color: '#0a0a0a',
            }}
          >
            <ArrowRight size={18} />
          </span>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <div className="flex items-center space-x-3">
          <div 
            className="w-12 h-12 flex items-center justify-center"
            style={{ background: 'rgba(201,169,110,0.1)' }}
          >
            <img
              src={service.icon}
              alt={service.title}
              className="w-6 h-6"
              style={{ filter: 'brightness(0) saturate(100%) invert(77%) sepia(11%) saturate(1018%) hue-rotate(358deg) brightness(90%) contrast(87%)' }}
            />
          </div>
          <h3 
            className="text-lg font-light transition-colors duration-300 group-hover:text-[#c9a96e]"
            style={{ fontFamily: 'var(--font-display)', color: '#fff' }}
          >
            {service.title}
          </h3>
        </div>
        
        <p 
          className="line-clamp-2"
          style={{ 
            fontFamily: 'var(--font-body)', 
            fontSize: 13,
            color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.7,
          }}
        >
          {service.description}
        </p>
        
        <div 
          className="flex items-center text-sm transition-all duration-300 group-hover:gap-3"
          style={{ 
            fontFamily: 'var(--font-body)',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            color: '#c9a96e',
            gap: '8px',
          }}
        >
          <span>Explore Service</span>
          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
