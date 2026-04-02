'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, Clock, Users, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { ResidentialService } from '@/data/residentialServices';
import Button from '@/components/common/Button';
import SectionHeading from '@/components/common/SectionHeading';
import OptimizedImage from '@/components/common/OptimizedImage';
import Badge from '@/components/common/Badge';

interface MasterBedroomPageProps {
  service: ResidentialService;
}

const MasterBedroomPage = ({ service }: MasterBedroomPageProps) => {
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
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
          
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
                      idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
            <div className="max-w-6xl mx-auto">
              <p className="text-sm font-medium tracking-widest uppercase text-amber-400 mb-2">
                Residential Services
              </p>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                About This Service
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {service.detailedDescription}
              </p>
            </div>

            <div className="flex flex-wrap gap-6">
              {service.priceRange && (
                <div className="bg-amber-50 px-6 py-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Price Range</p>
                  <p className="text-xl font-bold text-amber-700">{service.priceRange}</p>
                </div>
              )}
              {service.duration && (
                <div className="bg-gray-50 px-6 py-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Typical Duration</p>
                  <p className="text-xl font-bold text-gray-900">{service.duration}</p>
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
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <Clock className="w-8 h-8 text-gray-900 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Timely Delivery</h3>
              <p className="text-sm text-gray-600">Projects completed on schedule</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <Users className="w-8 h-8 text-gray-900 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Expert Team</h3>
              <p className="text-sm text-gray-600">Skilled designers and architects</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <Award className="w-8 h-8 text-gray-900 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Quality Assured</h3>
              <p className="text-sm text-gray-600">Premium materials guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Our Process"
            subtitle="How we bring your master bedroom vision to life"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {service.process.map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
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
          subtitle="What makes our master bedroom designs exceptional"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {service.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
              <span className="text-gray-700 font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Featured Projects"
            subtitle="Explore our master bedroom transformations"
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
        <div className="max-w-4xl mx-auto bg-gray-900 text-white rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Master Bedroom?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Let&apos;s create a luxurious sanctuary that reflects your style and exceeds your expectations.
          </p>
          <Button href="/contact" className="bg-white text-gray-900 hover:bg-gray-100" size="lg">
            Start Your Project
          </Button>
        </div>
      </section>
    </main>
  );
};

export default MasterBedroomPage;
