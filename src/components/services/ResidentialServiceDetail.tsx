import { CheckCircle, Clock, Users, Award } from 'lucide-react';
import Link from 'next/link';
import { ResidentialService } from '@/data/residentialServices';
import Button from '@/components/common/Button';
import SectionHeading from '@/components/common/SectionHeading';
import OptimizedImage from '@/components/common/OptimizedImage';
import Badge from '@/components/common/Badge';

interface ResidentialServiceDetailProps {
  service: ResidentialService;
}

const ResidentialServiceDetail = ({ service }: ResidentialServiceDetailProps) => {
  return (
    <div className="space-y-12">

      <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
        <OptimizedImage
          src={service.image}
          alt={service.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <img
                src={service.icon}
                alt={service.title}
                className="w-8 h-8"
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              {service.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <SectionHeading
            title="Service Overview"
            subtitle={service.detailedDescription}
          />
          
          <div className="flex flex-wrap gap-4">
            <Button href="/contact" size="lg" showArrow>
              Get Started
            </Button>
            <Button href="/projects" variant="ghost" size="lg">
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

      <div className="space-y-8">
        <SectionHeading
          title="Our Process"
          subtitle="How we bring your vision to life through our structured approach"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {service.process.map((step, index) => (
            <div key={index} className="flex space-x-4">
              <div className="shrink-0">
                <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                  {index + 1}
                </div>
              </div>
              <p className="text-gray-600">{step}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <SectionHeading
          title="Key Features"
          subtitle="What makes our service exceptional"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {service.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <SectionHeading
          title="Recent Projects"
          subtitle="Examples of our work in this area"
        />
        <div className="flex flex-wrap gap-3">
          {service.projectExamples.map((project, index) => (
            <Badge key={index} variant="default" size="md">
              {project}
            </Badge>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Button href="/projects" variant="secondary" size="lg" showArrow>
            View All Projects
          </Button>
        </div>
      </div>

      <div className="bg-gray-900 text-white rounded-xl p-8 text-center space-y-6">
        <h2 className="text-2xl font-bold">
          Ready to Transform Your Space?
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Let&apos;s discuss your project requirements and create a space that exceeds your expectations.
        </p>
        <Button href="/contact" size="lg" showArrow className="bg-white text-gray-900 hover:bg-gray-100">
          Start Your Project
        </Button>
      </div>
    </div>
  );
};

export default ResidentialServiceDetail;
