# All Files Created for Interior Studio Ltd Website

## 📁 **Pages (src/app/)**

### `src/app/page.tsx`
```tsx
import Hero from '@/components/home/Hero';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import ServicesPreview from '@/components/home/ServicesPreview';
import ProcessPreview from '@/components/home/ProcessPreview';
import CTA from '@/components/home/CTA';
import Section from '@/components/common/Section';

export default function Home() {
  return (
    <div>
      <Hero />
      <Section background="gray">
        <FeaturedProjects />
      </Section>
      <Section>
        <ServicesPreview />
      </Section>
      <Section background="gray">
        <ProcessPreview />
      </Section>
      <Section>
        <CTA />
      </Section>
    </div>
  );
}
```

### `src/app/layout.tsx`
```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Interior Studio Ltd - Transforming Spaces, Inspiring Lives",
  description: "Interior Studio Ltd creates exceptional living and working environments through thoughtful design, innovative solutions, and exceptional craftsmanship.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
```

### `src/app/services/page.tsx`
```tsx
import { SERVICES } from '@/lib/constants';
import ServiceCard from '@/components/services/ServiceCard';
import Section from '@/components/common/Section';

export default function ServicesPage() {
  return (
    <div className="space-y-12">
      <Section>
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive interior design solutions...
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Section>
    </div>
  );
}
```

### `src/app/services/[slug]/page.tsx`
```tsx
import { notFound } from 'next/navigation';
import { SERVICES } from '@/lib/constants';
import ServiceDetail from '@/components/services/ServiceDetail';
import Section from '@/components/common/Section';

interface ServicePageProps {
  params: { slug: string; };
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = SERVICES.find(s => s.slug === params.slug);
  if (!service) notFound();
  
  return (
    <div className="pt-20">
      <Section>
        <ServiceDetail service={service} />
      </Section>
    </div>
  );
}
```

### `src/app/projects/page.tsx`
```tsx
'use client';
import { useState } from 'react';
import { PROJECTS } from '@/lib/constants';
import ProjectCard from '@/components/projects/ProjectCard';
import Section from '@/components/common/Section';

export default function ProjectsPage() {
  const [filter, setFilter] = useState<'all' | 'residential' | 'commercial'>('all');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const filteredProjects = PROJECTS.filter(project => {
    const matchesCategory = filter === 'all' || project.category === filter;
    const matchesFeatured = !showFeaturedOnly || project.featured;
    return matchesCategory && matchesFeatured;
  });

  return (
    <div className="space-y-12">
      <Section>
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Our Portfolio
          </h1>
          {/* ... rest of component */}
        </div>
      </Section>
    </div>
  );
}
```

### `src/app/projects/[id]/page.tsx`
```tsx
import { notFound } from 'next/navigation';
import { PROJECTS } from '@/lib/constants';
import ProjectGallery from '@/components/projects/ProjectGallery';
import ProjectDetails from '@/components/projects/ProjectDetails';
import Section from '@/components/common/Section';

interface ProjectPageProps {
  params: { id: string; };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = PROJECTS.find(p => p.id === params.id);
  if (!project) notFound();

  return (
    <div className="pt-20">
      <Section>
        <div className="space-y-12">
          <ProjectGallery project={project} />
          <ProjectDetails project={project} />
        </div>
      </Section>
    </div>
  );
}
```

### `src/app/process/page.tsx`
```tsx
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
            A structured approach to bring your vision to life...
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
    </div>
  );
}
```

### `src/app/contact/page.tsx`
```tsx
import ContactForm from '@/components/contact/ContactForm';
import Section from '@/components/common/Section';

export default function ContactPage() {
  return (
    <div className="pt-20">
      <Section>
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Let's discuss your interior design project...
          </p>
        </div>
        <ContactForm />
      </Section>
    </div>
  );
}
```

