import type { Project } from '@/types/project';
import type { Service } from '@/types/service';


export const NAV_LINKS = [
  { name: 'SERVICES',   href: '/services' },
  { name: 'PROJECTS',   href: '/projects' },
  { name: 'PROCESS',    href: '/process' },
  { name: 'ABOUT US',   href: '/#about' },
  { name: 'MEDIA',      href: '/#media' },
  { name: 'CONTACT US', href: '/contact' },
];


export const SERVICE_SLUGS = [
  'residential-interior-design',
  'commercial-interior-design',
  'office-interior',
  'hospitality-space',
];


export const PROJECT_CATEGORIES = {
  RESIDENTIAL: 'residential',
  COMMERCIAL:  'commercial',
} as const;


export const SITE_NAME        = 'Interior Studio Ltd';
export const SITE_URL         = 'https://www.interiorstudioltd.com';
export const SITE_DESCRIPTION = 'Interior Studio Ltd offers full-service interior design for residential and commercial projects across India. From modern villas to boutique hotels — we transform spaces into extraordinary masterpieces.';


export const BUSINESS_HOURS = {
  weekdays: '10:00 AM - 7:00 PM',
  saturday: '10:00 AM - 5:00 PM',
  sunday:   'Closed',
};


export const SEO_DEFAULTS = {
  title:       SITE_NAME,
  description: SITE_DESCRIPTION,
  url:         SITE_URL,
  ogImage:     '/images/hero/og-image.jpg',
  twitterCard: 'summary_large_image',
};


export const HERO_STATS = [
  { value: '10+',   label: 'YEARS IN DESIGN' },
  { value: '200+',  label: 'PROJECTS DONE' },
  { value: 'INDIA', label: 'LICENSED STUDIO' },
  { value: '100%',  label: 'FULL SERVICE' },
];

export const SERVICES_GRID = [
  { title: 'Villa Interior Design',       image: '/images/projects/modern-villa-ahmedabad/cover.png',  href: '/services/residential-interior-design' },
  { title: 'Commercial Fit-Out',          image: '/images/projects/tech-office-bangalore/cover.png',   href: '/services/commercial-interior-design'  },
  { title: 'Apartment Interior Design',   image: '/images/projects/sky-penthouse-mumbai/cover.png',    href: '/services/residential-interior-design' },
  { title: 'Furniture & Accessories',     image: '/images/projects/boutique-hotel-goa/cover.png',      href: '/services/hospitality-space'           },
  { title: 'Landscape Design',            image: '/images/projects/heritage-bungalow-pune/cover.png',  href: '/services/hospitality-space'           },
  { title: 'Exterior Design',             image: '/images/projects/restaurant-delhi/cover.png',        href: '/services/commercial-interior-design'  },
  { title: 'Hotel Interior Design',       image: '/images/projects/boutique-hotel-goa/cover.png',      href: '/services/hospitality-space'           },
  { title: 'Office Design & Commercial',  image: '/images/projects/tech-office-bangalore/cover.png',   href: '/services/office-interior'             },
  { title: 'Kitchen Design',              image: '/images/projects/modern-villa-ahmedabad/cover.png',  href: '/services/residential-interior-design' },
  { title: 'Bathroom Design',             image: '/images/projects/sky-penthouse-mumbai/cover.png',    href: '/services/residential-interior-design' },
  { title: 'Dressing Room Design',        image: '/images/projects/heritage-bungalow-pune/cover.png',  href: '/services/residential-interior-design' },
  { title: 'Hospital & Clinical Fit-Out', image: '/images/projects/restaurant-delhi/cover.png',        href: '/services/commercial-interior-design'  },
];

export const FURNITURE_CATEGORIES = [
  { title: 'Bedroom',     image: '/images/projects/modern-villa-ahmedabad/cover.png', href: '/services/residential-interior-design' },
  { title: 'Dining Room', image: '/images/projects/restaurant-delhi/cover.png',       href: '/services/hospitality-space'           },
  { title: 'Living Room', image: '/images/projects/heritage-bungalow-pune/cover.png', href: '/services/residential-interior-design' },
  { title: 'Office',      image: '/images/projects/tech-office-bangalore/cover.png',  href: '/services/office-interior'             },
  { title: 'Outdoor',     image: '/images/projects/boutique-hotel-goa/cover.png',     href: '/services/commercial-interior-design'  },
  { title: 'Kitchen',     image: '/images/projects/sky-penthouse-mumbai/cover.png',   href: '/services/residential-interior-design' },
];


