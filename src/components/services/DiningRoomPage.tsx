'use client';

import { useState } from 'react';
import { CheckCircle, ChevronLeft, ChevronRight, UtensilsCrossed, Wine, Users, Sparkles, Lightbulb, Home, Clock } from 'lucide-react';
import { ResidentialService } from '@/data/residentialServices';
import Button from '@/components/common/Button';
import SectionHeading from '@/components/common/SectionHeading';
import OptimizedImage from '@/components/common/OptimizedImage';
import Badge from '@/components/common/Badge';

interface DiningRoomPageProps {
  service: ResidentialService;
}

const DINING_ELEMENTS = [
  { name: 'Table Design', description: 'Statement centerpiece furniture', icon: UtensilsCrossed },
  { name: 'Ambient Lighting', description: 'Mood-setting illumination', icon: Lightbulb },
  { name: 'Seating Comfort', description: 'Elegant, comfortable chairs', icon: Users },
  { name: 'Storage', description: 'Sideboards and display', icon: Wine },
];

const DiningRoomPage = ({ service }: DiningRoomPageProps) => {
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
          <div className="absolute inset-0 bg-linear-to-t from-amber-950/90 via-orange-950/50 to-yellow-900/20" />

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
                <UtensilsCrossed className="w-5 h-5 text-amber-400" />
                <p className="text-sm font-medium tracking-widest uppercase text-amber-400">
                  Gather & Dine
                </p>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Dining Room Design
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
                <Wine className="w-6 h-6 text-amber-700" />
                <h2 className="text-3xl font-bold text-gray-900">
                  Memorable Meals Start Here
                </h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                The dining room is where families gather and memories are made over shared meals. We design dining spaces that balance elegance with everyday functionality, creating atmospheres perfect for both casual family dinners and special celebrations. From statement lighting to comfortable seating, every element enhances the dining experience.
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
                <div className="bg-orange-50 px-6 py-4 rounded-lg border border-orange-100">
                  <p className="text-sm text-gray-600 mb-1">Timeline</p>
                  <p className="text-xl font-bold text-orange-700">{service.duration}</p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button href="/contact" size="lg">
                Design Your Dining Room
              </Button>
              <Button variant="secondary" href="/projects" size="lg">
                View Projects
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-amber-50/70 p-6 rounded-lg text-center border border-amber-100">
              <UtensilsCrossed className="w-8 h-8 text-amber-700 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Dining Layout</h3>
              <p className="text-sm text-gray-600">Optimal seating flow</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg text-center border border-orange-100">
              <Lightbulb className="w-8 h-8 text-orange-700 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Mood Lighting</h3>
              <p className="text-sm text-gray-600">Ambient illumination</p>
            </div>
            <div className="bg-amber-50/50 p-6 rounded-lg text-center border border-amber-100">
              <Clock className="w-8 h-8 text-amber-800 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Entertainment Ready</h3>
              <p className="text-sm text-gray-600">Host with ease</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 bg-amber-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Dining Room Elements"
            subtitle="Creating perfect dining experiences"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {DINING_ELEMENTS.map((element) => {
              const IconComponent = element.icon;
              return (
                <div key={element.name} className="bg-white p-6 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-7 h-7 text-amber-700" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{element.name}</h3>
                  <p className="text-sm text-gray-600">{element.description}</p>
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
            subtitle="From concept to dining perfection"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {service.process.map((step, index) => (
              <div key={index} className="bg-amber-50 p-6 rounded-xl border border-amber-100">
                <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center font-bold mb-4">
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
          title="Why Choose Our Dining Rooms"
          subtitle="Excellence in dining design"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
          {service.features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4 p-5 bg-amber-50 rounded-xl border border-amber-100">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-gray-700 font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 bg-orange-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Featured Dining Room Projects"
            subtitle="Dining spaces we have created"
          />
          <div className="flex flex-wrap gap-3 mt-12 justify-center">
            {service.projectExamples.map((project, index) => (
              <Badge key={index} variant="default" size="lg">
                {project}
              </Badge>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button href="/projects" variant="secondary" size="lg">
              View All Projects
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto bg-linear-to-br from-amber-900 to-orange-900 text-white rounded-3xl p-10 md:p-16 text-center">
          <UtensilsCrossed className="w-14 h-14 text-amber-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Create Your Perfect Dining Room
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-10 text-lg">
            Let us design a dining space that makes every meal special and every gathering memorable.
          </p>
          <Button href="/contact" className="bg-white text-amber-900 hover:bg-gray-100" size="lg">
            Start Your Dining Room Project
          </Button>
        </div>
      </section>
    </main>
  );
};

export default DiningRoomPage;
