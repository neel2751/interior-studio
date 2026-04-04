'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle, ChevronLeft, ChevronRight, Palette, Paintbrush, Wallpaper, Lightbulb, Sparkles, Layers, Grid3X3, Home } from 'lucide-react';
import { ResidentialService } from '@/data/residentialServices';
import Button from '@/components/common/Button';
import SectionHeading from '@/components/common/SectionHeading';
import OptimizedImage from '@/components/common/OptimizedImage';
import Badge from '@/components/common/Badge';

interface BedroomWallPageProps {
  service: ResidentialService;
}

const WALL_TREATMENTS = [
  { name: 'Textured Finishes', description: '3D panels and plaster effects', icon: Layers },
  { name: 'Accent Colors', description: 'Bold statement hues', icon: Palette },
  { name: 'Wallpaper', description: 'Patterns and textures', icon: Wallpaper },
  { name: 'Lighting Effects', description: 'Ambient and accent lighting', icon: Lightbulb },
];

const BedroomWallPage = ({ service }: BedroomWallPageProps) => {
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
          <div className="absolute inset-0 bg-linear-to-t from-pink-950/90 via-rose-950/50 to-fuchsia-900/20" />

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
                      idx === currentImageIndex ? 'bg-rose-400 w-6' : 'bg-white/50'
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
                <Paintbrush className="w-5 h-5 text-rose-400" />
                <p className="text-sm font-medium tracking-widest uppercase text-rose-400">
                  Feature Walls
                </p>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Bedroom Wall Design
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
                <Palette className="w-6 h-6 text-rose-700" />
                <h2 className="text-3xl font-bold text-gray-900">
                  Create a Stunning Focal Point
                </h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                A bedroom wall is your canvas for personal expression. We design statement walls that transform the entire room using texture, color, pattern, and art. From subtle textures to bold murals, your feature wall sets the mood and becomes the centerpiece of your sanctuary.
              </p>
            </div>

            <div className="flex flex-wrap gap-6">
              {service.priceRange && (
                <div className="bg-rose-50 px-6 py-4 rounded-lg border border-rose-100">
                  <p className="text-sm text-gray-600 mb-1">Starting From</p>
                  <p className="text-xl font-bold text-rose-700">{service.priceRange}</p>
                </div>
              )}
              {service.duration && (
                <div className="bg-pink-50 px-6 py-4 rounded-lg border border-pink-100">
                  <p className="text-sm text-gray-600 mb-1">Timeline</p>
                  <p className="text-xl font-bold text-pink-700">{service.duration}</p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button href="/contact" size="lg" showArrow>
                Design Your Wall
              </Button>
              <Button href="/projects" variant="ghost" size="lg">
                View Projects
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-rose-50/70 p-6 rounded-lg text-center border border-rose-100">
              <Paintbrush className="w-8 h-8 text-rose-700 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Custom Finishes</h3>
              <p className="text-sm text-gray-600">Unique textures & techniques</p>
            </div>
            <div className="bg-pink-50 p-6 rounded-lg text-center border border-pink-100">
              <Wallpaper className="w-8 h-8 text-pink-700 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Premium Materials</h3>
              <p className="text-sm text-gray-600">Quality paints & papers</p>
            </div>
            <div className="bg-rose-50/50 p-6 rounded-lg text-center border border-rose-100">
              <Lightbulb className="w-8 h-8 text-rose-800 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Accent Lighting</h3>
              <p className="text-sm text-gray-600">Highlight your feature wall</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 bg-rose-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Wall Treatment Options"
            subtitle="Endless possibilities for your feature wall"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {WALL_TREATMENTS.map((treatment) => {
              const IconComponent = treatment.icon;
              return (
                <div key={treatment.name} className="bg-white p-6 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-rose-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-7 h-7 text-rose-700" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{treatment.name}</h3>
                  <p className="text-sm text-gray-600">{treatment.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Popular Wall Design Ideas"
            subtitle="Trending styles for bedroom feature walls"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-linear-to-br from-rose-50 to-pink-50 p-6 rounded-xl border border-rose-100">
              <Grid3X3 className="w-10 h-10 text-rose-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Panel Designs</h3>
              <p className="text-sm text-gray-600">3D wall panels, shiplap, and geometric patterns for modern sophistication.</p>
            </div>
            <div className="bg-linear-to-br from-pink-50 to-fuchsia-50 p-6 rounded-xl border border-pink-100">
              <Palette className="w-10 h-10 text-pink-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Ombre & Color Block</h3>
              <p className="text-sm text-gray-600">Gradient effects and bold color blocking for artistic expression.</p>
            </div>
            <div className="bg-linear-to-br from-fuchsia-50 to-rose-50 p-6 rounded-xl border border-fuchsia-100">
              <Wallpaper className="w-10 h-10 text-fuchsia-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Statement Wallpaper</h3>
              <p className="text-sm text-gray-600">Botanical prints, textures, and designer papers for instant impact.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 bg-rose-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Our Design Process"
            subtitle="From concept to stunning wall"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {service.process.map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-rose-100">
                <div className="w-10 h-10 bg-rose-100 text-rose-700 rounded-lg flex items-center justify-center font-bold mb-4">
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
          title="Why Choose Our Wall Designs"
          subtitle="Professional execution, stunning results"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
          {service.features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4 p-5 bg-rose-50 rounded-xl border border-rose-100">
              <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-5 h-5 text-pink-600" />
              </div>
              <span className="text-gray-700 font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 bg-pink-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Featured Wall Projects"
            subtitle="Statement walls we have created"
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
        <div className="max-w-4xl mx-auto bg-linear-to-br from-rose-900 to-pink-900 text-white rounded-3xl p-10 md:p-16 text-center">
          <Paintbrush className="w-14 h-14 text-rose-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Wall?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-10 text-lg">
            Let us create a stunning feature wall that becomes the centerpiece of your bedroom.
          </p>
          <Button href="/contact" size="lg" showArrow className="bg-white text-rose-900 hover:bg-gray-100">
            Start Your Wall Project
          </Button>
        </div>
      </section>
    </main>
  );
};

export default BedroomWallPage;