export const PROJECTS: Project[] = [
  {
    id: 'modern-villa-ahmedabad',
    title: 'Modern Villa Ahmedabad',
    category: 'residential',
    location: 'Ahmedabad, Gujarat',
    completionDate: '2024-01',
    client: 'Private Residence',
    description: 'A sophisticated villa transformation combining minimalist aesthetics with functional living spaces.',
    designConcept: 'Clean lines, neutral palette, and strategic lighting create an illusion of spaciousness while maintaining warmth.',
    scopeOfWork: ['Space Planning', 'Custom Furniture', 'Lighting Design', 'Material Selection'],
    materials: ['Italian Marble', 'Walnut Wood', 'Brushed Brass', 'Textured Fabrics'],
    images: [
      '/images/projects/modern-villa-ahmedabad/cover.png',
      '/images/projects/modern-villa-ahmedabad/gallery-1.png',
    ],
    featured: true,
  },
  {
    id: 'tech-office-bangalore',
    title: 'Tech Office Bangalore',
    category: 'commercial',
    location: 'Bengaluru, Karnataka',
    completionDate: '2024-02',
    client: 'Tech Solutions Inc.',
    description: 'A dynamic workspace designed to foster collaboration and innovation while reflecting corporate identity.',
    designConcept: 'Open-plan layout with biophilic elements, flexible work zones, and integrated technology.',
    scopeOfWork: ['Workspace Design', 'Meeting Rooms', 'Reception Area', 'Breakout Spaces'],
    materials: ['Glass Partitions', 'Acoustic Panels', 'Sustainable Wood', 'LED Lighting'],
    images: [
      '/images/projects/tech-office-bangalore/cover.png',
      '/images/projects/tech-office-bangalore/gallery-1.png',
    ],
    featured: true,
  },
  {
    id: 'sky-penthouse-mumbai',
    title: 'Sky Penthouse Mumbai',
    category: 'residential',
    location: 'Mumbai, Maharashtra',
    completionDate: '2023-12',
    client: 'High-Net-Worth Individual',
    description: 'An exclusive penthouse offering panoramic city views with bespoke interior elements.',
    designConcept: 'Contemporary luxury with smart home integration and premium material finishes.',
    scopeOfWork: ['Full Renovation', 'Custom Joinery', 'Home Automation', 'Terrace Design'],
    materials: ['Travertine Stone', 'Macassar Ebony', 'Bronze Fixtures', 'Silk Textiles'],
    images: [
      '/images/projects/sky-penthouse-mumbai/cover.png',
      '/images/projects/sky-penthouse-mumbai/gallery-1.png',
    ],
    featured: true,
  },
  {
    id: 'boutique-hotel-goa',
    title: 'Boutique Hotel Goa',
    category: 'commercial',
    location: 'Goa',
    completionDate: '2023-11',
    client: 'Coastal Hospitality Group',
    description: 'A vibrant hotel that captures the essence of coastal luxury and local culture.',
    designConcept: 'Tropical modernism with indigenous materials and artistic elements.',
    scopeOfWork: ['Lobby Design', 'Reception Desk', 'Lounge Areas', 'Art Curation'],
    materials: ['Terracotta Tiles', 'Teak Wood', 'Copper Accents', 'Local Artwork'],
    images: [
      '/images/projects/boutique-hotel-goa/cover.png',
      '/images/projects/boutique-hotel-goa/gallery-1.png',
    ],
    featured: true,
  },
  {
    id: 'heritage-bungalow-pune',
    title: 'Heritage Bungalow Pune',
    category: 'residential',
    location: 'Pune, Maharashtra',
    completionDate: '2023-09',
    client: 'Private Residence',
    description: 'A heritage bungalow restored with contemporary interiors while preserving its original character.',
    designConcept: 'Blending colonial architecture with modern comforts using locally sourced materials.',
    scopeOfWork: ['Heritage Restoration', 'Custom Furniture', 'Garden Design', 'Lighting'],
    materials: ['Reclaimed Teak', 'Lime Plaster', 'Antique Brass', 'Handwoven Textiles'],
    images: [
      '/images/projects/heritage-bungalow-pune/cover.png',
      '/images/projects/heritage-bungalow-pune/gallery-1.png',
    ],
    featured: true,
  },
  {
    id: 'restaurant-delhi',
    title: 'Luxury Restaurant Delhi',
    category: 'commercial',
    location: 'New Delhi',
    completionDate: '2023-08',
    client: 'Delhi Food Group',
    description: 'A fine dining restaurant blending Indian heritage with contemporary design sensibilities.',
    designConcept: 'Warm tones, rich textures, and curated art pieces create an immersive dining experience.',
    scopeOfWork: ['Interior Design', 'Lighting Design', 'Custom Furniture', 'Art Curation'],
    materials: ['Onyx Stone', 'Velvet Upholstery', 'Gold Leaf', 'Hand-painted Tiles'],
    images: [
      '/images/projects/restaurant-delhi/cover.png',
      '/images/projects/restaurant-delhi/gallery-1.png',
    ],
    featured: true,
  },
];


