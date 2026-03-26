'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/constants';
import { Inquiry } from '@/types/inquiry';
import Button from '@/components/common/Button';
import FormSuccess from './FormSuccess';


const inquirySchema = z.object({
  fullName: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string()
    .email('Please enter a valid email address'),
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^[+]?[\d\s\-\(\)]+$/, 'Please enter a valid phone number'),
  projectLocation: z.string()
    .min(3, 'Location must be at least 3 characters')
    .max(200, 'Location must be less than 200 characters'),
  projectType: z.enum(['residential', 'commercial'], {
    error: 'Please select a project type',  
  }),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      projectLocation: '',
      projectType: 'residential',
      message: '',
    },
  });

  const onSubmit = async (data: InquiryFormData) => {
    setIsSubmitting(true);
    setServerError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        reset(); 
      } else {
        setServerError(result.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setServerError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setServerError('');
    reset();
  };

  if (isSubmitted) {
    return <FormSuccess onReset={handleReset} />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-8">
            Ready to transform your space? Let&#39;s discuss your vision and create something extraordinary together.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                {CONTACT_INFO.email}
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                {CONTACT_INFO.phone}
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Office</h3>
              <p className="text-gray-600">
                {CONTACT_INFO.address}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-3">Business Hours</h4>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Monday - Friday</span>
              <span>9:00 AM - 6:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span>Saturday</span>
              <span>10:00 AM - 4:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span>Sunday</span>
              <span>Closed</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                id="fullName"
                {...register('fullName')}
                className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-offset-2 outline-none transition-colors duration-200 ${
                  errors.fullName
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-gray-900 focus:border-transparent'
                }`}
                placeholder="John Doe"
              />
              {errors.fullName && (
                <p className="text-red-600 text-sm mt-1 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-offset-2 outline-none transition-colors duration-200 ${
                  errors.email
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-gray-900 focus:border-transparent'
                }`}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                id="phone"
                type="tel"
                {...register('phone')}
                className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-offset-2 outline-none transition-colors duration-200 ${
                  errors.phone
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-gray-900 focus:border-transparent'
                }`}
                placeholder="+91 98765 43210"
              />
              {errors.phone && (
                <p className="text-red-600 text-sm mt-1 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="projectLocation" className="block text-sm font-medium text-gray-700 mb-2">
                Project Location *
              </label>
              <input
                id="projectLocation"
                {...register('projectLocation')}
                className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-offset-2 outline-none transition-colors duration-200 ${
                  errors.projectLocation
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-gray-900 focus:border-transparent'
                }`}
                placeholder="Mumbai, Maharashtra"
              />
              {errors.projectLocation && (
                <p className="text-red-600 text-sm mt-1 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.projectLocation.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">
              Project Type *
            </label>
            <select
              id="projectType"
              {...register('projectType')}
              className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-offset-2 outline-none transition-colors duration-200 ${
                errors.projectType
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-gray-900 focus:border-transparent'
              }`}
            >
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
            </select>
            {errors.projectType && (
              <p className="text-red-600 text-sm mt-1 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {errors.projectType.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Project Description *
            </label>
            <textarea
              id="message"
              {...register('message')}
              rows={5}
              className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-offset-2 outline-none transition-colors duration-200 resize-none ${
                errors.message
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-gray-900 focus:border-transparent'
              }`}
              placeholder="Tell us about your project vision, requirements, and timeline..."
            />
            {errors.message && (
              <p className="text-red-600 text-sm mt-1 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {errors.message.message}
              </p>
            )}
          </div>

          {serverError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm flex items-center">
                <AlertCircle size={16} className="mr-2" />
                {serverError}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center space-x-2"
          >
            <Send className="w-5 h-5" />
            <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;