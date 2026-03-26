'use client';
import { SERVICES } from '@/lib/constants';
import ServiceCard from '@/components/services/ServiceCard';
import Section from '@/components/common/Section';

export default function ServicesPage() {
  return (
    <div className="space-y-12">
      <Section>
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive interior design solutions tailored to transform your residential and commercial spaces 
            into inspiring environments that reflect your unique style and enhance your lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Section>

      <Section background="gray">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">
            Not Sure Which Service You Need?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our team is here to help you determine the best approach for your project. 
            Schedule a free consultation to discuss your requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors duration-300 inline-block text-center"
            >
              Free Consultation
            </a>
            <a
              href="tel:+919876543210"
              className="border border-gray-900 text-gray-900 px-6 py-3 rounded-md hover:bg-gray-900 hover:text-white transition-colors duration-300 inline-block text-center"
            >
              Call Us
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
}
