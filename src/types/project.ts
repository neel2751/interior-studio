export interface Project {
  id: string;
  title: string;
  category: 'residential' | 'commercial';
  location: string;
  completionDate: string;
  client: string;
  description: string;
  designConcept: string;
  scopeOfWork: string[];
  materials: string[];
  images: string[];
  featured: boolean;
}

export interface ProjectFilter {
  category?: 'residential' | 'commercial' | 'all';
  featured?: boolean;
}
