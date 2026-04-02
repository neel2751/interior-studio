export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  detailedDescription: string;
  icon: string;
  image: string;
  gallery?: string[];
  process: string[];
  features: string[];
  projectExamples: string[];
  heroGradient: string;
  priceRange?: string;
  duration?: string;
}

export type ServiceType = 'residential' | 'commercial' | 'office' | 'hospitality';

export type ResidentialService = Service;
export type CommercialService = Service;
export type HospitalityService = Service;
export type OfficeService = Service;