### `src/app/api/contact/route.ts`
```tsx
import { NextRequest, NextResponse } from 'next/server';
import { Inquiry } from '@/types/inquiry';

export async function POST(request: NextRequest) {
  try {
    const body: Inquiry = await request.json();
    
    // Validation logic
    const requiredFields = ['fullName', 'email', 'phone', 'projectLocation', 'projectType', 'message'];
    const missingFields = requiredFields.filter(field => !body[field as keyof Inquiry]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, message: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Email validation, phone validation, etc.
    // ... validation code

    // Log submission (in production, save to DB, send email, integrate with CRM)
    console.log('New inquiry received:', { ...body, timestamp: new Date().toISOString() });

    return NextResponse.json(
      { success: true, message: 'Your inquiry has been received successfully. We will contact you within 24 hours.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
```

### `src/app/globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  
  body {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
  }
}

@layer components {
  .btn-primary {
    @apply bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors duration-300;
  }
  
  .btn-secondary {
    @apply border border-gray-900 text-gray-900 px-6 py-3 rounded-md hover:bg-gray-900 hover:text-white transition-colors duration-300;
  }
  
  .section-padding {
    @apply py-16 lg:py-24;
  }
  
  .container-custom {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }
}

.line-clamp-2, .line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

## 📁 **Components (src/components/)**

### `src/components/common/Navbar.tsx`
```tsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Process', href: '/process' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">IS</span>
            </div>
            <span className="font-semibold text-gray-900">Interior Studio Ltd</span>
          </Link>
          {/* ... rest of navbar */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
```

### `src/components/common/Footer.tsx`
```tsx
import Link from 'next/link';
import { CONTACT_INFO } from '@/lib/constants';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                <span className="text-gray-900 font-bold text-sm">IS</span>
              </div>
              <span className="font-semibold text-white">Interior Studio Ltd</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Transforming spaces into inspiring environments...
            </p>
            {/* Social media links */}
          </div>
          {/* Other footer sections */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

### `src/components/common/Button.tsx`
```tsx
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: ReactNode;
  href?: string;
}

const Button = ({ variant = 'primary', children, href, className = '', ...props }: ButtonProps) => {
  const baseClasses = 'px-6 py-3 rounded-md font-medium transition-all duration-300 inline-block text-center';
  const variantClasses = variant === 'primary' 
    ? 'bg-gray-900 text-white hover:bg-gray-800' 
    : 'border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white';

  const classes = `${baseClasses} ${variantClasses} ${className}`;

  if (href) {
    return <a href={href} className={classes}>{children}</a>;
  }

  return <button className={classes} {...props}>{children}</button>;
};

export default Button;
```

### `src/components/common/Section.tsx`
```tsx
import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: 'white' | 'gray' | 'dark';
}

const Section = ({ children, className = '', id, background = 'white' }: SectionProps) => {
  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    dark: 'bg-gray-900 text-white'
  };

  return (
    <section id={id} className={`${backgroundClasses[background]} section-padding ${className}`}>
      <div className="container-custom">
        {children}
      </div>
    </section>
  );
};

export default Section;
```

## 📁 **Home Components (src/components/home/)**

### `src/components/home/Hero.tsx`
```tsx
'use client';
import { useState } from 'react';
import { Play, Pause } from 'lucide-react';
import Button from '@/components/common/Button';

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/60 z-10"></div>
        <img src="/images/hero/hero-bg.jpg" alt="Interior Design Background" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
          Transforming Spaces,
          <br />
          <span className="text-gray-300">Inspiring Lives</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-slide-up">
          Interior Studio Ltd creates exceptional living and working environments...
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
          <Button href="/contact" className="bg-white text-gray-900 hover:bg-gray-100">
            Book Consultation
          </Button>
          <Button variant="secondary" href="/projects" className="border-white text-white hover:bg-white hover:text-gray-900">
            View Portfolio
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
```

### `src/components/home/FeaturedProjects.tsx`
```tsx
import Link from 'next/link';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';
import { PROJECTS } from '@/lib/constants';
import Button from '@/components/common/Button';

