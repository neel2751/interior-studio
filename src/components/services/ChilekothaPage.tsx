'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle, ChevronLeft, ChevronRight, Home, Palette, BookOpen, Landmark, Sparkles, Heart, Wind, Flower2 } from 'lucide-react';
import { ResidentialService } from '@/data/residentialServices';
import Button from '@/components/common/Button';
import SectionHeading from '@/components/common/SectionHeading';
import OptimizedImage from '@/components/common/OptimizedImage';
import Badge from '@/components/common/Badge';

interface ChilekothaPageProps {
  service: ResidentialService;
}

const CHILEKOTHA_ELEMENTS = [
  { name: 'Traditional Motifs', description: 'Authentic Bengali patterns and art', icon: Palette },
  { name: 'Terracotta', description: 'Handcrafted clay elements', icon: Landmark },
  { name: 'Woodwork', description: 'Intricate carved details', icon: BookOpen },
  { name: 'Natural Ventilation', description: 'Cross-breeze architecture', icon: Wind },
];

const ChilekothaPage = ({ service }: ChilekothaPageProps) => {
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
          <div className="absolute inset-0 bg-linear-to-t from-red-950/90 via-amber-950/50 to-orange-900/20" />

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
                      idx === currentImageIndex ? 'bg-orange-400 w-6' : 'bg-white/50'
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
                <Landmark className="w-5 h-5 text-orange-400" />
                <p className="text-sm font-medium tracking-widest uppercase text-orange-400">
                  Bengali Heritage
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
                <BookOpen className="w-6 h-6 text-red-800" />
                <h2 className="text-3xl font-bold text-gray-900">
                  Preserving Cultural Heritage
                </h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                The chilekotha is more than a room — it is a sanctuary of Bengali culture and tradition. We specialize in designing authentic chilekotha spaces that honor ancestral roots while providing modern comfort. From traditional alpana motifs to handcrafted terracotta, every element is thoughtfully chosen to reflect the rich artistic heritage of Bengal. Our designs celebrate the cultural significance of the chilekotha as a space for contemplation, creativity, and connection to heritage.
              </p>
            </div>


            <div className="flex flex-wrap gap-6">
              {service.priceRange && (
                <div className="bg-orange-50 px-6 py-4 rounded-lg border border-orange-100">
                  <p className="text-sm text-gray-600 mb-1">Starting From</p>
                  <p className="text-xl font-bold text-orange-700">{service.priceRange}</p>
                </div>
              )}
              {service.duration && (
                <div className="bg-red-50 px-6 py-4 rounded-lg border border-red-100">
                  <p className="text-sm text-gray-600 mb-1">Crafting Timeline</p>
                  <p className="text-xl font-bold text-red-700">{service.duration}</p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button href="/contact" size="lg" showArrow>
                Design Your Chilekotha
              </Button>
              <Button href="/projects" variant="ghost" size="lg">
                View Projects
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-orange-50/70 p-6 rounded-lg text-center border border-orange-100">
              <Palette className="w-8 h-8 text-orange-700 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Authentic Motifs</h3>
              <p className="text-sm text-gray-600">Traditional alpana and art</p>
            </div>

            <div className="bg-red-50 p-6 rounded-lg text-center border border-red-100">
              <Landmark className="w-8 h-8 text-red-700 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Heritage Materials</h3>
              <p className="text-sm text-gray-600">Terracotta, wood, and brass</p>
            </div>

            <div className="bg-orange-50/50 p-6 rounded-lg text-center border border-orange-100">
              <Heart className="w-8 h-8 text-orange-800 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Cultural Integrity</h3>
              <p className="text-sm text-gray-600">Respecting traditions</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 bg-orange-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Elements of Authentic Chilekotha"
            subtitle="Design features that honor Bengali heritage"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {CHILEKOTHA_ELEMENTS.map((element) => {
              const IconComponent = element.icon;
              return (
                <div key={element.name} className="bg-white p-8 rounded-2xl shadow-sm text-center hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <IconComponent className="w-8 h-8 text-red-700" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">{element.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{element.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 bg-linear-to-b from-red-50 to-white">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="The Significance of Chilekotha"
            subtitle="Understanding the cultural importance"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-red-100">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-5">
                <BookOpen className="w-6 h-6 text-red-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">Literary Heritage</h3>
              <p className="text-gray-600">The chilekotha has been immortalized in Bengali literature as a space for artistic and intellectual pursuits.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-orange-100">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-5">
                <Flower2 className="w-6 h-6 text-orange-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">Artistic Expression</h3>
              <p className="text-gray-600">Traditional alpana art and handcrafted elements celebrate the artistic soul of Bengal.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-red-100">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-5">
                <Home className="w-6 h-6 text-red-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">Modern Adaptation</h3>
              <p className="text-gray-600">We preserve the spirit of the chilekotha while adapting it for contemporary lifestyles.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 px-4 md:px-8 bg-orange-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Our Heritage Design Process"
            subtitle="Creating authentic cultural spaces"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {service.process.map((step, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-orange-100">
                <div className="w-12 h-12 bg-red-100 text-red-700 rounded-xl flex items-center justify-center font-bold text-lg mb-4">
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
          title="Features of Our Chilekotha Designs"
          subtitle="Authenticity in every detail"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
          {service.features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4 p-5 bg-orange-50 rounded-xl border border-orange-100">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-gray-700 font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 bg-red-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Heritage Projects"
            subtitle="Chilekotha spaces we have created"
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
        <div className="max-w-4xl mx-auto bg-linear-to-br from-red-900 to-orange-900 text-white rounded-3xl p-10 md:p-16 text-center">
          <Landmark className="w-14 h-14 text-orange-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Honor Your Heritage
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-10 text-lg">
            Let us create a chilekotha that connects you to your roots while providing a beautiful, functional space for modern living.
          </p>
          <Button href="/contact" size="lg" showArrow className="bg-white text-red-900 hover:bg-gray-100">
            Start Your Heritage Project
          </Button>
        </div>
      </section>
    </main>
  );
};

export default ChilekothaPage;
