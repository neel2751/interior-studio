import { Service } from '@/types/service';

export const SERVICES: Service[] = [
  {
    id: '1',
    slug: 'residential-interior-design',
    title: 'Residential Interior Design',
    description: 'Transform your home into a personalized sanctuary that reflects your lifestyle.',
    detailedDescription: 'Our residential interior design services focus on creating beautiful, functional living spaces that enhance your daily life. From concept to completion, we work closely with you to design homes that are both aesthetically pleasing and perfectly suited to your needs.',
    icon: '/icons/residential.svg',
    image: '/images/projects/modern-villa-ahmedabad/ChatGPT Image Mar 26, 2026, 09_14_47 PM.png',
    process: [
      'Space planning and layout optimization',
      'Color scheme and material selection',
      'Furniture design and procurement',
      'Lighting design and implementation',
      'Custom cabinetry and storage solutions',
      'Art and accessory curation'
    ],
    features: [
      'Personalized design approach',
      '3D visualization and renderings',
      'Budget-friendly solutions',
      'Sustainable design options',
      'Project management',
      'Post-installation support'
    ],
    projectExamples: [
      'Modern Apartment in Bandra',
      'Luxury Villa in South Mumbai',
      'Contemporary Home in Powai',
      'Minimalist Flat in Andheri'
    ]
  },
  {
    id: '2',
    slug: 'commercial-interior-design',
    title: 'Commercial Interior Design',
    description: 'Create inspiring commercial spaces that enhance productivity and brand identity.',
    detailedDescription: 'We specialize in designing commercial interiors that balance aesthetics with functionality. Our commercial projects include offices, retail spaces, restaurants, and hospitality venues that reflect your brand identity while optimizing for user experience and business efficiency.',
    icon: '/icons/commercial.svg',
    image: '/images/projects/tech-office-bangalore/ChatGPT Image Mar 26, 2026, 09_14_47 PM.png',
    process: [
      'Brand analysis and space requirements',
      'Functional layout and workflow optimization',
      'Brand-aligned design concepts',
      'Material and finish specifications',
      'Lighting and electrical planning',
      'Signage and wayfinding design'
    ],
    features: [
      'Brand-focused design solutions',
      'Ergonomic space planning',
      'Compliance with building codes',
      'Sustainable design practices',
      'Technology integration',
      'Maintenance-friendly designs'
    ],
    projectExamples: [
      'Corporate Office in BKC',
      'Retail Store in Colaba',
      'Restaurant in Worli',
      'Coworking Space in Lower Parel'
    ]
  },
  {
    id: '3',
    slug: 'office-interior',
    title: 'Office Interior Design',
    description: 'Design productive work environments that foster collaboration and employee well-being.',
    detailedDescription: 'Our office interior design services create workspaces that boost productivity, enhance employee satisfaction, and reflect your company culture. We design everything from open-plan offices to private executive suites, ensuring optimal functionality and professional aesthetics.',
    icon: '/icons/office.svg',
    image: '/images/projects/sky-penthouse-mumbai/ChatGPT Image Mar 26, 2026, 09_14_47 PM.png',
    process: [
      'Workplace strategy and space analysis',
      'Ergonomic furniture selection',
      'Acoustic planning and solutions',
      'Technology infrastructure design',
      'Breakout and collaboration zones',
      'Storage and organization systems'
    ],
    features: [
      'Ergonomic design focus',
      'Flexible workspace solutions',
      'Advanced technology integration',
      'Sustainable office design',
      'Employee wellness considerations',
      'Scalable design solutions'
    ],
    projectExamples: [
      'Tech Startup Office in Goregaon',
      'Law Firm in Fort',
      'Financial Services in Nariman Point',
      'Creative Agency in Khar'
    ]
  },
  {
    id: '4',
    slug: 'hospitality-space',
    title: 'Hospitality Space Design',
    description: 'Create memorable hospitality experiences through thoughtful interior design.',
    detailedDescription: 'We specialize in designing hospitality spaces that create lasting impressions. From hotels and restaurants to cafes and bars, our designs balance aesthetics with functionality, ensuring optimal guest experiences while maintaining operational efficiency.',
    icon: '/icons/hospitality.svg',
    image: '/images/projects/boutique-hotel-goa/ChatGPT Image Mar 26, 2026, 09_14_47 PM.png',
    process: [
      'Guest experience analysis',
      'Concept development and theming',
      'Space planning for optimal flow',
      'Material selection for durability',
      'Lighting design for ambiance',
      'Brand integration and storytelling'
    ],
    features: [
      'Guest-centric design approach',
      'Durable and maintenance-friendly materials',
      'Compliance with hospitality standards',
      'Atmospheric lighting design',
      'Brand storytelling elements',
      'Operational efficiency focus'
    ],
    projectExamples: [
      'Boutique Hotel in Marine Drive',
      'Fine Dining Restaurant in Bandra',
      'Café in Juhu',
      'Bar in Lower Parel'
    ]
  }
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find(service => service.slug === slug);
}

export function getServiceById(id: string): Service | undefined {
  return SERVICES.find(service => service.id === id);
}

export function getServiceSlugs(): string[] {
  return SERVICES.map(service => service.slug);
}

export function searchServices(query: string): Service[] {
  const lowercaseQuery = query.toLowerCase();
  
  return SERVICES.filter(service => 
    service.title.toLowerCase().includes(lowercaseQuery) ||
    service.description.toLowerCase().includes(lowercaseQuery) ||
    service.detailedDescription.toLowerCase().includes(lowercaseQuery)
  );
}

export function getServicesByProjectExample(projectName: string): Service[] {
  return SERVICES.filter(service => 
    service.projectExamples.some(example => 
      example.toLowerCase().includes(projectName.toLowerCase())
    )
  );
}
