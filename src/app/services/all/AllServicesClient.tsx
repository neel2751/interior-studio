'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Home, Building2, Utensils, Briefcase, ChevronDown } from 'lucide-react';

interface SubService {
  slug: string;
  title: string;
  description: string;
  image?: string;
}

interface ServiceCategory {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  icon: string;
  subServices: SubService[];
}

interface AllServicesData {
  categories: ServiceCategory[];
}

const iconMap: Record<string, React.ReactNode> = {
  '/icons/home.svg': <Home size={24} />,
  '/icons/office.svg': <Building2 size={24} />,
  '/icons/building.svg': <Briefcase size={24} />,
  '/icons/utensils.svg': <Utensils size={24} />,
};

export default function AllServicesClient({ data }: { data: AllServicesData }) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <section
        className="relative py-24 px-6 md:px-12"
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2010 50%, #1a1a1a 100%)',
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-6"
            style={{ color: '#c9a96e' }}
          >
            Our Expertise
          </p>
          <h1
            className="text-4xl md:text-6xl font-light mb-6"
            style={{ fontFamily: 'var(--font-display)', color: '#fff' }}
          >
            All Services
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto mb-12"
            style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)' }}
          >
            Explore our comprehensive range of interior design services tailored for
            residential, commercial, hospitality, and office spaces.
          </p>
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <Link 
              href="/projects" 
              className="inline-flex items-center gap-2 px-8 py-4 text-xs font-semibold tracking-widest uppercase transition-all duration-300 border rounded-sm"
              style={{ 
                background: 'var(--gold)', 
                color: '#0a0a0a', 
                borderColor: 'var(--gold)',
                fontFamily: 'var(--font-body)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--gold)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--gold)';
                e.currentTarget.style.color = '#0a0a0a';
              }}
            >
              View Our Portfolio
            </Link>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 px-8 py-4 text-xs font-semibold tracking-widest uppercase transition-all duration-300 border rounded-sm"
              style={{ 
                background: 'transparent', 
                color: 'rgba(255,255,255,0.8)', 
                borderColor: 'rgba(255,255,255,0.25)',
                fontFamily: 'var(--font-body)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--gold)';
                e.currentTarget.style.color = 'var(--gold)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
              }}
            >
              Book a Consultation
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {data.categories.map((category) => (
              <div
                key={category.id}
                className="group relative overflow-hidden rounded-sm"
                style={{ background: '#111' }}
              >
                <div className="relative aspect-16/10 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <span style={{ color: '#c9a96e' }}>
                        {iconMap[category.icon] || <Building2 size={24} />}
                      </span>
                      <p
                        className="text-xs tracking-[0.2em] uppercase"
                        style={{ color: '#c9a96e' }}
                      >
                        Service Category
                      </p>
                    </div>
                    <h2
                      className="text-2xl md:text-3xl font-light mb-3"
                      style={{ fontFamily: 'var(--font-display)', color: '#fff' }}
                    >
                      {category.title}
                    </h2>
                    <p
                      className="text-sm mb-4"
                      style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)' }}
                    >
                      {category.description}
                    </p>
                    <Link
                      href={`/services/${category.slug}`}
                      className="inline-flex items-center gap-2 text-sm transition-colors hover:text-white"
                      style={{ color: '#c9a96e' }}
                    >
                      View All {category.subServices.length} Services
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>

                <div className="border-t border-white/5">
                  <button
                    onClick={() =>
                      setExpandedCategory(
                        expandedCategory === category.slug ? null : category.slug
                      )
                    }
                    className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors"
                  >
                    <span
                      className="text-sm tracking-wider uppercase"
                      style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)' }}
                    >
                      {category.subServices.length} Specialized Services
                    </span>
                    <ChevronDown
                      size={20}
                      style={{ color: '#c9a96e' }}
                      className={`transition-transform ${
                        expandedCategory === category.slug ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {expandedCategory === category.slug && (
                    <div className="px-6 pb-6 space-y-4">
                      {category.subServices.map((subService) => (
                        <Link
                          key={subService.slug}
                          href={`/services/${category.slug}/${subService.slug}`}
                          className="flex gap-4 p-4 rounded-sm hover:bg-white/5 transition-all group/item"
                        >
                          {subService.image && (
                            <img
                              src={subService.image}
                              alt={subService.title}
                              className="w-20 h-20 object-cover rounded-sm"
                            />
                          )}
                          <div className="flex-1">
                            <h3
                              className="text-base font-medium mb-1 group-hover/item:text-[#c9a96e] transition-colors"
                              style={{ color: '#fff', fontFamily: 'var(--font-display)' }}
                            >
                              {subService.title}
                            </h3>
                            <p
                              className="text-sm line-clamp-2"
                              style={{
                                color: 'rgba(255,255,255,0.5)',
                                fontFamily: 'var(--font-body)',
                              }}
                            >
                              {subService.description}
                            </p>
                          </div>
                          <ArrowRight
                            size={16}
                            className="self-center opacity-0 group-hover/item:opacity-100 transition-all -translate-x-2 group-hover/item:translate-x-0"
                            style={{ color: '#c9a96e' }}
                          />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

  <section
        className="py-20 px-6 md:px-12"
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2010 50%, #1a1a1a 100%)',
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: '#c9a96e' }}
          >
            Ready to Start
          </p>
          <h2
            className="text-3xl md:text-4xl font-light mb-6"
            style={{ fontFamily: 'var(--font-display)', color: '#fff' }}
          >
            Not Sure Which Service You Need?
          </h2>
          <p
            className="text-base mb-8"
            style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)' }}
          >
            Our team is here to help you determine the best approach for your project.
            Schedule a free consultation to discuss your requirements.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/projects" 
              className="inline-flex items-center gap-2 px-8 py-4 text-xs font-semibold tracking-widest uppercase transition-all duration-300 border rounded-sm"
              style={{ 
                background: 'var(--gold)', 
                color: '#0a0a0a', 
                borderColor: 'var(--gold)',
                fontFamily: 'var(--font-body)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--gold)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--gold)';
                e.currentTarget.style.color = '#0a0a0a';
              }}
            >
              View Our Portfolio
            </Link>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 px-8 py-4 text-xs font-semibold tracking-widest uppercase transition-all duration-300 border rounded-sm"
              style={{ 
                background: 'transparent', 
                color: 'rgba(255,255,255,0.8)', 
                borderColor: 'rgba(255,255,255,0.25)',
                fontFamily: 'var(--font-body)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--gold)';
                e.currentTarget.style.color = 'var(--gold)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
              }}
            >
              Book a Consultation
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '10+', label: 'Years Experience' },
            { value: '200+', label: 'Projects Done' },
            { value: '50+', label: 'Services Offered' },
            { value: '100%', label: 'Client Satisfaction' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="text-3xl md:text-4xl font-light mb-2"
                style={{ fontFamily: 'var(--font-display)', color: '#c9a96e' }}
              >
                {stat.value}
              </p>
              <p
                className="text-xs tracking-wider uppercase"
                style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
