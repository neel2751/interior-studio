'use client';

import { useState } from 'react';
import { CheckCircle, ChevronLeft, ChevronRight, ShoppingBag, Palette, Frame, Lamp, Sparkles, Gift, Home, Heart } from 'lucide-react';
import { ResidentialService } from '@/data/residentialServices';
import Button from '@/components/common/Button';
import SectionHeading from '@/components/common/SectionHeading';
import OptimizedImage from '@/components/common/OptimizedImage';
import Badge from '@/components/common/Badge';

interface HomeDecorProductsPageProps {
  service: ResidentialService;
}

const DECOR_CATEGORIES = [
  { name: 'Wall Art', description: 'Paintings, prints, and sculptures', icon: Frame },
  { name: 'Textiles', description: 'Cushions, throws, and rugs', icon: Heart },
  { name: 'Accessories', description: 'Vases, bowls, and objects', icon: Lamp },
  { name: 'Lighting', description: 'Lamps and decorative fixtures', icon: Sparkles },
];

const HomeDecorProductsPage = ({ service }: HomeDecorProductsPageProps) => {
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
                <ShoppingBag className="w-5 h-5 text-teal-400" />
                <p className="text-sm font-medium tracking-widest uppercase text-teal-400">
                  Curated Collection
                </p>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Home Decor Products
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
                <Palette className="w-6 h-6 text-teal-700" />
                <h2 className="text-3xl font-bold text-gray-900">
                  The Perfect Finishing Touches
                </h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Decor is where personality meets space. We curate and source unique home decor items that reflect your style and complete your design vision. From statement art pieces to subtle accessories, our selection process ensures every item contributes to a cohesive, beautiful home that tells your story.
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
              <Button href="/contact" size="lg">
                Explore Our Collection
              </Button>
              <Button variant="secondary" href="/projects" size="lg">
                View Styled Spaces
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-teal-50/70 p-6 rounded-lg text-center border border-teal-100">
              <Palette className="w-8 h-8 text-teal-700 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Curated Selection</h3>
              <p className="text-sm text-gray-600">Handpicked quality items</p>
            </div>
            <div className="bg-cyan-50 p-6 rounded-lg text-center border border-cyan-100">
              <Gift className="w-8 h-8 text-cyan-700 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Unique Finds</h3>
              <p className="text-sm text-gray-600">One-of-a-kind pieces</p>
            </div>
            <div className="bg-teal-50/50 p-6 rounded-lg text-center border border-teal-100">
              <Sparkles className="w-8 h-8 text-teal-800 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Style Coordination</h3>
              <p className="text-sm text-gray-600">Perfectly matched to you</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 bg-teal-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Decor Categories"
            subtitle="Complete your space with style"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {DECOR_CATEGORIES.map((category) => {
              const IconComponent = category.icon;
              return (
                <div key={category.name} className="bg-white p-6 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-7 h-7 text-teal-700" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Our Curation Process"
            subtitle="Finding the perfect pieces for you"
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
          title="Why Choose Our Decor Services"
          subtitle="Quality, uniqueness, and style"
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
            title="Styled Spaces"
            subtitle="Homes we have decorated"
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
        <div className="max-w-4xl mx-auto bg-linear-to-br from-teal-900 to-cyan-900 text-white rounded-3xl p-10 md:p-16 text-center">
          <ShoppingBag className="w-14 h-14 text-teal-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Complete Your Home
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-10 text-lg">
            Let us help you find the perfect decor pieces that bring your design vision to life.
          </p>
          <Button href="/contact" className="bg-white text-teal-900 hover:bg-gray-100" size="lg">
            Explore Decor Options
          </Button>
        </div>
      </section>
    </main>
  );
};

export default HomeDecorProductsPage;
