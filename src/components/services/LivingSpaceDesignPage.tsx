'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle, ChevronLeft, ChevronRight, Maximize2, Sofa, UtensilsCrossed, Tv, Sparkles, Home, ArrowRightLeft } from 'lucide-react';
import { ResidentialService } from '@/data/residentialServices';
import Button from '@/components/common/Button';
import SectionHeading from '@/components/common/SectionHeading';
import OptimizedImage from '@/components/common/OptimizedImage';
import Badge from '@/components/common/Badge';

interface LivingSpaceDesignPageProps {
  service: ResidentialService;
}

const LIVING_ZONES = [
  { name: 'Living Area', description: 'Relaxation and entertainment', icon: Sofa },
  { name: 'Dining Space', description: 'Meals and gatherings', icon: UtensilsCrossed },
  { name: 'Entertainment', description: 'Media and leisure', icon: Tv },
  { name: 'Flow', description: 'Seamless transitions', icon: ArrowRightLeft },
];

const LivingSpaceDesignPage = ({ service }: LivingSpaceDesignPageProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const gallery = service.gallery || [service.image];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  return (
    <main className="pt-20">
      <section className="relative">
        <div className="relative h-125 md:h-150 overflow-hidden">
          {gallery.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-500 ${
                idx === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <OptimizedImage
                src={img}
                alt={`${service.title} - Image ${idx + 1}`}
                fill
                className="object-cover"
                priority={idx === 0}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-linear-to-t from-teal-950/90 via-cyan-950/50 to-emerald-900/20" />

          {gallery.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
              <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2">
                {gallery.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentImageIndex ? 'bg-teal-400 w-6' : 'bg-white/50'
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center space-x-2 mb-3">
                <Maximize2 className="w-5 h-5 text-teal-400" />
                <p className="text-sm font-medium tracking-widest uppercase text-teal-400">
                  Open Concept
                </p>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Living Space Design
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl">
                {service.description}
              </p>
            </div>
          </div>
        </div>
      </section>

        <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Home className="w-6 h-6 text-teal-700" />
                <h2 className="text-3xl font-bold text-gray-900">
                  Flowing, Connected Living
                </h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Open-concept living spaces are the heart of modern homes. We design flowing, connected areas that seamlessly blend living, dining, and entertainment zones while maintaining distinct personalities for each space. Our designs create visual continuity and practical functionality, perfect for both daily family life and entertaining guests.
              </p>
            </div>

            <div className="flex flex-wrap gap-6">
              {service.priceRange && (
                <div className="bg-teal-50 px-6 py-4 rounded-lg border border-teal-100">
                  <p className="text-sm text-gray-600 mb-1">Starting From</p>
                  <p className="text-xl font-bold text-teal-700">{service.priceRange}</p>
                </div>
              )}
              {service.duration && (
                <div className="bg-cyan-50 px-6 py-4 rounded-lg border border-cyan-100">
                  <p className="text-sm text-gray-600 mb-1">Timeline</p>
                  <p className="text-xl font-bold text-cyan-700">{service.duration}</p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button href="/contact" size="lg" showArrow>
                Design Your Living Space
              </Button>
              <Button href="/projects" variant="ghost" size="lg">
                View Projects
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-teal-50/70 p-6 rounded-lg text-center border border-teal-100">
              <Maximize2 className="w-8 h-8 text-teal-700 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Open Flow</h3>
              <p className="text-sm text-gray-600">Seamless transitions</p>
            </div>
            <div className="bg-cyan-50 p-6 rounded-lg text-center border border-cyan-100">
              <Sofa className="w-8 h-8 text-cyan-700 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Defined Zones</h3>
              <p className="text-sm text-gray-600">Clear purpose areas</p>
            </div>
            <div className="bg-teal-50/50 p-6 rounded-lg text-center border border-teal-100">
              <Sparkles className="w-8 h-8 text-teal-800 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Cohesive Style</h3>
              <p className="text-sm text-gray-600">Unified aesthetics</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 bg-teal-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Living Space Zones"
            subtitle="Defining areas within open spaces"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {LIVING_ZONES.map((zone) => {
              const IconComponent = zone.icon;
              return (
                <div key={zone.name} className="bg-white p-6 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-7 h-7 text-teal-700" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{zone.name}</h3>
                  <p className="text-sm text-gray-600">{zone.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Our Design Process"
            subtitle="Creating flowing, functional spaces"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {service.process.map((step, index) => (
              <div key={index} className="bg-teal-50 p-6 rounded-xl border border-teal-100">
                <div className="w-10 h-10 bg-teal-100 text-teal-700 rounded-lg flex items-center justify-center font-bold mb-4">
                  {index + 1}
                </div>
                <p className="text-gray-700 font-medium">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <SectionHeading
          title="Open Space Benefits"
          subtitle="Why flowing designs work"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
          {service.features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4 p-5 bg-teal-50 rounded-xl border border-teal-100">
              <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-5 h-5 text-cyan-600" />
              </div>
              <span className="text-gray-700 font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 bg-cyan-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Featured Living Space Projects"
            subtitle="Open concepts we have created"
          />
          <div className="flex flex-wrap gap-3 mt-12 justify-center">
            {service.projectExamples.map((project, index) => (
              <Badge key={index} variant="default" size="lg">
                {project}
              </Badge>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button href="/projects" variant="secondary" size="lg" showArrow>
              View All Projects
            </Button>
          </div>
        </div>
      </section>

        <section className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto bg-linear-to-br from-teal-900 to-cyan-900 text-white rounded-3xl p-10 md:p-16 text-center">
          <Maximize2 className="w-14 h-14 text-teal-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Create Your Open Living Space
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-10 text-lg">
            Let us design a flowing, connected living environment that brings your family together in style and comfort.
          </p>
          <Button href="/contact" size="lg" showArrow className="bg-white text-teal-900 hover:bg-gray-100">
            Start Your Living Space Project
          </Button>
        </div>
      </section>
    </main>
  );
};

export default LivingSpaceDesignPage;