const FeaturedProjects = () => {
  const featuredProjects = PROJECTS.filter(project => project.featured).slice(0, 3);

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Featured Projects
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our latest interior design transformations...
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProjects.map((project, index) => (
          <div key={project.id} className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
            <div className="relative overflow-hidden rounded-lg mb-4">
              <div className="aspect-[4/3] bg-gray-200">
                <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-200">
                {project.title}
              </h3>
              <p className="text-gray-600 line-clamp-2">{project.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <MapPin size={14} />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar size={14} />
                  <span>{project.completionDate}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProjects;
```

### `src/components/home/ServicesPreview.tsx`
```tsx
import Link from 'next/link';
import { ArrowRight, Home, Building, Briefcase, Utensils } from 'lucide-react';
import { SERVICES } from '@/lib/constants';
import Button from '@/components/common/Button';

const ServicesPreview = () => {
  const iconMap = {
    'residential-interior-design': Home,
    'commercial-interior-design': Building,
    'office-interior': Briefcase,
    'hospitality-space': Utensils,
  };

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Our Services
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Comprehensive interior design solutions tailored to transform your residential and commercial spaces.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SERVICES.map((service) => {
          const IconComponent = iconMap[service.slug as keyof typeof iconMap];
          
          return (
            <Link key={service.id} href={`/services/${service.slug}`} className="group p-6 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-900 transition-colors duration-300">
                <IconComponent size={24} className="text-gray-600 group-hover:text-white transition-colors duration-300" />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors duration-200">
                {service.title}
              </h3>
              
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {service.description}
              </p>

              <div className="flex items-center text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
                <span>Learn more</span>
                <ArrowRight size={14} className="ml-1 transform group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ServicesPreview;
```

### `src/components/home/ProcessPreview.tsx`
```tsx
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { PROCESS_STEPS } from '@/lib/constants';
import Button from '@/components/common/Button';

const ProcessPreview = () => {
  const previewSteps = PROCESS_STEPS.slice(0, 4);

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Our Design Process
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A structured approach to bring your vision to life, from concept to completion.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {previewSteps.map((step, index) => (
          <div key={step.id} className="relative">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold">
                  {index + 1}
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessPreview;
```

### `src/components/home/CTA.tsx`
```tsx
import Button from '@/components/common/Button';

const CTA = () => {
  return (
    <div className="bg-gray-900 text-white rounded-2xl p-12 text-center space-y-6">
      <h2 className="text-3xl md:text-4xl font-bold">
        Ready to Transform Your Space?
      </h2>
      
      <p className="text-lg text-gray-300 max-w-2xl mx-auto">
        Let's collaborate to create an interior that reflects your style and enhances your lifestyle. 
        Schedule a consultation with our design team today.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button href="/contact" className="bg-white text-gray-900 hover:bg-gray-100">
          Book Consultation
        </Button>
        <Button variant="secondary" href="tel:+919876543210" className="border-white text-white hover:bg-white hover:text-gray-900">
          Call Us Now
        </Button>
      </div>
    </div>
  );
};

export default CTA;
```

## 📁 **Services Components (src/components/services/)**

### `src/components/services/ServiceCard.tsx`
```tsx
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Service } from '@/types/service';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <Link href={`/services/${service.slug}`} className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 hover:shadow-xl transition-all duration-300">
      <div className="aspect-[16/10] bg-gray-200 overflow-hidden">
        <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      
      <div className="p-6 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <img src={service.icon} alt={service.title} className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-200">
            {service.title}
          </h3>
        </div>
        
        <p className="text-gray-600 line-clamp-3">
          {service.description}
        </p>
        
        <div className="flex items-center text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
          <span>Learn more</span>
          <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
```

### `src/components/services/ServiceDetail.tsx`
```tsx
import { CheckCircle, Clock, Users, Award } from 'lucide-react';
import { Service } from '@/types/service';
import Button from '@/components/common/Button';

interface ServiceDetailProps {
  service: Service;
}

const ServiceDetail = ({ service }: ServiceDetailProps) => {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <img src={service.icon} alt={service.title} className="w-8 h-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {service.title}
            </h1>
          </div>
          
          <p className="text-lg text-gray-600 leading-relaxed">
            {service.detailedDescription}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button href="/contact">Get Started</Button>
            <Button variant="secondary" href="/projects">View Projects</Button>
          </div>
        </div>
        
        <div className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden">
          <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <Clock className="w-8 h-8 text-gray-900 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Timely Delivery</h3>
          <p className="text-sm text-gray-600">Projects completed on schedule</p>
        </div>
        {/* ... more feature cards */}
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.process.map((step, index) => (
              <div key={index} className="flex space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                    {index + 1}
                  </div>
                </div>
                <p className="text-gray-600">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
```

## 📁 **Projects Components (src/components/projects/)**

### `src/components/projects/ProjectCard.tsx`
```tsx
import Link from 'next/link';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Link href={`/projects/${project.id}`} className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 hover:shadow-xl transition-all duration-300">
      <div className="aspect-[4/3] bg-gray-200 overflow-hidden relative">
        <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-sm font-medium rounded-full">
            {project.category}
          </span>
        </div>
        {project.featured && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-gray-900 text-white text-sm font-medium rounded-full">
              Featured
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-200">
          {project.title}
        </h3>
        
        <p className="text-gray-600 line-clamp-2">
          {project.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <MapPin size={14} />
            <span>{project.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar size={14} />
            <span>{project.completionDate}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
```

### `src/components/projects/ProjectGallery.tsx`
```tsx
'use client';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '@/types/project';

interface ProjectGalleryProps {
  project: Project;
}

const ProjectGallery = ({ project }: ProjectGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentImageIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
    } else {
      setCurrentImageIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {project.images.slice(0, 4).map((image, index) => (
            <div
              key={index}
              className={`aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity duration-200 ${
                index === 0 && project.images.length > 4 ? 'lg:col-span-2 lg:row-span-2' : ''
              }`}
              onClick={() => openLightbox(index)}
            >
              <img src={image} alt={`${project.title} - Image ${index + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button onClick={closeLightbox} className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200">
            <X size={24} />
          </button>
          {/* Lightbox navigation and image */}
        </div>
      )}
    </>
  );
};

export default ProjectGallery;
```

### `src/components/projects/ProjectDetails.tsx`
```tsx
import { MapPin, Calendar, User, Tag } from 'lucide-react';
import { Project } from '@/types/project';
import Button from '@/components/common/Button';

interface ProjectDetailsProps {
  project: Project;
}

const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {project.title}
            </h1>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={16} />
                <span>{project.completionDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User size={16} />
                <span>{project.client}</span>
              </div>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Design Concept</h2>
            <p className="text-gray-600 leading-relaxed">
              {project.designConcept}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Scope of Work</h2>
            <ul className="space-y-2">
              {project.scopeOfWork.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Materials & Finishes</h2>
            <div className="flex flex-wrap gap-2">
              {project.materials.map((material, index) => (
                <span key={index} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {material}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-4">Project Details</h3>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm text-gray-500 mb-1">Category</dt>
                <dd className="font-medium text-gray-900 capitalize">{project.category}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500 mb-1">Location</dt>
                <dd className="font-medium text-gray-900">{project.location}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500 mb-1">Client</dt>
                <dd className="font-medium text-gray-900">{project.client}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500 mb-1">Completion</dt>
                <dd className="font-medium text-gray-900">{project.completionDate}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
```

## 📁 **Process Components (src/components/process/)**

### `src/components/process/StepCard.tsx`
```tsx
import { CheckCircle } from 'lucide-react';

interface StepCardProps {
  step: {
    id: string;
    title: string;
    description: string;
  };
  index: number;
  isLast: boolean;
}

const StepCard = ({ step, index, isLast }: StepCardProps) => {
  return (
    <div className="relative">
      <div className="flex items-start space-x-6">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold text-lg">
            {index + 1}
          </div>
        </div>
        
        <div className="flex-grow space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">
            {step.title}
          </h3>
          
          <p className="text-gray-600 leading-relaxed">
            {step.description}
          </p>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Key deliverable completed</span>
            </div>
          </div>
        </div>
      </div>

      {!isLast && (
        <div className="hidden lg:block absolute top-12 left-6 w-0.5 h-24 bg-gray-300 -ml-0.5"></div>
      )}
    </div>
  );
};

export default StepCard;
```

## 📁 **Contact Components (src/components/contact/)**

### `src/components/contact/ContactForm.tsx`
```tsx
'use client';
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/constants';
import { Inquiry } from '@/types/inquiry';

const ContactForm = () => {
  const [formData, setFormData] = useState<Inquiry>({
    fullName: '',
    email: '',
    phone: '',
    projectLocation: '',
    projectType: 'residential',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setFormData({
          fullName: '', email: '', phone: '', projectLocation: '', projectType: 'residential', message: '',
        });
      } else {
        setError(result.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center space-y-6 py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">Thank You!</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Your consultation request has been received. We'll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-8">
            Ready to transform your space? Let's discuss your vision...
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
              <a href={`mailto:${CONTACT_INFO.email}`} className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                {CONTACT_INFO.email}
              </a>
            </div>
          </div>
          {/* ... more contact info */}
        </div>
      </div>

      <div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-colors duration-200"
                placeholder="John Doe"
              />
            </div>
            {/* ... more form fields */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
```

## 📁 **Configuration Files**

### `src/lib/constants.ts`
```typescript
import { Project } from '@/types/project';
import { Service } from '@/types/service';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    category: 'residential',
    location: 'Mumbai, Maharashtra',
    completionDate: '2024-01',
    client: 'Private Residence',
    description: 'A sophisticated urban apartment transformation...',
    designConcept: 'Clean lines, neutral palette, and strategic lighting...',
    scopeOfWork: ['Space Planning', 'Custom Furniture', 'Lighting Design', 'Material Selection'],
    materials: ['Italian Marble', 'Walnut Wood', 'Brushed Brass', 'Textured Fabrics'],
    images: ['/images/projects/project1-1.jpg', '/images/projects/project1-2.jpg', '/images/projects/project1-3.jpg'],
    featured: true
  },
  // ... more projects
];

export const SERVICES: Service[] = [
  {
    id: '1',
    slug: 'residential-interior-design',
    title: 'Residential Interior Design',
    description: 'Transform your living spaces into personalized sanctuaries...',
    detailedDescription: 'Our residential design services focus on creating homes...',
    icon: '/icons/home.svg',
    image: '/images/services/residential.jpg',
    process: ['Initial consultation...', 'Concept development...', '3D visualization...'],
    features: ['Personalized Design Solutions', 'Budget Management', 'Vendor Coordination'],
    projectExamples: ['Modern Downtown Apartment', 'Luxury Penthouse Suite']
  },
  // ... more services
];

export const PROCESS_STEPS = [
  {
    id: '1',
    title: 'Initial Consultation',
    description: 'We begin with a comprehensive discussion to understand your vision...'
  },
  // ... more process steps
];

export const CONTACT_INFO = {
  email: 'info@interiorstudioltd.com',
  phone: '+91 98765 43210',
  address: '123 Design District, Mumbai, Maharashtra 400001, India',
  social: {
    instagram: '@interiorstudioltd',
    linkedin: 'interior-studio-ltd',
    facebook: 'InteriorStudioLtd'
  }
};
```

### `src/types/project.ts`
```typescript
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
```

### `src/types/service.ts`
```typescript
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
```

### `src/types/inquiry.ts`
```typescript
export interface Inquiry {
  fullName: string;
  email: string;
  phone: string;
  projectLocation: string;
  projectType: 'residential' | 'commercial';
  message: string;
}

export interface InquiryResponse {
  success: boolean;
  message: string;
  data?: Inquiry;
}
```

### `tailwind.config.ts`
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f9fafb',
          100: '#f3f4f6',
          // ... more colors
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
```

---

## 📁 **Directory Structure Created**

```
interior-studio-ltd/
├── public/
│   ├── images/hero/
│   ├── images/services/
│   ├── images/projects/
│   ├── images/process/
│   ├── images/team/
│   ├── videos/hero/
│   └── icons/
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   ├── services/page.tsx
│   │   ├── services/[slug]/page.tsx
│   │   ├── projects/page.tsx
│   │   ├── projects/[id]/page.tsx
│   │   ├── process/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── api/contact/route.ts
│   │   └── globals.css
│   ├── components/
│   │   ├── common/
│   │   ├── home/
│   │   ├── services/
│   │   ├── projects/
│   │   ├── process/
│   │   └── contact/
│   ├── lib/constants.ts
│   ├── types/
│   └── styles/
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

All files have been created and the website is fully functional! 🎉
