import { z } from 'zod';

export const ContactFormSchema = z.object({
  fullName: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name should only contain letters and spaces'),
  
  email: z.string()
    .email('Please enter a valid email address')
    .max(254, 'Email address is too long'),
  
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(20, 'Phone number is too long')
    .regex(/^[+]?[\d\s\-\(\)]+$/, 'Please enter a valid phone number'),
  
  projectLocation: z.string()
    .min(3, 'Location must be at least 3 characters')
    .max(200, 'Location must be less than 200 characters')
    .regex(/^[a-zA-Z0-9\s,\-]+$/, 'Location contains invalid characters'),
  
  projectType: z.enum(['residential', 'commercial'], {
    message: 'Please select a project type',
  }),
  
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters')
    .regex(/^[^<>]+$/, 'Message contains invalid characters'),
});

export type ContactFormInput = z.infer<typeof ContactFormSchema>;

export const validateContactForm = (data: unknown): ContactFormInput => {
  return ContactFormSchema.parse(data);
};

export const validatePartialContactForm = (data: unknown) => {
  return ContactFormSchema.partial().safeParse(data);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[+]?[\d\s\-\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

export const validateName = (name: string): boolean => {
  const nameRegex = /^[a-zA-Z\s]+$/;
  return nameRegex.test(name) && name.length >= 2 && name.length <= 100;
};

export const validateMessage = (message: string): boolean => {
  const invalidCharsRegex = /[<>]/;
  return !invalidCharsRegex.test(message) && message.length >= 10 && message.length <= 1000;
};

export const validateLocation = (location: string): boolean => {
  const locationRegex = /^[a-zA-Z0-9\s,\-]+$/;
  return locationRegex.test(location) && location.length >= 3 && location.length <= 200;
};

export const validateProjectType = (type: string): boolean => {
  return ['residential', 'commercial'].includes(type);
};
