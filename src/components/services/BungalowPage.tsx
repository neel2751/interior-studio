'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle, ChevronLeft, ChevronRight, Home, Trees, Sun, DoorOpen, Warehouse, Flower2, Heart } from 'lucide-react';
import { ResidentialService } from '@/data/residentialServices';
import Button from '@/components/common/Button';
import SectionHeading from '@/components/common/SectionHeading';
import OptimizedImage from '@/components/common/OptimizedImage';
import Badge from '@/components/common/Badge';

interface BungalowPageProps {
  service: ResidentialService;
}

const BUNGALOW_FEATURES = [
  { name: 'Indoor-Outdoor Flow', description: 'Seamless connection to garden spaces', icon: DoorOpen },
  { name: 'Natural Light', description: 'Large windows and skylights', icon: Sun },
  { name: 'Garden Integration', description: 'Landscaping that extends living space', icon: Trees },
  { name: 'Cozy Spaces', description: 'Intimate, human-scale interiors', icon: Heart },
];

const BungalowPage = ({ service }: BungalowPageProps) => {
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
          <div className="absolute inset-0 bg-linear-to-t from-stone-900/90 via-stone-800/50 to-amber-900/20" />
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
                      idx === currentImageIndex ? 'bg-amber-400 w-6' : 'bg-white/50'
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
                <Home className="w-5 h-5 text-amber-400" />
                <p className="text-sm font-medium tracking-widest uppercase text-amber-400">
                  Single-Story Living
                </p>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                {service.title}
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
                <Warehouse className="w-6 h-6 text-amber-700" />
                <h2 className="text-3xl font-bold text-gray-900">
                  The Art of Bungalow Living
                </h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Bungalows offer a unique charm that multi-story homes cannot replicate. We design bungalow interiors that maximize the benefits of single-story living — seamless indoor-outdoor flow, abundant natural light, and intimate spaces that feel connected to the earth. Our designs blend traditional bungalow character with modern conveniences, creating homes that are both timeless and contemporary.
              </p>
            </div>

            <div className="flex flex-wrap gap-6">
              {service.priceRange && (
                <div className="bg-amber-50 px-6 py-4 rounded-lg border border-amber-100">
                  <p className="text-sm text-gray-600 mb-1">Starting From</p>
                  <p className="text-xl font-bold text-amber-700">{service.priceRange}</p>
                </div>
              )}
              {service.duration && (
                <div className="bg-stone-50 px-6 py-4 rounded-lg border border-stone-200">
                  <p className="text-sm text-gray-600 mb-1">Project Timeline</p>
                  <p className="text-xl font-bold text-stone-700">{service.duration}</p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button href="/contact" size="lg" showArrow>
                Design Your Bungalow
              </Button>
              <Button href="/projects" variant="ghost" size="lg">
                View Projects
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-amber-50/70 p-6 rounded-lg text-center border border-amber-100">
              <Sun className="w-8 h-8 text-amber-700 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Natural Light</h3>
              <p className="text-sm text-gray-600">Maximize daylight with strategic windows</p>
            </div>

            <div className="bg-stone-50 p-6 rounded-lg text-center border border-stone-200">
              <Trees className="w-8 h-8 text-stone-700 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Garden Connection</h3>
              <p className="text-sm text-gray-600">Blur the lines between indoors and out</p>
            </div>

            <div className="bg-amber-50/50 p-6 rounded-lg text-center border border-amber-100">
              <DoorOpen className="w-8 h-8 text-amber-800 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Easy Accessibility</h3>
              <p className="text-sm text-gray-600">Single-level living for all ages</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Bungalow Living Advantages"
            subtitle="Why single-story homes are making a comeback"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {BUNGALOW_FEATURES.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <div key={feature.name} className="bg-white p-8 rounded-2xl shadow-sm text-center hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <IconComponent className="w-8 h-8 text-amber-700" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">{feature.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 bg-linear-to-b from-amber-50 to-white">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Our Bungalow Design Philosophy"
            subtitle="Blending heritage with modern living"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
              <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center mb-5">
                <Warehouse className="w-6 h-6 text-stone-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3 text-xl">Traditional Elements</h3>
              <p className="text-gray-600">We preserve bungalow character with features like wide verandas, exposed beams, built-in cabinetry, and Craftsman-style details that honor the architectural heritage.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-amber-100">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-5">
                <Flower2 className="w-6 h-6 text-amber-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3 text-xl">Modern Comforts</h3>
              <p className="text-gray-600">We seamlessly integrate contemporary amenities — open floor plans, modern kitchens, smart home technology, and energy-efficient systems.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Our Design Process"
            subtitle="Creating your perfect single-story home"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {service.process.map((step, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-stone-100">
                <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center font-bold text-lg mb-4">
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
          title="Why Choose a Bungalow"
          subtitle="The benefits of single-story living"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
          {service.features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4 p-5 bg-stone-50 rounded-xl border border-stone-100">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle className="w-5 h-5 text-amber-600" />
              </div>
              <span className="text-gray-700 font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 bg-amber-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Featured Bungalow Projects"
            subtitle="Single-story transformations we have completed"
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
        <div className="max-w-4xl mx-auto bg-linear-to-br from-stone-800 to-amber-900 text-white rounded-3xl p-10 md:p-16 text-center">
          <Home className="w-14 h-14 text-amber-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Embrace Bungalow Living?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-10 text-lg">
            Let us create a single-story sanctuary that connects you to the outdoors while providing all the modern comforts you desire.
          </p>
          <Button href="/contact" size="lg" showArrow className="bg-white text-stone-900 hover:bg-gray-100">
            Start Your Bungalow Project
          </Button>
        </div>
      </section>
    </main>
  );
};

export default BungalowPage;
