import { Project } from '@/types/project';

export const PROJECTS: Project[] = [
  {
    id: 'modern-apartment-bandra',
    title: 'Modern Apartment in Bandra',
    category: 'residential',
    location: 'Bandra, Mumbai',
    completionDate: '2024',
    client: 'The Sharma Family',
    description: 'A contemporary 3BHK apartment transformed into a modern living space with clean lines and neutral tones.',
    designConcept: 'The design concept focused on creating an open, airy living space that maximizes natural light while maintaining privacy. We used a neutral color palette with pops of color through artwork and accessories.',
    scopeOfWork: [
      'Complete interior renovation',
      'Custom furniture design',
      'Lighting design',
      'Kitchen remodeling',
      'Bathroom upgrades',
      'Smart home integration'
    ],
    materials: [
      'Italian marble flooring',
      'Teak wood furniture',
      'Brass accents',
      'Glass partitions',
      'Custom lighting fixtures',
      'Premium laminates'
    ],
    images: [
      '/images/projects/modern-apartment-1.jpg',
      '/images/projects/modern-apartment-2.jpg',
      '/images/projects/modern-apartment-3.jpg',
      '/images/projects/modern-apartment-4.jpg',
      '/images/projects/modern-apartment-5.jpg',
      '/images/projects/modern-apartment-6.jpg'
    ],
    featured: true
  },
  {
    id: 'corporate-office-bkc',
    title: 'Corporate Office in BKC',
    category: 'commercial',
    location: 'Bandra Kurla Complex, Mumbai',
    completionDate: '2024',
    client: 'Tech Solutions Pvt Ltd',
    description: 'A modern corporate office designed for collaboration and productivity with flexible workspaces.',
    designConcept: 'The design concept centered around creating a dynamic work environment that fosters collaboration while providing focused work areas. We incorporated biophilic design elements and flexible furniture systems.',
    scopeOfWork: [
      'Space planning and layout',
      'Workstation design',
      'Conference room design',
      'Reception area',
      'Breakout zones',
      'Cafeteria design'
    ],
    materials: [
      'Acoustic panels',
      'Glass partitions',
      'Carpet tiles',
      'Laminate workstations',
      'LED lighting',
      'Green wall installation'
    ],
    images: [
      '/images/projects/corporate-office-1.jpg',
      '/images/projects/corporate-office-2.jpg',
      '/images/projects/corporate-office-3.jpg',
      '/images/projects/corporate-office-4.jpg'
    ],
    featured: true
  },
  {
    id: 'luxury-villa-south-mumbai',
    title: 'Luxury Villa in South Mumbai',
    category: 'residential',
    location: 'Cuffe Parade, Mumbai',
    completionDate: '2023',
    client: 'The Patel Family',
    description: 'A luxurious 5BHK villa featuring contemporary design with traditional Indian elements.',
    designConcept: 'The design concept blended contemporary luxury with traditional Indian craftsmanship. We created distinct zones for different family activities while maintaining a cohesive design language throughout.',
    scopeOfWork: [
      'Full home renovation',
      'Custom furniture',
      'Art curation',
      'Landscape design',
      'Home theater',
      'Wine cellar'
    ],
    materials: [
      'Italian marble',
      'Burma teak',
      'Brass and copper accents',
      'Silk upholstery',
      'Custom lighting',
      'Art pieces'
    ],
    images: [
      '/images/projects/luxury-villa-1.jpg',
      '/images/projects/luxury-villa-2.jpg',
      '/images/projects/luxury-villa-3.jpg',
      '/images/projects/luxury-villa-4.jpg',
      '/images/projects/luxury-villa-5.jpg'
    ],
    featured: true
  },
  {
    id: 'retail-store-colaba',
    title: 'Retail Store in Colaba',
    category: 'commercial',
    location: 'Colaba, Mumbai',
    completionDate: '2023',
    client: 'Fashion Forward Pvt Ltd',
    description: 'A high-end fashion retail store with innovative display systems and customer experience focus.',
    designConcept: 'The design concept focused on creating an immersive shopping experience with flexible display systems and premium materials that reflect the brand\'s luxury positioning.',
    scopeOfWork: [
      'Store layout design',
      'Display systems',
      'Lighting design',
      'Fitting rooms',
      'Cash counter',
      'Storage solutions'
    ],
    materials: [
      'Polished concrete floors',
      'Glass display cases',
      'Custom lighting',
      'Velvet upholstery',
      'Brass fixtures',
      'Mirror walls'
    ],
    images: [
      '/images/projects/retail-store-1.jpg',
      '/images/projects/retail-store-2.jpg',
      '/images/projects/retail-store-3.jpg',
      '/images/projects/retail-store-4.jpg'
    ],
    featured: false
  },
  {
    id: 'contemporary-home-powai',
    title: 'Contemporary Home in Powai',
    category: 'residential',
    location: 'Powai, Mumbai',
    completionDate: '2023',
    client: 'The Reddy Family',
    description: 'A contemporary 4BHK home with smart home features and sustainable design elements.',
    designConcept: 'The design concept emphasized clean lines, minimal aesthetics, and smart home integration. We focused on creating a sustainable home with energy-efficient systems.',
    scopeOfWork: [
      'Interior renovation',
      'Smart home integration',
      'Kitchen design',
      'Bathroom remodeling',
      'Lighting automation',
      'Furniture design'
    ],
    materials: [
      'Sustainable wood',
      'Recycled materials',
      'Energy-efficient lighting',
      'Smart glass',
      'Eco-friendly paints',
      'Bamboo flooring'
    ],
    images: [
      '/images/projects/contemporary-home-1.jpg',
      '/images/projects/contemporary-home-2.jpg',
      '/images/projects/contemporary-home-3.jpg',
      '/images/projects/contemporary-home-4.jpg'
    ],
    featured: false
  },
  {
    id: 'restaurant-worli',
    title: 'Restaurant in Worli',
    category: 'commercial',
    location: 'Worli, Mumbai',
    completionDate: '2024',
    client: 'Culinary Delights',
    description: 'A fine dining restaurant with elegant interiors and atmospheric lighting.',
    designConcept: 'The design concept created an intimate dining atmosphere with sophisticated lighting and luxurious materials. The design balances elegance with comfort.',
    scopeOfWork: [
      'Restaurant layout',
      'Bar design',
      'Lighting design',
      'Acoustic treatment',
      'Outdoor seating',
      'Restroom design'
    ],
    materials: [
      'Marble countertops',
      'Velvet seating',
      'Brass accents',
      'Custom lighting',
      'Wood paneling',
      'Art installations'
    ],
    images: [
      '/images/projects/restaurant-1.jpg',
      '/images/projects/restaurant-2.jpg',
      '/images/projects/restaurant-3.jpg',
      '/images/projects/restaurant-4.jpg',
      '/images/projects/restaurant-5.jpg'
    ],
    featured: false
  }
];

export function getProjectsByCategory(category: 'residential' | 'commercial'): Project[] {
  return PROJECTS.filter(project => project.category === category);
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter(project => project.featured);
}

export function getProjectById(id: string): Project | undefined {
  return PROJECTS.find(project => project.id === id);
}

export function searchProjects(query: string): Project[] {
  const lowercaseQuery = query.toLowerCase();
  
  return PROJECTS.filter(project => 
    project.title.toLowerCase().includes(lowercaseQuery) ||
    project.description.toLowerCase().includes(lowercaseQuery) ||
    project.location.toLowerCase().includes(lowercaseQuery) ||
    project.client.toLowerCase().includes(lowercaseQuery)
  );
}

export function getRelatedProjects(
  projectId: string, 
  category: 'residential' | 'commercial',
  limit: number = 3
): Project[] {
  return PROJECTS
    .filter(project => project.id !== projectId && project.category === category)
    .slice(0, limit);
}