export const SERVICES: Service[] = [
  {
    id: '1',
    slug: 'residential-interior-design',
    title: 'Residential Interior Design',
    description: 'Transform your living spaces into personalized sanctuaries that reflect your lifestyle and aspirations.',
    detailedDescription: 'Our residential design services focus on creating homes that are both beautiful and functional. We work closely with clients to understand their needs, preferences, and lifestyle to deliver spaces that exceed expectations — from modern villas to heritage bungalows.',
    icon: '/icons/home.svg',
    image: '/images/projects/modern-villa-ahmedabad/cover.png',
    process: [
      'Initial consultation and space analysis',
      'Concept development and mood boards',
      '3D visualization and space planning',
      'Material and furniture selection',
      'Project management and execution',
      'Final styling and handover',
    ],
    features: ['Personalized Design Solutions', 'Budget Management', 'Vendor Coordination', 'Timeline Adherence'],
    projectExamples: ['modern-villa-ahmedabad', 'sky-penthouse-mumbai', 'heritage-bungalow-pune'],
    heroGradient: 'from-amber-900/80 via-stone-900/60 to-black',
  },
  {
    id: '2',
    slug: 'commercial-interior-design',
    title: 'Commercial Interior Design',
    description: 'Create inspiring commercial spaces that enhance productivity and reinforce your brand identity.',
    detailedDescription: 'We design commercial environments that balance aesthetics with functionality, creating spaces that support business objectives while providing exceptional user experiences for customers and employees alike.',
    icon: '/icons/office.svg',
    image: '/images/projects/tech-office-bangalore/cover.png',
    process: [
      'Brand analysis and requirements gathering',
      'Space planning and workflow optimization',
      'Design concept development',
      'Material and finish selection',
      'Implementation coordination',
      'Post-occupancy evaluation',
    ],
    features: ['Brand Integration', 'Ergonomic Design', 'Sustainability Focus', 'Technology Integration'],
    projectExamples: ['tech-office-bangalore', 'boutique-hotel-goa', 'restaurant-delhi'],
    heroGradient: 'from-slate-900/80 via-zinc-900/60 to-black',
  },
  {
    id: '3',
    slug: 'office-interior',
    title: 'Office Interior Design',
    description: 'Modern office spaces designed for collaboration, productivity, and employee well-being.',
    detailedDescription: 'Our office design solutions create work environments that inspire creativity, foster collaboration, and support the changing needs of modern businesses — from startups to large corporations.',
    icon: '/icons/building.svg',
    image: '/images/projects/sky-penthouse-mumbai/cover.png',
    process: [
      'Workplace strategy consultation',
      'Space audit and analysis',
      'Design concept and layout',
      'Furniture and technology planning',
      'Implementation and move coordination',
      'Change management support',
    ],
    features: ['Flexible Workspaces', 'Acoustic Solutions', 'Biophilic Design', 'Smart Office Integration'],
    projectExamples: ['tech-office-bangalore'],
    heroGradient: 'from-blue-900/80 via-slate-900/60 to-black',
  },
  {
    id: '4',
    slug: 'hospitality-space',
    title: 'Hospitality Space Design',
    description: 'Create memorable hospitality experiences through thoughtful and immersive interior design.',
    detailedDescription: 'We design hospitality spaces that delight guests while supporting operational efficiency — from boutique hotels and resorts to restaurants, lounges, and spas across India.',
    icon: '/icons/utensils.svg',
    image: '/images/projects/boutique-hotel-goa/cover.png',
    process: [
      'Concept development and market analysis',
      'Guest journey mapping',
      'Design and material specification',
      'FF&E selection and procurement',
      'Project oversight',
      'Pre-opening support',
    ],
    features: ['Guest Experience Focus', 'Brand Storytelling', 'Operational Efficiency', 'Durability and Maintenance'],
    projectExamples: ['boutique-hotel-goa', 'restaurant-delhi'],
    heroGradient: 'from-emerald-900/80 via-teal-900/60 to-black',
  },
  {
    id: '5',
    slug: 'call-center',
    title: 'Call Center Interior Design',
    description: 'Ergonomic and efficient call centre environments for peak performance.',
    detailedDescription: 'Call centres are high-density, high-pressure work environments where design directly affects agent performance and wellbeing. We design call centre spaces with acoustic management, ergonomic workstations, motivating aesthetics, and wellness considerations at the forefront.',
    icon: '/icons/office.svg',
    image: '/images/projects/tech-office-bangalore/cover.png',
    process: ['Workforce analysis', 'Acoustic planning', 'Ergonomic workstation design', 'Technology integration', 'Breakout zone design', 'Implementation'],
    features: ['Acoustic optimisation', 'Ergonomic workstations', 'Agent wellbeing design', 'Scalable layouts', 'Breakout & wellness zones', 'Technology infrastructure'],
    projectExamples: ['tech-office-bangalore'],
    heroGradient: 'from-indigo-900/80 via-slate-900/60 to-black',
  },
];

