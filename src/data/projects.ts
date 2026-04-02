import type { Project } from '@/types/project';

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Modern Villa — Ahmedabad',
    category: 'residential',
    location: 'Ahmedabad, Gujarat',
    completionDate: '2025-11',
    client: 'Private Residence',
    description:
      'A contemporary villa designed around natural light and indoor-outdoor living, blending warm materials with clean modernist lines.',
    designConcept:
      'The concept draws from the surrounding landscape — raw stone, warm timber, and abundant greenery brought inside to blur the boundary between interior and exterior.',
    scopeOfWork: [
      'Complete interior design',
      'Custom furniture design',
      'Landscape integration',
      'Lighting design',
      'Art curation',
    ],
    materials: ['Kota stone', 'Teak wood', 'Handmade tiles', 'Brass fixtures'],
    images: [
      '/images/projects/modern-villa-ahmedabad/1.jpg',
      '/images/projects/modern-villa-ahmedabad/2.jpg',
      '/images/projects/modern-villa-ahmedabad/3.jpg',
    ],
    featured: true,
  },
  {
    id: 'p2',
    title: 'Sky Penthouse — Mumbai',
    category: 'residential',
    location: 'Worli, Mumbai',
    completionDate: '2025-06',
    client: 'Private Residence',
    description:
      'A 5,000 sq ft penthouse with panoramic sea views, designed with a restrained luxury palette that lets the views take centre stage.',
    designConcept:
      'Every room is oriented to the sea. Materials are deliberately understated — linen, travertine, bleached oak — so nothing competes with the view.',
    scopeOfWork: [
      'Full interior design',
      'Custom joinery',
      'Bespoke furniture',
      'Lighting design',
      'Smart home integration',
    ],
    materials: ['Travertine', 'Bleached oak', 'Linen upholstery', 'Bronze fixtures'],
    images: [
      '/images/projects/sky-penthouse-mumbai/1.jpg',
      '/images/projects/sky-penthouse-mumbai/2.jpg',
      '/images/projects/sky-penthouse-mumbai/3.jpg',
    ],
    featured: true,
  },
  {
    id: 'p3',
    title: 'Modern Apartment — Bandra',
    category: 'residential',
    location: 'Bandra, Mumbai',
    completionDate: '2024-12',
    client: 'The Sharma Family',
    description:
      'A contemporary 3BHK apartment transformed into a modern living space with clean lines and neutral tones.',
    designConcept:
      'The design focused on creating an open, airy living space that maximizes natural light while maintaining privacy — a neutral palette punctuated by curated artwork and accessories.',
    scopeOfWork: [
      'Complete interior renovation',
      'Custom furniture design',
      'Lighting design',
      'Kitchen remodeling',
      'Bathroom upgrades',
      'Smart home integration',
    ],
    materials: [
      'Italian marble flooring',
      'Teak wood furniture',
      'Brass accents',
      'Glass partitions',
      'Custom lighting fixtures',
      'Premium laminates',
    ],
    images: [
      '/images/projects/modern-apartment-bandra/1.jpg',
      '/images/projects/modern-apartment-bandra/2.jpg',
      '/images/projects/modern-apartment-bandra/3.jpg',
      '/images/projects/modern-apartment-bandra/4.jpg',
      '/images/projects/modern-apartment-bandra/5.jpg',
      '/images/projects/modern-apartment-bandra/6.jpg',
    ],
    featured: true,
  },
  {
    id: 'p4',
    title: 'Luxury Villa — South Mumbai',
    category: 'residential',
    location: 'Cuffe Parade, Mumbai',
    completionDate: '2023-11',
    client: 'The Patel Family',
    description:
      'A luxurious 5BHK villa featuring contemporary design with traditional Indian elements.',
    designConcept:
      'Contemporary luxury meets traditional Indian craftsmanship — distinct zones for different family activities unified by a coherent design language throughout.',
    scopeOfWork: [
      'Full home renovation',
      'Custom furniture',
      'Art curation',
      'Landscape design',
      'Home theater',
      'Wine cellar',
    ],
    materials: [
      'Italian marble',
      'Burma teak',
      'Brass and copper accents',
      'Silk upholstery',
      'Custom lighting',
    ],
    images: [
      '/images/projects/luxury-villa-south-mumbai/1.jpg',
      '/images/projects/luxury-villa-south-mumbai/2.jpg',
      '/images/projects/luxury-villa-south-mumbai/3.jpg',
      '/images/projects/luxury-villa-south-mumbai/4.jpg',
      '/images/projects/luxury-villa-south-mumbai/5.jpg',
    ],
    featured: true,
  },
  {
    id: 'p5',
    title: 'Contemporary Home — Powai',
    category: 'residential',
    location: 'Powai, Mumbai',
    completionDate: '2023-08',
    client: 'The Reddy Family',
    description:
      'A contemporary 4BHK home with smart home features and sustainable design elements.',
    designConcept:
      'Clean lines, minimal aesthetics, and smart home integration — with a focus on sustainability through energy-efficient systems and responsibly sourced materials.',
    scopeOfWork: [
      'Interior renovation',
      'Smart home integration',
      'Kitchen design',
      'Bathroom remodeling',
      'Lighting automation',
      'Furniture design',
    ],
    materials: [
      'Sustainable wood',
      'Recycled materials',
      'Energy-efficient lighting',
      'Smart glass',
      'Eco-friendly paints',
      'Bamboo flooring',
    ],
    images: [
      '/images/projects/contemporary-home-powai/1.jpg',
      '/images/projects/contemporary-home-powai/2.jpg',
      '/images/projects/contemporary-home-powai/3.jpg',
      '/images/projects/contemporary-home-powai/4.jpg',
    ],
    featured: false,
  },

  {
    id: 'p6',
    title: 'Tech Office — Bangalore',
    category: 'commercial',
    location: 'Koramangala, Bangalore',
    completionDate: '2025-09',
    client: 'SaaS Startup',
    description:
      'A 12,000 sq ft office designed to foster collaboration, focus, and employee well-being for a fast-growing technology company.',
    designConcept:
      'Zones are defined by acoustic treatment and lighting rather than walls — creating a fluid, open plan that still gives employees control over their environment.',
    scopeOfWork: [
      'Space planning',
      'Furniture procurement',
      'Acoustic design',
      'Breakout zone design',
      'Brand integration',
    ],
    materials: ['Acoustic panels', 'Engineered wood', 'Polished concrete', 'Glass partitions'],
    images: [
      '/images/projects/tech-office-bangalore/1.jpg',
      '/images/projects/tech-office-bangalore/2.jpg',
    ],
    featured: true,
  },
  {
    id: 'p7',
    title: 'Boutique Hotel — Goa',
    category: 'commercial',
    location: 'Assagao, Goa',
    completionDate: '2025-03',
    client: 'Boutique Hospitality Group',
    description:
      'A 14-room boutique hotel that celebrates Goan heritage through contemporary design — handcrafted furniture, local artisans, and a strong sense of place.',
    designConcept:
      'Goan Portuguese architecture meets contemporary tropical living. Every room tells a different story through curated antiques, local textiles, and hand-painted tiles.',
    scopeOfWork: [
      'Concept and brand design',
      'All 14 room interiors',
      'Restaurant and bar design',
      'Pool and outdoor areas',
      'Signage and wayfinding',
    ],
    materials: ['Azulejo tiles', 'Reclaimed teak', 'Cane furniture', 'Lime plaster'],
    images: [
      '/images/projects/boutique-hotel-goa/1.jpg',
      '/images/projects/boutique-hotel-goa/2.jpg',
    ],
    featured: false,
  },
  {
    id: 'p8',
    title: 'Corporate Office — BKC',
    category: 'commercial',
    location: 'Bandra Kurla Complex, Mumbai',
    completionDate: '2024-06',
    client: 'Tech Solutions Pvt Ltd',
    description:
      'A modern corporate office designed for collaboration and productivity with flexible workspaces.',
    designConcept:
      'A dynamic work environment that fosters collaboration while providing focused work areas — biophilic design elements and flexible furniture systems throughout.',
    scopeOfWork: [
      'Space planning and layout',
      'Workstation design',
      'Conference room design',
      'Reception area',
      'Breakout zones',
      'Cafeteria design',
    ],
    materials: [
      'Acoustic panels',
      'Glass partitions',
      'Carpet tiles',
      'Laminate workstations',
      'LED lighting',
      'Green wall installation',
    ],
    images: [
      '/images/projects/corporate-office-bkc/1.jpg',
      '/images/projects/corporate-office-bkc/2.jpg',
      '/images/projects/corporate-office-bkc/3.jpg',
      '/images/projects/corporate-office-bkc/4.jpg',
    ],
    featured: true,
  },
  {
    id: 'p9',
    title: 'Retail Store — Colaba',
    category: 'commercial',
    location: 'Colaba, Mumbai',
    completionDate: '2023-10',
    client: 'Fashion Forward Pvt Ltd',
    description:
      'A high-end fashion retail store with innovative display systems and a premium customer experience.',
    designConcept:
      'An immersive shopping experience built around flexible display systems and premium materials — every detail reflects the brand\'s luxury positioning.',
    scopeOfWork: [
      'Store layout design',
      'Display systems',
      'Lighting design',
      'Fitting rooms',
      'Cash counter',
      'Storage solutions',
    ],
    materials: [
      'Polished concrete floors',
      'Glass display cases',
      'Custom lighting',
      'Velvet upholstery',
      'Brass fixtures',
      'Mirror walls',
    ],
    images: [
      '/images/projects/retail-store-colaba/1.jpg',
      '/images/projects/retail-store-colaba/2.jpg',
      '/images/projects/retail-store-colaba/3.jpg',
      '/images/projects/retail-store-colaba/4.jpg',
    ],
    featured: false,
  },
  {
    id: 'p10',
    title: 'Restaurant — Worli',
    category: 'commercial',
    location: 'Worli, Mumbai',
    completionDate: '2024-03',
    client: 'Culinary Delights',
    description:
      'A fine dining restaurant with elegant interiors and atmospheric lighting.',
    designConcept:
      'An intimate dining atmosphere built on sophisticated lighting and luxurious materials — elegance and comfort in equal measure.',
    scopeOfWork: [
      'Restaurant layout',
      'Bar design',
      'Lighting design',
      'Acoustic treatment',
      'Outdoor seating',
      'Restroom design',
    ],
    materials: [
      'Marble countertops',
      'Velvet seating',
      'Brass accents',
      'Custom lighting',
      'Wood paneling',
      'Art installations',
    ],
    images: [
      '/images/projects/restaurant-worli/1.jpg',
      '/images/projects/restaurant-worli/2.jpg',
      '/images/projects/restaurant-worli/3.jpg',
      '/images/projects/restaurant-worli/4.jpg',
      '/images/projects/restaurant-worli/5.jpg',
    ],
    featured: false,
  },
];


export function getProjectById(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id);
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured);
}

export function getProjectsByCategory(
  category: Project['category'] | 'all'
): Project[] {
  if (category === 'all') return PROJECTS;
  return PROJECTS.filter((p) => p.category === category);
}

export function getProjectIds(): string[] {
  return PROJECTS.map((p) => p.id);
}

export function searchProjects(query: string): Project[] {
  const q = query.toLowerCase();
  return PROJECTS.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.client.toLowerCase().includes(q)
  );
}

export function getRelatedProjects(
  projectId: string,
  category: Project['category'],
  limit = 3
): Project[] {
  return PROJECTS.filter(
    (p) => p.id !== projectId && p.category === category
  ).slice(0, limit);
}