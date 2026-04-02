'use client';

import { useState } from 'react';
import { CheckCircle, Clock, Users, Award, ChevronLeft, ChevronRight, BookOpen, Library, Lamp, Sofa } from 'lucide-react';
import { ResidentialService } from '@/data/residentialServices';
import Button from '@/components/common/Button';
import SectionHeading from '@/components/common/SectionHeading';
import OptimizedImage from '@/components/common/OptimizedImage';
import Badge from '@/components/common/Badge';

interface HomeLibraryPageProps {
  service: ResidentialService;
}

const HomeLibraryPage = ({ service }: HomeLibraryPageProps) => {
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
          <div className="absolute inset-0 bg-linear-to-t from-amber-950/90 via-amber-950/50 to-amber-900/30" />
          
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
                <Library className="w-5 h-5 text-amber-400" />
                <p className="text-sm font-medium tracking-widest uppercase text-amber-400">
                  Residential Services
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
                <BookOpen className="w-6 h-6 text-amber-700" />
                <h2 className="text-3xl font-bold text-gray-900">
                  About This Service
                </h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                {service.detailedDescription}
              </p>
            </div>

            <div className="flex flex-wrap gap-6">
              {service.priceRange && (
                <div className="bg-amber-50 px-6 py-4 rounded-lg border border-amber-100">
                  <p className="text-sm text-gray-600 mb-1">Price Range</p>
                  <p className="text-xl font-bold text-amber-700">{service.priceRange}</p>
                </div>
              )}
              {service.duration && (
                <div className="bg-stone-50 px-6 py-4 rounded-lg border border-stone-200">
                  <p className="text-sm text-gray-600 mb-1">Typical Duration</p>
                  <p className="text-xl font-bold text-stone-700">{service.duration}</p>
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button href="/contact" size="lg">
                Book Consultation
              </Button>
              <Button variant="secondary" href="/projects" size="lg">
                View Projects
              </Button>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-amber-50 p-6 rounded-lg text-center border border-amber-100">
              <Lamp className="w-8 h-8 text-amber-700 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Reading Lighting</h3>
              <p className="text-sm text-gray-600">Optimal ambient and task lighting for comfortable reading</p>
            </div>
            
            <div className="bg-stone-50 p-6 rounded-lg text-center border border-stone-200">
              <Library className="w-8 h-8 text-stone-700 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Custom Shelving</h3>
              <p className="text-sm text-gray-600">Bespoke bookcases designed for your collection</p>
            </div>
            
            <div className="bg-amber-50/50 p-6 rounded-lg text-center border border-amber-100">
              <Sofa className="w-8 h-8 text-amber-800 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Comfort Seating</h3>
              <p className="text-sm text-gray-600">Cozy reading nooks and lounge chairs</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Library Design Elements"
            subtitle="Essential components of a perfect home library"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Library className="w-7 h-7 text-amber-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Custom Bookshelves</h3>
              <p className="text-sm text-gray-600">Floor-to-ceiling shelving tailored to your space and collection size</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lamp className="w-7 h-7 text-amber-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Ambient Lighting</h3>
              <p className="text-sm text-gray-600">Warm, layered lighting for comfortable reading at any time</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sofa className="w-7 h-7 text-amber-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Reading Nooks</h3>
              <p className="text-sm text-gray-600">Comfortable seating areas designed for hours of reading</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-7 h-7 text-amber-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Climate Control</h3>
              <p className="text-sm text-gray-600">Protect your books with proper humidity and temperature control</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 bg-linear-to-b from-amber-50 to-white">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Our Process"
            subtitle="How we create your perfect reading sanctuary"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {service.process.map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-amber-100/50">
                <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center font-bold mb-4">
                  {index + 1}
                </div>
                <p className="text-gray-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <SectionHeading
          title="Key Features"
          subtitle="What makes our home library designs exceptional"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {service.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3 p-4 bg-stone-50 rounded-lg border border-stone-100">
              <CheckCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <span className="text-gray-700 font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Featured Projects"
            subtitle="Explore our home library transformations"
          />
          <div className="flex flex-wrap gap-3 mt-8">
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

      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto bg-linear-to-br from-amber-900 to-stone-900 text-white rounded-2xl p-8 md:p-12 text-center">
          <Library className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Create Your Reading Sanctuary?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Let&apos;s design a home library that celebrates your love for books and creates a peaceful retreat for reading and reflection.
          </p>
          <Button href="/contact" className="bg-white text-amber-900 hover:bg-gray-100" size="lg">
            Start Your Project
          </Button>
        </div>
      </section>
    </main>
  );
};

export default HomeLibraryPage;
