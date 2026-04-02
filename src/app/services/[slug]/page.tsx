import { notFound } from 'next/navigation';
import { SERVICES } from '@/lib/constants';
import ServiceDetail from '@/components/services/ServiceDetail';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICES.find(s => s.slug === slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetail service={service} />;
}

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}