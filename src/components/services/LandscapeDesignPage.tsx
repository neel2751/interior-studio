'use client';

import { useState } from 'react';
import { CheckCircle, ChevronLeft, ChevronRight, Mountain, Palmtree, LeafyGreen, TreePine, Sun, Droplets, Wind, Quote } from 'lucide-react';
import { ResidentialService } from '@/data/residentialServices';
import Button from '@/components/common/Button';
import SectionHeading from '@/components/common/SectionHeading';
import OptimizedImage from '@/components/common/OptimizedImage';
import Badge from '@/components/common/Badge';

interface LandscapeDesignPageProps {
  service: ResidentialService;
}

const SEASONS = [
  { name: 'Spring', description: 'Blooming flowers and fresh greenery', color: 'bg-pink-100 text-pink-700' },
  { name: 'Summer', description: 'Lush foliage and vibrant colors', color: 'bg-green-100 text-green-700' },
  { name: 'Autumn', description: 'Warm tones and ornamental grasses', color: 'bg-orange-100 text-orange-700' },
  { name: 'Winter', description: 'Evergreen structure and bark interest', color: 'bg-slate-100 text-slate-700' },
];

const TESTIMONIAL = {
  quote: "They transformed our barren backyard into a tropical paradise. Every season brings new beauty.",
  author: "Rajesh & Priya Sharma",
  location: "Pune, Maharashtra"
};

const LandscapeDesignPage = ({ service }: LandscapeDesignPageProps) => {
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
          <div className="absolute inset-0 bg-linear-to-t from-stone-900/85 via-stone-800/50 to-amber-900/20" />

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
                <Mountain className="w-5 h-5 text-amber-400" />
                <p className="text-sm font-medium tracking-widest uppercase text-amber-400">
                  Outdoor Living
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
                <LeafyGreen className="w-6 h-6 text-amber-700" />
                <h2 className="text-3xl font-bold text-gray-900">
                  Crafting Your Outdoor Sanctuary
                </h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                We design landscapes that evolve beautifully through every season. From native plantings that attract butterflies to serene water features that mask urban noise, we create outdoor spaces that feel like natural extensions of your home. Our designs balance aesthetic beauty with sustainable practices, ensuring your garden thrives for years to come.
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
              <Button href="/contact" size="lg">
                Book Consultation
              </Button>
              <Button variant="secondary" href="/projects" size="lg">
                View Projects
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-amber-50/70 p-6 rounded-lg text-center border border-amber-100">
              <Palmtree className="w-8 h-8 text-amber-700 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Native Plantings</h3>
              <p className="text-sm text-gray-600">Indigenous species adapted to your climate</p>
            </div>

            <div className="bg-stone-50 p-6 rounded-lg text-center border border-stone-200">
              <Droplets className="w-8 h-8 text-stone-700 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Water Conservation</h3>
              <p className="text-sm text-gray-600">Smart irrigation and drought-tolerant design</p>
            </div>

            <div className="bg-amber-50/50 p-6 rounded-lg text-center border border-amber-100">
              <Wind className="w-8 h-8 text-amber-800 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Year-Round Interest</h3>
              <p className="text-sm text-gray-600">Four-season beauty with evergreens & grasses</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Elements of Exceptional Landscapes"
            subtitle="We combine natural beauty with thoughtful design"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-5 rotate-3">
                <TreePine className="w-8 h-8 text-amber-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">Structural Planting</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Evergreens and specimen trees that provide year-round architecture</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-5 -rotate-2">
                <Sun className="w-8 h-8 text-orange-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">Outdoor Lighting</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Subtle illumination that extends enjoyment into evening hours</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto mb-5 rotate-1">
                <Droplets className="w-8 h-8 text-stone-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">Water Features</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Fountains, ponds, and rain gardens that soothe the senses</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-5 -rotate-3">
                <Mountain className="w-8 h-8 text-amber-800" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">Natural Stone</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Patios, pathways, and retaining walls that age gracefully</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Beauty Through Every Season"
            subtitle="Your landscape transforms with nature's rhythm"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {SEASONS.map((season) => (
              <div key={season.name} className="text-center p-6 rounded-2xl bg-stone-50 hover:bg-stone-100 transition-colors">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${season.color}`}>
                  <span className="text-2xl font-bold">{season.name[0]}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{season.name}</h3>
                <p className="text-sm text-gray-600">{season.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <SectionHeading
          title="Why Choose Our Landscapes"
          subtitle="Sustainable beauty built to last"
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
        <div className="max-w-4xl mx-auto text-center">
          <Quote className="w-12 h-12 text-amber-400 mx-auto mb-6" />
          <blockquote className="text-2xl md:text-3xl font-medium text-gray-800 mb-8 leading-relaxed">
            &ldquo;{TESTIMONIAL.quote}&rdquo;
          </blockquote>
          <div className="text-gray-600">
            <p className="font-semibold text-gray-900">{TESTIMONIAL.author}</p>
            <p className="text-sm">{TESTIMONIAL.location}</p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Featured Garden Projects"
            subtitle="Real transformations, real beauty"
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
        <div className="max-w-4xl mx-auto bg-linear-to-br from-stone-800 to-amber-900 text-white rounded-3xl p-10 md:p-16 text-center">
          <Mountain className="w-14 h-14 text-amber-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Let&apos;s Grow Something Beautiful
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-10 text-lg">
            Transform your outdoor space into a living sanctuary. From first sketch to final planting, we&apos;re with you every step of the way.
          </p>
          <Button href="/contact" className="bg-white text-stone-900 hover:bg-gray-100" size="lg">
            Start Your Garden Journey
          </Button>
        </div>
      </section>
    </main>
  );
};

export default LandscapeDesignPage;