export const PROCESS_STEPS = [
  {
    id: '1',
    title: 'Initial Consultation',
    description: 'We begin with a comprehensive discussion to understand your vision, requirements, budget, and timeline.',
    image: '/images/process/stage-1-consultation.jpg',
  },
  {
    id: '2',
    title: 'Concept Development',
    description: 'Our team creates design concepts, mood boards, and initial space plans based on your requirements.',
    image: '/images/process/stage-2-concept.jpg',
  },
  {
    id: '3',
    title: 'Design Planning',
    description: 'We develop detailed drawings, 3D visualizations, and material specifications for your approval.',
    image: '/images/process/stage-3-planning.jpg',
  },
  {
    id: '4',
    title: 'Material & Furniture Selection',
    description: 'We curate and select all materials, finishes, furniture, and fixtures to bring the design to life.',
    image: '/images/process/stage-4-materials.jpg',
  },
  {
    id: '5',
    title: 'Project Execution',
    description: 'Our team manages the entire implementation process, coordinating with contractors and vendors.',
    image: '/images/process/stage-5-execution.jpg',
  },
  {
    id: '6',
    title: 'Final Styling & Handover',
    description: 'We add the finishing touches, conduct quality checks, and hand over your beautifully designed space.',
    image: '/images/process/stage-6-handover.jpg',
  },
];


export const CONTACT_INFO = {
  email:    'info@interiorstudioltd.com',
  phone:    '+91 98765 43210',
  whatsapp: '919876543210',
  address:  'Ahmedabad, Gujarat, India',
  social: {
    instagram: 'interiorstudioltd',
    linkedin:  'interior-studio-ltd',
    facebook:  'InteriorStudioLtd',
    youtube:   'InteriorStudioLtd',
  },
};

export const CACHE_TAGS = {
  services: 'services',
  projects: 'projects',
  blog: 'blog',
} as const;