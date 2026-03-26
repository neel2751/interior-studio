export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  detailedDescription: string;
  icon: string;
  image: string;
  process: string[];
  features: string[];
  projectExamples: string[];
}

export type ServiceType = 'residential' | 'commercial' | 'office' | 'hospitality';
