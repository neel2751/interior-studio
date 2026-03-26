'use client';
import { PROCESS_STEPS } from '@/lib/constants';
import StepCard from '@/components/process/StepCard';
import Section from '@/components/common/Section';
import Button from '@/components/common/Button';

export default function ProcessPage() {
  return (
    <div className="space-y-12">
      <Section>
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Our Design Process
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A structured approach to bring your vision to life. We guide you through every step of the design journey, 
            ensuring a seamless and enjoyable experience from concept to completion.
          </p>
        </div>

        <div className="space-y-12">
          {PROCESS_STEPS.map((step, index) => (
            <StepCard
              key={step.id}
              step={step}
              index={index}
              isLast={index === PROCESS_STEPS.length - 1}
            />
          ))}
        </div>
      </Section>

      <Section background="gray">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              15+
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Years Experience</h3>
            <p className="text-gray-600 text-sm">
              Proven expertise in interior design across residential and commercial projects
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              200+
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Projects Completed</h3>
            <p className="text-gray-600 text-sm">
              Successfully delivered projects with satisfied clients across India
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              98%
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Client Satisfaction</h3>
            <p className="text-gray-600 text-sm">
              Exceptional service quality and attention to detail in every project
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="bg-gray-900 text-white rounded-xl p-8 text-center space-y-6">
          <h2 className="text-3xl font-bold">
            Ready to Begin Your Design Journey?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Let&#39;s start with a consultation to understand your vision and create a roadmap for your dream space.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" className="bg-white text-gray-900 hover:bg-gray-100">
              Schedule Consultation
            </Button>
            <Button variant="secondary" href="/projects" className="border-white text-white hover:bg-white hover:text-gray-900">
              View Our Work
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
