'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle, ChevronLeft, ChevronRight, Dumbbell, Heart, Wind, Zap, Shield, Activity, Thermometer, Sparkles } from 'lucide-react';
import { ResidentialService } from '@/data/residentialServices';
import Button from '@/components/common/Button';
import SectionHeading from '@/components/common/SectionHeading';
import OptimizedImage from '@/components/common/OptimizedImage';
import Badge from '@/components/common/Badge';

interface HomeGymDesignPageProps {
  service: ResidentialService;
}

const GYM_ELEMENTS = [
  { name: 'Shock-Absorbing Flooring', description: 'Protects joints and reduces noise', icon: Activity },
  { name: 'Ventilation', description: 'Fresh air circulation systems', icon: Wind },
  { name: 'Mirrors', description: 'Form checking and space expansion', icon: Shield },
  { name: 'Smart Lighting', description: 'Adjustable for any workout mood', icon: Zap },
];

const HomeGymDesignPage = ({ service }: HomeGymDesignPageProps) => {
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
          <div className="absolute inset-0 bg-linear-to-t from-orange-950/90 via-red-950/50 to-rose-900/20" />

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
                <Dumbbell className="w-5 h-5 text-orange-400" />
                <p className="text-sm font-medium tracking-widest uppercase text-orange-400">
                  Fitness at Home
                </p>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Home Gym Design
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
                <Activity className="w-6 h-6 text-orange-700" />
                <h2 className="text-3xl font-bold text-gray-900">
                  Your Personal Fitness Sanctuary
                </h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Transform any room into a motivating workout space. We design home gyms that inspire you to reach your fitness goals with proper flooring, optimal ventilation, strategic mirror placement, and equipment layouts that maximize functionality. Whether you are into yoga, weightlifting, or cardio, we create spaces that energize and motivate.
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
                  <p className="text-sm text-gray-600 mb-1">Timeline</p>
                  <p className="text-xl font-bold text-red-700">{service.duration}</p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button href="/contact" size="lg" showArrow>
                Design Your Gym
              </Button>
              <Button href="/projects" variant="ghost" size="lg">
                View Projects
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-orange-50/70 p-6 rounded-lg text-center border border-orange-100">
              <Activity className="w-8 h-8 text-orange-700 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Joint Protection</h3>
              <p className="text-sm text-gray-600">Shock-absorbing flooring</p>
            </div>
            <div className="bg-red-50 p-6 rounded-lg text-center border border-red-100">
              <Wind className="w-8 h-8 text-red-700 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Fresh Air Flow</h3>
              <p className="text-sm text-gray-600">Proper ventilation systems</p>
            </div>
            <div className="bg-orange-50/50 p-6 rounded-lg text-center border border-orange-100">
              <Thermometer className="w-8 h-8 text-orange-800 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Climate Control</h3>
              <p className="text-sm text-gray-600">Comfortable workout temps</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 bg-orange-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Essential Gym Elements"
            subtitle="What makes a great home gym"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {GYM_ELEMENTS.map((element) => {
              const IconComponent = element.icon;
              return (
                <div key={element.name} className="bg-white p-6 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-7 h-7 text-orange-700" />
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
            title="Equipment Layout Planning"
            subtitle="Optimized for your workout style"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-linear-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
              <Dumbbell className="w-10 h-10 text-orange-700 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Strength Training</h3>
              <p className="text-sm text-gray-600">Racks, weights, and bench layouts with proper spacing and safety zones.</p>
            </div>
            <div className="bg-linear-to-br from-red-50 to-red-100 p-6 rounded-xl border border-red-200">
              <Heart className="w-10 h-10 text-red-700 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Cardio Zone</h3>
              <p className="text-sm text-gray-600">Treadmill, bike, and rowing machine placement with TV viewing angles.</p>
            </div>
            <div className="bg-linear-to-br from-rose-50 to-rose-100 p-6 rounded-xl border border-rose-200">
              <Activity className="w-10 h-10 text-rose-700 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Flexibility Area</h3>
              <p className="text-sm text-gray-600">Yoga mat space with mirror walls and calming lighting design.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 bg-red-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Our Design Process"
            subtitle="Building your fitness space"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {service.process.map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-red-100">
                <div className="w-10 h-10 bg-orange-100 text-orange-700 rounded-lg flex items-center justify-center font-bold mb-4">
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
          title="Why Choose Our Gym Designs"
          subtitle="Safety, functionality, motivation"
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

      <section className="py-20 px-4 md:px-8 bg-orange-100">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Featured Home Gym Projects"
            subtitle="Fitness spaces we have created"
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
        <div className="max-w-4xl mx-auto bg-linear-to-br from-orange-900 to-red-900 text-white rounded-3xl p-10 md:p-16 text-center">
          <Dumbbell className="w-14 h-14 text-orange-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Build Your Home Gym Today
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-10 text-lg">
            Start your fitness journey with a professionally designed home gym tailored to your workout preferences.
          </p>
          <Button href="/contact" size="lg" showArrow className="bg-white text-orange-900 hover:bg-gray-100">
            Start Your Gym Project
          </Button>
        </div>
      </section>
    </main>
  );
};

export default HomeGymDesignPage;
